const message = require('../models/message');

class MessageController {

    getListMessages(req, res, next) {
        message.list(req.query.id, req.query.id2)
            .then((result) => {
                return res.status(200).json(result);
            }).catch(next);
    }
    createMessage(req, res, next) {
        message.create(req.body).then((result) => {
            return res.status(201).json(result);
        }).catch(next);
    }
    deleteMessage(req, res, next) {
        message.delete(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
}
module.exports = new MessageController();
