import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Tr,Th,Thead,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
class detailBuyProducts extends Component {
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
        this.props.setExact(true,true,2);
        fetch('http://localhost:9000/selectDetailBuyProduct', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
            body:  queryString.stringify({'id':this.props.match.params.id})
    
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
         this.setState({detailBuyProduct:data})
         data.map((data,key) =>{  this.setState({nameCustomer:data.name,subName:data.subname,address:data.address,phone:data.phone})
      
        })
              
    
    
    
    
        
        })
       
        

    }

  


    render() {
      
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
                <div>รายละเอียดการสั่งซื้อสินค้า</div>
                <div>ข้อมูลลูกค้า</div>
                <div>ชื่อ : {this.state.nameCustomer}  นามสกุล : {this.state.subName}</div>
                <div>ที่อยู่ : {this.state.address}  โทรศัพท์ : {this.state.phone}</div>
                <div>รายการสินค้าที่สั่งซื้อ</div>
                {this.state.detailBuyProduct!=''?(
                <table><tr><td style={{width:"700px"}}>รูปภาพ</td><td style={{width:"30%"}}>ชื่อ</td><td style={{width:"30%"}}>จำนวน(ชิ้น)</td></tr>
                        {this.state.detailBuyProduct.map((product,key) => <tr><td>  <img style={{width:'100px',height:'100px'}} src={require('../../home/picture/product/'+product.Src)}/></td>
                    
            
                        <td>{product.name}</td>
                        <td>{/*product.count_product*/1}</td>
                        </tr>
                        )
                        }

              
                </table>
            ):(<div></div>)
            }
   { this.props.match.params.id}

            </div>
        );}
    }
}

export default detailBuyProducts;
