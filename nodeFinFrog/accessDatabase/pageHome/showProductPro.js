var connection = require('../connectDatabase.js');

var connection =connection.connection();

module.exports={
    showProductPro: function(req,res) {
      
      
      connection.query("SELECT * FROM product where promotion = 1", function (err, result, fields) {
          if (err) throw err;
         
          res.setHeader('Access-Control-Allow-Origin', '*');
          
          res.json(result);
          
      });
  }

}