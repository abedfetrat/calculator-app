import Evaluator from "./Evaluator.js";

export default class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.displayText = '0';
        this.operand = '0';
        this.evaluator = new Evaluator();
    }

    delete() {
        this.displayText = this.displayText.substring(this.displayText.length - 1, -1);
        this.updateDisplay();
    }

    reset() {
        this.displayText = '0';
        this.operand = '0';
        this.updateDisplay();
    }

    equals() {
        // Removes any trailing operator or decimal
        const last = this.displayText[this.displayText.length - 1];
        if (/[+\-/*.]/.test(last)) {
            this.displayText = this.displayText.slice(0, -1);
        }

        this.displayText = this.evaluator.eval(this.displayText).toString();
        this.updateDisplay();
    }

    decimal(key) {
        const last = this.displayText[this.displayText.length - 1];
        // Prevents adding decimal before operand by checking if the character before is a number
        if (!/[0-9]/.test(last)) return;

        // Prevents multiple decimals after one another
        if (last === key.dataset.value) return;

        // Prevents multiple decimals in a single operator
        if (this.operand.includes(key.dataset.value)) return;

        // Update operand with the value
        this.operand += key.dataset.value;

        // Update display text with the value
        this.displayText += key.dataset.value;
        this.updateDisplay();
    }

    operator(key) {
        // Reset operand in order to track the next operand
        this.operand = '';

        const last = this.displayText[this.displayText.length - 1];
        // Prevents adding operator before first operand and immediately after decimal character
        if (!/[0-9]/.test(last)) return;

        // Prevents multiple operators after one another
        if (/[+\-/*]/.test(last)) return;

        // Update display text with the value
        this.displayText += key.dataset.value;
        this.updateDisplay();
    }

    number(key) {
        // Update operand with the value
        this.operand += key.dataset.value;

        // Update display text with the value
        if (this.displayText === '0') {
            this.displayText = key.dataset.value;
        } else {
            this.displayText += key.dataset.value;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayElement.textContent = this.displayText;
    }
}
