// auth.js
function initAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar-nav');
    
    // Навігація
    navLinks.forEach(link => {
        if (link.href.includes('login.html') || link.href.includes('register.html')) {
            link.style.display = isLoggedIn ? 'none' : 'block';
        }
        if (link.href.includes('profile.html')) {
            link.style.display = isLoggedIn ? 'block' : 'none';
        }
    });

    if (isLoggedIn && navbar) {
        const logoutLi = document.createElement('li');
        logoutLi.className = 'nav-item';
        logoutLi.innerHTML = '<a class="nav-link text-danger fw-bold" href="#" id="logoutBtn" style="cursor:pointer;">Вийти 🚪</a>';
        navbar.appendChild(logoutLi);

        document.getElementById('logoutBtn').onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        };
    }

    // Реєстрація
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.onsubmit = (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                pass: document.getElementById('regPass').value,
                gender: document.getElementById('regGender').value,
                dob: document.getElementById('regDate').value
            };
            localStorage.setItem('devcalc_user', JSON.stringify(userData));
            alert('Реєстрація успішна! Тепер увійдіть.');
            window.location.href = 'login.html';
        };
    }

    // Вхід
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPass').value;
            const savedUser = JSON.parse(localStorage.getItem('devcalc_user'));

            if (savedUser && savedUser.email === email && savedUser.pass === pass) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'profile.html';
            } else {
                alert('Невірний email або пароль!');
            }
        };
    }

    // Профіль
    if (window.location.pathname.includes('profile.html')) {
        if (!isLoggedIn) {
            alert('Будь ласка, увійдіть у систему для перегляду профілю.');
            window.location.href = 'login.html';
            return;
        }
        const savedUser = JSON.parse(localStorage.getItem('devcalc_user'));
        if (savedUser) {
            const cells = document.querySelectorAll('table tbody tr td:nth-child(2)');
            if (cells.length >= 4) {
                cells[0].innerText = savedUser.name;
                cells[1].innerText = savedUser.email;
                cells[2].innerText = savedUser.gender;
                cells[3].innerText = savedUser.dob;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', initAuth);