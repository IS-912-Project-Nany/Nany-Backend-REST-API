const express = require('express');
const mongoose = require('mongoose');
const orden = require('../models/orden');
const usuario = require('../models/usuario');
const redondearDecimales = require('../modules/castearNumero');
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
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
});

//El motorista tiene una comision del 20% y el 80% al admin
//Crear una orden
router.post('/', (req, res)=>{
    let factura = {
        cantidadProductos:0,
        costoEnvio: 50,
        comisionMotorista: 0,
        subtotal:0,
        total:0
    };
    for (let i = 0; i < req.body.detalleProductos.length; i++) {
        let detalle = req.body.detalleProductos[i];
        let totalProducto = redondearDecimales(((detalle.producto.isv + detalle.producto.precio)* detalle.cantidad),2);
        let cantidadAcumulada = detalle.cantidad; 
        
        factura.cantidadProductos += cantidadAcumulada;
        factura.subtotal += redondearDecimales((totalProducto),2);
    };
    factura.total = redondearDecimales(((factura.costoEnvio + factura.subtotal)),2);
    factura.comisionMotorista = redondearDecimales((factura.total*0.20),2);

    let ord = new orden(
        {
            numOrden: req.body.numOrden,
            cliente: req.body.cliente,
            motorista: req.body.motorista,
            ubicacionOrden: req.body.ubicacionOrden,
            tipoEstado: req.body.tipoEstado,
            detalleProductos: req.body.detalleProductos,
            fecha: req.body.fecha,
            factura: factura,
            metodoPago: req.body.metodoPago,
            ordenes: req.body.ordenes
        }
    );
    ord.save()
        .then(result=>{
            usuario.updateOne({
                _id: mongoose.Types.ObjectId(req.body.cliente._id)
            },
            {
                $push:{
                    ordenes: result
                }
            }).then(result2=>{
                res.send({
                    orden: result,
                    cliente: result2
                });
                res.end();
            }).catch(error=>{
                res.send(error);
                res.end();
            })
        })
        .catch(error=>{
            res.send(error);
            res.end();
        })
});

//Actualizar una orden 
router.put('/:idOrden', (req, res)=>{
    // Actualizar Estado orden
    orden.updateOne(
        {
            _id: mongoose.Types.ObjectId(req.params.idOrden),
        },
        {
            $set: {
                motorista: req.body.motorista,
                tipoEstado: req.body.tipoEstado
            },
        }
    )
    .then(result=>{
        // Actualziar Orden en Motorista
        usuario.updateOne({
            _id: mongoose.Types.ObjectId(req.body.motorista._id)
        },
        {
            $push:{
                ordenes: req.body
            }
        }).then(result2=>{
            // Actualizar orden del cliente
            usuario.updateOne({
                _id: mongoose.Types.ObjectId(req.body.cliente._id),
                'ordenes._id':  mongoose.Types.ObjectId(req.params.idOrden)
            },
            {
                $set: {
                    'ordenes.$': {
                        motorista: req.body.motorista.nombre + ' ' + req.body.motorista.apellido,
                        tipoEstado: req.body.tipoEstado
                    }
                }
            }).then(result3=>{
                res.send({
                    orden: result,
                    Motorista: result2,
                    cliente: result3
                });
                res.end();
            }).catch(error=>{ 
                res.send(error);
                res.end();
            })
        }).catch(error=>{ 
            res.send(error);
            res.end();
        })
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

