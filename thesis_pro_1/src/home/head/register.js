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
        checkall:0
      };
     
     
    }
    
    componentWillMount() {
      console.log("sdsd")
    
      this.props.setExact(false,true);
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
      if(this.state.user==""){
        this.setState({checkUser:1})
      }else if(this.state.user.length<6){ 
        this.setState({checkUser:2})
        }
        else{
          this.setState({checkUser:0})
        }
    }
    checkPass=()=>{
      if(this.state.pass==""){
        this.setState({checkPass:1})
      }else if(this.state.pass.length<6 ){ 
        this.setState({checkPass:2})
         }
        else{
          this.setState({checkPass:0})
        }

    }
    checkPassAgain=()=>{
      if(this.state.passAgain==''){
        this.setState({checkPassAgain:1})

      }else if(this.state.pass!=this.state.passAgain){
        this.setState({checkPassAgain:2})

      }
      else{
        this.setState({checkPassAgain:0})

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
                              this.setState({checkUser:2})
                               
                            }else if(check1==0){
                            this.setState({checkUser:3})

                            }else{ 
                          
                              check2=1;
                            }
                            if(this.state.pass.length<6){
                              this.setState({checkPass:2})
                            }else{ 
                               
                                check3=1 ;
                            }
                            if(this.state.pass!=this.state.passAgain){
                              this.setState({checkPassAgain:2})

                            }else if(this.state.passAgain==''){
                              this.setState({checkPassAgain:1})

                            }
                            else{
                                  
                                  check4=1;
                            }
                            if(this.state.name!='') {this.setState({checkName:0});check5=1; }
                            else{    this.setState({checkName:1})}
                                
                            if(this.state.subName!='') {check6=1; this.setState({checkSubName:0});}
                            else{this.setState({checkSubName:1});

                            }
                            if(this.state.email!='') {check7=1;this.setState({checkEmail:0});}
                            else{this.setState({checkEmail:1});}
                            if(check==0){this.setState({checkEmail:2});}
                              
                            if(this.state.phone!='') {check8=1;this.setState({checkPhone:0});}
                            else{this.setState({checkPhone:1});}
                                
                            if(this.state.address!='') {check9=1;this.setState({checkAdress:0});}
                            else{this.setState({checkAdress:1});}
                            if(check1===1 && check==1 && check2===1 && check3===1 && check4===1 && check5===1 && check6===1 && check7===1 && check8===1 && check9===1){
                              this.setState({checkall:0}); 
                            }else{this.setState({checkall:1}); }
                              
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
                        <hr/>
                        <h1>
                          ข้อมูลที่ใช้ติดต่อระบบ
                          </h1>
                          <hr/>
                            <table >
                            <tr><td>&nbsp;</td></tr>
                                <tr >
                                <td><Label> 1) </Label> </td>  <td ><Label> ชื่อผู้ใช้ (สำหรับล็อคอิน)</Label></td>

                                </tr>
                               
                                <tr  >
                                <td></td>
                                  <td>
                                  <Input type="text" placeholder="Text input"  color="isInfo" size="isSmall" onChange={this.setUser} onBlur={this.checkUser}/>
                                </td>
                                </tr >
                                <tr>
                                <td></td>
                                  <td style={{color:"red"}}>
                                {this.state.checkUser==0?(<div></div>):(<div>{this.state.checkUser==1?(<div style={{color:"red"}}>กรุณาใส่ชื่อผู้ใช้</div>):(<div>{this.state.checkUser==2?(<div style={{color:"red"}}>ชื่อผู้ใช้ต้องเกิน 6ตัว</div>):(<div>ชื่อผู้ใช้นี้ใช้แล้ว กรุณาใช้ชื่อผู้ใช้อื่น</div>)}</div>)}</div>)}
                                </td>
                                </tr>
                                <tr><td>&nbsp;</td></tr>
                              </table>
                          
                            <table >
                              <tr >
                              <td><Label> 2) </Label> </td>
                               <td> <Label>รหัสผ่าน</Label></td>
                             </tr>
                             <tr>
                              <td> </td>
                                <td><Input type="password" placeholder="pass"  color="isInfo" size="isSmall" onChange={this.setPass}  onBlur={this.checkPass} /></td></tr>
                              <tr><td>&nbsp;</td><td></td></tr>
                           
                              <tr>
                              <td></td>
                                <td style={{color:"red"}}>
                                {this.state.checkPass==0?(<div></div>):(<div>{this.state.checkPass==1?(<div style={{color:"red"}}>กรุณาใส่รหัสผ่าน</div>):(<div style={{color:"red"}}>รหัสต้องเกิน 6ตัว</div>)}</div>)}
                                </td>
                              </tr>
                              <tr > 
                              <td></td>
                                <td>
                                  <Label>ยืนยันรหัสผ่าน </Label>
                                </td>
                                                          
                              </tr>
                              <tr>
                              <td></td>
                                <td>
                                <Input type="password" placeholder="pass again"  color="isInfo" size="isSmall" onChange={this.setPassAgain} onBlur={this.checkPassAgain} />
                                </td>
                              </tr>
                              <tr>
                              <td></td>
                                <td style={{color:"red"}}>
                                {this.state.checkPassAgain==0?(<div></div>):(<div>{this.state.checkPassAgain==1?(<div style={{color:"red"}}>กรุณาใส่รหัสผ่าน</div>):(<div>{this.state.checkPassAgain==2?(<div style={{color:"red"}}>รหัสผ่านไม่ตรงกัน</div>):(<div></div>)}</div>)}</div>)}
                                </td>  
                              </tr>                         
                            </table>
                            <hr/>
                        <h1>
                          ข้อมูลอื่นๆ
                          </h1>
                          <hr/>
                            <table>
                            <tr><td>&nbsp;</td></tr>
                              <tr> <td><Label> 3) </Label> </td><td><Label >ชื่อ</Label></td></tr>
                              <tr><td></td><td>
                                <Input type="ชื่อ" placeholder="Name input"  color="isInfo" size="isSmall" onChange={this.setName}  />
                              </td></tr>
                              <tr><td></td><td style={{color:"red"}}>
                              {this.state.checkName==0?(<div></div>):(<div>กรุณาใส่ชื่อ</div>)}
                              </td></tr>
                              <tr><td><Label> 4) </Label></td><td>
                                <Label>นามสกุล</Label>
                              </td></tr>
                              <tr><td></td><td>
                                <Input type="text" placeholder="subname input"  color="isInfo" size="isSmall" onChange={this.setSubName}/>
                                </td></tr>
                                <tr><td></td><td style={{color:"red"}}>
                                {this.state.checkSubName==0?(<div></div>):(<div>กรุณาใส่นามสกุล</div>)}
                                </td></tr>
                            </table>
                            <table>
                            <tr><td><Label> 5) </Label></td><td>
                                <Label>อีเมล</Label>
                                </td></tr>
                                <tr><td></td><td >
                                <Input type="text" placeholder="Email input"  icon="fa fa-warning"  color="isInfo" hasIconRight size="isSmall" onChange={this.setEmail}/>
                                </td></tr>
                                <tr><td></td><td style={{color:"red"}}>
                            {this.state.checkEmail==0?(<div></div>):(<div>{this.state.checkEmail==1?(<div style={{color:"red"}}>กรุณาใส่อีเมล</div>):(<div style={{color:"red"}}>อีเมลนี้มีคนใช้แล้ว</div>)}</div>)}
                            </td></tr>
                            <tr><td><Label> 6) </Label></td><td>
                                <Label>เบอร์โทรศัพท์</Label>
                                </td></tr>
                                <tr><td></td><td>
                                <Input type="text" placeholder="xxx-xxxxxxx"  icon="fa fa-warning"  color="isInfo" hasIconRight size="isSmall" onChange={this.setPhone}/>
                                </td></tr>
                                <tr><td></td><td style={{color:"red"}}>
                            {this.state.checkPhone==0?(<div></div>):(<div>กรุณาใส่เบอร์โทรศัพท์</div>)}
                            </td></tr>
                            </table>
                            <table>
                            <tr><td><Label> 7) </Label></td><td>
                                <Label>ที่อยู่</Label>
                                </td></tr>
                                </table>
                                <table style={{ width:'600px'}}>
                                <tr><td></td><td>
                                <Textarea   color="isInfo" size="isSmall" onChange={this.setAddress}/>
                                </td></tr>
                                <tr><td></td><td style={{color:"red"}}>
                            {this.state.checkAdress==0?(<div></div>):(<div>กรุณาใส่ที่อยู่</div>)}
                            </td></tr>
                            </table>
                            {this.state.checkall==0?(<div></div>):(<div style={{color:"red"}}>ใส่ข้อมูลทั้งหมดให้ถูกต้อง</div>)} 
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
