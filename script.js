function validateForm() {
    const fullname = document.getElementById('fullname').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let errors = [];

    if (!fullname) {
        errors.push('Nama lengkap wajib diisi.');
    }

    if (!studentId) {
        errors.push('ID Siswa wajib diisi.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email wajib diisi.');
    } else if (!emailRegex.test(email)) {
        errors.push('Format email tidak valid.');
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{14,}$/;
    if (!password) {
        errors.push('Password wajib diisi.');
    } else if (!passwordRegex.test(password)) {
        errors.push('Password harus minimal 14 karakter dan mengandung huruf, angka, serta simbol.');
    }

    if (errors.length > 0) {
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = errors.join('<br>');
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    } else {
        alert('Pendaftaran berhasil!');
    }
}

// Menampilkan captcha acak
function generateCaptcha() {
    const captchaDisplay = document.getElementById('captchaDisplay');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    captchaDisplay.textContent = captcha;
}

// Validasi captcha
function validateCaptcha() {
    const captchaDisplay = document.getElementById('captchaDisplay').textContent;
    const captchaInput = document.getElementById('captchaInput').value.trim();
    return captchaDisplay === captchaInput;
}

// Event untuk input karakter
document.querySelectorAll('input').forEach(input => {
    if (input.id === 'captchaInput') return;

    const counter = document.createElement('span');
    counter.className = 'char-counter text-muted';
    counter.style.display = 'none';
    input.parentNode.appendChild(counter);

    input.addEventListener('focus', () => {
        counter.style.display = 'block';
        counter.textContent = `${input.value.length} karakter`;
    });

    input.addEventListener('input', () => {
        counter.textContent = `${input.value.length} karakter`;
    });

    input.addEventListener('blur', () => {
        counter.style.display = 'none';
    });
});


// Event onSubmit
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault(); 
    if (!validateCaptcha()) {
        alert('Captcha tidak cocok, silakan coba lagi!');
        generateCaptcha(); 
        return;
    }
    validateForm();
});

generateCaptcha();
document.getElementById('captchaInput').addEventListener('change', validateCaptcha);
