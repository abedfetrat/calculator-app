/* Theme switcher */
const themeSwitch = document.querySelector('.theme-switch');
const themeSelects = themeSwitch.querySelectorAll('input[name="theme-select"]');

themeSelects.forEach(select => select.addEventListener('input', changeTheme));

function changeTheme(e) {
    const selectedTheme = e.target.value;
    const currentTheme = document.body.classList.item(0);
    document.body.classList.replace(currentTheme, `theme-${selectedTheme}`);
}