const mongoose = require('mongoose');
const uri = "mongodb+srv://nany_user:SQqO7ll5z86YJk7V@clusterdb.yousf.mongodb.net/nanyDB"

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