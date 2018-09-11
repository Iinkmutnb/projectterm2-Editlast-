var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertConnect: function(req,res,topic,id_buy_product,file,detail) {
// console.log(typeof topic)
        connection.query("INSERT INTO connect values(?,?,?,?,?)",[null,topic,id_buy_product,detail,file] ,function (err, result, fields) {
           
          // console.log(err);
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                   
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

     

   
 
    }

}
