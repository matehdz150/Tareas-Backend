const jwt = require('jsonwebtoken')
const User = require('./../models/user.model')
const ResponseStatus = require('./../utils/response-status');
const hashPassword = require('../utils/hash-password');

class UsersController {
    getUsers(req, res) {
        console.log('quien hizo la consulta?:', req.user);
        User.find().then(response => {
            res.send(response);
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).send("Something went wrong");
        })
    }
    registerUser(req, res) {
        try {
            // Obtener los datos del formulario
            const { email, name, password } = req.body;

            // Hashear la contraseña antes de guardarla en la base de datos
            const hashedPassword = hashPassword(password);

            // Crear una nueva instancia del modelo de usuario con los datos del formulario
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
            });

            // Guardar el nuevo usuario en la base de datos
            console.log(email, name, password);

            newUser.save().then(savedUser => {
                const data = {
                    name: savedUser.name,
                    email: savedUser.email,
                };
                res.status(ResponseStatus.SUCCES).redirect('/');
            }).catch(e => {
                console.log('Error: ', e);
                res.status(ResponseStatus.BAD_REQUEST).json({ e: 'Error al crear usuario' });
            })
        } catch (error) {
            // Manejar errores
            console.error(error);
            res.status(500).send('Error al registrar usuario');
        }
    }
    async getUserById(req, res) {
        try {
            const userId = req.params.id;

            // Buscar el usuario por su ID en la base de datos
            const user = await User.findById(userId);

            if (user) {
                // Si se encontró el usuario, enviarlo como respuesta
                res.status(ResponseStatus.SUCCESS).json(user);
            } else {
                // Si no se encontró el usuario, enviar un mensaje de error
                res.status(ResponseStatus.BAD_REQUEST).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            // Manejar errores
            console.error(error);
            res.status(ResponseStatus.BAD_REQUEST).send('Error al buscar usuario por ID');
        }
    }
    loginUser(req, res) {

        try {
            const { email, name, password } = req.body;

            // Hashear la contraseña antes de guardarla en la base de datos
            const hashedPassword = hashPassword(password);

            // Crear una nueva instancia del modelo de usuario con los datos del formulario

            User.findOne({
                email: email,
                password: hashedPassword
            }).then(usuarioEncontrado => {
                if (usuarioEncontrado) {
                    const dataToken = {
                        id: usuarioEncontrado._id,
                        name: usuarioEncontrado.name,
                        email: usuarioEncontrado.email

                    }
                    const token = jwt.sign(dataToken, process.env.TOKEN_KEY);
                    jwt.decode(token, process.env.TOKEN_KEY, (err, decoded) => {
                        console.log('decoded:', err, decoded);

                    });

                    res.status(ResponseStatus.SUCCES).redirect('/home?token=' + token);
                }else{
                    console.log('Usuario no encontrado');
                    res.sendStatus(ResponseStatus.BAD_REQUEST); 
                }
            })
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UsersController();