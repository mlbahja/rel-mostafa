const settingsmenu = document.querySelector(".settings-menu")
const darkBtn = document.getElementById("dark-theme")


function settingsMenuToggle() {
    settingsmenu.classList.toggle("settings-menu-height");
}

// darkBtn.onclick = function() {
//     darkBtn.classList.toggle("dark-on");
//     document.body.classList.toggle("dark");

//     if (localStorage.getItem("theme") == "light") {
//         localStorage.setItem("theme", "dark");
//     } else {
//         localStorage.setItem("theme", "light");
//     }
// }


// if (localStorage.getItem("theme") == "light") {
//     darkBtn.classList.remove("dark-on")
//     document.body.classList.remove("dark");
// } else if (localStorage.getItem("theme") == "dark") {
//     darkBtn.classList.add("dark-on")
//     document.body.classList.add("dark");
// } else {
//     localStorage.setItem("theme", "light");
// }

const themeSwitch = document.querySelector('#theme-switch');

// Handle theme toggle
themeSwitch.onclick = function() {
    themeSwitch.classList.toggle("dark-on");
    document.body.classList.toggle("dark");

    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Check and set initial theme on page load
if (localStorage.getItem("theme") == "light") {
    themeSwitch.classList.remove("dark-on");
    document.body.classList.remove("dark");
} else if (localStorage.getItem("theme") == "dark") {
    themeSwitch.classList.add("dark-on");
    document.body.classList.add("dark");
} else {
    localStorage.setItem("theme", "light");
}