const express = require('express');
const router = express.Router();

const EmailController = require('../app/controllers/emailController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');

router.post('/sendEmail', passport.authenticate('jwt', { session: false }), EmailController.sendEmail);

module.exports = router;