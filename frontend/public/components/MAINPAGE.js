export default function mainPage() {
    return `
    <div class="source">
        <div class="containerr" id="containerr">
        <div id="signUpModal" class="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <input type="text" id="signup-username" name="username" placeholder="Enter your username" required>
                <input type="email" id="signup-email" name="email" placeholder="Enter your email" required>
                <input type="password"   id="signup-password" name="password" placeholder="Enter your password" required>
                <input type="password" id="signup-confirm-password" name="confirm-password" placeholder="Confirm your password" required>
                <button class="logup">Sign Up</button>
            </form>
        </div>
        <div id="loginModal" class="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <input type="text" id="login-username" name="username" placeholder="Enter your username" autocomplete="off"  required>
                <input type="password" id="login-password"  name="password" placeholder="Enter your password"  required>
                <button class="logup" type="submit">Sign In</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-pannel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button class="logup" class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-pannel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="logup" class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </div>`
}