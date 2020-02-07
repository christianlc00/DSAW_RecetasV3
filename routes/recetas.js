const express = require('express');
const multer = require('multer');
const auth = require(__dirname + '/../utils/auth.js');

let Receta = require(__dirname + '/../models/receta.js');

let router = express.Router();

// multer para que se suban las imágenes a la carpeta public/uploads, anteponiéndoles como prefijo la fecha actual.
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
let upload = multer({
    storage: storage
});



router.get('/', auth, (req, res) => {
    Receta.find().then(resultado => {
        res.render('admin_recetas', {
            titulo: 'Administración de las  Recetas',
            recetas: resultado
        });
    }).catch(error => {
        res.render('admin_error');
    });
});

router.get('/recetas/nueva', auth, (req, res) => {
    res.render('admin_recetas_form', {
        titulo: 'Nueva receta'
    });
});

router.get('/recetas/editar/:id', auth, (req, res) => {
    Receta.findById(req.params.id).then(receta => {
        res.render('admin_recetas_form', {
            titulo: 'Editar receta',
            receta: receta
        });
    }).catch(() => {
        res.render('admin_error', {
            error: {
                titulo: 'Error',
                mensaje: 'Receta no encontrada'
            }
        });
    });
});

router.delete('/recetas/:id', auth, (req, res) => {
    Receta.findByIdAndDelete(req.params.id).then(() => {
        res.redirect(req.baseUrl);
    }).catch(() => {
        res.render('publico_error');
    });
});

router.post('/recetas', auth, upload.single('imagen'), (req, res) => {
    let titulo = req.body.titulo;
    let comensales = req.body.comensales;
    let preparacion = req.body.preparacion;
    let coccion = req.body.coccion;
    let descripcion = req.body.descripcion;
    let elementos = req.body.elementos;
    let aElementos = [];

    if (elementos !== undefined) {
        if (typeof elementos.ingrediente === 'string') {
            elementos.ingrediente = [elementos.ingrediente];
            elementos.cantidad = [elementos.cantidad];
            elementos.unidad = [elementos.unidad];
        }
    
        for(let i = 0; i < elementos.ingrediente.length; i++) {
            aElementos.push({
                ingrediente: elementos.ingrediente[i],
                cantidad: elementos.cantidad[i],
                unidad: elementos.unidad[i]
            });
        }
    }

    let nuevaReceta = {
        titulo,
        comensales,
        preparacion,
        coccion,
        descripcion
    };

    if (typeof req.file !== 'undefined') nuevaReceta.imagen = req.file.filename;
    if (aElementos.length > 0) nuevaReceta.elementos = aElementos;

    nuevaReceta = new Receta(nuevaReceta);

    nuevaReceta.save().then(() => {
        res.redirect(req.baseUrl);
    }).catch(() => {
        res.render('admin_error');
    });
});

router.put('/recetas/:id', auth, upload.single('imagen'), (req, res) => {
    let titulo = req.body.titulo;
    let comensales = req.body.comensales;
    let preparacion = req.body.preparacion;
    let coccion = req.body.coccion;
    let descripcion = req.body.descripcion;
    let elementos = req.body.elementos;
    let aElementos = [];

    if (elementos !== undefined) {
        if (typeof elementos.ingrediente === 'string') {
            elementos.ingrediente = [elementos.ingrediente];
            elementos.cantidad = [elementos.cantidad];
            elementos.unidad = [elementos.unidad];
        }
    
        for(let i = 0; i < elementos.ingrediente.length; i++) {
            aElementos.push({
                ingrediente: elementos.ingrediente[i],
                cantidad: elementos.cantidad[i],
                unidad: elementos.unidad[i]
            });
        }
    }

    let nuevaReceta = {
        titulo,
        comensales,
        preparacion,
        coccion,
        descripcion
    };

    if (typeof req.file !== 'undefined') nuevaReceta.imagen = req.file.filename;
    if (aElementos.length > 0) nuevaReceta.elementos = aElementos;

    Receta.findByIdAndUpdate(req.params.id, {
        $set: nuevaReceta
    }).then(() => {
        res.redirect(req.baseUrl);
    }).catch(() => {
        res.render('admin_error');
    });
});

module.exports = router;