import Evaluator from "./Evaluator.js";

export default class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.displayText = '0';
        this.operands = ['0'];
        this.evaluator = new Evaluator();
    }

    delete() {
        const lastChar = this.displayText[this.displayText.length - 1];
        const operandIndex = this.operands.length - 1;
        if (/[0-9\.]/.test(lastChar)) {
            this.operands[operandIndex] = this.operands[operandIndex].slice(0, -1);
        }

        if (this.operands[operandIndex].length === 0 && this.operands.length > 1) {
            this.operands.pop();
        }

        this.displayText = this.displayText.slice(0, -1);
        this.updateDisplay();
    }

    reset() {
        this.displayText = '0';
        this.operands = ['0'];
        this.updateDisplay();
    }

    equals() {
        // Removes any trailing operator or decimal
        const last = this.displayText[this.displayText.length - 1];
        if (/[+\-/*.]/.test(last)) {
            this.displayText = this.displayText.slice(0, -1);
        }

        this.displayText = this.evaluator.eval(this.displayText).toString();
        // Update operand with the result 
        this.operands = [this.displayText];
        this.updateDisplay();
    }

    decimal(key) {
        const last = this.displayText[this.displayText.length - 1];
        // Prevents adding decimal before operand by checking if the character before is a number
        if (!/[0-9]/.test(last)) return;

        // Prevents multiple decimals after one another
        if (last === key.dataset.value) return;

        // Prevents multiple decimals in a single operand
        const operand = this.operands[this.operands.length - 1];
        if (operand.includes(key.dataset.value)) return;

        // Updates operand with the value or returns if max allowed digits is reached
        if (!this.updateOperand(key.dataset.value)) return;

        // Update display text with the value
        this.displayText += key.dataset.value;
        this.updateDisplay();
    }

    operator(key) {
        const last = this.displayText[this.displayText.length - 1];
        // Prevents adding operator before first operand and immediately after decimal character
        if (!/[0-9]/.test(last)) return;

        // Prevents multiple operators after one another
        if (/[+\-/*]/.test(last)) return;

        // Set up empty operand to be updated with value
        this.operands.push('');

        // Update display text with the value
        this.displayText += key.dataset.value;
        this.updateDisplay();
    }

    number(key) {
        if (this.displayText === '0') {
            // Initially when display and operand is set to zero, replace zero with the number value
            this.operands[this.operands.length - 1] = key.dataset.value;
            this.displayText = key.dataset.value;
        } else {
            // Updates operand with the number value or returns if max allowed digits is reached
            if (!this.updateOperand(key.dataset.value)) return;
            this.displayText += key.dataset.value;
        }
        this.updateDisplay();
    }

    updateOperand(value) {
        const last = this.operands.length - 1;
        if (this.operands[last].length === 15) return false;
        this.operands[last] += value;
        return true;
    }

    updateDisplay() {
        this.displayElement.textContent = this.displayText;
    }
}