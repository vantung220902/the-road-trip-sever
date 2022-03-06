const express = require('express');
const router = express.Router();

const FriendController = require('../app/controllers/friendController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');

router.get('/check', passport.authenticate('jwt', { session: false }), FriendController.checkFriend);

router.post('/request', passport.authenticate('jwt', { session: false }), FriendController.createRequest);

router.get('/listRequest/:id', passport.authenticate('jwt', { session: false }), FriendController.getRequests);

router.patch('/accept', passport.authenticate('jwt', { session: false }), FriendController.acceptRequest);

router.delete('/decline/:id', passport.authenticate('jwt', { session: false }), FriendController.declineRequest);

router.delete('/remove', passport.authenticate('jwt', { session: false }), FriendController.removeRequest);

router.get('/listFriends/:id', passport.authenticate('jwt', { session: false }), FriendController.getFriends);

module.exports = router;