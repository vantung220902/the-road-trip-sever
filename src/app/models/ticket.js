const db = require('../../config/db');
class Ticket {
    getTickets(number) {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image, tickets.dateStart,
            tickets.dateEnd,tickets.time,tickets.description,tickets.cost,
            tickets.number,tickets.place,user.fullName from tickets
             INNER JOIN user on tickets.idAuthor = user.id
              where tickets.sold>0 and CURRENT_DATE <= tickets.dateEnd and tickets.deleted= false and status = true
               LIMIT ?,? `,
                [parseInt(number._start), parseInt(number._limit)],
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getBuyId(id) {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image,
             tickets.dateStart,tickets.dateEnd,tickets.time,tickets.description,
             tickets.cost, tickets.number,tickets.place,user.fullName,tickets.idAuthor,user.avt,sold as sum
             from tickets INNER JOIN user on tickets.idAuthor = user.id
             where tickets.id = ? and tickets.deleted= false and status = true`,
                [parseInt(id)],
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getBuyIdUser(idUser, _start, _limit) {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image,status,
             tickets.dateStart,tickets.dateEnd,tickets.time,tickets.description,
             tickets.cost, tickets.number,tickets.place,user.fullName,tickets.idAuthor,
            sold as sum from tickets INNER JOIN user on tickets.idAuthor = user.id where
              tickets.idAuthor = ? and tickets.deleted= false  LIMIT ?,? `,
                [parseInt(idUser), _start, _limit],
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getApproval() {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image,
             tickets.dateStart,tickets.dateEnd,tickets.time,user.avt,
             tickets.cost, tickets.number,tickets.place,user.fullName,tickets.idAuthor
             from tickets INNER JOIN user on tickets.idAuthor = user.id
             where tickets.deleted= false and status = false`,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getTicketsAdmin() {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image,
             tickets.dateStart,tickets.dateEnd,tickets.time,user.avt,
             tickets.cost, tickets.number,tickets.place,user.fullName,tickets.idAuthor
             from tickets INNER JOIN user on tickets.idAuthor = user.id
             where tickets.deleted= false and status = true`,
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
                `select tickets.id,tickets.name,tickets.image,
             tickets.dateStart,tickets.dateEnd,tickets.time,user.avt,
             tickets.cost, tickets.number,tickets.place,user.fullName,tickets.idAuthor
             from tickets INNER JOIN user on tickets.idAuthor = user.id
             where tickets.deleted= true`,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    getCount(idAuthor) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT count(tickets.id) as count from tickets WHERE tickets.idAuthor = ? and tickets.deleted=false `,
                idAuthor, (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        });
    }
    getNumber() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT count(tickets.id) as sum from tickets WHERE 
            tickets.sold>0 and CURRENT_DATE <= tickets.dateEnd and tickets.deleted= false and status = 1 `,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        });
    }
    searches(q) {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image,
             tickets.dateStart, tickets.dateEnd,tickets.time,tickets.description,tickets.cost,
              tickets.number,tickets.place,user.fullName from tickets INNER JOIN user on tickets.idAuthor = user.id
               where tickets.sold < tickets.number and CURRENT_DATE <= tickets.dateEnd and tickets.deleted= false and
               status=true and CONCAT(tickets.name,description) LIKE ?`,
                `%${q}%`,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    searchesAuthor(idAuthor, q) {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image,status,
             tickets.dateStart, tickets.dateEnd,tickets.time,tickets.description,tickets.cost,
              tickets.number,tickets.place,user.fullName from tickets INNER JOIN user on tickets.idAuthor = user.id
               where tickets.idAuthor = ?and tickets.deleted= false and
                CONCAT(tickets.name,description) LIKE ?`,
                [`%${q}%`, idAuthor],
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    insert(ticket) {
        const array = [
            ticket.name,
            parseInt(ticket.idAuthor),
            ticket.image,
            ticket.dateStart,
            ticket.dateEnd,
            ticket.time,
            ticket.description,
            parseFloat(ticket.cost),
            parseInt(ticket.number),
            ticket.place,
            false,
            false,
        ];
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO tickets(name, idAuthor, image, dateStart, dateEnd, time,
                 description, cost, number, place, deleted,sold,status) VALUES
             (?,?,?,?,?,?,?,?,?,?,?,0,?)`,
                array,
                (err, res) => {
                    if (err) throw err;
                    return resolve({ id: res.insertId, ...ticket });
                },
            );
        });
    }
    update(id, ticket) {
        const array = [
            ticket.name,
            parseInt(ticket.idAuthor),
            ticket.image,
            ticket.dateStart,
            ticket.dateEnd,
            ticket.time,
            ticket.description,
            parseInt(ticket.cost),
            parseInt(ticket.number),
            ticket.place,
            id,
        ];
        return new Promise((resolve, reject) => {
            db.query(
                `update tickets set name=?, idAuthor = ?, image=?, dateStart=?,dateEnd=?,time=?, description=?,
            cost=?, number = ?,place=? where id = ?`,
                array,
                (err, res) => {
                    if (err) throw err;
                    return resolve({ id: parseInt(id), ...ticket });
                },
            );
        });
    }
    deleted(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `update tickets set deleted = true where id = ${parseInt(id, 10)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve(res);
            });
        });
    }
    accept(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `update tickets set status = true where id = ${parseInt(id, 10)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve(res);
            });
        });
    }
    deleteForever(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `
            DELETE FROM cardevent where idTicket = ${parseInt(id, 10)};
            DELETE FROM invitations WHERE idTicket =  ${parseInt(id)};
            DELETE FROM tickets WHERE id = ${parseInt(id)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve(res);
            });
        });
    }
    getDeleted(idAuthor) {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.image,
             tickets.dateStart,tickets.dateEnd,tickets.time,tickets.description,
             tickets.cost, tickets.number,tickets.place,user.fullName,tickets.idAuthor,
           sold as sum from tickets INNER JOIN user on tickets.idAuthor = user.id where
              tickets.idAuthor = ? and tickets.deleted= true`,
                idAuthor,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    restore(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `update tickets set deleted = false where id = ${parseInt(id, 10)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve(res);
            });
        });
    }
    getAllIds() {
        return new Promise((resolve, reject) => {
            db.query(
                `select tickets.id,tickets.name,tickets.sold,tickets.image,tickets.cost from tickets
                 where tickets.deleted = false and sold < tickets.number`,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
}
module.exports = new Ticket();
