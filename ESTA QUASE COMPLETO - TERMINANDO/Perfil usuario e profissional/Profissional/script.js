// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all triggers and contents
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked trigger and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Toast Notification System
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Profile Functions
function saveProfile() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const bio = document.getElementById('bio').value;

    if (!name || !email) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }

    // Simulate saving
    console.log('Saving profile:', { name, email, phone, bio });
    showToast('Perfil atualizado com sucesso!');
}

function editPhoto() {
    showToast('Funcionalidade de edição de foto em desenvolvimento');
}

function uploadPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
            showToast('Foto atualizada com sucesso!');
        };
        reader.readAsDataURL(file);
    }
}

// Notification Functions
function saveNotifications() {
    const notifications = {
        emailNewMessages: document.getElementById('emailNewMessages').checked,
        emailProjectUpdates: document.getElementById('emailProjectUpdates').checked,
        emailWeeklyDigest: document.getElementById('emailWeeklyDigest').checked,
        pushNewMessages: document.getElementById('pushNewMessages').checked,
        pushProjectUpdates: document.getElementById('pushProjectUpdates').checked,
        pushMarketingUpdates: document.getElementById('pushMarketingUpdates').checked,
        smsImportantUpdates: document.getElementById('smsImportantUpdates').checked,
        smsSecurityAlerts: document.getElementById('smsSecurityAlerts').checked
    };

    console.log('Saving notifications:', notifications);
    showToast('Preferências de notificação salvas com sucesso!');
}

// Security Functions
function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Por favor, preencha todos os campos', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('As senhas não coincidem', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showToast('A senha deve ter no mínimo 8 caracteres', 'error');
        return;
    }

    // Simulate password change
    console.log('Changing password');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    showToast('Senha alterada com sucesso!');
}

// Settings Functions
function saveSettings() {
    const settings = {
        language: document.getElementById('language').value,
        timezone: document.getElementById('timezone').value,
        emailVisibility: document.getElementById('emailVisibility').checked,
        phoneVisibility: document.getElementById('phoneVisibility').checked,
        profileVisibility: document.getElementById('profileVisibility').checked
    };

    console.log('Saving settings:', settings);
    showToast('Configurações salvas com sucesso!');
}

// Load saved data from localStorage (optional enhancement)
function loadUserData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        const data = JSON.parse(savedData);
        if (data.name) document.getElementById('name').value = data.name;
        if (data.email) document.getElementById('email').value = data.email;
        if (data.phone) document.getElementById('phone').value = data.phone;
        if (data.bio) document.getElementById('bio').value = data.bio;
    }
}

// Save user data to localStorage
function saveUserData() {
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        bio: document.getElementById('bio').value
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Uncomment to enable localStorage persistence
    // loadUserData();
});
