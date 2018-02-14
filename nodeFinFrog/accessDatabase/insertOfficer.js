var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertOfficer: function(req,res,code,name,subname,file,address,user,pass) {
 
        connection.query("INSERT INTO customer values(?,?,?,?,?,?,?,?,?,?,?)",[user,pass,name,subname,null,null,address,'officer',file,code,"ทำงาน"] ,function (err, result, fields) {
            console.log(result);
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

     

   
 
    }

}
