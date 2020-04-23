import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Output } from "./containers/Output";
import { Button } from "./components/Button";
const OPERATIOR_BUTTONS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a + b,
  "/": (a, b) => a / b,
  "=": (a, b) => b,
};
const BUTTON_GOUPS = [
  { "1": null },
  { "2": null },
  { "3": null },
  { "+": OPERATIOR_BUTTONS["+"] },
  { "4": null },
  { "5": null },
  { "6": null },
  { "-": OPERATIOR_BUTTONS["-"] },
  { "7": null },
  { "8": null },
  { "9": null },
  { "*": OPERATIOR_BUTTONS["*"] },
  { c: null },
  { "0": null },
  { "=": OPERATIOR_BUTTONS["="] },
  { "/": OPERATIOR_BUTTONS["/"] },
];

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valueToDisplay: "0",
      value: null,
      operator: null,
      waitingForOperand: false,
    };
  }
  clearAll = () => {
    this.setState({
      value: null,
      valueToDisplay: "0",
      waitingForOperand: false,
      operator: null,
    });
  };

  onNumberClick = (e, numberInput) => {
    console.log(this.state);
    const { valueToDisplay, waitingForOperand } = this.state;
    if (waitingForOperand) {
      this.setState({
        valueToDisplay: String(numberInput),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        valueToDisplay:
          valueToDisplay === "0"
            ? String(numberInput)
            : valueToDisplay.concat(numberInput),
      });
    }
    console.log(this.state);
  };
  onOperatorClick = (e, nextOperator) => {
    // calculate  previous input digit and previous operator
    // and set inputOperator to operator state for next calculation
    console.log(this.state);
    const { value, valueToDisplay, operator } = this.state;
    const inputValue = parseFloat(valueToDisplay); // get previous enterd value eg A

    if (value === null) {
      // if current total value is 0 or null
      this.setState({
        value: inputValue,
      });
    } else if (operator) {
      // when a+b-
      const currentValue = value || 0;
      const newValue = OPERATIOR_BUTTONS[operator](currentValue, inputValue);
      debugger;
      this.setState({
        value: newValue,
        valueToDisplay: newValue + "",
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  };
  renderButtons = (buttonMap) => {
    return BUTTON_GOUPS.map((buttonObj) => {
      const buttonKey = Object.keys(buttonObj)[0];
      if (buttonObj[buttonKey]) {
        // check if  operator button
        return (
          <Button
            label={buttonKey}
            key={buttonKey}
            onClick={this.onOperatorClick}
            className="button"
            value={buttonKey}
          ></Button>
        );
      } else if (buttonKey === "c") {
        // check if clear button
        return (
          <Button
            label={buttonKey}
            onClick={this.clearAll}
            className="button"
            key={buttonKey}
          ></Button>
        );
      } else {
        return (
          <Button
            label={buttonKey}
            key={buttonKey}
            onClick={this.onNumberClick}
            className="button"
            value={buttonKey}
          ></Button>
        );
      }
    });
  };
  render() {
    return (
      <div className="App">
        <Output className="output" value={this.state.valueToDisplay}></Output>
        <div className="numericContainer">
          {[this.renderButtons(BUTTON_GOUPS)]}
        </div>
        <div className="numericContainer">{}</div>
        <div className="numericContainer">{}</div>
        <div>{}</div>
      </div>
    );
  }
}
