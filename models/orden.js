const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    cliente: Object,
    motorista: Object,
    ubicacionOrden: Object,
    tipoEstado: Object,
    fecha: Date
});

module.exports = mongoose.model('ordenes', schema);
