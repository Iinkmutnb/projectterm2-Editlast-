import React, { Component } from 'react';
import queryString from 'query-string';
import cookie from 'react-cookies';
import {Content,Table,Thead,Tr,Th,Tbody,Td,Hero,HeroHead,Nav,Container,NavGroup,HeroBody,Box,Textarea,Button,Columns,Column,Group,Notification,Modal,Label,Input,Message}  from 're-bulma';
import {Link} from 'react-router-dom';
import  '../../home/css/pageBasket/pageBasket.css'


class pageBasket2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user:'',
        takeBasket:'',
        productBasket:'',
        totalBasket:'',
        countBasket:'',
        phone:'',
        pass:'',
        name_person:'',
        subname:'',
        type:'',
        address:'',
        zipCode:'',
        email:'',
        dataCustomer:'',
        isOpenShowModalAndInsert:false,
        checkStatusInsert:false,
        userType:'',

       
      };
     
     
    }
    componentDidMount() {
    //  this.props.setExact(true,true,3);
    }
    componentWillMount() {
    
    var userid= cookie.load('userId');
    var userType= cookie.load('userType');
    var takeBasket= cookie.load('takeBasket');
    this.setState({user:userid,takeBasket:takeBasket,userType:userType})
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
       // console.log(data)
          this.setState({productBasket: data})
          var total=0;
          data.map((product) =>{total +=  product.Price});
          this.setState({totalBasket: total})
          
          fetch('http://localhost:9000/selectOneCustomer', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'user':userid})
            
           
         })
         .then((response) => response.json())   
         .then((data) => {
        console.log(data)
          this.setState({dataCustomer: data})
         this.state.dataCustomer.map((customer) =>{
        
    
            this.setState({phone: customer.phone,pass: customer.pass,name_person: customer.name_person
                ,subname: customer.subname,type: customer.type,address: customer.address,zipCode: customer.zipCode,email: customer.email,dataCustomer: customer.dataCustomer})

         })

         
         
          
         
          })
         
          
         
          })
   
      }

    }
   
    showModalAndInsert=()=>{
        fetch('http://localhost:9000/inserBuyProduct', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'userBuy':this.state.user,'userTypeBuy':this.state.userType})
    
        })
        .then((response) => response.json())
        .then((data) => {
    
            console.log(data)
                  if(data.qreury){
                  console.log(data)
                    var code=this.state.productBasket.map((product) => product.code)
                    var count=1;
                   
    
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


  

 render() {
     if(this.state.user!=null&&this.state.takeBasket!=null&&this.state.productBasket!='')
      {
        return (
        <div >
             <Content>
             <a style={{outline:'0', textDecoration: 'none',border:'none'}} href="/">กลับหน้าหลัก</a>
   <center>
            <table style={{border:"0px solid"}}>

                <tr><td  colSpan={2}><center><h1>ยืนยันตระกร้าสินค้า</h1></center></td></tr>
                <tr>
                    <td style={{padding:"10px"}} >           <Message  style={{padding:"10px"}} header={<center>ที่อยู่จัดส่ง</center>} color="isPrimary">
                                        <table style={{width:'500px',padding:"10px"}}>
                                       
                                        <tr > <td  >ชื่อ:</td>  <td  >   <Input type="text" size="isSmall" value={this.state.name_person}/></td></tr> 
                                        <tr > <td  >นามสกุล:</td>  <td  >   <Input type="text" size="isSmall" value={this.state.subname}/></td></tr> 
                                        <tr> <td>เบอร์โทร:</td>  <td>   <Input type="text" size="isSmall" value={this.state.phone}/></td></tr> 
                                        <tr> <td>ที่อยู่:</td>  <td>   <Input type="text" size="isSmall" value={this.state.address}/></td></tr> 
                                        <tr> <td>รหัสไปรษณีย์:</td>  <td>   <Input type="text" size="isSmall" value={this.state.zipCode}/></td></tr> 
                                        <tr> <td>email:</td>  <td>   <Input type="text" size="isSmall" value={this.state.email}/></td></tr> 
                                         <tr><td colSpan={2}> <Button onClick={this.s} color="isDanger" style={{width:'220px'}} >บันทึก</Button> </td></tr>              
                                                        </table>
                                                       
                                                        </Message>
                    </td>
                    <td>
                    <Table isStriped >
                                                    <Thead>
                                                    <Tr>
                                                        <Th style={{color:'black'}}>สรุปการสั่งซื้อ</Th>
                                                        <Th></Th>
                                                    </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                    <Tr>
                                                        <Td style={{color:'grey'}}>จำนวนเงิน</Td>
                                                        <Td>{this.state.totalBasket} ฿</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td style={{color:'grey'}}>จำนวนสินค้า</Td>
                                                        <Td>{this.state.countBasket} ฿</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td style={{color:'grey'}}>ค่าจัดส่ง</Td>
                                                        <Td>50 ฿</Td>
                                                    </Tr>
                                                    <Tr>
                                                    <Td>สรุปผล</Td>
                                                        <Td>{this.state.totalBasket+50} ฿</Td>
                                                    </Tr>
                                                    <Button onClick={this.showModalAndInsert} color="isDanger" style={{marginLeft:'20px',width:'220px'}} >ยืนยัน</Button> 
                                                    
                                                    </Tbody>
                                                </Table>
                        
                    </td>
                </tr>
                <tr><td colSpan={2}><center><h1>รายละเอียดสินค้า</h1></center></td></tr>
                <tr><td colSpan={2}>

                <table  >
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
                    
                    
                </td></tr>
            
            </table>  
            </center>
            </Content>

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
                                
   
         </div>
                )
            }
            else{    return (<div>

                            <Content>
   
              
                          <table> <tr> <td style={{width:'500px'}}> <a style={{outline:'0', textDecoration: 'none',border:'none'}} href="/">กลับหน้าหลัก</a></td><td><h1 className="fontMit">ยังไม่ได้เข้าสู่ระบบ</h1></td></tr>
                          
                          </table>
                         
                         
                          </Content>

            </div>)}
            
            
            }}

export default pageBasket2;



/*
//การอินเสริทการสั่งซื้อสินค้า
 
      
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
              console.log(data)
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

*/
