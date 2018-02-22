import React, { Component } from 'react';
import {Menu,MenuList,MenuLink,MenuLabel,Button,Group,Modal,Content,Columns,Column} from 're-bulma';
import { Link} from 'react-router-dom';
import cookie from 'react-cookies';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SampleNextArrow from './SampleNextArrow.js';
import SamplePrevArrow from './SamplePrevArrow.js';
import queryString from 'query-string';
class showAllProductInhome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:'',
            showModal:false,
            dataModal:''


        }
    }
    componentWillMount() {
      

        fetch('http://localhost:9000/showProduct', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'name':'*'})
            
           
         })
         .then((response) => response.json())
         .then((data) => {//console.log(JSON.stringify(data))
          this.setState({product: data})
          var products=[];
          data.map((product) =>{
            
                  if(product.status=="ขาย"){
                    products.push(product);
                  }
      
              });
              var products2=[];
        
            products2=products;
        
         
       
          this.setState({product:products2})
        
          })
         .catch(function(error) 
          {
            console.log( error.message);
          });
        
        this.props.setExact(false,true);
        
               

     

    }
    showModal = (productCode) => {
        this.setState({showModal: true})
    
        fetch('http://localhost:9000/showModal', {
          headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                   },
       
       
           method: "POST",
           body:  queryString.stringify({'code':productCode})
          
         
       })
       .then((response) => response.json())   
       .then((data) => {
      
        this.setState({dataModal: data})
    
       
        })
        
     
    
      }
    setFalseShowModal = () => {
        
        this.setState({showModal: false})
    
      }
    takeBaskets = (productCode) => {
        
        var takeBasket= cookie.load('takeBasket');
      
       
        if(takeBasket==null){
         var  arrayBasket=[]
         arrayBasket.push(productCode)
          cookie.save('takeBasket',arrayBasket, { path: '/' })
          
        }else{
          takeBasket.push(productCode)
          cookie.save('takeBasket',takeBasket, { path: '/' })
   
        }
window.alert("เพิ่มสินค้าในตระกร้าแล้ว")
        }
    


    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            dotsClass:'slick-dots',
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
          
          };
      
        return (
            <div style={{margin:'100px',width:'1000px'}}>   
            <div style={{  fontSize: '25px',padding:'10px 10px 10px 10px'}}>สินค้าทั้งหมด</div>
                
                {this.state.product!=''?(        <Slider {...settings} >
                {this.state.product.map((product)=><div>
                    <table  >
                                                           
                                                              <tr>
                                                                  <td>
                                                                  <img style={{width:'220px',height:'250px',marginLeft:'15px'}} src={require('../../home/picture/product/'+product.Src)}/>
                                                                  </td>
                                                              </tr>
                                                           
                                                          
                                                              <tr>
                                                                <td style ={{padding:'10px 10px 10px 10px'}}>
                                                                 <b> {product.name}</b>
                                                                 
                                                                 <b style={{marginLeft:'50px'}}> {product.Price} บาท</b>
                                                             </td>
                                                             
                                                               
                                                             
                                                              </tr>
                                                              <tr>
                                                                <td> 
                                                                  <Group>
                                                                    <Button color="isPrimary" onClick={() => this.showModal(product.code)}>ดูรายละเอียด</Button>
                                                                    <Button color="isSuccess" onClick={() =>{ this.takeBaskets(product.code)}}>หยิบใส่ตระกร้า</Button>  
                                                                  </Group>
                                                                </td>
                                                              </tr>
                                                            
                                                          </table>
                    
                    
                    
                    </div>)}
      </Slider>):(<div></div>)}
        
      <Modal
          type="card"
          headerContent="รายละเอียดสินค้า"
          footerContent={<div style={{ padding: '20px'}} ></div> }
          isActive={this.state.showModal}
          onCloseRequest={() => this.setFalseShowModal()}
        >
          <Content>
              {this.state.dataModal!=''?(<div>
            {    this.state.dataModal.map((product) =><div><Columns>
            <Column>
            <Columns><Column>ชื่อสินค้า : </Column> <Column>{product.name}</Column></Columns>
            <Columns><Column>ราคาสินค้า : </Column>  <Column>{product.Price}</Column> </Columns>
            <Columns><Column>รายละเอียดต่าง ๆ :</Column> </Columns>
            <Columns><Column  >{product.Des}</Column> </Columns>
            </Column> 
            <Column><img style={{marginLeft:'50px',border:'solid 1px',width:'220px',height:'250px',}} src={require('../../home/picture/product/'+product.Src)}/></Column> 
            </Columns>
    
    
                </div>)}
             </div>):(<div></div>) }
          </Content>
     
        </Modal>
   
    </div>
        );
    }
}


export default showAllProductInhome;