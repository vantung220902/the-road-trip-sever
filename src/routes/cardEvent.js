const express = require('express');
const router = express.Router();

const CardEventController = require('../app/controllers/cardEventController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');

router.patch('/deleted',
    passport.authenticate('jwt', { session: false }), CardEventController.deletedPayment);

router.post(
    '/deletedForever',
    passport.authenticate('jwt', { session: false }),
    CardEventController.deletedForeverPayment);

router.post('/buyTicket', passport.authenticate('jwt', { session: false }),
    CardEventController.buyTicket);

router.patch('/restore',
    passport.authenticate('jwt', { session: false }),
    CardEventController.restorePayment);

router.patch('/update',
    passport.authenticate('jwt', { session: false }),
    CardEventController.updatePayment);

router.get('/search/:idAccount',
    CardEventController.searchPayment);

router.get('/find/:id', passport.authenticate('jwt', { session: false }),
    CardEventController.findPayment);

router.get('/revenue', passport.authenticate('jwt', { session: false }),
    CardEventController.revenueTicket);

router.get('/adminTrash', passport.authenticate('jwt', { session: false }), CardEventController.trashAdminPayment);

router.get('/count/:id', CardEventController.getCount);

router.get('/lasts', CardEventController.lastsPayment);

router.get('/transactions', passport.authenticate('jwt', { session: false }), CardEventController.transactionsAdmin);

router.get('/trash/:idAccount',
    passport.authenticate('jwt', { session: false }),
    CardEventController.trashPayment);

router.get('/',
    CardEventController.index);

module.exports = router;
