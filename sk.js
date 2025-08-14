// Skills page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize animations
    initializeAnimations();
    initializeScrollAnimations();
    initializeProgressBars();
    initializeStatCounters();
    initializeSkillInteractions();
    initializeSkillFiltering();
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
    // Stagger skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Stagger professional cards
    const professionalCards = document.querySelectorAll('.professional-card');
    professionalCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
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
                
                // Special handling for skill categories
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillCategory(entry.target);
                }
                
                // Special handling for professional cards
                if (entry.target.classList.contains('professional-card')) {
                    animateProfessionalCard(entry.target);
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
        .skill-category,
        .professional-card,
        .stat-card,
        .hero-content,
        .section-header
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Progress bar animations
function initializeProgressBars() {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progressValue = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progressValue + '%';
                }, 300);
                
                // Animate the percentage text
                const progressText = progressBar.parentElement.parentElement.querySelector('.progress-value, .skill-level');
                if (progressText) {
                    animateProgressText(progressText, progressValue);
                }
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

function animateProgressText(element, targetValue) {
    let currentValue = 0;
    const increment = Math.ceil(targetValue / 30);
    const duration = 1000;
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = currentValue + '%';
    }, stepTime);
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

// Skill category animations
function animateSkillCategory(category) {
    const skillItems = category.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'slideUp 0.6s ease-out forwards';
        }, index * 100);
    });
}

// Professional card animations
function animateProfessionalCard(card) {
    const progressBar = card.querySelector('.progress-fill');
    if (progressBar) {
        const progressValue = progressBar.getAttribute('data-progress');
        setTimeout(() => {
            progressBar.style.width = progressValue + '%';
        }, 300);
    }
}

// Skill interactions
function initializeSkillInteractions() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.progress-fill');
        const skillName = item.querySelector('.skill-name');
        
        item.addEventListener('mouseenter', () => {
            // Add glow effect to progress bar
            if (progressBar) {
                progressBar.style.animation = 'progress-glow 1s ease-out infinite';
            }
            
            // Highlight skill name
            if (skillName) {
                skillName.style.color = 'var(--primary)';
                skillName.style.transform = 'scale(1.05)';
            }
            
            // Add pulsing effect to the entire item
            item.style.boxShadow = '0 8px 25px -8px rgba(59, 130, 246, 0.4)';
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset effects
            if (progressBar) {
                progressBar.style.animation = '';
            }
            
            if (skillName) {
                skillName.style.color = '';
                skillName.style.transform = '';
            }
            
            item.style.boxShadow = '';
        });
    });
    
    // Professional cards interactions
    const professionalCards = document.querySelectorAll('.professional-card');
    
    professionalCards.forEach(card => {
        const icon = card.querySelector('.professional-icon i');
        
        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// Skill filtering functionality
function initializeSkillFiltering() {
    createSkillLevelLegend();
    createSkillSearch();
    
    // Category filtering
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.parentElement;
            const skillsGrid = category.querySelector('.skills-grid');
            
            // Toggle expanded/collapsed state
            if (skillsGrid.style.display === 'none') {
                skillsGrid.style.display = 'grid';
                category.classList.remove('collapsed');
            } else {
                skillsGrid.style.display = 'none';
                category.classList.add('collapsed');
            }
        });
    });
}

function createSkillLevelLegend() {
    const technicalSkills = document.querySelector('.technical-skills .container');
    const sectionHeader = technicalSkills.querySelector('.section-header');
    
    const legend = document.createElement('div');
    legend.className = 'skill-level-legend';
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color expert"></div>
            <span>Expert (90-95%)</span>
        </div>
        <div class="legend-item">
            <div class="legend-color advanced"></div>
            <span>Advanced (85-88%)</span>
        </div>
        <div class="legend-item">
            <div class="legend-color intermediate"></div>
            <span>Intermediate (75-82%)</span>
        </div>
    `;
    
    technicalSkills.insertBefore(legend, sectionHeader.nextSibling);
}

function createSkillSearch() {
    const technicalSkills = document.querySelector('.technical-skills .container');
    const skillsCategories = technicalSkills.querySelector('.skills-categories');
    
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        margin-bottom: 2rem;
        text-align: center;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search skills...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 0.75rem 1rem;
        border: 1px solid var(--border);
        border-radius: 0.5rem;
        background-color: var(--background);
        color: var(--foreground);
        font-size: 1rem;
    `;
    
    searchContainer.appendChild(searchInput);
    technicalSkills.insertBefore(searchContainer, skillsCategories);
    
    // Add search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const categoryTitle = category.querySelector('.category-title').textContent.toLowerCase();
            const skillItems = category.querySelectorAll('.skill-item');
            let categoryHasMatch = false;
            
            skillItems.forEach(item => {
                const skillName = item.querySelector('.skill-name').textContent.toLowerCase();
                const skillDescription = item.querySelector('.skill-description').textContent.toLowerCase();
                
                const matches = skillName.includes(searchTerm) || 
                              skillDescription.includes(searchTerm) ||
                              categoryTitle.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease-out';
                    categoryHasMatch = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide entire category based on matches
            if (categoryHasMatch || searchTerm === '') {
                category.style.display = 'block';
                category.style.animation = 'slideUp 0.3s ease-out';
            } else {
                category.style.display = 'none';
            }
        });
    });
}

// Add custom animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .skill-category.collapsed .skills-grid {
        display: none !important;
    }
    
    .skill-category.collapsed .category-header {
        cursor: pointer;
    }
    
    .skill-category.collapsed .category-header:hover {
        background-color: rgba(59, 130, 246, 0.05);
        border-radius: 0.5rem;
        padding: 0.5rem;
        margin: -0.5rem;
    }
    
    @keyframes skillGlow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.2);
        }
        50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
        }
    }
    
    @keyframes iconSpin360 {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(styleSheet);

// Skill mastery level detection and color coding
function updateProgressBarColors() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const progress = parseInt(bar.getAttribute('data-progress'));
        
        if (progress >= 90) {
            bar.style.background = 'linear-gradient(90deg, #10b981, #059669)'; // Expert - Green
        } else if (progress >= 85) {
            bar.style.background = 'linear-gradient(90deg, #3b82f6, #1d4ed8)'; // Advanced - Blue
        } else if (progress >= 80) {
            bar.style.background = 'linear-gradient(90deg, #8b5cf6, #7c3aed)'; // Intermediate+ - Purple
        } else if (progress >= 75) {
            bar.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)'; // Intermediate - Orange
        }
    });
}

// Parallax effect for hero icon
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroIcon = document.querySelector('.hero-icon');
    
    if (heroIcon) {
        const rotation = scrolled * 0.5;
        const scale = 1 + (scrolled * 0.001);
        heroIcon.style.transform = `translateY(${scrolled * 0.1}px) rotate(${rotation}deg) scale(${Math.min(scale, 1.3)})`;
    }
});

// Enhanced hover effects
document.addEventListener('mouseenter', function(e) {
    if (e.target.classList.contains('skill-category')) {
        e.target.style.transform = 'translateY(-5px) scale(1.01)';
        e.target.style.transition = 'all 0.3s ease';
    }
    
    if (e.target.classList.contains('professional-card')) {
        e.target.style.transform = 'translateY(-8px) scale(1.03) rotateY(2deg)';
        e.target.style.transition = 'all 0.3s ease';
    }
    
    if (e.target.classList.contains('stat-card')) {
        e.target.style.transform = 'translateY(-8px) scale(1.05) rotateX(5deg)';
        e.target.style.transition = 'all 0.3s ease';
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    if (e.target.classList.contains('skill-category') || 
        e.target.classList.contains('professional-card') ||
        e.target.classList.contains('stat-card')) {
        e.target.style.transform = '';
    }
}, true);

// Keyboard navigation for skills
document.addEventListener('keydown', function(e) {
    const focusedElement = document.activeElement;
    
    if (e.key === 'Enter' && focusedElement.classList.contains('skill-item')) {
        // Could add skill detail modal here
        focusedElement.style.animation = 'skillGlow 1s ease-out';
        setTimeout(() => {
            focusedElement.style.animation = '';
        }, 1000);
    }
    
    if (e.key === 'Escape') {
        // Clear search
        const searchInput = document.querySelector('input[placeholder="Search skills..."]');
        if (searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    }
});

// Initialize skill tooltips
function initializeSkillTooltips() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillName = item.querySelector('.skill-name').textContent;
        const skillLevel = item.querySelector('.skill-level').textContent;
        const skillDescription = item.querySelector('.skill-description').textContent;
        
        item.title = `${skillName} (${skillLevel}): ${skillDescription}`;
    });
}

// Performance optimization
let ticking = false;

function updateOnScroll() {
    // Update progress bar colors when they come into view
    updateProgressBarColors();
    ticking = false;
}

document.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateProgressBarColors();
        initializeSkillTooltips();
    }, 1000);
});

// Skill expertise calculator
function calculateOverallExpertise() {
    const progressBars = document.querySelectorAll('.progress-fill');
    let totalSkills = 0;
    let totalScore = 0;
    
    progressBars.forEach(bar => {
        const progress = parseInt(bar.getAttribute('data-progress'));
        if (progress) {
            totalSkills++;
            totalScore += progress;
        }
    });
    
    const averageExpertise = Math.round(totalScore / totalSkills);
    console.log(`Overall Technical Expertise: ${averageExpertise}% across ${totalSkills} skills`);
    
    return { average: averageExpertise, totalSkills };
}

// Error handling
window.addEventListener('error', function(e) {
    console.warn('Skills page animation error:', e.message);
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

// Export functions for potential external use
window.skillsPageAPI = {
    calculateOverallExpertise,
    updateProgressBarColors,
    animateProgressText
};