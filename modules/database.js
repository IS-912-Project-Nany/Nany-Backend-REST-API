const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_ATLAS_URI;

class Database{
    constructor(){
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: false})
        .then(()=>{
            console.log('Se conecto a la base en MongoDB atlas');
        })
        .catch(error=> console.log(error));
    }
}

module.exports = new Database();