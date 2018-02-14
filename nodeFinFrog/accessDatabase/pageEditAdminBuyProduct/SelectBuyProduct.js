var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    SelectBuyProduct: function(res) {
  
       
        connection.query("select * from buy_product ",function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}