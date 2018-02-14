import React, { Component } from 'react';

import {BrowserRouter,Link,Route} from 'react-router-dom';
import SHOW_PRODUCT from  '../home/head/showProduct.js';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
import SHOW_MODAL from '../home/head/showModal';
import queryString from 'query-string';
import cookie from 'react-cookies';
import {Hero,HeroHead,Nav,Container,NavGroup,NavToggle,NavItem,HeroBody,Box,Label,Input,Textarea,Button,Columns,Column,Group,Notification}  from 're-bulma';
import TAB_MENU from '../home/head/tapMenu.js';
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
          product:[],
          showModal:false,
          dataModal:[],
          countTakeBasket:0
        };
        
      }
      
      componentDidMount() {
       
          insertCss(css, { prepend: true });
          
    
          fetch('http://localhost:9000/showProduct', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
             body:  queryString.stringify({'name':'*'})
            
           
         })
         .then((response) => response.json())
         .then((data) => {//console.log(JSON.stringify(data))
          var products=[];
          data.map((product) =>{
            
                  if(product.status=="ขาย"){
                    products.push(product);
                  }
      
              });
          this.setState({product: products})
          //console.log(JSON.stringify(this.state.product));
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
 
    return (
      <div>
            
         <Hero   >
               
      
                    <HeroBody>
                    <Container >
                        <Box>
                          <Notification >
                          <Container hasTextCentered>
                            <h2>สินค้าแนะนำ</h2>
                          </Container>
          <SHOW_PRODUCT product={this.state.product} showModal={this.showModal} takeBaskets={this.takeBaskets} />
          <SHOW_MODAL showModal={this.state.showModal} dataModal={this.state.dataModal} setFalseShowModal={this.setFalseShowModal}/>
          </Notification >
          </Box>
          </Container >
          </HeroBody>
         
          </Hero   >
      </div>
    );
  }
}

export default Product;