const filmController = require('../controllers/film.controller');
const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getAll', filmController.getAll);
router.get('/getById/:id', filmController.getById);
router.get('/getBySlug/:slug', filmController.getBySlug);
router.post('/insert', upload.single('image'), filmController.insertFilm);
router.put('/update', upload.single('image'), filmController.updateFilm);
router.delete('/delete', filmController.deleteFilm);

module.exports = router;