import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Button,Table,Thead,Tr,Th,Tbody,Td,Modal,Content,Columns,Column} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
class chageStatusProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {product:[],checkSuccess:0,isOpen:false,isOpenSuccess:false,isOpenNoSuccess:false,prodcutChageCode:'',Src:'',name:'',price:'',status:'',chageStatus:'',userType:''}
    }
    componentWillMount() {
        var userType= cookie.load('userType');
        this.setState({userType:userType});
               
        this.props.setExact(true,true);
        fetch('http://localhost:9000/showProduct', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'name':'*'})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
          this.setState({product: data})
         
          })
         .catch(function(error) 
          {
            console.log( error.message);
          });
     

    }
    setChageStatus=(event)=>{
        this.setState({chageStatus: event.target.value});
        
    }
    chageStatus=()=>{

        if(this.state.chageStatus==""){    this.setState({chageStatus:this.state.status});}
        console.log(this.state.chageStatus)
        console.log(this.state.prodcutChageCode)
        fetch('http://localhost:9000/chageStatusProduct', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",                  
             body:  queryString.stringify({'code':this.state.prodcutChageCode,'chageStatus':this.state.chageStatus})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
            if(data.qreury)this.setState({isOpenSuccess:true})
            else {this.setState({isOpenSuccess:false})}
            
          })
     .catch((error)=> {this.setState({isOpenNoSuccess:true})});
        
    }
    showChageStatus=(code,src,name,price,status)=>{
     
this.setState({isOpen:true,prodcutChageCode:code,Src:src,name:name,price:price,status:status,chageStatus:status})

    }
    setCloserModal=()=>{
        window.location.reload();
        this.setState({isOpen:false,isOpenSuccess:false,isOpenNoSuccess:false})
    }

    render() {
        if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div style={{marginTop:'0px',webkitBorderRadius:' 0% 0% 100% 100% / 0% 0% 8px 8px',webkitBoxShadow: 'rgba(0, 0, 0,.30) 0 2px 3px'}}>
            <div style={{marginTop:'40px',marginLeft:'25px'}}>
            <h3 style={{color:'grey'}}>เปลี่ยนสถานะสินค้า</h3>
                <Table >
                    <Thead>
                        <Tr>
                        <Th>ลำดับ</Th>
                        <Th>รหัสสินค้า</Th>
                        <Th>ชื่อสินค้า</Th>
                        <Th>สถานะ</Th>
                        <Th>แก้ไข</Th>
                        
                        </Tr>
                    </Thead>
                    <Tbody style={{color:'grey'}}>
              {
                  this.state.product.map((product,key) => 
                                                        <Tr>
                                                        <Td><b>{key+1}</b></Td>
                                                        <Td>{product.code}</Td>
                                                        <Td><b>{product.name}</b></Td>
                                                        <Td><b>{product.status}</b></Td>
                                                        
                                                        <Td><Button  color="isDanger" onClick={(e)=>this.showChageStatus(product.code,product.Src,product.name,product.price,product.status)}>เปลี่ยนสถานะ</Button></Td>
                                                        </Tr>
                                                 )}
                    </Tbody>
              
              </Table>
            <div>
                        <Modal
                        type="card"
                        headerContent="เปลี่ยนสถานะ"
                        footerContent={<div style={{ padding: '20px'}} >   <Button color="isSuccess" onClick={this.chageStatus}>
                                                                        <b > ยืนยัน</b></Button><Button  color="isPrimary" onClick={this.setCloserModal}>
                                                                        <b > ยกเลิก</b></Button></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setCloserModal()}
                        >
                        <Content>
                        <Columns>
                        <Column>
                        <table>
                            <tr><td><h3>ลินค้ารหัส : </h3></td><td><h3> {this.state.prodcutChageCode}</h3></td></tr>
                            <tr><td>ชื่อ:</td><td>{this.state.name}</td></tr>
                            <tr><td>ราคา:</td><td>{this.state.price}</td></tr>
                            <tr><td>สถานะ:</td><td>{this.state.status}</td></tr>
                        <tr><td>เปลี่ยนสถานะ:</td><td>
                        <select value={this.state.chageStatus} onChange={this.setChageStatus}>
                            <option value="ขาย" selected={this.state.status== "ขาย"}>ขาย</option>
                            <option value="ยกเลิกขาย" selected={this.state.status== "ยกเลิกขาย"}>ยกเลิกขาย</option>
                        </select>
                        </td></tr>
                        </table>
                        </Column>
                        <Column>
                        <table><tr><td> {this.state.Src!=""?(<div><img style={{width:'220px',height:'250px'}} src={require("../../home/picture/product/"+this.state.Src)} /></div>):(<div></div>)}</td></tr></table>
                        </Column>
                        </Columns>
                        </Content>
                        </Modal>

                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div> </div>}
                        isActive={this.state.isOpenSuccess}
                        onCloseRequest={() => this.setCloserModal()}
                        >
                        <Content>
                        แก้ไขสถานะเรียบร้อย
                        </Content>
                        </Modal>


                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div> </div>}
                        isActive={this.state.isOpenNoSuccess}
                        onCloseRequest={() => this.setCloserModal()}
                        >
                        <Content>
                        เกิดข้อผิดพลาดกรุณาลองใหม่
                        </Content>
                        </Modal>

                    </div>
               

            </div>
            </div>
        );}
    }
}

export default chageStatusProduct;