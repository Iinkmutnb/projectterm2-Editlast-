var connection = require('./connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkEditProduct: function(req,res,codeOld,nameOld,srcOld,code,name,file) {
      var checkCode =null;
      var checkName =null;
    var checkFile =null;
    var check=1;
    var check2=1;
    var check3=1;
    console.log(srcOld+":"+file);
   
        connection.query("SELECT * FROM product where (code=? or name=? or Src=?)and (code!=? and name!=? and Src!=? )",[code,name,file,codeOld,nameOld,srcOld], function (err, result, fields) {
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
                                if(result.name!=name){
                                    checkName = true;
                                }else{
                                    checkName = false;
                                    check2=0
                                }
                            }
                            if(check3==1){
                                if(result.Src!=file){
                                    checkFile = true;
                                }else{
                                    checkFile = false;
                                    check3=0
                                }
                            }
                        });
                        check=1;
                      
                       
                    }else{checkCode = true; checkName = true;checkFile = true;}
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'checkCode':checkCode,'checkName':checkName,'checkFile':checkFile});
        
        });

   
 
    }

}
