var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    detailPayment: function(req,res,user) {
        
      
  
               
                connection.query("select * from buy_product left join  accept_payment on(buy_product.id=accept_payment.id_buy_product) where  user=?",[user] ,function (err, result, fields) {
                  
                 //   console.log(result)
                  
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.json(result);
                  
                    
                  
                    
                           
                          
                           });
                          


   
 
    }

}