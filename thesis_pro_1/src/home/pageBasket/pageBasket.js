import React, { Component } from 'react';
import queryString from 'query-string';
import cookie from 'react-cookies';
import {Content,Table,Thead,Tr,Th,Tbody,Td,Hero,HeroHead,Nav,Container,NavGroup,HeroBody,Box,Textarea,Button,Columns,Column,Group,Notification,Modal,Label,Input}  from 're-bulma';
import {Link} from 'react-router-dom';
import  '../../home/css/pageBasket/pageBasket.css'

import  LOGIN from './loginPageBasket.js'
class pageBasket extends Component {
    constructor(props) {
      super(props);
      this.state = {
        productBasket:'',
        countBasket:0,
        totalBasket:0,
        isOpenShowModalAndInsert:false,
        isOpenShowLogin:false,
        user:'',
        pass:'',
        users:'',
        userBuy:'',
        userTypeBuy:'',
        checkStatusInsert:false,
       
      };
     
     
    }
    componentDidMount() {
      this.props.setExact(true,true,3);
    }
    
    componentWillMount() {
     
      this.props.setExact(true,true,3);

      var takeBasket= cookie.load('takeBasket');
      var userBuy= cookie.load('userId');
      var userTypeBuy= cookie.load('userType');
      this.setState({userBuy:userBuy,userTypeBuy:userTypeBuy})
      if(takeBasket!=null){
      this.setState({countBasket:takeBasket.length})
    
      fetch('http://localhost:9000/selectBasket', {
        headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
      
                 },
     
     
         method: "POST",
         body:  queryString.stringify({'takeBasket':takeBasket})
        
       
     })
     .then((response) => response.json())   
     .then((data) => {
    console.log(data)
      this.setState({productBasket: data})
      var total=0;
      data.map((product) =>{total +=  product.Price});
      this.setState({totalBasket: total})
     
      })
    }

   
    }
    showModalAndInsert=()=>{
      console.log(this.state.userBuy+":"+this.state.userTypeBuy)
      
      fetch('http://localhost:9000/inserBuyProduct', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'userBuy':this.state.userBuy,'userTypeBuy':this.state.userTypeBuy})

    })
    .then((response) => response.json())
    .then((data) => {


if(data.qreury){
console.log("data"+data)
  var code=this.state.productBasket.map((product) => product.code)
  var count=this.state.productBasket.map((product) => product.Price)
  console.log(count)

            fetch('http://localhost:9000/inserDetailBuyProduct', {
              headers: {
                          'Content-Type':'application/x-www-form-urlencoded'
              
                      },

              method: "POST",
              body:  queryString.stringify({'id':data.idBuyProduct,'code':code,'count':count})

          })
          .then((response) => response.json())
          .then((data) => {console.log(data);
            if(data.qreury) {this.setState({isOpenShowModalAndInsert:true,checkStatusInsert:true})}
            else{this.setState({isOpenShowModalAndInsert:true,checkStatusInsert:false})}
          
          })

}else{
  this.setState({isOpenShowModalAndInsert:true,checkStatusInsert:false})

}


    
                        })

    }
    setUser= (e) => {
      this.setState({user: e.target.value})
      

  }
  setPass= (e) => {
      this.setState({pass: e.target.value})
      
          }
          logIn=()=> {
            
            
            if(this.state.user!==''&& this.state.pass!==''){
                fetch('http://localhost:9000/login', {
                    headers: {
                                'Content-Type':'application/x-www-form-urlencoded'
                    
                            },
                
                    method: "POST",
                    body:  queryString.stringify({'user':this.state.user,'pass':this.state.pass})
    
                })
                .then((response) => response.json())
                .then((data) => {
           
                    this.setState({users:data})
                    if(data.user!=true&&data.user!=false){
                      cookie.save('userId', data.user, { path: '/' })
                      cookie.save('userType', data.type, { path: '/' })
                  
                       window.location.reload();
                    }
                
                                })
            }
                        
        }

        responseFacebook=(response) =>{
          var email=false;
fetch('http://localhost:9000/checkUserFace', {
 headers: {
             'Content-Type':'application/x-www-form-urlencoded'
 
         },

 method: "POST",
 body:  queryString.stringify({'email':response.email})

})
.then((response) => response.json())
.then((data) => {

email=data.email
console.log(data+"eiei")
if(data.email==true){console.log("อีเมลไม่ซ้ำ")}
else{console.log("อีเมลซ้ำ")}


                 })
                

this.setState({user:response.name})
if(this.state.user!=null ){

cookie.save('userId', response.name, { path: '/' })
cookie.save('userType', 'customerFace', { path: '/' })
cookie.save('userEmail', response.email, { path: '/' })
window.location.reload();

}
}

  

 render() {
      
        return (
        <div >

          <Content>
   
              
                          <table> <tr> <td style={{width:'500px'}}> <a style={{outline:'0', textDecoration: 'none',border:'none'}} href="/">กลับหน้าหลัก</a></td><td><h1 className="fontMit">ตระกร้าสินค้า</h1></td></tr>
                          
                          </table>
                         
                         
                          </Content>
                          
                              {this.state.productBasket!=''?(<div >  <table  style={{float: 'left',width:'65%'}}>
  <tr style={{height:'50px'}}><td style={{ textAlign:'center', verticalAlign:'middle' }}>{this.state.countBasket} ชิ้น</td><td></td><td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>ราคา </td>
                                  <td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>จำนวน</td></tr>                   
                                {this.state.productBasket.map((product,key) =>  <tr style={{marginBottom:'150px'}}>                       
                                    <td><img style={{width:'200px',height:'150px'}} src={require('../../home/picture/product/'+product.Src)} alt="item1" /></td>
                                   <td style={{width:'300px',  textAlign:'center', verticalAlign:'middle' }}>{product.name}<br/>{product.Des}</td>
                                   <td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>{product.Price}</td>
                                   <td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>1 ชิ้น</td>
                                                       </tr>  
                                )}
                                  </table>
                                  <table>
                                    <tr>
                                      <td>
                                  <Table isStriped style={{width:'300px',marginTop:'11px',float: 'left'}}>
                                  <Thead>
                                    <Tr>
                                      <Th style={{color:'black'}}>สรุปการสั่งซื้อ</Th>
                                      <Th></Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    <Tr>
                                      <Td style={{color:'grey'}}>มูลค่าการสั่งซื้อ</Td>
                                      <Td>{this.state.totalBasket} ฿</Td>
                                    </Tr>
                                    <Tr>
                                    <Td>ยอดสุทธิ</Td>
                                      <Td>{this.state.totalBasket} ฿</Td>
                                    </Tr>
                                    
                                  </Tbody>
                                </Table>
                               </td>
                                 </tr>
                                 <tr><td> <Button onClick={this.showModalAndInsert} color="isDanger" style={{marginLeft:'20px',width:'220px'}} >ดำเนินการชำระเงิน</Button> </td></tr>
                                 </table>
                                 <Modal
                                    type="card"
                                    headerContent=""
                                    footerContent={<div style={{ padding: '20px'}} ></div>}
                                    isActive={this.state.isOpenShowModalAndInsert}
                                    onCloseRequest={() => this.setState({ isOpenShowModalAndInsert: false })}
                                    >
                                    <Content>
                                      {this.state.checkStatusInsert?(<Label>ทำการสั่งซื้อสินค้าแล้ว ทางเราจะโทรไปหาคุณ และ ส่งอีเมลไปหาคุณเพื่อยืนยันการส่งสินค้า</Label>):(<Label>เกิดข้อผิดพลาด กรุณากดสั่งซื้อสินค้าใหม่</Label>)}
                                    
                                    
                                    <Button style={{marginTop:"10px",marginLeft:"45%"}} color="isInfo" onClick={() => this.setState({ isOpenShowModalAndInsert: false })}>ตกลง</Button>
                                    </Content>
                                </Modal>

                                <Modal

                                      type="card"
                                      headerContent="กรุณาเข้าสู่ระบบก่อนสั่งซื้อ"
                                      footerContent={<div style={{ padding: '20px'}} ></div> }
                                      isActive={this.state.isOpenShowLogin}
                                      onCloseRequest={() =>this.setState({ isOpenShowLogin: false })}
                                    >
                                      <Content>

                                      <LOGIN/>

                                    
                                      </Content>
                                
                                    </Modal>
                         
                                  </div>):
                              (<div><h3>ยังไม่มีสินค้าในตระกร้าสินค้า</h3>
                              
                              
                              
                              </div>)}
                              
                         
            
       
       
       
         </div>
                )}}

export default pageBasket;


/*
<div >

          <Content>
   
                          <Container hasTextCentered>
                            <h1 className="fontMit">ตระกร้าสินค้า</h1>
                          </Container>
                          </Content>
                          
                              {this.state.productBasket!=''?(<div >  <table  style={{float: 'left',width:'65%'}}>
  <tr style={{height:'50px'}}><td style={{ textAlign:'center', verticalAlign:'middle' }}>{this.state.countBasket} ชิ้น</td><td></td><td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>ราคา </td>
                                  <td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>จำนวน</td></tr>                   
                                {this.state.productBasket.map((product,key) =>  <tr style={{marginBottom:'150px'}}>                       
                                    <td><img style={{width:'200px',height:'150px'}} src={require('../../home/picture/product/'+product.Src)} alt="item1" /></td>
                                   <td style={{width:'300px',  textAlign:'center', verticalAlign:'middle' }}>{product.name}<br/>{product.Des}</td>
                                   <td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>{product.Price}</td>
                                   <td style={{width:'100px',  textAlign:'center', verticalAlign:'middle' }}>1 ชิ้น</td>
                                                       </tr>  
                                )}
                                  </table>
                                  <table>
                                    <tr>
                                      <td>
                                  <Table isStriped style={{width:'300px',marginTop:'11px',float: 'left'}}>
                                  <Thead>
                                    <Tr>
                                      <Th style={{color:'black'}}>สรุปการสั่งซื้อ</Th>
                                      <Th></Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    <Tr>
                                      <Td style={{color:'grey'}}>มูลค่าการสั่งซื้อ</Td>
                                      <Td>{this.state.totalBasket} ฿</Td>
                                    </Tr>
                                    <Tr>
                                    <Td>ยอดสุทธิ</Td>
                                      <Td>{this.state.totalBasket} ฿</Td>
                                    </Tr>
                                    
                                  </Tbody>
                                </Table>
                               </td>
                                 </tr>
                                 <tr><td> <Button onClick={this.showModalAndInsert} color="isDanger" style={{marginLeft:'20px',width:'220px'}} >ดำเนินการชำระเงิน</Button> </td></tr>
                                 </table>
                                 <Modal
                                    type="card"
                                    headerContent=""
                                    footerContent={<div style={{ padding: '20px'}} ></div>}
                                    isActive={this.state.isOpenShowModalAndInsert}
                                    onCloseRequest={() => this.setState({ isOpenShowModalAndInsert: false })}
                                    >
                                    <Content>
                                    <Label>ทำการสั่งซื้อสินค้าแล้ว ทางเราจะส่งอีเมลไป แล้วจะโทรไปหาคุณเพื่อยืนยันการส่งสินค้า</Label>
                                    
                                    <Button color="isInfo" onClick={() => this.setState({ isOpenShowModalAndInsert: false })}>ตกลง</Button>
                                    </Content>
                                </Modal>
                                <Modal

                                      type="card"
                                      headerContent=" กรุณาเข้าสู่ระบบก่อนสั่งซื้อ"
                                      footerContent={<div style={{ padding: '20px'}} ></div> }
                                      isActive={this.state.isOpenShowLogin}
                                      onCloseRequest={this.setState({ isOpenShowLogin: false })}
                                    >
                                      <Content>

                                      <LOGIN setExact={ this.props.setExact}/>
                                    
                                      </Content>
                                
                                    </Modal>
                                  </div>):
                              (<div><h3>ยังไม่มีสินค้าในตระกร้าสินค้า</h3></div>)}
                              
                         
            
       
       
       
         </div>

*/
