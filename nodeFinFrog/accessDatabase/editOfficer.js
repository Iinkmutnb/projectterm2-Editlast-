var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    editOfficer: function(req,res,code,name,subname,file,address,user,pass) {
 
        connection.query("UPDATE customer set user=?,pass=?,name_person=?,subname=?,email=?,phone=?,address=?,type=?,image=?,code=?,status=? where code=?",[user,pass,name,subname,null,null,address,"officer",file,code,"ทำงาน",code] ,function (err, result, fields) {
            
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

  
     

   
 
    }

}