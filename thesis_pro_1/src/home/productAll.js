import React, { Component } from 'react';

import {BrowserRouter,Link,Route} from 'react-router-dom';
import SHOW_PRODUCT from  '../home/head/showProduct.js';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
import SHOW_MODAL from '../home/head/showModal';
import queryString from 'query-string';
import cookie from 'react-cookies';
import {Hero,HeroHead,Nav,Container,NavGroup,NavToggle,NavItem,HeroBody,Box,Label,Input,Textarea,Button,Columns,Column,Group,Notification}  from 're-bulma';

class productAll extends Component {
    constructor(props) {
      super(props);
        this.state = {
          product:[],
          showModal:false,
          dataModal:[],
        
        };
     
      }
      
      componentWillMount() {

       
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
          this.setState({product: data})
          var products=[];
          data.map((product) =>{
            
                  if(product.status=="ขาย"){
                    products.push(product);
                  }
      
              });
              var products2=[];
          if(this.props.match.params.type=="ทั้งหมด"){
            products2=products;
        
         }
        else{
          products.map((product) =>{
            
                  if(product.type==this.props.match.params.type){
                    products2.push(product);
                  }
      
              });
        
        }
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
      setFalseShowModal = () => {
        
        this.setState({showModal: false})
    
      }
   
      /*taketakeBaskets(){
        console.log("ss")
      }*/

  render() {
    return (
      <div>
         <Hero   >
               
      
                    <HeroBody>
                    <Container >
                        <Box>
                          <Notification >
                          <Container hasTextCentered>
                            <h2>{this.props.match.params.type}</h2>
                             
                          </Container>
          <SHOW_PRODUCT  product={this.state.product} takeBaskets={this.takeBaskets} showModal={this.showModal} />
          <SHOW_MODAL showModal={this.state.showModal}  dataModal={this.state.dataModal} setFalseShowModal={this.setFalseShowModal}/>
          </Notification >
          </Box>
          </Container >
          </HeroBody>
         
          </Hero   >
          
      </div>
    );
  }
}

export default productAll;
