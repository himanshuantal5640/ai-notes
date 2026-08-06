const express = require('express');
const { createNotes, getNotes, getSingleNotes, updateNotes, deleteNotes, searchNotes } = require('../controllers/noteController');
const router = express.Router();

router.post('/',createNotes);
router.get('/search',searchNotes);//before id 
router.get('/',getNotes);
router.get('/:id',getSingleNotes);
router.post('/:id',updateNotes);
router.delete('/:id',deleteNotes);

module.exports = router;