#!/usr/bin/env node

/**
 * setup-db.mjs — Script d'initialisation de la base de données Supabase
 *
 * Usage :
 *   node scripts/setup-db.mjs
 *   npm run setup-db
 *
 * Ce script :
 * 1. Vérifie la connexion à Supabase
 * 2. Applique les migrations SQL dans l'ordre
 * 3. Affiche un résumé des opérations
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "..", "database", "migrations");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "❌ Variables manquantes : NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY"
  );
  console.error("   Copie .env.example vers .env.local et remplis les valeurs.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function checkConnection() {
  console.log("\n🔌 Vérification de la connexion Supabase...");
  console.log(`   URL : ${supabaseUrl}`);

  const { error } = await supabase.from("_migrations").select("*").limit(1);

  // La table n'existe probablement pas encore, mais si on obtient une réponse
  // sans erreur réseau, la connexion fonctionne
  if (error && error.message.includes("Failed to fetch")) {
    console.error("❌ Impossible de se connecter à Supabase.");
    console.error(`   Erreur : ${error.message}`);
    process.exit(1);
  }

  console.log("✅ Connexion Supabase OK\n");
}

async function getMigrationFiles() {
  let files;
  try {
    files = readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith(".sql"))
      .sort();
  } catch {
    console.log("📁 Aucun dossier migrations trouvé. Création...");
    console.log(`   ${MIGRATIONS_DIR}`);
    return [];
  }

  return files;
}

async function runMigration(filename) {
  const filePath = join(MIGRATIONS_DIR, filename);
  const sql = readFileSync(filePath, "utf-8");

  console.log(`   📄 ${filename}...`);

  // Exécuter le SQL via la fonction rpc si disponible,
  // sinon via l'API REST de Supabase
  const { error } = await supabase.rpc("exec_sql", { query: sql });

  if (error) {
    // Fallback : essayer via le endpoint SQL direct
    console.log(`   ⚠️  rpc exec_sql non disponible, tentative directe...`);
    console.log(
      `   💡 Exécute manuellement ce fichier dans le SQL Editor de Supabase :`
    );
    console.log(`      ${filePath}\n`);
    return false;
  }

  return true;
}

async function main() {
  console.log("🚀 Setup DB — diederick-starter\n");
  console.log("=".repeat(50));

  await checkConnection();

  const files = await getMigrationFiles();

  if (files.length === 0) {
    console.log("📋 Aucune migration à exécuter.");
    console.log("   Ajoute des fichiers .sql dans database/migrations/");
    console.log('   Format : 001_nom_migration.sql, 002_autre.sql, etc.\n');
    return;
  }

  console.log(`📋 ${files.length} migration(s) trouvée(s) :\n`);

  let success = 0;
  let manual = 0;

  for (const file of files) {
    const ok = await runMigration(file);
    if (ok) success++;
    else manual++;
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ ${success} migration(s) appliquée(s)`);
  if (manual > 0) {
    console.log(`⚠️  ${manual} migration(s) à appliquer manuellement`);
  }
  console.log("");
}

main().catch((err) => {
  console.error("❌ Erreur inattendue :", err.message);
  process.exit(1);
});
