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
}

module.exports = new CharacterController()