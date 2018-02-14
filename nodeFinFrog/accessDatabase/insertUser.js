var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertUser: function(user,pass,name,subName,email,phone,address,res) {
        
     connection.query("INSERT INTO customer values(?,?,?,?,?,?,?,?,?,?,?)",[user,pass,name,subName,email,phone,address,"customer",null,null,null] ,function (err, result, fields) {
        console.log()
        if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
        
                //console.log(result);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json({'qreury':true});
               });

    
     

   
 
    }

}
