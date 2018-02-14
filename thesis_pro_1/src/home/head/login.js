import React, { Component } from 'react';
import {Input,Label,Addons,Button,Tile,Content,Columns ,Column,Modal}  from 're-bulma';
import { Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Facebook} from './facebook.js';
//import $ from 'jquery';
import queryString from 'query-string';
import FacebookLogin from 'react-facebook-login';
import '../../home/css/login/animate.css';
import '../../home/css/login/bootstrap.min.css';
import '../../home/css/login/font-awesome.min.css';
import '../../home/css/login/main.css';
import '../../home/css/login/material-design-iconic-font.min.css';
import '../../home/css/login/util.css';
import PRODUCT from '../../home/product.js';


class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        user:'',
        pass:'',
        check:0,
        users:[],
        isLogin:false,
        userType:'',
        data: '',
        email:'',
        isOpen:false,
        isOpenSuccess:false,
        isOpenFalie:false,
      
        };
       
        
      }

      componentDidMount() { /* this.props.setExact(false,false,1)*/}
      
    componentWillMount() {
        
        
            var userid= cookie.load('userId');
            var userType= cookie.load('userType');
           
           
            if(userid!=null){
                console.log("true")
                this.setState({isLogin:true});
                this.setState({user:userid});
                
                this.setState({userType:userType});
                console.log(userType);
                }
                console.log(this.props);
               
                
            }
     
            responseFacebook=(response) =>{
                             var email=false;
                fetch('http://localhost:9000/checkUserFace', {
                    headers: {
                                'Content-Type':'application/x-www-form-urlencoded'
                    
                            },
                
                    method: "POST",
                    body:  queryString.stringify({'email':response.email})
    
                })
                .then((response) => response.json())
                .then((data) => {
           
                   email=data.email
                   console.log(data+"eiei")
                   if(data.email==true){console.log("อีเมลไม่ซ้ำ")}
                   else{console.log("อีเมลซ้ำ")}

                
                                    })
                                   
                
               this.setState({user:response.name})
               if(this.state.user!=null ){
                this.setState({isLogin:true});
                cookie.save('userId', response.name, { path: '/' })
                cookie.save('userType', 'customerFace', { path: '/' })
                cookie.save('userEmail', response.email, { path: '/' })
                 window.location.reload();
              
               }
             }
    logIn=()=> {
        
        
        if(this.state.user!==''&& this.state.pass!==''){
            fetch('http://localhost:9000/login', {
                headers: {
                            'Content-Type':'application/x-www-form-urlencoded'
                
                        },
            
                method: "POST",
                body:  queryString.stringify({'user':this.state.user,'pass':this.state.pass})

            })
            .then((response) => response.json())
            .then((data) => {
       
                this.setState({users:data})
            
                                })
                        }
                    console.log(this.state.user)    
    }
    logOut=()=>{
        cookie.remove('userId', { path: '/' });
        cookie.remove('userType', { path: '/' });
        this.setState({isLogin:false,users:''});
        window.location.reload();
       
    }
    logOutFace=()=>{
        cookie.remove('userId', { path: '/' });
        cookie.remove('userType', { path: '/' });
        this.setState({isLogin:false,users:''});
       
       
    }
    setUser= (e) => {
        this.setState({user: e.target.value})
        

    }
    setPass= (e) => {
        this.setState({pass: e.target.value})
        
            }
    showDataLogin=(user)=>{
        if(user.user===false){return(<div style={{color:'red'}}>ไม่มีuserนี้</div>)}
        else if(user.user===true){return(<div style={{color:'red'}}>รหัสผิด</div>)}
        else if(user.user!=null){ this.setState({isLogin:true});
                                cookie.save('userId', user.user, { path: '/' })
                                cookie.save('userType', user.type, { path: '/' })
                                window.location.reload();
                                }
    
        
    
    }
    setEmail=(event)=>{
        this.setState({email:event.target.value});
    }
    showModalInputEmail=()=>{
        this.setState({isOpen:true});
    }
    sendMail=()=>{
        this.setState({isOpen:false});
        console.log(this.state.email)
        
        
        fetch('http://localhost:9000/checkEmail', {
            headers: {
                      'Content-Type':'application/x-www-form-urlencoded'
          
                     },
         
         
             method: "POST",                  
             body:  queryString.stringify({'email':this.state.email})
            
           
         })
         .then((response) => response.json())
         .then((data) => { 
            if(data.checkEmail){this.setState({isOpenSuccess:true});}
            if(data.checkEmail){
                
                fetch('http://localhost:9000/sentPassInEmail', {
                    headers: {
                              'Content-Type':'application/x-www-form-urlencoded'
                  
                             },
                 
                 
                     method: "POST",                  
                     body:  queryString.stringify({'email':this.state.email,'pass':data.pass})
                    
                   
                 })
                 .then((response) => response.json())
                 .then((data) => { });
                
            }
            else{
                this.setState({isOpenFalie:true});
            }

         });
        
   
    }
    clickTakeBasket=()=>{
        var takeBasket= cookie.load('takeBasket');
        console.log(takeBasket)
    }
    setExact=(value,value2)=>{
        
         this.setState({exact:value,exactProdcut:value2})
        
        }
   
    render() {
     

        return (
            <div style={{paddingTop: '0px'}} >
            
       

            <div >
            {this.state.isLogin ? (
            <div>
        
            <div className="limiter" style={{marginTop: '0px'}}>
            <div className="container-login100" style={{marginTop: '0px'}}>
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54" >
                    <form className="login100-form validate-form" >
                       
    
                        <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                            <span className="label-input100">ชื่อผู้ใช้</span>
                            <input className="input100"  placeholder={this.state.user} disabled="disabled"/>
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                          
                        </div>
                        <div className="wrap-input100 validate-input m-b-23" data-validate = "Username is reauired">
                        <span className="label-input100">สถานะ</span>
                            {this.state.userType=="admin"?(<div>    <input className="input100"  placeholder="แอดมิน"disabled="disabled"/> </div>):(<div>{this.state.userType=="officer"?(<div><input className="input100"  placeholder="พนักงาน"disabled="disabled"/> </div>):(<div> <input className="input100"  placeholder="ลูกค้า"disabled="disabled"/></div>)}</div>)}
                         
                            <span className="focus-input100" data-symbol="&#xf206;"></span>
                        </div>
                      
                
    
                 
                                
                        
                         {this.state.userType=="customerFace"?(<div>
                             
                        <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                     
                            <button className="login100-form-btn">
                            <a href="https://www.facebook.com" onClick={() => this.logOutFace()} style={{color:"white",padding:'7px',textDecoration: 'none'}}>
                     ออกจากระบบ
                     </a>
                     </button>
                     </div>
                         </div>
                </div>

                ):(<div >
                    
                    
                   
                    {this.state.userType=="customer"||this.state.userType=="admin"?(<div>
              
                        <div className="text-center p-t-8 p-b-31" >
                    <Link to="/detaliCustomer" style={{borderBottom:'0px'}}>
                    
                    ดูลายละเอียดข้อมูล
                    </Link>
                    </div>
                        
                        </div>):(<div></div>)}
                        
                    
                    <div className="container-login100-form-btn">
                            <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                    <Link style={{color:'white'}} className="login100-form-btn" to="/" onClick={() => this.logOut()} >
                    ออกจากระบบ
                    </Link>
                    </div>
                    </div>
              
             
              
                    
                    </div>)}
                                
                         

    
                        
                    </form>
                </div>
            </div>
        </div>
             
                  
            

           
            </div>
            ):(<div>   <div> <div className="limiter" style={{marginTop: '0px'}}>
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
            <div>{this.showDataLogin(this.state.users)
                 }
            </div>
           </div>)}
           <Modal
           type="card"
           headerContent="ลืมรหัสผ่าน"
           footerContent={<div style={{ padding: '20px'}} ></div>}
           isActive={this.state.isOpen}
           onCloseRequest={() => this.setState({ isOpen: false })}
           >
           <Content>
           <Label>กรุณาใส่อีเมลที่ใช้สมัคร</Label>
           <Input type="text" placeholder="email"  color="isInfo" size="isSmall" onChange={(e)=>this.setEmail(e)}   />
           <Button color="isInfo" onClick={this.sendMail}>ตกลง</Button>
           </Content>
           </Modal>
           
           <Modal
           type="card"
           headerContent=""
           footerContent={<div style={{ padding: '20px'}} ></div>}
           isActive={this.state.isOpenSuccess}
           onCloseRequest={() => this.setState({ isOpenSuccess: false })}
           >
           <Content>
           <Label>เราได้ส่งรหัสให้คุณแล้ว กรุณาตรวจสอบทางอีเมล</Label>
          
           </Content>
           </Modal>
           
           <Modal
           type="card"
           headerContent=""
           footerContent={<div style={{ padding: '20px'}} ></div>}
           isActive={this.state.isOpenFalie}
           onCloseRequest={() => this.setState({ isOpenFalie: false })}
           >
           <Content>
           <Label>อีเมลนี้ไม่มีในระบบ</Label>
          
           </Content>
           </Modal>
          </div>
        </div>


        );}
    }

export default login;
/*
<Addons style={{paddingBottom:'10px', width:'150px',marginLeft:'20px'}} >
                <Label style={{paddingRight:'10px',paddingTop:'5px',width:'52px'}}>
                    ชื่อผู้ใช้
                </Label>
                <Input type="text" placeholder="User input" onChange={(e) => this.setUser(e)} style={{width:'5px'}}/>
            </Addons >

*/ //<input id="userFace" autoFocus onFocus={(e)=>this.setUserFace(e)} value="ss"/>
/*
<table style={{color:'black'}}>
                <tr>
                <td style={{padding:'1px',width:'64px'}}>
                
                    ชื่อผู้ใช้:
                </td>
                <td style={{width:'170px'}}>
              
                <Input type="text" placeholder="ชื่อผู้ใช้" onChange={(e) => this.setUser(e)} />
                </td>
                </tr>
                </table>
            
                <table style={{color:'black'}} >
                    <tr>
                        <td style={{width:'64px'}}>
              
                    รหัสผ่าน: 
                    </td>
                    <td style={{width:'170px'}}>
                <Input type="password" placeholder="รหัสผ่าน" onChange={(e) => this.setPass(e)}/>
                </td>
                </tr>
                </table>
            
            
            <Tile context="isParent" isVertical> 
                <Tile context="isChild" >
                    <Content>
                        <Button style={{marginLeft:'70px',marginTop:'10px',background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}} >
                        
                        <Link to="/" onClick={() => this.logIn()} style={{padding:'7px',color:"black"}}>
                        เข้าสู่ระบบ</Link>
                            
                        </Button>
                    </Content>
                </Tile>
                <Tile context="isChild">
                <FacebookLogin
    appId="2047145118899508"
    autoLoad={true}
    fields="name,email,picture"
  //  onClick={this.responseFacebook}
    callback={this.responseFacebook} 
    textButton="เข้าสู่ระบบด้วย facebook"
    //language="th_TH"
    language="en_US"
    />
 
    </Tile>
                <Tile context="isChild">
                    <Content >
                        <Button  onClick={this.showModalInputEmail} style={{marginLeft:'15px',background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}} >
                        <Link  to="" style={{padding:'7px',color:"black"}}>
                       ลืมรหัสผ่าน
                        </Link> 
                        </Button> 
                        
                        <Button  style={{marginLeft:'10px',background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}}>
                        <Link to="/register" style={{padding:'7px',color:"black"}}>
                        สมัครสมาชิก</Link> 
                            
                        </Button> 
                    </Content>
                </Tile>
    
            </Tile>

                <table style={{color:'grey'}}>
              <tr >
                <td   ><Label> ชื่อ : </Label></td> 
                <td><Label>{this.state.user}</Label></td>
              </tr> 
              <tr >
                  <td> <Label>สถานะ :</Label> </td>
                  <td>
                  {this.state.userType=="admin"?(<div> <Label>admin</Label> </div>):(<div>{this.state.userType=="officer"?(<div><Label> พนักงาน</Label> </div>):(<div> <Label>ลูกค้า</Label> </div>)}</div>)}
                  </td>
              </tr >
            
                  
             
            </table>

*/
/*
   {this.state.userType=="customerFace"?(<div>
                 
                    <Button style={{marginLeft:'70px',marginTop:'10px',background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}} >
                         <a href="https://www.facebook.com" onClick={() => this.logOutFace()} style={{color:"black",padding:'7px',textDecoration: 'none'}}>
                         ออกจากระบบ
                         </a>
                    </Button>

                </div>

                ):(<div >
                    <table >
                    <tr>
                    <td style={{width:"50px"}}>
                    {this.state.userType=="customer"||this.state.userType=="admin"?(<div>

                    <Button style={{marginLeft:'50px',marginTop:'10px',background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}} >
                    <Link to="/detaliCustomer" style={{color:"black",padding:'7px',textDecoration: 'none'}}>
                    ข้อมูลผู้ใช้
                    </Link>
                        </Button>
                        </div>):(<div></div>)}
                        </td>
                    <td style={{marginLeft:'15px',width:"10px"}}>
                    <Button style={{marginTop:'10px',background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}} >
                    <Link to="/" onClick={() => this.logOut()} style={{color:"black",padding:'7px',textDecoration: 'none'}}>
                    ออกจากระบบ
                    </Link>
               </Button>
               </td></tr>
               </table>
                    
                    </div>)}
*/
/*   <div style={{display: 'none'}}>
           <SHOW_PRODUCT  clickTakeBasket={this.clickTakeBasket}/>
           </div>*/