// Migration script: Vercel Postgres → Render Postgres
// Usage: node migrate.js "your-vercel-postgres-url"

require("dotenv").config();
const { Client } = require("pg");

const OLD_URL = process.argv[2];
const NEW_URL = process.env.POSTGRES_URL;

if (!OLD_URL) {
  console.error("Usage: node migrate.js \"your-vercel-postgres-url\"");
  process.exit(1);
}
if (!NEW_URL) {
  console.error("POSTGRES_URL env var not set (your Render DB URL)");
  process.exit(1);
}

async function migrate() {
  const src = new Client({ connectionString: OLD_URL, ssl: { rejectUnauthorized: false } });
  const dst = new Client({ connectionString: NEW_URL, ssl: { rejectUnauthorized: false } });

  await src.connect();
  await dst.connect();
  console.log("Connected to both databases.");

  // Create tables on Render
  await dst.query(`
    CREATE TABLE IF NOT EXISTS signups (
      id SERIAL PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT NOT NULL,
      category TEXT,
      message TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await dst.query(`
    CREATE TABLE IF NOT EXISTS log_entries (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      text_body TEXT NOT NULL,
      media TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await dst.query(`
    CREATE TABLE IF NOT EXISTS technical_logs (
      id SERIAL PRIMARY KEY,
      development_progress TEXT,
      game_mechanics TEXT,
      art_design TEXT,
      audio TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await dst.query(`
    CREATE TABLE IF NOT EXISTS triviaquestions (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      correctindex INTEGER NOT NULL,
      category TEXT,
      addedby TEXT,
      dateadded TEXT
    )
  `);
  await dst.query(`ALTER TABLE triviaquestions ADD COLUMN IF NOT EXISTS addedby TEXT`);
  await dst.query(`ALTER TABLE triviaquestions ADD COLUMN IF NOT EXISTS dateadded TEXT`);
  await dst.query(`
    CREATE TABLE IF NOT EXISTS customquizzes (
      id SERIAL PRIMARY KEY,
      code TEXT NOT NULL,
      name TEXT,
      questionids TEXT,
      customquestions TEXT,
      createdby TEXT,
      createdat TIMESTAMPTZ DEFAULT NOW(),
      category TEXT
    )
  `);
  await dst.query(`ALTER TABLE customquizzes ADD COLUMN IF NOT EXISTS category TEXT`);
  console.log("Tables created on Render.");

  const tables = ["signups", "log_entries", "technical_logs", "triviaquestions", "customquizzes"];

  for (const table of tables) {
    let rows;
    try {
      ({ rows } = await src.query(`SELECT * FROM ${table}`));
    } catch {
      console.log(`${table}: does not exist on source, skipping.`);
      continue;
    }
    if (rows.length === 0) {
      console.log(`${table}: 0 rows, skipping.`);
      continue;
    }

    const cols = Object.keys(rows[0]).filter(c => c !== "id");
    for (const row of rows) {
      const vals = cols.map(c => row[c]);
      const placeholders = vals.map((_, i) => `$${i + 1}`).join(", ");
      await dst.query(
        `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${placeholders})`,
        vals
      );
    }

    // Reset sequence so new inserts don't conflict
    await dst.query(
      `SELECT setval(pg_get_serial_sequence('${table}', 'id'), MAX(id)) FROM ${table}`
    );

    console.log(`${table}: migrated ${rows.length} rows.`);
  }

  await src.end();
  await dst.end();
  console.log("Migration complete.");
}

migrate().catch(err => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
