const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuariosRouter = require('./routes/usuarios-router');
const db = require('./modules/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/usuarios', usuariosRouter);

app.get('/', (req, res)=> {
    res.send('Backend REST-API Nany');
    res.end();
});

app.listen(8888, ()=>{
    console.log('Servidor Online');
});