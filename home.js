// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize skill card animations
    initializeSkillAnimations();
    
    // Initialize stat counters
    initializeStatCounters();
    
    // Initialize particle effects
    initializeParticleEffects();
});

// Mobile menu functionality
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
    // Add staggered animation delays for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation delays for expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delays for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add staggered animation delays for certification items
    const certificationItems = document.querySelectorAll('.certification-item');
    certificationItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
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
                
                // Special handling for stat counters
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCounter(entry.target);
                }
                
                // Special handling for skill tags
                if (entry.target.classList.contains('expertise-card')) {
                    animateSkillTags(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(`
        .stat-card,
        .expertise-card,
        .project-card,
        .certification-item,
        .section-header
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Skill card hover animations
function initializeSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skill => {
        const icon = skill.querySelector('i');
        
        skill.addEventListener('mouseenter', () => {
            // Add random rotation animation
            const randomRotation = Math.random() * 360;
            if (icon) {
                icon.style.transform = `rotate(${randomRotation}deg) scale(1.2)`;
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        skill.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// Animated stat counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        const numericValue = parseInt(finalNumber.replace(/\D/g, '')) || 0;
        const suffix = finalNumber.replace(/[\d]/g, '');
        
        stat.setAttribute('data-final', finalNumber);
        stat.textContent = '0' + suffix;
    });
}

function animateStatCounter(statCard) {
    const statNumber = statCard.querySelector('.stat-number');
    if (!statNumber || statNumber.classList.contains('animated')) return;
    
    statNumber.classList.add('animated');
    const finalNumber = statNumber.getAttribute('data-final');
    const numericValue = parseInt(finalNumber.replace(/\D/g, '')) || 0;
    const suffix = finalNumber.replace(/[\d]/g, '');
    
    let currentNumber = 0;
    const increment = Math.ceil(numericValue / 30);
    const duration = 1000;
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        statNumber.textContent = currentNumber + suffix;
    }, stepTime);
}

// Animate skill tags appearance
function animateSkillTags(expertiseCard) {
    const skillTags = expertiseCard.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animationDelay = `${index * 0.05}s`;
            tag.style.animation = 'tag-appear 0.5s ease-out forwards';
        }, index * 50);
    });
}

// Particle effects for hero section
function initializeParticleEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(hero);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.1));
        border-radius: 50%;
        pointer-events: none;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 1;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 5000);
}

// Add floating animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-40px) translateX(-10px) rotate(180deg);
            opacity: 1;
        }
        75% {
            transform: translateY(-20px) translateX(-20px) rotate(270deg);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(styleSheet);

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Enhanced hover effects
document.addEventListener('mouseenter', function(e) {
    // Enhanced skill item effects
    if (e.target.classList.contains('skill-item')) {
        e.target.style.transform = 'scale(1.05) translateY(-5px) rotateY(5deg)';
        e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    }
    
    // Enhanced project card effects
    if (e.target.classList.contains('project-card')) {
        e.target.style.transform = 'translateY(-10px) scale(1.02) rotateX(2deg)';
        e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    }
    
    // Enhanced button effects
    if (e.target.classList.contains('btn')) {
        e.target.style.transform = 'translateY(-2px) scale(1.05)';
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    // Reset transformations
    if (e.target.classList.contains('skill-item') || 
        e.target.classList.contains('project-card') ||
        e.target.classList.contains('btn')) {
        e.target.style.transform = '';
        e.target.style.boxShadow = '';
    }
}, true);

// Typing animation for hero title
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeCharacter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        }
    }
    
    setTimeout(typeCharacter, 1000);
}

// Background animation effects
function initializeBackgroundEffects() {
    // Create animated background grid
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const gridOverlay = document.createElement('div');
    gridOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0);
        background-size: 20px 20px;
        animation: grid-move 20s linear infinite;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(gridOverlay);
}

// Add grid movement animation
const gridStyleSheet = document.createElement('style');
gridStyleSheet.textContent = `
    @keyframes grid-move {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(20px, 20px);
        }
    }
`;
document.head.appendChild(gridStyleSheet);

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeBackgroundEffects();
    }, 500);
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Add scroll-based effects here
    ticking = false;
}

document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const skillsCard = document.querySelector('.skills-card');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (skillsCard) {
        skillsCard.style.transform = `translateY(${scrolled * -0.05}px)`;
    }
});

// Add interactive cursor effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    if (cursorElement) {
        cursorElement.style.left = e.clientX - 10 + 'px';
        cursorElement.style.top = e.clientY - 10 + 'px';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    setTimeout(() => {
        const elements = document.querySelectorAll('.animate-slide-in, .animate-fade-in');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0) translateY(0)';
            }, index * 100);
        });
    }, 300);
});

// Add error handling for animations
window.addEventListener('error', function(e) {
    console.warn('Animation error:', e.message);
});

// Cleanup function for performance
window.addEventListener('beforeunload', function() {
    // Clear any running intervals or timeouts
    const particles = document.querySelectorAll('[style*="animation"]');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
});