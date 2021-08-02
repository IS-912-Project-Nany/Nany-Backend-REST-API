const express = require("express");
const mongoose = require('mongoose');
const categoria = require('../models/categoria');
const router = express.Router();

//Crear Categoria
router.post('/', (req, res) => {
    let cat = new categoria({
        nombre: req.body.nombre,
        icono: req.body.icono,
        color: req.body.color,
        empresas: req.body.empresas
    });

    cat.save()
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    })
});

//Obtener Categorias
router.get('/', (req, res) => {
    categoria.find()
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    })
});

//Crear Empresa
router.post('/:idCategoria/empresas', (req, res) => {
    categoria.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idCategoria)
        },
        {
            $push:{
                empresas: {
                    _id: mongoose.Types.ObjectId(),
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    resumen: req.body.resumen,
                    logo: req.body.logo,
                    horario: req.body.horario,
                    ubicacion: req.body.ubicacion,
                    calificacion: req.body.calificacion,
                    banner: req.body.banner,
                    productos: []
                }
            }
        }
    )
    .then(result => {
        res.send(result);
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    })
});

//Obtener Empresas
router.get('/:idCategoria/empresas', (req, res) => {
    categoria.find(
        {
            _id: mongoose.Types.ObjectId(req.params.idCategoria)
        }
    )
    .then(result => {
        res.send({code: 1});
        res.end();
    })
    .catch(error => {
        res.send(error);
        res.end();
    })
});

//Crear Producto
router.post('/:idCategoria/empresas/:idEmpresa/productos', (req, res) => {
    categoria.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idCategoria),
            "empresas._id": mongoose.Types.ObjectId(req.params.idEmpresa)
        },
        {
            $push:{
                "empresas.$.productos": {
                    _id: mongoose.Types.ObjectId(),
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    isv: req.body.isv,
                    precio: req.body.precio,
                    existencia: req.body.existencia,
                    imagen: req.body.imagen
                }
                
            }
        }
    )
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