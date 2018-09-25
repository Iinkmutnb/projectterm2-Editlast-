import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import {Link} from 'react-router-dom';

import queryString from 'query-string';
class insertReview extends Component {
    constructor(props) {
        super(props);
        this.state = {userType: '',topic:'',name_product:'',detail:'',file: '',imagePreviewUrl:'',link:'',
                        checkTopic:'',checkname_product:'',checkDetail:'',checkFile:'',checkSuccess:'',
                        isOpen:'',userName:'',
    
                        }
       
    }
    componentDidMount() {  this.props.setExact(false,true);
    }
    componentWillMount() {
        var userType= cookie.load('userType');
        var userName= cookie.load('userId');
        this.setState({userType:userType,userName:userName});
               
        this.props.setExact(false,true);
     

    }
    setCloserModal=()=>{
        
         window.location.reload();
     }


    insertData=(file,imagePreviewUrl)=> {
       
        
        
         if(this.state.topic==""){this.setState({checkTopic:1})}else{this.setState({checkTopic:0})}
         if(this.state.name_product==""){this.setState({checkname_product:1});}else{this.setState({checkname_product:0})}
   
         if(this.state.detail==""){this.setState({checkDetail:1});}else{this.setState({checkDetail:0})}
         if(this.state.file==""){this.setState({checkFile:1});}else{this.setState({checkFile:0})}
        
        if(this.state.topic!==""&&this.state.name_product!==""&&this.state.detail!==""&&this.state.file!==""){
         console.log("insertlink")
            
              fetch('http://localhost:9000/checkReview', {
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
                    //console.log("ss"+this.state.file.name)
                    
                   
                     if(this.state.type==""){this.setState({type:'อื่นๆ'})}
                     fetch('http://localhost:9000/insertReview', {
                         headers: {
                                   'Content-Type':'application/x-www-form-urlencoded'
                       
                                  },
                      
                      
                          method: "POST",                  
                          body:  queryString.stringify({'topic':this.state.topic,'name_product':this.state.name_product,'file':this.state.file.name,'userName':this.state.userName,'link':this.state.link})
                         
                        
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
                             
                             xhr.open('post','http://localhost:9000/uploadImageReview', true);
                             
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
               
                <table>
                    <tr>
                        <td> <Button color="isWarning" style={{padding:'0px'}}><Link to="/review" style={{padding:'7px',textDecoration:'none'}}>กลับไปหน้าก่อน</Link></Button></td>
                    </tr>
                </table>
                <table style={{marginTop:'10px'}}>
                        <tr>
                            <td><h3 style={{color:'grey',fontSize: '30px'}}>การสร้างรีวิว</h3></td>

                            </tr>
                         <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                        
                </table> 
                <table>
                    <tr>
                            <td>
                            <b style={{ color:'grey'}}> หัวข้อการรีวิว </b>
                            </td>
                        
                        
                    </tr>
                    <tr>
                    <td>
                            <input  onChange={(e)=>this.setState({topic:e.target.value})} color="isInfo" type="text" placeholder="กรุณาใส่หัวข้อ" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                            </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
                <table>
                    <tr>
                            <td>
                            <b style={{ color:'grey'}}>ชื่อสินค้า </b>
                            </td>
                        
                        
                    </tr>
                    <tr>
                    <td>
                            <input  onChange={(e)=>this.setState({name_product:e.target.value})} color="isInfo" type="text" placeholder="กรุณาใส่ขื่อสินค้า" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                            </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
                <table>
                    <tr>
                            <td>
                            <b style={{ color:'grey'}}>ข้อมูลรีวิว </b>
                            </td>
                        
                        
                    </tr>
                    <tr>
                    <td>
                    <Textarea  onChange={(e)=>this.setState({detail:e.target.value})} color="isInfo" style={{width:'300px'}}/>
                            
                            </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
           
                <table>
                    <tr>
                            <td>
                            <b style={{ color:'grey'}}>รูปภาพ </b>
                            </td>
                        
                        
                    </tr>
                    <tr>
                    <td>
                            
                    <input type="file" onChange={(e)=>{this.setImage(e)}}/>
                            </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
                <table>
                    <tr>
                            <td>
                            <b style={{ color:'grey'}}>]ลิ้งยูทูป </b>
                            </td>
                        
                        
                    </tr>
                    <tr>
                    <td>
                            <input  onChange={(e)=>this.setState({link:e.target.value})} color="isInfo" type="text" placeholder="กรุณาใส่ข้อมูลรีวิว" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                            </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
                <Button color="isSuccess"  onClick={()=>this.insertData('this.state.file',this.state.imagePreviewUrl)}><b style={{ color:'white'}}>สร้างการรีวิว</b></Button>
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
                        สร้างการรีวิวเรียบร้อย
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
                        เกิดข้อผิดพลาด กรุณาสร้างการรีวิวใหม่
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

export default insertReview;