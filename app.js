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
      updateDisplayResult(b);
      return;
    }
    a = a * 10 + Number.parseInt(this.textContent);
    updateDisplayResult(a);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function () {
    if (b !== undefined) {
      const result = operate(operatorString, a, b);
      a = result;
      b = undefined;
      updateDisplayResult(result);
    }

    operatorString = this.id;
    isOperatorClicked = true;
    // b = undefined;
    updateDisplayProcess();
  });
});

calculateBtn.addEventListener("click", function (e) {
  //b 안눌린 경우
  if (b === undefined) {
    operatorString = "";
    updateDisplayProcess();
  } else {
    // b 눌린 경우
    updateDisplayProcess();
    displayProcess.textContent += ` ${b}`;
  }
  displayProcess.textContent += ` ${this.textContent}`;
  const result = operate(operatorString, a, b);
  updateDisplayResult(result);
  a = result;
});

clearBtn.addEventListener("click", () => {
  resetCalculator();
});

deleteBtn.addEventListener("click", () => {
  if (b !== undefined) {
    b = deleteOneDigit(b);
  } else {
    a = deleteOneDigit(a);
  }
});

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
  let result;
  if (!operatorString.length || b === undefined) {
    result = a;
  } else {
    const operator = stringToOperator(operatorString);
    result = operator(a, b);
  }
  return result;
}

function stringToSymbol(operatorString) {
  let result = "";
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
  if (operatorString.length) {
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

function deleteOneDigit(num) {
  num = Number.parseFloat(num.toString().slice(0, -1));
  if (Number.isNaN(num)) {
    num = 0;
  }
  updateDisplayResult(num);
  return num;
}

function updateDisplayResult(num) {
  displayResult.textContent = `${num}`;
}
