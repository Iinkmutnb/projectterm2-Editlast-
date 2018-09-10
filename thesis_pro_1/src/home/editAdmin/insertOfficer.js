import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
class insertOfficer extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '',imagePreviewUrl:'',code:'',subname:'',name:'',user:'',address :'',pass:'',passAgain:'',checkSuccess:0,isOpen:true,
                     checkCode:0,checkName:0,checkSubname:0,checkUser:0,checkAddress:0,checkPass:0,checkFile:0,checkPassAgain:0,userType:''
    
                        }
       
    }
    componentDidMount() { this.props.setExact(true,true,2);}
    componentWillMount() {
        var userType= cookie.load('userType');
        this.setState({userType:userType});
               
        this.props.setExact(true,true,2);
     

    }
    setCloserModal=()=>{
       
        window.location.reload();
    }
    setDataInsert=(name,value)=>{
        
        if(name==="code"){
            this.setState({code:value})

        }else if(name==="name"){
            this.setState({name:value})

        }else if(name==="subname"){
            this.setState({subname:value})
            
        }else if(name==="address"){
            this.setState({address:value})
        }
        else if(name==="user"){
        this.setState({user:value})
       }
       else if(name==="pass"){
        this.setState({pass:value})
       }
       else if(name==="passAgain"){
        this.setState({passAgain:value})
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

    insertData=(file,imagePreviewUrl)=> {
        if(this.state.code==""){this.setState({checkCode:1})}else{this.setState({checkCode:0})}
        if(this.state.name==""){this.setState({checkName:1});}else{this.setState({checkName:0})}
        if(this.state.subname==""){this.setState({checkSubname:1});}else{this.setState({checkSubname:0})}
        if(this.state.address==""){this.setState({checkAddress:1});}else{this.setState({checkAddress:0})}
        if(this.state.user==""){this.setState({checkUser:1});}else if(this.state.user.length<6){this.setState({checkUser:2})} else{this.setState({checkUser:0})}
        if(this.state.file==""){this.setState({checkFile:1});}else{this.setState({checkFile:0})}
        if(this.state.pass==""){this.setState({checkPass:1});}else{this.setState({checkPass:0})}
            if(this.state.passAgain==""){this.setState({checkPassAgain:1});}else{this.setState({checkPassAgain:0})}
       if(this.state.code!==""&&this.state.name!==""&&this.state.subname!==""&&this.state.Address!==""&&this.state.user!==""&&file!==""&&this.state.pass!==""&&this.state.passAgain!==""){
        if(this.state.passAgain!=this.state.pass)this.setState({checkPassAgain:2});
        if(this.state.checkPass.length>=6)this.setState({checkPass:2});
        
          fetch('http://localhost:9000/checkOfficer', {
                headers: {
                          'Content-Type':'application/x-www-form-urlencoded'
              
                         },
             
             
                 method: "POST",
                 body:  queryString.stringify({'code':this.state.code,'user':this.state.user,'file':file.name})
                
               
             })
             .then((response) => response.json())
             .then((data) => {
              
              console.log(JSON.stringify(data));
              //{"checkCode":true,"checkFile":true}
              var checkCode=false;  var checkFile=false;var checkUser=false;
               checkCode=data.checkCode;checkFile=data.checkFile;checkUser=data.checkUser;
               if(checkCode){this.setState({checkCode:0})}else{this.setState({checkCode:2})}
             
               if(checkFile){this.setState({checkFile:0})}else{this.setState({checkFile:2})}
                if(checkUser){this.setState({checkUser:0})}else{this.setState({checkUser:3})}

                if(checkCode&&checkFile&&checkUser){
                    
                    fetch('http://localhost:9000/insertOfficer', {
                        headers: {
                                  'Content-Type':'application/x-www-form-urlencoded'
                      
                                 },
                     
                     
                         method: "POST",                  
                         body:  queryString.stringify({'code':this.state.code,'name':this.state.name,'subname':this.state.subname,'file':this.state.file.name,'address':this.state.address,'user':this.state.user,'pass':this.state.pass})
                        
                       
                     })
                     .then((response) => response.json())
                     .then((data) => { console.log(JSON.stringify(data));
                      if( data.qreury){this.setState({checkSuccess:1,isOpen:true})}
                      else {this.setState({checkSuccess:2,isOpen:true})}
                      console.log(this.state.checkSuccess)
                      if(data.qreury){
                        return new Promise((resolve, reject) => {
                            let imageFormData = new FormData();
                        
                            imageFormData.append('file', file);
                            imageFormData.append('imagePreviewUrl', imagePreviewUrl);
                            
                            var xhr = new XMLHttpRequest();
                            
                            xhr.open('post','http://localhost:9000/insertImageOfficer', true);
                            
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
    render() {
        if(this.state.userType=="admin"){
        return (
            <div style={{background:'white',webkitBorderRadius:' 0% 0% 100% 100% / 0% 0% 8px 8px',webkitBoxShadow: 'rgba(0, 0, 0,.30) 0 2px 3px' }}>
              
              <div style={{padding:"0px 10px 10px 10px",marginLeft:'25px',background:'white',border: '0px 1px 1px 1px solid #ccc',boxShadow: '1px 1px 2px #fff inset,-1px -1px 2px #fff inset',borderRadius: '3px/6px' }}>
                
                 <table style={{marginTop:'5px'}}>
                    <tr>
                    <td><h3 style={{color:'grey'}}>เพิ่มพนักงาน</h3></td>

                    </tr>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> รหัส: </b>
                        </td>
                        <td>
                        <input onChange={e=>this.setDataInsert("code",e.target.value)}  color="isSuccess" type="text" placeholder="" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                        </td>
                        
                    </tr>
                    <tr><td></td><td>{this.state.checkCode==0?(<div></div>):(<div>{this.state.checkCode==1?(<div style={{color:"red"}}>กรุณาใส่รหัส</div>):(<div style={{color:"red"}}>รหัสนี้ใช้แล้ว กรุณาใช้รหัสอื่น</div>)}</div>)}</td></tr>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> ชื่อ: </b>
                        </td>
                        <td>
                        <input  onChange={e=>this.setDataInsert("name",e.target.value)} color="isSuccess" type="text" placeholder="" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                        </td>
                       
                    </tr>
                    <tr><td></td>
                    <td>{this.state.checkName==0?(<div></div>):(<div style={{color:"red"}}>กรุณาใส่ชื่อ</div>)}</td>
                    </tr>
                    <tr>
                    <td>
                       <b style={{ color:'grey'}}> นามสกุล: </b>
                    </td>
                    <td>
                    <input  onChange={e=>this.setDataInsert("subname",e.target.value)} color="isSuccess" type="text" placeholder="" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                    </td>
                   
                </tr>
                <tr>
                <td></td>
                <td>{this.state.checkSubname==0?(<div></div>):(<div style={{color:"red"}}>กรุณาใส่นามสกุล</div>)}</td>
                </tr>
                </table>
                <table>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> ที่อยู่พนักงาน: </b>
                        
                            
                        <Textarea  onChange={e=>this.setDataInsert("address",e.target.value)} color="isInfo" style={{width:'300px'}}/>
                        </td>
                        <td>{this.state.checkAddress==0?(<div></div>):(<div style={{color:"red"}}>กรุณาใส่ที่อยู่พนักงาน</div>)}</td>
                    </tr>
                    </table>
                    <table>
                    <tr>
                    
                        <td>
                           <b style={{ color:'grey'}}> รหัสเข้าสู่ระบบ: </b>
                        </td>
                        <td>
                            
                        <input  onChange={e=>this.setDataInsert("user",e.target.value)} color="isSuccess" type="text" placeholder="" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                        </td>
                       
                    </tr>
                    <tr><td></td><td>{this.state.checkUser==0?(<div></div>):(<div>{this.state.checkUser==1?(<div style={{color:"red"}}>กรุณาใส่รหัสเข้าสู่ระบบ</div>)
                    :(<div>{this.state.checkUser==2?(<div style={{color:"red"}}>รหัสผ่านต้องเกิน หรือ เท่ากับ 6 ตัว</div>):(<div style={{color:"red"}}>รหัสเข้าสู่ระบบ นี้มีคนใช้แล้ว</div>)}</div>)}</div>)}</td></tr>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> รหัสผ่าน: </b>
                        </td>
                        <td>
                            
                        <input  onChange={e=>this.setDataInsert("pass",e.target.value)} color="isSuccess" type="password" placeholder="" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                        </td>
                       
                    </tr>

                    <tr><td></td><td>{this.state.checkPass==0?(<div></div>):(<div>{this.state.checkPass==1?(<div style={{color:"red"}}>กรุณาใส่รหัสผ่าน</div>):(<div style={{color:"red"}}>กรุณาใส่รหัสผ่านต้องเกิน หรือ เท่ากับ  6 ตัว</div>)}</div>)}</td></tr>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> ยืนยันรหัสผ่าน: </b>
                        </td>
                        <td>
                            
                        <input  onChange={e=>this.setDataInsert("passAgain",e.target.value)} color="isSuccess" type="password" placeholder="" style={{width:'205px',height:'25px',border:'solid 1px',borderColor:'#99ccff',borderRadius:' 5px'}}/>
                        </td>
                       
                    </tr>
                   
                    <tr><td></td><td>{this.state.checkPassAgain==0?(<div></div>):(<div>{this.state.checkPassAgain==1?(<div style={{color:"red"}}>กรุณาใส่รหัสผ่าน</div>):(<div style={{color:"red"}}>กรุณาใส่รหัสผ่านให้ตรงกัน</div>)}</div>)}</td></tr>
                    <tr>
                        <td>
                           <b style={{ color:'grey'}}> รูป: </b>
                        
                        </td>
                        <td>

                            <input type="file" onChange={(e)=>{this.setImage(e)}} />
                            
                        </td>
                        <td>{this.state.checkFile==0?(<div></div>):(<div>{this.state.checkFile==1?(<div style={{color:"red"}}>กรุณาใส่รูป</div>):(<div style={{color:"red"}}>ชื่อรูปซ้ำ กรุณาใช้ชื่อรูปอื่น</div>)}</div>)}</td>
                    </tr>
                    
                    </table>
                    <Button color="isSuccess" onClick={()=>this.insertData(this.state.file,this.state.imagePreviewUrl)}><b style={{ color:'white'}}>ยืนยันการเพิ่มพนักงาน</b></Button>
                    
                </div>  
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
                        เพิ่มพนักงานเรียบร้อย
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
                        เกิดข้อผิดพลาด กรุณากดเพิ่มพนักงานใหม่
                        </Content>
                        </Modal>
                    </div>)
                    }
                 </div>)
                }                   

            </div>
        );}
    }
}

export default insertOfficer;