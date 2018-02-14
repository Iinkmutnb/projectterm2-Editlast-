var connection = require('./connectDatabase.js');

var connection =connection.connection();
var multiparty = require('multiparty');
var fs = require('fs');


module.exports={
    insertImageProduct: function(req,res) {

    let form = new multiparty.Form();
    
    form.parse(req, (err, fields, files) => {
        
  
      let {path: tempPath, originalFilename} = files.file[0];
     


      
      try{
          var image = fields.imagePreviewUrl[0].replace(/^data:image\/\w+;base64,/, '');
          fs.writeFile('../thesis_pro_1/src/home/picture/product/'+originalFilename, image, {encoding: 'base64'}, function(err){
              if (err) throw err;
              console.log('It\'s saved!');
          });
      
      }
      catch (error) {
              
              console.log(error); 
      }
          
          

     
    })

    
     

   
 
    }

}
