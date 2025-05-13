const reviewController = require('../controllers/review.controller');
const express = require('express');
const router = express.Router();

router.get('/get', reviewController.getSpecific);
router.get('/getAll', reviewController.getAll);
router.post('/insert', reviewController.createReview);
router.put('/update', reviewController.updateReview);
router.delete('/delete', reviewController.deleteReview);

module.exports = router;