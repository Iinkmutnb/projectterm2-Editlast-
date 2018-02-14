var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectOneOfiicerFromUser: function(req,res,user) {
     
     var name="";
     var subname="";
    
  
        connection.query("select * from customer where user=?",[user] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
            result.map((result)=>{
                name=result.name;
                subname=result.subname;
               
            })
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'name':name,'subname':subname,});
                   });

  
     

   
 
    }

}
