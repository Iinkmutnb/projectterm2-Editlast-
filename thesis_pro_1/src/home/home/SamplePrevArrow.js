import React, { Component } from 'react';
import {Link} from 'react-router-dom';
function SamplePrevArrow(props) {
    const {className, style, onClick} = props
    return (
      <div
        className={className}
        style={{...style, display: 'block', background: 'black',borderRadius: '50%'}}
        onClick={onClick}
      ></div>
    );
  }

export default SamplePrevArrow;