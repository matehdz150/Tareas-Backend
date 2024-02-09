const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

router.use('/users',usersRouter);

router.get('', (req, res) => {
    const texto = '¡Hola! Este es cualquier texto.';
    res.send(texto);
});

module.exports = router;