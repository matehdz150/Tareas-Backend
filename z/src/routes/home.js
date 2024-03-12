const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');
const axios = require('axios');
const jwt = require('jsonwebtoken');


router.get("/", (req, res) => {
    apiUrl = process.env.URLAPI;
    const token = req.query.token;
    console.log(token);
    jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
        if (error) {
            console.error('Error al decodificar el token:', error.message);
        } else {
            console.log('Token decodificado de forma asíncrona:', decoded);
            const params = {
                country: 'us',
            };



            axios.get(apiUrl, params).then(response => {
                res.render('news', {
                    userName: decoded.name,
                    email: decoded.email,
                    news: response.data.articles,
                    urlImage: response.data.articles.urlToImage,
                    url: response.data.articles.url
                });
            })
        }
    });


});

//router.post("/register", usersController.registerUser);

module.exports = router;