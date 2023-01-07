const router = require('express').Router();

const {
    getThought,
    getSingleThought, 
    createThought, 
    updateThought, 
    deleteThought, 
    createReaction, 
    deleteReaction
} = require('../../controllers/thoughtController');

// api/thoughts
//GET all and POST
router.route('/').get(getThought).post(createThought);

// api/thoughts/:thoughtId
// GET one thought, PUT(update) and DELETE
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

// localhost:3001/api/thoughts/:thoughtId/reactions 
// POST and DELETE a reaction by id
router.route('/:thoughtId/reactions/')
.post(createReaction)
.delete(deleteReaction);

module.exports = router;