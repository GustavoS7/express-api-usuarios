const express = require("express")
const cors = require('cors')
const knex = require('./database/connection')

const app = express()
const router = require("./routes/routes")
 
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/",router);

app.listen(3000,() => {
    console.log("Servidor rodando")
});
