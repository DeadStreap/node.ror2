const mysql = require('mysql')

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: "ror2"
})

con.connect((err) =>{
    if(err){
        console.log('ERROR' + err)
    }else{
        console.log("DB was successfully connected")
    }
})

module.exports = con
