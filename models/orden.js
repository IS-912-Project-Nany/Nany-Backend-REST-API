const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    numOrden: String,
    cliente: Object,
    motorista: Object,
    ubicacionOrden: Object,
    tipoEstado: Object,
    detalleProductos: Array,
    fecha: Date,
    factura: Object,
    metodoPago: Object
});

module.exports = mongoose.model('ordenes', schema);
