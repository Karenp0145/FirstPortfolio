/* GESTION DU FORMULAIRE DE CONTACT */

const form = document.querySelector('.contact-form');
const submitBtn = document.querySelector('.btn-submit');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Vérification des champs vides
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        // Vérification email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer un email valide', 'error');
            return;
        }

        // Animation du bouton
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Envoi en cours...
        `;
        submitBtn.disabled = true;

        // Simulation d'envoi
        setTimeout(function () {
            form.reset();

            showNotification(
                'Message envoyé avec succès ! Je vous répondrai bientôt.',
                'success'
            );

            submitBtn.innerHTML = `
                Envoyer le message
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            `;
            submitBtn.disabled = false;
        }, 1500);
    });
}

/* SYSTÈME DE NOTIFICATIONS */

function showNotification(message, type) {
    const oldNotif = document.querySelector('.notification-toast');
    if (oldNotif) {
        oldNotif.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification-toast notification-' + type;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(function () {
        notification.classList.add('show');
    }, 100);

    setTimeout(function () {
        notification.classList.remove('show');
        setTimeout(function () {
            notification.remove();
        }, 300);
    }, 4000);
}

/*  GESTION DU MENU BURGER MOBILE */

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

/* ouvrir le MENU BURGER */
function openMobileMenu() {
    mobileMenu.classList.add('active');       
    mobileMenuToggle.classList.add('active'); 
    document.body.style.overflow = 'hidden';
}

/* fermer le MENU BURGER */
function closeMobileMenu() {
    mobileMenu.classList.remove('active');       
    mobileMenuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

/* clic sur le bouton MENU BURGER */
mobileMenuToggle.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

/* clic sur un lien du MENU BURGER */
mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        closeMobileMenu();
        setTimeout(() => {
            targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
    });
});

/* clic à l'extérieur du MENU BURGER */
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

/* touche escape */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});



/* MODE NUIT */

const bouton = document.querySelector('.dark-mode-toggle');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

if (bouton) {
    bouton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');


        const mode = document.body.classList.contains('dark-mode')
            ? 'enabled' 
            : 'disabled';

        localStorage.setItem('darkMode', mode);
    });
}


