var connection = require('../connectDatabase.js');

var connection =connection.connection();


module.exports={
    checkReview: function(req,res,file) {
     
    var checkFile =null;
   
    var check3=1;
    
   
        connection.query("SELECT * FROM review where  src=?",[file], function (err, result, fields) {
            if (err) throw err;
                    if(result!=''){
                        
                        result.map((result)=> {
                       
                           
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
                      
                       
                    }else{checkFile = true;}
        
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({'checkFile':checkFile});
        
        });

   
 
    }

}
