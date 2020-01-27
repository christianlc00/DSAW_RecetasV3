const mongoose = require('mongoose');
const Receta = require(__dirname + '/../models/receta');

mongoose.connect('mongodb://localhost:27017/recetasV3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Receta.collection.drop();

let rec1 = new Receta({
    titulo: 'Receta de prueba 1',
    comensales: 2,
    preparacion: 30,
    coccion: 90,
    descripcion: 'Esto es una receta de prueba.',
    imagen: 'tallarines.jpg'
});

rec1.save();