const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

const dotenv = require("dotenv");
dotenv.config();

const authRouter = require('./routes/auth-router');
const usuariosRouter = require('./routes/usuarios-router');
const categoriasRouter = require('./routes/categorias-router');
const ordenesRouter = require('./routes/ordenes-router');
const uploadRouter = require('./routes/upload-router');
const ciudadesRouter = require('./routes/ciudades-router');

const db = require('./modules/database');
const port = process.env.PORT || 8888;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileupload({useTempFiles: true}))

app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter);
app.use('/categorias', categoriasRouter);
app.use('/ordenes', ordenesRouter);
app.use('/upload', uploadRouter);
app.use('/ciudades', ciudadesRouter);


app.get('/', (req, res)=> {
    res.send('Backend REST-API Nany');
    res.end();
});

app.listen(port, ()=>{
    console.log('Servidor Online');
});