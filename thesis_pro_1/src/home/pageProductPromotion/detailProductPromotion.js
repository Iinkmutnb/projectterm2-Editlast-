import React, { Component } from 'react';

import {Table,Td,Thead,Tr,Th,Tbody,Button} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import  '../../home/css/pageProductPromotion/detailProductPromotion.css';

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
                        <Td>{key+1}</Td>  <Td>{product.code_product}</Td> <Td>{product.name}</Td> <Td><Button>ดูลายละเอียด</Button></Td> <Td><Button>แก้ไข</Button></Td> <Td><Button>ลบ</Button></Td>
                        </Tr>)}
                    
                     </Tbody>):(<div style={{marginTop:'15px'}}>ยังไม่มีสินค้าที่จัดโปรโมชั่น</div>)}
               </Table>
            </div>
        );}
    }
}

export default detailProductPromotion;
