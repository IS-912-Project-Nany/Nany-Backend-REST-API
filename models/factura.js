const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    totalProducto: Number,
    cantidadTotal: Number,
    costoEnvio: Number,
    comisionMotorista: Number,
    total: Number,
    metodoPago: Object
});

module.exports = mongoose.model('facturas', schema);