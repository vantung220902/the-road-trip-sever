const db = require('../../config/db');

class Message {
    list(id, id2) {
        return new Promise((resolve, reject) => {
            db.query(`(SELECT message.id,idUSend,idUReceive,dateSend,body,user.fullName,user.avt 
            FROM message inner join user on user.id = message.idUSend WHERE
            idUSend = ? and idUReceive= ? order by id desc limit 0,3) UNION (SELECT message.id,idUSend,idUReceive,
            dateSend,body,user.fullName,user.avt FROM message inner join user on user.id = message.idUReceive
             WHERE idUReceive = ? and idUSend = ? order by id desc limit 0,3)`,
                [id, id2, id, id2],
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        })
    }
    create(message) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO message(idUSend, idUReceive, dateSend, body)
             VALUES (?,?,?,?)`, [message.idUSend, message.idUReceive, message.dateSend, message.body]
                , (err, res) => {
                    if (err) throw err;
                    return resolve({ id: res.insertId, ...message });
                })
        })
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM message WHERE id =? `, id, (err, res) => {
                if (err) throw err;
                return resolve({ id: id });
            })
        })
    }
}
module.exports = new Message();