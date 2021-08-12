const express = require('express');
const router = express.Router();
const db = require('../modules/database');
const bcrypt = require('bcrypt');
const usuario = require('../models/usuario');


router.post('/', (req, res) => {
    let u = {
        correo: req.body.correo,
        contraseña: req.body.contraseña,
    }

    usuario.find(
        {
            correo: req.body.correo
        })
        .then((result) => {
            console.log(result);
            if(result != ''){
                 bcrypt.compare(req.body.contraseña, result[0].contraseña, (error, coinciden) => {
                     if (error)
                         console.log("Error Comprobando...", error)
                     else {
                        if(coinciden) {
                            let resultAuth = result[0];
                            resultAuth.contraseña = '';
                            res.send({ code: 1, message: "Usuario Autenticado con Éxito", usuario: resultAuth});
                            res.end();
                        } else {
                            res.send({ code: 0, message: "Contraseña Incorrecta" });
                            res.end();
                        }
                    }
                });
            } else {
                res.send({code: 0, menssage: "Correo No Encontrado"});
                res.end();
            };
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });

});

module.exports = router;
