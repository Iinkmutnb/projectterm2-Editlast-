var connection = require('../connectDatabase.js');

var connection =connection.connection();

module.exports={
    insertAceptpayment: function(req,res,id,price,time,phone,file) {
  
        connection.query("INSERT INTO accept_payment values(?,?,?,?,?,?)",[null,id,price,time,phone,file] ,function (err, result, fields) {
            console.log(err)
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

  
     

   
 
    }

}