import React from 'react';

function Display(props) {
  console.log("TCL: Display -> props", props)
  return (
    <input
      type="text"
      name="displayInput"
      value={props.displayValue}
      style={inputDisplayStyle}
    />
  );
}

const inputDisplayStyle = {
  textAlign: 'right', 
  marginTop: '.2rem', 
  width: '99%', 
  height: '3rem', 
  fontSize: 'x-large',
  zIndex: '10',
  lineHeight: '2',
  direction: 'rtl' 
}

export default Display;
