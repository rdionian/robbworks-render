// // database/logs.js
// import Database from "better-sqlite3";
// import path from "path";

// const dbPath = path.join(process.cwd(), "database", "data.db");
// const db = new Database(dbPath);


// // ✅ Create the logs table if it doesn’t exist — all columns allow NULL
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS dev_logs (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title TEXT NULL,
//     date TEXT NULL,
//     text TEXT NULL,
//     images TEXT NULL,  -- Comma-separated image URLs
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//   )
// `).run();

// export function getAllLogs() {
//   const stmt = db.prepare(`SELECT * FROM dev_logs ORDER BY date DESC`);
//   return stmt.all();
// }

// export function addLog({ title, date, text_body, images }) {
//   const stmt = db.prepare(`
//     INSERT INTO dev_logs (title, date, text, images)
//     VALUES (?, ?, ?, ?)
//   `);
//   const info = stmt.run(title, date, text_body, images?.join(",") || "");
//   return { id: info.lastInsertRowid };
// }

// export function updateLog(id, { title, date, text_body, images }) {
//   const stmt = db.prepare(`
//     UPDATE dev_logs
//     SET title = ?, date = ?, text = ?, images = ?, updated_at = CURRENT_TIMESTAMP
//     WHERE id = ?
//   `);
//   return stmt.run(title, date, text_body, images?.join(",") || "", id);
// }

// export function deleteLog(id) {
//   const stmt = db.prepare(`DELETE FROM dev_logs WHERE id = ?`);
//   return stmt.run(id);
// }

// export default db;

// database/logs.js
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "database", "data.db");
const db = new Database(dbPath);

// ✅ Create the logs table if it doesn’t exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS dev_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NULL,
    date TEXT NULL,
    text TEXT NULL,
    media TEXT NULL,        -- JSON array of { type, src }
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// 🔹 Fetch all logs
export function getAllLogs() {
  const stmt = db.prepare(`SELECT * FROM dev_logs ORDER BY date DESC`);
  return stmt.all().map(log => ({
    ...log,
    media: JSON.parse(log.media || "[]")  // parse JSON on fetch
  }));
}

// 🔹 Add a new log
export function addLog({ title, date, text_body, media }) {
  const stmt = db.prepare(`
    INSERT INTO dev_logs (title, date, text, media)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(title, date, text_body, JSON.stringify(media || []));
  return { id: info.lastInsertRowid };
}

// 🔹 Update existing log
export function updateLog(id, { title, date, text_body, media }) {
  const stmt = db.prepare(`
    UPDATE dev_logs
    SET title = ?, date = ?, text = ?, media = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  return stmt.run(title, date, text_body, JSON.stringify(media || []), id);
}

// 🔹 Delete a log
export function deleteLog(id) {
  const stmt = db.prepare(`DELETE FROM dev_logs WHERE id = ?`);
  return stmt.run(id);
}

export default db;
