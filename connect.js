// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('mobile-active');
    hamburger.classList.toggle('active');
}

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border-bottom: 1px solid var(--border-color);
        }
        
        .nav-menu.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }
`;

// Add mobile menu styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Add hamburger click event
document.querySelector('.hamburger').addEventListener('click', toggleMobileMenu);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe animated elements
document.addEventListener('DOMContentLoaded', function() {
    // Observe contact methods
    document.querySelectorAll('.contact-method').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
    
    // Observe specialization cards
    document.querySelectorAll('.specialization-card').forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
    
    // Observe form container
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer) {
        observer.observe(formContainer);
    }
    
    // Observe availability card
    const availabilityCard = document.querySelector('.availability-card');
    if (availabilityCard) {
        observer.observe(availabilityCard);
    }
});

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><i data-lucide="loader-2"></i>';
    submitBtn.disabled = true;
    
    // Re-create icons for the new loader icon
    lucide.createIcons();
    
    // Add rotation animation to loader
    const loader = submitBtn.querySelector('[data-lucide="loader-2"]');
    if (loader) {
        loader.style.animation = 'spin 1s linear infinite';
    }
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        lucide.createIcons();
        
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-content {
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1rem;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-success .notification-content {
            border-color: var(--success-color);
            background: #f0fdf4;
            color: #166534;
        }
        
        .notification-error .notification-content {
            border-color: var(--error-color);
            background: #fef2f2;
            color: #dc2626;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: auto;
            border-radius: 4px;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        // Remove previous error styling
        input.style.borderColor = '';
        
        // Check if required field is empty
        if (input.hasAttribute('required') && !input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    input.style.borderColor = 'var(--error-color)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--error-color);
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: fadeInUp 0.3s ease;
    `;
    
    input.parentElement.appendChild(errorElement);
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Clear previous errors
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            this.style.borderColor = '';
            
            // Validate this field
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'This field is required');
            } else if (this.type === 'email' && this.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value.trim())) {
                    showFieldError(this, 'Please enter a valid email address');
                }
            }
        });
        
        // Clear errors on input
        input.addEventListener('input', function() {
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            this.style.borderColor = '';
        });
    });
});

// Enhanced hover effects for contact methods
document.addEventListener('DOMContentLoaded', function() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        method.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Enhanced hover effects for specialization cards
document.addEventListener('DOMContentLoaded', function() {
    const specializationCards = document.querySelectorAll('.specialization-card');
    
    specializationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.specialization-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotateY(15deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.specialization-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
    });
});

// Smooth scrolling for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
});

// Typing effect for hero subtitle
document.addEventListener('DOMContentLoaded', function() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let index = 0;
        const typingSpeed = 50;
        
        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing effect after hero animation
        setTimeout(typeWriter, 1000);
    }
});

// Parallax effect for hero background
document.addEventListener('scroll', function() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Contact method click tracking
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('.contact-link, .social-link, .btn');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            const action = this.textContent.trim() || this.getAttribute('href');
            console.log(`Contact action: ${action}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Form accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        // Add ARIA labels based on the label text
        const label = input.parentElement.querySelector('label');
        if (label) {
            input.setAttribute('aria-label', label.textContent);
        }
        
        // Add keyboard navigation improvements
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.tagName !== 'TEXTAREA') {
                e.preventDefault();
                const nextInput = getNextInput(this);
                if (nextInput) {
                    nextInput.focus();
                } else {
                    // If it's the last input, focus the submit button
                    document.querySelector('.submit-btn').focus();
                }
            }
        });
    });
});

function getNextInput(currentInput) {
    const formInputs = Array.from(document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea'));
    const currentIndex = formInputs.indexOf(currentInput);
    return formInputs[currentIndex + 1] || null;
}

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', function() {
    // Add stagger animation delays
    const animatedElements = document.querySelectorAll('.contact-method, .specialization-card');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    console.log('Contact page initialized successfully');
});