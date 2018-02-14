import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Textarea,Button,Modal,Content,Table,Tr,Th,Thead,Tbody,Td} from 're-bulma';
import cookie from 'react-cookies';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
class detailBuyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {productBuy:'',
        setShowModal:false,
        detailBuyProduct:'',
        userType:'',
    
                        }
       
    }
    componentDidMount() {
        
        this.props.setExact(true,true,2);
    }
    componentWillMount() {
        
        var userType= cookie.load('userType');
        this.setState({userType:userType});
        this.props.setExact(true,true,2);
        fetch('http://localhost:9000/SelectBuyProduct', {
            headers: {
                        'Content-Type':'application/x-www-form-urlencoded'
            
                    },
        
            method: "POST",
           body:  queryString.stringify({'value':'*'})

        })
        .then((response) => response.json())
        .then((data) => {
         this.setState({productBuy:data})

        
                            })
        

    }
   showModal=(id)=>{
    this.setState({setShowModal:true});
    fetch('http://localhost:9000/selectDetailBuyProduct', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'id':id})

    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
     this.setState({detailBuyProduct:data})
          




    
    })

   }
  


    render() {
        console.log(this.state.productBuy)
        
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div >
             <Table isStriped>
  <Thead>
    <Tr>
      <Th>ลำดับ</Th>
      <Th>รหัสรายการสินค้า</Th>
      <Th>ชื่อลูกค้า</Th>
      <Th>ประเถทลูกค้า</Th>
      <Th></Th>
    </Tr>
  </Thead>

 

{ this.state.productBuy!=''?(<Tbody>
    {this.state.productBuy.map((product,key) => <Tr><Td>{key+1}</Td><Td>{product.id}</Td><Td>{product.user}</Td><Td>{product.user_type}</Td>
    <Td><Button ><Link to={`/editAdmin/detailBuyProducts${product.id}`}  style={{padding:'7px',textDecoration:'none'}}>ดูรายละเอียด</Link></Button></Td></Tr>)}
    </Tbody>):(<div></div>)
}

</Table>


            </div>
        );}
    }
}

export default detailBuyProduct;
/*
    { this.state.detailBuyProduct!=''?(
              <table>
         { this.state.detailBuyProduct.map((product,key) =><tr><td>{product.id_product}</td><td>{product.count_product}</td></tr>)}
         </table>
          ):(<div></div>)}


*/