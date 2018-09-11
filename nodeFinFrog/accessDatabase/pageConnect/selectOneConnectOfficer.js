var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectOneConnectOfficer: function(req,res,id) {
     
   
     

  
        connection.query("select * from connect_back where id_connect=?",[id] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
            
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}
