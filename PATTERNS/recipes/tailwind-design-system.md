# Recipe: Tailwind Design System

> Configuration Tailwind avec design tokens, animations, et shadows custom.
> Source : `ressourcerie-menuiserie/tailwind.config.ts`

## Quand l'utiliser

- Tout projet Next.js avec Tailwind
- Besoin d'un design system cohérent (couleurs, ombres, animations)
- Tailwind v3 (pour v4, voir la note en bas)

## Code

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // --- Couleurs avec palette complète ---
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',  // Couleur principale
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          teal: '#14b8a6',
          violet: '#8b5cf6',
          blue: '#3b82f6',
          rose: '#f43f5e',
        },
      },

      // --- Typographie ---
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      // --- Border radius ---
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },

      // --- Shadows ---
      boxShadow: {
        glass: '0 8px 32px rgba(99, 102, 241, 0.1)',
        glow: '0 0 40px rgba(99, 102, 241, 0.15)',
        soft: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        medium: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)',
        large: '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05)',
      },

      // --- Backdrop blur ---
      backdropBlur: {
        xs: '2px',
        glass: '12px',
        strong: '20px',
      },

      // --- Animations ---
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.3s ease-out',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### CSS variables (app/globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
  --font-inter: 'Inter', sans-serif;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Composants utilitaires

```tsx
// Glassmorphism card
<div className="bg-white/80 backdrop-blur-glass shadow-glass rounded-xl p-6 border border-white/20">
  {children}
</div>

// Animated entry
<div className="animate-fadeIn">
  {children}
</div>

// Shimmer loading skeleton
<div className="h-4 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />

// Glow button
<button className="bg-primary-500 text-white px-6 py-3 rounded-lg shadow-glow hover:bg-primary-600 transition-colors">
  Action
</button>
```

### Note Tailwind v4

Pour Tailwind v4 (CSS-first), la config se fait dans `app/globals.css` :

```css
@import "tailwindcss";

@theme {
  --color-primary-500: #6366f1;
  --color-accent-teal: #14b8a6;
  --font-family-sans: 'Inter', sans-serif;
  --animate-fade-in: fadeIn 0.3s ease-out;
}
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/recipes/tailwind-design-system.md
Configure le design system Tailwind avec couleurs, animations et shadows custom
```

## Checklist

- [ ] Couleurs primary/accent définies
- [ ] Font family configurée avec CSS variable
- [ ] Animations de base (fadeIn, slideIn)
- [ ] Shadows graduées (soft, medium, large)
- [ ] Dark mode via CSS variables ou Tailwind `dark:`
