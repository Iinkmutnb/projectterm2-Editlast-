var connection = require('./connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkUserPass: function(user,email,res) {
      var checkUser =null;
      var checkEmail =null;
     
    
        
        connection.query("SELECT * FROM customer where user =? or email=?",[user,email], function (err, result, fields) {
            if (err) throw err;
                    if(result!=''){
                        result.map((result)=> {
                            if(result.user!=user){
                                checkUser = true;
                            }else{
                                checkUser = false;
                            }
                            if(result.email!=email){
                                checkEmail = true;
                            }else{
                                checkEmail = false;
                            }

                        });
                    }else{checkUser = true; checkEmail = true;}
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'user':checkUser,'email':checkEmail});
        
        });

   
 
    }

}
