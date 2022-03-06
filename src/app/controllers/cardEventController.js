const cardEvent = require('../models/cardEvent');

class CardEventController {
    index(req, res, next) {
        const _start = req.query._start ? parseInt(req.query._start) : 0;
        const _limit = req.query._limit ? parseInt(req.query._limit) : 6;
        cardEvent
            .getCardEvent(req.query.idAccount, _start, _limit)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    deletedPayment(req, res, next) {
        cardEvent
            .deleted(req.body)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }

    trashPayment(req, res, next) {
        cardEvent
            .getTrashCardEvent(req.params.idAccount)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    trashAdminPayment(req, res, next) {
        cardEvent
            .getTrashAdmin()
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    restorePayment(req, res, next) {
        cardEvent
            .restore(req.body)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    getCount(req, res, next) {
        cardEvent.getCount(req.params.id).then((count) => {
            return res.status(200).json(...count);
        }).catch(next);
    }
    deletedForeverPayment(req, res, next) {
        cardEvent
            .deleteForever(req.body)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    searchPayment(req, res, next) {
        cardEvent.searches(req.query.q, req.params.idAccount)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    buyTicket(req, res, next) {
        cardEvent.buy(req.body).then((data) => {
            return res.status(201).json(data);
        }).catch(next);
    }
    revenueTicket(req, res, next) {
        cardEvent.revenue().then((data) => {
            return res.status(200).json(data);
        }).catch(next);
    }
    lastsPayment(req, res, next) {
        cardEvent.lasts().then((data) => {
            return res.status(200).json(data);
        }).catch(next);
    }
    transactionsAdmin(req, res, next) {
        cardEvent.getCardEventAdmin().then((data) => {
            return res.status(200).json(data);
        }).catch(next);
    }
    findPayment(req, res, next) {
        cardEvent.find(req.params.id).then((data) => {
            return res.status(200).json(data);
        }).catch(next);
    }
    updatePayment(req, res, next) {
        cardEvent.update(req.body).then((data) => {
            return res.status(200).json(data);
        }).catch(next);
    }
}
module.exports = new CardEventController();
