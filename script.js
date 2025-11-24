/* ========================================
   === MASTER SCRIPT (Brothers Network) ===
   === MODIFIED FOR PERFORMANCE FIX (2025) ===
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LANGUAGE SWITCHER ---
    const savedLang = localStorage.getItem('language') || 'bn';
    // setLanguage ফাংশন কল করা হলো, যা পারফরম্যান্সের জন্য অপটিমাইজড
    setLanguage(savedLang); 

    const btnBn = document.getElementById('btn-bn');
    const btnEn = document.getElementById('btn-en');

    // ইভেন্ট লিসেনার সেট করা হলো
    if (btnBn) btnBn.addEventListener('click', () => setLanguage('bn'));
    if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
    
    // --- 2. SLIDER LOGIC ---
    const slides = document.querySelectorAll('.slide');
    
    if(slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;

        // Function to handle slider movement
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Function to change slide by step (1 or -1)
        function changeSlide(n) {
            showSlide(currentSlide + n);
        }

        // Auto slide interval setup
        let autoSlide = setInterval(() => { changeSlide(1); }, slideInterval);

        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');

        if(prevBtn && nextBtn) {
            // Event listener for Previous button
            prevBtn.addEventListener('click', () => {
                clearInterval(autoSlide); // Stop auto slide
                changeSlide(-1); // Go to previous slide
                // Restart auto slide timer
                autoSlide = setInterval(() => { changeSlide(1); }, slideInterval);
            });

            // Event listener for Next button
            nextBtn.addEventListener('click', () => {
                clearInterval(autoSlide); // Stop auto slide
                changeSlide(1); // Go to next slide
                // Restart auto slide timer
                autoSlide = setInterval(() => { changeSlide(1); }, slideInterval);
            });
        }
    }
});

// --- LANGUAGE SETTER FUNCTION (MODIFIED FOR PERFORMANCE) ---
function setLanguage(lang) {
    // সকল বাংলা এবং ইংরেজি এলিমেন্টগুলোকে সিলেক্ট করা হলো
    const allEn = document.querySelectorAll('.lang-en');
    const allBn = document.querySelectorAll('.lang-bn');
    
    // পারফরম্যান্সের জন্য অপটিমাইজড ক্লাসভিত্তিক লজিক ব্যবহার করা হলো (হ্যাং সমস্যা সমাধান)
    if (lang === 'bn') {
        // ইংলিশ এলিমেন্টগুলোতে 'lang-hidden' ক্লাস যোগ করে দ্রুত লুকিয়ে ফেলা হলো
        allEn.forEach(el => el.classList.add('lang-hidden'));      
        // বাংলা এলিমেন্টগুলো থেকে 'lang-hidden' ক্লাস সরিয়ে দ্রুত দেখিয়ে দেওয়া হলো
        allBn.forEach(el => el.classList.remove('lang-hidden'));   
    } else { // lang === 'en'
        // বাংলা এলিমেন্টগুলোতে 'lang-hidden' ক্লাস যোগ করে দ্রুত লুকিয়ে ফেলা হলো
        allBn.forEach(el => el.classList.add('lang-hidden'));      
        // ইংলিশ এলিমেন্টগুলো থেকে 'lang-hidden' ক্লাস সরিয়ে দ্রুত দেখিয়ে দেওয়া হলো
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
    // Save language preference to local storage
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