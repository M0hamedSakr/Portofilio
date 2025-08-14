// Projects page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize animations
    initializeAnimations();
    initializeScrollAnimations();
    initializeProjectAnimations();
    initializeStatCounters();
    initializeProjectFiltering();
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
    // Stagger project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Stagger stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
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
                
                // Special handling for project cards
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                
                // Special handling for stat cards
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll(`
        .project-card,
        .stat-card,
        .hero-content,
        .cta-content
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Project card animations
function initializeProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const icon = card.querySelector('.project-icon i');
        const features = card.querySelectorAll('.feature-item');
        const techTags = card.querySelectorAll('.tech-tag');
        
        card.addEventListener('mouseenter', () => {
            // Animate project icon
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.6s ease';
            }
            
            // Animate features with stagger
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = 'var(--primary)';
                }, index * 100);
            });
            
            // Animate tech tags
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05) translateY(-2px)';
                    tag.style.borderColor = 'var(--primary)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset icon
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
            
            // Reset features
            features.forEach(feature => {
                feature.style.transform = '';
                feature.style.color = '';
            });
            
            // Reset tech tags
            techTags.forEach(tag => {
                tag.style.transform = '';
                tag.style.borderColor = '';
            });
        });
    });
}

function animateProjectCard(card) {
    const features = card.querySelectorAll('.feature-item');
    const techTags = card.querySelectorAll('.tech-tag');
    
    // Animate features with stagger
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.animation = 'feature-slide-in 0.5s ease-out forwards';
        }, index * 100);
    });
    
    // Animate tech tags with stagger
    techTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animation = 'tech-tag-appear 0.4s ease-out forwards';
        }, index * 50);
    });
}

// Stat counter animations
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalText = stat.textContent;
        const numericValue = parseInt(finalText.replace(/\D/g, '')) || 0;
        const suffix = finalText.replace(/[\d]/g, '');
        
        stat.setAttribute('data-final', finalText);
        stat.textContent = '0' + suffix;
    });
}

function animateStatCard(statCard) {
    const statNumber = statCard.querySelector('.stat-number');
    if (!statNumber || statNumber.classList.contains('animated')) return;
    
    statNumber.classList.add('animated');
    const finalText = statNumber.getAttribute('data-final');
    const numericValue = parseInt(finalText.replace(/\D/g, '')) || 0;
    const suffix = finalText.replace(/[\d]/g, '');
    
    let currentNumber = 0;
    const increment = Math.max(1, Math.ceil(numericValue / 30));
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

// Project filtering functionality
function initializeProjectFiltering() {
    // Create filter buttons dynamically
    createFilterButtons();
    
    // Initialize filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function createFilterButtons() {
    const projectsSection = document.querySelector('.projects');
    const container = projectsSection.querySelector('.container');
    
    // Check if filters already exist
    if (document.querySelector('.project-filters')) return;
    
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'project-filters';
    
    const filters = [
        { label: 'All Projects', filter: 'all' },
        { label: 'Robotics', filter: 'robotics' },
        { label: 'Web Dev', filter: 'web' },
        { label: 'IoT', filter: 'iot' },
        { label: 'AI/ML', filter: 'ai' },
        { label: 'Healthcare', filter: 'healthcare' },
        { label: 'Assistive Tech', filter: 'assistive' }
    ];
    
    filters.forEach((filterItem, index) => {
        const button = document.createElement('button');
        button.className = `filter-btn ${index === 0 ? 'active' : ''}`;
        button.setAttribute('data-filter', filterItem.filter);
        button.textContent = filterItem.label;
        filtersContainer.appendChild(button);
    });
    
    // Insert before projects grid
    const projectsGrid = container.querySelector('.projects-grid');
    container.insertBefore(filtersContainer, projectsGrid);
}

function filterProjects(filter, projectCards) {
    projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.animation = 'scaleUp 0.5s ease-out forwards';
            }, index * 100);
        } else {
            card.style.animation = 'scaleDown 0.3s ease-out forwards';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Add scale down animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes scaleDown {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
    @keyframes projectGlow {
        0%, 100% {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        50% {
            box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.4);
        }
    }
    
    @keyframes iconSpin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(styleSheet);

// Enhanced project interactions
document.addEventListener('click', function(e) {
    // Project card click handling
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        
        // Don't trigger if clicking buttons
        if (e.target.closest('.btn')) return;
        
        // Add click animation
        card.style.animation = 'projectGlow 0.6s ease-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
        
        // Could add modal or navigation here
        console.log('Project clicked:', card.querySelector('.project-title').textContent);
    }
    
    // Action button handling
    if (e.target.closest('.btn')) {
        const button = e.target.closest('.btn');
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard?.querySelector('.project-title')?.textContent;
        
        if (button.querySelector('[data-lucide="external-link"]')) {
            console.log('View details clicked for:', projectTitle);
            // Add view details functionality
        } else if (button.querySelector('[data-lucide="github"]')) {
            console.log('GitHub clicked for:', projectTitle);
            // Add GitHub link functionality
        }
    }
});

// Parallax effect for hero icon
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroIcon = document.querySelector('.hero-icon');
    
    if (heroIcon) {
        const rotation = scrolled * 0.5;
        const scale = 1 + (scrolled * 0.001);
        heroIcon.style.transform = `translateY(${scrolled * 0.1}px) rotate(${rotation}deg) scale(${Math.min(scale, 1.2)})`;
    }
});

// Enhanced hover effects with 3D transforms
document.addEventListener('mouseenter', function(e) {
    if (e.target.classList.contains('project-card')) {
        e.target.style.transform = 'translateY(-12px) scale(1.03) perspective(1000px) rotateY(2deg)';
        e.target.style.transition = 'all 0.4s ease';
    }
    
    if (e.target.classList.contains('stat-card')) {
        e.target.style.transform = 'translateY(-8px) scale(1.05) rotateX(5deg)';
        e.target.style.transition = 'all 0.3s ease';
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    if (e.target.classList.contains('project-card') || 
        e.target.classList.contains('stat-card')) {
        e.target.style.transform = '';
    }
}, true);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const focusedElement = document.activeElement;
    
    if (e.key === 'Enter' && focusedElement.classList.contains('project-card')) {
        focusedElement.click();
    }
    
    if (e.key === 'Escape') {
        // Close any open modals or reset filters
        const allFilter = document.querySelector('[data-filter="all"]');
        if (allFilter) allFilter.click();
    }
});

// Performance optimization
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

// Initialize project search functionality
function initializeProjectSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'project-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 0.75rem 1rem;
        margin: 0 auto 2rem;
        display: block;
        border: 1px solid var(--border);
        border-radius: 0.5rem;
        background-color: var(--background);
        color: var(--foreground);
        font-size: 1rem;
    `;
    
    const projectsSection = document.querySelector('.projects .container');
    const filtersContainer = document.querySelector('.project-filters');
    
    if (filtersContainer) {
        projectsSection.insertBefore(searchInput, filtersContainer);
    }
    
    // Add search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          techTags.some(tag => tag.includes(searchTerm));
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                card.style.animation = 'scaleUp 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize search after DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeProjectSearch, 1000);
});

// Error handling
window.addEventListener('error', function(e) {
    console.warn('Projects page animation error:', e.message);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    // Clear any running timers
    const runningTimers = document.querySelectorAll('[data-timer]');
    runningTimers.forEach(element => {
        const timerId = element.getAttribute('data-timer');
        if (timerId) clearInterval(parseInt(timerId));
    });
});