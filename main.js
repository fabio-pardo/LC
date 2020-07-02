var local = require('./config/local');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: local.mysql.connection.host,
    user: local.mysql.connection.user,
    password: local.mysql.connection.password,
    insecureAuth: true,
    database: "test"
});

var sql = "INSERT INTO questions (number, difficulty, completed) VALUES ('2', 'MEDIUM', '0')"
con.query(sql, function(err, result) {
    if(err) throw err;
    console.log("Inserted question!");
})
con.end()
