import React, { Component } from 'react';
import './App.css';
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
    console.log("TCL: App -> constructor -> socket", socket)
    this.state = {
      socket,
      calculations: []
    };

    this.state.socket.on('calculationsUpdate', calcs => {
    console.log("TCL: App -> constructor -> calcs", calcs)
      this.setState({
        calculations: calcs
      });
    });

    this.state.socket.on('moung', calcs => {
      console.log("TCL: App -> constructor -> mount", calcs)
    });

  }

  componentDidMount() {
    this.state.socket.emit('mount');
  }
  render() {
    return (
      <div className="App">
          <Calculator socket={this.state.socket} />
          <Calculations
            socket={this.state.socket}
            calculations={this.state.calculations}
          />
      </div>
    );
  }
}

export default App;
