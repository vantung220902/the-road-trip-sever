const express = require('express');
const router = express.Router();

const TicketController = require('../app/controllers/ticketController');
const passport = require('passport');
const passportConfig = require('../app/middleware/passport');
router.get('/detail/:id', TicketController.getTicketBuyId);

router.get('/sell/:id',
    passport.authenticate('jwt', { session: false }), TicketController.getTicketBuyIdUser);

router.get('/number', TicketController.getNumber);

router.get('/count/:id', TicketController.getCount);

router.patch('/deleted', passport.authenticate('jwt', { session: false }), TicketController.deletedTickets);

router.patch('/accept', passport.authenticate('jwt', { session: false }), TicketController.acceptTickets);

router.post('/deletedForever', passport.authenticate('jwt', { session: false }), TicketController.deletedForeverTickets);

router.patch('/restore', passport.authenticate('jwt', { session: false }), TicketController.restoreTickets);

router.get('/trash/:idAuthor', passport.authenticate('jwt', { session: false }), TicketController.trashTickets);

router.put('/update/:id', passport.authenticate('jwt', { session: false }), TicketController.updateTicket);

router.post('/create', passport.authenticate('jwt', { session: false }), TicketController.insertTicket);

router.get('/searchByAuthor/:idAuthor', TicketController.searchByAuthor);

router.get('/search', TicketController.searchTickets);

router.get('/ids', TicketController.getAllIds);

router.get('/approval', passport.authenticate('jwt', { session: false }), TicketController.getApproval);

router.get('/ticketsAdmin', passport.authenticate('jwt', { session: false }), TicketController.getTicketsAdmin);

router.get('/trashAdmin', passport.authenticate('jwt', { session: false }), TicketController.getTrashAdmin);

router.get('/', TicketController.index);

module.exports = router;
