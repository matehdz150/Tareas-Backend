const { rejects } = require('assert');
const axios = require('axios');
const { error } = require('console');
const { response } = require('express');
const { resolve } = require('path');
const mockUsers = [{
    id: 1,
    name: "juan perez",
    email: "jaj@gmil.com"
}]



class User {
    find() {
        return new Promise((resolve, reject) => {
            axios.get(process.env.URL)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.error('Error al realizar la consulta:', error);
                });
        })
    }
    insert(newUser) {
        return new Promise((resolve, reject) => {
            axios.post(process.env.URL, newUser)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error=>{
                    console.error('Error al hacer el post');
                })
        })
    }
    update(userId, updatedUser) {
        return new Promise((resolve, reject) => {
            axios.put(process.env.URL + `/${userId}`, updatedUser)
                .then(response =>{
                    resolve(response.data);
                })
                .catch(error=>{
                    console.error('Error al hacer el put');
                })
        })
    }
    delete(userId){
        return new Promise((resolve,reject)=>{
            axios.delete(process.env.URL + `/${userId}`)
            .then(response=>{
                resolve(response.data);
            })
            .catch(error=>{
                console.error('Error al hacer el delete');
            })
        })
    }
}

module.exports = User; //no se exporta instancia porque cada usuario es diferente