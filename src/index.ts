import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 3000;

// Initialize SQLite database
const db = new sqlite3.Database('./database.db');

// Create table if not exists
db.run(`
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )
`);

// Middleware
app.use(express.json());

// Routes
// Create item
app.post('/items', (req: Request, res: Response) => {
    const { name, description } = req.body;
    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
        res.status(201).json({ id: this.lastID, name, description });
    });
});

// Read all items
app.get('/items', (req: Request, res: Response) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
        res.json(rows);
    });
});

// Get item
app.get('/item/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    db.get('SELECT * FROM items WHERE id = ?', [id], function (err, row) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error')
        }
        res.json(row);
    });
});

// Update item
app.put('/item/:id', (req: Request, res: Response) => {
    const itemId = req.params.id;
    const { name, description } = req.body;
    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, itemId], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
        res.json({ id: itemId, name, description });
    });
});

// Delete item
app.delete('/item/:id', (req: Request, res: Response) => {
    const itemId = req.params.id;
    db.run('DELETE FROM items WHERE id = ?', [itemId], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
        res.sendStatus(204);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
