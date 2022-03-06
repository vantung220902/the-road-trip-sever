const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/jwt');
const bcrypt = require('bcryptjs');
const encodedToken = (id) => {
    return jwt.sign(
        {
            iss: 'Van Tung',
            sub: id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 3),
        },
        JWT_SECRET,
    );
};
class UserController {
    signIn(req, res, next) {
        const token = encodedToken(req.user.id);
        return res.status(200).json({
            id: req.user.id,
            fullName: req.user.fullName,
            avt: req.user.avt,
            sdt: req.user.sdt,
            date: req.user.date,
            address: req.user.address,
            role: req.user.role,
            Authorization: 'Bearer ' + token
        });
    }
    findEmail(req, res, next) {
        user.findEmail(req.query.email)
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch(next);
    }
    deletedUser(req, res, next) {
        user.deleted(req.body)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    signUp(req, res, next) {
        async function hashPassword() {
            try {
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(req.body.password, salt);
                return passwordHash;
            } catch (error) {
                console.log('error', error);
            }
        }
        hashPassword()
            .then((passwordHash) => {
                user.signUp({ ...req.body, password: passwordHash })
                    .then((result) => {
                        const token = encodedToken(result.id);
                        return res.status(201).json({ ...result, Authorization: 'Bearer ' + token });
                    })
                    .catch(next);
            })
            .catch(next);
    }
    addUser(req, res, next) {
        async function hashPassword() {
            try {
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(req.body.password, salt);
                return passwordHash;
            } catch (error) {
                console.log('error', error);
            }
        }
        hashPassword()
            .then((passwordHash) => {
                add.signUp({ ...req.body, password: passwordHash })
                    .then((result) => {
                        const token = encodedToken(result.id);
                        return res.status(201).json({ ...result, Authorization: 'Bearer ' + token });
                    })
                    .catch(next);
            })
            .catch(next);
    }
    secret(req, res, next) {
        return res.status(200).json({ checked: true });
    }
    findUser(req, res, next) {
        user.findByID(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    update(req, res, next) {
        user.update(req.body).then((user) => {
            return res.status(200).json(user);
        }).catch(next)
    }
    numberUser(req, res, next) {
        user.number().then((user) => {
            return res.status(200).json(user);
        }).catch(next)
    }
    lastsUser(req, res, next) {
        user.last(req.query.start, req.query.end).then((users) => {
            return res.status(200).json(users);
        }).catch(next)
    }
    getTransactions(req, res, next) {
        user.transactions().then((transactions) => {
            return res.status(200).json(transactions);
        }).catch(next);
    }
    trashUsers(req, res, next) {
        user.trashUsers().then((users) => {
            return res.status(200).json(users);
        }).catch(next)
    }
    deletedForeverUser(req, res, next) {
        user.deleteForever(req.body)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    restoreUser(req, res, next) {
        user.restore(req.body)
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(next);
    }
    getAllIds(req, res, next) {
        user.getAllIds().then((result) => {
            return res.status(200).json(result);
        }).catch(next);
    }
    
}
module.exports = new UserController();
