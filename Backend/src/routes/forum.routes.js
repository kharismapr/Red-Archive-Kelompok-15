const forumController = require('../controllers/forum.controller');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get', forumController.getById);
router.get('/getAll', forumController.getAll);
router.post('/insert', upload.single('image'), forumController.createForum);
router.put('/update', upload.single('image'), forumController.updateForum);
router.delete('/delete', forumController.deleteForum);

module.exports = router;