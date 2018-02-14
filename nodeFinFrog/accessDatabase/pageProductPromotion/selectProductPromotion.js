var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    selectProductPromotion: function(res,id) {
  
       
        connection.query("select * from product_promotion join product on product.code=product_promotion.code_product where id_product_promotion =?",[id],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}