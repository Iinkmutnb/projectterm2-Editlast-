var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    editProduct: function(req,res,codeOld,code,name,price,file,definition,type) {
  
        connection.query("UPDATE product set code=?,name=?,Price=?,Src=?,Des=?,type=? where code=?",[code,name,price,file,definition,type,codeOld] ,function (err, result, fields) {
            
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

  
     

   
 
    }

}