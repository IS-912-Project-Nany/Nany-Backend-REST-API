const express = require("express");
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

module.exports = router;
