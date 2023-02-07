const jwt = require('jsonwebtoken')


const generarJWT = (uid = ' ') => {
    return new Promise( (resolve, reject) => {

        const payload = { uid };
        jwt.sign(payload, process.env.SecretPrivateKey, 
            {expiresIn: '4h'},
            (error ,token ) => {
                if(error){
                    console.log(error);
                    reject("no se pudo crear el jwt");
                }else{
                    resolve( token )
                }
            })

    })
}       


module.exports = { 
    generarJWT
}