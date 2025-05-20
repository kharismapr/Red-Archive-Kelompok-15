const threadController = require('../controllers/thread.controller');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/get', threadController.getById);
router.get('/getAll', threadController.getAll);
router.post('/insert', upload.single('image'), threadController.createThread);
router.put('/update', upload.single('image'), threadController.updateThread);
router.delete('/delete', threadController.deleteThread);

module.exports = router;