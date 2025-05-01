document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const sizeChartBtn = document.getElementById('size-chart-btn');
    const sizeChartModal = document.getElementById('size-chart-modal');
    const closeModal = document.querySelector('.close-modal');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const scrollContainer = document.querySelector('.scroll-container');
    const productCards = document.querySelectorAll('.product-card');
    
    const productElements = document.querySelectorAll('.product-title, .product-price, .product-description, .size-section, .action-buttons');
    
    const animateElements = () => {
        productElements.forEach((element, index) => {
            element.classList.add('animate-element');
            element.style.animationDelay = `${index * 100}ms`;
        });
    };
    
    const animateMainImage = () => {
        mainImage.classList.add('fade-in-image');
    };

    const thumbnailContainer = document.querySelector('.thumbnail-images');
    thumbnailContainer.addEventListener('click', function(e) {
        const thumbnail = e.target.closest('img');
        if (!thumbnail) return;
        
        mainImage.src = thumbnail.src.replace('w=150', 'w=800');
        
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    });

    const sizeContainer = document.querySelector('.size-options');
    sizeContainer.addEventListener('click', function(e) {
        const sizeBtn = e.target.closest('.size-btn');
        if (!sizeBtn) return;
        
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        sizeBtn.classList.add('active');
    });

    sizeChartBtn.addEventListener('click', function() {
        sizeChartModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', function() {
        sizeChartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === sizeChartModal) {
            sizeChartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    addToCartBtn.addEventListener('click', function() {
        this.classList.add('pulse-animation');
        this.innerHTML = '<i class="fas fa-check"></i> Added';
        
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = 'Item added to cart!';
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show-notification');
        });
        
        setTimeout(() => {
            notification.classList.remove('show-notification');
            
            setTimeout(() => {
                this.classList.remove('pulse-animation');
                this.innerHTML = 'Add to Cart';
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    });
    
    buyNowBtn.addEventListener('click', function() {
        alert('Proceeding to checkout...');
    });

    scrollContainer.addEventListener('wheel', function(evt) {
        evt.preventDefault();
        
        const scrollAmount = evt.deltaY * 1.5;
        
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, { passive: false });
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });
    
    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
    
    const productCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, { threshold: 0.1 });
    
    productCards.forEach(card => {
        productCardObserver.observe(card);
    });
    
    const existingControls = document.querySelector('.carousel-controls');
    if (existingControls) {
        existingControls.remove();
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ffc107;
            color: #333;
            padding: 12px 20px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        }
        
        .show-notification {
            opacity: 1;
            transform: translateY(0);
        }
        
        .pulse-animation {
            animation: pulse 0.5s ease;
        }
        
        .animate-element {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.5s ease forwards;
        }
        
        .fade-in-image {
            opacity: 0;
            transform: scale(0.95);
            animation: fadeInScale 0.8s ease forwards;
        }
        
        .card-visible {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(255, 193, 7, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); background-color: #ffc107; color: white; }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInScale {
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    requestAnimationFrame(() => {
        animateElements();
        animateMainImage();
    });
});