const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const SHA256 = require("crypto-js/sha256");

mongoose.connect('mongodb://localhost:27017/recetasV3');

Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'nacho',
    password: SHA256('1234')
});

usu1.save();

let usu2 = new Usuario({
    login: 'christian',
    password: SHA256('12345')
});

usu2.save();