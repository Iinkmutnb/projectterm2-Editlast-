var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    detailPaymentOfOfficer: function(req,res) {
        
      
  
               
                connection.query("select * from buy_product left join  accept_payment on(buy_product.id=accept_payment.id_buy_product) join customer on(buy_product.user=customer.user)",function (err, result, fields) {
                  
                 //   console.log(result)
                  
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.json(result);
                  
                    
                  
                    
                           
                          
                           });
                          


   
 
    }

}