function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    alert("Can't divde by 0!");
    return;
  }
  return a / b;
}

function stringToOperator(string) {
  if (string === "divide") {
    return divide;
  } else if (string === "multiply") {
    return multiply;
  } else if (string === "subtract") {
    return subtract;
  } else if (string === "add") {
    return add;
  } else {
    return;
  }
}

function operate(operatorString, a, b) {
  const operator = stringToOperator(operatorString);
  return operator(a, b);
}

function stringToSymbol(operatorString) {
  let result;
  if (operatorString === "add") {
    result = "+";
  } else if (operatorString === "subtract") {
    result = "-";
  } else if (operatorString === "multiply") {
    result = "x";
  } else if (operatorString === "divide") {
    result = "÷";
  }
  return result;
}

function updateDisplayProcess() {
  displayProcess.textContent = `${a}`;
  if (operatorString) {
    displayProcess.textContent += ` ${stringToSymbol(operatorString)}`;
  }
}

function resetCalculator() {
  a = 0;
  b = undefined;
  operatorString = "";
  isOperatorClicked = false;
  displayProcess.textContent = "";
  displayResult.textContent = `${a}`;
}

const displayProcess = document.querySelector(".display-process");
const displayResult = document.querySelector(".display-result");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const calculateBtn = document.querySelector("#calculate");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");

let a = 0;
let b;
let isOperatorClicked = false;

let operatorString = "";
displayProcess.textContent = "";
displayResult.textContent = `${a}`;

nums.forEach((num) => {
  num.addEventListener("click", function () {
    if (isOperatorClicked) {
      if (b === undefined) {
        b = 0;
      }
      b = b * 10 + Number.parseInt(this.textContent);
      displayResult.textContent = `${b}`;
      return;
    }
    a = a * 10 + Number.parseInt(this.textContent);
    displayResult.textContent = `${a}`;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function () {
    operatorString = this.id;
    isOperatorClicked = true;
    b = undefined;
    updateDisplayProcess();
  });
});

calculateBtn.addEventListener("click", function (e) {
  updateDisplayProcess();
  // b가 눌리기 전
  if (!b) {
    displayProcess.textContent += " =";
    return;
  }
  const result = operate(operatorString, a, b);
  displayProcess.textContent += ` ${b} ${this.textContent}`;
  displayResult.textContent = `${result}`;
  a = result;
});

clearBtn.addEventListener("click", () => {
  resetCalculator();
});
