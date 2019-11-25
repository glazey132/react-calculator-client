import React, { Component } from 'react';
import Calculator from './Calculator';
import Calculations from './Calculations';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    const socket = io.connect(
      'https://react-calc-12345.herokuapp.com/',
      { transports: ['websocket'] }
    );

    this.state = {
      socket,
      calculations: []
    };

    this.state.socket.on('calculationsUpdate', calcs => {
      this.setState({
        calculations: calcs
      });
    });

    this.state.socket.on('calculationsUpdate', calcs => {
      this.setState({
        calculations: calcs
      });
    });

  }

  componentDidMount() {
    this.state.socket.emit('mount');
  }
  
  render() {
    return (
      <div style={appStyle}>
          <Calculator socket={this.state.socket} />
          <Calculations
            socket={this.state.socket}
            calculations={this.state.calculations}
          />
      </div>
    );
  }

}

const appStyle = {
  textAlign: 'center',
  backgroundColor: 'lightgrey',
  minHeight: '100%',
  height: '100%',
  overflow: 'scroll',
  display: 'flex',
}

export default App;
