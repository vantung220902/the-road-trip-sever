const express = require('express');
const router = express.Router();

const CommentController = require('../app/controllers/commentController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');

router.get('/post/:idPost', passport.authenticate('jwt', { session: false }), CommentController.getComment);

router.post('/create', passport.authenticate('jwt', { session: false }), CommentController.createComment);

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), CommentController.deleteComment);

module.exports = router;