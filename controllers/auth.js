const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const {correo, password } = req.body;

    try {
    
    //Verificaciones
        
        // Verificar correo existente

        const usuario =  await Usuario.findOne({ correo })

        if ( !usuario ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - Correo"
            })
        }

        // Verificar usuario activo

        if ( !usuario.estado ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado false"
            })
        }

        //  Verificar contraseña
        const validPass = bcryptjs.compareSync(password, usuario.password)

        if ( !validPass ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - Password incorrecto"
            })
        }
        // Generar JWT
        const token = await generarJWT( usuario.id );
        

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hubo un error consulte a un administrador"
        })
    }
  
}


module.exports = {
    login
}