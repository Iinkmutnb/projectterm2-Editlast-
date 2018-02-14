var connection = require('../connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkEmail: function(res,email) {
  
      var checkEmail =null;
      var pass='';
      var stopEmail=0;
    
        
        connection.query("SELECT * FROM customer where   email=?",[email], function (err, result, fields) {
            if (err) throw err;
                    if(result!=''){
                        checkEmail=true
                        result.map((result)=> {
                         
                          pass=result.pass;
                               
                            
                        });
                    }else{ checkEmail = false;}
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'checkEmail':checkEmail,'pass':pass});
        
        });

   
 
    }

}
