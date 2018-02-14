var connection = require('./connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkOfficer: function(req,res,code,user,file) {
      var checkCode =null;
      var checkUser =null;
    var checkFile =null;
    var check=1;
    var check2=1;
    var check3=1;
    
   
        connection.query("SELECT * FROM customer where code=? or user=? or image=?",[code,user,file], function (err, result, fields) {
            if (err) throw err;
                    if(result!=''){
                        
                        result.map((result)=> {
                            if(check==1){
                                if(result.code!=code){
                                    checkCode = true;
                                }else{
                                    checkCode = false;
                                    check=0
                                }
                            }
                            if(check2==1){
                                if(result.user!=user){
                                    checkUser = true;
                                }else{
                                    checkUser = false;
                                    check2=0
                                }
                            }
                            if(check3==1){
                                if(result.image!=file){
                                    checkFile = true;
                                }else{
                                    checkFile = false;
                                    check3=0
                                }
                            }
                        });
                        check=1;
                      
                       
                    }else{checkCode = true; checkUser = true;checkFile = true;}
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'checkCode':checkCode,'checkUser':checkUser,'checkFile':checkFile});
        
        });

   
 
    }

}
