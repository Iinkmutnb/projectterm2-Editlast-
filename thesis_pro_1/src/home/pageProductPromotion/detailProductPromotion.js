import React, { Component } from 'react';

import {Table,Td,Thead,Tr,Th,Tbody,Button,Modal,Content,Label,Addons,Input} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import  '../../home/css/pageProductPromotion/detailProductPromotion.css';
import SHOW_MODAL_PROMOTION from '../../home/head/showModalPromotion';
import Search from 'react-search'
//import DatePicker from 'react-datepicker';
import moment from 'moment';
//import 'react-datepicker/dist/react-datepicker.css';
class detailProductPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
       
        detailBuyProduct:'',
        detailBuyProduct2:'',
        userType:'',
     
        
        prductCode:'',
        idPromotion:'',
       
        prodductCodeDetail:'',
        startDate:'',
        endDate:'',
        showModalInsert:false,
        showModalSucessInsert:false,
        showModalFailInsert:false,
       
        productName:'',
        discountPro:'',
        checkInsertDelte:true,
        showModalEdit:false,
        startDateEdit:'',
        endDateEdit:'',
        discountEdit:'',
        showModalDelete:'',
       

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
        
        this.setState({detailBuyProduct:data,detailBuyProduct2:data})
      
      })
      
       
        

    }
    deleteProductPromotoin=()=>{
       
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
            if(data.qreury==undefined){
                
               this.setState({showModalSucessInsert:true,showModalDelete:false});
              
              }
              else {
               this.setState({showModalFailInsert:true,showModalDelete:false});
               
              }
           
          
         
          })

    }
   
    
  
    
  
 
    insert=()=>{
     
        if(this.state.discountPro!=''&&this.state.startDate!=''&&this.state.endDate!=''){
            
            fetch('http://localhost:9000/insertProductPromotion', {
                headers: {
                          'Content-Type':'application/x-www-form-urlencoded'
              
                         },
             
             
                 method: "POST",
                 body:  queryString.stringify({'idProduct':this.state.prductCode,'discount':this.state.discountPro,'start':this.state.startDate,'end':this.state.endDate})
                
               
             })
             .then((response) => response.json())
             .then((data) => {
             
               if(data.qreury==undefined){
                 
                this.setState({showModalSucessInsert:true,showModalInsert:false});
               
               }
               else {
                this.setState({showModalFailInsert:true,showModalInsert:false});
                
               }
             })

        }
        else{
           this.setState( {checkInsertDelte:false});
        }

    }
    closeModalInsert=()=>{
        window.location.reload();
    }
    editPro=()=>{
        console.log(this.state.startDateEdit)
        console.log(this.state.endDateEdit)
        console.log(this.state.discountEdit)
        console.log(this.state.idPromotion)
        console.log(this.state.prductCode)
        
        
        if(this.state.discountEdit!=''&&this.state.startDateEdit!=''&&this.state.endDateEdit!=''){
           this.setState({checkDiscout:0})
           fetch('http://localhost:9000/editDetailProductPromotion', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'idPromotion':this.state.idPromotion,'idProduct':this.state.prductCode,'discount':this.state.discountEdit,'start':this.state.startDateEdit,'end':this.state.endDateEdit})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
            if(data.qreury==undefined){
               
               this.setState({showModalSucessInsert:true,showModalEdit:false});
              
              }
              else {
               this.setState({showModalFailInsert:true,showModalEdit:false});
               
              }
          
           
          
         
          })
        }
        else{
            this.setState({checkInsertDelte:false})
            
        }
    }

       
      serch=(e)=>{

var e=e.target.value.toUpperCase()

const x = this.state.detailBuyProduct2.filter(product =>
    product.name.toUpperCase().indexOf(e) != -1
    
);
this.setState({detailBuyProduct:x})
console.log(x)

      }

    
  
    


    render(){
      var start='T';
      var end='T';
      var startEdit='';
      var endEdit='';
      let  items=this.state.detailBuyProduct
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
               
                <div style={{fontSize: '40px',padding:'10px',color:"grey"}}><center>จัดการสินค้าโปรโมชั่น</center></div>
                <Addons color="isInfo">
  <Input placeholder="ค้นหาชื่อสินค้า" onChange={this.serch}/>
  <Button >ค้นหา</Button>
</Addons>
        
              
               <Table style={{marginTop:'25px'}}>
                <Thead>
                    <Tr>
                    <Th>ลำดับ</Th>
                    
                    <Th>ชื่อสินค้า</Th>
                    <Th>รูป</Th>
                    <Th>ส่วนลด</Th>
                    <Th>วันที่เริ่ม (เดือน/วัน/ปี)</Th>
                    <Th>วันที่สิ้นสุด (เดือน/วัน/ปี)</Th>
                    <Th>เพิ่ม/แก้ไช</Th>
                    </Tr>
                </Thead>
                {this.state.detailBuyProduct!=''?( <Tbody>
                    {this.state.detailBuyProduct.map((product,key) =><Tr>
                      <div style={{display:' none'}}>  {product.start_promotioncol!=null?(start=product.start_promotioncol):(start="T")}</div>
                      <div style={{display:' none'}}>  {product.end_promotioncol!=null?(end=product.end_promotioncol):(end="T")}</div> 
                      
                        <Td>{key+1}</Td>
                        <Td>{product.name}</Td>
                        
                        <Td><img style={{width:'150px',height:'150px'}} src={require('../../home/picture/product/'+product.Src)}/></Td>
                        {product.id_product_promotion!=null?(<Td>{product.promotion_discount}%</Td>):(<Td></Td>)}
                        {product.id_product_promotion!=null?(<Td><input type="text"  disabled="disabled"   value={start.split("T")[0]}/></Td>):(<Td>ยังไม่มีโปรโมชั่น</Td>)}  
                        {product.id_product_promotion!=null?(<Td><input type="text"  disabled="disabled"  value={end.split("T")[0]}/></Td>):(<Td>ยังไม่มีโปรโมชั่น</Td>)}
                        {product.id_product_promotion!=null?(<Td>  <Button state="isActive" color="isPrimary" onClick={()=>this.setState({showModalEdit:true,prductCode:product.code,productName:product.name,idPromotion:product.id_product_promotion,startDateEdit:product.start_promotioncol,endDateEdit:product.end_promotioncol,discountEdit:product.promotion_discount})}>แก้ไข</Button> <Button onClick={()=>this.setState({showModalDelete:true,productName:product.name,idPromotion:product.id_product_promotion})} state="isActive" color="isPrimary">ลบ</Button> </Td>):(<Td><Button onClick={() => this.setState({ showModalInsert: true,prductCode:product.code,productName:product.name,idPromotion:product.idPromotion})} state="isActive" color="isPrimary">เพิ่ม</Button> </Td>)}
                        
                       
                        

                 </Tr>)}
                    
                     </Tbody>):(<div></div>)}
               </Table>
           
           <Modal 
                    type="card"
                    headerContent={<center>{this.state.productName}</center>}
                    footerContent={<div style={{ padding: '20px'}} >เพิ่มโปรโมชั่นสินค้า</div>}
                    isActive={this.state.showModalInsert}
                    onCloseRequest={() => this.setState({ showModalInsert: false,discountPro:'',startDate:'',endDate:'' })}
                    >
                    <Content style={{height:'300px'}}>
                        <center>
                            <table>
                                <tr>
                                    <td>ส่วนลด :</td> 
                                    <td><input placeholder="0-100%"  onChange={(e) => this.setState({ discountPro: e.target.value })} style={{width:'200px'}} type="number"  step={1} max="100" min="0" /></td>
                                </tr>
                                <tr >
                                    <td style={{paddingTop:"10px"}}>วันที่เริ่ม :</td> 
                                    <td><input type="date"    onChange={(e) => this.setState({ startDate: e.target.value })}/></td>
                                </tr>  
                                <tr>
                                    <td style={{paddingTop:"10px"}}>วันที่สิ้นสุด :</td> 
                                    <td><input type="date"  placeholderText="MM/DD/YYYY"   onChange={(e) => this.setState({ endDate: e.target.value })}/></td>
                                </tr> 
                                                     
                            </table>
                            <center style={{marginTop:"10px"}}>{this.state.checkInsertDelte?(<div></div>):(<div style={{color:"red"}}>กรุณาใส่ข้อมูลให้ครบ</div>)}</center>
                        </center>
                       <center style={{marginTop:"10px"}}> <Button onClick={this.insert}>ยืนยัน</Button> <Button onClick={() => this.setState({ showModalInsert: false,discountPro:'',startDate:'',endDate:'' })}>ยกเลิก</Button></center>
           </Content>
           </Modal>
           <Modal
                    type="card"
                    headerContent=""
                    footerContent={<div style={{ padding: '20px'}} ></div>}
                    isActive={this.state.showModalSucessInsert}
                    onCloseRequest={this.closeModalInsert}
                    >
                    <Content>
                        <center>
                         ข้อมูลสำเร็จ
                          </center>
           </Content>
           </Modal>
      
           <Modal
                    type="card"
                    headerContent=""
                    footerContent={<div style={{ padding: '20px'}} ></div>}
                    isActive={this.state.showModalFailInsert}
                    onCloseRequest={this.closeModalInsert}
                    >
                    <Content>
                        <center>
                           เกิดช้อผิดพลาด
                          </center>
           </Content>
           </Modal>
           <Modal 
                    type="card"
                    headerContent={<center>แก้ไขโปรโมชั่นสินค้า{this.state.productName}</center>}
                    footerContent={<div style={{ padding: '20px'}} ></div>}
                    isActive={this.state.showModalEdit}
                    onCloseRequest={() => this.setState({ showModalEdit: false,discountPro:'',startDate:'',endDate:'' })}
                    >
                    <Content style={{height:'300px'}}>
                        <center>
                            <table>
                                <tr>
                                    <td>ส่วนลด :</td> 
                                    <td><input placeholder="0-100%"  value={this.state.discountEdit} onChange={(e) => this.setState({ discountEdit: e.target.value })} style={{width:'200px'}} type="number"  step={1} max="100" min="0" /></td>
                                </tr>
                                <tr >
                                    <td style={{paddingTop:"10px"}}>วันที่เริ่ม (เดือน/วัน/ปี) :</td> 
                                    <div style={{display:' none'}}>  {this.state.startDateEdit!=null?(startEdit=this.state.startDateEdit):(startEdit="T")}</div>
                                    <td><input type="date"    value={startEdit.split("T")[0]}  onChange={(e) => this.setState({ startDateEdit: e.target.value })}/></td>
                                </tr>  
                                <tr>
                                    <td style={{paddingTop:"10px"}}>วันที่สิ้นสุด (เดือน/วัน/ปี) :</td> 
                                    <div style={{display:' none'}}>  {this.state.endDateEdit!=null?(endEdit=this.state.endDateEdit):(endEdit="T")}</div>
                                    <td><input type="date"   value={endEdit.split("T")[0]} onChange={(e) => this.setState({ endDateEdit: e.target.value })}/></td>
                                </tr> 
                                                     
                            </table>
                            <center style={{marginTop:"10px"}}>{this.state.checkInsertDelte?(<div></div>):(<div style={{color:"red"}}>กรุณาใส่ข้อมูลให้ครบ</div>)}</center>
                        </center>
                       <center style={{marginTop:"10px"}}> <Button onClick={this.editPro}>ยืนยัน</Button> <Button onClick={() => this.setState({ showModalEdit: false,discountEdit:'',startDateEdit:'',startDateEdit:'' })}>ยกเลิก</Button></center>
           </Content>
           </Modal>
           <Modal
                    type="card"
                    headerContent={<center>ลบข้อมูลสินค้า </center>}
                    footerContent={<div style={{ padding: '20px'}} ></div>}
                    isActive={this.state.showModalDelete}
                    onCloseRequest={() => this.setState({ showModalDelete: false,discountEdit:''})}
                    >
                    <Content>
                        <center>คุณต้องการลบสินค้า "{this.state.productName}" ใช่ไหม</center>
                        <center style={{marginTop:"10px"}}> <Button onClick={this.deleteProductPromotoin}>ใช่</Button> <Button onClick={() => this.setState({ showModalEdit: false})}>ไม่ใช่</Button></center>
                         
           </Content>
           </Modal>
           
            </div>
        );}
    }
}

export default detailProductPromotion;
//<Td><Button onClick={()=>this.showModalSubmit(product.code,product.id_product_promotion)}>ลบ</Button></Td>
/*
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
*/
/*
    <Link to="/editAdmin/addDetailProductPromotion" className="button button-primary button-small">เพิ่มโปรโมชั่นสินค้า</Link><Link to="/editAdmin/addDetailProductPromotion" className="button button-square  button-primary button-small"><i className="fa fa-plus"></i></Link>
               <Link style={{marginLeft:"20px"}} to="/editAdmin/addDetailProductPromotion" className="button button-primary button-small">แก้ไข</Link>
*/