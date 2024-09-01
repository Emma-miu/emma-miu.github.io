
$(document).ready(function(){
/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

/**
* Utility function to update the button text and aria-label.
*/
function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example

  // if (buttonEl) {
  //   buttonEl.setAttribute("aria-label", newCta);
  //   buttonEl.innerText = newCta;
  // }

  for (let i = 0; i < buttonEl.length; i++) {
    buttonEl[i].setAttribute("aria-label", newCta);
    buttonEl[i].innerText = newCta;
  }
}

/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
  $('html').attr("data-theme", theme);
}

/**
* 1. Grab what we need from the DOM and system settings on page load
*/
const button = document.querySelectorAll("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
* 2. Work out the current site settings
*/
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
* 3. Update the theme setting and button text accoridng to current settings
*/
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
* 4. Add an event listener to toggle the theme
*/
for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", (event) => {

    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button[i], isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  }); 
}


})