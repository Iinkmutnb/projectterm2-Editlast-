var connection = require('../connectDatabase.js');

var connection =connection.connection();




module.exports={
    insertReview: function(req,res,topic,name_product,file,detail,userName,link) {
// console.log(typeof topic)
        connection.query("INSERT INTO review values(?,?,?,?,?,?,?,?)",[null,topic,name_product,detail,file,link,userName,null] ,function (err, result, fields) {
           
          // console.log(err);
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
            
                   
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json({'qreury':true});
                   });

     

   
 
    }

}
