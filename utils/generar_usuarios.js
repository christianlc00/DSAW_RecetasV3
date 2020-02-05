const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
const SHA256 = require("crypto-js/sha256");

mongoose.connect('mongodb://19ffe.l.time4vps.cloud:27020/recetasV3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Usuario.collection.drop();

let usuarios = [
    {
        login: 'nacho',
        password: '1234'
    },
    {
        login: 'christian',
        password: '1234'
    },
    {
        login: 'usuario',
        password: '1234'
    },
    {
        login: 'admin',
        password: '1234'
    },
];

usuarios.forEach(usuario => {
    let usu = new Usuario({
        login: usuario.login,
        password: SHA256(usuario.password)
    });
    
    usu.save();
});