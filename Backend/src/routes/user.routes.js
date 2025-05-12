const userController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/getEmail', userController.getEmail);
router.put('/update', userController.updateUser);
router.put('/profile', userController.uploadProfile);
router.delete('/delete', userController.deleteUser);

module.exports = router;