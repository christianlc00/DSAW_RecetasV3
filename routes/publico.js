const express = require('express');
const auth = require(__dirname + '/../utils/auth.js');

let Receta = require(__dirname + '/../models/receta.js');

let router = express.Router();

router.get('/', (req, res) => {
    Receta.find().then(resultado => {
        res.render('publico_index', {
            titulo: 'Inicio Recetas',
            recetas: resultado
        });
    }).catch(error => {
        res.render('publico_error');
    });
});

router.get('/buscar', auth, (req, res) => {
    let busqueda = req.query.s;
    Receta.find({
        titulo: new RegExp(busqueda, "i")
    }).then(resultado => {
        res.render('publico_index', {
            titulo: `Resultados de la búsqueda "${busqueda}"`,
            recetas: resultado
        });
    }).catch(error => {
        res.render('publico_error');
    });
});

router.get('/receta/:id', (req, res) => {
    Receta.findById(req.params.id).then(resultado => {
        res.render('publico_receta', {
            receta: resultado
        });
    }).catch(() => {
        res.render('publico_error', {
            error: {
                titulo: 'Error',
                mensaje: 'Receta no encontrada'
            }
        });
    });
});

module.exports = router;