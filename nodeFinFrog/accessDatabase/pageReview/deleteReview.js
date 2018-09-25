var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    deleteReview: function(res,id_review) {
  console.log(id_review)
       
        connection.query(" DELETE FROM  review WHERE id_review=?",[id_review],function (err, result, fields) {
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                   // console.log(err);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
                  

   
 
    }

}