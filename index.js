const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

const usuariosRouter = require('./routes/usuarios-router');
const categoriasRouter = require('./routes/categorias-router');
const ordenesRouter = require('./routes/ordenes-router');

const db = require('./modules/database');
const port = process.env.PORT || 8888;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/usuarios', usuariosRouter);
app.use('/categorias', categoriasRouter);
app.use('/ordenes', ordenesRouter);


app.get('/', (req, res)=> {
    res.send('Backend REST-API Nany');
    res.end();
});

app.listen(port, ()=>{
    console.log('Servidor Online');
});