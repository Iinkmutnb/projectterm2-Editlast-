var connection = require('./connectDatabase.js');

var connection =connection.connection();

module.exports={
  login: function(user,pass,res) {
      
    connection.query("SELECT * FROM customer where user ='"+user+"'", function (err, result, fields) {
        if (err) throw err;
        var checkPass = 0;
        var type='';
        if (result!='') {
            
                       result.map((result)=> {if(result.pass==pass) checkPass=1;type=result.type}
                        
                                       );
                                       if(checkPass==1){
                                        res.setHeader('Access-Control-Allow-Origin', '*');
                                      
                                        res.json({'user':user,'type':type});

                                                       }
                                        else {
                                             res.setHeader('Access-Control-Allow-Origin', '*');
                                             res.json({'user':true});
                                             }
                                                }
        else {
             res.setHeader('Access-Control-Allow-Origin', '*');
             res.json({'user':false});
             }
        
    });

  }

}