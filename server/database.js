const sqlite = require("sqlite3/lib/sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "db.sqlite");
const db = new sqlite.Database(dbPath);

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0,
            due_date TEXT
        )
    `);
});

module.exports = db;