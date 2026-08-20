const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("To-Do API is running!");
});

app.get("/api/todos", (req, res) => {
    db.all("SELECT * FROM todos", [], (error, rows) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to fetch todos" });
        }

        res.json(rows);
    });
});

app.post("/api/todos", (req, res) => {
    const { title, due_date } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    db.run(
    "INSERT INTO todos (title, due_date) VALUES (?, ?)",
    [title, due_date],
        function (error) {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Failed to add todo" });
            }

           res.status(201).json({
                id: this.lastID,
                title: title,
                completed: 0,
                due_date: due_date
            });
        }
    );
});

app.put("/api/todos/:id", (req, res) => {
    const { title, completed, due_date } = req.body;
    const { id } = req.params;

    db.run(
        `UPDATE todos
         SET title = ?, completed = ?, due_date = ?
         WHERE id = ?`,
        [title, completed, due_date, id],
        function (error) {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Failed to update todo" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: "Todo not found" });
            }

            res.json({
                id: Number(id),
                title,
                completed,
                due_date
            });
        }
    );
});

app.delete("/api/todos/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "DELETE FROM todos WHERE id = ?",
        [id],
        function (error) {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Failed to delete todo" });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: "Todo not found" });
            }

            res.json({ message: "Todo deleted successfully" });
        }
    );
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});