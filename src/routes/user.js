const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/userController');
const passport = require('passport');

router.post('/signIn', passport.authenticate('local', { session: false }), UserController.signIn);

router.post('/signUp', UserController.signUp);

router.post('/addUser', passport.authenticate('jwt', { session: false }), UserController.addUser);

router.patch('/deleted',
    passport.authenticate('jwt', { session: false }), UserController.deletedUser);

router.put('/update', passport.authenticate('jwt', { session: false }), UserController.update);

router.patch('/restore',
    passport.authenticate('jwt', { session: false }),
    UserController.restoreUser);

router.post(
    '/deletedForever',
    passport.authenticate('jwt', { session: false }),
    UserController.deletedForeverUser);


router.get('/findEmail', UserController.findEmail);

router.get('/ids', UserController.getAllIds);

router.get('/transactions', UserController.getTransactions);

router.get('/findUser/:id', UserController.findUser);

router.get('/count', passport.authenticate('jwt', { session: false }), UserController.numberUser);

router.get('/lasts', passport.authenticate('jwt', { session: false }), UserController.lastsUser);

router.get('/trash', passport.authenticate('jwt', { session: false }), UserController.trashUsers);

router.get(
    '/secret',
    passport.authenticate('jwt', { session: false }),
    UserController.secret,
);

module.exports = router;
