const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const hasRole = require('../middlewares/role.middleware');

router.use(authMiddleware); //hace que todas las rutas usen el middleware
router.use(hasRole('admin'));
router.get("",usersController.getUsers);
router.get("/:id", usersController.getUserById);


module.exports = router;