const postController = require('../controllers/post.controller');
const express = require('express');
const router = express.Router();

router.get('/get', postController.getById);
router.get('/getAll', postController.getAll);
router.post('/insert', postController.createPost);
router.put('/update', postController.updatePost);
router.delete('/delete', postController.deletePost);

module.exports = router;