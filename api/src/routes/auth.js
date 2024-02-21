const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');


router.get("/", (req, res) => {
    res.send('auth funciona');
    
});

router.post('/signup', usersController.registerUser)


module.exports = router;