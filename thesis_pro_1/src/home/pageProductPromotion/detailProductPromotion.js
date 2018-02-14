import React, { Component } from 'react';

import {Table,Td,Thead,Tr,Th,Tbody,Button,Modal,Content,Label} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import  '../../home/css/pageProductPromotion/detailProductPromotion.css';
import SHOW_MODAL_PROMOTION from '../../home/head/showModalPromotion';


class detailProductPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        detailBuyProduct:'',
        userType:'',
        nameCustomer:'',
        subName:'',
        address:'',
        phone:'',
        showModalSubmit:false,
        showModalDeleteSuccess:false,
        prductCode:'',
        idPromotion:'',
        showModalDetailProduct:false,
        prodductCodeDetail:'',


                        }
       
    }
    componentDidMount() {
        
        this.props.setExact(true,true,2);
    }
    componentWillMount() {
        
        var userType= cookie.load('userType');
        this.setState({userType:userType});
       // this.props.setExact(true,true,2);
       fetch('http://localhost:9000/detailProductPromotion', {
        headers: {
                  'Content-Type':'application/x-www-form-urlencoded'
      
                 },
     
     
         method: "POST",
         body:  queryString.stringify({'promotion':'*'})
        
       
     })
     .then((response) => response.json())
     .then((data) => {console.log(data)
        this.setState({detailBuyProduct:data})
      
        
      })
      
       
        

    }
    deleteProductPromotoin=()=>{
        this.setState({showModalSubmit:false})
        console.log(this.state.idPromotion)
       fetch('http://localhost:9000/deleteDetailProductPromotion', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'idPromotion':this.state.idPromotion})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
            window.location.reload();
           
          
         
          })

    }
    showModalSubmit=(code,idPromotion)=>{
      
          this.setState({showModalSubmit:true,prductCode:code,idPromotion:idPromotion})
       
    }
    closeModalSubmit=()=>{
    
        this.setState({showModalSubmit:false})
    }
    showDetail=(code)=>{

  
     
        fetch('http://localhost:9000/selectOneProdcutPromotionPageProductPro', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'code':code})
            
           
         })
         .then((response) => response.json())   
         .then((data) => {
       
            this.setState({showModalDetailProduct:true,prodductCodeDetail:data})
      
         
          })

    }
    closeModalDetail=()=>{
        this.setState({showModalDetailProduct:false})
    }


    render() {
      
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
               <Link to="/editAdmin/addDetailProductPromotion" className="button button-primary button-small">เพิ่มโปรโมชั่นสินค้า</Link><Link to="/editAdmin/addDetailProductPromotion" className="button button-square  button-primary button-small"><i className="fa fa-plus"></i></Link>
               <Table style={{marginTop:'25px'}}>
                <Thead>
                    <Tr>
                    <Th>ลำดับ</Th>
                    <Th>รหัสสินค้า</Th>
                    <Th>ชื่อสินค้า</Th>
                    <Th>รายละเอียด</Th>
                    <Th>แก้ไข</Th>
                    <Th>ลบ</Th>
                    </Tr>
                </Thead>
                {this.state.detailBuyProduct!=''?( <Tbody>
                    {this.state.detailBuyProduct.map((product,key) =><Tr>
                        <Td>{key+1}</Td>  <Td>{product.code_product}</Td> <Td>{product.name}</Td> <Td><Button onClick={()=>this.showDetail(product.code_product)}>ดูรายละเอียด</Button></Td> 
                        <Td><Button style={{padding:'0px'}}><Link style={{padding:'6px'}} to={"/editAdmin/editDetailProductPromotion"+product.id_product_promotion} >แก้ไข</Link></Button></Td> <Td><Button onClick={()=>this.showModalSubmit(product.code,product.id_product_promotion)}>ลบ</Button></Td>
                        </Tr>)}
                    
                     </Tbody>):(<div style={{marginTop:'15px'}}>ยังไม่มีสินค้าที่จัดโปรโมชั่น</div>)}
               </Table>
               <Modal
                    type="card"
                    headerContent=""
                    footerContent={<div style={{ padding: '20px'}} ></div>}
                    isActive={this.state.showModalSubmit}
                    onCloseRequest={this.closeModalSubmit}
                    >
                    <Content>
                        <center>คุณต้องการลบโปรโมชั่น<div style={{fontWeight:' bold'}}>รหัสสินค้า {this.state.prductCode}</div> หรือไม่?</center>
                       <center> <Button onClick={()=>this.deleteProductPromotoin()}>ใช่</Button> <Button onClick={this.closeModalSubmit}>ไม่</Button></center>
           </Content>
           </Modal>
           {this.state.prodductCodeDetail!=''?(<div>
           <SHOW_MODAL_PROMOTION showModal={this.state.showModalDetailProduct} dataModal={this.state.prodductCodeDetail} setFalseShowModal={this.closeModalDetail} />
       </div> ):(<div></div>)}
            </div>
        );}
    }
}

export default detailProductPromotion;
