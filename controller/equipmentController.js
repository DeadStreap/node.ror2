const con = require('../dbconnect')

class EquipmentController {
    
    async createEquipment(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { name, about, description, rarity, cooldown, img } = req.body
        con.query(`INSERT INTO equipments (id, name, about, description, rarity, cooldown, img) VALUES (NULL, "${name}", "${about}", "${description}", "${rarity}","${cooldown}", "${img}")`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async getEquipments(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        con.query(`SELECT * FROM equipments`, (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async getEquipmentById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const id = req.params.id;
        const sql = 'SELECT * FROM equipments WHERE id = ?';

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

    async getEquipmentByName(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const name = req.params.name
        con.query(`SELECT * FROM equipments where name = "${name}"`, (err, result) => {
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
}

module.exports = new EquipmentController()