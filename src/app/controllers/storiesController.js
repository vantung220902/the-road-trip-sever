const stories = require('../models/stories');

class StoriesController {

    getAll(req, res, next) {
        stories.getAll().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    addStory(req, res, next) {
        stories.insert(req.body).then((result) => {
            return res.status(201).json(result);
        }).catch(next);
    }
    deleteStory(req, res, next) {
        stories.delete(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
}
module.exports = new StoriesController();
