var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectOneReview: function(req,res,id) {
     
   
     

  
        connection.query("select * from review where id_review=?",[id] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
            
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}
