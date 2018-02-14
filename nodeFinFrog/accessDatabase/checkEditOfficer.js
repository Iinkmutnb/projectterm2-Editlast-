var connection = require('./connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkEditOfficer: function(req,res,userOld,srcOld,user,file) {
    
      var checkUser =null;
    var checkFile =null;
   
    var check2=1;
    var check3=1;
    console.log("userOld"+userOld,",srcOld"+srcOld,",user"+user,",file"+file)
   
        connection.query("SELECT * FROM customer where ( user=? or image=?)and (name!=? and image!=? )",[user,file,userOld,srcOld], function (err, result, fields) {
            if (err) throw err;
                    if(result!=''){
                        
                        result.map((result)=> {
                          
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
                      
                       
                    }else{ checkUser = true;checkFile = true;}
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'checkUser':checkUser,'checkFile':checkFile});
        
        });

   
 
    }

}
