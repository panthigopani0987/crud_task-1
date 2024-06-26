const mongoose = require('mongoose');

const creteSchema =new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        required : true,
    },
})
const crud = mongoose.model('crudoperation',creteSchema);
module.exports = crud;