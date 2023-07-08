const hiddenElements = document.querySelectorAll('.hidden');
const body = document.querySelector('body');
const navigation = document.querySelector('#navigation');
const mode = document.querySelector('#mode');
const navBackground = document.querySelector('#nav-top');
const brand = document.querySelector('.navbar-brand');
const cover = document.querySelector('#cover-container');
const h1 = document.querySelector('#start');
const coverH2 = document.querySelectorAll('.fs-6');
const topNav = document.querySelectorAll('.top');
const viewWork = document.querySelector('#view-work');
const portWrap = document.querySelector('#portfolio-wrapper');
const cards = document.querySelectorAll('.card');
const aboutH2 = document.querySelector('#h2-about');
const aboutP = document.querySelectorAll('.mx-2');
const footNav = document.querySelectorAll('.nav-foot');
const footWrap = document.querySelector('#foot-container');
const linkedin = document.querySelector('.linkedin-bg');
const github = document.querySelector('.github-bg');
const copyright = document.querySelector('#copyright');
const lLink = document.querySelector('#linkedin-link');
const gLink = document.querySelector('#github-link');
let setting = '';

const colorPrimary = '#3B3B3B';
const colorSecondary = '#FAFAFA';
const colorTeritary = '#7A7A7A';
const color4 = '#E0E0E0';
const sun = `<svg id="modeSVG" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16">
            <path class="sun" d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>`;
const moon = `<svg id="modeSVG" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
            <path class="moon" d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
            </svg>`;

const nodeColors = [mode, brand, viewWork, portWrap, aboutH2, copyright];
const nodeBackgroundColors = [body, navBackground, cover, portWrap];
const nodesToLoop = [topNav, coverH2, aboutP, footNav];

// Callback function to run everytime the visibility of an element changes. 
// It will loop over every element with th class 'hidden' and change it to show to trigger animation once its visible in the viewport.

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

        }
    });
});

// Helper forEach function

function loopNodes(nodes, c) {
    return nodes.forEach(node => node.style.color = c);
}

// Function to replace mode SVG

function replaceSVG(modetypeSVG) {
    let svg = document.querySelector('#modeSVG');
    mode.removeChild(svg);
    mode.insertAdjacentHTML('afterbegin', modetypeSVG);
}

// Helper function to change text colors on mode change

function changeTextColor(c) {
    nodeColors.forEach(node => node.style.color = c);
    nodesToLoop.forEach(arr => loopNodes(arr, c));
    footWrap.style.borderTop = `1px solid ${c}`;
    linkedin.style.fill = c;
    github.style.fill = c;
}

// Dark mode function

function darkMode() {
    replaceSVG(moon);
    changeTextColor(colorSecondary);
    nodeBackgroundColors.forEach(node => node.style.backgroundColor = colorPrimary);
    h1.style.color = '#FFFFFF';
    cards.forEach(card => card.style.backgroundColor = colorTeritary);
}

// Light mode function

function lightMode() {
    replaceSVG(sun);
    changeTextColor(colorPrimary);
    nodeBackgroundColors.forEach(node => node.style.backgroundColor = colorSecondary);
    h1.style.color = '#000000';
    viewWork.style.color = colorTeritary;
    cards.forEach(card => {
        card.style.color = colorSecondary;
        card.style.backgroundColor = colorPrimary;
    });
}

// Function to retrieve mode that user was in

function retrieveSettings() {
    setting = localStorage.getItem('mode');
    if (setting === 'dark') {
        darkMode();
    }
}

// Helper function to return SVGs to original state on 'mouseout' event

function originalState(node) {
    if (localStorage.getItem('mode') === 'dark'){
        node.style.fill = colorSecondary;    
    } else {
        node.style.fill = colorPrimary; 
    }
}

// Event listeners for social svgs

gLink.addEventListener('mouseover', () => {github.style.fill = '#6e5494'});
lLink.addEventListener('mouseover', () => {linkedin.style.fill = '#0072b1'});

gLink.addEventListener('mouseout', () => {
    originalState(github);  
});

lLink.addEventListener('mouseout', () => {
    originalState(linkedin);  
});

// Event listener for dark and light mode

mode.addEventListener('click', (e) => {
    e.preventDefault();
    if (!localStorage.getItem('mode')) {
        localStorage.setItem('mode', 'dark');
    } else if (localStorage.getItem('mode') === 'light'){
            localStorage.setItem('mode', 'dark'); 
        } else {
            localStorage.setItem('mode', 'light');
        }    
    if (localStorage.getItem('mode') === 'dark') {
        darkMode();
    } else {
        lightMode();
    }
    
})

retrieveSettings();
hiddenElements.forEach(element => observer.observe(element));