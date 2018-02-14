import React, { Component } from 'react';
import queryString from 'query-string';

import {Hero,Nav,Container,HeroBody,Box,Label,Button,Columns,Column,Notification,Table,Tbody,Tr,Td}  from 're-bulma';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
class detaliCustomer extends Component {
    constructor(props) {
      super(props);
      this.state = {
         user:'', 
         name:'',
         subname:'',
         email:'',
         phone:'',
         address:'',
         userType:''
      };
     
     
    }
    
    componentWillMount() {
     
        var userid= cookie.load('userId');
        var userType= cookie.load('userType');
        console.log(userid)
        this.setState({userType:userType})
    
      this.props.setExact(false,true);
      fetch('http://localhost:9000/detailCustomer', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'user':userid})

    })
    .then((response) => response.json())
    .then((data) => {this.setState({  user:data.user, name:data.name,subname:data.subname,
                    email:data.email,
                    phone:data.phone,
                    address:data.address})
    })
    
    }
   
    
  

    render() {
      
        return (
        <div >
          <Hero  style={{height:'680px'}} >
               
      
                    <HeroBody>
                    <Container >
                        <Box>
                          <Notification >
                          <Container hasTextCentered>
                          <h2>
                          {this.state.userType=="admin"?(<div>
                            ข้อมูลแอดมิน
                            </div>):(<div>ข้อมูลผู้ใช้</div>)}
                            </h2>
                          </Container>
                              <Table>
                                  <Tbody>
                                    <Tr><Td><Label>ชื่อ : </Label></Td><Td> <Label> {this.state.name}</Label></Td></Tr>
                                    <Tr><Td><Label>นามสกุล : </Label></Td><Td> <Label> {this.state.subname}</Label></Td></Tr>
                                    <Tr><Td><Label>เบอร์โทรศัพท์ : </Label></Td><Td> <Label> {this.state.phone}</Label></Td></Tr>
                                    <Tr><Td><Label>อีเมล : </Label></Td><Td> <Label> {this.state.email}</Label></Td></Tr>
                                    <Tr><Td><Label>ที่อยู่ : </Label></Td><Td> <Label> {this.state.address}</Label></Td></Tr>
                                    <Tr><Td><Label>ชื่อผู้ใช้ : </Label></Td><Td> <Label> {this.state.user}</Label></Td></Tr>
                                  </Tbody>
                             </Table>
                             <Container hasTextCentered>
                             <Button color="isPrimary"> <Link to="/editCustomer" style={{padding:'7px',textDecoration: 'none'}} >แก้ไข </Link></Button>
                             </Container>
          </Notification>
               </Box>
                </Container>
            </HeroBody>
          
            </Hero> 
                </div>
                )}}

export default detaliCustomer;
