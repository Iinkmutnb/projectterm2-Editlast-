import React, { Component } from 'react';

import {  Columns ,Column,Notification,Group,Button,Modal,Content,Table,Thead,Tr,Th,Td,Tbody} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {BrowserRouter,Link,Route} from 'react-router-dom';
import '../css/login/bootstrap.min.css';
import '../css/login/bootstrap.min.css';


class acceptPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      id_buy_product:'',


     
    };
   
   
  }
    componentWillMount() {
    this.props.setExact(false,true);
   // var userid= cookie.load('userId');
  var  id_buy_product=this.props.match.params.id
    
    
   

    fetch('http://localhost:9000/acceptPayment', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'id':id_buy_product})

    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      this.setState({detailpayment:data})
    })
  
    

                      }
    setAcceptPayment=(id_accept_payment)=>{

    fetch('http://localhost:9000/setAcceptPayment', {
      headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
      
              },
  
      method: "POST",
      body:  queryString.stringify({'id':id_accept_payment})

  })
  .then((response) => response.json())
  .then((data) => {
  
  })

    }


  render() {
    
    var userType= cookie.load('userType');
 
 if(userType=='admin'||userType=='officer'){
    return (<div  className='border bg-dark text-white' style={{padding:'10px',width:'85%'}}>
     
    
          
    {this.state.detailpayment!=null?(
      <table style={{width:"100%"}}>
    
        <tr>
          <td  style={{verticalAlign:'top'}}>
          <table>
          {this.state.detailpayment.map((detailpayment,key)=>
          <div>
          {key==0?( <div>
            <tr><td><p className="h2">รายละเอียดหลักฐาน</p></td></tr>
            
            <tr><td>ชื่อ (ลูกค้า): {detailpayment.name_person} {detailpayment.subname}</td></tr>
           <tr><td>{this.props.match.params.id}</td></tr>
            <tr><td>หมายเลขโทรศัพท์ : {detailpayment.phone_number}</td></tr>
            <tr><td>ระยะวลาการโอน : {detailpayment.time_transfer_accept_paymentcol}</td></tr> 
            <tr><td>จำนวนเงินที่โอน : {detailpayment.price_transfer_accept_paymentcol}</td></tr> 
            <tr><td>รูปภาพหลักฐาน ที่โอน : <br/> <img style={{width:'200px',height:'150px'}} src={require('../../home/picture/payment/'+detailpayment.picture_payment)} alt={detailpayment.picture_payment} /></td></tr> 
            <tr><td><Button  onClick={()=>this.setAcceptPayment(detailpayment.id_accept_payment)}>ยืนยัน</Button> </td></tr> 
            
          
            </div>):(<div></div>)
            }
          </div>
          )}
          </table>
            
          </td>
          <td  style={{verticalAlign:'top'}}>
              <table style={{ width:"100%"}}>
              <tr><td colSpan={2}><p className="h2">สินค้าที่ลูกค้าซื้อ</p></td></tr>
              {this.state.detailpayment.map((detailpayment,key)=><div>
               
                <tr>
                  <td style={{verticalAlign:'top'}} > {key+1}.</td>
                  <td ><img  style={{width:'200px',height:'150px'}} src={require('../../home/picture/product/'+detailpayment.Src)}/></td>
                  <td style={{verticalAlign:'top'}} >
                  <table >
                  <tr ><td style={{paddingTop:"10%",paddingLeft:"2%"}}>ชื่อสินค้า : {detailpayment.name}</td></tr>
                      <tr><td style={{paddingTop:"10%"}}>ราคา : {detailpayment.Price}</td></tr>
                      <tr><td style={{paddingTop:"10%"}}>จำนวน : {detailpayment.count_product}</td>
                  </tr>
                    </table>
                    </td>
                </tr>
              
                  </div>
                
              
                  )
                  
                  }
                
                </table>
          </td>
        </tr>
        </table>):(<div></div>)

    }
  


    </div>)

  }
    else{
    return (<div><center>ยังไม่ได้ล็อกอิน</center></div>)

  }
  }
}

export default acceptPayment;
/*
 <table >
   <tr>
     <td>รูปสินค้า</td><td>รายละเอียด</td><td>ราคา</td><td>จำนวน</td>
   </tr>
    
     {this.state.detailpayment.map((detailpayment)=>
     <tr>
       <td>
     <img  style={{width:'200px',height:'150px'}} src={require('../../home/picture/product/'+detailpayment.Src)}/>
     </td>
     <td>{detailpayment.Des}</td>
     <td>{detailpayment.Price}</td>
     <td>{detailpayment.count_product}</td>
     </tr>
     )
     
     }
   
   </table>
    
 
*/ 