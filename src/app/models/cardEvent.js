const db = require('../../config/db');

class CardEvent {
    getCardEvent(idAccount, _start, _limit) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT user.fullName,user.email,phone,note,cardevent.address,cardNumber,
             cardevent.number,tickets.cost,tickets.name,(select sum(cardevent.number) from cardevent
             where tickets.id =cardevent.idTicket) as sum ,idAccount, dateBuy,tickets.time,
             idTicket,tickets.dateStart,tickets.dateEnd,tickets.image,tickets.place,cardevent.id from cardevent
             INNER JOIN user on user.id = cardevent.idAccount
             INNER JOIN tickets on tickets.id = cardevent.idTicket WHERE cardevent.idAccount = ? and
             cardevent.deleted = false  LIMIT ?,?
            `,
                [parseInt(idAccount), _start, _limit],
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getCardEventAdmin() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT user.fullName,user.avt,user.email,phone,note,cardNumber,
                ( cardevent.number* tickets.cost+ 2) as sum,tickets.name,idAccount, dateBuy,
                tickets.time, idTicket,tickets.image,cardevent.id from cardevent
                INNER JOIN user on user.id = cardevent.idAccount
                 INNER JOIN tickets on tickets.id = cardevent.idTicket
                 WHERE cardevent.deleted = false
            `,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getTrashAdmin() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT user.fullName,user.avt,user.email,phone,note,cardNumber,
                ( cardevent.number* tickets.cost+ 2) as sum,tickets.name,idAccount, dateBuy,
                tickets.time, idTicket,tickets.image,cardevent.id from cardevent
                INNER JOIN user on user.id = cardevent.idAccount
                 INNER JOIN tickets on tickets.id = cardevent.idTicket
                 WHERE cardevent.deleted = true
            `,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    buy(payment) {
        const array = [
            payment.number,
            payment.note ? payment.note : null,
            parseInt(payment.idAccount),
            payment.cardNumber,
            payment.dateBuy,
            payment.address,
            payment.phone,
            parseFloat(payment.idTicket),
            payment.number,
            parseFloat(payment.idTicket),
        ];
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO cardevent ( number, note, idAccount,cardNumber, dateBuy, address, phone, idTicket, deleted)
                VALUES (?,?,?,?,?,?,?,?,false);
             update tickets set sold = sold - ? where tickets.id = ?;
                 `,
                array,
                (err, res) => {
                    if (err) throw err;
                    return resolve({ id: res.insertId, ...payment });
                },
            );
        });
    }
    deleted(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `update cardevent set deleted = true where id = ${parseInt(id, 10)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve({ checked: true });
            });
        });
    }
    getTrashCardEvent(idAccount) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT user.fullName,user.email,phone,note,cardevent.address,cardNumber,
            tickets.number,tickets.cost,tickets.name,idTicket,idAccount, dateBuy,tickets.time,
            tickets.dateStart,tickets.dateEnd,tickets.image,tickets.place,cardevent.id from cardevent
            INNER JOIN user on user.id = cardevent.idAccount
            INNER JOIN tickets on tickets.id = cardevent.idTicket
            WHERE cardevent.idAccount = ? and cardevent.deleted = true
            `,
                parseInt(idAccount),
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getCount(idAuthor) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT count(id) as count FROM cardevent where idAccount = ?`,
                idAuthor, (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        })
    }
    restore(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `update cardevent set deleted = false where id = ${parseInt(id, 10)};\n`;
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
            return `delete from cardevent where id = ${parseInt(id)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve({ checked: true });
            });
        });
    }
    searches(q, idAuthor) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT user.fullName,user.email,phone,note,cardevent.address,cardNumber, tickets.number,
                tickets.cost,tickets.name,idTicket,idAccount, dateBuy,tickets.time, tickets.dateStart,
                tickets.dateEnd,tickets.image,tickets.place,cardevent.id from cardevent
                 INNER JOIN user on user.id = cardevent.idAccount INNER JOIN tickets on tickets.id = cardevent.idTicket
                  WHERE cardevent.idAccount = ? and cardevent.deleted = false and
                   CONCAT(tickets.name,description) LIKE ?`,
                [idAuthor, `%${q}%`],
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    revenue() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT DATE_FORMAT(dateBuy, "%b") AS month, sum(number) * 2 as 
            total FROM cardevent WHERE dateBuy <= NOW() and dateBuy >= Date_add(Now(),interval - 12 month)
            GROUP BY DATE_FORMAT(dateBuy, "%m-%Y")`,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        })
    }
    lasts() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT user.fullName,user.avt,
            (select (sum(cardevent.number) * tickets.cost) + 2 from cardevent where tickets.id =cardevent.idTicket)
            as sum ,idAccount, dateBuy, idTicket,cardevent.id,cardevent.number from cardevent
            INNER JOIN user on user.id = cardevent.idAccount INNER JOIN tickets on tickets.id = cardevent.idTicket
             WHERE cardevent.deleted = false ORDER BY month(cardevent.dateBuy) DESC LIMIT 0,5`, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
    find(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT user.fullName,user.email,phone,note,cardevent.address,cardNumber,user.avt,
             cardevent.number,tickets.cost,tickets.name,( cardevent.number* tickets.cost+ 2) as sum,
             idAccount, dateBuy,tickets.time,idTicket,tickets.dateStart,tickets.dateEnd,tickets.image,
             tickets.place,cardevent.id,tickets.sold from cardevent
             INNER JOIN user on user.id = cardevent.idAccount
             INNER JOIN tickets on tickets.id = cardevent.idTicket
             WHERE cardevent.id = ? and cardevent.deleted = false`,
                parseInt(id),
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                }
            )
        })
    }
    update(cardevent) {
        const array = [
            parseInt(cardevent.sold, 10),
            cardevent.idTicket,
            parseInt(cardevent.number, 10),
            cardevent.note,
            cardevent.idAccount,
            cardevent.cardNumber,
            cardevent.dateBuy,
            cardevent.address,
            cardevent.phone,
            cardevent.idTicket,
            cardevent.id

        ];
        return new Promise((resolve, reject) => {
            db.query(`UPDATE tickets SET sold=? WHERE id = ?;
            UPDATE cardevent SET number = ?,
            note=?,idAccount=?,cardNumber=?,dateBuy=?,
            address=?,phone=?,idTicket=? WHERE id=?;`,
                array, (err, res) => {
                    if (err) throw err;
                    return resolve({ checked: true })
                }
            )
        })
    }

}
module.exports = new CardEvent();
