const { request, response } = require("express")


const esAdminRol = (req = request, res = response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg: "Se quiere verificar rol sin validar el token"
        })
    }

    const { rol, nombre } = req.usuario;

    if(rol !== 'ADMIN_ROL'){
        return res.status(501).json({
            msg: `${nombre} No es administrador`
        });
    }

    next();
}

const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {

        if( !req.usuario ){
            return res.status(500).json({
                msg: "Se quiere verificar rol sin validar el token"
            })
        }        
        
        if ( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${ roles }`
            })
        }

        next();
    }
}

module.exports = {
    tieneRol,
    esAdminRol
}