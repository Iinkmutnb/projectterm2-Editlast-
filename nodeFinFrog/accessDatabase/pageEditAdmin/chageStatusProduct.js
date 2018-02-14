var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    chageStatusProduct: function(req,res,code,status) {
  
        connection.query("UPDATE product set status=? where code=?",[status,code] ,function (err, result, fields) {
            
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

  
     

   
 
    }

}