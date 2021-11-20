const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/find/:username', userController.getUser);

router.post('/register', userController.register);

router.post('/login', userController.login);



module.exports = router;