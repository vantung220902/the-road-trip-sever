const db = require('../../config/db');

class User {

    findByID(id) {
        return new Promise(function (resolve, reject) {
            db.query(
                'SELECT id,email,fullName,avt,role,date,sdt,address,role FROM user WHERE id=?',
                id,
                function (err, result) {
                    if (err) throw err;
                    return resolve(result);
                },
            );
        });
    }
    findEmail(email) {
        return new Promise(function (resolve, reject) {
            db.query(
                'SELECT email,password,fullName,sdt,address,date,id,avt,role FROM user WHERE email= ?',
                email,
                function (err, result) {
                    if (err) throw err;
                    return resolve(result);
                },
            );
        });
    }
    signUp(account) {
        return new Promise(function (resolve, reject) {
            db.query(
                `INSERT INTO user(email,fullName,password,role)
             VALUES(?,?,?,'user')
            `,
                [account.email, account.fullName, account.password],
                function (err, result) {
                    if (err) throw err;
                    return resolve({ id: result.insertId, fullName: account.fullName, avt: account.avt });
                },
            );
        });
    }
    add(account) {
        const array = [
            account.email,
            account.fullName,
            account.password,
            account.avt,
            account.address,
            account.sdt,
            account.date,
            account.created
        ];
        console.log(array);
        return new Promise(function (resolve, reject) {
            db.query(
                `INSERT INTO user(email, fullName, password, avt, address, role, sdt, date, created, deleted)
                 VALUES (?,?,?,?,?,'user',?,?,?,0)
            `,
                array,
                function (err, result) {
                    if (err) throw err;
                    return resolve({ checked: true });
                },
            );
        });
    }
    update(account) {
        return new Promise(function (resolve, reject) {
            db.query(`UPDATE user SET fullName=?,avt=?,sdt=?,date=?,
            address=? WHERE id=?;
            `, [account.fullName, account.avt, account.sdt, account.date, account.address, account.id],
                function (err, res) {
                    if (err) throw err;
                    return resolve({ ...account });
                },

            );
        });
    }
    deleted(arrIds, idAccount) {
        const arrQuery = arrIds.map((id) => {
            return `update user set deleted = true where id = ${parseInt(id, 10)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve({ checked: true });
            });
        });
    }
    number() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT DATE_FORMAT(created, "%b") AS month, COUNT(user.id) as sum FROM user WHERE
             created <= NOW() and created >= Date_add(Now(),interval - 12 month)
             GROUP BY DATE_FORMAT(created, "%m-%Y")`, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
    last(start, end) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id,email,avt,fullName,address,sdt,date FROM user where deleted=false ORDER BY month(created) DESC LIMIT ?,?`,
                [parseInt(start, 10), parseInt(end, 10)], (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        })
    }
    transactions() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT user.id,user.fullName,sum(cardevent.number * tickets.cost +2) as sum
             from user INNER JOIN cardevent on user.id = cardevent.idAccount
              INNER JOIN tickets on tickets.id = cardevent.idTicket GROUP BY user.id`, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
    trashUsers() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id,email,avt,fullName,address,sdt,date FROM user where deleted=true ORDER BY month(created) DESC `,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        })
    }
    restore(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `update user set deleted = false where id = ${parseInt(id, 10)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve({ checked: true });
            });
        });
    }
    deleteForever(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `
            DELETE FROM cardevent WHERE idAccount = ${parseInt(id, 10)};
            DELETE FROM user WHERE id =  ${parseInt(id, 10)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve({ checked: true });
            });
        });
    }
    getAllIds() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT id,fullName,avt,email from user`,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
  

}
module.exports = new User();