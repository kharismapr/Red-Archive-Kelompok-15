const filmController = require('../controllers/film.controller');
const express = require('express');
const router = express.Router();

router.get('/getAll', filmController.getAll);
router.get('/getById', filmController.getById);
router.post('/insert', filmController.insertFilm);
router.put('/update', filmController.updateFilm);
router.delete('/delete', filmController.deleteFilm);

module.exports = router;