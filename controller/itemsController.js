const pool = require('../dbconnect');

class ItemController {

    async getItemById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const id = req.params.id;
        const sql = 'SELECT * FROM items WHERE id = ?';

        try {
            const rows = await pool.query(sql, [id]);
            if (rows.length === 0) {
                res.status(404).json('Not found');
            } else {
                res.json(rows);
            }
        } catch (error) {
            res.send(err)
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getItemByRarity(req, res) {
        const rarity = req.params.rarity
        pool.query(`SELECT * FROM items where rarity = '${rarity}'`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.json('Not found')
                } else {
                    res.json(result)
                }
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async getItemByName(req, res) {
        const name = req.params.name
        pool.query(`SELECT * FROM items where name = "${name}"`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.json('Not found')
                } else {
                    res.json(result)
                }
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async createItem(req, res) {
        const { name, about, description, rarity, category, stack, FromDLC, img } = req.body

        pool.query(`INSERT INTO items (id, name, about, description, rarity, category, stack, FromDLC, img) VALUES (NULL, "${name}", "${about}", "${description}", "${rarity}","${category}", "${stack}", "${FromDLC}", "${img}")`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async updateItem(req, res) {
        const { id, name, description, about, rarity, category, stack, FromDLC, img } = req.body

        pool.query(`UPDATE items SET name = '${name}', description = '${description}', about = '${about}', rarity = '${rarity}', category = '${category}', stack = '${stack}', FromDLC = '${FromDLC}', img = '${img}' WHERE items . id = '${id}'`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async deleteItem(req, res) {
        const { id } = req.body

        pool.query(`DELETE FROM items WHERE items . id = ${id}`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async getItems(req, res) {
        pool.query(`SELECT * FROM items`, (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

}

module.exports = new ItemController()