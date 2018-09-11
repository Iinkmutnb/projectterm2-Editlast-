var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertConnectBack: function(req,res,detail_con_back,idconnect) {
// console.log(typeof topic)
        connection.query("INSERT INTO connect_back values(?,?,?)",[null,detail_con_back,idconnect] ,function (err, result, fields) {
           
          // console.log(err);
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                   
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

     

   
 
    }

}
