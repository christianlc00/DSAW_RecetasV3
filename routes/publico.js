const express = require('express');

let Receta = require(__dirname + '/../models/receta.js');

let router = express.Router();

router.get('/', (req, res) => {
    // res.render('publico_index');
    // PREGUNTAR A NACHO: ¿Se puede hacer que carguen todas en index o sólo cuándo buscas?
    Receta.find().then(resultado => {
        res.render('publico_index', {
            titulo: 'Inicio Recetas',
            recetas: resultado
        });
    }).catch(error => {
        // Aquí podríamos renderizar una página de error
    });
});

router.get('/buscar', (req, res) => {
    let busqueda = req.query.s;
    // Receta.find({ titulo: new RegExp(busqueda, "i"), descripcion: new RegExp(busqueda, "i") }).then(resultado => {
    Receta.find({
        titulo: new RegExp(busqueda, "i")
    }).then(resultado => {
        res.render('publico_index', {
            titulo: `Resultados de la búsqueda "${busqueda}"`,
            recetas: resultado
        });
    }).catch(error => {
        // Aquí podríamos renderizar una página de error
    });
});

module.exports = router;