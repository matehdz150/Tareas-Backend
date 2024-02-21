const { response } = require('express');
const User = require('./../models/user.model')
const ResponseStatus = require('./../utils/response-status');

class UsersController {
    getUsers(req, res) {
        User.find().then(response => {
            res.send(response);
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).send("Something went wrong, ", e);
        })
    }
    registerUser(req, res) {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            role: req.body.role
        });

        newUser.create().then(savedUser => {
            const data = {
                name: savedUser.name,
                email: savedUser.email,
            };
            res.status(ResponseStatus.SUCCES).json(data);
        }).catch(e => {
            console.log('Error: ', e);
            res.status(ResponseStatus.BAD_REQUEST).json({ e: 'Error al crear usuario' });
        })
    }
    getUserById(req, res) {
        const userId = req.params.id;
        User.findById(userId).then(response => {
            if (response) {
                console.log(response);
                res.status(ResponseStatus.SUCCES).json(response);
            } else {
                res.send('Usuario no encontrado');
            }
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).json({ e: 'Error al crear usuario' });
        })
    }
    updateUser(req, res) {
        const userId = req.params.id;
        const newData = {};
        if (req.body.hasOwnProperty('name')) newData.name = req.body.name;
        if (req.body.hasOwnProperty('email')) newData.email = req.body.email;
        if (req.body.hasOwnProperty('password')) newData.password = req.body.password;
        if (req.body.hasOwnProperty('status')) newData.status = req.body.status;
        if (req.body.hasOwnProperty('role')) newData.role = req.body.role;
        console.log(newData, userId)
        User.findByIdAndUpdate(userId, newData).then(response => {
            if (response) {
                console.log('Usuario actualizado', response)
                res.status(ResponseStatus.SUCCES).json(response);
            } else {
                res.send('Usuario no encontrado');
            }
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).json({ e: 'Error al crear usuario' });
        })
    }
    deleteUser(req,res){
        const userId = req.params.id;
        User.findByIdAndDelete(userId).then(response=>{
            if(response){
                console.log('Usuario actualizado', response)
                res.status(ResponseStatus.SUCCES).json(response);
            }else {
                res.send('Usuario no encontrado');
            }
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).json({ e: 'Error al crear usuario' });
        })
    }
}

module.exports = new UsersController();