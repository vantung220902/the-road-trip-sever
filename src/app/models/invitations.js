const db = require('../../config/db');

class Invitation {
    getReceived(idReceived) {
        return new Promise(function (resolve, reject) {
            db.query(
                `SELECT invitations.id,user.avt, tickets.name,tickets.image,idTicket FROM
                invitations INNER JOIN user on user.id = invitations.idAuthor
                INNER JOIN tickets on tickets.id = idTicket WHERE
                invitations.idReceived = ? and state = false`,
                parseInt(idReceived, 10),
                function (err, res) {
                    if (err) throw err;
                    return resolve(res);
                },
            );
        });
    }
    update(id) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE invitations SET state=true WHERE id= ?`, id, (err, res) => {
                if (err) throw err;
                return resolve({ id: id });
            })
        })
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM invitations WHERE id= ?`, id, (err, res) => {
                if (err) throw err;
                return resolve({ id: id });
            })
        })
    }
    create(body,id) {
        const array = [];
        const tickets = body.tickets;
        const users= body.users;
        console.log(tickets,users);
        tickets.forEach(ticket => {
            users.forEach(user => {
                array.push(`INSERT INTO invitations(idAuthor, idReceived, state, idTicket)
                 VALUES (${id},${user},0,${ticket});`);
            })
        });
        return new Promise((resolve, reject) => {
            db.query(array.join(''), (err, res) => {
                if (err) throw err;
                return resolve({ checked: true })
            })
        })
    }
}
module.exports = new Invitation();
