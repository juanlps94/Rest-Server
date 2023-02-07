const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT =async (req = request, res = response, next) => {

    const token  = req.header('xtoken');

        if ( !token ){
            return res.status(401).json({
                msg: "No hay token en la peticion"
            })
        }


        try {

            //Obetener el id del usuario verificandolo con el jwt y su contrase;a
            const { uid } = jwt.verify( token, process.env.SecretPrivateKey );

            //Obteniendo los datos del usuario logeado mediante su id
            const usuario = await Usuario.findById( uid )


            if(!usuario){
                return res.status(401).json({
                    msg: "Token no valido (Usuario no existe en la DB)"
                })
            }

            //Verificar si el uid esta activo
            if(!usuario.estado){
                return res.status(401).json({
                    msg: "Token no valido (Usuario no activo)"
                })
            }

            //retorno los datos del usuario logeado
           req.usuario = usuario;
           next();
            
        } catch (error) {
            console.log(error)
            res.status(401).json({
                msg: "Token no valido"
            })
        }


}

module.exports =  {
    validarJWT
}