var connection = require('../connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkUserFace: function(res,email) {
        
      var checkEmail =null;
      
      var stopEmail=0;
    
        
        connection.query("SELECT * FROM user_facebook where   email==?",[email], function (err, result, fields) {
         
            //if (err) throw err;
            console.log(result)
                    if(result!=null){
                        result.map((result)=> {
                         
                            if(stopEmail==0){
                                if(result.email==email){
                                   
                                    checkEmail = false;//มีอีเมลซ้ำ
                                    stopEmail=1;
                                }else{
                                    checkEmail = true;//ไม่มีอีเมลซ้ำ
                                }
                            }
                        });
                    }else{ checkEmail = true;}
                    console.log("eiei")
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'email':checkEmail});
        
        });

   
 
    }

}
