import React, { Component } from 'react';

function Keyboard(props) {
  return (
      <div style={keyboardStyle}>
        {props.numKeys.map(key => (
          <button
            key={key}
            value={key}
            style={keyStyleObj(key)}
            onClick={e => props.handleKeyPress(e.target.value)}
          >
            {key}
          </button>
        ))} 
      </div>
  );
}

const keyboardStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  border: '10px solid #232425'
}

/**
 * calculates a buttons color
 * @param {*} key - button key
 */
const keyStyleObj = function(key) {
  let backgroundColor;
  if (key === '+' || key === '-' || key === '*' || key === '/') {
    backgroundColor = 'darkOrange';
  } else if (key === '=') {
    backgroundColor = 'springGreen'
  } else if (key === 'C') {
    backgroundColor = 'tomato'
  }
  else {
    backgroundColor = 'dodgerBlue'
  }
  return {
    width: '6rem',
    height: '4rem',
    margin: '.11rem',
    backgroundColor: backgroundColor
  }
};

export default Keyboard;
