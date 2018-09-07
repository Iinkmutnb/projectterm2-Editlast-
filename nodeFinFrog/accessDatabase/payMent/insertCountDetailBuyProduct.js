var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertCountDetailBuyProduct: function(req,res,count_product,id_detail_buy_product) {
        
      
  
               
                connection.query("UPDATE detail_buy_product SET count_product=? where id_detail_buy_product=?",[count_product,id_detail_buy_product] ,function (err, result, fields) {
                  
                
                  
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.json(result);
                  
                    
                  
                    
                           
                          
                           });
                          


   
 
    }

}