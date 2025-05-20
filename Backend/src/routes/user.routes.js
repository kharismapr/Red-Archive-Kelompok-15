const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getEmail', userController.getEmail);
router.put('/update', userController.updateUser);
router.put('/profile', upload.single('image'), userController.uploadProfile);
router.delete('/delete', userController.deleteUser);

module.exports = router;