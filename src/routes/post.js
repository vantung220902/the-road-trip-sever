const express = require('express');
const router = express.Router();

const PostController = require('../app/controllers/postController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');

router.get('/all', passport.authenticate('jwt', { session: false }), PostController.getPost);

router.get('/myPost/:id', passport.authenticate('jwt', { session: false }), PostController.myPost);

router.get('/number', passport.authenticate('jwt', { session: false }), PostController.getNumberPosts)

router.get('/findPost/:id', passport.authenticate('jwt', { session: false }), PostController.findPost);

router.post('/add', passport.authenticate('jwt', { session: false }), PostController.createPost);

router.patch('/like', passport.authenticate('jwt', { session: false }), PostController.likePost);

router.post('/delete', passport.authenticate('jwt', { session: false }), PostController.deletePost);

router.put('/update/:id', passport.authenticate('jwt', { session: false }), PostController.updatePost);

router.get('/count/:month', passport.authenticate('jwt', { session: false }), PostController.numberPost);

module.exports = router;