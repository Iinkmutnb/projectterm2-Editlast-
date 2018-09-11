import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Tr,Th,Thead,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class connectAdmin extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
       
      
        userType:'',
        id_buy_product:'',
        id_connect:'',
        date_sent:'',
        connect:'',
        date: date,
        check:1

                        }
       
    }
    
    componentDidMount() {
        
        this.props.setExact(true,true,2);
    }
   
    componentWillMount() {
        console.log(this.props.match.params.id)
        this.props.setExact(true,true,2);
        var userType= cookie.load('userType');
        this.setState({userType:userType});
    
       
       fetch('http://localhost:9000/selectConnect', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id':1})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
         this.setState({connect:data})
         
    
    
    
    
        
        })
       
        

    }

  


    render() {
      
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
                 <div style={{marginTop:'40px',marginLeft:'25px'}}>
              
             
                <Table style={{marginTop:'0px'}}>
                    <Thead>
                        <Tr>
                        <Th></Th>
                        <Th>รหัสสั่งซื้อ</Th>
                        <Th>วันที่ส่ง(ปี-เดือน-วัน)</Th>
                        <Th>ตอบกลับ</Th>
                        
                        
                        </Tr>
                    </Thead>
                   
                    {this.state.connect!=''?( <Tbody style={{color:'grey'}}>
                    {
    this.state.connect.map((connect,key) => 
    
        <Tr>
        <Td><b>{key+1}</b></Td>
        <Td><b>{connect.id_buy_product}</b></Td>
        <Td><b>{this.state.date}</b></Td>
        <Td><Button color="isWarning" style={{padding:'0px'}}><Link to={`/editAdmin/connectAdmins/connectAdminBack${connect.idconnect}`}  style={{padding:'7px',textDecoration:'none'}}>ตอบกลับ</Link></Button></Td>
        </Tr>
        
 
 )}</Tbody>):(<Tbody></Tbody>)}
     
                    
              
              </Table>
              </div>


            </div>
        );}
    }
}

export default connectAdmin;
//{ this.props.match.params.id}

/*      {
    this.state.product.map((product,key) => 
    
        <Tr>
        <Td><b>{key+1}</b></Td>
        <Td><b>{product.code}</b></Td>
        <Td><b>{product.name}</b></Td>
        <Td><Button color="isWarning" style={{padding:'0px'}}><Link to={`/editAdmin/product/edits${product.code}`}  style={{padding:'7px',textDecoration:'none'}}>แก้ไข</Link></Button></Td>
        </Tr>
        
 
 )}
 */
