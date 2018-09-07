var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    inserBuyProduct: function(req,res,userBuy,userTypeBuy,count,price) {
  
        connection.query("INSERT INTO buy_product values(null,?,?,?,?)",[userBuy,userTypeBuy,count,price] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                 
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true,'idBuyProduct':result.insertId});
                   });


     

   
 
    }

}
