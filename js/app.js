// ===== DOM ELEMENTS =====
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderModal = document.getElementById('orderModal');
const modalClose = document.getElementById('modalClose');
const orderForm = document.getElementById('orderForm');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');
const successModal = document.getElementById('successModal');
const successClose = document.getElementById('successClose');
const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');
// Product Detail Modal
const productDetailModal = document.getElementById('productDetailModal');
const detailClose = document.getElementById('detailClose');
const detailMainImage = document.getElementById('detailMainImage');
const detailThumbnails = document.getElementById('detailThumbnails');
const detailName = document.getElementById('detailName');
const detailSpecs = document.getElementById('detailSpecs');
const detailPrice = document.getElementById('detailPrice');
const detailDescription = document.getElementById('detailDescription');
const detailAddCart = document.getElementById('detailAddCart');
const detailBuyNow = document.getElementById('detailBuyNow');
let currentDetailProduct = null;

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('haustore_cart') || '[]');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    updateCart();
    setupEventListeners();
});

// ===== RENDER PRODUCTS =====
function renderProducts(filter) {
    const filtered = filter === 'all' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === filter);

    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image" onclick="openProductDetail(${product.id})" style="cursor:pointer">
                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                     onerror="this.parentElement.innerHTML='<i class=&quot;fas fa-mobile-alt placeholder-img&quot;></i>'">
            </div>
            <div class="product-info">
                <h3 class="product-name" onclick="openProductDetail(${product.id})" style="cursor:pointer">${product.name}</h3>
                <p class="product-specs">${product.specs}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i> Thêm vào giỏ
                    </button>
                    <button class="btn-buy-now" onclick="buyNow(${product.id})">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== FILTER =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
    });
});

// ===== CART FUNCTIONS =====
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCart();
    showCart();
}

function buyNow(productId) {
    addToCart(productId);
    openOrderModal();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem('haustore_cart', JSON.stringify(cart));
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update count badge
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('show', totalItems > 0);

    // Update cart total
    cartTotal.textContent = formatPrice(totalPrice);

    // Render cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Giỏ hàng trống</p>
            </div>
        `;
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}"
                         onerror="this.parentElement.innerHTML='<i class=&quot;fas fa-mobile-alt&quot;></i>'">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
    }
}

// ===== CART SIDEBAR =====
function showCart() {
    cartOverlay.classList.add('open');
    cartSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function hideCart() {
    cartOverlay.classList.remove('open');
    cartSidebar.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== ORDER MODAL =====
function openOrderModal() {
    hideCart();
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <span>${item.name} x${item.qty}</span>
            <span>${formatPrice(item.price * item.qty)}</span>
        </div>
    `).join('');
    
    orderTotal.textContent = formatPrice(totalPrice);
    orderModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    orderModal.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== ORDER SUBMIT =====
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const order = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        note: formData.get('note'),
        items: cart.map(item => ({
            name: item.name,
            qty: item.qty,
            price: item.price,
            total: item.price * item.qty
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        date: new Date().toLocaleString('vi-VN')
    };

    // Log order
    console.log('New Order:', order);
    
    // Gửi đơn hàng về Telegram
    await sendOrderToTelegram(order);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCart();
    
    // Show success
    closeOrderModal();
    successModal.classList.add('open');
    
    // Reset form
    orderForm.reset();
});

// ===== PRODUCT DETAIL MODAL =====
function openProductDetail(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    currentDetailProduct = product;
    
    // Set main image
    detailMainImage.src = product.image;
    detailMainImage.alt = product.name;
    
    // Set thumbnails
    const images = product.images || [product.image];
    detailThumbnails.innerHTML = images.map((img, idx) => `
        <img src="${img}" alt="${product.name} ${idx + 1}" 
             class="${idx === 0 ? 'active' : ''}"
             onclick="changeDetailImage('${img}', this)">
    `).join('');
    
    // Set info
    detailName.textContent = product.name;
    detailSpecs.textContent = product.specs;
    detailPrice.textContent = formatPrice(product.price);
    detailDescription.textContent = product.description || 'Chưa có mô tả chi tiết.';
    
    // Show modal
    productDetailModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
    productDetailModal.classList.remove('open');
    document.body.style.overflow = '';
}

function changeDetailImage(src, thumbEl) {
    detailMainImage.src = src;
    detailThumbnails.querySelectorAll('img').forEach(img => img.classList.remove('active'));
    thumbEl.classList.add('active');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Cart toggle
    cartBtn.addEventListener('click', showCart);
    cartOverlay.addEventListener('click', hideCart);
    cartClose.addEventListener('click', hideCart);
    
    // Checkout
    checkoutBtn.addEventListener('click', openOrderModal);
    
    // Order modal
    modalClose.addEventListener('click', closeOrderModal);
    orderModal.addEventListener('click', (e) => {
        if (e.target === orderModal) closeOrderModal();
    });
    
    // Success modal
    successClose.addEventListener('click', () => {
        successModal.classList.remove('open');
        document.body.style.overflow = '';
    });
    
    // Product detail modal
    detailClose.addEventListener('click', closeProductDetail);
    productDetailModal.addEventListener('click', (e) => {
        if (e.target === productDetailModal) closeProductDetail();
    });
    
    // Detail add to cart
    detailAddCart.addEventListener('click', () => {
        if (currentDetailProduct) {
            addToCart(currentDetailProduct.id);
            closeProductDetail();
        }
    });
    
    // Detail buy now
    detailBuyNow.addEventListener('click', () => {
        if (currentDetailProduct) {
            buyNow(currentDetailProduct.id);
            closeProductDetail();
        }
    });
    
    // Mobile menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
    
    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });
    
    // Keyboard close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideCart();
            closeOrderModal();
            closeProductDetail();
            successModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}
