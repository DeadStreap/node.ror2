var express = require('express')
const Router = require('./routes/router')
const PORT = process.env.PORT || 8080

var app = express()

var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use('/api', Router)

app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log(`Server started on port ${PORT}`)
    }
})