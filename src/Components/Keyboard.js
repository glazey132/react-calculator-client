import React from 'react';

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
  let keyColor;
  if (key === '+' || key === '-' || key === '*' || key === '/') {
    keyColor = 'darkOrange';
  } else if (key === '=') {
    keyColor = 'springGreen'
  } else if (key === 'C') {
    keyColor = 'tomato'
  }
  else {
    keyColor = 'dodgerBlue'
  }
  return {
    width: '6rem',
    height: '4rem',
    margin: '.11rem',
    borderRadius: '50px',
    backgroundColor: 'rgb(35, 36, 37)',
    marginBottom: '10px',
    color: keyColor,
    borderColor: keyColor
  }
};

export default Keyboard;
