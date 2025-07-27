// Global variables
let admissionConfirmed = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
});

// Initialize animations
function initializeAnimations() {
    // Animate cards on scroll
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

    // Observe all cards
    document.querySelectorAll('.info-card, .welcome-card, .actions-section').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Show login modal
function showLogin() {
    showNotification('تم تسجيل الدخول بنجاح', 'success');
}

// Show help
function showHelp() {
    showNotification('للمساعدة، يرجى التواصل مع الدعم الفني على الرقم: 00966114670000', 'info');
}

// Confirm admission
function confirmAdmission() {
    if (admissionConfirmed) {
        showNotification('تم تأكيد القبول مسبقاً', 'warning');
        return;
    }
    
    showModal('confirmationModal');
}

// Process confirmation
function processConfirmation() {
    closeModal('confirmationModal');
    
    // Show loading animation
    showLoadingAnimation();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingAnimation();
        admissionConfirmed = true;
        showModal('successModal');
        updateConfirmationButton();
        
        // Send confirmation email (simulated)
        setTimeout(() => {
            showNotification('تم إرسال رسالة تأكيد على البريد الإلكتروني', 'success');
        }, 2000);
    }, 2000);
}

// Update confirmation button
function updateConfirmationButton() {
    const confirmBtn = document.querySelector('.confirm-btn');
    confirmBtn.innerHTML = '<i class="fas fa-check-circle"></i> تم التأكيد';
    confirmBtn.style.background = 'linear-gradient(45deg, #95a5a6, #7f8c8d)';
    confirmBtn.disabled = true;
    confirmBtn.style.cursor = 'not-allowed';
}

// Download admission letter
function downloadLetter() {
    if (!admissionConfirmed) {
        showNotification('يجب تأكيد القبول أولاً لتحميل خطاب القبول', 'warning');
        return;
    }
    
    showLoadingAnimation();
    
    // Simulate download
    setTimeout(() => {
        hideLoadingAnimation();
        
        // Create and download a sample PDF
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKNiu2LfYp9ioINin2YTZgtio2YjZhCkKL0NyZWF0b3IgKNis2KfZhdi52Kkg2KfZhNmF2YTZgyDYs9i52YjYrykKL1Byb2R1Y2VyIChQREYgR2VuZXJhdG9yKQovQ3JlYXRpb25EYXRlIChEOjIwMjQwNzI0MTIwMDAwWikKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbNCAwIFJdCi9Db3VudCAxCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCijYrtmK2LfYp9ioINin2YTZgtio2YjZhCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDE3NCAwMDAwMCBuIAowMDAwMDAwMjIxIDAwMDAwIG4gCjAwMDAwMDAyNzggMDAwMDAgbiAKMDAwMDAwMDM3NyAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMiAwIFIKPj4Kc3RhcnR4cmVmCjQ3MQolJUVPRgo=';
        link.download = 'خطاب_القبول_راما_العتيبي.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('تم تحميل خطاب القبول بنجاح', 'success');
    }, 1500);
}

// Schedule orientation
function scheduleOrientation() {
    showNotification('سيتم فتح نظام حجز المواعيد قريباً', 'info');
    
    // Simulate opening calendar
    setTimeout(() => {
        const orientationDates = [
            'الأحد 15 سبتمبر 2024 - 9:00 صباحاً',
            'الاثنين 16 سبتمبر 2024 - 10:00 صباحاً',
            'الثلاثاء 17 سبتمبر 2024 - 11:00 صباحاً'
        ];
        
        const selectedDate = orientationDates[Math.floor(Math.random() * orientationDates.length)];
        showNotification(`تم حجز موعد التوجيه: ${selectedDate}`, 'success');
    }, 2000);
}

// Contact support
function contactSupport() {
    const supportOptions = [
        'الهاتف: 00966114670000',
        'البريد الإلكتروني: admission@ksu.edu.sa',
        'الدردشة المباشرة متاحة من 8 ص إلى 5 م'
    ];
    
    let message = 'طرق التواصل مع الدعم:\n\n';
    supportOptions.forEach((option, index) => {
        message += `${index + 1}. ${option}\n`;
    });
    
    alert(message);
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus trap
        const focusableElements = modal.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        padding: 1rem 1.5rem;
        z-index: 3000;
        max-width: 400px;
        border-left: 4px solid ${getNotificationColor(type)};
        animation: slideInRight 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        .notification-content i {
            color: ${getNotificationColor(type)};
            font-size: 1.2rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        .notification-close:hover {
            background: #f0f0f0;
            color: #666;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    return colors[type] || colors.info;
}

// Loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'loadingOverlay';
    loader.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>جاري المعالجة...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4000;
        backdrop-filter: blur(5px);
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loading-content {
            text-align: center;
            color: white;
        }
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
}

function hideLoadingAnimation() {
    const loader = document.getElementById('loadingOverlay');
    if (loader) {
        loader.remove();
    }
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const welcomeCard = document.querySelector('.welcome-card');
    if (welcomeCard) {
        const rect = welcomeCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            welcomeCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            welcomeCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    }
});

// Print functionality
function printAdmissionLetter() {
    if (!admissionConfirmed) {
        showNotification('يجب تأكيد القبول أولاً', 'warning');
        return;
    }
    
    window.print();
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Tab navigation for action buttons
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    // Enter key for buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        white-space: nowrap;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    initializeTooltips();
    showNotification('مرحباً بك في بوابة القبول', 'success');
});

