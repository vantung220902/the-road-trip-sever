const express = require('express');
const router = express.Router();

const StoriesController = require('../app/controllers/storiesController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');

router.post('/add', passport.authenticate('jwt', { session: false }), StoriesController.addStory);

router.get('/all', passport.authenticate('jwt', { session: false }), StoriesController.getAll);

router.delete('/remove/:id', passport.authenticate('jwt', { session: false }), StoriesController.deleteStory);

module.exports = router;