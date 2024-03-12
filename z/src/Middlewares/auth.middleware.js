const ResponseStatus = require('../utils/response-status');
const User = require('./../models/user.model');
const jwt = require('jsonwebtoken');


module.exports= (req, res, next)=>{
    const token = req.query.token;
    console.log(token);
        if(token){
            jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
                if (error) {
                    // Manejar errores de decodificación
                    console.error('Error al decodificar el token:', error.message);
                    res.send('Usuario no autenticado');
                } else {
                    // El token se decodificó con éxito, `decoded` contendrá el objeto original
                    console.log('Objeto decodificado:', decoded);
                    User.findOne({
                        email : decoded.email
                    }).then(response=>{
                        if(response){
                            next();
                        }else{
                            console.log('Usuario no encontrado');
                            res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
                        }
                    })

                }
            });
        }
        else{
            res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
        }
}