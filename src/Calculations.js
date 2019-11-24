import React, { Component } from 'react';

class Calculations extends Component {
  constructor(props) {
    console.log("TCL: Calculations -> constructor -> props", props)
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section
        style={calulationsSectionStyle}
      >
        <h5>10 most recent Calculations: </h5>{' '}
        <ol>
          {this.props.calculations.map(calc => (
            <li style={calculationRowStyle} key={calc.timestamp}>
              {calc.computation} - {calc.timestamp}
            </li>
          ))}
        </ol>
      </section>
    );
  }
}

const calculationRowStyle = {
  flex: '1' 
}

const calulationsSectionStyle = {
  backgroundColor: 'aliceblue',
  border: '1px solid darkgrey',
  width: '864px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'scroll',
  marginLeft: '1em'
}

export default Calculations;
