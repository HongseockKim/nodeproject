var mysql = require('mysql');
var db_info = {
    host: 'localhost',
    port: '3306',
    user: 'gusduswk11',
    password: 'akgusFL8-892',
    database: 'mydata'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
