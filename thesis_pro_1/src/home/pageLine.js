import React, { Component } from 'react';
import queryString from 'query-string';

import {Hero,HeroHead,Nav,Container,NavGroup,NavToggle,NavItem,HeroBody,Box,Label,Input,Textarea,Button,Columns,Column,Group,Notification}  from 're-bulma';
import {Link} from 'react-router-dom';
import SHOW_PRODUCT from  '../home/head/showProduct.js';
import SHOW_MODAL from '../home/head/showModal';
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
     
        
          this.props.setExact(false,true);

   
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
                            <h2>line id</h2>
                          </Container>
                          <Container hasTextCentered>
                          <img   src={require('../img/home/line.jpg')} />
                          </Container>
            
          </Notification >
          </Box>
          </Container >
          </HeroBody>
         
          </Hero   >
         </div>
                )}}

export default productPro;
