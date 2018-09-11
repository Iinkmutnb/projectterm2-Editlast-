import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import {Link} from 'react-router-dom';

import queryString from 'query-string';
class connect extends Component {
    constructor(props) {
        super(props);
        this.state = {userType: '',topic:'สินค้าไม่ครบ',id_buy_product:'',detail:'',file: '',imagePreviewUrl:'',
                        checkTopic:'',checkId_buy_product:'',checkDetail:'',checkFile:'',checkSuccess:'',
                        isOpen:''
    
                        }
       
    }
    componentDidMount() {  this.props.setExact(false,true);
    }
    componentWillMount() {
        var userType= cookie.load('userType');
        this.setState({userType:userType});
               
        this.props.setExact(false,true);
     

    }
    setCloserModal=()=>{
        
         window.location.reload();
     }


    insertData=(file,imagePreviewUrl)=> {
       
        
        
         if(this.state.topic==""){this.setState({checkTopic:1})}else{this.setState({checkTopic:0})}
         if(this.state.id_buy_product==""){this.setState({checkId_buy_product:1});}else{this.setState({checkId_buy_product:0})}
   
         if(this.state.detail==""){this.setState({checkDetail:1});}else{this.setState({checkDetail:0})}
         if(this.state.file==""){this.setState({checkFile:1});}else{this.setState({checkFile:0})}
        
        if(this.state.topic!==""&&this.state.id_buy_product!==""&&this.state.detail!==""&&this.state.file!==""){
          
              fetch('http://localhost:9000/checkConnect', {
                 headers: {
                           'Content-Type':'application/x-www-form-urlencoded'
               
                          },
              
              
                  method: "POST",
                  body:  queryString.stringify({'file':file.name})
                 
                
              })
              .then((response) => response.json())
              .then((data) => {
               
               //console.log(JSON.stringify(data));
               //{"checkCode":true,"checkName":true,"checkFile":true}
            var checkFile=false;
                checkFile=data.checkFile;
            
           
                if(checkFile){this.setState({checkFile:0})}else{this.setState({checkFile:2})}
 
                 if(checkFile){
                    console.log(this.state.file.name)
                   
                     if(this.state.type==""){this.setState({type:'อื่นๆ'})}
                     fetch('http://localhost:9000/insertConnect', {
                         headers: {
                                   'Content-Type':'application/x-www-form-urlencoded'
                       
                                  },
                      
                      
                          method: "POST",                  
                          body:  queryString.stringify({'topic':this.state.topic,'id_buy_product':this.state.id_buy_product,'file':this.state.file.name,'detail':this.state.detail})
                         
                        
                      })
                      .then((response) => response.json())
                      .then((data) => { console.log(JSON.stringify(data));
                       if( data.qreury){this.setState({checkSuccess:1,isOpen:true})}
                       else {this.setState({checkSuccess:2,isOpen:true})}
                       console.log(this.state.checkSuccess)
                       if(data.qreury){
                           console.log("image")
                         return new Promise((resolve, reject) => {
                             let imageFormData = new FormData();
                         
                             imageFormData.append('file', this.state.file);
                             imageFormData.append('imagePreviewUrl',this.state.imagePreviewUrl);
                             
                             var xhr = new XMLHttpRequest();
                             
                             xhr.open('post','http://localhost:9000/uploadImageConnect', true);
                             
                             xhr.onload = function () {
                                 if (this.status == 200) {
                                 resolve(this.response);
                                 } else {
                                 reject(this.statusText);
                                 }
                             };
                             
                             xhr.send(imageFormData);
               
                         });
                       }
 
                      })
                      .catch(function(error) {console.log( error.message);});
                     
                 }
                 
                
               
               })
              .catch(function(error) 
               {
                 console.log( error.message);
               });
          
         }
     
       }
       setImage=(e)=>{
        var reader = new FileReader();
        var file = e.target.files[0];
   
        reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          }
      
          reader.readAsDataURL(file)
        
        
    }
    
   
 


    render() {
        if(this.state.userType=="customer"){
        return (
            <div>
             <table style={{marginTop:'10px'}}>
                 <tr>
                    <td><h3 style={{color:'grey',fontSize: '30px'}}>ติดต่อสอบถาม</h3></td>

                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                  
                  </table>  
                  <table>
                 
                    <tr>    
                        <td>
                        <b style={{ color:'grey'}}>  หัวข้อ</b>
                        </td>
                        <td>
                            <select value={this.state.topic}  onChange={(e)=>this.setState({topic:e.target.value})}>
                                <option value="สินค้าไม่ครบ" >สินค้าไม่ครบ</option>
                                <option value="สินค้าเสียหาย" >สินค้าเสียหาย</option>
                                <option value="ยังไม่ได้รับสินค้า" >ยังไม่ได้รับสินค้า</option>
                          
                            </select>
                        </td>
                    </tr>
                   <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                   <tr>
                        <td>
                           <b style={{ color:'grey'}}> รหัสสั่งซื้อ </b>
                        </td>
                        <td>
                        <input  onChange={(e)=>this.setState({id_buy_product:e.target.value})} color="isInfo" type="text" placeholder="" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                        </td>
                       
                    </tr>
                    
                 
              
                    

             
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                 

                    
               
                    </table>
                    <table>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> รายละเอียดเนื้อหา: </b>
                        
                            
                        <Textarea  onChange={(e)=>this.setState({detail:e.target.value})} color="isInfo" style={{width:'300px'}}/>
                        </td>

                        
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                    </table>
                    <table>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> รูป: </b>
                        
                        </td>
                        <td>

                            <input type="file" onChange={(e)=>{this.setImage(e)}}/>
                            
                        </td>
                        
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
                <Button color="isSuccess"  onClick={()=>this.insertData('this.state.file',this.state.imagePreviewUrl)}><b style={{ color:'white'}}>ส่ง</b></Button>
                <table>
                <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                    </table>
                <Button color="isInfo" ><Link to="/selectConnect" style={{padding:'7px',textDecoration:'none'}}>ดูการตอบกลับ</Link></Button>
                
                {this.state.checkSuccess==0?(<div></div>)
                :(<div>
                    {this.state.checkSuccess==1?
                    (<div>
                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setCloserModal()}
                        >
                        <Content>
                        ส่งข้อมูลเรียบร้อย
                        </Content>
                        </Modal>

                    </div>):
                    (<div>
                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        >
                        <Content>
                        เกิดข้อผิดพลาด กรุณาส่งข้อมูลใหม่
                        </Content>
                        </Modal>
                    </div>)
                    }
                 </div>)
                }
             
            </div>
        );}
        else {
            return (
                <div>
                 หน้าสำหรับ user
                 
                </div>
            );

        }
    }
}

export default connect;