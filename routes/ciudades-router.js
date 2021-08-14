const express = require("express");
const ciudad = require("../models/ciudad");
const router = express.Router();

//Obtener todas las ciudades
router.get('/', (req, res)=>{
    ciudad.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Agregar nuevas ciudades
router.post('/', (req, res)=>{
    let ciudd = new ciudad(
        {
            idCiudad: req.body.idCiudad,
            ciudad: req.body.ciudad
        }
    );

    ciudd.save()
        .then(result=>{
            res.send(result);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        });
});

module.exports = router;
