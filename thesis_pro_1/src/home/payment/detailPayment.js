import React, { Component } from 'react';

import {  Columns ,Column,Notification,Group,Content} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {BrowserRouter,Link,Route} from 'react-router-dom';
import '../css/login/bootstrap.min.css';
import './detailPayment.css'
import {Modal,Button,Popover,Tooltip}  from 'react-bootstrap';


class detailPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //detailpayment:'',
     show:false,
     id_detail_buy_product:'',
     countProduct:0,
    };
   
   
  }
    componentWillMount() {
  
      
    this.props.setExact(false,true);
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
                   
  handleClose=()=> {
    this.setState({ show: false });
  }

  handleShow=()=> {
    this.setState({ show: true });
  }
  deleteDetailBuyProduct=(id)=>{
    console.log(id)
    fetch('http://localhost:9000/deleteDetailBuyProduct', {
      headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
      
              },
  
      method: "POST",
      body:  queryString.stringify({'id_detail_buy_product':id})

  })
  .then((response) => response.json())
  .then((data) => {
    var data2= null
    data2=data;
    if(data2!=null){
      this.setState({ show: false });
      alert("ลบเสร็จแล้ว");
      window.location.reload();

    }
    
  })

  }
  insertCountDetailBuyProduct=()=>{
    console.log(this.state.id_detail_buy_product,this.state.countProduct)
    //this.setState({id_detail_buy_product:detailpayment.id_detail_buy_product,show: true})
    

    fetch('http://localhost:9000/insertCountDetailBuyProduct', {
      headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
      
              },
  
      method: "POST",
      body:  queryString.stringify({'id_detail_buy_product':this.state.id_detail_buy_product,'count_product':this.state.countProduct})

  })
  .then((response) => response.json())
  .then((data) => {
    var data2= null
    data2=data;
    if(data2!=null){
      this.setState({ show: false });
      alert("แก้ไขเสร็จแล้ว");
      window.location.reload();

    }
    
  })

  }

 

  render() {
    
    var userType= cookie.load('userType');

  
 
  if(userType=='customer'){
    
    return (
      <div >




  <Modal  className="modal-dialog"
  show={this.state.show} onHide={this.handleClose}
  >
    <Modal.Header>
      <Modal.Title>แก้ไขจำนวนินค้า</Modal.Title>
    </Modal.Header>

    <Modal.Body> จำนวนสินค้า:<input className="form-control text-success" onChange={(e) =>   this.setState({countProduct:e.target.value})} type="number" value={this.state.countProduct} id="example-number-input"/></Modal.Body>

    <Modal.Footer>
      
      <Button bsStyle="primary" onClick={this.insertCountDetailBuyProduct}>แก้ไข</Button>
      <Button onClick={this.handleClose}>ยกเลิก</Button>
    </Modal.Footer>
  </Modal>











{this.state.detailpayment!=null?(

  <table style={{ width:"100%"}}>
              <tr><td colSpan={5}><p className="h2">สินค้าที่ลูกค้าซื้อ</p></td></tr>
              {this.state.detailpayment.map((detailpayment,key)=>
               <tr >
               <td  style={{verticalAlign:'top'}} > {key+1}.</td>
                  <td ><img  style={{width:'200px',height:'150px'}} src={require('../../home/picture/product/'+detailpayment.Src)}/></td>
                  <td style={{paddingTop:"10%"}}>ราคา : {detailpayment.Price}</td>
                  <td style={{paddingTop:"10%"}}>จำนวน : {detailpayment.count_product}
                  <button type="button" className="btn btn-default" onClick={() =>   this.setState({id_detail_buy_product:detailpayment.id_detail_buy_product,show: true,countProduct:detailpayment.count_product})} ><span className="glyphicon glyphicon-pencil"></span></button> 
                     </td>
                  <td style={{paddingTop:"10%"}}><button className="btn btn-danger" onClick={()=>this.deleteDetailBuyProduct(detailpayment.id_detail_buy_product)}>ลบสินค้า</button></td>
               </tr>
       
                 
                
              
                  )
                  
                  }
   
                
                </table>
                
                


)


:(<div></div>)
}
      </div>
    );
  }
  }
}


export default detailPayment;
/*

 <button type="button" className="btn btn-default" data-toggle="modal" data-target="#exampleModal"><span className="glyphicon glyphicon-pencil"></span></button> 

 <div style={{  position:" absolute", top: "50%",left: "50%",transform: "translate(-50%, -50%)"}} className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
   
    </div>
    <div className="modal-body">
      ...
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary">Save changes</button>
    </div>
  </div>
</div>
</div>



*/