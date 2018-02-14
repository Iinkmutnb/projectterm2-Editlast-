var connection = require('../connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkUserCustomer: function(res,email,emailOld) {
  
      var checkEmail =null;
      
      var stopEmail=0;
    
        
        connection.query("SELECT * FROM customer where   email!=?",[emailOld], function (err, result, fields) {
            if (err) throw err;
                    if(result!=''){
                        result.map((result)=> {
                         
                            if(stopEmail==0){
                                if(result.email==email){
                                   
                                    checkEmail = false;
                                    stopEmail=1;
                                }else{
                                    checkEmail = true;
                                }
                            }
                        });
                    }else{ checkEmail = true;}
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'email':checkEmail});
        
        });

   
 
    }

}
