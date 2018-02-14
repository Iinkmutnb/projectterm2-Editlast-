import React, { Component } from 'react';
import queryString from 'query-string';

import {Hero,HeroHead,Nav,Container,NavGroup,NavToggle,NavItem,HeroBody,Box,Label,Input,Textarea,Button,Columns,Column,Group,Notification}  from 're-bulma';
import {Link} from 'react-router-dom';
import SHOW_PRODUCT from  '../home/head/showProduct.js';
import SHOW_MODAL from '../home/head/showModal';
import cookie from 'react-cookies';
class productPro extends Component {
    constructor(props) {
      super(props);
      this.state = {
        product:[],
        showModal:false,
        dataModal:[]
       
      };
     
     
    }
    
    componentWillMount() {
        fetch('http://localhost:9000/showProductPro', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",
            // body:  queryString.stringify({'promotion':'*'})
            
           
         })
         .then((response) => response.json())
         .then((data) => {//console.log(data)
          var products=[];
          data.map((product) =>{
            
                  if(product.status=="ขาย"){
                    products.push(product);
                  }
      
              });
            this.setState({product: products});
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
         console.log(takeBasket)
        
         if(takeBasket==null){
          var  arrayBasket=[]
          arrayBasket.push(productCode)
           cookie.save('takeBasket',arrayBasket, { path: '/' })
         }else{
           takeBasket.push(productCode)
           cookie.save('takeBasket',takeBasket, { path: '/' })
         }
         }
  

  

    render() {
      
        return (
        <div >
           <Hero   >
               
      
                    <HeroBody>
                    <Container >
                        <Box>
                          <Notification >
                          <Container hasTextCentered>
                            <h2>สินค้าโปรโมชั่น</h2>
                          </Container>
             <SHOW_PRODUCT product={this.state.product} showModal={this.showModal} />
          <SHOW_MODAL showModal={this.state.showModal} dataModal={this.state.dataModal} setFalseShowModal={this.setFalseShowModal} takeBaskets={this.takeBaskets}/>
          </Notification >
          </Box>
          </Container >
          </HeroBody>
         
          </Hero   >
         </div>
                )}}

export default productPro;
