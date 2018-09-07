var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    deleteDetailBuyProductAll: function(req,res,id) {
        
      console.log(id)
  //DELETE buy_product,detail_buy_product,accept_payment FROM buy_product  join detail_buy_product on(buy_product.id=detail_buy_product.id) join accept_payment on (buy_product.id=accept_payment.id_buy_product)
               
                connection.query("DELETE buy_product,detail_buy_product,accept_payment FROM buy_product  join detail_buy_product on(buy_product.id=detail_buy_product.id) join accept_payment on (buy_product.id=accept_payment.id_buy_product) where buy_product.id=?",[id] ,function (err, result, fields) {
                    console.log(result)
                    console.log(err)
                  
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.json(result);
                  
                    
                  
                    
                           
                          
                           });
                          


   
 
    }

}