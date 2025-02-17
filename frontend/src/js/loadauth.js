// // loadAuth.js
// document.addEventListener('DOMContentLoaded', function() {
//     const authContent = `
//         <div class="container" id="container">
//             <div class="form-container sign-up">
//                 <form>
//                     <h1>Create Account</h1>
//                     <input type="text" placeholder="Name">
//                     <input type="email" placeholder="Email">
//                     <input type="password" placeholder="Password">
//                     <button>Sign Up</button>
//                 </form>
//             </div>
//             <div class="form-container sign-in">
//                 <form action="">
//                     <h1>Sign In</h1>
//                     <input type="email" placeholder="Email">
//                     <input type="password" placeholder="Password">
//                     <button>Sign In</button>
//                 </form>
//             </div>
//             <div class="toggle-container">
//                 <div class="toggle">
//                     <div class="toggle-pannel toggle-left">
//                         <h1>Welcome Back!</h1>
//                         <p>Enter your personal details to use all of site features</p>
//                         <button class="hidden" id="login">Sign In</button>
//                     </div>
//                     <div class="toggle-pannel toggle-right">
//                         <h1>Hello, Friend!</h1>
//                         <p>Register with your personal details to use all of site features</p>
//                         <button class="hidden" id="register">Sign Up</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;

//     const lrDiv = document.getElementById('lr');
//     if (lrDiv) {
//         lrDiv.innerHTML = authContent;
//     }

//     // Initialize the toggle functionality after content is loaded
//     const container = document.getElementById('container');
//     const registerBtn = document.getElementById('register');
//     const loginBtn = document.getElementById('login');

//     if (registerBtn && loginBtn) {
//         registerBtn.addEventListener('click', () => {
//             container.classList.add('active');
//         });

//         loginBtn.addEventListener('click', () => {
//             container.classList.remove('active');
//         });
//     }
// });