# Google Sheets API Wrapper

> CRUD complet sur Google Sheets via JWT auth (service account).
> Source : `listing clients (CRM simplifié)/crm-app/src/lib/googleSheets.ts`

## Quand l'utiliser

- CRM léger ou gestion de données simples dans Google Sheets
- Dashboard qui lit/écrit dans un spreadsheet partagé
- Prototype rapide sans base de données

## Quand NE PAS l'utiliser

- Plus de 10K lignes (trop lent, utiliser Supabase)
- Besoin de relations complexes (utiliser une vraie DB)
- Multi-utilisateurs concurrents (risque de conflits)

## Contexte

- Auth via JWT (service account) — pas d'OAuth utilisateur
- `GOOGLE_PRIVATE_KEY` contient des `\n` échappés → remplacer avant usage
- Header row auto-créé si absente
- Column letters calculées dynamiquement (A, B, ... Z, AA, AB)

## Code

### Client et contexte

```typescript
import { google, sheets_v4 } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

type SheetContext = {
  sheets: sheets_v4.Sheets;
  spreadsheetId: string;
  sheetTitle: string;
};

export type SheetValue = string | number | boolean | null | undefined;

/** Convertit un index 1-based en lettre de colonne (1→A, 27→AA) */
const toColumnLetter = (index: number) => {
  let dividend = index;
  let columnName = '';
  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }
  return columnName;
};

/** Client Sheets avec JWT auth */
const getSheetsClient = () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Google Sheets credentials manquantes');
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });
  return google.sheets({ version: 'v4', auth });
};

/** Récupère le contexte complet (client + IDs) */
export const getSheetContext = async (): Promise<SheetContext> => {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  // Titre de la feuille (configurable ou auto-détecté)
  const sheetTitle = process.env.GOOGLE_SHEET_TITLE
    || (await sheets.spreadsheets.get({ spreadsheetId }))
        .data.sheets?.[0]?.properties?.title
    || 'Sheet1';

  return { sheets, spreadsheetId, sheetTitle };
};
```

### CRUD Operations

```typescript
// Colonnes du CRM (à adapter)
const COLUMNS = ['Nom', 'Email', 'Téléphone', 'Statut', 'Notes'] as const;
type Column = typeof COLUMNS[number];

/** Assure que la row header existe */
export const ensureHeaderRow = async (
  ctx: SheetContext,
  headers: string[] = [...COLUMNS],
) => {
  const range = `${ctx.sheetTitle}!1:1`;
  const current = await ctx.sheets.spreadsheets.values.get({
    spreadsheetId: ctx.spreadsheetId,
    range,
  });

  const existing = current.data.values?.[0];
  const isEmpty = !existing || existing.every((cell) => !cell || `${cell}`.trim() === '');

  if (isEmpty) {
    await ctx.sheets.spreadsheets.values.update({
      spreadsheetId: ctx.spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }
};

/** Lire toutes les lignes */
export const fetchRows = async (
  ctx: SheetContext,
  headers: readonly string[] = COLUMNS,
) => {
  await ensureHeaderRow(ctx, [...headers]);
  const endColumn = toColumnLetter(headers.length);
  const range = `${ctx.sheetTitle}!A2:${endColumn}`;

  const res = await ctx.sheets.spreadsheets.values.get({
    spreadsheetId: ctx.spreadsheetId,
    range,
    majorDimension: 'ROWS',
  });

  const values = res.data.values ?? [];
  return values.map((row) => {
    const record: Record<string, string> = {};
    headers.forEach((header, idx) => {
      record[header] = row[idx] ?? '';
    });
    return record;
  });
};

/** Ajouter des lignes */
export const appendRows = async (
  ctx: SheetContext,
  records: Partial<Record<Column, SheetValue>>[],
  headers: readonly string[] = COLUMNS,
) => {
  if (!records.length) return 0;
  await ensureHeaderRow(ctx, [...headers]);
  const endColumn = toColumnLetter(headers.length);
  const range = `${ctx.sheetTitle}!A1:${endColumn}`;

  const values = records.map((record) =>
    headers.map((header) => {
      const value = record[header as Column];
      if (value === undefined || value === null) return '';
      if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
      return `${value}`;
    }),
  );

  await ctx.sheets.spreadsheets.values.append({
    spreadsheetId: ctx.spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values },
  });

  return records.length;
};
```

### Usage dans une API route

```typescript
import { getSheetContext, fetchRows, appendRows } from '@/lib/googleSheets';

export async function GET() {
  const ctx = await getSheetContext();
  const rows = await fetchRows(ctx);
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const body = await request.json();
  const ctx = await getSheetContext();
  const count = await appendRows(ctx, [body]);
  return NextResponse.json({ inserted: count });
}
```

## Variables d'environnement

```env
GOOGLE_CLIENT_EMAIL=mon-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
GOOGLE_SHEET_TITLE=Feuille 1  # Optionnel (auto-détecté)
```

## Dépendances

```bash
npm install googleapis
```

## Usage avec @Docs

```
@Docs ~/repo-starter/PATTERNS/api-wrappers/google-sheets.md
Crée un wrapper Google Sheets pour lire et écrire des données CRM
```

## Checklist

- [ ] Service account créé dans Google Cloud Console
- [ ] API Google Sheets activée
- [ ] Spreadsheet partagé avec le service account email
- [ ] `GOOGLE_PRIVATE_KEY` avec les `\n` échappés entre guillemets
- [ ] Colonnes définies comme constante typée

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| 403 Forbidden | Sheet pas partagé | Partager avec `GOOGLE_CLIENT_EMAIL` |
| `\n` dans la clé | Pas d'échappement | `.replace(/\\n/g, '\n')` |
| Header row écrasé | Pas de guard | Utiliser `ensureHeaderRow` |
| Colonnes décalées | Index 0 vs 1 | `toColumnLetter` est 1-based |
