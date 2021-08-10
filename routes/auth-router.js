const express = require('express');
const router = express.Router();
const db = require('../modules/database');
const bcrypt = require('bcrypt');


router.post('/', (req, res) => {
    let u = {
        correo: req.body.correo,
        contraseña: req.body.contraseña,
    }
});

module.exports = router;
