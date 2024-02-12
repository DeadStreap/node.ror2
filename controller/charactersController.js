const con = require('../dbconnect')

class CharacterController {

    async getCharacters(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        con.query(`SELECT * FROM characters`, (err, result) => {
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        const name = req.params.name
        con.query(`SELECT * FROM characters where name = '${name}'`, (err, result) => {
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { name, health, healthRegen, damage, speed, armor, about, description, img } = req.body

        con.query(`INSERT INTO characters (id, name, health, health_regen, damage, speed, armor, about, description, img) VALUES (NULL, "${name}", "${health}", "${healthRegen}", "${damage}","${speed}", "${armor}", "${about}", "${description}", "${img}")`, [], (err, result) => {
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { id, name, health, healthRegen, damage, speed, armor, about, description, img} = req.body

        con.query(`UPDATE characters SET name = '${name}', description = '${description}', about = '${about}', speed = '${speed}', health = '${health}', health_regen = '${healthRegen}', damage = '${damage}', armor = '${armor}', img = '${img}' WHERE charcters . id = '${id}'`, [], (err, result) => {
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { id } = req.body

        con.query(`DELETE FROM characters WHERE characters . id = ${id}`, [], (err, result) => {
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