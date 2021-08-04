const express = require('express');
const mongoose = require('mongoose');
const orden = require('../models/orden');
const router = express.Router();

//Obtener todas las ordenes 
router.get('/', (req, res)=>{
    orden.find()
        .then(result=>{
            res.send(result);
            res.end();
        })
        .catch(error=>{
            res.send(error);
            res.end();
        })
});

//Obtener una orden
router.get('/:idOrden', (req, res)=>{
    orden.find(
        {
            _id: mongoose.Types.ObjectId(req.params.idOrden)
        }
    ).then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});

//Crear una orden
router.post('/', (req, res)=>{
    let ord = new orden(
        {
            numOrden: req.body.numOrden,
            cliente: req.body.cliente,
            motorista: req.body.motorista,
            ubicacionOrden: req.body.ubicacionOrden,
            tipoEstado: req.body.tipoEstado,
            detalleProductos: req.body.detalleProductos,
            fecha: req.body.fecha
        }
    );
    ord.save()
        .then(result=>{
            res.send(result);
            res.end();
        })
        .catch(error=>{
            res.send(error);
            res.end();
        })
});

//Actualizar una orden 
router.put('/:idOrden', (req, res)=>{
    orden.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idOrden),
        },
        {
            $set: {
                numOrden: req.body.numOrden,
                cliente: req.body.cliente,
                motorista: req.body.motorista,
                ubicacionOrden: req.body.ubicacionOrden,
                tipoEstado: req.body.tipoEstado,
                detalleProductos: req.body.detalleProductos,
                fecha: req.body.fecha
            },
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

//Eliminar una orden 
router.delete('/:idOrden', (req, res)=>{
    orden.deleteOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idOrden),
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