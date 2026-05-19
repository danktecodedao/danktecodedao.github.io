// 1. TÍNH NĂNG TỰ ĐỘNG ĐỔI THEME THEO MÙA
function setSeasonalTheme() {
    const month = new Date().getMonth() + 1;
    const root = document.documentElement;
    let title = document.getElementById('season-title');
    
    if (!title) return;

    if (month >= 2 && month <= 4) { 
        root.style.setProperty('--primary', '#4CAF50'); 
        title.innerText = "Căng-tin Mùa Xuân 🌸"; 
    } else if (month >= 5 && month <= 7) { 
        root.style.setProperty('--primary', '#f44336'); 
        title.innerText = "Căng-tin Mùa Hè ☀️"; 
    } else if (month >= 8 && month <= 10) { 
        root.style.setProperty('--primary', '#ff9800'); 
        title.innerText = "Căng-tin Mùa Thu 🍂"; 
    } else { 
        root.style.setProperty('--primary', '#2196F3'); 
        title.innerText = "Căng-tin Mùa Đông ❄️"; 
    }
}

// 2. DATA THỰC ĐƠN & TÍNH TOÁN CALO, GIÁ TIỀN
const menuData = [
    { id: 1, name: "Cơm Gà Xối Mỡ", price: 35000, calo: 650 },
    { id: 2, name: "Bún Bò Huế", price: 30000, calo: 450 },
    { id: 3, name: "Salad Ức Gà (Khuyên dùng)", price: 40000, calo: 250 },
    { id: 4, name: "Trà Đào Cam Sả", price: 15000, calo: 120 }
];
let cart = [];

function renderMenu() {
    const list = document.getElementById('menu-list');
    if (!list) return;
    list.innerHTML = ''; // Làm sạch danh sách trước khi hiển thị
    
    menuData.forEach(item => {
        list.innerHTML += `
            <div class="menu-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.price.toLocaleString()} VNĐ | ${item.calo} kcal</small>
                </div>
                <button class="btn" onclick="addToCart(${item.id})">Thêm</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    if (item) {
        cart.push(item);
        updateCart();
        alert(`Đã thêm ${item.name} vào giỏ!`);
    }
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    if (!cartList) return;
    cartList.innerHTML = '';
    let totalCalo = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalCalo += item.calo;
        totalPrice += item.price;
        cartList.innerHTML += `
            <li class="menu-item">
                <span>${item.name}</span>
                <button class="btn" style="background: #f44336; padding: 5px 10px;" onclick="removeFromCart(${index})">X</button>
            </li>
        `;
    });

    const discount = totalPrice * 0.05; // Giảm giá 5% cho thẻ thành viên hạng Vàng
    const finalPrice = totalPrice - discount;

    document.getElementById('total-calo').innerText = totalCalo;
    document.getElementById('total-price').innerText = totalPrice.toLocaleString();
    document.getElementById('discount').innerText = discount.toLocaleString();
    document.getElementById('final-price').innerText = finalPrice.toLocaleString();
    
    // Cảnh báo nếu lượng calo vượt ngưỡng khuyến nghị (800 kcal) để giảm lãng phí & bảo vệ sức khỏe
    const caloElement = document.getElementById('total-calo');
    if (totalCalo > 800) {
        caloElement.style.color = '#f44336'; // Chuyển chữ đỏ cảnh báo nguy cơ dư thừa năng lượng
    } else {
        caloElement.style.color = '#4CAF50'; // Giữ chữ xanh an toàn
    }
}

function removeFromCart(index) { 
    cart.splice(index, 1); 
    updateCart(); 
}

// 3. ĐIỀU HƯỚNG TABS VÀ MINIGAME GIẢI TRÍ ĐỔI QUÀ
function showTab(tabId) {
    // Ẩn tất cả nội dung các tab cũ
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    // Gỡ trạng thái nổi bật của tất cả thanh tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    // Hiển thị nội dung tab được chọn
    const targetSection = document.getElementById(tabId);
    if (targetSection) targetSection.classList.add('active');
    
    // Kích hoạt làm sáng tab tương ứng trên menu điều hướng
    document.querySelectorAll('.tab').forEach(t => {
        if (t.getAttribute('onclick') && t.getAttribute('onclick').includes(tabId)) {
            t.classList.add('active');
        }
    });
}

function playGame() {
    const rewards = ["Giảm 10% ly nước", "Tặng kèm súp ngọt", "Hoàn 5.000 VNĐ vào ví", "Chúc bạn may mắn lần sau!"];
    const random = Math.floor(Math.random() * rewards.length);
    const resultElement = document.getElementById('game-result');
    const spinBtn = document.getElementById('spin-btn');

    if (!resultElement || !spinBtn) return;

    resultElement.innerText = "Hệ thống đang quay thưởng...";
    spinBtn.disabled = true; // Khóa nút bấm trong khi quay
    
    setTimeout(() => {
        resultElement.innerText = "🎉 Kết quả: " + rewards[random];
        spinBtn.disabled = false; // Mở lại nút bấm sau khi có kết quả
    }, 1500);
}

// KHỞI CHẠY HỆ THỐNG KHI WEBSITE TẢI XONG CẤU TRÚC
window.addEventListener('DOMContentLoaded', () => {
    setSeasonalTheme();
    renderMenu();
});