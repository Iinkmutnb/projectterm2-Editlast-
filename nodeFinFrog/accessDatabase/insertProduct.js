var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertProduct: function(req,res,code,name,price,file,definition,type) {
  
        connection.query("INSERT INTO product values(?,?,?,?,?,?,?,?)",[code,name,price,file,definition,"ขาย","0",type] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

    /* connection.query("INSERT INTO customer values(?,?,?,?,?,?,?)",[user,pass,name,subName,email,phone,address] ,function (err, result, fields) {
        if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
        
                //console.log(result);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json({'qreury':true});
               });

    */
     

   
 
    }

}
