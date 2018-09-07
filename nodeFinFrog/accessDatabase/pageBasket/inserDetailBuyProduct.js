var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    inserDetailBuyProduct: function(req,res,id,code,count) {
     
      

    
      console.log(code);
      var text =''
      if(Array.isArray(code)){
          for(i=0;i<code.length;i++){
              if(i==0){
              
                  
                text +=  "(null,'"+code[i]+"','"+count+"','"+id+"')"}
              else { text +=  ",(null,'"+code[i]+"','"+count+"','"+id+"')";
             
            }

          }
        }
        else{
          
       text +=  "(null,'"+code+"','"+count+"','"+id+"')"
          
            
        }

 
       connection.query("INSERT INTO detail_buy_product VALUES "+text ,function (err, result, fields) {
      //  console.log(err)   
        if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            console.log(err)
            console.log(result.insertId)
                    //console.log(result);
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true,'idBuyProduct':result.insertId});
                   });



   
 
    }

}
