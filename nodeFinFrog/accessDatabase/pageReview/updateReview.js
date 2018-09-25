var connection = require('../connectDatabase.js');



var connection =connection.connection();




module.exports={
    updateReview: function(res,id_review) {

        
        connection.query("UPDATE review set save_puk_mud=?  where id_review=?",['pukmud',id_review],function (err, result, fields) {
            console.log(err)
            if (err) { res.setHeader('Access-Control-Allow-Origin', '*'); return (res.json({'qreury':false}))}
          
                    //console.log(result);
                    
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.json(result);
                   });

  
     

   
 
    }

}