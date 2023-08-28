const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'bykbbpls6huwf48phbzz-mysql.services.clever-cloud.com',
    user: 'ulsipa4bzelzl1wv',
    password: "IrzQYvw3ZKlGebdHvcti",
    database: "bykbbpls6huwf48phbzz"
})

con.connect((err) =>{
    if(err){
        console.log('ERROR' + err)
    }else{
        console.log("DB was successfully connected")
    }
})

module.exports = con
