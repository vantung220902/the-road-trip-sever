const post = require('../models/post');

class PostController {

    getPost(req, res, next) {
        post.getPost(req.query.start, req.query.limit).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    createPost(req, res, next) {
        post.createPost(req.body).then((result) => {
            return res.status(201).json(result);
        }).catch(next);
    }
    likePost(req, res, next) {
        post.like(req.body).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    myPost(req, res, next) {
        post.me(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    findPost(req, res, next) {
        post.find(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    deletePost(req, res, next) {
        post.delete(req.body).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    updatePost(req, res, next) {
        post.update(req.body, req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    numberPost(req, res, next) {
        post.number(req.params.month).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    getNumberPosts(req, res, next) {
        post.count().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
}
module.exports = new PostController();
