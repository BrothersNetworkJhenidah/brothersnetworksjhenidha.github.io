/* ========================================
   === MASTER SCRIPT (Brothers Network) ===
   === MODIFIED FOR PERFORMANCE & HAMBURGER MENU (2025) ===
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LANGUAGE SWITCHER ---
    const savedLang = localStorage.getItem('language') || 'bn';
    setLanguage(savedLang); 

    const btnBn = document.getElementById('btn-bn');
    const btnEn = document.getElementById('btn-en');

    if (btnBn) btnBn.addEventListener('click', () => setLanguage('bn'));
    if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
    
    // --- 2. SLIDER LOGIC ---
    const slides = document.querySelectorAll('.slide');
    
    if(slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function changeSlide(n) {
            showSlide(currentSlide + n);
        }

        let autoSlide = setInterval(() => { changeSlide(1); }, slideInterval);

        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');

        if(prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                clearInterval(autoSlide); 
                changeSlide(-1); 
                autoSlide = setInterval(() => { changeSlide(1); }, slideInterval);
            });

            nextBtn.addEventListener('click', () => {
                clearInterval(autoSlide); 
                changeSlide(1); 
                autoSlide = setInterval(() => { changeSlide(1); }, slideInterval);
            });
        }
    }
    
    // --- 3. HAMBURGER MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // আইকন পরিবর্তন: মেনু খোলা থাকলে X, না থাকলে Bars
            if (navLinks.classList.contains('open')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>'; 
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // মেনু খোলা থাকলে লিঙ্কে ক্লিক করলে মেনু বন্ধ হবে
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
});

// --- LANGUAGE SETTER FUNCTION (MODIFIED FOR PERFORMANCE) ---
function setLanguage(lang) {
    const allEn = document.querySelectorAll('.lang-en');
    const allBn = document.querySelectorAll('.lang-bn');
    
    if (lang === 'bn') {
        allEn.forEach(el => el.classList.add('lang-hidden'));      
        allBn.forEach(el => el.classList.remove('lang-hidden'));   
    } else { 
        allBn.forEach(el => el.classList.add('lang-hidden'));      
        allEn.forEach(el => el.classList.remove('lang-hidden'));   
    }

    // --- Button Active State ---
    const btnBn = document.getElementById('btn-bn');
    const btnEn = document.getElementById('btn-en');
    
    if (btnBn && btnEn) {
        if (lang === 'bn') {
            btnBn.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnBn.classList.remove('active');
        }
    }
    localStorage.setItem('language', lang); 
}

// --- COPY TO CLIPBOARD FUNCTION (Used in payment.html) ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Number Copied: " + text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
