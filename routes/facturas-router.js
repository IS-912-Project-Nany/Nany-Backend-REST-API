const express = require("express");
const mongoose = require('mongoose');
const factura = require('../models/factura');
const router = express.Router();

router.post('/', (req, res) => {
    let fact = new factura({
        totalProducto: req.body.totalProducto,
        cantidadTotal: req.body.cantidadTotal,
        costoEnvio: req.body.costoEnvio,
        comisionMotorista: req.body.comisionMotorista,
        total: req.body.total,
        metodoPago: req.body.metodoPago
    });
    
    fact.save()
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    })
});

module.exports = router;