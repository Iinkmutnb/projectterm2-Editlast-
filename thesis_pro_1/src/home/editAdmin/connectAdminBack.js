import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Tr,Th,Thead,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class connectAdminBack extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
       
      
        userType:'',
        id_buy_product:'',
        id_connect:'',
      
        connect:'',
        date: date,
        check:1,
        detail:'',
        image:'',
        detail_con_back:'',

                        }
       
    }
    
    componentDidMount() {
        
        this.props.setExact(true,true,2);
    }
 
    componentWillMount() {
        console.log(this.props.match.params.id)
        this.props.setExact(true,true,2);
        var userType= cookie.load('userType');
        this.setState({userType:userType});
        fetch('http://localhost:9000/selectOneConnect', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id':this.props.match.params.id})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          data.map((data,key) =>{  this.setState({id_buy_product:data.id_buy_product,detail:data.detail_connect,image:data.src})});
     
         
    
    
    
    
        
        })
    
       
      
       
        

    }
    setCloserModal=()=>{
        
         window.location.href="/editAdmin/connectAdmins/connectAdmin";
     }
    insertData=(id)=> {
        console.log(id)
        if(this.state.detail_con_back==""){this.setState({checkTopic:1})}else{this.setState({checkTopic:0})}
        if(this.state.detail_con_back!==""){
            console.log("s")
            fetch('http://localhost:9000/insertConnectBack', {
                headers: {
                          'Content-Type':'application/x-www-form-urlencoded'
              
                         },
             
             
                 method: "POST",                  
                 body:  queryString.stringify({'detail_con_back':this.state.detail_con_back,'idconnect':id})
                
               
             })
             .then((response) => response.json())
             .then((data) => { //console.log(JSON.stringify(data));
                if( data.qreury){this.setState({checkSuccess:1,isOpen:true})}
                else {this.setState({checkSuccess:2,isOpen:true})}
            });
        }
    }

  


    render() {
      
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div>
             <table style={{marginTop:'10px'}}> 
                  <tr>
             <td> <Button color="isWarning" style={{padding:'0px'}}><Link to="/editAdmin/connectAdmins/connectAdmin" style={{padding:'7px',textDecoration:'none'}}>กลับไปหน้าก่อน</Link></Button></td>
             </tr>
             </table>

            <table >
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                 <tr>
                    <td><h3 style={{color:'grey',fontSize: '30px'}}>ข้อมูลที่ลูกค้าแจ้ง</h3></td>

                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                  
            </table> 
            <table >
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                 <tr>
                    <td>รหัสสั่ง </td>
                    <td>&nbsp;</td>
                    <td>{this.state.id_buy_product}</td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td>
                </tr>
              
                  
            </table>  
            <table>
            <tr>
                    <td>วันที่ส่ง </td>
                    <td>&nbsp;</td>
                    <td> {this.state.date}</td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td>
                </tr>

            </table> 
            <table>
            <tr>
                    <td>รายละเอียด </td>
                    <td>&nbsp;</td>
                    <td>{this.state.detail} </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td>
                </tr>

            </table> 
           
            <table>
            <tr>
                    <td>รูปภาพ <br/></td>
                   
                    {this.state.image!=''?(<td colSpan={2}><img style={{marginLeft:'50px',border:'solid 1px',width:'220px',height:'150px',}} src={require('../../home/picture/connect/'+this.state.image)}/></td>):(<td></td>)}
            </tr>
                    <tr>
                        

                    </tr>
               

            </table> 

            
            <hr style={{height:'3px', border:'none', color:'rgb(60,90,180)', backgroundColor:'rgb(60,90,180)'}}/>
            <table style={{marginTop:'10px'}}>
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                 <tr>
                    <td><h3 style={{color:'grey',fontSize: '30px'}}>ตอบกลับ</h3></td>

                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                  
            </table> 
            <table>
            <tr>
                        <td >
                        
                        
                            
                        <Textarea  onChange={(e)=>this.setState({detail_con_back:e.target.value})}   color="isInfo" style={{width:'300px'}}  placeholder="Describe yourself here..."/>
                        </td>

                        
                    </tr>
                    </table>
                    <Button color="isSuccess" onClick={()=>this.insertData(this.props.match.params.id)}  ><b style={{ color:'white'}}>ส่ง</b></Button>
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
                        ส่งข้อมูลตอบกลับเรียบร้อย
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
    }
}

export default connectAdminBack;
//{ this.props.match.params.id}

/*      {
    this.state.product.map((product,key) => 
    
        <Tr>
        <Td><b>{key+1}</b></Td>
        <Td><b>{product.code}</b></Td>
        <Td><b>{product.name}</b></Td>
        <Td><Button color="isWarning" style={{padding:'0px'}}><Link to={`/editAdmin/product/edits${product.code}`}  style={{padding:'7px',textDecoration:'none'}}>แก้ไข</Link></Button></Td>
        </Tr>
        
 
 )}
 */
// { this.props.match.params.id}