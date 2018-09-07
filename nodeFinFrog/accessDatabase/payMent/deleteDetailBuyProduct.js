var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    deleteDetailBuyProduct: function(req,res,id_detail_buy_product) {
        
      
  
               
                connection.query("DELETE FROM detail_buy_product  where id_detail_buy_product=?",[id_detail_buy_product] ,function (err, result, fields) {
                  
                
                  
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.json(result);
                  
                    
                  
                    
                           
                          
                           });
                          


   
 
    }

}