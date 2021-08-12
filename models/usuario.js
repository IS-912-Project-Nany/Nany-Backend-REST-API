const mongoose = require('mongoose');
const tipoUsuario = require('./tipoUsuario');

const schema = new mongoose.Schema({
    nombre: String, 
    apellido: String,
    correo: String,
    contraseña: String,
    fechaNacimiento: Date,
    genero: Boolean,
    imagen: String,
    tipoUsuario: tipoUsuario,
    ciudad: Object
});

module.exports = mongoose.model('usuarios', schema);
