var connection = require('../connectDatabase.js');

var connection =connection.connection();

module.exports={
    selectOneProdcutPromotionPageProductPro: function(res,code) {
       
      
      connection.query("SELECT * FROM product_promotion  join product on product_promotion.code_product=product.code where product_promotion.code_product=?",[code], function (err, result, fields) {
          if (err) throw err;
         
          res.setHeader('Access-Control-Allow-Origin', '*');
          
          res.json(result);
          
      });
  }

}