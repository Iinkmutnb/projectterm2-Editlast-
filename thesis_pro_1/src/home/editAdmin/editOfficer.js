import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Button,Table,Thead,Tr,Th,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
class editOfficer extends Component {
    constructor(props) {
        super(props);
        this.state = {product:[],userType:''}
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
         console.log(data)
          })
         .catch(function(error) 
          {
            console.log( error.message);
          });
     

    }

    render() {
        if(this.state.userType=="admin"){
        return (
            <div style={{marginTop:'0px',webkitBorderRadius:' 0% 0% 100% 100% / 0% 0% 8px 8px',webkitBoxShadow: 'rgba(0, 0, 0,.30) 0 2px 3px'}}>
            <div style={{marginTop:'40px',marginLeft:'25px'}}>
            <h3 style={{color:'grey'}}>แก้ไขพนักงาน</h3>
                <Table >
                    <Thead>
                        <Tr>
                        <Th>ลำดับ</Th>
                        <Th>รหัสพนักงาน</Th>
                        <Th>ชื่อพนักงาน</Th>
                        <Th>รูป</Th>
                        <Th>แก้ไข</Th>
                        
                        </Tr>
                    </Thead>
                    <Tbody style={{color:'grey'}}>
              {
                  this.state.product.map((product,key) => 
                                                    
                                                        <Tr>
                                                        <Td><b>{key+1}</b></Td>
                                                        <Td><b>{product.code}</b></Td>
                                                        <Td><b>{product.name}</b></Td>
                                                        <Td>-</Td>
                                                        <Td><Button color="isWarning" style={{padding:'0px'}}><Link to={`/editAdmin/officer/editsOfficer${product.code}`}  style={{padding:'7px',textDecoration:'none'}}>แก้ไข</Link></Button></Td>
                                                        </Tr>                                                           
                                                        
                                                 
                                                 )}
                    </Tbody>
              
              </Table>

            </div>
            </div>
        );}
    }
}

export default editOfficer;