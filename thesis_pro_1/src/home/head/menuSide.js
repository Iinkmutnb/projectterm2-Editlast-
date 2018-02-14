import React, { Component } from 'react';
import {Menu,MenuList,MenuLink,MenuLabel,Button} from 're-bulma';
import { Link} from 'react-router-dom';
import cookie from 'react-cookies';
import '../../home/css/menuSide/menuSide.css';
import '../../home/css/menuSide/menuSide.scss';

class menuSide extends Component {
    constructor(props) {
        super(props);
        this.state = {checkAdmin:false}
    }
    componentDidMount() {
        
        var userType= cookie.load('userType');
        if(userType!=null&&(userType=="admin"||userType=="officer")){
            console.log("true")
            this.setState({checkAdmin:true});

            }
        
               

     

    }
    clickLink=()=>{
        window.location.reload();
    }

    render() {
      
        return (
            <div style={{/*border:'1px solid #C8C8C8',borderRadius: '12px',marginBottom:'15px',*/padding:'0px'}}>
     
    <header className="header" role="banner" >
    <h1 className="logo">
    <a  href=""> <span>สินค้า</span></a>
  </h1>
  <div className="nav-wrap">
    <nav className="main-nav" role="navigation">
      <ul className="unstyled list-hover-slide">
      <Link  to="productAllทั้งหมด" onClick={this.clickLink}>สินค้าทั้งหมด</Link>
      <Link  to="productAllกบยาง" onClick={this.clickLink}>กบยาง</Link>
      <Link  to="productAllงานไม้" onClick={this.clickLink}>งานไม้</Link>
      <Link  to="productAllหนอนยาง" onClick={this.clickLink}>หนอนยาง</Link>
      <Link  to="productAllเรซิน" onClick={this.clickLink}>เรชิน</Link>
      <Link  to="productAllสายPE" onClick={this.clickLink}>สายPE</Link>
      <Link  to="productAllคันเบ็ด" onClick={this.clickLink}>คันเบ็ด</Link>
      <Link  to="productAllรอก" onClick={this.clickLink}>รอก</Link>
      <Link  to="productAllฮุกตัวเบ็ด" onClick={this.clickLink}>ฮุกตัวเบ็ด</Link>
      <Link  to="productAllเครื่องแต่งกาย" onClick={this.clickLink}>เครื่องแต่งกาย</Link>
      <Link  to="productAllอื่นๆ" onClick={this.clickLink}>อื่นๆ</Link>
      </ul>
    </nav>
 
  </div>

 </header>
 <center>
    {this.state.checkAdmin?
    (
        <div>
        <Button style={{background:'linear-gradient(to bottom, #ffffff 0%, #d9d9d9 100%)',padding:'0px'}}> 
        <Link to="/editAdmin/product/insert" style={{padding:'7px',outline:'0', textDecoration: 'none'}}>เข้าสู่ะบบการแก้ไข
        </Link>
        </Button>

        </div>
    ):(<div> </div>
    )}
    </center>
    </div>
        );
    }
}

export default menuSide;