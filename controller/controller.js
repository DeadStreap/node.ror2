const con = require('../dbconnect')

class ItemController {

    async getItemById(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const id = req.params.id
        con.query(`SELECT * FROM items where id = '${id}'`, (err, result) => {
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

    async regUser(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { login, password, email } = req.body
        if (login != '' && password != "" && email != "") {
            con.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
                if (result.length == 0) {
                    con.query(`INSERT INTO users (login, password, email) VALUES ("${login}", "${password}","${email}")`, [], (err, result) => {
                        if (!err) {
                            res.send('You have been successfully registered')
                        }
                        else {
                            res.send('Блять')
                            console.log(err)
                        }
                    });
                } else {
                    res.send('This email has already been used')
                }
            });
        } else {
            res.send('Not all fields were filled')
        }
    }

    async authUser(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { login, password } = req.body
        con.query(`SELECT * FROM users where login = '${login}'`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.status(409).json('Not found user with that login')
                } else {
                    if (result[0]['password'] == password) {
                        res.json(result)
                    } else {
                        res.status(410).json('Wrong password')
                    }
                }
            }
            else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async getUserFavoriteAll(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const user_id = req.params.user_id
        con.query(`SELECT favorite_items FROM users where id = ${user_id}`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.status(409).send(false)
                } else {
                    let ItemsId = result[0].favorite_items
                     con.query(`SELECT * FROM items where id in (${ItemsId})`, (err, itemInf) => {
                        if (!err) {
                                res.json(itemInf)
                        }else {
                            res.send('Блять')
                            console.log(err)
                        }
                    })
                }
            } else {
                res.send('Блять')
                console.log(err)
            }
        })
    }
    
    async getUserFavoriteId(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const user_id = req.params.user_id
        con.query(`SELECT favorite_items FROM users where id = ${user_id}`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.status(409).send(false)
                } else {
                    res.json(result)
                }
            } else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

    async addUserFavorite(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { user_id, items_id } = req.body
        con.query(`UPDATE users SET favorite_items = '${items_id}' WHERE id = '${user_id}'`, (err, result) => {
            if (!err) {
                res.json(result)
            } else {
                res.send('Блять')
                console.log(err)
            }
        })
    }

}

module.exports = new ItemController()