# Chat Interface Component

> Widget chat responsive avec auto-scroll intelligent, typing indicator, et markdown rendering.
> Sources : `chatbot-medical-v2/components/Widget*.tsx`, `chatbot-slbo/components/ChatInterface.tsx`

## Quand l'utiliser

- Tout projet chatbot (popup widget ou page dédiée)
- Besoin d'UX temps réel avec indicateur de frappe
- Chat responsive (mobile plein écran, desktop popup)

## Quand NE PAS l'utiliser

- Simple formulaire de contact (pas besoin de conversation)
- Chat temps réel multi-utilisateurs (utiliser Socket.io)

## Contexte

- 2 variantes : widget popup (medical-v2) ou page complète (chatbot-slbo)
- Auto-scroll intelligent : scroll vers le message user, puis vers la réponse assistant
- Markdown basique sécurisé (échappement HTML + **gras**, *italique*, listes, liens)
- Architecture : ChatWindow → Messages + Input (séparation des responsabilités)

## Code

### Types communs

```typescript
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  sources?: { title: string; url?: string }[];
}
```

### Chat Window (Widget popup responsive)

```tsx
'use client';

import { useEffect, useRef } from 'react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export default function ChatWindow({
  isOpen, onClose, messages, isLoading, onSendMessage,
}: ChatWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  // Escape pour fermer
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay mobile */}
      <div
        className="fixed inset-0 z-40 bg-black/30 md:hidden"
        onClick={onClose}
      />

      {/* Fenêtre de chat */}
      <div
        ref={windowRef}
        role="dialog"
        aria-modal="true"
        className={`
          fixed z-50 flex flex-col bg-white shadow-2xl overflow-hidden
          /* Mobile : plein écran */
          inset-0 rounded-none
          /* Desktop : popup bas-droite */
          md:inset-auto md:bottom-24 md:right-5
          md:w-[400px] md:h-[600px] md:max-h-[calc(100vh-120px)]
          md:rounded-2xl
        `}
      >
        <ChatHeader onClose={onClose} />
        <ChatMessages messages={messages} isLoading={isLoading} />
        <ChatInput onSend={onSendMessage} disabled={isLoading} />
      </div>
    </>
  );
}
```

### Messages avec auto-scroll intelligent

```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function ChatMessages({
  messages, isLoading,
}: { messages: Message[]; isLoading: boolean }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastAssistantRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(messages.length);
  const wasLoadingRef = useRef(isLoading);

  useEffect(() => {
    const prevLength = prevLengthRef.current;
    const wasLoading = wasLoadingRef.current;
    prevLengthRef.current = messages.length;
    wasLoadingRef.current = isLoading;

    if (messages.length > prevLength) {
      const last = messages[messages.length - 1];
      if (last.role === 'user') {
        // User envoie → scroll vers le bas
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Assistant répond → scroll vers le début de sa réponse
        lastAssistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (wasLoading && !isLoading) {
      lastAssistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages, isLoading]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4" role="log">
      {messages.map((msg, idx) => {
        const isLastAssistant = msg.role === 'assistant' &&
          idx === messages.map(m => m.role).lastIndexOf('assistant');

        return (
          <div key={msg.id} ref={isLastAssistant ? lastAssistantRef : null}>
            <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                msg.role === 'assistant'
                  ? 'bg-blue-900 text-white rounded-bl-sm'
                  : 'bg-gray-100 text-gray-900 rounded-br-sm'
              }`}>
                <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
              </div>
            </div>
          </div>
        );
      })}

      {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}
```

### Typing Indicator

```tsx
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-blue-900 text-white rounded-2xl rounded-bl-sm px-4 py-2">
        <div className="flex items-center gap-1 py-2">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Markdown parser sécurisé

```typescript
function parseMarkdown(text: string): string {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1</a>'
    );

  // Listes à puces
  const lines = html.split('\n');
  let inList = false;
  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      if (!inList) { result.push('<ul class="list-disc list-inside my-2 space-y-1">'); inList = true; }
      result.push(`<li>${trimmed.substring(2)}</li>`);
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      result.push(trimmed === '' ? '<div class="h-3"></div>' : `<p>${line}</p>`);
    }
  }
  if (inList) result.push('</ul>');

  return result.join('');
}
```

### Chat Input

```tsx
'use client';

import { useState, useRef } from 'react';

export default function ChatInput({
  onSend, disabled,
}: { onSend: (msg: string) => void; disabled: boolean }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tapez votre message..."
          className="flex-1 resize-none rounded-lg border p-2"
          rows={2}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Envoyer
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Entrée pour envoyer, Shift+Entrée pour nouvelle ligne
      </p>
    </div>
  );
}
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/components/chat-interface.md
Crée un widget chat responsive pour mon projet avec auto-scroll et typing indicator
```

## Checklist

- [ ] Messages state géré dans le parent
- [ ] `isLoading` toggle pendant l'appel API
- [ ] Auto-scroll fonctionne (user → bas, assistant → début réponse)
- [ ] Escape ferme le widget
- [ ] Enter envoie, Shift+Enter nouvelle ligne
- [ ] Overlay mobile pour fermer

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Scroll saccadé | Re-render trop fréquent | Mémoriser avec `useRef` |
| XSS dans messages | HTML non échappé | Utiliser `parseMarkdown` avec échappement |
| Widget sous le contenu | z-index insuffisant | `z-50` minimum |
| Input non focusé | Focus perdu après envoi | `textareaRef.current?.focus()` dans `finally` |
