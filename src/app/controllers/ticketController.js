const tickets = require('../models/ticket');

class SiteController {
    index(req, res, next) {
        tickets
            .getTickets(req.query)
            .then((tickets) => {
                return res.status(200).json(tickets);
            })
            .catch(next);
    }
    getTicketBuyId(req, res, next) {
        tickets
            .getBuyId(req.params.id)
            .then((ticket) => {
                return res.status(200).json(ticket);
            })
            .catch(next);
    }
    searchTickets(req, res, next) {
        tickets
            .searches(req.query.q)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    searchByAuthor(req, res, next) {
        tickets
            .searchesAuthor(req.query.q, req.params.idAuthor)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }

    insertTicket(req, res, next) {
        tickets
            .insert(req.body)
            .then((ticket) => {
                return res.status(201).json(ticket);
            })
            .catch(next);
    }
    getTicketBuyIdUser(req, res, next) {
        const _start = req.query._start ? parseInt(req.query._start) : 0;
        const _limit = req.query._limit ? parseInt(req.query._limit) : 6;
        tickets.getBuyIdUser(req.params.id, _start, _limit)
            .then((tickets) => {
                return res.status(200).json(tickets);
            })
            .catch(next);
    }
    getCount(req, res, next) {
        tickets.getCount(req.params.id).then((count) => {
            return res.status(200).json(...count);
        }).catch(next);
    }
    updateTicket(req, res, next) {
        tickets
            .update(req.params.id, req.body)
            .then((ticket) => {
                return res.status(200).json(ticket);
            })
            .catch(next);
    }
    deletedTickets(req, res, next) {
        tickets
            .deleted(req.body, req.params.idAuthor)
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch(next);
    }
    trashTickets(req, res, next) {
        tickets
            .getDeleted(req.params.idAuthor)
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch(next);
    }
    restoreTickets(req, res, next) {
        tickets
            .restore(req.body, req.params.idAuthor)
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch(next);
    }
    deletedForeverTickets(req, res, next) {
        tickets
            .deleteForever(req.body, req.params.idAuthor)
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch(next);
    }
    getNumber(req, res, next) {
        tickets.getNumber().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    getApproval(req, res, next) {
        tickets.getApproval().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    getTicketsAdmin(req, res, next) {
        tickets.getTicketsAdmin().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    getTrashAdmin(req, res, next) {
        tickets.getTrashAdmin().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    acceptTickets(req, res, next) {
        tickets.accept(req.body).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    getAllIds(req, res, next) {
        tickets.getAllIds().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }

}
module.exports = new SiteController();
