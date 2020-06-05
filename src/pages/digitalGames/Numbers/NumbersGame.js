import React, {useState} from 'react';
import './Numbers.css';

function NumbersGame() {
  var numbersArray = [];
  for (var i = 0; i < 4; i++) {
    numbersArray.push(RandomInteger(9, 1, 1));
  }

  numbersArray.push(RandomInteger(25, 10, 5));
  numbersArray.push(RandomInteger(100, 25, 25));

  const operations = ["+", "-", "X", "/"];

  const [numbers, setNumbers] = useState(numbersArray);
  const [target, setTarget] = useState(RandomInteger(50, 21, 1));
  const [score, setScore] = useState(0);
  const [highlightedOperation, setHighlightedOperation] = useState();
  const [highlightedIndex, setHighlightedIndex] = useState();

  function handleNumberClick(index) {
    if (highlightedIndex == null) {
      setHighlightedIndex(index);
    } else if (index == highlightedIndex) {
      setHighlightedIndex(null);
    } else {
      var firstIndex = Math.min(index, highlightedIndex);
      var secondIndex = Math.max(index, highlightedIndex);
      var firstNumber = Math.max(numbers[firstIndex], numbers[secondIndex]);
      var secondNumber = Math.min(numbers[firstIndex], numbers[secondIndex]);

      var createdNumber;

      switch(highlightedOperation) {
        case "+":
          createdNumber = firstNumber + secondNumber;
          break;
        case "-":
          createdNumber = firstNumber - secondNumber;
          break;
        case "X":
          createdNumber = firstNumber * secondNumber;
          break;
        case "/":
          if (firstNumber % secondNumber == 0) {
            createdNumber = firstNumber / secondNumber;
          } else {
            return;
          }
          break;
        default:
          return;
      }

      var newNumbersArray = numbers.splice(0, 6);
      newNumbersArray.splice(firstIndex, 1);
      newNumbersArray.splice(secondIndex - 1, 1); //secondIndex has shifted by removal.

      newNumbersArray.splice(index, 0, createdNumber);
      newNumbersArray.push(RandomInteger(9, 1, 1));

      setNumbers(newNumbersArray);
      setHighlightedIndex(null);
      setHighlightedOperation(null);

      if (createdNumber == target) {
        setScore(score + 1);
        setTarget(RandomInteger(50, 21, 1));
      }
    }
  }

  function handleOperationClick(operation) {
    setHighlightedOperation(operation);
  }

  return (
    <div>
      <div className="number-box-container">
        {numbers.map((number, index) => 
          <div className="number-box" onClick={function() {handleNumberClick(index)}} 
               highlighted={index == highlightedIndex ? "true" : null}>
            {number}
          </div>
        )}
      </div>
      <div className="operation-box-container">
        {operations.map((operation) => 
          <div className="operation-box" onClick={function() {handleOperationClick(operation)}} 
               highlighted={operation == highlightedOperation ? "true" : null}>
            {operation}
          </div>
        )}
      </div>
      <p>Target is: {target}</p>
    </div>
  );
}

/*
 * Return a random multiple of an integer, up to a set maximum.
 */
function RandomInteger(max, min, multiple) {
  var range = max - min + 1;
  var multipleRange = Math.floor(range / multiple);
  var multipleLowerLimit = Math.floor(min / multiple) - 1;

  var random = Math.random(); //Between 0 and 1.
  random = random * multipleRange; // Between 0 and multipleRange.
  random = Math.ceil(random); //Integer between 1 and multipleRange
  random = random + multipleLowerLimit;
  random = random * multiple; //Definitely a multiple.

  return random;
}

export default NumbersGame;
