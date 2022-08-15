import Calculator from './Calculator.js';

/* Calculator */
const displayElement = document.getElementById('display-text');

const calculator = new Calculator(displayElement);

const keys = document.querySelectorAll('.key');

keys.forEach((key) => key.addEventListener('click', () => handleKeyPress(key)));
// Handle physical keyboard key press
document.addEventListener('keydown', handleKeyboardKeyPress);

function handleKeyPress(key) {
    if (key.id === 'delete') {
        calculator.delete();
    } else if (key.id === 'reset') {
        calculator.reset();
    } else if (key.id === 'equals') {
        calculator.equals();
    } else if (key.id === 'decimal') {
        calculator.decimal(key);
    } else if (key.hasAttribute('data-operator')) {
        // Operator key is pressed
        calculator.operator(key);
    } else {
        // Number key is pressed
        calculator.number(key);
    }
}

function handleKeyboardKeyPress(e) {
    const key = e.key;
    if (key === 'Backspace') {
        document.getElementById('delete').click();
    } else if (key === 'Escape') {
        document.getElementById('reset').click();
    } else if (key === 'Enter') {
        document.getElementById('equals').click();
    } else if (key === '.') {
        document.getElementById('decimal').click();
    } else if (key === '+') {
        document.getElementById('key-add').click();
    } else if (key === '-') {
        document.getElementById('key-subtract').click();
    } else if (key === '*') {
        document.getElementById('key-multiply').click();
    } else if (key === '/') {
        document.getElementById('key-divide').click();
    } else if (key === '9') {
        document.getElementById('key-9').click();
    } else if (key === '8') {
        document.getElementById('key-8').click();
    } else if (key === '7') {
        document.getElementById('key-7').click();
    } else if (key === '6') {
        document.getElementById('key-6').click();
    } else if (key === '5') {
        document.getElementById('key-5').click();
    } else if (key === '4') {
        document.getElementById('key-4').click();
    } else if (key === '3') {
        document.getElementById('key-3').click();
    } else if (key === '2') {
        document.getElementById('key-2').click();
    } else if (key === '1') {
        document.getElementById('key-1').click();
    } else if (key === '0') {
        document.getElementById('key-0').click();
    }
}

/* Theme switcher */
const themeSwitch = document.querySelector('.theme-switch');
const themeSelects = themeSwitch.querySelectorAll('input[name="theme-select"]');

themeSelects.forEach(select => select.addEventListener('input', changeTheme));

function changeTheme(e) {
    const selectedTheme = e.target.value;
    const currentTheme = document.body.classList.item(0);
    document.body.classList.replace(currentTheme, `theme-${selectedTheme}`);
}