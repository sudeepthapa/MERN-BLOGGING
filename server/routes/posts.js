const express = require('express');
const PostController = require('../controllers/PostController');

const router = express.Router();

const postController = new PostController();

router.get('/', postController.getAllPost);
router.get('/:id', postController.viewPost);
router.patch('/:id', postController.updatePost);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);

module.exports = router;