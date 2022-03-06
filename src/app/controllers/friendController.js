const friends = require('../models/friends');

class FriendController {
    checkFriend(req, res, next) {
        friends.check(req.query).then(function (result) {
            return res.status(200).json(result);
        }).catch(next);
    }
    createRequest(req, res, next) {
        friends.create(req.body).then(function (result) {
            return res.status(201).json(result);
        }).catch(next);
    }
    getRequests(req, res, next) {
        friends.list(req.params.id).then(function (result) {
            return res.status(200).json(result);
        }).catch(next);
    }
    acceptRequest(req, res, next) {
        friends.accept(req.body.id).then(function (result) {
            return res.status(200).json(result);
        }).catch(next);
    }
    declineRequest(req, res, next) {
        friends.decline(req.params.id).then(function (result) {
            return res.status(200).json(result);
        }).catch(next);
    }
    removeRequest(req, res, next) {
        friends.remove(req.query).then(function (result) {
            return res.status(200).json(result);
        }).catch(next);
    }
    getFriends(req, res, next) {
        friends.getFriends(req.params.id).then(function (result) {
            return res.status(200).json(result);
        }).catch(next);
    }
}
module.exports = new FriendController();