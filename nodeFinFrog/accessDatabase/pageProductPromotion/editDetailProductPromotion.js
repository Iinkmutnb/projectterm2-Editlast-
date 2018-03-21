var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    editDetailProductPromotion: function(res,idPromotion,idProduct,discount,start,end) {

        
        connection.query("UPDATE product_promotion set  id_product_promotion=?,code_product=?,promotion_discount=?,start_promotioncol=?,end_promotioncol=? where id_product_promotion=?",[idPromotion,idProduct,discount,start,end,idPromotion],function (err, result, fields) {
            console.log(err)
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}