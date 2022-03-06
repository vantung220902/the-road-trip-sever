const db = require('../../config/db');

class Post {

    getPost(start, limit) {
        return new Promise((resolve, reject) => {
            db.query(`select posting.id,user.fullName,idAuthor,user.avt,posting.tittle,datePost,
            posting.body,rating from posting inner join user on user.id = posting.idAuthor ORDER BY id DESC LIMIT ?,?`,
                [parseInt(start, 10), parseInt(limit, 10)], (err, res) => {
                    if (err) throw err;
                    return resolve(res);
                })
        })
    }
    createPost(post) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO posting( idAuthor, tittle, body, datePost, rating)
             VALUES (?,?,?,?,0)`, [post.idAuthor, post.tittle, post.body, post.datePost], (err, res) => {
                if (err) throw err;
                return resolve({ id: res.insertId, ...post });
            })
        })
    }
    like(post) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE posting SET rating = rating + ? WHERE id = ?`, [post.value, post.id]
                , (err, res) => {
                    if (err) throw err;
                    return resolve({ checked: true })
                })
        })
    }
    me(id) {
        return new Promise((resolve, reject) => {
            db.query(`select posting.id,user.fullName,idAuthor,user.avt,posting.tittle,datePost, 
            posting.body,rating from posting inner join user on user.id = posting.idAuthor
             where posting.idAuthor = ? `, id, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
    find(id) {
        return new Promise((resolve, reject) => {
            db.query(`select posting.id,user.fullName,idAuthor,user.avt,posting.tittle,datePost, 
            posting.body,rating from posting inner join user on user.id = posting.idAuthor
             where posting.id = ? `, id, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }

    delete(arrIds) {
        const arrQuery = arrIds.map((id) => {
            return `
           DELETE FROM commentig WHERE idPost =  ${parseInt(id)};
          DELETE FROM posting WHERE  id = ${parseInt(id)};\n`;
        });
        return new Promise((resolve, reject) => {
            db.query(arrQuery.join(''), (err, res) => {
                if (err) throw err;
                return resolve(res);
            });
        });
    }
    update(post, id,) {
        const array = [
            post.tittle,
            post.body,
            parseInt(id, 10),
        ];
        return new Promise((resolve, reject) => {
            db.query(
                `UPDATE posting SET tittle=?,body=? WHERE id=?`,
                array,
                (err, res) => {
                    if (err) throw err;
                    return resolve({ id: parseInt(id), ...post });
                },
            );
        });
    }
    number(month) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(posting.id) as now,(SELECT COUNT(posting.id) 
            from posting where month(datePost)= ?) as last
            from posting where month(posting.datePost)= ?`, [month - 1, month], (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
    count() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT count(posting.id) as count FROM posting WHERE 1`, (err, res) => {
                if (err) throw err;
                return resolve(res);
            })
        })
    }
}
module.exports = new Post();