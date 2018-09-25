var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectReview: function(req,res,id) {
     
    
  
  
        connection.query("select * from review ",function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
            
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}
