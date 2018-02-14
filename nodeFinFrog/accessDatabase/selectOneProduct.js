var connection = require('./connectDatabase.js');

var connection =connection.connection();




module.exports={
    selectOneProduct: function(req,res,code) {
     var codes="";
     var name="";
     var price="";
     var src="";
     var des="";
     var type="";
  
        connection.query("select * from product where code=?",[code] ,function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            result.map((result)=>{
                codes=result.code;
                name=result.name;
                price=result.Price;
                src=result.Src;
                des=result.Des;
                type=result.type;
            })
                    
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true,'code':codes,'name':name,'price':price,'src':src,'des':des,'type':type});
                   });

  
     

   
 
    }

}
