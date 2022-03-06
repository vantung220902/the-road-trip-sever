var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'bjxlfkfuldyxmdghgnmi-mysql.services.clever-cloud.com',
    user: 'uc2rlqujsri4qvpl',
    password: 'DKanL0HpxHTJ8s6k3Sdi',
    database: 'bjxlfkfuldyxmdghgnmi',
    port:3306,
    multipleStatements: true,
});

connection.connect((err) => {
    if (err) console.log(err);
});

module.exports = connection;
