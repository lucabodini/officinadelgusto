// Attende che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Chiude il menu mobile quando si clicca su un link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Animazione elementi al scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Osserva elementi che dovrebbero apparire al scroll
    const scrollElements = document.querySelectorAll('.feature, .menu-highlight, .about-image, .about-text, .contact-info, .reservation-form');
    scrollElements.forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
    
    // Gestione del form di prenotazione
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        // Imposta la data minima (oggi)
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date();
            const minDate = today.toISOString().split('T')[0];
            
            // Aggiungi attributo min quando diventa type="date"
            dateInput.addEventListener('focus', function() {
                if (this.type === 'date') {
                    this.setAttribute('min', minDate);
                }
            });
        }
        
        // Imposta l'ora corrente
        const timeInput = document.getElementById('time');
        if (timeInput) {
            timeInput.addEventListener('focus', function() {
                if (this.type === 'time') {
                    const now = new Date();
                    const currentHour = now.getHours().toString().padStart(2, '0');
                    const currentMinute = now.getMinutes().toString().padStart(2, '0');
                    this.setAttribute('min', `${currentHour}:${currentMinute}`);
                }
            });
        }
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validazione semplice
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            
            if (!name || !email || !phone || !date || !time || !guests) {
                alert('Per favore, compila tutti i campi obbligatori.');
                return;
            }
            
            // Simula l'invio della prenotazione
            const submitButton = bookingForm.querySelector('.btn-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Grazie per la tua prenotazione! Ti confermeremo via email o telefono al più presto.');
                bookingForm.reset();
                
                // Ripristina i campi data e ora a tipo text
                document.getElementById('date').type = 'text';
                document.getElementById('time').type = 'text';
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Gestione del form newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            
            if (!emailInput.value || !emailInput.value.includes('@')) {
                alert('Per favore, inserisci un indirizzo email valido.');
                return;
            }
            
            const originalButtonHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                alert('Grazie per esserti iscritto alla nostra newsletter!');
                emailInput.value = '';
                button.innerHTML = originalButtonHTML;
            }, 1000);
        });
    }
    
    // Animazione navbar al scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Cambia colore navbar dopo lo scroll
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(29, 53, 87, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(29, 53, 87, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Nasconde/mostra navbar in base alla direzione dello scroll
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Aggiunge CSS per gli elementi fade-in
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in-element.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});