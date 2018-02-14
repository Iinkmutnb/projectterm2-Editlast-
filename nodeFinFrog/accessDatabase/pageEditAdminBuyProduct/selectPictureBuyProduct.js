/*var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    selectPictureBuyProduct: function(res,id) {
  
       
        connection.query("select * from detail_buy_product where id=? ",[id],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}*/