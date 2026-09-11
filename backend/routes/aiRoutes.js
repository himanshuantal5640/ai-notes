const express = require('express');
const { summarize, improveGrammar, convertBullet, generateTitle } = require('../controllers/aiController');
const router = express.Router();

router.post('/:id/summarize',summarize);
router.post('/:id/grammar',improveGrammar);
router.post('/:id/bullets',convertBullet);
router.post('/:id/title',generateTitle);

module.exports = router;