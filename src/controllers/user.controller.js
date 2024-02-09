const { response } = require("express");
const User = require('../models/users.model');
const ResponseStatus = require('../utils/response-status')

class UserController{
    getUsers(req, res){
        const user = new User();
        user.find().then(response=>{
            res.status(ResponseStatus.SUCCES).send(response);
        }).catch(e=>{
            res.status(ResponseStatus.BAD_REQUEST).send('something wrong')
        })
    }
    getUserById(req,res){
        const user = new User();
        const userId = parseInt(req.params.id.replace(/^id:\s*|\s*$/g, ''));
        user.find().then(response=>{
            const objetoEncontrado = response.find(user => user.id === userId);
            
            if(objetoEncontrado){
                res.status(ResponseStatus.SUCCES).send(objetoEncontrado);
            }else{
                res.status(ResponseStatus.BAD_REQUEST).send("Usuario con id: "+ userId+ " No encontrado")
            }

        }).catch(e=>{
            res.sendStatus(ResponseStatus.BAD_REQUEST);
        })
    }
    createUser(req,res){
        const user = new User();
        const usuarioNuevo = req.body;
        user.insert(usuarioNuevo)
        .then(response=>{
            console.log('usuario creado: '+ response);
            res.status(ResponseStatus.SUCCES).send(usuarioNuevo);
        })
        .catch(e=>{
            res.sendStatus(ResponseStatus.BAD_REQUEST);
        })
    }
    updateUser(req,res){
        const user = new User();
        const userUpdated = req.body;
        user.update(userUpdated.id, userUpdated).then(response=>{
            console.log('usuario editado: '+ response);
            res.status(ResponseStatus.SUCCES).send(userUpdated);
        }).catch(e=>{
            res.sendStatus(ResponseStatus.BAD_REQUEST);
        })
    }
    deleteUser(req,res){
        const user = new User();
        const userId = req.params.id;
        user.delete(userId)
        .then(response=>{
            console.log('usuario eliminado: '+ response);
            res.status(ResponseStatus.SUCCES).send(response);
        })
        .catch(e=>{
            res.sendStatus(ResponseStatus.BAD_REQUEST);
        })
    }
}

module.exports=  new UserController();