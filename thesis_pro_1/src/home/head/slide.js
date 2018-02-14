import React, { Component } from 'react';
import {ApSlideshow, ApSlideshowStyle} from 'apeman-react-slideshow';



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
            <div>
            
               <img style={{ height:'150px',width:'200px' }} src={require('../../img/home/logofin.png')} />
         </div>

         );}
    }


export default slide;
