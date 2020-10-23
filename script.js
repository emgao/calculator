function add(x, y) {
	let total = x;
	total += y;
	return total;
}

function subtract(x, y) {
	let difference = x;
	difference -= y;
	return difference;
}

function multiply(x, y) {
	let product = x;
	product *= y;
	return product;
}

function divide(x, y) {
    let quotient = x;
    quotient /= y;
    return quotient;
}

function operate(symbol, x, y) {
    if (symbol === '+') {
        return add(x, y);
    }
    else if (symbol === '-') {
        return subtract(x, y);
    }
    else if (symbol === '*') {
        return multiply(x, y);
    }
    else if (symbol === '/' || symbol === '÷') {
        return divide(x, y);
    }
}

function initialize() {
    let displayButton = document.querySelector("#display");
    let decimalButton = document.querySelector('#decimal');
    let displayText = '';
    let firstNum = null;
    let secondNum = null;
    let operator = null;

    function recordNumClick(e) {
        let pressedNum = e.target.textContent;
        if (displayText === '0') {
            displayText = pressedNum;
        }
        else {
            displayText = displayText + pressedNum;
        }
        updateDisplay(displayText);
    }
    
    function recordNumKey(e) {
        let keyedNum = e.key;
        if (keyedNum === "." && displayText.includes(".")) {
            return;
        }
        if (displayText === '0') {
            displayText = keyedNum;
        }
        else {
            displayText = displayText + keyedNum;
        }
        updateDisplay(displayText);
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
    
    function recordOperator(e) {
        enableDecimal();
        if (firstNum === null) {
            if (displayText.length > 0) {
                firstNum = parseFloat(displayText);
            }
            else return;
        }
        else {
            if (displayText.length > 0) {
                secondNum = parseFloat(displayText);
                evaluateResult();
            }
            else {
                secondNum = firstNum;
                evaluateResult();
            }
        }
        if (e.target) {
            operator = e.target.value;
        }
        if (e.key) {
            operator = e.key;
        }
        displayText = '';
        if (operator === "=" || operator === "Enter") {
            firstNum = null;
            secondNum = null;
        }
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
        console.log(keyCode);
        if (e.shiftKey === true) {
            if (keyCode === 56 || keyCode === 53 || keyCode === 187) {
                recordOperator(e);
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
                recordNumKey(e);
            }
            if (keyCode === 190) {
                disableDecimal();
                recordNumKey(e);
            }
            if (keyCode === 189 || keyCode === 13 | keyCode === 191) {
                recordOperator(e);
            }
        }
    }

    document.querySelectorAll('.digit').forEach(digit => {
        digit.addEventListener("click", recordNumClick);
    });

    decimalButton.addEventListener("click", disableDecimal);

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener("click", recordOperator);
    });

    document.querySelector('#clear').addEventListener("click", clear);

    document.querySelector('#plus-minus').addEventListener("click", function() {
        if (!displayText) return;
        displayText = (displayText - (displayText * 2)).toString();
        updateDisplay(displayText);
    });

    document.querySelector('#percent').addEventListener("click", function() {
        if (!displayText) return;
        displayText = divide(displayText,100).toString();
        updateDisplay(displayText);
    });

    document.querySelector('#backspace').addEventListener("click", backspace);

    document.addEventListener('keydown', checkKey);
}

initialize();

