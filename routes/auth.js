const express = require('express');
const SHA256 = require("crypto-js/sha256");

let Usuario = require(__dirname + '/../models/usuario.js');

let router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth_login', {
        error: ''
    });
});

router.post('/login', (req, res) => {
    let error; // = 'Usuario incorrecto';
    let login = req.body.login;
    let password = SHA256(req.body.password);

    console.log(login);
    console.log(req.body.password);
    console.log(password);

    Usuario.find().then(usuarios => {
        console.log(usuarios);

        let existeUsuario = usuarios.filter(usuario =>
            usuario.login == login && usuario.password == password
        );

        if (existeUsuario.length > 0) {
            req.session.login = existeUsuario[0].login;
            res.render('auth_login', {
                msg: 'Usuario logueado'
            });
        } else {
            res.render('auth_login', {
                error: 'Usuario incorrecto'
            });
        }
    }).catch(error => {
        console.log(error);
        res.render('auth_login', {
            error: {
                titulo: 'Usuario incorrecto',
                mensaje: error
            }
        });
    });
});

module.exports = router;