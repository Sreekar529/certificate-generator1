// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
        });
    });

    // Handle file inputs
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', function(e) {
            const preview = this.parentElement.querySelector('.preview');
            if (preview) {
                if (this.files && this.files[0]) {
                    const file = this.files[0];
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            preview.innerHTML = `<img src="${e.target.result}" class="img-fluid" alt="Preview">`;
                        };
                        reader.readAsDataURL(file);
                    } else {
                        preview.innerHTML = `<p class="text-white">${file.name}</p>`;
                    }
                } else {
                    preview.innerHTML = '';
                }
            }
        });
    });

    // Handle missing images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent) {
                parent.classList.add('missing-image');
                parent.innerHTML += '<div class="alert alert-warning">Image not found</div>';
            }
        });
    });

    // Add fade-in animation to elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.feature-card, .tool-card').forEach(el => {
        observer.observe(el);
    });

    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.parentElement.querySelector('.invalid-feedback');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'invalid-feedback';
                        errorMsg.textContent = 'This field is required';
                        field.parentElement.appendChild(errorMsg);
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Remove error state on input
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('is-invalid');
                const errorMsg = this.parentElement.querySelector('.invalid-feedback');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    });

    // Utility functions
    window.formatFileSize = function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    window.showNotification = function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    };

    // Debounce function
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
});

// Space background animation
const spaceBackground = document.querySelector('.space-background');
if (spaceBackground) {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        spaceBackground.style.backgroundPosition = `${mouseX * 50}% ${mouseY * 50}%`;
    });
}

// Animate elements on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check 

// Add fade-in and hover effects for cards and previews
// Ensure template dropdowns are loaded and errors are handled gracefully 