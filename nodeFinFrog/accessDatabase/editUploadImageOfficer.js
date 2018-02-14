var connection = require('./connectDatabase.js');

var connection =connection.connection();
var multiparty = require('multiparty');
var fs = require('fs');


module.exports={
    editUploadImageOfficer: function(req,res) {
console.log("sds")
    let form = new multiparty.Form();
    
    
    form.parse(req, (err, fields,files) => {
        
  
      let {path: tempPath, originalFilename} = files.file[0];
     
    
    try{
          var image = fields.imagePreviewUrl[0].replace(/^data:image\/\w+;base64,/, '');
         
          fs.unlink('../thesis_pro_1/src/home/picture/officer/'+fields.imageOld[0],function(err){
            
            fs.writeFile('../thesis_pro_1/src/home/picture/officer/'+originalFilename, image, {encoding: 'base64'}, function(err){
                if (err) return console.log(err);
                console.log('It\'s saved!');
            });
           
          })
      
      }
      catch (error) {
              
              console.log(error); 
      }
          
          

     
    })

    
     

   
 
    }

}
