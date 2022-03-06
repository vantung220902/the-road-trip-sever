const db = require('../../config/db');

class Stories {

    getAll() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT stories.id ,user.fullName,idAccount,image,datePost,user.avt,tittle 
            FROM stories INNER JOIN user on user.id = idAccount order by idAccount`, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
    getMyStory(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT stories.id ,user.fullName,idAccount,image,datePost,user.avt
            FROM stories INNER JOIN user on user.id = idAccount WHERE idAccount =?`, id, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
    insert(story) {
        const arr = [story.idAccount, story.image, story.datePost, story.tittle];
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO stories(idAccount,image, datePost,tittle) VALUES (?,?,?,?)`,
                arr, (err, res) => {
                    if (err) throw err;
                    return resolve({ id: res.insertId, ...story });
                }
            )
        })
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM stories WHERE stories.id = ?`, id, (err, res) => {
                if (err) throw err;
                return resolve({ id: id });
            })
        })
    }
}
module.exports = new Stories();