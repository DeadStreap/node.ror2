const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'bykbbpls6huwf48phbzz-mysql.services.clever-cloud.com',
    user: 'ulsipa4bzelzl1wv',
    password: "IrzQYvw3ZKlGebdHvcti",
    database: "bykbbpls6huwf48phbzz",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Database connected!');
    connection.release();
});

module.exports = pool;