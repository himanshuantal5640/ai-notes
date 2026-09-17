const express = require('express');
const {summarizeNote, improveGrammar, convertToBullets, generateTitle } = require('../controllers/aiController');
const router = express.Router();

router.post('/:id/summarize',summarizeNote);
router.post('/:id/grammar',improveGrammar);
router.post('/:id/bullets',convertToBullets);
router.post('/:id/title',generateTitle);

module.exports = router;