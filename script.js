function add(x, y) {
    return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(symbol, x, y) {
    switch (symbol) {
        case '+':
            return add(x,y);
        case '-':
            return subtract(x,y);
        case "*":
            return multiply(x,y);
        case "/":
        case "÷":
            return divide(x,y);
    }
}

function initialize() {
    let displayButton = document.querySelector("#display");
    let decimalButton = document.querySelector('#decimal');
    let displayText = '';
    let firstNum = null;
    let secondNum = null;
    let operator = null;

    function recordNumClick(num) {
        if (displayText === '0') {
            displayText = num;
        }
        else {
            displayText = displayText + num;
        }
        updateDisplay(displayText);
    }

    function numClick(e) {
        let num = e.target.textContent;
        recordNumClick(num);
    }

    function numKey(e) {
        let num = e.key;
        recordNumClick(num);
    }
    
    function disableDecimal(e) {
        decimalButton.disabled = true;
    }
    
    function enableDecimal() {
        decimalButton.disabled = false;
    }
    
    function updateDisplay(result) {
        if (result.length > 9) {
            result = result.slice(0,9);
        }
        displayButton.textContent = result;
    }
    
    function recordOperator(op) {
        enableDecimal();
        if (firstNum === null) {
            if (displayText.length > 0) {
                firstNum = parseFloat(displayText);
            } else { return; }
        }
        else {
            if (displayText.length > 0) {
                secondNum = parseFloat(displayText);
                evaluateResult();
            } else {
                secondNum = firstNum;
                evaluateResult();
            }
        }
        operator = op;
        displayText = '';
        if (operator === "=" || operator === "Enter") {
            firstNum = null;
            secondNum = null;
        }
    }

    function operatorClick(e) {
        let op = e.target.value;
        recordOperator(op);
    }

    function operatorKey(e) {
        let op = e.key;
        recordOperator(op);
    }
    
    function evaluateResult() {
        if (operator === '/' && secondNum === 0) {
            clear();
            updateDisplay('nice try');
            return;
        }
        if (firstNum !== null && secondNum !== null) {
            const result = operate(operator, firstNum, secondNum).toString();
            updateDisplay(result);
            firstNum = parseFloat(result);
        }
    }
    
    function backspace() {
        if (displayText.length > 0) {
            displayText = displayText.slice(0,displayText.length-1);
            updateDisplay(displayText);
        }
    }

    function percentage() {
        if (!displayText) return;
        displayText = divide(displayText,100).toString();
        updateDisplay(displayText);
    }

    function negative() {
        if (!displayText) return;
        displayText = (displayText - (displayText * 2)).toString();
        updateDisplay(displayText);
    }
    
    function clear() {
        displayText = '';
        firstNum = null;
        secondNum = null;
        operator = null;
        enableDecimal();
        updateDisplay('');
    }

    function checkKey(e) {
        const keyCode = e.keyCode;
        if (e.shiftKey === true) {
            if (keyCode === 56 || keyCode === 187) {
                operatorKey(e);
            }
            if (keyCode === 53) {
                percentage();
            }
            if (keyCode === 53) {
                percentage();
            }
        }
        else if (e.shiftKey === false) {
            if (keyCode === 8) {
                backspace();
            }
            if (keyCode === 27) {
                clear();
            }
            if (keyCode >= 48 && keyCode <= 57) {
                numKey(e);
            }
            if (keyCode === 190) {
                disableDecimal();
                numKey(e);
            }
            if (keyCode === 189 || keyCode === 13 | keyCode === 191) {
                operatorKey(e);
            }
        }
    }

    document.querySelectorAll('.digit').forEach(digit => {
        digit.addEventListener("click", numClick);
    });

    decimalButton.addEventListener("click", disableDecimal);

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener("click", operatorClick);
    });

    document.querySelector('#clear').addEventListener("click", clear);

    document.querySelector('#plus-minus').addEventListener("click", negative);

    document.querySelector('#percent').addEventListener("click", percentage);

    document.querySelector('#backspace').addEventListener("click", backspace);

    document.addEventListener('keydown', checkKey);
}

initialize();