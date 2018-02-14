import React, { Component } from 'react';
import {Tabs,TabGroup,Tab,Box,Modal,Content} from 're-bulma';
import { Link} from 'react-router-dom';
//import  Script from 'react-load-script';

import '../../home/css/styleTapbar2.css';
import '../../home/css/styleTapbar.css';
import cookie from 'react-cookies';
import queryString from 'query-string';
import FacebookLogin from 'react-facebook-login';
import '../../home/css/login/animate.css';
import '../../home/css/login/bootstrap.min.css';
import '../../home/css/login/font-awesome.min.css';
import '../../home/css/login/main.css';
import '../../home/css/login/material-design-iconic-font.min.css';
import '../../home/css/login/util.css';
import LOGIN from './login.js'

class tapMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
          active:1,
          showBasket:0,
          productBasket:'',
          countBasket:0,
          totalBasket:0,
          showModalLogin:false,
          user:'',
          userType:''
       
      };
     
     
    }
    
    componentWillMount() {
        if(window.location.pathname=="/product"){
            this.setState({active:1})
        }
        else if(window.location.pathname=="/productPro"){
            this.setState({active:2})
        }
      
        var userid= cookie.load('userId');
        var userType= cookie.load('userType');
       
        if(userid!=null){
            console.log("true")
            this.setState({isLogin:true});
            this.setState({user:userid});
            
            this.setState({userType:userType});
            
            }
    
          
        

    }
setActive=(value)=>{
    this.setState({active:value})

}
  
showBasket=()=>{
  var takeBasket= cookie.load('takeBasket');
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

  this.setState({productBasket: data})
  var total=0;
  data.map((product) =>{total +=  product.Price});
  this.setState({totalBasket: total})
 
  })
}

if(this.state.showBasket==0)this.setState({showBasket:1});
else if(this.state.showBasket==1)this.setState({showBasket:0});

}
showModalLogin=(value)=>{
  this.setState({showModalLogin: value})
}

  

    render() {
      
      
        return (
        <div >
            
             <nav className="tapmenu">
  <div className="container">
    <ul className="navbar-left" >
  
      <li>
      <Link     to="/product" style={{outline:'0', textDecoration: 'none',border:'none'}} >
       สินค้าแนะนำ
        </Link>
        </li>
      <li>
        <Link  to="/s" style={{outline:'0', textDecoration: 'none',marginHorizontal:'0px'}} >
        
        สินค้า Promotion
            
         </Link>
      </li>
      <li>
      <Link  to="/pageBasket" style={{outline:'0', textDecoration: 'none',marginHorizontal:'0px'}}  >
        
            ตระกร้าสินค้า
        </Link>
      </li>  
      <li>
        <Link  to="/s" style={{outline:'0', textDecoration: 'none'}} >
            รีวิวสินค้า
        </Link>
      </li>
      <li>
        <Link  to="/s" style={{outline:'0', textDecoration: 'none'}} >
            แผนที่ร้าน
        </Link>
      </li>
      <li>
        <Link  to="/s" style={{outline:'0', textDecoration: 'none'}} >
            วิธีชำระเงิน
        </Link>
      </li>
      <li>
        <Link  to="/s" style={{outline:'0', textDecoration: 'none'}} >
            ติดต่อ
        </Link>
      </li>
      {this.state.userType=="admin"||this.state.userType=="customerFace"||this.state.userType=="customer"?(<li><button className="btn-login"  onClick={(e) => this.showModalLogin(true)}>{this.state.user}</button></li>)
      :( <li><button className="btn-login"  onClick={(e) => this.showModalLogin(true)}>เข้าสู่ระบบ</button></li>)}
     
      <li id="cart" className="li-basket" onClick={this.showBasket} ><i className="fa fa-shopping-cart"></i> Cart <span className="badge"></span></li>
    </ul>

    
  </div>
</nav>
{this.state.showBasket==0?(
   
<div >
 
</div> ):(
    <div className="container">
  <div   style={{border:'solid 1px',backgroundColor:'#7FFFD4',height:'500px',overflow:' scroll'}}  className="shopping-cart">
    <div className="shopping-cart-header">
      <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">{this.state.countBasket}</span>
      <div className="shopping-cart-total">
        <span className="lighter-text">Total:</span>
        <span className="main-color-text">{this.state.totalBasket} ฿</span>
      </div>
    </div> 
{this.state.productBasket!=''?(<div>
    <ul className="shopping-cart-items">
      {this.state.productBasket.map((product) =><li className="clearfix">
      <img style={{witdh:'70px',height:'70px'}} src={require('../../home/picture/product/'+product.Src)} alt="item1" />
      <span className="item-name">{product.name}</span>
      <span className="item-price">{product.price} ฿</span>
      <span className="item-quantity">จำนวน: 01</span>
      </li>
      )}
     
    </ul></div>):(<div>
      <ul className="shopping-cart-items">
        ว่าง
      </ul>
      </div>)}

    <a href="#" className="button">ไปหน้าตระกร้าสินค้า</a>
  </div> 
</div>



)}
<Modal

          type="card"
          headerContent={ <span className="login100-form-title p-b-49">
          {this.state.userType=="admin"||this.state.userType=="customerFace"||this.state.userType=="customer"?(<div>ข้อมูล</div>):(<div>เข้าสู่ระบบ</div>)}
                        </span>}
          footerContent={<div style={{ padding: '20px'}} ></div> }
          isActive={this.state.showModalLogin}
          onCloseRequest={() => this.showModalLogin(false)}
        >
          <Content>

          <LOGIN setExact={ this.props.setExact}/>
         
          </Content>
     
        </Modal>

         </div>
                )
              }}


export default tapMenu;
