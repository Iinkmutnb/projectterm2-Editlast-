var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'product',
  });
  module.exports={
    connection: function() {
    return  connection;
    }

}