var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectOneOfficer: function(req,res,code) {
     var user="";
     var name="";
     var subname="";
     var address="";
     var pass=""
     var src="";
     
  
        connection.query("select * from customer where code=?",[code] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            result.map((result)=>{
                user=result.user;
                name=result.name;
                subname=result.subname;
                address=result.address;
                src=result.image;
                pass=result.pass;
            })
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true,'user':user,'name':name,'subname':subname,'address':address,'src':src,'pass':pass});
                   });

  
     

   
 
    }

}
