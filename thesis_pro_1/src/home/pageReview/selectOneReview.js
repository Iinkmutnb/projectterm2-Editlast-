import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Tr,Th,Thead,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class selectOneReview extends Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
       
      
        userType:'',
        id_buy_product:'',
        topic:'',
      
        connect:'',
        date: date,
        check:1,
        detail:'',
        image:'',
        detail_con_back:'',


        review:'',
        connectBack:'',
        src:''
                        }
       
    }
    
    componentDidMount() {
        
        this.props.setExact(false,true);
    }
 
    componentWillMount() {
        console.log(this.props.match.params.code)
        this.props.setExact(false,true);
        var userType= cookie.load('userType');
        this.setState({userType:userType});
        
        fetch('http://localhost:9000/selectOneReview', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id':this.props.match.params.code})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
      
           
          data.map((data,key) =>{  this.setState({src:data.src,topic:data.topic,detail:data.detail,name_product:data.name_product,link:data.link,user_name:data.user_name})});
      
    
        })
       
         
    
    
    
    
        
    
     
         
    
    
    
    
        
        
    
       
      
       
        

    }
   
   

  


    render() {
      
        
      if(this.state.userType=="customer"){
        return (
            <div>
              
              <table style={{marginTop:'10px'}}> 
                  <tr>
             <td> <Button color="isWarning" style={{padding:'0px'}}><Link to="/review" style={{padding:'7px',textDecoration:'none'}}>กลับไปหน้าก่อน</Link></Button></td>
             </tr>
             <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
             </table>
             <table style={{marginTop:'10px'}}>
                        <tr>
                            <td><div style={{color:'grey',fontSize: '20px'}}>หัวข้อ : {this.state.topic}</div></td>

                            </tr>
                         <tr><td>&nbsp;</td></tr>
                        
                </table> 
                <table >
                        <tr>
                            <td><div style={{color:'grey',fontSize: '20px'}}>ชื่อสินค้า : {this.state.name_product}</div></td>

                            </tr>
                         <tr><td>&nbsp;</td></tr>
                        
                </table> 
                <table >
                        <tr>
                            <td><div style={{color:'grey',fontSize: '20px'}}>รายละเอียด : {this.state.detail}</div></td>

                            </tr>
                         <tr><td>&nbsp;</td></tr>
                        
                </table> 
                <table >
                        <tr>
                            <td><div style={{color:'grey',fontSize: '20px'}}>รูปภาพ : 
                            {this.state.src!=''?(<div><img style={{marginLeft:'50px',border:'solid 1px',width:'220px',height:'150px',}} src={require('../../home/picture/review/'+this.state.src)}/></div>):(<div></div>)}
                                </div></td>

                            </tr>
                         <tr><td>&nbsp;</td></tr>
                        
                </table> 
                <table >
                        <tr>
                            <td><div style={{color:'grey',fontSize: '20px'}}>วีดีโอ : {this.state.link}</div></td>

                            </tr>
                         <tr><td>&nbsp;</td></tr>
                        
                </table> 
                <table >
                        <tr>
                            <td><div style={{color:'grey',fontSize: '20px'}}>ชื่อผู้รีวิว : {this.state.user_name}</div></td>

                            </tr>
                         <tr><td>&nbsp;</td></tr>
                        
                </table> 

            
      
        

         
         
                   
               
            
            
            </div>
        );}
    }
}

export default selectOneReview;
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
// { this.props.match.params.id}