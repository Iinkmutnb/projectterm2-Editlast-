var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    detailProductPromotion: function(res) {

       
        connection.query("select * from  product left join product_promotion    on product_promotion.code_product=product.code",function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}