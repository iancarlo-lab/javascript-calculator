import React from 'react';


class ButtonPad extends React.Component{
    render(){
       return( 
     <div id="num-buttons">
     <button id="add" value="+" onClick={e => this.props.onClick(e.target.value)}> + </button>
     <button id="subtract" value="-" onClick={e => this.props.onClick(e.target.value)}>-</button>
     <button id="multiply" value="*" onClick={e => this.props.onClick(e.target.value)}>X</button>
     <button id="divide" value="/" onClick={e => this.props.onClick(e.target.value)}>/</button>
      <button id="one" value="1" onClick={e => this.props.onClick(e.target.value)}>1</button>
      <button id="two" value="2" onClick={e => this.props.onClick(e.target.value)}>2</button>
      <button id="three" value="3" onClick={e => this.props.onClick(e.target.value)}>3</button>
      <button id="four" value="4" onClick={e => this.props.onClick(e.target.value)}>4</button>
      <button id="five" value="5" onClick={e => this.props.onClick(e.target.value)}>5</button>
      <button id="six" value="6" onClick={e => this.props.onClick(e.target.value)}>6</button>
      <button id="seven" value="7" onClick={e => this.props.onClick(e.target.value)}>7</button>
      <button id="eight" value="8" onClick={e => this.props.onClick(e.target.value)}>8</button>
      <button id="nine" value="9" onClick={e => this.props.onClick(e.target.value)}>9</button>
      <button id="zero" value="0" onClick={e => this.props.onClick(e.target.value)}>0</button>
      <button id="clear" value ="ac" onClick={() => this.clearDisplay()}>AC</button>
      <button id="decimal" value="." onClick={e => this.props.onClick(e.target.value)}>.</button>
      <button id="equals" value="=" onClick={e => this.props.onClick(e.target.value)}>=</button>
      </div>
      )
    }
}

//export default ButtonPad;



