import React from 'react';

function Calculations({ calculations }) {
  return (
    <div>
      {calculations.length > 0 ? (
        <section
          style={calulationsSectionStyle}
        >
          <h5>10 most recent Calculations: </h5>
          <ol>
            {calculations.map(calc => (
              <li style={calculationRowStyle} key={calc.timestamp}>
                {calc.computation} - {calc.timestamp}
              </li>
            ))}
          </ol>
        </section>
      )
      :
      (<section style={calulationsSectionStyle}><h5>Loading calculations...</h5></section>)}
    </div>
  );
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
