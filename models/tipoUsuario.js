const mongoose = require('mongoose');
const motorista = require('./motorista');

const schema = new mongoose.Schema({
    _id: false,
    idUsuario: Number,
    tipo: String,
    motoristaInfo: {type: {motorista}, required: false} 
});

module.exports = schema;