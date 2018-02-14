import React, { Component } from 'react';
import queryString from 'query-string';

import {Hero,HeroHead,Nav,Container,NavGroup,NavToggle,NavItem,HeroBody,Box,Label,Input,Textarea,Button,Columns,Column,Group,Notification}  from 're-bulma';
import {Link} from 'react-router-dom';
class register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user:'',
        pass:'',
        passAgain:'',
        name:'',
        subName:'',
        email:'',
        phone:'',
        address:'',
        inputUser:(<Input type="text" placeholder="Text input"  color="isInfo" size="isSmall" onChange={this.setUser} onBlur={this.checkUser}/>),
        inputPass:(<Input type="password" placeholder="pass"  color="isInfo" size="isSmall" onChange={this.setPass}  onBlur={this.checkPass} />),
        inputPassAgain:(<Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain} />),
        inputName:( <Input type="ชื่อ" placeholder="Name input"  color="isInfo" size="isSmall" onChange={this.setName}  />),
        inputSubName:(<Input type="text" placeholder="subname input"  color="isInfo" size="isSmall" onChange={this.setSubName}/>),
        inputEmail:( <Input type="text" placeholder="Email input"  icon="fa fa-warning"  color="isInfo" hasIconRight size="isSmall" onChange={this.setEmail}/>),
        inputPhone:(<Input type="text" placeholder="xxx-xxxxxxx"  icon="fa fa-warning"  color="isInfo" hasIconRight size="isSmall" onChange={this.setPhone}/>),
        inputAddress:( <Textarea   color="isInfo" size="isSmall" onChange={this.setAddress}/>),
        checkSuckcess:false,
        checkInsert:false,
        checkUser:0,
        checkPass:0,
        checkPassAgain:0,
        checkName:0,
        checkSubName:0,
        checkEmail:0,
        checkPhone:0,
        checkAdress:0,
      };
     
     
    }
    
    componentWillMount() {
      console.log("sdsd")
    this.props.setExact(true);
    }
    setUser=(event)=>{
      this.setState({user: event.target.value})
    }
    setPass=(event)=>{
      this.setState({pass: event.target.value})
    }
    setPassAgain=(event)=>{
      this.setState({passAgain: event.target.value})
    }
    setName=(event)=>{
      this.setState({name: event.target.value})
    }
    setSubName=(event)=>{
      this.setState({subName: event.target.value})
    }
    setEmail=(event)=>{
      this.setState({email: event.target.value})
    }
    setPhone=(event)=>{
      this.setState({phone: event.target.value})
    }
    setAddress=(event)=>{
      this.setState({address: event.target.value})
    }
    checkUser=()=>{
      console.log("sd");
      if(this.state.user.length<6){
        this.setState({checkUser:2})
      }else if(this.state.user==""){ 
        this.setState({checkUser:1})
        }
    }
    checkPass=()=>{
      if(this.state.pass.length<6){
        this.setState({inputPass:(<Input type="password" placeholder="pass"  color="isInfo" size="isSmall" onChange={this.setPass} onBlur={this.checkPass}   
        icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'รหัสผ่านควรเกิน 6 ตัว',}}/>)})
      }else{ 
        this.setState({inputPass:(<Input type="password" placeholder="pass"  color="isInfo" size="isSmall" onChange={this.setPass} onBlur={this.checkPass}  
         icon="fa fa-check"  hasIconRight help={{ color: 'isSuccess',text: 'This pass is available'}}/>)})
         }

    }
    checkPassAgain=()=>{
      if(this.state.pass!=this.state.passAgain){
        this.setState({inputPassAgain:(<Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain}   
        icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'กรอกรหัสผ่านให้ตรงกัน',}}/>)})

      }else if(this.state.passAgain==''){
        this.setState({inputPassAgain:(<Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain}   
        icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'กรอกรหัสผ่านซ้ำอีกครั้ง',}}/>)})

      }
      else{
        this.setState({inputPassAgain:(<Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain} 
        icon="fa fa-check"  hasIconRight help={{ color: 'isSuccess',text: 'รหัสผ่านตรงกัน'}}/>)})

      }


    }
    returnInput=(type,placeholder,color,chage,icon,color2,text)=>{
      return <Input type={`${type}`} placeholder={`${placeholder}`}  color={`${color}`} size="isSmall" onChange={this.setEmail} 
      icon={`${icon}`}  hasIconRight help={{ color: `${color2}`,text: `${text}`}}/>

    }
    insertAgain=()=>{
      this.setState({checkSuckcess:false,checkInsert:false});

    }
   
    clickRegister=()=>{
               
                  fetch('http://localhost:9000/checkUserPass', {
                    headers: {
                                'Content-Type':'application/x-www-form-urlencoded'
                    
                            },
                
                    method: "POST",
                    body:  queryString.stringify({'user':this.state.user,'email':this.state.email})

                })
                .then((response) => response.json())
                .then((data) => {
                  
                                var check1=0;
                                var check=0;
                              if(data.user==true) check1=1;
                              if(data.email==true) check=1;
                              
                              var check2=0;
                              var check3=0;
                              var check4=0;
                              var check5=0;
                              var check6=0;
                              var check7=0;
                              var check8=0;
                              var check9=0;

                            if(this.state.user.length<6){
                                this.setState({inputUser:(<Input type="text" placeholder="Text input"  color="isInfo" size="isSmall" onChange={this.setUser} onBlur={this.checkUser}   
                                icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'user ควรเกิน 6 ตัว',}}/>)})
                                window.scrollTo(0, 0);  
                          }else if(check1==0){
                                this.setState({inputUser:(<Input type="text" placeholder="Text input"  color="isInfo" size="isSmall" onChange={this.setUser} onBlur={this.checkUser}   
                                icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'user นี้มีคนใช้แล้ว',}}/>)})

                            }else{ 
                            this.setState({inputUser:(<Input type="text" placeholder="Text input"  color="isInfo" size="isSmall" onChange={this.setUser} onBlur={this.checkUser}   
                              icon="fa fa-check"  hasIconRight help={{ color: 'isSuccess',text: 'This username is available'}}/>)})
                              check2=1;
                            }
                            if(this.state.pass.length<6){
                                this.setState({inputPass:(<Input type="password" placeholder="pass"  color="isInfo" size="isSmall" onChange={this.setPass} onBlur={this.checkPass}   
                                icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'รหัสผ่านควรเกิน 6 ตัว',}}/>)})
                            }else{ 
                                this.setState({inputPass:(<Input type="password" placeholder="pass"  color="isInfo" size="isSmall" onChange={this.setPass} onBlur={this.checkPass}  
                                icon="fa fa-check"  hasIconRight help={{ color: 'isSuccess',text: 'This pass is available'}}/>)})
                                check3=1 ;
                            }
                            if(this.state.pass!=this.state.passAgain){
                                this.setState({inputPassAgain:(<Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain}   
                                icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'กรอกรหัสผ่านให้ตรงกัน',}}/>)})

                            }else if(this.state.passAgain==''){
                                  this.setState({inputPassAgain:(<Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain}   
                                  icon="fa-warning" hasIconRight help={{ color: 'isDanger', text: 'กรอกรหัสผ่านซ้ำอีกครั้ง',}}/>)})

                            }
                            else{
                                  this.setState({inputPassAgain:(<Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain} 
                                  icon="fa fa-check"  hasIconRight help={{ color: 'isSuccess',text: 'รหัสผ่านตรงกัน'}}/>)})
                                  check4=1;
                            }
                            if(this.state.name!='') {check5=1;  this.setState({inputName:this.returnInput("text","Name input","isInfo",this.setName,"fa fa-check",'isSuccess','This name is available')})}
                            else{ this.setState({inputName:this.returnInput("text","Name input","isInfo",this.setName,"fa fa-check",'isDanger','กรุณาใส่ชื่อ')})}
                                
                            if(this.state.subName!='') {check6=1; this.setState({inputSubName:(<Input Input type="ชื่อ" placeholder="Name input"  color="isInfo" size="isSmall" onChange={this.setName}
                                  icon="fa fa-check"  hasIconRight help={{ color: 'isSuccess',text: 'This name is available'}}/>)})}
                            else{this.setState({inputSubName:(<Input Input type="ชื่อ" placeholder="Name input"  color="isInfo" size="isSmall" onChange={this.setName}
                                icon="fa fa-check"  hasIconRight help={{ color: 'isDanger',text: 'กรุณาใส่นามสกุล'}}/>)})

                            }
                            if(this.state.email!='') {check7=1;this.setState({inputEmail:this.returnInput("text","Email input","isInfo",this.setEmail,"fa fa-check",'isSuccess','This email is available')})}
                            else{this.setState({inputEmail:this.returnInput("text","Email input","isInfo",this.setEmail,"fa fa-check",'isDanger','กรุณาใส่อีเมล')})}
                            if(check==0){this.setState({inputEmail:this.returnInput("text","Email input","isInfo",this.setEmail,"fa fa-check",'isDanger','อีเมลนี้มีคนใช้แล้ว')})}
                              
                            if(this.state.phone!='') {check8=1; this.setState({inputPhone:this.returnInput("text","Phone input","isInfo",this.setPhone,"fa fa-check",'isSuccess','This phone is available')})}
                            else{this.setState({inputPhone:this.returnInput("text","Phone input","isInfo",this.setPhone,"fa fa-check",'isDanger','กรุณาใส่เบอร์โทร')})}
                                
                            if(this.state.address!='') {check9=1;this.setState({inputAddress:(<Textarea   color="isInfo" size="isSmall" onChange={this.setAddress}
                                icon="fa fa-check"  hasIconRight help={{ color: 'isSuccess',text: 'This name is available'}}/>)})}
                            else{this.setState({inputAddress:(<Textarea   color="isInfo" size="isSmall" onChange={this.setAddress}
                                icon="fa fa-check"  hasIconRight help={{ color: 'isDanger',text: 'กรุณาใส่ที่อยู่'}}/>)})}
                                
                              
                            if(check1===1 && check==1 && check2===1 && check3===1 && check4===1 && check5===1 && check6===1 && check7===1 && check8===1 && check9===1){
                                      
                                  fetch('http://localhost:9000/insertusers', {
                                    headers: {
                                                'Content-Type':'application/x-www-form-urlencoded'
                                    
                                            },
                                
                                    method: "POST",
                                    body:  queryString.stringify(
                                                                {'user':this.state.user,
                                                                 'pass':this.state.pass,
                                                                 'name':this.state.name,
                                                                 'subName':this.state.subName,
                                                                 'email':this.state.email,
                                                                 'phone':this.state.phone,
                                                                 'address':this.state.address
                                                                })
                                                              
                
                                  })
                                  .then((response) => response.json())
                                  .then((data) => {
                                      if(data.qreury==true){
                                        this.setState({checkSuckcess:true,checkInsert:true});
                                      }
                                      else if(data.qreury==false){
                                        this.setState({checkSuckcess:true,checkInsert:false});
                                      }
                                  
                                  } 
                                  )
              
                            }
                  })
    }
  

    render() {
      
        return (
        <div >
          <Hero  style={{height:'680px'}} >
               
          <HeroHead >
                   
                      <Nav style={{backgroundColor:'#f2f2f2'}} >
                      
                        <Container >
                       
                          <NavGroup align="left">
                            <NavItem >
                              <img src="logo.png" alt="Logo" />
                            </NavItem>
                          </NavGroup>
                          <NavToggle />
                          <NavGroup align="right" isMenu>
                            <NavItem isActive>
                            <Link to="/" style={{padding:'7px'}}  onClick={() => this.props.setExact(false)} >
                            Home</Link>
                                
                              </NavItem>
                              
                           
                            </NavGroup>
                          
                        </Container>
                      
                      </Nav>
                        
                    </HeroHead>
                    <HeroBody>
                    <Container >
                        <Box>
                          <Notification >
          {this.state.checkSuckcess ? 
            ( <div>
              {this.state.checkInsert ? (
                                          <div>
                                          <Container hasTextCentered>
                                          <h2>เรียบร้อย คุณสามารถใช้รหัสที่สมัครเข้าระบบได้ทันที</h2>
                                          <Button color="isInfo" style={{padding:'0px'}} > <Link to="/" style={{padding:'7px'}}  onClick={() => this.props.setExact(false)} >
                                                                    กลับไปหน้าหลัก
                                                                    </Link>
                                          </Button>
                                          </Container>
                                          </div>
                                          ) :
                                          (
                                          <div>
                                          <Container hasTextCentered>
                                          <h2>ระบบเกิดข้อผิดพลาด กรุณากดเพื่อลองใหม่อีกครั้ง</h2>
                                          <Button color="isInfo" onClick={this.insertAgain}>ลองใหม่</Button>
                                          </Container>
                                          </div>
                                          )
              }
              </div>
            ) : 
            (
              <div>
             
                     
                       
                          <Container hasTextCentered>
                            <h2>สมัครสมาชิก</h2>
                          </Container>
                            <Column size="is2">
                                <Label>ชื่อผู้ใช้(สำหรับล็อคอิน)</Label>
                                <Input type="text" placeholder="Text input"  size="isSmall" onChange={this.setUser} onBlur={this.checkUser}/>
                                
                            </Column>
                            <Column>
                            {this.state.checkUser==0?(<div></div>):(<div>{this.state.checkUser==1?(<div style={{color:"red"}}>กรุณาใส่รหัส</div>):(<div>{this.state.checkUser==2?(<div style={{color:"red"}}>รหัสต้องเกิน 6 5ตัว</div>):(<div>รหัสนี้ใช้แล้ว กรุณาใช้รหัสอื่น</div>)}</div>)}</div>)}
                            </Column>
                            <Column size="is2">
                                <Label>Password</Label>
                                <Input type="password" placeholder="pass"  color="isInfo" size="isSmall" onChange={this.setPass}  onBlur={this.checkPass} />
                                <Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain} />
                                
                            </Column>
                          
                            <Column size="is5">
                             <Columns>
                              <Column>
                                <Label >ชื่อ</Label>
                                <Input type="ชื่อ" placeholder="Name input"  color="isInfo" size="isSmall" onChange={this.setName}  />
                              </Column>
                              <Column>
                                <Label>นามสกุล</Label>
                                <Input type="text" placeholder="subname input"  color="isInfo" size="isSmall" onChange={this.setSubName}/>
                                </Column>
                              </Columns>
                            </Column>
                            <Column size="is3">
                                <Label>อีเมล</Label>
                                <Input type="text" placeholder="Email input"  icon="fa fa-warning"  color="isInfo" hasIconRight size="isSmall" onChange={this.setEmail}/>
                            </Column>
                            <Column size="is3">
                                <Label>เบอร์โทรศัพท์</Label>
                                <Input type="text" placeholder="xxx-xxxxxxx"  icon="fa fa-warning"  color="isInfo" hasIconRight size="isSmall" onChange={this.setPhone}/>
                            </Column>
                            <Column size="is7">
                                <Label>ที่อยู่</Label>
                                <Textarea   color="isInfo" size="isSmall" onChange={this.setAddress}/>
                            </Column>
                            <Container hasTextCentered>
                              <Button color="isInfo" onClick={this.clickRegister}>register</Button>
                            </Container>
                        
                      
                 
                    
              </div>
            )}
          </Notification>
               </Box>
                </Container>
            </HeroBody>
          
            </Hero> 
                </div>
                )}}

export default register;
