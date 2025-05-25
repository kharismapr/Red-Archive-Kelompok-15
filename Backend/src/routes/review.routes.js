const reviewController = require('../controllers/review.controller');
const express = require('express');
const router = express.Router();

// Get review routes
router.get('/getAll', reviewController.getAll);
router.get('/getByFilmId/:id', reviewController.getByFilmId);
router.get('/get', reviewController.getSpecific);

// Create, update, delete routes
router.post('/insert', reviewController.createReview);
router.put('/update', reviewController.updateReview);
router.delete('/delete', reviewController.deleteReview);

module.exports = router;