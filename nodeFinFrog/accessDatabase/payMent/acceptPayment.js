var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    acceptPayment: function(req,res,id) {
        
      console.log(id)
  //select * from    detail_buy_product join  buy_product on(detail_buy_product.id=buy_product.id) join product on (detail_buy_product.id_product=product.code) where  detail_buy_product.id_detail_buy_product=?
            console.log()
                connection.query("select * from    detail_buy_product join  buy_product on(detail_buy_product.id=buy_product.id) join product on (detail_buy_product.id_product=product.code) join accept_payment on (buy_product.id=accept_payment.id_buy_product) join customer on (buy_product.user=customer.user) where  detail_buy_product.id=?",[id] ,function (err, result, fields) {
                  
                   console.log(result)
                  
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.json(result);
                  
                    
                  
                    
                           
                          
                           });
                          


   
 
    }

}