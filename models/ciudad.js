const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    idCiudad: Number,
    ciudad: String
});

module.exports = mongoose.model('ciudades', schema);