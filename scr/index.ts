import express  from 'express'
const morgan = require('morgan')
const app = express()
const {db} = require('./db.ts');
import rutas from "./router/router";

app.use(morgan('dev'))
app.use(express.json())
app.use("/",rutas)
app.listen(3001,() =>{
    console.log("server on port 3001")
    db.sync({force:false}); 
})


exports.module = app;
