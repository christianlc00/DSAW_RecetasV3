const express = require('express');
const SHA256 = require("crypto-js/sha256");

let Usuario = require(__dirname + '/../models/usuario.js');

let router = express.Router();

router.get('/login', (req, res) => {
    res.render('auth_login');
});

router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = SHA256(req.body.password);

    Usuario.find().then(usuarios => {
        let existeUsuario = usuarios.filter(usuario =>
            usuario.login == login && usuario.password == password
        );

        if (existeUsuario.length > 0) {
            req.session.login = existeUsuario[0].login;
            res.redirect('/admin');
        } else {
            res.render('auth_login', {
                error: 'Usuario incorrecto'
            });
        }
    }).catch(() => {
        res.render('auth_login', {
            error: 'Usuario incorrecto'
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;