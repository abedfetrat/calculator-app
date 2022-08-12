import Evaluator from './Evaluator.js';

/* Theme switcher */
const themeSwitch = document.querySelector('.theme-switch');
const themeSelects = themeSwitch.querySelectorAll('input[name="theme-select"]');

themeSelects.forEach(select => select.addEventListener('input', changeTheme));

function changeTheme(e) {
    const selectedTheme = e.target.value;
    const currentTheme = document.body.classList.item(0);
    document.body.classList.replace(currentTheme, `theme-${selectedTheme}`);
}

/* Calculator */
const evaluator = new Evaluator();

let operand = '';
let displayText = '';

const displayElement = document.getElementById('display-text');
const keys = document.querySelectorAll('.key');

keys.forEach((key) => key.addEventListener('click', () => handleKeyPress(key)));

function handleKeyPress(key) {
    if (key.id === 'delete') {
        handleDelete();
        return;
    }
    if (key.id === 'reset') {
        handleReset();
        return;
    }
    if (key.id === 'equals') {
        handleEquals();
        return;
    }

    if (key.id === 'decimal') {
        handleDecimal(key);
        return;
    }

    // Operator key pressed
    if (key.hasAttribute('data-operator')) {
        handleOperator(key);
        return;
    }

    // Number key pressed
    handleNumber(key);
}

function updateDisplay() {
    displayElement.textContent = displayText;
}

function handleDelete() {
    displayText = displayText.substring(displayText.length - 1, -1);
    updateDisplay();
}

function handleReset() {
    operand = '';
    displayText = '';
    updateDisplay();
}

function handleEquals() {
    // Removes any trailing operator or decimal
    const last = displayText[displayText.length - 1];
    if (/[+\-/*.]/.test(last)) {
        displayText = displayText.slice(0, -1);
    }

    displayText = evaluator.eval(displayText).toString();
    updateDisplay();
}

function handleDecimal(key) {
    const last = displayText[displayText.length - 1];
    // Prevents adding decimal before operand by checking if the character before is a number
    if (!/[0-9]/.test(last)) return;

    // Prevents multiple decimals after one another
    if (last === key.dataset.value) return;

    // Prevents multiple decimals in a single operator
    if (operand.includes(key.dataset.value)) return;

    // Update operand with the value
    operand += key.dataset.value;

    // Update display text with the value
    displayText += key.dataset.value;
    updateDisplay();
}

function handleOperator(key) {
    // Reset operand in order to track the next operand
    operand = '';

    const last = displayText[displayText.length - 1];
    // Prevents adding operator before first operand and immediately after decimal character
    if (!/[0-9]/.test(last)) return;

    // Prevents multiple operators after one another
    if (/[+\-/*]/.test(last)) return;

    // Update display text with the value
    displayText += key.dataset.value;
    updateDisplay();
}

function handleNumber(key) {
    // Update operand with the value
    operand += key.dataset.value;

    // Update display text with the value
    displayText += key.dataset.value;
    updateDisplay();
}