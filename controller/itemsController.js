const pool = require('../dbconnect');

class ItemController {

    javascript
    async getItemById(req, res) {
        try {
            const id = req.params.id;
            const sql = 'SELECT * FROM items WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);

            if (rows.length === 0) {
                res.status(404).json('Not found');
            } else {
                res.json(rows);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getItemByRarity(req, res) {
        try {
            const rarity = req.params.rarity;
            const [result] = await pool.query(`SELECT * FROM items where rarity = '${rarity}'`);

            if (result.length === 0) {
                res.json('Not found');
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getItemByName(req, res) {
        try {
            const name = req.params.name;
            const [result] = await pool.query(`SELECT * FROM items where name = "${name}"`);

            if (result.length === 0) {
                res.json('Not found');
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async createItem(req, res) {
        try {
            const { name, about, description, rarity, category, stack, FromDLC, img } = req.body;
            const [result] = await pool.query(`INSERT INTO items (name, about, description, rarity, category, stack, FromDLC, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [name, about, description, rarity, category, stack, FromDLC, img]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async updateItem(req, res) {
        try {
            const { id, name, description, about, rarity, category, stack, FromDLC, img } = req.body;
            const [result] = await pool.query(`UPDATE items SET name = ?, description = ?, about = ?, rarity = ?, category = ?, stack = ?, FromDLC = ?, img = ? WHERE id = ?`, [name, description, about, rarity, category, stack, FromDLC, img, id]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.body;
            const [result] = await pool.query(`DELETE FROM items WHERE id = ?`, [id]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getItems(req, res) {
        try {
            const [rows, fields] = await pool.query(`SELECT * FROM items`);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

}

module.exports = new ItemController()