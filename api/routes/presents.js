const express = require('express');
const router = express.Router();
const presentsController = require('../controllers/presents');
const { checkToken } = require('../helpers/helpers');

router.get('/', checkToken, presentsController.index);

router.get('/:id', checkToken, presentsController.show);

router.get('/user/:id', checkToken, presentsController.showByUser)

router.post('/', checkToken, presentsController.create);

router.put('/:id', checkToken, presentsController.update);

router.delete('/:id', checkToken, presentsController.destroy);

module.exports = router;