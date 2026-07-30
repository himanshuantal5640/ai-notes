const express = require('express');
const { createNotes, getNotes, getSingleNotes, updateNotes, deleteNotes } = require('../controllers/noteController');
const router = express.Router();

router.post('/',createNotes);
router.get('/',getNotes);
router.get('/:id',getSingleNotes);
router.post('/:id',updateNotes);
router.delete('/:id',deleteNotes);

module.exports = router;