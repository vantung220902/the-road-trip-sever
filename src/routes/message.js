const express = require('express');
const router = express.Router();

const MessageController = require('../app/controllers/MessageController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');

router.get('/list', passport.authenticate('jwt', { session: false }), MessageController.getListMessages);

router.post('/create', passport.authenticate('jwt', { session: false }), MessageController.createMessage);

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), MessageController.deleteMessage);

module.exports = router;