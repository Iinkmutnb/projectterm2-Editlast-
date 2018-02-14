var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    checkIdProduct: function(res,idProduct) {
  
       
        connection.query("select * from product where code=?",[idProduct],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}