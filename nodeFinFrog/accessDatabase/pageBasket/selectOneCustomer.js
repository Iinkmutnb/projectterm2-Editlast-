var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectOneCustomer: function(req,res,user) {
     

    
  
        connection.query("select * from customer where user=?",[user] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
           
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}
