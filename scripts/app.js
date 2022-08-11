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

const displayElement = document.getElementById('display-text');

const keys = document.querySelectorAll('.key');
keys.forEach((key) => key.addEventListener('click', () => handleKeyPress(key)));

let displayText = '';

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

    displayText += key.dataset.value;
    updateDisplay();
}

function updateDisplay() {
    displayElement.textContent = displayText;
}

function handleDelete() {
    displayText = displayText.substring(displayText.length - 1, -1);
    updateDisplay();
}

function handleReset() {
    displayText = '';
    updateDisplay();
}

function handleEquals() {
    displayText = evaluator.eval(displayText).toString();
    updateDisplay();
}