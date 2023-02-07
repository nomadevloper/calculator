function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a,b) {
    if (b === 0) return 'Don\'t divde by 0!';
    return a/b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

const accumulator = document.querySelector(".accumulator");
const currentNum = document.querySelector(".current-num");
const nums = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const calculateBtn = document.querySelector("#calculate");

let stringNum = "";
let stringOperator = "";
let a;
let b;
accumulator.textContent = "";
currentNum.textContent = "0";

nums.forEach(num => {
    num.addEventListener("click", function() {
        // 숫자버튼을 맨 처음 누를 경우
        if (!stringOperator.length && !stringNum.length) {
            stringNum = this.textContent;
            currentNum.textContent = stringNum;
            return;
        } 

        // operator 버튼이 눌린 뒤 처음 누를 경우
        if (stringOperator.length && !stringNum.length) {
            currentNum.textContent = "";
        }

        stringNum += this.textContent;
        currentNum.textContent = stringNum;
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", function(){
        accumulator.textContent = currentNum.textContent + " " + this.textContent;
        a = Number.parseFloat(currentNum.textContent);
        stringNum = "";
        stringOperator = this.id;
    });
});

calculateBtn.addEventListener("click", function() {
    // if (stringNum.length) {
    //     storedNums.push(Number.parseInt(stringNum));
    //     stringNum = "";
    // }

    accumulator.textContent += " " + currentNum.textContent + " " + this.textContent;
    b = Number.parseFloat(currentNum.textContent);
    const operator = stringToOperator(stringOperator);
    const result = operate(operator, a, b);
    currentNum.textContent = `${result}`;
    stringOperator = "";
});

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

function resetCalculator() {
    stringNum = "";
    stringOperator = "";

}