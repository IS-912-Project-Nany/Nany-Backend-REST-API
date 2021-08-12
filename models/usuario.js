const mongoose = require('mongoose');
const tipoUsuario = require('./tipoUsuario');

const schema = new mongoose.Schema({
    nombre: String, 
    apellido: String,
    correo: String,
    password: String,
    fechaNacimiento: Date,
    genero: Boolean,
    imagen: String,
    tipoUsuario: tipoUsuario,
    ciudad: Object,
    ordenes: Array
});

module.exports = mongoose.model('usuarios', schema);
