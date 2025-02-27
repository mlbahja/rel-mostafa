const containerPage = document.getElementsByClassName('containerPage');
const logged = localStorage.getItem("logged")
// const navLogoutBtn = document.querySelector('button.logout')
// const registerBtn = document.querySelector(".start-topic") || ''
// const loginBtn = document.querySelector("button.login")
// const createPostBtn = document.querySelector("button.createPostBtn")
// const likeBtn = document.querySelector('button.like-btn')
const mainContent = document.querySelector('.main-content')
const mainpageContainer = document.getElementById('mainpage');
// const allContent = document.querySelector('.all');
const Index = document.getElementById('index')


let categories = []
let articles = []


function createElem(tag, className, content) {
    const element = document.createElement(tag)
    element.classList.add(className)
    element.textContent = content
    return element
}

// Function to show the main page content
function showMainPageContent() {
    mainpageContainer.style.display = 'none'
    Index.style.display = "block"; // Show the main content
}

// Function to show the login/register page
function showLoginRegisterPage() {
    mainpageContainer.style.display = "flex"; // Render the login/register page
    Index.style.display = "none"; // Hide the main content
}

// Check if the user is logged in
if (logged === '1') {
    console.log('is log', logged)
    showMainPageContent();
} else {
    console.log('is log', logged)
    showLoginRegisterPage();
}


// if (logged === '1') {
///nav btns
// navLogoutBtn.style.display = "inline-block"
// createPostBtn.style.display = "inline-block"
// showMainPageContent();

//hide login / register
// loginBtn.style.display = "none"
// registerBtn.style.display = "none"


//display filter options

// } else {
//   loginBtn.style.display = "inline-block"
// registerBtn.style.display = "inline-block"
// ALL.style.display = "none"
// navLogoutBtn.style.display = "none"
// createPostBtn.style.display = "none"
// LOG.style.display = "flex"
//     showLoginRegisterPage();
// }

function showPopup(elem) {
    console.log('hhhh');

    if (elem) {
        elem.classList.remove("hidden")
    }
}

// errors  

//cursor
const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

//load more content...
function popPost(e, id) {
    const post = articles.find(p => p.id == id)
    const parent = e.target.parentElement;
    parent.textContent = post.content;
    const readless = document.createElement('button');
    readless.textContent = '...Read Less';
    readless.addEventListener('click', (event) => {
        readlesss(event, id);
    });
    parent.appendChild(readless);
}

function readlesss(e, id) {
    const post = articles.find(p => p.id == id)
    const parent = e.target.parentElement;
    const content = `${post.content.slice(0, 76)}`;
    parent.textContent = content;
    const readmore = document.createElement('button');
    readmore.textContent = 'Read More...';
    readmore.addEventListener('click', (event) => {
        popPost(event, id);
    });
    parent.appendChild(readmore);
}
function checkIfLoggedout(msg) {

    if (msg === 'user logged-out successfully' || msg === "user not logged-in") {
        localStorage.removeItem("logged")
        window.location.href = "/";
        return
    }
}
