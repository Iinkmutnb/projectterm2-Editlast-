import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Thead,Tr,Th,Td,Tbody} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import {Link} from 'react-router-dom';

import queryString from 'query-string';
class Review extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       
        this.state = {review:'', date: date,
    
                        }
       
    }
    componentDidMount() {  this.props.setExact(false,true);
    }
    componentWillMount() {
        var userType= cookie.load('userType');
        this.setState({userType:userType});
               
        this.props.setExact(false,true);
            
       fetch('http://localhost:9000/selectReview', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'id':"-"})

    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
     this.setState({review:data})
     




    
    })
     

    }
    setCloserModal=()=>{
        
         window.location.reload();
     }


  
    
   
 


    render() {
        if(this.state.userType=="customer"){
        return (
            <div>
                <table style={{marginTop:'40px',marginLeft:'25px'}}>
                    <tr><td>
             <Button color="isInfo" ><Link to="/insertReview" style={{padding:'7px',textDecoration:'none'}}>สร้างการรีวิว</Link></Button>
            </td></tr>
            <tr><td>&nbsp;</td></tr>
             </table>
             <Table style={{marginTop:'0px'}}>
                    <Thead>
                        <Tr>
                        <Th></Th>
                        <Th>หัวข้อ</Th>
                        <Th>ชื่อสินค้า</Th>
                        <Th>วันที่ลง</Th>
                        
                        <Th></Th>
                        </Tr>
                    </Thead>
                    {this.state.review!=''?( <Tbody style={{color:'grey'}}>
                    {
    this.state.review.map((review,key) => 
    
        <Tr>
        <Td><b>{key+1}</b></Td>
        <Td><b>{review.topic}</b></Td>
        <Td><b>{review.name_product}</b></Td>
        <Td><b>{this.state.date}</b></Td>
        <Td><Button color="isWarning" style={{padding:'0px'}}><Link to={`/selectOneReview${review.id_review}`} style={{padding:'7px',textDecoration:'none'}}>เรียกดู</Link></Button></Td>
        </Tr>
        
 
 )}</Tbody>):(<Tbody></Tbody>)}
                   
           
     
                    
              
              </Table>
        </div>
        );}
        else {
            return (
                <div>
                 หน้าสำหรับ user
                 
                </div>
            );

        }
    }
}

export default Review;