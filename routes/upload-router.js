const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cloudinary = require('cloudinary').v2;

router.post('/', (req, res, next) => {
    const file = req.files.imagen;
    console.log(file);
    cloudinary.config({
        cloud_name: 'dpu2bstkb',
        api_key: '682794396555116',
        api_secret: 'jOMSn0GF1940nhqfW5dhiJqHGPE'
    });
    // upload image here
    cloudinary.uploader.upload(file.tempFilePath, {folder: req.body.folder})
        .then((result) => {
            res.send(result);
            res.end();
        }).catch((error) => {
            res.send(error);
            res.end();
        });
});


module.exports = router;
