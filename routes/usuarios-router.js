const express = require("express");
const mongoose = require("mongoose");
const usuario = require("../models/usuario");
const router = express.Router();

//Obtener todos los usuarios
router.get("/", (req, res) => {
    usuario.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Crear un nuevo usuario
router.post("/", (req, res) => {
    let u = new usuario(
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            contraseña: req.body.contraseña,
            fechaNacimiento: req.body.fechaNacimiento,
            genero: req.body.genero,
            tipoUsuario: req.body.tipoUsuario,
            ciudad: req.body.ciudad,
        }
    );
    u.save().then((result) => {
      res.send(result);
      res.end();
    })
    .catch((error) => {
      res.send(error);
      res.end();
    });
});

//Obtener todos los motoristas
router.get('/motoristas', (req, res)=>{
    usuario.find({
        "tipoUsuario.idUsuario": 2  //El codigo motorista
    })
    .then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Obtener motorista
router.get('/motoristas/:idMotorista', (req, res)=>{
    usuario.find({
        _id: mongoose.Types.ObjectId(req.params.idMotorista),
        "tipoUsuario.idUsuario": 2 
    })
    .then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Actualizar motorista
router.put('/motoristas/:idMotorista', (req, res)=>{
    usuario.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idMotorista),
            "tipoUsuario.idUsuario": 2 
        },
        {
            $set: {
                "tipoUsuario.motoristaInfo.0.estadoAdmision": req.body.estadoAdmision
            }
        }
    )
    .then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});

//Eliminar motorista 
router.delete('/motoristas/:idMotorista', (req, res)=>{
    usuario.deleteOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idMotorista),
            "tipoUsuario.idUsuario": 2 
        }
    )
    .then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
})
module.exports = router;
