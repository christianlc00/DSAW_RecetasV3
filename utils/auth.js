// middleware autenticación
let autenticacion = (req, res, next) => {
    if (req.session && req.session.login)
        return next();
    else
        res.redirect('/auth/login');
};

module.exports = autenticacion;