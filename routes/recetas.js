const express = require('express');

let Receta = require(__dirname + '/../models/receta.js');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('publico_index');
});

module.exports = router;