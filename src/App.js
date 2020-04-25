import React, { PureComponent } from "react";
import "./App.css";
import { Output } from "./containers/Output";
import { Button } from "./components/Button";
const OPERATIOR_BUTTONS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a + b,
  "/": (a, b) => a / b,
  "=": (a, b) => b,
  sign: (a, b) => -b,
  sq: (a, b) => b * b,
  sqrt: (a, b) => Math.sqrt(b),
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

const SCIENTIFIC_MODE_BUTTONS = [{ sign: null }, { sq: null }, { sqrt: null }];

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valueToDisplay: "0",
      value: null,
      operator: null,
      waitingForOperand: false,
      theme: "light",
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
  onOperatorClick = (e, inputOperator) => {
    // calculate  previous input digit and previous operator
    // and set inputOperator to operator state for next calculation
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
      this.setState({
        value: newValue,
        valueToDisplay: newValue + "",
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: inputOperator,
    });
  };
  onSpacialOperatorClick = async (e, inputOperator) => {
    const { valueToDisplay } = this.state;
    const inputValue = parseFloat(valueToDisplay);
    const newValue = OPERATIOR_BUTTONS[inputOperator](null, inputValue);
    this.setState({
      valueToDisplay: newValue + "",
    });
  };
  renderButton = (buttonKey, onClick) => {
    return (
      <Button
        label={buttonKey}
        key={buttonKey}
        className={`${this.state.theme} button`}
        value={buttonKey}
        onClick={onClick}
      ></Button>
    );
  };
  renderAllButtons = (buttonMap) => {
    return buttonMap.map((buttonObj) => {
      const buttonKey = Object.keys(buttonObj)[0];

      if (buttonObj[buttonKey]) {
        // check if  operator button
        return this.renderButton(buttonKey, this.onOperatorClick);
      } else if (buttonKey === "c") {
        // check if clear button
        return this.renderButton(buttonKey, this.clearAll);
      } else {
        return this.renderButton(buttonKey, this.onNumberClick);
      }
    });
  };
  toggleMode = (e) => {
    const { isSciMode } = this.state;
    this.setState({ isSciMode: !isSciMode });
  };
  onThemeChange = (e) => {
    const { theme } = this.state;
    this.setState({ theme: theme === "light" ? "dark" : "light" });
  };
  render() {
    return (
      <div className={`${this.state.theme}`} id="AppContainer">
        <div id="App">
          <Output
            className={`${this.state.theme} output`}
            value={this.state.valueToDisplay}
            isSciMode={this.state.isSciMode}
            onChangeMode={this.toggleMode}
            onThemeChange={this.onThemeChange}
            isDarkTheme={this.state.theme === "dark"}
          ></Output>
          <div className="buttonsContainer">
            {[this.renderAllButtons(BUTTON_GOUPS)]}
            {this.state.isSciMode
              ? SCIENTIFIC_MODE_BUTTONS.map((buttonObj) => {
                  const buttonKey = Object.keys(buttonObj)[0];
                  return (
                    <Button
                      label={buttonKey}
                      onClick={this.onSpacialOperatorClick}
                      className={`${this.state.theme} button`}
                      key={buttonKey}
                      value={buttonKey}
                    ></Button>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}
