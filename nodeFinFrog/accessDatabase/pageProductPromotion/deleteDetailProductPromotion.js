var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    deleteDetailProductPromotion: function(res,idPromotion) {
  
       
        connection.query(" DELETE FROM  product_promotion WHERE id_product_promotion=?",[idPromotion],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
                  

   
 
    }

}