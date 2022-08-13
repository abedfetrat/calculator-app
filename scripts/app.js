import Calculator from './Calculator.js';

/* Calculator */
const displayElement = document.getElementById('display-text');

const calculator = new Calculator(displayElement);

const keys = document.querySelectorAll('.key');

keys.forEach((key) => key.addEventListener('click', () => handleKeyPress(key)));

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

/* Theme switcher */
const themeSwitch = document.querySelector('.theme-switch');
const themeSelects = themeSwitch.querySelectorAll('input[name="theme-select"]');

themeSelects.forEach(select => select.addEventListener('input', changeTheme));

function changeTheme(e) {
    const selectedTheme = e.target.value;
    const currentTheme = document.body.classList.item(0);
    document.body.classList.replace(currentTheme, `theme-${selectedTheme}`);
}