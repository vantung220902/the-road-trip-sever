const invitation = require('../models/invitations');

class InvitationController {
    getInvitationsReceived(req, res, next) {
        invitation.getReceived(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    updateState(req, res, next) {
        invitation.update(req.params.id).then((result) => {
            return;
        }).catch(next);
    }
    createInvitation(req, res, next) {
        invitation.create(req.body,req.params.id).then((invitation) => {
            return res.status(201).json(invitation);
        }).catch(next);
    }
    deleteInvitation(req, res, next) {
        invitation.delete(req.params.id).then((result) => {
            return;
        }).catch(next);
    }
}
module.exports = new InvitationController();