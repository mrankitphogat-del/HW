// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;
    
    // Load saved language preference or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);
            localStorage.setItem('preferredLanguage', selectedLang);
        });
    });
    
    // Function to set the language
    function setLanguage(lang) {
        // Update HTML lang attribute
        htmlElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en');
        
        // Update button active states
        langButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all elements with translation attributes
        const translatableElements = document.querySelectorAll('[data-en][data-hi]');
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update page title if translations are available
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const titleTranslations = {
                'en': 'Human Within | Healing',
                'hi': 'ह्यूमन विदिन | हीलिंग'
            };
            titleElement.textContent = titleTranslations[lang] || titleTranslations['en'];
        }
        
        // Update meta description if available
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const descriptionTranslations = {
                'en': 'Human Within | Healing — A professional platform by Ankit Phogat focused on emotional education, psychology, trauma awareness, books, research, notes, and video lectures.',
                'hi': 'ह्यूमन विदिन | हीलिंग — अंकित फोगाट द्वारा एक पेशेवर प्लेटफ़ॉर्म जो इमोशनल एजुकेशन, साइकोलॉजी, ट्रॉमा अवेयरनेस, किताबें, रिसर्च, नोट्स और वीडियो लेक्चर्स पर केंद्रित है।'
            };
            metaDescription.setAttribute('content', descriptionTranslations[lang] || descriptionTranslations['en']);
        }
    }
    
    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            menuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                menuBtn.textContent = '☰';
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.searchable-item');
            
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Add scroll effect to header
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
