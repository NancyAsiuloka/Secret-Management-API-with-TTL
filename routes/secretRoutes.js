const express = require('express');
const { storeSecretWithTTL, getSecret } = require('../controllers/secretController');

const router = express.Router();

// Define route to handle POST requests to /secrets
router.post('/secrets', storeSecretWithTTL);

// Define route to handle GET requests to /secrets/:key
router.get('/secrets/:key', getSecret);

module.exports = router;
