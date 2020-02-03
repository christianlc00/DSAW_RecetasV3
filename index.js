// Cargar las librerías necesarias.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const session = require('express-session');
const methodOverride = require('method-override');
const multer = require('multer');



// Cargar los enrutadores.
const publico = require(__dirname + '/routes/publico');
const recetas = require(__dirname + '/routes/recetas');
const auth = require(__dirname + '/routes/auth');



// Conectar a una base de datos "recetasV3" de MongoDB.
mongoose.connect('mongodb://19ffe.l.time4vps.cloud:27020/recetasV3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



// Inicializar Express.
let app = express();



// Configurar la autenticación basada en sesiones.
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));



// Configurar el motor de plantillas Nunjucks, apuntando a la carpeta views
nunjucks.configure('views', {
    autoescape: true,
    express: app
});



// Asignación del motor de plantillas
app.set('view engine', 'njk');



// Aplicar los middleware
// body-parser para procesar datos en formato urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// method-override para preprocesar las peticiones adecuadamente y poder utilizar PUT y DELETE cuando corresponda.
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//multer para que se suban las imágenes a la carpeta public/uploads, anteponiéndoles como prefijo la fecha actual.
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
let upload = multer({
    storage: storage
});

// Añadir la librería Bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Asociar el enrutador routes/publico.js con el prefijo / (ruta raíz)
app.use('/', publico);

// Asociar el enrutador routes/recetas.js con el prefijo /admin
app.use('/admin', recetas);

// Asociar el enrutador routes/auth.js con el prefijo /auth
app.use('/auth', auth);



// Poner en marcha el servidor Express por el puerto 3000
let puerto = process.env.PORT || 443
app.listen(puerto);