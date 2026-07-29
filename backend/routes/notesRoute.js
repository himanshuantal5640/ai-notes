const express = require('express');
const { createNotes } = require('../controllers/noteController');
const router = express.Router();

router.post('/',createNotes);

module.exports = router;