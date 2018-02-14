import React, { Component } from 'react';
import {ApSlideshow, ApSlideshowStyle} from 'apeman-react-slideshow';

const height_head={ height:'150px',width:'200px' };
const head =()=> <div>
                     
                        <img style={height_head} src={require('../../img/home/logofin.png')} />
                  </div>
export default head;
