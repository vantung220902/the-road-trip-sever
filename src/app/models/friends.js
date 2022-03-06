const db = require('../../config/db');

class Friends {
    check(friends) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT state FROM friends WHERE 
            (person1ID = ? and person2ID=? or person1ID=? and person2ID= ?)`,
                [friends.id1, friends.id2, friends.id2, friends.id1], (err, res) => {
                    if (err) throw err;
                    return resolve({ ...res });
                })
        })
    }
    create(friends) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO friends(person1ID, person2ID, state) 
            VALUES (?,?,0)`, [friends.id1, friends.id2, 0], (err, res) => {
                if (err) throw err;
                return resolve({ id: res.insertId, ...friends, state: 0 });
            })
        })
    }
    list(id) {
        return new Promise((resolve, reject) => {
            db.query(`select friends.id, person1ID,person2ID, user.fullName,user.avt 
            from friends inner join user on friends.person1ID =
             user.id where person2ID = ? and state =0`,
                id, (err, res) => {
                    if (err) throw err;
                    return resolve(res)
                })
        })
    }
    accept(id) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE friends SET state=1 WHERE id =?`, id, (err, res) => {
                if (err) throw err;
                return resolve([{ state: 1 }])
            }
            )
        })
    }
    decline(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM friends WHERE id = ?`, id, (err, res) => {
                if (err) throw err;
                return resolve([{ state: -1 }])
            }
            )
        })
    }
    remove(friend) {
        return new Promise((resolve, reject) => {
            db.query(`
            DELETE FROM friends WHERE
            ((person1ID = ? and person2ID=?) or
             (person1ID=? and person2ID= ?)) and state = 1
            `, [friend.id, friend.id2, friend.id2, friend.id], (err, res) => {
                if (err) throw err;
                return resolve([{ state: -1 }])
            }
            )
        })
    }
    getFriends(id) {
        return new Promise((resolve, reject) => {
            db.query(`
          SELECT friends.id,person2ID,person1ID,state,user.fullName,user.avt
          FROM friends inner join user on user.id = friends.person1ID WHERE  person2ID = ? and state = 1
           UNION SELECT friends.id,person2ID,person1ID,state,user.fullName,user.avt FROM
            friends inner join user on user.id = friends.person2ID WHERE  person1ID = ? and state =1
            `, [id, id], (err, res) => {
                if (err) throw err;
                return resolve(res)
            }
            )
        })
    }
}
module.exports = new Friends();