const express = require('express');
const router = express.Router();
const { createCommunityEvent } = require('../controllers/communityController');

router.post('/', createCommunityEvent);

module.exports = router;
