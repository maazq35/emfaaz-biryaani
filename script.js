// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Observe contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Ensure WhatsApp button is visible (fallback for edge cases)
function ensureWhatsAppButtonVisible() {
    const whatsappContainer = document.getElementById('whatsapp-button');
    if (whatsappContainer && window.getComputedStyle(whatsappContainer).position !== 'fixed') {
        whatsappContainer.style.setProperty('position', 'fixed', 'important');
        whatsappContainer.style.setProperty('display', 'block', 'important');
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureWhatsAppButtonVisible);
} else {
    ensureWhatsAppButtonVisible();
}

// Time slot dropdown for 1 kg orders
(function () {
    const dropdown = document.getElementById('wa-time-slot-dropdown');
    const backdrop = document.getElementById('wa-time-slot-backdrop');
    const panel = dropdown && dropdown.querySelector('.wa-time-slot-dropdown__panel');
    const options = dropdown && dropdown.querySelectorAll('.wa-time-slot-option');
    const submitBtn = dropdown && dropdown.querySelector('.wa-time-slot-dropdown__submit');
    const oneKgLinks = document.querySelectorAll('.order-now-whatsapp--1kg, [data-wa-1kg]');

    let currentWaHref = '';

    function openDropdown(waHref) {
        currentWaHref = waHref;
        dropdown.setAttribute('aria-hidden', 'false');
        backdrop.setAttribute('aria-hidden', 'false');
        dropdown.classList.add('is-open');
        backdrop.classList.add('is-open');
        if (options) options.forEach(o => o.classList.remove('is-selected'));
    }

    function closeDropdown() {
        dropdown.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        dropdown.setAttribute('aria-hidden', 'true');
        backdrop.setAttribute('aria-hidden', 'true');
        currentWaHref = '';
    }

    function buildWaUrlWithSlot(baseUrl, slotLabel) {
        try {
            const url = new URL(baseUrl);
            const text = url.searchParams.get('text') || '';
            const decoded = decodeURIComponent(text);
            const newText = decoded + ' Preferred time slot: ' + slotLabel;
            url.searchParams.set('text', newText);
            return url.toString();
        } catch (e) {
            return baseUrl;
        }
    }

    if (oneKgLinks.length) {
        oneKgLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                openDropdown(this.getAttribute('href'));
            });
        });
    }

    if (options) {
        options.forEach(opt => {
            opt.addEventListener('click', function () {
                options.forEach(o => o.classList.remove('is-selected'));
                this.classList.add('is-selected');
            });
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            const selected = dropdown.querySelector('.wa-time-slot-option.is-selected');
            if (!selected || !currentWaHref) return;
            const slot = selected.getAttribute('data-slot');
            const url = buildWaUrlWithSlot(currentWaHref, slot);
            window.open(url, '_blank');
            closeDropdown();
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeDropdown);
    }

    const closeBtn = document.getElementById('wa-time-slot-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDropdown);
    }
})();
