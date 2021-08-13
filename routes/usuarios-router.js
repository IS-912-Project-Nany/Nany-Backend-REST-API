const express = require("express");
const mongoose = require("mongoose");
const usuario = require("../models/usuario");
const router = express.Router();
const bcrypt = require('bcrypt');

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

//Obtener un usuario cliente 
router.get("/:idUsuario", (req, res) => {
    usuario.find({
        _id: mongoose.Types.ObjectId(req.params.idUsuario)
    }).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});


//REGISTRO
//Crear un nuevo usuario
router.post("/", (req, res) => {
    let u = new usuario(
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            password: req.body.password,
            fechaNacimiento: req.body.fechaNacimiento,
            genero: req.body.genero,
            imagen: req.body.imagen,
            tipoUsuario: req.body.tipoUsuario,
            ciudad: req.body.ciudad,
        }
    );
    usuario.find(
        {
            correo: req.body.correo
        })
        .then((result) => {
            console.log(result);
            if(result == ''){
                bcrypt.hash(req.body.password, 10, (error, passwordEncrypted) => {
                    if (error)
                        console.log("Error Hasheado", error)
                    else {
                        console.log("Hash ", passwordEncrypted);
                        u.password = passwordEncrypted;
                            u.save().then((result) => {
                                res.send({usuario: result, code: 200, ok: true});
                                res.end();
                            })
                                .catch((error) => {
                                res.send(error);
                                res.end();
                            });
                        }
                    });
            } else {
                res.send({code: 0, message: "Correo ya existente"});
                res.end();
            };
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});
// Actualizar Usuario
router.put("/:idUsuario", (req, res) => {
    usuario.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {  
            $set: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo,
                fechaNacimiento: req.body.fechaNacimiento,
                genero: req.body.genero,
                imagen: req.body.imagen,
                ciudad: req.body.ciudad
            }
        }
    ).then((result) => {
      res.send(result);
      res.end();
    })
    .catch((error) => {
      res.send(error);
      res.end();
    });
});

//Obtener las ordenes de un usuario
router.get('/:idUsuario/ordenes', (req, res)=>{
    usuario.find({
        _id: mongoose.Types.ObjectId(req.params.idUsuario)  
    },
    {
        "ordenes": true
    })
    .then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
})

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

//Actualizar estado de motorista
router.put('/motoristas/:idMotorista', (req, res)=>{
    usuario.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idMotorista),
            "tipoUsuario.idUsuario": 2 
        },
        {
            $set: {
                "tipoUsuario.motoristaInfo.estadoAdmision": req.body.estadoAdmision
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
