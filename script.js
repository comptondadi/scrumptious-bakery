// 1. The Menu Data (This is what you edit to change products)
const menuItems = [
    { 
        id: 1, 
        name: "Ginger Cookies (Pack)", 
        price: 200, 
        category: "cookies", 
        img: "https://images.unsplash.com/photo-1499636138143-bd649043ea52?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 2, 
        name: "Coconut Drops", 
        price: 150, 
        category: "cookies", 
        img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 3, 
        name: "Fresh Butter Bread", 
        price: 80, 
        category: "bread", 
        img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 4, 
        name: "Meat Pie", 
        price: 150, 
        category: "pastry", 
        img: "https://images.unsplash.com/photo-1572383672419-ab4779963eb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 5, 
        name: "Queen Cakes (6pcs)", 
        price: 300, 
        category: "pastry", 
        img: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
    }
];

let cart = [];

// 2. Render Menu
const menuContainer = document.getElementById('menu-container');

function renderMenu(category = 'all') {
    menuContainer.innerHTML = '';
    const items = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="assets/${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/150'">
            <h4>${item.name}</h4>
            <p>KES ${item.price}</p>
            <button class="add-btn" onclick="addToCart(${item.id})">Add +</button>
        `;
        menuContainer.appendChild(div);
    });
}

// 3. Cart Logic
function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    const cartBar = document.getElementById('floating-cart');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total');

    if (cart.length > 0) {
        cartBar.classList.remove('hidden');
    } else {
        cartBar.classList.add('hidden');
    }

    countSpan.innerText = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalSpan.innerText = total;
}

// 4. Filter Logic
function filterMenu(category) {
    document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderMenu(category);
}

// 5. Modal Logic
function openCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

// 6. WhatsApp Integration (The MAGIC Part)
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const time = document.getElementById('delivery-time').value;
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // List items
    let itemList = "";
    cart.forEach(item => {
        itemList += `- ${item.name} (KES ${item.price})%0a`;
    });

    // HER PHONE NUMBER (Put her number here, e.g., 254712345678)
    const phoneNumber = "254700000000"; 

    // Construct Message
    const message = `*New Order from Website*%0a%0a👤 *Customer:* ${name}%0a📍 *Location:* ${address}%0a⏰ *Time:* ${time}%0a%0a🛒 *Order:*%0a${itemList}%0a💰 *Total: KES ${total}*`;

    // Redirect to WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
});

// Initialize
renderMenu();