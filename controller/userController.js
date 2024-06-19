const pool = require('../dbconnect');

class UserController {
    async regUser(req, res) {
        const { login, password, email } = req.body
        if (login != '' && password != "" && email != "") {
            pool.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
                if (result.length == 0) {
                    pool.query(`INSERT INTO users (login, password, email, admin) VALUES ("${login}", "${password}","${email}", false)`, [], (err, result) => {
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
        const { login, password } = req.body
        pool.query(`SELECT * FROM users where login = '${login}'`, (err, result) => {
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
        const { url, id } = req.body
            pool.query(`UPDATE users SET img = '${url}' WHERE id = '${id}';`, (err, result) => {
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
        const { id } = req.body
            pool.query(`UPDATE users SET img = NULL WHERE id = '${id}';`, (err, result) => {
                if (!err) {
                    res.json(result)
                }
                else {
                    res.send('Блять')
                    console.log(err)
                }
            })
    }

    async updateAdmin(req, res) {
        const { isAdmin, id } = req.body
            pool.query(`UPDATE users SET admin = '${isAdmin}' WHERE id = '${id}';`, (err, result) => {
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
        const user_id = req.params.user_id
        pool.query(`SELECT favorite_items FROM users where id = ${user_id}`, (err, result) => {
            if (!err) {
                if (result.length == 0) {
                    res.status(409).send(false)
                } else {
                    let ItemsId = result[0].favorite_items
                    pool.query(`SELECT * FROM items where id in (${ItemsId})`, (err, itemInf) => {
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
        const user_id = req.params.user_id
        pool.query(`SELECT favorite_items FROM users where id = ${user_id}`, (err, result) => {
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
        let { user_id, items_id } = req.body

        if (JSON.stringify(items_id) == '[]') {
            pool.query(`UPDATE users SET favorite_items = null WHERE id = ${user_id}`, (err, result) => {
                if (!err) {
                    res.json(result)
                } else {
                    res.send('Блять')
                    console.log(err)
                }
            })
        } else {
            pool.query(`UPDATE users SET favorite_items = '${items_id}' WHERE id = ${user_id}`, (err, result) => {
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
        pool.query(`SELECT * FROM users`, (err, result) => {
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
        const id = req.params.id;
        pool.query(`SELECT * FROM users WHERE users . id = ${id}`, [], (err, result) => {
            if (!err) {
                res.json(result)
            }
            else {
                res.send(err)
                console.log(err)
            }
        })
    }

    async deleteUser(req, res) {
        const { id } = req.body

        pool.query(`DELETE FROM users WHERE users . id = ${id}`, [], (err, result) => {
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