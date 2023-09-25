//Seleção dos elementos

const display = document.querySelector("#displayInput");
const equalButton = document.querySelector(".equal");
const dotButton = document.querySelector(".dot");
let numbersButton = document.querySelectorAll(".num");
const operatorsButton = document.querySelectorAll(".operator");
const clean = document.querySelector(".clear")


//variáveis globais
let currentOperation = "";
let operator = null;
let lastValue = "";
let calculation = false;


// Funções

function updateDisplay() {
  display.value = currentOperation;
}

function insertNumber(event) {
  if(calculation) {
    currentOperation = event.target.textContent;
    calculation = false;
  } else {
    currentOperation += event.target.textContent;
  }

  updateDisplay();
}

function insertDot() {
  if(currentOperation.indexOf(".") === -1) {
    currentOperation+= ".";
    updateDisplay();
  }
}

function insertOperator(event) {
  if (currentOperation !== "" ){
    if(!calculation) {
      if(operator !== null) {
        calculate();
      }
      lastValue = currentOperation;
      currentOperation = "";
    }
    operator = event.target.textContent
  }
}

function calculate() {
  let result = null;
  const lastOperation = parseFloat(lastValue)
  const currentOperator = parseFloat(currentOperation)

  switch(operator) {
    case "+":
      result = lastOperation + currentOperator;
      break;
    case "-":
      result = lastOperation - currentOperator;
      break;
    case "*":
      result = lastOperation * currentOperator;
      break;
    case "/":
      result = lastOperation / currentOperator;
      break;
  }

  currentOperation = String(result);
  lastValue = currentOperation;
  calculation = true;
  updateDisplay();
}

function cleanUp() {
  if(currentOperation && lastValue !== "") {
    currentOperation = "";
    lastValue = "";
    operator = null;
  }
  
  updateDisplay();
}


// Eventos
dotButton.addEventListener("click", insertDot);
numbersButton.forEach((button) => button.addEventListener("click", insertNumber));
operatorsButton.forEach((button) => button.addEventListener("click", insertOperator));
equalButton.addEventListener("click", calculate)
clean.addEventListener("click", cleanUp)