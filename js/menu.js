// JavaScript specifico per la pagina menu.html

document.addEventListener('DOMContentLoaded', function() {
    
    // Menu mobile toggle (per navbar)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Inizializza la navbar elegante delle categorie
    initElegantCategoryNav();
    
    // Animazione degli elementi del menu quando diventano visibili
    const menuItems = document.querySelectorAll('.menu-item-fullscreen');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Inizializza le animazioni per gli elementi del menu
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        item.style.transitionDelay = `${(index % 5) * 0.1}s`;
        
        observer.observe(item);
    });
    
    // Animazione per le sezioni delle categorie
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    const menuSections = document.querySelectorAll('.menu-category-section');
    menuSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        sectionObserver.observe(section);
    });
    
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
    
    // Aggiunge effetto hover avanzato per le card del menu
    menuItems.forEach(item => {
        const image = item.querySelector('.menu-item-image img');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
});

// JavaScript per la navbar elegante delle categorie
function initElegantCategoryNav() {
    const categoryItems = document.querySelectorAll('.category-nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    const menuSections = document.querySelectorAll('.menu-category-section');
    
    // Funzione per aggiornare l'indicatore
    function updateNavIndicator() {
        const activeItem = document.querySelector('.category-nav-item.active');
        if (activeItem && navIndicator) {
            const itemRect = activeItem.getBoundingClientRect();
            const wrapperRect = activeItem.parentElement.getBoundingClientRect();
            
            navIndicator.style.width = `${itemRect.width}px`;
            navIndicator.style.left = `${itemRect.left - wrapperRect.left}px`;
            navIndicator.style.opacity = '1';
        }
    }
    
    // Aggiorna l'indicatore all'avvio
    setTimeout(updateNavIndicator, 100);
    
    // Funzione per evidenziare la categoria attiva durante lo scroll
    function highlightActiveCategoryOnScroll() {
        let currentSection = '';
        
        menuSections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        categoryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            item.classList.remove('active');
            
            if (category === currentSection) {
                item.classList.add('active');
            }
        });
        
        updateNavIndicator();
    }
    
    // Smooth scroll e attivazione al click
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetCategory = this.getAttribute('data-category');
            const targetSection = document.getElementById(targetCategory);
            
            if (targetSection) {
                // Rimuove active da tutti gli item
                categoryItems.forEach(i => i.classList.remove('active'));
                
                // Aggiunge active all'item cliccato
                this.classList.add('active');
                
                // Scroll alla sezione
                window.scrollTo({
                    top: targetSection.offsetTop - 120,
                    behavior: 'smooth'
                });
                
                // Aggiorna l'indicatore dopo l'animazione
                setTimeout(updateNavIndicator, 300);
            }
        });
    });
    
    // Aggiorna durante lo scroll
    window.addEventListener('scroll', highlightActiveCategoryOnScroll);
    
    // Aggiorna al resize della finestra
    window.addEventListener('resize', updateNavIndicator);
    
    // Inizializza l'indicatore
    highlightActiveCategoryOnScroll();
}