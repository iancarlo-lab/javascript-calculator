import React from 'react';
import './App.css';
import ButtonPad from './components/ButtonsPad';
import Result from './components/Result';

class AutoScalingText extends React.Component{
  state={
    scale: 1
  }
  componentDidUpdate(){
    const {scale} = this.state
    const node = this.node
    const parentNode = node.parentNode
    const availableWidth = parentNode.offsetWidth
    const actualWidth = node.offsetWidth
    const actualScale = availableWidth / actualWidth

    if(scale === actualScale)
    return 

    if(actualScale < 1){
      this.setState({
        scale: actualScale
      })
    } else if(scale < 1) {
      this.setState({
        scale: 1
      })
    }
  }
  render(){
    const {scale} = this.state

    return (
      <div 
      style={{transform: `scale(${scale},${scale})`}}
       ref={node => this.node = node}> {this.props.children} </div>
    )
  }
}

class CalculatorDisplay extends React.Component {
  render() {
    const { value, ...props } = this.props
    
    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })
    
    // Add back missing .0 in e.g. 12.0
    const match = value.match(/\.\d*?(0*)$/)
    
    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]
    
    return (
      <div {...props} className="calculator-display" id="display">
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </div>
    )
  }
}



class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: null,
      displayValue: '0',
      waitingForOperand: false,
      operator: null
      }
  }

  inputDigit(e) {
    const {displayValue, waitingForOperand} = this.state

    if(waitingForOperand){
      this.setState({
        displayValue: String(e),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(e) : displayValue + e
      })
    }
  }

  inputDot(){
    const {displayValue, waitingForOperand} = this.state

    if(waitingForOperand){
      this.setState({
        displayValue: '0.',
        waitingForOperand: false})
    } else if(displayValue.indexOf('.') === -1){
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      value: null,
      operator: null,
      waitingForOperand: false
    })
  }

  calculateOps = (op) => {
    const {displayValue, operator, value,waitingForOperand} = this.state
    const nextValue = parseFloat(displayValue)

    const operations = {
      '/': (prevValue, nextValue) => parseFloat(prevValue) / nextValue,
      '*': (prevValue, nextValue) => parseFloat(prevValue) * nextValue,
      '-': (prevValue, nextValue) => parseFloat(prevValue) - nextValue,
      '+': (prevValue, nextValue) => parseFloat(prevValue) + nextValue,
      '=': (prevValue, nextValue) => nextValue
    }
    if(operator && waitingForOperand){
      this.setState({
        operator: op
      })
      return
    }

    if(value === null){
      this.setState({
        value: nextValue
      })
    }else if(operator){
      const currentValue = value || 0;
      const computedValue = operations[operator](currentValue, nextValue)

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }
    this.setState({
      waitingForOperand: true,
      operator: op
    })
  }

  render(){
    const {displayValue} = this.state
  return (
    <div className="calculator">
      <Resultado value={displayValue}/>
      <div id="num-buttons">
     <button id="add" value="+" onClick={() => this.calculateOps('+')}> + </button>
     <button id="subtract" value="-" onClick={() => this.calculateOps('-')}>-</button>
     <button id="multiply" value="*" onClick={() => this.calculateOps('*')}>X</button>
     <button id="divide" value="/" onClick={() => this.calculateOps('/')}>/</button>

     <button id="nine" value="9" onClick={() => this.inputDigit(9)}>9</button>
     <button id="eight" value="8" onClick={() => this.inputDigit(8)}>8</button>
     <button id="seven" value="7" onClick={() => this.inputDigit(7)}>7</button>
     <button id="six" value="6" onClick={() => this.inputDigit(6)}>6</button>
     <button id="five" value="5" onClick={() => this.inputDigit(5)}>5</button>
     <button id="four" value="4" onClick={() => this.inputDigit(4)}>4</button>
     <button id="three" value="3" onClick={() => this.inputDigit(3)}>3</button>
     <button id="two" value="2" onClick={() => this.inputDigit(2)}>2</button>
      <button id="one" value="1" onClick={() => this.inputDigit(1)}>1</button>
      <button id="zero" value="0" onClick={() => this.inputDigit(0)}>0</button>
      <button id="clear" value ="ac" onClick={() => this.clearDisplay()}>AC</button>
      <button id="decimal" value="." onClick={() => this.inputDot()}>.</button>
      <button id="equals" value="=" onClick={() => this.calculateOps('=')}>=</button>
      </div>
    </div>
  )
  }
}
class Resultado extends React.Component {
  render(){
    const {value} = this.props
      return(
          <div id="input">
              <p id="display">{value}</p>
          </div>
      )
  }
}

export default App;
