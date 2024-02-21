const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');

router.use(express.json());

router.use('/auth', authRouter);
router.use('/users', usersRouter)

router.get('', (req, res) => {
    const texto = '¡Hola! Este es cualquier texto.';
    res.send(texto);
});

module.exports = router;