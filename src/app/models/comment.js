const db = require('../../config/db');

class Commenting {
    getCommentByPost(idPost) {
        return new Promise((resolve, reject) => {
            db.query(`select idPost,idAuthor,idCM,body,dateTime,user.avt,user.fullName 
            from commentig INNER JOIN user on user.id = idAuthor where idPost = ?`, idPost,
                (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        })
    }
    create(comment) {
        const arrQuery = [comment.idPost, comment.idAuthor, comment.body, comment.date];
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO commentig(idPost, idAuthor, body, dateTime) VALUES (?,?,?,?)`,
                arrQuery, (err, res) => {
                    if (err) throw err;
                    return resolve({ id: res.insertId, ...comment });
                })
        })
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM commentig WHERE idCM = ?`, id, (err, res) => {
                if (err) throw err;
                return resolve({ id: id })
            })
        })
    }
}
module.exports = new Commenting();