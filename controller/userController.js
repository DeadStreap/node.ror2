const con = require('../dbconnect')

class UserController {
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

    async updateAvatar(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { url, id } = req.body
            con.query(`UPDATE users SET img = '${url}' WHERE id = '${id}';`, (err, result) => {
                if (!err) {
                    res.json(result)
                }
                else {
                    res.send('Блять')
                    console.log(err)
                }
            })
    }

    async deleteAvatar(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const { id } = req.body
            con.query(`UPDATE users SET img = NULL WHERE id = '${id}';`, (err, result) => {
                if (!err) {
                    res.json(result)
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
                        } else {
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
        let { user_id, items_id } = req.body

        if (JSON.stringify(items_id) == '[]') {
            con.query(`UPDATE users SET favorite_items = null WHERE id = ${user_id}`, (err, result) => {
                if (!err) {
                    res.json(result)
                } else {
                    res.send('Блять')
                    console.log(err)
                }
            })
        } else {
            con.query(`UPDATE users SET favorite_items = '${items_id}' WHERE id = ${user_id}`, (err, result) => {
                if (!err) {
                    res.json(result)
                } else {
                    res.send('Блять')
                    console.log(err)
                }
            })
        }
    }

    async getUsers(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        con.query(`SELECT * FROM users`, (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }
    
    async getUserById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const id = req.params.id;
        con.query(`SELECT * FROM users WHERE users . id = ${id}`, [], (err, result) => {
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

module.exports = new UserController()