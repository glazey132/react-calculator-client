import React, { Component } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

import calcularConstants from '../constants/calculatorConstants';
class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayValue: '0',
      waitingForOperand: false,
      operator: null,
      value: null
    };

  }

  inputDigit = e => {
    const { waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: e,
        waitingForOperand: false
      });
    } else {
      this.setState(prev => ({
        displayValue: prev.displayValue === '0' ? e : prev.displayValue + e
      }));
    }
  };

  inputDecimal = () => {
    const { waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      });
    }

    this.setState(prev => ({
      displayValue:
        prev.displayValue.indexOf('.') === -1
          ? prev.displayValue + '.'
          : prev.displayValue
    }));
    
  };

  inputOperator = newOperator => {
    const operations = {
      '+': (prevValue, newValue) => prevValue + newValue,
      '-': (prevValue, newValue) => prevValue - newValue,
      '*': (prevValue, newValue) => prevValue * newValue,
      '/': (prevValue, newValue) => prevValue / newValue,
      '=': (prevValue, newValue) => newValue
    };

    const { displayValue, operator, value, waitingForOperand } = this.state;

    const nextValue = parseFloat(displayValue);

    if (value === null) {
      
      this.setState({
        value: nextValue
      });
      
    } else if (operator && newOperator === '=' && !waitingForOperand) {
      const currentValue = value || 0;
      const computed = operations[operator](currentValue, nextValue);

      this.props.socket.emit(
        'computation',
        `${currentValue}${operator}${nextValue}=${computed}`
      );

      this.setState({
        value: computed,
        displayValue: String(computed),
        waitingForOperand: false
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: newOperator
    });
    
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      value: null,
      operator: null,
      waitingForOperand: false
    });
  };

  handleKeyPress = async e => {
    const { displayValue } = this.state;
    if (calcularConstants.operators.includes(e)) {
      this.inputOperator(e);
    } else if (calcularConstants.fns.includes(e)) {

      if (e === 'C') {
        this.clearDisplay();
      } else {
        this.inputOperator(e);
      }
      
    } else if (calcularConstants.nums.includes(e)) {
      if (e === '.') {

        if (displayValue.indexOf('.') === -1) {
          this.inputDecimal();
        }

      } else {

        // clear the display if user selects a digit directly after running a calculation
        if (this.state.operator === '=') {
          this.clearDisplay();
        }
        this.inputDigit(e);
      }
    }

  };

  render() {
    const { displayValue } = this.state;
    return (
      <section
        style={calculatorSectionStyle}
      >
        <Display displayValue={displayValue} />
        <Keyboard
          handleKeyPress={this.handleKeyPress}
          numKeys={calcularConstants.calculatorOrder}
        />
      </section>
    );
  }
}

const calculatorSectionStyle = {
  backgroundColor: '#232425',
  border: '1px solid darkgrey',
  minWidth: '500px',
  maxWidth: '500px',
  paddingRight: '5px',
  height: '75%',
  minHeight: '400px',
  marginLeft: '1rem',
  paddingLeft: '3px',
  paddingTop: '5px',
  boxShadow: 'inset 3px 3px black',
}

export default Calculator;