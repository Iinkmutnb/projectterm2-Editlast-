import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Tr,Th,Thead,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

class showconnectBackCustomer extends Component {
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


        connect:'',
        connectBack:'',

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
        
        fetch('http://localhost:9000/selectOneConnectCustomer', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id':this.props.match.params.code})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
      
          data.map((data,key) =>{  this.setState({id_buy_product:data.id_buy_product,image:data.src,topic:data.topic,detail:data.detail_connect})});
          fetch('http://localhost:9000/selectOneConnectOfficer', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id':this.props.match.params.code})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          data.map((data,key) =>{  this.setState({detail_con_back:data.detail_connect_back})});
     
         
    
    
    
    
        
        })
     
         
    
    
    
    
        
        })
    
       
      
       
        

    }
   
   

  


    render() {
      
        
      if(this.state.userType=="customer"){
        return (
            <div>
              <table style={{marginTop:'10px'}}> 
                  <tr>
             <td> <Button color="isWarning" style={{padding:'0px'}}><Link to="/selectConnect" style={{padding:'7px',textDecoration:'none'}}>กลับไปหน้าก่อน</Link></Button></td>
             </tr>
             </table>

            <table >
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                 <tr>
                    <td><h3 style={{color:'grey',fontSize: '30px'}}>ข้อมูลที่คุณแจ้ง</h3></td>

                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                  
            </table> 
            <table >
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                 <tr>
                    <td>รหัสสั่ง </td>
                    <td>&nbsp;</td>
                    <td>{this.state.id_buy_product}</td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td>
                </tr>
              
                  
            </table>  
            <table>
            <tr>
                    <td>วันที่ส่ง </td>
                    <td>&nbsp;</td>
                    <td> {this.state.date}</td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td>
                </tr>

            </table> 
            <table>
            <tr>
                    <td>รายละเอียด </td>
                    <td>&nbsp;</td>
                    <td>{this.state.detail} </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td>
                </tr>

            </table> 
            <table>
            <tr>
                    <td>รูปภาพ <br/></td>
                   
                    {this.state.image!=''?(<td colSpan={2}><img style={{marginLeft:'50px',border:'solid 1px',width:'220px',height:'150px',}} src={require('../../home/picture/connect/'+this.state.image)}/></td>):(<td></td>)}
            </tr>
                    <tr>
                        

                    </tr>
               

            </table>
           
      

            
            <hr style={{height:'3px', border:'none', color:'rgb(60,90,180)', backgroundColor:'rgb(60,90,180)'}}/>
            <table style={{marginTop:'10px'}}>
            <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                 <tr>
                    <td><h3 style={{color:'grey',fontSize: '30px'}}>ข้อมูลที่พนักงานตอบกลับ</h3></td>

                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                  
            </table> 
            
            {this.state.detail_con_back!=""?( 
                <table>
                <tr>
                    <td>รายละเอียด </td>
                    <td>&nbsp;</td>
                   
                    <td>{this.state.detail_con_back} </td>
                    </tr>
                    <tr><td>&nbsp;</td><td>&nbsp;</td>
                </tr>
                </table>  ):(  <table> <tr>
                    <td>ยังไม่ได้ตอบกลับ</td>
                    </tr>  </table> )}
        

         
         
                   
               
            
            
            </div>
        );}
    }
}

export default showconnectBackCustomer;
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