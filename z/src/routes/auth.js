const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');


router.get("/register", (req, res) => {
    res.render('register', {
        title: 'TITULAZO'
    });
    

});

router.post("/register", usersController.registerUser);

module.exports = router;