var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectConnect: function(req,res,id) {
     
     var name="";
     var subname="";
     var topic="";
     
    if(id==1) topic="สินค้าไม่ครบ";
    if(id==2) topic="สินค้าเสียหาย";
    if(id==3) topic="ยังไม่ได้รับสินค้า";
  
        connection.query("select * from connect where topic=?",[topic] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
            
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}
