var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    insertProductPromotion: function(res,idProduct,discount,start,end) {

       
        connection.query("insert into  product_promotion VALUES(null,?,?,?,?)",[idProduct,discount,start,end],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}