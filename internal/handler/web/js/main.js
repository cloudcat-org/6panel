// Get current date and time
function getCurrentDateTime() {
    return new Date();
}

// Format date
function formatDate(date) {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
}

// Format time
function formatTime(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// Format date and time
function formatDateTime(date) {
    return {
        date: formatDate(date),
        time: formatTime(date)
    };
}

// Update clock
function updateClockDisplay(date) {
    const { date: dateString, time: timeString } = formatDateTime(date);
    
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    const dateTimeElement = document.getElementById('dateTime');
    
    if (dateElement) dateElement.textContent = dateString;
    if (timeElement) timeElement.textContent = timeString;
    if (dateTimeElement) dateTimeElement.textContent = `${dateString} ${timeString}`;
}

let clockIntervalId = null;

// Start clock
function startClock() {
    if (clockIntervalId) clearInterval(clockIntervalId);
    
    updateClockDisplay(getCurrentDateTime());
    
    clockIntervalId = setInterval(() => {
        updateClockDisplay(getCurrentDateTime());
    }, 1000);
}

// Stop clock
function stopClock() {
    if (clockIntervalId) {
        clearInterval(clockIntervalId);
        clockIntervalId = null;
    }
}

// Create a loading animation
function createLoader() {
    document.title = "Loading...";
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `<h1>6Panel</h1>`;
    document.body.appendChild(loader);
}

// Create the main page
function createMainPage() {
    const mainPage = document.createElement('div');
    mainPage.id = 'container';
    mainPage.style.display = 'flex';
    document.body.appendChild(mainPage);
}

// Create the login page
function createLoginPage() {
    const container = document.getElementById('container');
    const loginPage = document.createElement('div');
    loginPage.id = 'login';
    loginPage.innerHTML = `
        <div class="date" id="date"></div>
        <div class="time" id="time"></div>
        <img src="/img/logo.webp" alt="avatar" class="avatar">
        <input type="text" placeholder="请输入用户名" class="username">
        <input type="password" placeholder="请输入密码" class="password">
        <a href="#/home"><button class="loginBtn" id="loginBtn"><i class="fa-regular fa-circle-right"></i></button></a>
    `;
    loginPage.style.display = 'none';
    container.appendChild(loginPage);
}

// Create the home page
function createHomePage() {
    const container = document.getElementById('container');
    const homePage = document.createElement('div');
    homePage.id = 'home';
    homePage.innerHTML = `
        <div class="lovely-header">
            <img src="/img/logo.webp" alt="avatar" class="avatar">
            <div class="menu">LovelyFile</div>
            <div class="dateTime" id="dateTime"></div>
        </div>
        <div class="content"></div>
        <div class="dock">
            <button class="active"><i class="fa-solid fa-folder"></i></button>
            <button><i class="fa-solid fa-shop"></i></button>
            <button><i class="fa-solid fa-rocket"></i></button>
            <button><i class="fa-solid fa-trash"></i></button>
        </div>
    `;
    homePage.style.display = 'none';
    container.appendChild(homePage);
}

// Show the page by route
function showPageByRoute() {
    const hash = window.location.hash;
    const homePage = document.getElementById('home');
    const loginPage = document.getElementById('login');

    if (hash === '#/login') {
        if (loginPage) loginPage.style.display = 'block';
        if (homePage) homePage.style.display = 'none';
    } else {
        if (homePage) homePage.style.display = 'block';
        if (loginPage) loginPage.style.display = 'none';
    }
}

// Switch to the main page
function showMainPage() {
    const loader = document.getElementById('loader');
    const mainPage = document.getElementById('container');
    document.title = window.APP_DATA?.title || "6Panel";

    setTimeout(() => {
        loader.style.display = 'none';
        showPageByRoute();

        // Add page fade-in effect
        mainPage.style.opacity = '0';
        setTimeout(() => {
            mainPage.style.opacity = '1';
            mainPage.style.transition = 'opacity 0.5s ease-in';
        }, 100);
    }, 3000);
}

// Switch to the corresponding route when the hash changes
function onHashChange() {
    showMainPage();
    showPageByRoute();
}

// Initialize (only create elements, do not show the page immediately)
document.addEventListener('DOMContentLoaded', () => {
    createLoader();
    createMainPage();
    createLoginPage();
    createHomePage();
});

// Switch to the corresponding route
window.addEventListener('hashchange', onHashChange);

// Ensure that the page is switched after all resources are loaded
window.addEventListener('load', () => {
    startClock();
    showMainPage();
    if (window.location.hash === '') {
        window.location.hash = '#/home'; // 默认路由
    }
});