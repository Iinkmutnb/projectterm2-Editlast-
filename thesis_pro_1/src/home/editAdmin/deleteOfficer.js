import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Button,Table,Thead,Tr,Th,Tbody,Td,Modal,Content} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
class deleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {product:[],checkSuccess:0,isOpen:true,userType:''}
    }
    componentWillMount() {
        var userType= cookie.load('userType');
        this.setState({userType:userType});
               
        this.props.setExact(true,true);
        fetch('http://localhost:9000/showOfficer', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'name':'*'})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
          this.setState({product: data})
          //console.log(JSON.stringify(this.state.product));
          })
         .catch(function(error) 
          {
            console.log( error.message);
          });
     

    }
    deleteProduct=(code,src)=>{
        
           fetch('http://localhost:9000/deleteOfficer', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",                  
             body:  queryString.stringify({'code':code,'Src':src})
            
           
         })
         .then((response) => response.json())
         .then((data) => {
            if(data.qreury){
                this.setState({checkSuccess:1,isOpen:true})
            } else{ this.setState({checkSuccess:2,isOpen:true})}

          })
     .catch(function(error) {console.log( error.message);});

    }
    setCloserModal=()=>{
        window.location.reload();
    }

    render() {
        if(this.state.userType=="admin"){
        return (
            <div style={{marginTop:'0px',webkitBorderRadius:' 0% 0% 100% 100% / 0% 0% 8px 8px',webkitBoxShadow: 'rgba(0, 0, 0,.30) 0 2px 3px'}}>
            <div style={{marginTop:'40px',marginLeft:'25px'}}>
            <h3 style={{color:'grey'}}>ลบพนักงาน</h3>
                
                <Table style={{marginTop:'50px'}}>
                    <Thead>
                        <Tr>
                        <Th>ลำดับ</Th>
                        <Th>รหัสพนักงาน</Th>
                        <Th>ชื่อพนักงาน</Th>
                       
                        <Th>แก้ไข</Th>
                        
                        </Tr>
                    </Thead>
                    <Tbody style={{color:'grey'}}>
              {
                  this.state.product.map((officer,key) => 
                                                        <Tr>
                                                        <Td><b>{key+1}</b></Td>
                                                        <Td>{officer.code}</Td>
                                                        <Td><b>{officer.name}</b></Td>
                                                        
                                                        <Td><Button  color="isDanger" onClick={(e)=>this.deleteProduct(officer.code,officer.image)}>ลบ</Button></Td>
                                                        </Tr>
                                                 )}
                    </Tbody>
              
              </Table>
              {this.state.checkSuccess==0?(<div></div>)
                :(<div>
                    {this.state.checkSuccess==1?
                    (<div>
                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setCloserModal()}
                        >
                        <Content>
                        ลบพนักงานเรียบร้อย
                        </Content>
                        </Modal>

                    </div>):
                    (<div>
                        <Modal
                        type="card"
                        headerContent=""
                        footerContent={<div style={{ padding: '20px'}} ></div>}
                        isActive={this.state.isOpen}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        >
                        <Content>
                        เกิดข้อผิดพลาด กรุณากดปุ่มลบพนักงานใหม่
                        </Content>
                        </Modal>
                    </div>)
                    }
                 </div>)
                }  

            </div>
            </div>
        );}
    }
}

export default deleteProduct;