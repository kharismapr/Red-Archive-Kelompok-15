const filmController = require('../controllers/film.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', filmController.getAll);
router.get('/getById', filmController.getById);
router.post('/insert', upload.single('image'), filmController.insertFilm);
router.put('/update', upload.single('image'), filmController.updateFilm);
router.delete('/delete', filmController.deleteFilm);

module.exports = router;