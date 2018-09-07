import React, { Component } from 'react';
import {ApSlideshow, ApSlideshowStyle} from 'apeman-react-slideshow';
import {Addons,Input,  Columns ,Column,Notification,Group,Button,Modal,Content} from 're-bulma';


class slide extends Component {
      constructor(props) {
          super(props);
          this.state = {
        
        
          };
      }
      componentWillMount() {
            this.props.setExact(false,false,1)
      }

    render() {
      
 
         return (
            <div  >
          <Group >
        <img  style={{ height:'150px',width:'200px',marginLeft:'30%' }} src={require('../../img/home/logofin.png')} />
            <div style={{marginLeft:'50%',marginTop:'20%',width:'100%'}}>
            <Addons color="isInfo">
        <Input   type="text" placeholder="Find ad repository"  />
  <Button color="isSuccess">Search</Button>
  </Addons>
  </div>
  </Group>

         </div>
       

         );}
    }


export default slide;
