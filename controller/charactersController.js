const pool = require('../dbconnect');
class CharacterController {

    async getCharacters(req, res) {
        pool.query(`SELECT * FROM characters`, (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async getCharacterByName(req, res) {
        const name = req.params.name
        pool.query(`SELECT * FROM characters where name = '${name}'`, (err, result) => {
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

    async createCharacter(req, res) {
        const { name, health, healthRegen, damage, speed, armor, about, description, img } = req.body

        pool.query(`INSERT INTO characters (id, name, health, health_regen, damage, speed, armor, about, description, img) VALUES (NULL, "${name}", "${health}", "${healthRegen}", "${damage}","${speed}", "${armor}", "${about}", "${description}", "${img}")`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async updateCharacter(req, res) {
        const { id, name, health, healthRegen, damage, speed, armor, about, description, img } = req.body

        pool.query(`UPDATE characters SET name = '${name}', description = '${description}', about = '${about}', speed = '${speed}', health = '${health}', health_regen = '${healthRegen}', damage = '${damage}', armor = '${armor}', img = '${img}' WHERE characters . id = '${id}'`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async deleteCharacter(req, res) {
        const { id } = req.body

        pool.query(`DELETE FROM characters WHERE characters . id = ${id}`, [], (err, result) => {
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

module.exports = new CharacterController()