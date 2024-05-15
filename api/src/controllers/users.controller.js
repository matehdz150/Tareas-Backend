const { response } = require('express');
const User = require('./../models/user.model')
const ResponseStatus = require('./../utils/response-status');

class UsersController{
    getUsers(req, res){
        const user = new User();
        console.log('quien hizo la consulta?:', req.user);
        user.find().then(response =>{
            res.send(response);
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send("Something went wrong");
        })
    }
    createUser(req, res){
        res.send('will create new user');
    }
    getUserById(req,res){
        const userId = req.params.id;
        res.send('Get user: ' +userId)
    }
}

module.exports = new UsersController();