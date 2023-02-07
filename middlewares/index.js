


const  validarJWT  = require('../middlewares/validar-jwt');
const  validarCampos  = require('../middlewares/validar-campos');
const  validarRol = require('../middlewares/validar-rol');


module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validarRol
}