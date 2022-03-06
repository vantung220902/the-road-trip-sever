const express = require('express');
const router = express.Router();

const InvitationController = require('../app/controllers/invitationController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');
router.get('/receive/:id', InvitationController.getInvitationsReceived);

router.post(
    '/create/:id',
    InvitationController.createInvitation,
    passport.authenticate('jwt', { session: false }),
);

router.patch('/accept/:id',InvitationController.updateState);

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), InvitationController.deleteInvitation);

module.exports = router;