import React from 'react';

function Hexagon(props) {
  return (
    <div
        key={"hex-" + props.hex.row + "-" + props.hex.index} 
        id={"hex-" + props.hex.row + "-" + props.hex.index} 
        className="hexagon"
        hexstate={props.hex.state}>
        <span>{props.hex.value}</span>
        <svg className="hexagonSvg" viewBox="0 0 174 200">
          <polyline points="87,0 174,50 174,150 87,200 0,150 0,50 87,0"/>
        </svg>
    </div>
  );
}

export default Hexagon;
