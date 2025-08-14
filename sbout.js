// About page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize animations
    initializeAnimations();
    initializeScrollAnimations();
    initializeCertificationAnimations();
    initializeSkillTagAnimations();
});

// Mobile menu functionality (shared)
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (mobileNav.classList.contains('hidden')) {
        mobileNav.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Initialize entrance animations
function initializeAnimations() {
    // Stagger certification cards
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Stagger expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for certification cards
                if (entry.target.classList.contains('cert-card')) {
                    animateCertificationCard(entry.target);
                }
                
                // Special handling for expertise cards
                if (entry.target.classList.contains('expertise-card')) {
                    animateExpertiseCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(`
        .education-card,
        .cert-card,
        .expertise-card
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Certification card animations
function initializeCertificationAnimations() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        const icon = card.querySelector('.cert-icon i');
        
        card.addEventListener('mouseenter', () => {
            // Rotate icon on hover
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.5s ease';
            }
            
            // Add glow effect
            card.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
            card.style.boxShadow = '';
        });
    });
}

function animateCertificationCard(card) {
    const icon = card.querySelector('.cert-icon');
    const name = card.querySelector('.cert-name');
    
    // Animate icon
    setTimeout(() => {
        if (icon) {
            icon.style.animation = 'bounce 0.6s ease-out';
        }
    }, 200);
    
    // Animate title
    setTimeout(() => {
        if (name) {
            name.style.animation = 'slideIn 0.5s ease-out';
        }
    }, 400);
}

// Skill tag animations
function initializeSkillTagAnimations() {
    const expertiseCards = document.querySelectorAll('.expertise-card');
    
    expertiseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const skillTags = card.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05) translateY(-2px)';
                    tag.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                    tag.style.color = 'var(--primary)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const skillTags = card.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = '';
                tag.style.backgroundColor = '';
                tag.style.color = '';
            });
        });
    });
}

function animateExpertiseCard(card) {
    const skillTags = card.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animation = 'tagSlideIn 0.4s ease-out forwards';
        }, index * 100);
    });
}

// Add custom animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes tagSlideIn {
        from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.2);
        }
        50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
        }
    }
`;
document.head.appendChild(styleSheet);

// Education card animation
document.addEventListener('DOMContentLoaded', function() {
    const educationCard = document.querySelector('.education-card');
    
    if (educationCard) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.8s ease-out';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(educationCard);
    }
});

// Parallax effect for hero icon
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroIcon = document.querySelector('.hero-icon');
    
    if (heroIcon) {
        const rotation = scrolled * 0.5;
        heroIcon.style.transform = `translateY(${scrolled * 0.1}px) rotate(${rotation}deg)`;
    }
});

// Enhanced hover effects
document.addEventListener('mouseenter', function(e) {
    // Certification card enhanced effects
    if (e.target.classList.contains('cert-card')) {
        e.target.style.transform = 'translateY(-8px) scale(1.03)';
        e.target.style.transition = 'all 0.3s ease';
    }
    
    // Expertise card enhanced effects
    if (e.target.classList.contains('expertise-card')) {
        e.target.style.transform = 'translateY(-5px) rotateY(5deg)';
        e.target.style.transition = 'all 0.3s ease';
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    // Reset transformations
    if (e.target.classList.contains('cert-card') || 
        e.target.classList.contains('expertise-card')) {
        e.target.style.transform = '';
    }
}, true);

// Interactive certification clicking
document.addEventListener('click', function(e) {
    if (e.target.closest('.cert-card')) {
        const card = e.target.closest('.cert-card');
        
        // Add click animation
        card.style.animation = 'glow 0.5s ease-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 500);
    }
});

// Performance optimization
let ticking = false;

function updateOnScroll() {
    ticking = false;
}

document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.warn('About page animation error:', e.message);
});