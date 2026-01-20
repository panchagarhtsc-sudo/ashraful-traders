// মোবাইল মেনু টগল
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    
    // কার্ড হোভার এফেক্ট
    const cards = document.querySelectorAll('.category-card, .offer-card, .tip-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // আজকের তারিখ শো
    function showTodayDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = today.toLocaleDateString('bn-BD', options);
        
        const dateElement = document.createElement('div');
        dateElement.className = 'today-date';
        dateElement.innerHTML = `
            <i class="fas fa-calendar-alt"></i>
            <span>${dateStr}</span>
        `;
        dateElement.style.cssText = `
            background: var(--primary);
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin: 20px 0;
            font-weight: bold;
        `;
        
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.appendChild(dateElement);
        }
    }
    
    showTodayDate();
    
    // অফার কাউন্টডাউন
    function createOfferCountdown() {
        const offerElements = document.querySelectorAll('.offer-card');
        
        offerElements.forEach(offer => {
            const countdown = document.createElement('div');
            countdown.className = 'offer-countdown';
            countdown.innerHTML = `
                <i class="fas fa-clock"></i>
                <span>অফার শেষ হতে বাকি: <strong>২৪:৫৯:৫৯</strong></span>
            `;
            countdown.style.cssText = `
                background: #ffebee;
                color: #d32f2f;
                padding: 8px 15px;
                border-radius: 5px;
                font-size: 0.9rem;
                margin-top: 15px;
                display: flex;
                align-items: center;
                gap: 8px;
            `;
            
            offer.appendChild(countdown);
        });
    }
    
    createOfferCountdown();
    
    // WhatsApp বাটন এনিমেশন
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // স্ক্রল টু টপ বাটন
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // স্টাইল এপ্লাই
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        display: none;
        z-index: 1000;
        transition: all 0.3s;
    `;
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // কন্টাক্ট ফর্ম ভ্যালিডেশন (যদি যোগ করেন)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if (name.length < 3) {
                alert('দয়া করে আপনার পূর্ণ নাম লিখুন');
                return false;
            }
            
            if (phone.length < 11 || !/^[0-9]+$/.test(phone)) {
                alert('দয়া করে সঠিক মোবাইল নম্বর লিখুন');
                return false;
            }
            
            if (message.length < 10) {
                alert('দয়া করে আপনার মেসেজ বিস্তারিত লিখুন');
                return false;
            }
            
            // সাবমিশন সিমুলেট
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('আপনার মেসেজ সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // প্রোডাক্ট সার্চ ফাংশন (যদি যোগ করেন)
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                const productDesc = product.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
    
    // টেস্টিমোনিয়াল স্লাইডার (যদি যোগ করেন)
    function initTestimonialSlider() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length > 0) {
            let currentIndex = 0;
            
            setInterval(() => {
                testimonials.forEach((testimonial, index) => {
                    testimonial.style.opacity = '0';
                    testimonial.style.transform = 'translateX(20px)';
                    testimonial.style.transition = 'all 0.5s';
                });
                
                testimonials[currentIndex].style.opacity = '1';
                testimonials[currentIndex].style.transform = 'translateX(0)';
                
                currentIndex = (currentIndex + 1) % testimonials.length;
            }, 5000);
        }
    }
    
    initTestimonialSlider();
});

// লোকাল স্টোরেজে কার্ট ডাটা ম্যানেজ (ভবিষ্যতের জন্য)
const cartManager = {
    addToCart: function(productId, productName, price, quantity = 1) {
        let cart = JSON.parse(localStorage.getItem('ashraful_cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: price,
                quantity: quantity
            });
        }
        
        localStorage.setItem('ashraful_cart', JSON.stringify(cart));
        this.updateCartCount();
        return true;
    },
    
    updateCartCount: function() {
        const cart = JSON.parse(localStorage.getItem('ashraful_cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    },
    
    getCartTotal: function() {
        const cart = JSON.parse(localStorage.getItem('ashraful_cart')) || [];
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
};

// পেজ লোড হলে কার্ট কাউন্ট আপডেট
if (localStorage.getItem('ashraful_cart')) {
    cartManager.updateCartCount();
}