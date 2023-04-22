// Get references to the DOM elements
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
const allClearButton = document.querySelector('.span-two');
const deleteButton = document.querySelector('button:nth-of-type(2)');
const operatorButtons = document.querySelectorAll('.calculator-grid button:not(.span-two):not(:nth-of-type(2)):not(:last-of-type)');
const numberButtons = document.querySelectorAll('.calculator-grid button:not(.span-two):not(:nth-of-type(2)):not(:first-of-type):not(:last-of-type)');
const equalsButton = document.querySelector('.calculator-grid button:last-of-type');

// Define variables to keep track of the calculator state
let currentOperand = '';
let previousOperand = '';
let currentOperator = undefined;

// Define a function to update the display
function updateDisplay() {
  currentOperandTextElement.textContent = currentOperand;
  previousOperandTextElement.textContent = previousOperand;
}

// Define a function to clear the calculator state
function clearCalculator() {
  currentOperand = '';
  previousOperand = '';
  currentOperator = undefined;
}

// Define a function to delete the last character from the current operand
function deleteLastCharacter() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

// Define a function to append a digit to the current operand
function appendDigit(digit) {
  if (digit === '.' && currentOperand.includes('.')) return;
  currentOperand += digit;
}

// Define a function to set the current operator
function setCurrentOperator(operator) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  currentOperator = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}

// Define a function to compute the result
function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;
  switch (currentOperator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '×':
      result = prev * curr;
      break;
    case '÷':
      result = prev / curr;
      break;
    default:
      return;
  }
  currentOperand = result;
  currentOperator = undefined;
  previousOperand = '';
}

// Add event listeners to the buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendDigit(button.textContent);
    updateDisplay();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    setCurrentOperator(button.textContent);
    updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener('click', () => {
  clearCalculator();
  updateDisplay();
});

deleteButton.addEventListener('click', () => {
  deleteLastCharacter();
  updateDisplay();
});

  