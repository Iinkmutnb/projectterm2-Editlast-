var connection = require('./connectDatabase.js');

var connection =connection.connection();

module.exports={
  showModal: function(code,res) {
      
    connection.query("SELECT * FROM product where code ='"+code+"'", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(result);
       });

  }

}