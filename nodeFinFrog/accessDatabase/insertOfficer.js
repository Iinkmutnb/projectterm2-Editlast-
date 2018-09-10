var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertOfficer: function(req,res,code,name,subname,file,address,user,pass) {
 
        connection.query("INSERT INTO customer values(?,?,?,?,?,?,?,?,?,?,?,?)",[user,pass,name,subname,null,null,address,'officer',file,code,"ทำงาน",null] ,function (err, result, fields) {
            console.log(code+' '+name+' '+subname+' '+file+' '+address+' '+user+' '+pass);
            //console.log(err);
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                   
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

     

   
 
    }

}
