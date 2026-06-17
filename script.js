// responsive menu toggle
const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Hanya jalankan jika kedua elemen ini ada di halaman
if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// smooth scroll for anchor links (kecuali link WA/IG yang punya href lengkap)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        
        // Menggunakan try-catch karena jika targetId bukan selektor valid (misal angka saja), querySelector akan error
        try {
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Gunakan optional chaining (?.) untuk menghindari error jika navLinks tidak ada
                navLinks?.classList.remove('active');
            }
        } catch (error) {
            console.warn("Target element tidak valid:", targetId);
        }
    });
});

// fade up on scroll (Intersection Observer)
const fadeElements = document.querySelectorAll('.fade-up');

// Hanya buat observer jika ada elemen .fade-up di halaman
if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -20px 0px" });

    fadeElements.forEach(el => observer.observe(el));

    // initial check for elements already visible
    window.addEventListener('load', () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('appear');
                observer.unobserve(el);
            }
        });
    });
}

// header effect on scroll
const header = document.querySelector('header');

// Hanya jalankan jika elemen <header> ada di halaman
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.style.background = 'rgba(254, 252, 248, 0.97)';
            header.style.backdropFilter = 'blur(12px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.02)';
        } else {
            header.style.background = 'rgba(254, 252, 248, 0.92)';
            header.style.boxShadow = 'none';
        }
    });
}

console.log('Elegan Studio — WhatsApp & Instagram link aktif.');
