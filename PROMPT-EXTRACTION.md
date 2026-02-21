# Prompt d'extraction de patterns

À utiliser dans un autre projet pour générer un rapport à intégrer dans diederick-starter.

Colle ce prompt dans Claude Code (ou Cursor) depuis le projet à analyser, puis rapporte le résultat dans diederick-starter pour que Claude fasse le diff et l'intégration.

---

```
Analyse ce projet et génère un rapport de patterns réutilisables.

Stack de référence : Next.js App Router, TypeScript strict, Supabase,
Gemini, OpenAI embeddings (768 dims), Langfuse, Pino, Tailwind CSS v4.

Pour chaque pattern trouvé (wrapper API, composant, recipe, workaround) :
1. Nom + catégorie
2. Description en 1 phrase
3. Code complet, copier-coller ready
4. Ce qui le rend spécifique ou amélioré par rapport à une implémentation basique

Liste aussi :
- Les packages npm hors stack de référence (nom, version, usage)
- Les conventions qui dévient du standard (commentaires FR/code EN,
  imports @/, named exports, cn(), createLogger, RLS partout)
- Les bugs/workarounds découverts dans le code

Sois exhaustif sur le code, synthétique sur les textes.
```

---

## Ensuite

Reviens dans diederick-starter et donne le rapport à Claude avec :

```
Voici le rapport d'extraction du projet [nom].
Intègre ce qui vaut la peine dans les bons fichiers PATTERNS/.
```
