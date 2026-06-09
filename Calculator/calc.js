const outputEl = document.getElementById('output');
const historyEl = document.getElementById('history');

let currentInput = '';
let isCalculated = false;

function appendValue(value) {
  // If a calculation was just made, start fresh for a new number
  if (isCalculated && !isNaN(value)) {
    currentInput = '';
  }
  isCalculated = false;

  // Prevent multiple consecutive decimals
  if (value === '.' && currentInput.endsWith('.')) return;
  
  // Prevent leading zeros issues
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  
  updateDisplay();
}

function clearScreen() {
  currentInput = '';
  historyEl.textContent = '';
  outputEl.textContent = '0';
  isCalculated = false;
}

function backspace() {
  if (isCalculated) {
    clearScreen();
    return;
  }
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (!currentInput) return;

  try {
    // Replace visual symbols back to standard code operators before evaluating
    let expression = currentInput;
    historyEl.textContent = expression + ' =';
    
    // Evaluate mathematically
    let result = Function(`"use strict"; return (${expression})`)();
    
    // Handle floating point precision errors (e.g., 0.1 + 0.2)
    if (result % 1 !== 0) {
      result = parseFloat(result.toFixed(8));
    }

    currentInput = result.toString();
    outputEl.textContent = currentInput;
    isCalculated = true;
  } catch (error) {
    outputEl.textContent = 'Error';
    currentInput = '';
  }
}

function updateDisplay() {
  // Format operators visually on the display
  let visualInput = currentInput
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\-/g, ' − ')
    .replace(/\+/g, ' + ');

  outputEl.textContent = visualInput || '0';
}