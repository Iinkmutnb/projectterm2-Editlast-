import React, { Component } from 'react';

import {  Columns ,Column,Notification,Group,Button,Modal,Content,Table,Thead,Tr,Th,Td,Tbody} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {BrowserRouter,Link,Route} from 'react-router-dom';

class allPaymet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailpayment:[],


     
    };
   
   
  }
    componentWillMount() {
    this.props.setExact(false,true);
    var userid= cookie.load('userId');
    var userType= cookie.load('userType');
    if(userType=="customer")
      {

    fetch('http://localhost:9000/detailPayment', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'user':userid})

    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      this.setState({detailpayment:data})
    })
      }else if(userType=='admin'||userType=='officer'){

    fetch('http://localhost:9000/detailPaymentOfOfficer', {
      headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
      
              },
  
      method: "POST",
      //body:  queryString.stringify({'user':userid})

  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    this.setState({detailpayment:data})
  })

  }
  
    

                      }
  deleteDetailBuyProductAll=(id)=>{
console.log(id)
                     
    fetch('http://localhost:9000/deleteDetailBuyProductAll', {
      headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
      
              },
  
      method: "POST",
      body:  queryString.stringify({'id':id})

  })
  .then((response) => response.json())
  .then((data) => {
    var data2= null
    data2=data;
    if(data2!=null){
     
      alert("ลบเสร็จแล้ว");
      window.location.reload();

    }
 
  })
  }

  render() {
    
    var userType= cookie.load('userType');
 
  if(userType=='customer'){
    
    return (
      
      <div >
    
    <Table style={{marginTop:'10px',marginLeft:'10px',width:'1000px'}}>
                    <Thead>
                        <Tr>
                        <Th>ลำดับ</Th>
                        <Th>รหัสการสั่งซื้อ</Th>
                        <Th>ราคาที่ต้องชำระ</Th>
                        <Th>จำนวนสินค้า</Th>
                      
                        <Th>-</Th>
                        <Th>-</Th>
                        </Tr>
                    </Thead>
                    <Tbody style={{color:'grey'}}>
              {
                  this.state.detailpayment.map((detailpayment,key) => 
                                                    
                                                        <Tr>
                                                        <Td><b>{key+1}</b></Td>
                                                        <Td><b>{detailpayment.id}</b></Td>
                                                        <Td><b>{detailpayment.total_count_buy_product}</b></Td>
                                                        <Td><b>{detailpayment.total_price_buy_product}</b></Td>
                                                        
                                                        <Td>
                                                        {detailpayment.id_accept_payment!=null?(<b>อัพโหลดใบแจ้งชำระแล้ว</b>):
                                                        (
                                                          <Button color="isWarning" style={{padding:'0px'}}><Link to={`/uploadPayment${detailpayment.id}`}  style={{padding:'7px',textDecoration:'none'}}>อัพโหลดหลักฐาน</Link></Button>
                                                        )
                                                        }
                                                          </Td>
                                                                  
                                                        <Td>
                                                       
                                                     
                                                          <Button color="isWarning" style={{padding:'0px'}}><Link to={`/detailPayment${detailpayment.id}`}  style={{padding:'7px',textDecoration:'none'}}>ดูรายละเอียด</Link></Button>
                                                       
                                                          </Td>
                                                          <Td><button className="btn btn-danger" onClick={()=>this.deleteDetailBuyProductAll(detailpayment.id_buy_product)}>ลบ</button></Td>
                                                        </Tr>
                                                        
                                                 
                                                 )}
                    </Tbody>
              
              </Table>
   

      </div>
    );
  }
  else if(userType=='admin'||userType=='officer'){
    return (<div>
   
   <Table style={{marginTop:'10px',marginLeft:'10px',width:'1000px'}}>
                    <Thead>
                        <Tr>
                        <Th>ลำดับ</Th>
                        <Th>รหัสการสั่งซื้อ</Th>
                        <Th>ราคาที่ต้องชำระ</Th>
                        <Th>จำนวนสินค้า</Th>
                        <Th>ชื่อลูกค้า</Th>
                        <Th>-</Th>
                        </Tr>
                    </Thead>
                    <Tbody style={{color:'grey'}}>
              {
                  this.state.detailpayment.map((detailpayment,key) => 
                                                    
                                                        <Tr>
                                                        <Td><b>{key+1}</b></Td>
                                                        <Td><b>{detailpayment.id}</b></Td>
                                                        <Td><b>{detailpayment.total_price_buy_product}</b></Td>
                                                        <Td><b>{detailpayment.total_count_buy_product}</b></Td>
                                                        <Td><b>{detailpayment.name_person}</b></Td>
                                                        <Td>
                                                        {detailpayment.id_accept_payment!=null?(<Button color="isWarning" style={{padding:'0px'}}><Link to={`/acceptPayment${detailpayment.id}`}  style={{padding:'7px',textDecoration:'none'}}>ดูรายละเอียดหลักฐาน</Link></Button>):
                                                        (
                                                          <b>ยังไม่ได้อัพโหลดหลักฐาน</b>
                                                        )
                                                        }
                                                          </Td>
                                                        </Tr>
                                                        
                                                 
                                                 )}
                    </Tbody>
              
              </Table>


   


    </div>)

  }
    else{
    return (<div><center>ยังไม่ได้ล็อกอิน</center></div>)

  }
  }
}

export default allPaymet;