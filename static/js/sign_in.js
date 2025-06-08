// Form elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('password-toggle');
const loginSubmit = document.getElementById('login-submit');
const loginText = document.getElementById('login-text');
const loginLoading = document.getElementById('login-loading');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Password toggle functionality
passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = passwordToggle.querySelector('svg');
    if (type === 'text') {
        icon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
        `;
        passwordToggle.setAttribute('aria-label', '비밀번호 숨기기');
    } else {
        icon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
        passwordToggle.setAttribute('aria-label', '비밀번호 보기');
    }
});