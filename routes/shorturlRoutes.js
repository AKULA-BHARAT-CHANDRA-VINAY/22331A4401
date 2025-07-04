const express = require('express');
const router = express.Router();
const shorturlController = require('../controllers/shorturlController');
router.post('/shorturls', shorturlController.createShortUrl);

router.get('/shorturls/:shortcode', shorturlController.getShortUrlStatistics);

module.exports = router;