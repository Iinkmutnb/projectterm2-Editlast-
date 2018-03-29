import React, { Component } from 'react';
import queryString from 'query-string';
import cookie from 'react-cookies';
import {Content,Table,Thead,Tr,Th,Tbody,Td,Hero,HeroHead,Nav,Container,NavGroup,HeroBody,Box,Textarea,Button,Columns,Column,Group,Notification,Modal,Label,Input}  from 're-bulma';
import {Link} from 'react-router-dom';
import  '../../home/css/pageBasket/pageBasket.css'

import  LOGIN from './loginPageBasket.js'
class pageBasket extends Component {
    constructor(props) {
      super(props);
      this.state = {
        productBasket:'',
        countBasket:0,
        totalBasket:0,
        isOpenShowModalAndInsert:false,
        isOpenShowLogin:false,
        user:'',
        pass:'',
        users:'',
        userBuy:'',
        userTypeBuy:'',
        checkStatusInsert:false,
       
      };
     
     
    }
    componentDidMount() {
      this.props.setExact(true,true,3);
    }
    
    componentWillMount() {
      
       //this.props.setExact(true,true,3);
 
       var takeBasket= cookie.load('takeBasket');
       var userBuy= cookie.load('userId');
       var userTypeBuy= cookie.load('userType');
       console.log(takeBasket)
       this.setState({userBuy:userBuy,userTypeBuy:userTypeBuy})
       if(takeBasket!=null){
       this.setState({countBasket:takeBasket.length})
     
       fetch('http://localhost:9000/selectBasket', {
         headers: {
                   'Content-Type':'application/x-www-form-urlencoded'
       
                  },
      
      
          method: "POST",
          body:  queryString.stringify({'takeBasket':takeBasket})
         
        
      })
      .then((response) => response.json())   
      .then((data) => {
     console.log(data)
       this.setState({productBasket: data})
       var total=0;
       data.map((product) =>{total +=  product.Price});
       this.setState({totalBasket: total})
      
       })
     }
 
    
     }


   



  

 render() {
      
        return (
        <div >
          <img style={{ height:'150px',width:'200px' }} src={require('../../img/home/logofin.png')} />

        
   
         </div>
                )}}

export default pageBasket;



/*
//การอินเสริทการสั่งซื้อสินค้า
 
      
      fetch('http://localhost:9000/inserBuyProduct', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'userBuy':this.state.userBuy,'userTypeBuy':this.state.userTypeBuy})

    })
    .then((response) => response.json())
    .then((data) => {


              if(data.qreury){
              console.log(data)
                var code=this.state.productBasket.map((product) => product.code)
                var count=this.state.productBasket.map((product) => product.Price)
                console.log(count)

                          fetch('http://localhost:9000/inserDetailBuyProduct', {
                            headers: {
                                        'Content-Type':'application/x-www-form-urlencoded'
                            
                                    },

                            method: "POST",
                            body:  queryString.stringify({'id':data.idBuyProduct,'code':code,'count':count})

                        })
                        .then((response) => response.json())
                        .then((data) => {console.log(data);
                          if(data.qreury) {this.setState({isOpenShowModalAndInsert:true,checkStatusInsert:true})}
                          else{this.setState({isOpenShowModalAndInsert:true,checkStatusInsert:false})}
                        
                        })

              }else{
                this.setState({isOpenShowModalAndInsert:true,checkStatusInsert:false})

              }


                  
                                      })

*/
