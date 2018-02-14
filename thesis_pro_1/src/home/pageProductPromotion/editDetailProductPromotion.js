import React, { Component } from 'react';

import {Table,Td,Thead,Tr,Th,Tbody,Button,Notification,Input,Label,Group,Title,Modal,Content} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {Link} from 'react-router-dom';


class editDetailProductPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        userType:'',
        idProduct:'',
        discount:'',
        checkDiscout:0,
        idPromotion:'',
        showModal:false,
        checkEdit:0,
        isOpen:false
       

                        }
       
    }
    componentDidMount() {
        
        this.props.setExact(true,true,2);
    }
    componentWillMount() {
        
        var userType= cookie.load('userType');
        this.setState({userType:userType});
       // this.props.setExact(true,true,2);

   fetch('http://localhost:9000/selectProductPromotion', {
    headers: {
              'Content-Type':'application/x-www-form-urlencoded'
  
             },
 
 
     method: "POST",
     body:  queryString.stringify({'id':this.props.match.params.id})
    
   
 })
 .then((response) => response.json())
 .then((data) => {
    this.setState({idPromotion:this.props.match.params.id})
    data.map((product) =>
        this.setState({idProduct:product.code,discount:product.promotion_discount})
    );
 
  })

       
        

    }
    setDiscount=(e)=>{
        this.setState({discount:e.target.value})
        console.log(e.target.value)
    }
    edit=()=>{
        
        if(this.state.discount<=100&&this.state.discount>=0){
           this.setState({checkDiscout:0})
           fetch('http://localhost:9000/editDetailProductPromotion', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'idPromotion':this.state.idPromotion,'idProduct':this.state.idProduct,'discount':this.state.discount})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
           this.setState({ checkEdit:1,isOpen:true})
           
          
         
          })
        }
        else{
            this.setState({checkDiscout:1})
            }
    }
    closeModal=()=>{
        this.setState({ isOpen: false })
        window.location.href = '/editAdmin/productPromotion'; 
    }
    
   


    render() {
        var checkDiscout=''
      
        if(this.state.checkDiscout==1){
            checkDiscout="เปอร์เซอร์ที่ลด อยู่ระหว่าง 0 ถึง 100"
        }
        
      
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
               
           <Notification style={{backgroundColor:'#f2f2f2'}}>
           <Title>แก้ไขโปรโมชั่นสินค้า</Title>
          
          <div style={{float:'left'}}>
              <table>
                  
                  <tr> <td><Label>  รหัสสินค้า :{this.state.idProduct}</Label></td><td></td></tr>
                
                 
                  <tr><td>  <Label>  จำนวนที่ลด (%) :</Label></td><td></td></tr>
                  <tr><td> <input style={{width:'200px'}} type="number" onChange={this.setDiscount}  step={0.01} max="100" min="0" value={this.state.discount}/></td><td style={{paddingLeft:"20px",color:"red"}}> {checkDiscout}</td></tr>
                   
              </table>
              <div style={{marginTop:"20px"}}>
                  <Button onClick={this.edit}   color="isSuccess">ยืนยัน</Button> 
             </div>
          </div>
     
           </Notification>
           { this.state.checkEdit==1?(
           <Modal
           type="card"
           headerContent=""
           footerContent={<div style={{ padding: '20px'}} ></div>}
           isActive={this.state.isOpen}
           onCloseRequest={this.closeModal}
           >
           <Content>
           <Label>แก้ไขโปรโมชั่นแล้ว</Label>
          
           </Content>
           </Modal>):(<div>{this.state.checkEdit==2?(
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

export default editDetailProductPromotion;
