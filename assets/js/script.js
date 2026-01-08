    const techCategories = document.querySelectorAll('.tech-category');
    const techItems = document.querySelectorAll('.tech-items');

    techCategories.forEach(category => {
        category.addEventListener('click', () => {
            techCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');


            techItems.forEach(item => item.classList.remove('active'));
            const targetId = category.getAttribute('data-category');
            document.getElementById(targetId).classList.add('active');
        });
    });

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
