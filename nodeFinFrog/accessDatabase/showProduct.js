var connection = require('./connectDatabase.js');
  
var connection =connection.connection();

module.exports={
    querys: function(name,res) {
        
        
        connection.query("SELECT "+name+" FROM product ", function (err, result, fields) {
            if (err) throw err;
           
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(result);
            
        });
    }

}