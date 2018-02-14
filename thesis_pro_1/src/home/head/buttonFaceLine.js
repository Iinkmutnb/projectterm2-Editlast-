import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Group,Button,Label} from 're-bulma';
const buttonFaceLine = () =>  <div style={{marginLeft:'200px'}}>   <Group>
<Button color="isPrimary" style={{padding:'0px',width:'200px'}}> 
<a href="https://www.facebook.com/FIN-FROG-THAILAND-1501164043469842/?ref=br_rs" target="_blank"  style={{paddingLeft:'63px',paddingRight:'63px',paddingTop:'7px',paddingBottom:'7px',textDecoration: 'none'}}>
<b style={{color:'white'}}>facebook</b></a></Button>
<Button color="isSuccess" style={{padding:'0px',width:'200px'}}>
<Link to="/pageLine" style={{paddingLeft:'85px',paddingRight:'85px',paddingTop:'7px',paddingBottom:'7px',textDecoration: 'none'}} >
<b style={{color:'white'}}>line</b></Link></Button>  
</Group></div>

export default buttonFaceLine;
