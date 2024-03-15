const pool = require('../dbconnect');

class CharacterController {

    async getCharacters(req, res) {
        try {
            const [result] = await pool.query(`SELECT * FROM characters`);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getCharacterByName(req, res) {
        try {
            const name = req.params.name;
            const [result] = await pool.query(`SELECT * FROM characters where name = ?`, [name]);

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

    async createCharacter(req, res) {
        try {
            const { name, health, healthRegen, damage, speed, armor, about, description, img } = req.body;
            const result = await pool.query(`INSERT INTO characters (id, name, health, health_regen, damage, speed, armor, about, description, img) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [name, health, healthRegen, damage, speed, armor, about, description, img]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async updateCharacter(req, res) {
        try {
            const { id, name, health, healthRegen, damage, speed, armor, about, description, img } = req.body;
            const result = await pool.query(`UPDATE characters SET name = ?, description = ?, about = ?, speed = ?, health = ?, health_regen = ?, damage = ?, armor = ?, img = ? WHERE id = ?`, [name, description, about, speed, health, healthRegen, damage, armor, img, id]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteCharacter(req, res) {
        try {
            const { id } = req.body;
            const result = await pool.query(`DELETE FROM characters WHERE id = ?`, [id]);

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new CharacterController()