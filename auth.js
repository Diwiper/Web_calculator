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

    // Кнопка "Вийти"
    if (isLoggedIn && navbar) {
        const logoutLi = document.createElement('li');
        logoutLi.className = 'nav-item';
        logoutLi.innerHTML = '<a class="nav-link text-danger fw-bold" href="#" id="logoutBtn" style="cursor:pointer;">Вийти 🚪</a>';
        navbar.appendChild(logoutLi);

        document.getElementById('logoutBtn').onclick = (e) => {
            e.preventDefault();
            // Стираємо статус входу та інформацію про поточного користувача
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUserEmail');
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
            
           
            let users = JSON.parse(localStorage.getItem('devcalc_users')) || [];
            

            if (users.some(u => u.email === userData.email)) {
                alert('Користувач з таким email вже існує!');
                return; 
            }


            users.push(userData);

            localStorage.setItem('devcalc_users', JSON.stringify(users));
            
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
            

            const users = JSON.parse(localStorage.getItem('devcalc_users')) || [];


            const foundUser = users.find(u => u.email === email && u.pass === pass);

            if (foundUser) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUserEmail', foundUser.email);
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
        
        // Зчитуємо email поточного юзера та повний масив юзерів
        const currentEmail = localStorage.getItem('currentUserEmail');
        const users = JSON.parse(localStorage.getItem('devcalc_users')) || [];
        

        const activeUser = users.find(u => u.email === currentEmail);
        
        if (activeUser) {
            const cells = document.querySelectorAll('table tbody tr td:nth-child(2)');
            if (cells.length >= 4) {
                cells[0].innerText = activeUser.name;
                cells[1].innerText = activeUser.email;
                cells[2].innerText = activeUser.gender;
                cells[3].innerText = activeUser.dob;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', initAuth);