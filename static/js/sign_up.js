
// Form elements
const signupForm = document.getElementById('signup-form');
const globalMessage = document.getElementById('global-message');
const signupSubmit = document.getElementById('signup-submit');
const signupText = document.getElementById('signup-text');
const signupLoading = document.getElementById('signup-loading');

// Input elements
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Password toggles
const passwordToggle = document.getElementById('password-toggle');
const confirmPasswordToggle = document.getElementById('confirm-password-toggle');

// Password strength elements
const strengthFill = document.getElementById('strength-fill');
const strengthText = document.getElementById('strength-text');

// Password toggle functionality
function setupPasswordToggle(toggleBtn, inputField) {
    toggleBtn.addEventListener('click', () => {
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        
        const icon = toggleBtn.querySelector('svg');
        if (type === 'text') {
            icon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            `;
        } else {
            icon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            `;
        }
    });
}

setupPasswordToggle(passwordToggle, password);
setupPasswordToggle(confirmPasswordToggle, confirmPassword);

// Password strength checker
function checkPasswordStrength(password) {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('8자 이상');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('소문자');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('대문자');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('숫자');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('특수문자');

    return { score, feedback };
}

password.addEventListener('input', () => {
    const value = password.value;
    const { score, feedback } = checkPasswordStrength(value);

    let width = 0;
    let className = '';
    let text = '';

    if (value.length === 0) {
        text = '비밀번호를 입력하세요';
    } else if (score <= 2) {
        width = 33;
        className = 'strength-weak';
        text = `약함 (${feedback.join(', ')} 필요)`;
    } else if (score <= 4) {
        width = 66;
        className = 'strength-medium';
        text = `보통 (${feedback.join(', ')} 필요)`;
    } else {
        width = 100;
        className = 'strength-strong';
        text = '강함';
    }

    strengthFill.style.width = width + '%';
    strengthFill.className = `strength-fill ${className}`;
    strengthText.textContent = text;
    strengthText.className = `strength-text ${className}`;
});

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const { score } = checkPasswordStrength(password);
    return password.length >= 8 && score >= 3;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const messageEl = document.getElementById(fieldId + '-message');
    
    field.classList.add('error');
    field.classList.remove('success');
    messageEl.textContent = message;
    messageEl.className = 'field-message error';
}

function showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const messageEl = document.getElementById(fieldId + '-message');
    
    field.classList.add('success');
    field.classList.remove('error');
    messageEl.className = 'field-message';
}

function clearFieldMessage(fieldId) {
    const field = document.getElementById(fieldId);
    const messageEl = document.getElementById(fieldId + '-message');
    
    field.classList.remove('error', 'success');
    messageEl.className = 'field-message';
}

function showGlobalMessage(message, type) {
    globalMessage.textContent = message;
    globalMessage.className = `global-message ${type}`;
}

function hideGlobalMessage() {
    globalMessage.className = 'global-message';
}

// Real-time validation
fullName.addEventListener('blur', () => {
    if (!validateName(fullName.value)) {
        showFieldError('fullName', '이름은 2자 이상이어야 합니다.');
    } else {
        showFieldSuccess('fullName');
    }
});

email.addEventListener('blur', () => {
    if (!email.value) {
        showFieldError('email', '이메일을 입력해주세요.');
    } else if (!validateEmail(email.value)) {
        showFieldError('email', '올바른 이메일 형식을 입력해주세요.');
    } else {
        showFieldSuccess('email');
    }
});

password.addEventListener('blur', () => {
    if (!password.value) {
        showFieldError('password', '비밀번호를 입력해주세요.');
    } else if (!validatePassword(password.value)) {
        showFieldError('password', '비밀번호는 8자 이상이며 대소문자, 숫자, 특수문자를 포함해야 합니다.');
    } else {
        showFieldSuccess('password');
    }
});

confirmPassword.addEventListener('blur', () => {
    if (!confirmPassword.value) {
        showFieldError('confirmPassword', '비밀번호 확인을 입력해주세요.');
    } else if (confirmPassword.value !== password.value) {
        showFieldError('confirmPassword', '비밀번호가 일치하지 않습니다.');
    } else {
        showFieldSuccess('confirmPassword');
    }
});

// Clear validation on focus
[fullName, email, password, confirmPassword].forEach(field => {
    field.addEventListener('focus', () => {
        clearFieldMessage(field.id);
        hideGlobalMessage();
    });
});

// Form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideGlobalMessage();

    // Validate all fields
    let isValid = true;

    if (!validateName(fullName.value)) {
        showFieldError('fullName', '이름은 2자 이상이어야 합니다.');
        isValid = false;
    }

    if (!email.value) {
        showFieldError('email', '이메일을 입력해주세요.');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showFieldError('email', '올바른 이메일 형식을 입력해주세요.');
        isValid = false;
    }

    if (!password.value) {
        showFieldError('password', '비밀번호를 입력해주세요.');
        isValid = false;
    } else if (!validatePassword(password.value)) {
        showFieldError('password', '비밀번호는 8자 이상이며 대소문자, 숫자, 특수문자를 포함해야 합니다.');
        isValid = false;
    }

    if (!confirmPassword.value) {
        showFieldError('confirmPassword', '비밀번호 확인을 입력해주세요.');
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        showFieldError('confirmPassword', '비밀번호가 일치하지 않습니다.');
        isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    signupSubmit.disabled = true;
    signupText.style.display = 'none';
    signupLoading.style.display = 'inline-block';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        showGlobalMessage('회원가입이 성공적으로 완료되었습니다!', 'success');
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        showGlobalMessage('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    } finally {
        // Hide loading state
        signupSubmit.disabled = false;
        signupText.style.display = 'inline';
        signupLoading.style.display = 'none';
    }
});