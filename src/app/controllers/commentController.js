const comment = require('../models/comment');

class CommentController {

    getComment(req, res, next) {
        comment.getCommentByPost(req.params.idPost)
            .then((result) => {
                return res.status(200).json(result);
            }).catch(next);
    }
    createComment(req, res, next) {
        comment.create(req.body).then((result) => {
            return res.status(201).json(result);
        }).catch(next);
    }
    deleteComment(req, res, next) {
        comment.delete(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
}
module.exports = new CommentController();