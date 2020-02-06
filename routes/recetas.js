const express = require('express');
const auth = require(__dirname + '/../utils/auth.js');

let Receta = require(__dirname + '/../models/receta.js');

let router = express.Router();

router.get('/', auth, (req, res) => {
    Receta.find().then(resultado => {
        res.render('admin_recetas', {
            titulo: 'Administración de las  Recetas',
            recetas: resultado
        });
    }).catch(error => {
        res.render('publico_error', {
            error: {
                titulo: 'Error en la aplicación',
                mensaje: error
            }
        });
    });
});

module.exports = router;