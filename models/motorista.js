const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    dni: String,
    motocicleta: Boolean,
    licencia: Boolean,
    datosMoviles: Boolean,
    estadoAdmision: Boolean,
    experiencia: Object
});

module.exports = schema;