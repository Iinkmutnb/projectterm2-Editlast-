import React, { Component } from 'react';
import {Menu} from 're-bulma';
import {Hero,HeroHead,Container,NavGroup,NavItem,Nav,Box,Columns,Column,Notification,Button} from 're-bulma';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import queryString from 'query-string';
class menuSide extends Component {
    constructor(props) {
        super(props);
        this.state = {user:'',
                      userType:'',
                      checkPage:true,
                      name:'',
                      subName:'',
                      
                     }
    }
    componentDidMount() {
 
    }
    componentWillMount() {
      this.props.setExact(true,true);
      var userid= cookie.load('userId');
      var userType= cookie.load('userType');
      this.setState({ userId:userid})
      this.setState({ userType:userType})
      console.log(userid)
      fetch('http://localhost:9000/selectOneOfiicerFromUser', {
        headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
        
                },
    
        method: "POST",
        body:  queryString.stringify({'user':userid})

    })
    .then((response) => response.json())
    .then((data) => {console.log(data)

        this.setState({name:data.name,subname:data.subname})
    
                        }) .catch(function(error) 
                        {
                          console.log( error.message);
                        });
      
               
    this.setState({ checkPage:true})
       

    }
    logOut=()=>{
      cookie.remove('userId', { path: '/' });
      cookie.remove('userType', { path: '/' });
      this.setState({isLogin:false,users:''});
      window.location.href = '/';
     
  } 
               
        
     

    

    render() {
      if(this.state.userType=="admin"||this.state.userType=="officer"){
        return (
            <div>
               <Notification style={{backgroundColor:'#f2f2f2',width:'248px',paddingLeft:'0px',paddingBottom:'0px'}}>
                 <table style={{height:'150px',marginTop:'20px'/*,border:'1px solid'*/}}>
                          <tr  style={{/*padding:'0px'*/}}>
                          <td >
                            ชื่อ:
                          </td>
                          <td>{this.state.name}</td>
                          </tr>
                          <tr  style={{/*padding:'0px'*/}}>
                          <td>
                            นามสกุล:
                          </td>
                          <td>{this.state.subname}</td>
                          </tr>
                          <tr >
                          <td> ตำแหน่ง : </td>
                          <td>
                          {this.state.userType=="admin"?(<div> admin </div>):(<div>{this.state.userType=="officer"?(<div> พนักงาน </div>):(<div> ลูกค้า </div>)}</div>)}
                          </td>
                      </tr >
                          <tr  style={{padding:'0px'}}>
                            <td style={{height:'70px'}}>
                            <Button onClick={() => this.logOut()}  style={{marginTop:'10px',background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}}>
                             
                             <b > ออกจากระบบ</b>
                             
                            </Button>
                            </td>
                          </tr>
                          </table>
                          <table style ={{marginTop:'100px'}}> 
                          <tr style={{marginTop:'100px',marginButtom:'0px'}}>
                          <td style={{padding:'0px',height:'40px'}}>
                            <Button style={{width:"247px",height:'40px',padding:'0px'}}> 
                              <Link to="/editAdmin/product/insert"  style={{outline:'0', textDecoration: 'none',marginTop:'0px',padding:'29px 110px 29px 101px'}}>สินค้า</Link>
                            </Button>
                          </td>
                          </tr>
                          {this.state.userType=="admin" ? (
                            <div>
                          <tr style={{marginTop:'0px',padding:'0px'}}>
                          <td style={{padding:'0px',height:'40px'}}>
                            <Button style={{width:"247px",height:'40px',padding:'0px'}}>
                              <Link to="/editAdmin/officer/insertOfficer"  style={{outline:'0', textDecoration: 'none',marginTop:'0px',padding:'29px 102px 29px 85px'}}>พนักงาน</Link>
                            </Button>
                            </td>
                          </tr>
                          </div>):(
                            <div></div>
                          )}

                          <div>
                          <tr style={{marginTop:'0px',padding:'0px'}}>
                          <td style={{padding:'0px',height:'40px'}}>
                            <Button style={{width:"247px",height:'40px',padding:'0px'}}>
                              <Link to="/editAdmin/detailBuyProduct"  style={{outline:'0', textDecoration: 'none',marginTop:'0px',padding:'29px 102px 29px 85px'}}>รายการสั่งซื้อสินค้า</Link>
                            </Button>
                            </td>
                          </tr>
                          <tr style={{marginTop:'0px',padding:'0px'}}>
                          <td style={{padding:'0px',height:'40px'}}>
                            <Button style={{width:"247px",height:'40px',padding:'0px'}}>
                              <Link to="/editAdmin/productPromotion"  style={{outline:'0', textDecoration: 'none',marginTop:'0px',padding:'29px 102px 29px 85px'}}>สินค้าโปรโมชั่น</Link>
                            </Button>
                            </td>
                          </tr>
                          <tr style={{marginTop:'0px',padding:'0px'}}>
                          <td style={{padding:'0px',height:'40px'}}>
                            <Button style={{width:"247px",height:'40px',padding:'0px'}}>
                              <Link to="/editAdmin/connectAdmins/connectAdmin"  style={{outline:'0', textDecoration: 'none',marginTop:'0px',padding:'29px 102px 29px 85px'}}>ติดต่อสอบถาม</Link>
                            </Button>
                            </td>
                          </tr>
                          </div>
                  </table>
               </Notification>

    </div>
        );}
    }
}

export default menuSide;