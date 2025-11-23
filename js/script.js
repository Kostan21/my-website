// Enhanced Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Create backdrop for mobile menu
    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'menu-backdrop';
    document.body.appendChild(menuBackdrop);
    
    if (navToggle && navLinks) {
        function toggleMenu() {
            const isOpening = !navLinks.classList.contains('active');
            
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            menuBackdrop.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Prevent body scroll when menu is open
            if (isOpening) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }
        
        function closeMenu() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            menuBackdrop.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }
        
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on backdrop
        menuBackdrop.addEventListener('click', closeMenu);
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968) {
                closeMenu();
            }
        });
        
        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 968 && 
                navLinks.classList.contains('active') &&
                !navToggle.contains(e.target) && 
                !navLinks.contains(e.target)) {
                closeMenu();
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only process internal links
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update setActiveNavigation to handle mobile better
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        const isActive = linkPage === currentPage || 
                        (currentPage === '' && linkPage === 'index.html') ||
                        (currentPage === 'index.html' && linkPage === 'index.html');
        
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
// Code syntax highlighting
// Enhanced syntax highlighting
function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        let html = block.textContent;
        
        // Enhanced syntax highlighting
        html = html
            // Comments
            .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
            .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>')
            
            // Strings
            .replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, '<span class="code-string">$1</span>')
            
            // Numbers
            .replace(/\b(\d+\.?\d*|\.\d+)\b/g, '<span class="code-number">$1</span>')
            
            // Keywords
            .replace(/\b(openapi|info|title|version|description|contact|name|email|servers|url|paths|get|post|put|delete|summary|responses|content|schema|type|properties|required|format|example|components|schemas|requestBody)\b/g, '<span class="code-keyword">$1</span>')
            
            // Types
            .replace(/\b(string|integer|number|boolean|object|array|int64|date-time)\b/g, '<span class="code-type">$1</span>')
            
            // Properties
            .replace(/(\w+):/g, '<span class="code-property">$1</span>:')
            
            // Special values
            .replace(/\b(true|false|null|undefined)\b/g, '<span class="code-keyword">$1</span>')
            
            // HTTP methods and codes
            .replace(/\b(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\b/g, '<span class="code-function">$1</span>')
            .replace(/('?\d{3}'?)/g, '<span class="code-number">$1</span>');
        
        block.innerHTML = html;
    });
}

// Copy to clipboard functionality
// Improved Copy to clipboard functionality
function initCopyButtons() {
    document.querySelectorAll('pre').forEach(pre => {
        // Check if copy button already exists
        if (pre.querySelector('.copy-button')) return;
        
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Копировать';
        copyButton.className = 'copy-button';
        copyButton.title = 'Скопировать код в буфер обмена';
        copyButton.setAttribute('aria-label', 'Скопировать код');
        
        copyButton.addEventListener('click', async () => {
            const code = pre.querySelector('code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                
                // Visual feedback
                copyButton.innerHTML = '✅ Скопировано!';
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Копировать';
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code: ', err);
                copyButton.innerHTML = '❌ Ошибка';
                copyButton.classList.add('error');
                
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Копировать';
                    copyButton.classList.remove('error');
                }, 2000);
            }
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

// Print functionality
// Improved Print functionality
function initPrintFunctionality() {
    // Only add print button to content pages (not main page)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') return;
    
    const printBtnContainer = document.createElement('div');
    printBtnContainer.className = 'print-btn-container';
    
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ Печать страницы';
    printBtn.className = 'print-btn';
    printBtn.addEventListener('click', prepareAndPrint);
    
    printBtnContainer.appendChild(printBtn);
    
    // Add print button at the beginning of content section
    const contentSection = document.querySelector('.content');
    if (contentSection) {
        contentSection.insertBefore(printBtnContainer, contentSection.firstChild);
    }
}

function prepareAndPrint() {
    // Show loading state
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        const originalText = printBtn.innerHTML;
        printBtn.innerHTML = '⏳ Подготовка к печати...';
        printBtn.disabled = true;
        
        // Force show all content that might be hidden due to animations
        document.querySelectorAll('*').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.animation = 'none';
        });
        
        // Ensure all grid items are visible
        document.querySelectorAll('.topic-card, .advantage, .type-card, .principle-card, .practice-card, .tool-card, .case-card, .resource-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
            card.style.display = 'block';
        });
        
        // Wait a bit for DOM to update, then print
        setTimeout(() => {
            window.print();
            
            // Restore button state after print dialog closes
            setTimeout(() => {
                printBtn.innerHTML = originalText;
                printBtn.disabled = false;
            }, 1000);
            
        }, 500);
    } else {
        window.print();
    }
}

// Enhanced function to ensure all content is printable
function ensurePrintableContent() {
    // Remove any animations that might interfere with printing
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            * {
                animation: none !important;
                transition: none !important;
            }
            
            .topic-card,
            .advantage, 
            .type-card,
            .principle-card,
            .practice-card,
            .tool-card,
            .case-card,
            .resource-card {
                opacity: 1 !important;
                transform: none !important;
                display: block !important;
                page-break-inside: avoid !important;
            }
            
            .topics-grid,
            .advantages,
            .monitoring-types,
            .principles-grid,
            .practices-grid {
                display: block !important;
            }
        }
    `;
    document.head.appendChild(style);
}

function printPage() {
    window.print();
}

// Progress indicator for page reading
function initProgressIndicator() {
    // Only on content pages, not on main page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
    
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (docHeight - winHeight)) * 100;
        
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
}

// Fade-in animations
function initAnimations() {
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
    
    // Observe all interactive elements
    const elementsToAnimate = document.querySelectorAll('.topic-card, .advantage, .type-card, .feature, .code-example');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Touch device detection
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Enhanced mobile experience
function enhanceMobileExperience() {
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
        
        // Increase tap targets for better mobile UX
        const tapTargets = document.querySelectorAll('.nav-link, .btn, .nav-btn, .print-btn');
        tapTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.minWidth = '44px';
            target.style.display = 'flex';
            target.style.alignItems = 'center';
            target.style.justifyContent = 'center';
        });
        
        // Better touch scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// Update page header margin based on header height
function updatePageHeaderMargin() {
    const header = document.querySelector('.header');
    const pageHeader = document.querySelector('.page-header');
    
    if (header && pageHeader) {
        const headerHeight = header.offsetHeight;
        pageHeader.style.marginTop = `${headerHeight}px`;
    }
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSmoothScrolling();
    setActiveNavigation();
    highlightCodeBlocks();
    initCopyButtons();
    initPrintFunctionality();
    ensurePrintableContent
    initProgressIndicator();
    initAnimations();
    enhanceMobileExperience();
    updatePageHeaderMargin();
    
    console.log('Website initialized successfully');
});

// Handle page load errors
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
});

// Performance optimization for mobile
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.saveData || connection.effectiveType.includes('2g') || connection.effectiveType.includes('3g')) {
        // Reduce animations for slow connections
        document.documentElement.style.setProperty('--transition', 'all 0.1s ease');
    }
}