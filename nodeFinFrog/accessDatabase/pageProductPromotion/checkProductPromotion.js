var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    checkProductPromotion: function(res,idProduct) {
  
       
        connection.query("select * from product_promotion where code_product=?",[idProduct],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}