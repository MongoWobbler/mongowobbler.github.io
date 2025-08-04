// Copyright Christian Corsica. All Rights Reserved.

const themes = {dark: "dark", light: "light"};

let currentTheme = null;
let relativePath = "";


function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}

/**
 * Applies a new theme to the page.
 * @param newTheme {String}  New theme to apply to page.
 */
function updateTheme(newTheme) {

    if (currentTheme === newTheme) {
        return;
    }

    currentTheme = newTheme;
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);

}

/**
 * Convenience method for toggling the theme between dark and light.
 * This function should only exist while there are only two themes.
 */
function toggleTheme() {
    let newTheme;
    if (currentTheme === themes.light) {
        newTheme = themes.dark;
    } else {
        newTheme = themes.light;
    }

    updateTheme(newTheme)
}

/**
 * Loads the theme stored in the site's local storage if found, else use user's system preferences.
 */
function loadTheme() {
    let theme = localStorage.getItem("theme")

    if (theme === null) {
        if (window.matchMedia) {
            theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? themes.dark : themes.light;
        } else {
            theme = themes.light;
        }
    }

    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
}

function addMainListeners() {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(() => {
            document.body.classList.add('is-page-loaded');
        }, 1000);

    })
}


// ====================== COMPONENTS ======================


class HeadComponent extends HTMLElement {
    connectedCallback() {

    this.innerHTML = `
<!-- icon on the browser tab won't work if it's in this HTML element, so placing on every page...-->

<!-- icons for social links -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
      crossorigin="anonymous" referrerpolicy="no-referrer"/>

<!-- font for header name and title -->
<link href="https://fonts.cdnfonts.com/css/fairview-regular" rel="stylesheet">
`;
    }
}

class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<header>
<nav>
    <div class="nav-container">

        <div id="logo-container">
        
            <a href="${relativePath}/" id="logo">
                <p id="logo-name">CHRiSTiAN CORSiCA</p>
            </a>
            
            <button id="theme-switch" onclick="toggleTheme()">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
                </svg>
            </button>
            
            <a href="${relativePath}/" id="logo">
                <p id="logo-title">TECHNICAL ANIMATOR</p>
            </a>
            

            
        </div>

        <div class="nav-menu-container">

            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="${relativePath}/animation.html" class="nav-link">ANIMATION</a>
                    <div class="dropdown">
                        <a href="${relativePath}/" class="dropdown-item">Character Animation</a>
                        <a href="${relativePath}/animation/other.html" class="dropdown-item">Motion Media</a>
                    </div>
                </li>

                <li class="nav-item">
                    <a href="${relativePath}/scripts.html" class="nav-link">SCRIPTS</a>
                </li>

                <li class="nav-item">
                    <a href="${relativePath}/art.html" class="nav-link">ART</a>
                    <div class="dropdown">
                        <a href="${relativePath}/art/traditional.html" class="dropdown-item">Traditional</a>
                        <a href="${relativePath}/art/illustrations.html" class="dropdown-item">Illustrations</a>
                        <a href="${relativePath}/art/sketches.html" class="dropdown-item">Sketches</a>
                        <a href="${relativePath}/art/album-artwork.html" class="dropdown-item">Album Artwork</a>
                    </div>
                </li>

                <li class="nav-item">
                    <a href="${relativePath}/blog.html" class="nav-link">BLOG</a>
                </li>

                <li class="nav-item">
                    <a href="${relativePath}/resume.html" class="nav-link">RESUME</a>
                </li>

                <li class="nav-item">
                    <a href="${relativePath}/about.html" class="nav-link">ABOUT</a>
                </li>

            </ul>

        </div>
        
        <!-- Mobile menu -->
        <div id="hamburger-icon" onclick="toggleMobileMenu(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <ul class="mobile-menu">
                <li><a href="${relativePath}/animation.html" class="nav-link">ANIMATION</a></li>
                <li><a href="${relativePath}/scripts.html" class="nav-link">SCRIPTS</a></li>
                <li><a href="${relativePath}/art.html" class="nav-link">ART</a></li>
                <li><a href="${relativePath}/blog.html" class="nav-link">BLOG</a></li>
                <li><a href="${relativePath}/resume.html" class="nav-link">RESUME</a></li>
                <li><a href="${relativePath}/about.html" class="nav-link">ABOUT</a></li>
            </ul>
        </div>
        
    </div>
</nav>

</header>
`;
    }
}

class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<footer id="footer">
    <div class="footer-container">
        <div class="social-links">
            <p class="copyright">&copy; 2025</p>

            <a href="https://linkedin.com/in/christian-corsica" class="social-link" title="LinkedIn" target="_blank">
                <i class="fa-brands fa-linkedin fa-2xl"></i>
            </a>

            <a href="https://github.com/MongoWobbler" class="social-link" title="GitHub" target="_blank">
                <i class="fa-brands fa-square-github fa-2xl"></i>
            </a>

            <a href="https://vimeo.com/christiancorsica" class="social-link" title="Vimeo" target="_blank">
                <i class="fa-brands fa-square-vimeo fa-2xl"></i>
            </a>

            <a href="https://youtube.com/user/MongoWobbler" class="social-link" title="YouTube" target="_blank">
                <i class="fa-brands fa-square-youtube fa-2xl"></i>
            </a>

            <a href="https://mongowobbler.artstation.com" class="social-link" title="ArtStation" target="_blank">
                <i class="fa-brands fa-artstation fa-2xl"></i>
            </a>

            <a href="https://instagram.com/christian_corsica" class="social-link" title="Instagram" target="_blank">
                <i class="fa-brands fa-square-instagram fa-2xl"></i>
            </a>

            <a href="https://www.xbox.com/play/user/Mongo%20Wobbler" class="social-link" title="Xbox" target="_blank">
                <i class="fa-brands fa-xbox fa-2xl"></i>
            </a>

            <a href="https://music.apple.com/profile/mongowobbler" class="social-link" title="Apple Music" target="_blank">
                <i class="fa-solid fa-music fa-2xl"></i>
            </a>

        </div>
    </div>
</footer>
`;
    }
}

class LightboxComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<!-- Lightbox Popup -->
<div id="lightbox" class="lightbox">
  <div class="lightbox-content">
    <button class="lightbox-close" onclick="closeLightbox()">×</button>
    <button class="lightbox-nav lightbox-prev" onclick="previousArtwork()">‹</button>


    <img id="lightbox-image" class="lightbox-image" src="" alt="">
    <div class="lightbox-info">
      <h3 id="lightbox-title" class="lightbox-title"></h3>
      <p id="lightbox-description" class="lightbox-description"></p>
    </div>

    <button class="lightbox-nav lightbox-next" onclick="nextArtwork()">›</button>
  </div>
</div>
`;
    }
}

customElements.define('head-component', HeadComponent);
customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);
customElements.define('lightbox-component', LightboxComponent);
