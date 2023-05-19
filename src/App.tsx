import React, { useState } from 'react';
import './App.css';
import Dispaly from './components/display/Dispaly';
import Button from './components/button/Button';

function App() {
  const buttonsText: string[] = ["C", "←", "-/+", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  const [value, setValue] = useState<string>('0');
  const [calculatedExpression, setCalculatedExpression] = useState<string>("ENTER SOME NUMBERS")
  const [flag, setFlag] = useState<boolean>(false)

  const valueChange = (num: string) => {
    if(flag) {
      setValue(num)
      setFlag(false)
    } else {
      setValue((prev) => (prev === "0" ? (prev = num) : (prev += num)));
    }
  }

  const whiteBtn = (a: string) => {
    switch(a) {
      case 'C':
        setValue('0')
        setCalculatedExpression("ENTER SOME NUMBERS");
        break
      case '←':
        setValue(prev => prev.length === 1 ? '0' : prev.slice(0, prev.length - 1))
        break;
      case '-/+':
        setValue(prev => prev[0] === '-' ? prev.slice(1, prev.length) : '-' + prev)
        break
      case '.':
        if(value[value.length - 1] !== '.') {
          setValue((prev) => prev + '.');
        }
        break
      case '=':
        let expresion = calculateString(value)
        setValue(`${expresion.toString()}`);
        setCalculatedExpression(`${value} = `);
        setFlag(true)
        break
    }
  }

  const operators = (operator: string) => {
    let valueTwo = value.replace(/ /g, "");
    if (!Number.isNaN(Number(valueTwo[valueTwo.length - 1]) / 2)) {
      setValue((prev) => `${prev} ${operator} `);
    } else {
      let pre = value.slice(0, -2) + operator + ' ';
      setValue(pre);
    }
  }

  const buttonItems = buttonsText.map(b => {
    if(b === '/' || b === '*' || b === '-' || b === '+') {
      return <Button text={b} xType="black" onClick={() => operators(b)} />;
    } else if(b === 'C' || b === '←' || b === '-/+' || b === '=' || b === '.') {
      return <Button text={b} xType="white" onClick={() => whiteBtn(b)} />;
    } else if(b === '0') {
      return <Button text={b} xType="zero" onClick={() => valueChange(b)} />;
    } else {
      return <Button text={b} onClick={() => valueChange(b)} />;
    }
  })

  function calculateString(str: string) {
    return new Function("return " + str)();
  }
  return (
    <div className="App">
      <h1>CALC-U-LATER</h1>
      <div className="display_container">
        <Dispaly value={value} calculatedExpression={calculatedExpression} />
      </div>
      <div className="button_container">{buttonItems}</div>
    </div>
  );
}

export default App;
