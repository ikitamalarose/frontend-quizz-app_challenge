const body = document.querySelector('body');

const toggleButton = document.getElementById('toggleButton');

const darkModeButton = document.getElementById("darkModeButton");
const lightModeButton = document.getElementById("lightModeButton");

export function toggleButtonStyle() {
    toggleButton.addEventListener('click', () => {

        toggleButton.style.justifyContent = isToggleButtonFlexEnd() ? "flex-start" : "flex-end";
        toggleDarkMode();

        if (body.classList.contains('darkMode')) {
            localStorage.setItem('theme', 'dark');
        }else {
            localStorage.setItem('theme', 'light');
        }
    });
    applyStoredThemePreference();
}

function isToggleButtonFlexEnd() {
    return toggleButton.style.justifyContent === "flex-end";
}

function toggleDarkMode() {

    toggleBodyDarkMode();
    toggleButtonDarkMode();

}
/* body start */

function toggleBodyDarkMode() {
    body.classList.toggle('darkMode');
}

/* button navbar */
function toggleButtonDarkMode() {
    lightModeButton.classList.toggle('darkMode');
    darkModeButton.classList.toggle('darkMode');
}
/* body end */

function applyStoredThemePreference() {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        // Appliquer le mode sombre
        body.classList.add('darkMode');
        toggleButton.style.justifyContent = "flex-end"; // Réglage du bouton en mode sombre
        lightModeButton.classList.add('darkMode');
        darkModeButton.classList.add('darkMode');
    } else{
        body.classList.remove('darkMode');
        toggleButton.style.justifyContent = "flex-start"; // Réglage du bouton en mode clair
        lightModeButton.classList.remove('darkMode');
        darkModeButton.classList.remove('darkMode');
    }
}