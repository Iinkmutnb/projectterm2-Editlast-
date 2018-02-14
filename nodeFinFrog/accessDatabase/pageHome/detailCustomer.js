var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    detailCustomer: function(req,res,userId) {
     var user="";
     var name="";
     var subname="";
     var address="";
     var pass="";
     var email="";
     var phone="";
     
  
        connection.query("select * from customer where user=?",[userId] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            result.map((result)=>{
                user=result.user;
                name=result.name;
                subname=result.subname;
                address=result.address;
                email=result.email;
                pass=result.pass;
                phone=result.phone;
            })
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true,'user':user,'name':name,'subname':subname,'address':address,'pass':pass,'email':email,'phone':phone});
                   });

  
     

   
 
    }

}