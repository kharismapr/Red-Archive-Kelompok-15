const archiveController = require('../controllers/archive.controller');
const express = require('express');
const router = express.Router();

router.get('/get', archiveController.getByUser);
router.get('/getAll', archiveController.getAll);
router.post('/insert', archiveController.createArchive);
router.delete('/delete', archiveController.deleteArchive);

module.exports = router;