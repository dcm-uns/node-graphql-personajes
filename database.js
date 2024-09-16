const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./characters.db');

// Inicializar base de datos
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      movie TEXT NOT NULL
    )
  `);
});

module.exports = db;
