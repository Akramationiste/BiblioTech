const express = require('express');
const router = express.Router();

const client = require('./client');
const employe = require('./employe');

router.use('/client', client);
router.use('/employe', employe);

module.exports = router;