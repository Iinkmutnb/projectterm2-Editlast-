var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    setAcceptPayment: function(req,res,id) {
        
      
  
            //console.log(id)
                connection.query("UPDATE accept_payment SET checkAccept=1 where id_accept_payment=?",[id] ,function (err, result, fields) {
                  
                  //console.log(result)
                  
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.json(result);
                  
                    
                  
                    
                           
                          
                           });
                          


   
 
    }

}