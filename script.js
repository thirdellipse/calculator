let firstOperand = null;
let operator = null;
let secondOperand = null;

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".button.num");
const operatorButtons = document.querySelectorAll(".button.op");
const equalButton = document.querySelector("#eql");

function displayExpression() {
    if (firstOperand && operator && secondOperand) {
        display.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    } else if (firstOperand && operator) {
        display.textContent = `${firstOperand} ${operator}`;
    } else if (firstOperand) {
        display.textContent = firstOperand;
    } else {
        display.textContent = '';
    }
}

// Reset calculator when display is double clicked
display.addEventListener('dblclick', (e) => {
    firstOperand = secondOperand = operator = null;
    displayExpression();
});

equalButton.addEventListener('click', (e) => {
    if (firstOperand && operator && secondOperand) {
        firstOperand = operate(operator, firstOperand, secondOperand);
        operator = null;
        secondOperand = null;
        displayExpression();
    }
})

function operate(operator, firstOperand, secondOperand) {
    const first = Number(firstOperand);
    const second = Number(secondOperand);

    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
    }
}

digitButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const clicked = btn.textContent;
        if (operator === null) {
            if (firstOperand === null) {
                firstOperand = clicked;
            } else {
                firstOperand += clicked;
            }
        } else {
            if (secondOperand === null) {
                secondOperand = clicked;
            } else {
                secondOperand += clicked;
            }
        }
        displayExpression();
    });
});

operatorButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const clicked = btn.textContent;
        if (!firstOperand) {
            return;
        } else if (!secondOperand) {
            operator = clicked;
        } else {
            firstOperand = operate(operator, firstOperand, secondOperand);
            operator = clicked;
            secondOperand = null;
        }
        displayExpression();
    });
});