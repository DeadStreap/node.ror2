const pool = require('../dbconnect');

class UserController {
    async regUser(req, res) {
        try {
            const { login, password, email } = req.body;
            if (login !== '' && password !== "" && email !== "") {
                const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);

                if (result.length === 0) {
                    await pool.query(`INSERT INTO users (login, password, email) VALUES (?, ?, ?)`, [login, password, email]);
                    res.send('You have been successfully registered');
                } else {
                    res.send('This email has already been used');
                }
            } else {
                res.send('Not all fields were filled');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async authUser(req, res) {
        try {
            const { username, password } = req.body;
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

            if (rows.length > 0) {
                res.json({ message: 'User authenticated' });
            } else {
                res.status(401).json({ message: 'Authentication failed' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async updateAvatar(req, res) {
        try {
            const { url, id } = req.body;
            await pool.query(`UPDATE users SET img = ? WHERE id = ?`, [url, id]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteAvatar(req, res) {
        try {
            const { id } = req.body;
            await pool.query(`UPDATE users SET img = NULL WHERE id = ?`, [id]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }


    async updateAdmin(req, res) {
        try {
            const { isAdmin, id } = req.body;
            await pool.query(`UPDATE users SET admin = ? WHERE id = ?`, [isAdmin, id]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getUserFavoriteAll(req, res) {
        try {
            const user_id = req.params.user_id;
            const result = await pool.query(`SELECT favorite_items FROM users where id = ?`, [user_id]);

            if (result.length === 0) {
                res.status(409).send(false);
            } else {
                const ItemsId = result[0].favorite_items;
                const itemInf = await pool.query(`SELECT * FROM items where id in (?)`, [ItemsId]);
                res.json(itemInf);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getUserFavoriteId(req, res) {
        try {
            const user_id = req.params.user_id;
            const result = await pool.query(`SELECT favorite_items FROM users where id = ?`, [user_id]);

            if (result.length === 0) {
                res.status(409).send(false);
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async addUserFavorite(req, res) {
        try {
            let { user_id, items_id } = req.body;

            if (JSON.stringify(items_id) === '[]') {
                await pool.query(`UPDATE users SET favorite_items = null WHERE id = ?`, [user_id]);
            } else {
                await pool.query(`UPDATE users SET favorite_items = ? WHERE id = ?`, [items_id, user_id]);
            }

            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getUsers(req, res) {
        try {
            const result = await pool.query(`SELECT * FROM users`);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const result = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.body;
            const result = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}

module.exports = new UserController()