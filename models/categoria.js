const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nombre: String,
    icono: String,
    color: String,
    empresas: []
});

module.exports = mongoose.model('categorias', schema);