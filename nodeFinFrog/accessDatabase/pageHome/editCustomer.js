var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    editCustomer: function(res,user,pass,name,subName,email,phone,address) {
 
        connection.query("UPDATE customer set pass=?,name=?,subname=?,email=?,phone=?,address=?,type=?,image=?,code=?,status=? where  user=?",[pass,name,subName,email,phone,address,"customer",null,null,null,user] ,function (err, result, fields) {
            
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

  
     

   
 
    }

}