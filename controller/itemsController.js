const con = require('../dbconnect')

class ItemController {
    
    
    // async getItemById(req, res) {
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     const id = req.params.id
    //     con.query(`SELECT * FROM items where id = '${id}'`, (err, result) => {
    //         if (!err) {
    //             if (result.length == 0) {
    //                 res.json('Not found')
    //             } else {
    //                 res.json(result)
    //             }
    //         }
    //         else {
    //             res.send('Блять')
    //             console.log(err)
    //         }
    //     })
    // }

    async getItemById(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const id = req.params.id;
        const sql = 'SELECT * FROM items WHERE id = ?';
    
        try {
            const rows = await con.query(sql, [id]);
            if (rows.length === 0) {
                res.status(404).json('Not found');
            } else {
                res.json(rows);
            }
        } catch (error) {
            res.send('Блять')
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getItemByRarity(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const rarity = req.params.rarity
        con.query(`SELECT * FROM items where rarity = '${rarity}'`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.json('Not found')
                } else {
                    res.json(result)
                }
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async getItemByName(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const name = req.params.name
        con.query(`SELECT * FROM items where name = "${name}"`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.json('Not found')
                } else {
                    res.json(result)
                }
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async createItem(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { id, name, about, description, rarity, category, stack, FromDLC, img } = req.body

        con.query(`INSERT INTO items (id, name, about, description, rarity, category, stack, FromDLC, img) VALUES ("${id}", "${name}", "${about}", "${description}", "${rarity}","${category}", "${stack}", "${FromDLC}", "${img}")`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async getItems(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        con.query(`SELECT * FROM items`, (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

}

module.exports = new ItemController()