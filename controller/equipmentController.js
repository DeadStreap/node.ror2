const pool = require('../dbconnect');

class EquipmentController {

    async createEquipment(req, res) {
        const { name, about, description, rarity, cooldown, img } = req.body
        pool.query(`INSERT INTO equipments (id, name, about, description, rarity, cooldown, img) VALUES (NULL, "${name}", "${about}", "${description}", "${rarity}","${cooldown}", "${img}")`, [], (err, result) => {
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
        pool.query(`SELECT * FROM equipments`, (err, result) => {
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
            const id = req.params.id;
            const sql = 'SELECT * FROM equipments WHERE id = ?';

        try {
            const rows = await pool.query(sql, [id]);
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
        const name = req.params.name
        pool.query(`SELECT * FROM equipments where name = "${name}"`, (err, result) => {
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

    async updateEquipment(req, res) {
        const { id, name, about, description, rarity, cooldown, img } = req.body

        pool.query(`UPDATE equipments SET name = '${name}', about = '${about}', description = '${description}', rarity = '${rarity}', cooldown = '${cooldown}', img = '${img}' WHERE equipments . id = '${id}'`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
        }
        })
    }

    async deleteEquipment(req, res) {

        const { id } = req.body

        pool.query(`DELETE FROM equipments WHERE equipments . id = ${id}`, [], (err, result) => {
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

module.exports = new EquipmentController()