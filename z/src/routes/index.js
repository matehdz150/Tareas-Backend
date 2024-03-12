const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const homeRouter = require('./home');
const authMiddleware = require('../Middlewares/auth.middleware');
const usersController = require('../controllers/user.controller');

router.use(express.json());


router.use('/auth', authRouter);
router.use('/home', authMiddleware, homeRouter);

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', usersController.loginUser);

module.exports = router;