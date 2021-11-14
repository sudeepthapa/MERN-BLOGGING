const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

const categoryController = new CategoryController();

router.get('/', categoryController.get);
router.patch('/:id', categoryController.update);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);

module.exports = router;