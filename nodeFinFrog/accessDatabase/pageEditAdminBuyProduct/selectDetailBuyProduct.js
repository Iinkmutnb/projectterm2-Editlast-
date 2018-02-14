var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    selectDetailBuyProduct: function(res,id) {
  
      
        connection.query("select * from detail_buy_product  join product on  detail_buy_product.id_product=product.code join buy_product on detail_buy_product.id=buy_product.id join  customer on buy_product.user=customer.user where detail_buy_product.id=?",[id],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}