const pool = require('../dbconnect');

class EquipmentController {

    async createEquipment(req, res) {
        try {
            const { name, about, description, rarity, cooldown, img } = req.body;
            const result = await pool.query(`INSERT INTO equipments (id, name, about, description, rarity, cooldown, img) VALUES (NULL, ?, ?, ?, ?, ?, ?)`, [name, about, description, rarity, cooldown, img]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getEquipments(req, res) {
        try {
            const [result] = await pool.query(`SELECT * FROM equipments`);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getEquipmentById(req, res) {
        try {
            const id = req.params.id;
            const sql = 'SELECT * FROM equipments WHERE id = ?';
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

    async getEquipmentByName(req, res) {
        try {
            const name = req.params.name;
            const [result] = await pool.query(`SELECT * FROM equipments where name = ?`, [name]);

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

    async updateEquipment(req, res) {
        try {
            const { id, name, about, description, rarity, cooldown, img } = req.body;
            const result = await pool.query(`UPDATE equipments SET name = ?, about = ?, description = ?, rarity = ?, cooldown = ?, img = ? WHERE id = ?`, [name, about, description, rarity, cooldown, img, id]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteEquipment(req, res) {
        try {
            const { id } = req.body;
            const result = await pool.query(`DELETE FROM equipments WHERE id = ?`, [id]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new EquipmentController()