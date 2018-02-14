
import React, { Component } from 'react';
import queryString from 'query-string';
import FacebookLogin from 'react-facebook-login';
import {Link} from 'react-router-dom';

class loginPageBasket extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
         
        };
       
       
      }
      componentDidMount() {

      }
      componentWillMount() {
      }

 render() {
    
      return (

<div> <div className="limiter" style={{marginTop: '0px'}}>
            <div className="container-login100" style={{marginTop: '0px'}}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54" >
                    <form className="login100-form validate-form" >
                    
    
                        <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                            <span className="label-input100">ชื่อผู้ใช้</span>
                            <input  className="input100" type="text" name="username" placeholder="ชื่อผู้ใช้" onChange={(e) => this.setUser(e)}/>
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
    
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">รหัสผ่าน</span>
                            <input className="input100" type="password" name="pass" placeholder="รหัสผ่าน" onChange={(e) => this.setPass(e)}/>
                            <span className="focus-input100" data-symbol="&#xf190;"></span>
                        </div>
                        
                        <div className="text-right p-t-8 p-b-31" >
                            <a href="#" style={{borderBottom:'0px'}}>
                                ลืมรหัสผ่าน?
                            </a>
                        </div>
                        
                        <div className="container-login100-form-btn" style={{color:'black'}}>
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn" ></div>
                                
                                <Link style={{color:'white'}} className="login100-form-btn" to="/" onClick={() => this.logIn()} >
                                เข้าสู่ระบบ
                                </Link>
                            </div>
                        </div>
    
                        <div className="txt1 text-center p-t-54 p-b-20">
                            <span>
                                หรือ ล็อกอินด้วย
                            </span>
                        </div>
    
                        <div className="flex-c-m">
                        <FacebookLogin
        appId="2047145118899508"
        autoLoad={true}
        fields="name,email,picture"
       
      
    callback={this.responseFacebook} 
        textButton=""
        
        language="en_US"
        cssClass="login100-social-item bg1 fa fa-facebook"
        />
        
                        
    
                        
                        </div>
    
                        
                    </form>
                </div>
            </div>
        </div>
            
           </div>
                    )}}
                    
                    export default loginPageBasket;