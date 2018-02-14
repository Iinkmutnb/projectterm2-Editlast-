import React, { Component } from 'react';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
import {  Columns ,Column,Notification,Group,Button,Modal,Content} from 're-bulma';
import LOGO from '../home/head/logo.js';
import SLIDE from '../home/head/slide.js';
import LOGIN from  '../home/head/login.js';
import TAP_MENU from  '../home/head/tapMenu.js';

import BUTTON_FACE_LINE from '../home/head/buttonFaceLine.js';

import queryString from 'query-string';
import {BrowserRouter,Link,Route} from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    
    insertCss(css, { prepend: true });
                      }

  render() {
    
   
    const padding_head = { padding: '5px'};
 
  
    
    return (
      <div >
    
       
   

      </div>
    );
  }
}

export default Home; /*
    <Columns  style={{border:'1px solid #C8C8C8',borderRadius: '12px',background:'linear-gradient(to bottom, #bfbfbf 0%, #ffffff 100%)'}}>
          <Column >
            <LOGO />
          </Column>

          <Column>
            <SLIDE/>
          </Column>
        </Columns>
        
        <Columns >
          <Column size="isOneQuarter" context="isParent" isVertical >
            <Column  context="isChild">
              <LOGIN/>
            </Column>
           
              
          </Column>
          
          <Column context="isParent" isVertical >
          <Column  context="isChild" style={{ position: 'sticky', top:'0px'}}> 
                  <TAP_MENU/>
                  </Column>

              
            
          <Column  context="isChild" > 
              
          <BUTTON_FACE_LINE/>
                </Column>
              
                <Column  context="isChild" > 
                
          </Column>
            
          </Column>
          

      

          
           
        </Columns >*/
