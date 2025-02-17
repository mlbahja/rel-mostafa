const container = document.getElementById('containerr');
const registerbtn = document.getElementById('register');
const loginbtn = document.getElementById('login');

registerbtn.addEventListener('click', () => {
    container.classList.add("active");
})

loginbtn.addEventListener('click', () => {
    container.classList.remove("active");
})


// Combined auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handler
    // const loginForm = document.querySelector('#loginModal form')
    // loginForm.addEventListener('submit', (e) => {
    //     e.preventDefault()

    //     const username = document.querySelector("#login-username").value.trim()
    //     const password = document.querySelector("#login-password").value.trim()

    //     if (username == "" || password == "") {
    //         ('var(--red)', "all fields are required!!")
    //         return
    //     } else if (username.length < 3 || username.length > 20) {
    //         ('var(--red)', "username must be between  3 and 20 chars !!")
    //         return
    //     } else if (password.length < 6 || password.length > 20) {
    //         displayToast('var(--red)', "Invalid credentials")
    //         return
    //     }
    //     spinner.style.display = 'block'

    //     fetch("/auth/login", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ username, password }),
    //     })
    //         .then(res => {
    //             if (!res.ok) {
    //                 return res.json().then(data => {
    //                     throw new Error(data.Message || "Invalid credentials")
    //                 })
    //             }
    //             return res.json()
    //         })
    //         .then(() => {
    //             localStorage.setItem("logged", 1)
    //             displayToast('var(--green)', "redirecting...!")
    //             setTimeout(() => {
    //                 window.location.href = "/"
    //                 loginForm.reset()
    //             }, 700)
    //             spinner.style.display = 'none'
    //         })
    //         .catch(err => { displayToast('var(--red)', err) })
    // })
    const spinner = document.getElementById('spinner'); // ✅ Define spinner before using it

    // Login Form Handler
    const loginForm = document.querySelector('#loginModal form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.querySelector("#login-username").value.trim();
        const password = document.querySelector("#login-password").value.trim();

        if (username === "" || password === "") {
            displayToast('var(--red)', "All fields are required!!");
            return;
        } else if (username.length < 3 || username.length > 20) {
            displayToast('var(--red)', "Username must be between 3 and 20 chars!!");
            return;
        } else if (password.length < 6 || password.length > 20) {
            displayToast('var(--red)', "Invalid credentials");
            return;
        }

        spinner.style.display = 'block'; // ✅ Use spinner safely

        fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(data => {
                        throw new Error(data.Message || "Invalid credentials");
                    });
                }else{
                    localStorage.setItem("logged", 1);
                    displayToast('var(--green)', "Redirecting...!");
                    setTimeout(() => {
                        window.location.href = "/";
                        loginForm.reset();
                    }, 700);
                }
                return res.json();
            })
            .catch(err => { displayToast('var(--red)', err.message); })
            .finally(() => {
                spinner.style.display = 'none'; // ✅ Hide spinner after login attempt
            });
    });

    // Register Form Handler
    const registerForm = document.querySelector('#signUpModal form')
    
    console.log(registerForm,"this is regster form ");

    registerForm.addEventListener('submit', function handleRegister(e) {
        e.preventDefault()

        const username = document.querySelector("#signup-username").value.trim()
        const email = document.querySelector("#signup-email").value.trim()
        const password = document.querySelector("#signup-password").value.trim()
        const confirmPassword = document.querySelector("#signup-confirm-password").value.trim()

        if (username == "" || email == "" || password == "" || confirmPassword == "") {
            displayToast('var(--red)', "all fields are required!!")
            return
        } else if (username.length < 3 || username.length > 20) {
            displayToast('var(--red)', "username must be between  3 and 20 chars !!")
            return
        } else if (email.length < 5 || email.length > 40) {
            displayToast('var(--red)', "email must be between  3 and 40 chars !!")
            return
        } else if (password.length < 6 || password.length > 20) {
            displayToast('var(--red)', "Password must be between  6 and 20 chars !!")
            return
        }
        else if (password !== confirmPassword) {
            displayToast('var(--red)', "Password mismatch")
            return
        }

        fetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(errorData => {
                    throw new Error(errorData.Message || 'Something went wrong, please try again');
                });
            } 
                return res.json()
                //login page
            })
            .then(() => {
                // displayToast('var(--green)', 'registered, please login')
                console.log('************');
                // Note: You might need to update this function to work with your new toggle mechanism
                 displayPopup("openLogin")
            })
            .catch(err => displayToast('var(--red)', err))
    })
})