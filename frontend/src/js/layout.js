function loadLayout() {
    const layoutHTML = `
        <!-- Toast Notification -->
        <span class="toast"></span>
        
        <!-- Navbar -->
        <header class="navbar">
            <div class="container">
                <div class="nav-left">
                    <img src="static/src/logo.png" alt="logo" class="logo" />
                </div>
                <nav class="navbar-right">
                    <div class="nav-user-icon online" onclick="settingsMenuToggle()">
                        <img src="static/src/Unknown_person.jpg" alt="profile" />
                    </div>
                    <!-- Settings Menu -->
                    <div class="settings-menu">
                        <div class="setting-menu-inner">
                            <div class="user-profile">
                                <img src="static/src/Unknown_person.jpg" alt="profile" />
                                <div>
                                    <p>Jhon</p>
                                    <small>Public <i class="fas fa-caret-down"></i></small>
                                </div>
                            </div>
                            <hr>
                            <div class="theme-toggle">
                                <span class="theme-label">Theme</span>
                                <label class="switch">
                                    <input type="checkbox" id="theme-switch">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <hr>
                            <div class="nav-actions">
                                <button id="logoutt" class="btn logout">Logout</button>
                            </div>
                            <hr>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        <!-- Main Content Placeholder -->
        <main id="main-content">
            <!-- Content specific to each page will be inserted here -->
             <section class="feed">
                <h2>POSTS</h2>
                <div class="post-list">
                    <div id="spinner"></div>
                </div>
            </section>
            <button class="load-more">Load More</button>
        </main>

        <p>************************************************************</p>
        
        <div class="right-sidebar">
            <h4>Contacts</h4>
            <div class="online-list">
                <div class="online">
                    <img src="static/src/Unknown_person.jpg" alt="profile" />
                </div>
                <p>brain</p>
            </div>
            <div class="online-list">
                <div class="online">
                    <img src="static/src/Unknown_person.jpg" alt="profile" />
                </div>
                <p>anna</p>
            </div>
            <div class="online-list">
                <div class="online">
                    <img src="static/src/Unknown_person.jpg" alt="profile" />
                </div>
                <p>zack</p>
            </div>
        </div>


        <!-- Footer -->
        <footer class="footer">
            <div class="container">
            <div class="footer-sections">
                <div>
                    <h4>Forum</h4>
                    <ul>
                        <li><a class="foo">Categories</a></li>
                        <li><a class="foo">Popular Posts</a></li>
                        <li><a class="foo">Help</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Legal</h4>
                    <ul>
                        <li><a class="foo">Terms of Service</a></li>
                        <li><a class="foo">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Support</h4>
                    <ul>
                        <li><a class="foo">Contact Us</a></li>
                        <li><a class="foo">Report Issue</a></li>
                    </ul>
                </div>
            </div>
            <p>&copy; 2024 My Forum. All rights reserved.</p>
        </div>
        </footer>
    `;

    // Inject layout into the page
    document.getElementById("layout-container").innerHTML = layoutHTML;
}

// Ensure the DOM is loaded before inserting the layout
document.addEventListener("DOMContentLoaded", loadLayout);
