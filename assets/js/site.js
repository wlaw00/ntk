document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Language Toggle (i18n) ---
    let currentLang = 'nl';
    const langToggleToggleBtn = document.querySelector('.lang-toggle');

    const updateContent = (lang) => {
        currentLang = lang;
        document.querySelectorAll('[data-nl]').forEach(el => {
            if (el.dataset[currentLang]) {
                // If it's an input placeholder
                if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = el.dataset[currentLang];
                } else {
                    el.textContent = el.dataset[currentLang];
                }
            }
        });
        langToggleToggleBtn.textContent = currentLang === 'nl' ? 'EN' : 'NL';
    };

    // Set initial language
    updateContent('nl');

    langToggleToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'nl' ? 'en' : 'nl';
        updateContent(newLang);
    });


    // --- 2. Mobile Sidebar Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('open');
    };

    menuToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when a navigation link is clicked
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(sidebar.classList.contains('open')){
                toggleSidebar();
            }
        });
    });


    // --- 3. Sticky Navbar & Active States ---
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky glassmorphism effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active state update based on scroll position
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });


    // --- 4. Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-scale');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));
});
