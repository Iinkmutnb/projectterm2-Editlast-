import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Group,Button,Label} from 're-bulma';
import '../../home/css/iconFace/bootstrap-social.css';
import '../../home/css/iconFace/bootstrap-social.less';
class buttonFaceLine extends Component {
  render() {
    // ใส่สไตล์ไว้กับคลาส .table นำมาใช้กัน table tag
    return (
      <div style={{marginLeft:'200px'}}> 
       
       <a className="btn btn-social-icon btn-facebook">
  <span style={{color:'white'}} className="fa fa-facebook"></span>
</a>
</div>
    )
  }
}

export default buttonFaceLine;

/*
  <Group>
<Button color="isPrimary" style={{padding:'0px',width:'200px'}}> 
<a href="https://www.facebook.com/FIN-FROG-THAILAND-1501164043469842/?ref=br_rs" target="_blank"  style={{paddingLeft:'63px',paddingRight:'63px',paddingTop:'7px',paddingBottom:'7px',textDecoration: 'none'}}>
<b style={{color:'white'}}>facebook</b></a></Button>
<Button color="isSuccess" style={{padding:'0px',width:'200px'}}>
<Link to="/pageLine" style={{paddingLeft:'85px',paddingRight:'85px',paddingTop:'7px',paddingBottom:'7px',textDecoration: 'none'}} >
<b style={{color:'white'}}>line</b></Link></Button>  
</Group>

*/