const pool = require('../dbconnect');

class UserController {

    // async regUser(req, res) {
    //     const { login, password, email } = req.body
    //     if (login != '' && password != "" && email != "") {
    //         pool.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
    //             if (result.length == 0) {
    //                 pool.query(`INSERT INTO users (login, password, email) VALUES ("${login}", "${password}","${email}")`, [], (err, result) => {
    //                     if (!err) {
    //                         res.send('You have been successfully registered')
    //                     }
    //                     else {
    //                         res.send('Блять')
    //                         console.log(err)
    //                     }
    //                 });
    //             } else {
    //                 res.send('This email has already been used')
    //             }
    //         });
    //     } else {
    //         res.send('Not all fields were filled')
    //     }
    // }

    async regUser(req, res) {
        const { login, password, email } = req.body;
        if (login === '' || password === "" || email === "") {
            return res.send('Not all fields were filled');
        }
    
        try {
            const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await pool.query(checkEmailQuery, [email]);
    
            if (rows.length > 0) {
                return res.send('This email has already been used');
            }
    
            const insertUserQuery = 'INSERT INTO users (login, password, email) VALUES (?, ?, ?)';
            await pool.query(insertUserQuery, [login, password, email]);
            
            res.send('You have been successfully registered');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    // async authUser(req, res) {
    //     const { login, password } = req.body
    //     pool.query(`SELECT * FROM users where login = '${login}'`, (err, result) => {
    //         if (!err) {
    //             if (result.length == 0) {
    //                 res.status(409).json('Not found user with that login')
    //             } else {
    //                 if (result[0]['password'] == password) {
    //                     res.json(result)
    //                 } else {
    //                     res.status(410).json('Wrong password')
    //                 }
    //             }
    //         }
    //         else {
    //             res.send('Блять')
    //             console.log(err)
    //         }
    //     })
    // }
    async authUser(req, res) {
        const { login, password } = req.body;
    
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE login = ?', [login]);
    
            if (rows.length === 0) {
                return res.status(409).json('Not found user with that login');
            }
    
            const user = rows[0];
            if (user.password === password) {
                return res.json(user);
            } else {
                return res.status(410).json('Wrong password');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Блять');
        }
    }

    // async updateAvatar(req, res) {
    //     const { url, id } = req.body
    //         pool.query(`UPDATE users SET img = '${url}' WHERE id = '${id}';`, (err, result) => {
    //             if (!err) {
    //                 res.json(result)
    //             }
    //             else {
    //                 res.send('Блять')
    //                 console.log(err)
    //             }
    //         })
    // }

    async updateAvatar(req, res) {
        const { url, id } = req.body;
    
        try {
            const updateQuery = 'UPDATE users SET img = ? WHERE id = ?';
            await pool.query(updateQuery, [url, id]);
    
            return res.json(result)
        } catch (error) {
            res.send('Блять')
            console.log(err)
        }
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

    // async deleteAvatar(req, res) {
    //     const { id } = req.body;
    
    //     try {
    //         const updateQuery = 'UPDATE users SET img = NULL WHERE id = ?';
    //         await pool.query(updateQuery, [id]);
    
    //         res.json(result)
    //     } catch (error) {
    //         res.send('Блять')
    //         console.log(err)
    //     }
    // }

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

    // async getUserFavoriteAll(req, res) {
    //     const user_id = req.params.user_id
    //     pool.query(`SELECT favorite_items FROM users where id = ${user_id}`, (err, result) => {
    //         if (!err) {
    //             if (result.length == 0) {
    //                 res.status(409).send(false)
    //             } else {
    //                 let ItemsId = result[0].favorite_items
    //                 pool.query(`SELECT * FROM items where id in (${ItemsId})`, (err, itemInf) => {
    //                     if (!err) {
    //                         res.json(itemInf)
    //                     } else {
    //                         res.send('Блять')
    //                         console.log(err)
    //                     }
    //                 })
    //             }
    //         } else {
    //             res.send('Блять')
    //             console.log(err)
    //         }
    //     })
    // }

    async getUserFavoriteAll(req, res) {
        const user_id = req.params.user_id;
    
        try {
            const query = `
                SELECT i.*
                FROM users AS u
                JOIN items AS i ON i.id IN (u.favorite_items)
                WHERE u.id = ?
            `;
            
            const [rows] = await pool.query(query, [user_id]);
    
            if (rows.length === 0) {
                return res.status(409).send(false);
            }
    
            return res.json(rows);
        } catch (error) {
            res.send('Блять')
            console.log(err)
        }
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