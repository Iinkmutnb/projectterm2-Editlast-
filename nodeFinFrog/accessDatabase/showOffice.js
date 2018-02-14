var connection = require('./connectDatabase.js');

var connection =connection.connection();

module.exports={
    showOffice: function(name,res) {
      
      
      connection.query("SELECT "+name+" FROM customer where type='officer'", function (err, result, fields) {
          if (err) throw err;
         
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.json(result);
          
      });
  }

}