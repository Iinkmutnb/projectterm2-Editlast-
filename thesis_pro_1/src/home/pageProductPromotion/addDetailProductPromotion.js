import React, { Component } from 'react';

import {Table,Td,Thead,Tr,Th,Tbody,Button,Notification,Input,Label,Group,Title,Modal,Content} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {Link} from 'react-router-dom';


class addDetailProductPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        userType:'',
        idProduct:'',
        discount:0,
        checkIdProduct:0,//ค่า 1 ไม่รหัสสินค้า,ค่า 2สินค้านี้มี โปรโมชั่นแล้ว,กรณี = 0 จะทำการinsert 
        checkDiscout:0,//ค่า 1 จำนวน เปอร์เซอร์ที่ลด น้อยกว่า0 หรือ มากกว่า 100
        checkInsert:0,//ค่า 1 insert สำเร็จ ค่า 2 เกิดข้อผิดพลาด การ insert
        isOpen:false,

                        }
       
    }
    componentDidMount() {
        
        this.props.setExact(true,true,2);
    }
    componentWillMount() {
        
        var userType= cookie.load('userType');
        this.setState({userType:userType});
       // this.props.setExact(true,true,2);
   
      
       
        

    }
    setIdProduct=(e)=>{
        
        this.setState({idProduct:e.target.value})
    }
    setDiscount=(e)=>{
    
        this.setState({discount:e.target.value})
    }
    insert=()=>{
        

        fetch('http://localhost:9000/checkIdProduct', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'idProduct':this.state.idProduct})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
            
            if(data!=''&&data.qreury!="false"){
                this.setState( {checkIdProduct:0})
                fetch('http://localhost:9000/checkProductPromotion', {
                    headers: {
                              'Content-Type':'application/x-www-form-urlencoded'
                  
                             },
                 
                 
                     method: "POST",
                     body:  queryString.stringify({'idProduct':this.state.idProduct})
                    
                   
                 })
                 .then((response) => response.json())
                 .then((data) => {
                    if(data==''){
                        //insert ตรง บรรทัด ใน ifนี้
                       this.setState( {checkIdProduct:0})
                       if(this.state.discount<=100&&this.state.discount>=0){
                        this.setState({checkDiscout:0})
                              console.log("พร้อม insert")
                              fetch('http://localhost:9000/insertProductPromotion', {
                                headers: {
                                          'Content-Type':'application/x-www-form-urlencoded'
                              
                                         },
                             
                             
                                 method: "POST",
                                 body:  queryString.stringify({'idProduct':this.state.idProduct,'discount':this.state.discount})
                                
                               
                             })
                             .then((response) => response.json())
                             .then((data) => {
                                 //insert สำเร็จ
                                 this.setState({ isOpen: true })
                                this.setState({checkInsert:1})
                             })

                       }
                       else {
                        this.setState({checkDiscout:1})

                       }
                    }else if(data!=''){
                        this.setState( {checkIdProduct:2})
                        this.setState({ isOpen: true })

                    }
                })



               
            }else if(data==''&&data.qreury!="false") {this.setState({checkIdProduct:1})}
            else if(data.qreury=="false"){this.setState({checkInsert:2})}
            
    
            
          })
    }
    reset=()=>{
        this.setState({idProduct:'',discount:''})
    }
    closeModal=()=>{
        this.setState({ isOpen: false })
        window.location.reload();
    }


    render() {
        var checkIdProduct=''
        var checkDiscout=''
        if(this.state.checkIdProduct==1){
            checkIdProduct="ไม่มีรหัสสินค้านี้"
        }else if(this.state.checkIdProduct==2){
            checkIdProduct="สินค้านี้มี โปรโมชั่นแล้ว"
        }
        if(this.state.checkDiscout==1){
            checkDiscout="เปอร์เซอร์ที่ลด อยู่ระหว่าง 0 ถึง 100"
        }
        
      
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
           <Notification style={{backgroundColor:'#f2f2f2'}}>
           <Title>เพิ่มโปรโมชั่นสินค้า</Title>
          
          <div style={{float:'left'}}>
              <table>
                  
                  <tr> <td><Label>  รหัสสินค้า :</Label></td><td></td></tr>
                  <tr><td> <input onChange={this.setIdProduct} style={{width:'200px'}} type="text"  value={this.state.idProduct} /></td><td style={{paddingLeft:"20px",color:"red"}}> {checkIdProduct}</td></tr>
                 
                  <tr><td>  <Label>  จำนวนที่ลด (%) :</Label></td><td></td></tr>
                  <tr><td> <input onChange={this.setDiscount} style={{width:'200px'}} type="number"  step={0.01} max="100" min="0" value={this.state.discount}/></td><td style={{paddingLeft:"20px",color:"red"}}> {checkDiscout}</td></tr>
                   
              </table>
              <div style={{marginTop:"20px"}}>
                  <Button onClick={this.insert} color="isSuccess">ยืนยัน</Button> <Button onClick={this.reset} color="isWarning">reset</Button> 
             </div>
          </div>
     
           </Notification>
          { this.state.checkInsert==1?(
           <Modal
           type="card"
           headerContent=""
           footerContent={<div style={{ padding: '20px'}} ></div>}
           isActive={this.state.isOpen}
           onCloseRequest={this.closeModal}
           >
           <Content>
           <Label>เพิ่มข้อมูลโปรโมชั่นแล้ว</Label>
          
           </Content>
           </Modal>):(<div>{this.state.checkInsert==2?(
            <Modal
           type="card"
           headerContent=""
           footerContent={<div style={{ padding: '20px'}} ></div>}
           isActive={this.state.isOpen}
           onCloseRequest={() => this.setState({ isOpen: false })}
           >
           <Content>
           <Label>เกิดข้อผิดพลาด</Label>
          
           </Content>
           </Modal>
               
               ):(<div></div>)}
         
          </div>
           )
          }
            </div>

        );}
    }
}

export default addDetailProductPromotion;
