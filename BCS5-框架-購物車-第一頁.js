// 計算總價與更新畫面
function updateCartSummary() {
    const items = document.querySelectorAll('#product-list > .product-item'); // 精準選擇商品
    // 初始化總數量與小計金額
    let totalQuantity = 0;
    let subtotal = 0;
    const cartItems = [];

    items.forEach(item => {
        const name = item.querySelector('.item-name').textContent.trim();
        const format = item.querySelector('.item-format').textContent.trim();
        const image = item.querySelector('img').getAttribute('src');
        const itemPriceElement = item.querySelector('.item-price');
        //取得單價跟數量
        const price = parseInt(itemPriceElement.dataset.price);
        const quantity = parseInt(item.querySelector('.quantity-input').value);

        totalQuantity += quantity;
        const itemTotal = price * quantity;
        subtotal += itemTotal;
        // 更新每個商品旁邊的小計顯示
        itemPriceElement.textContent = `$${itemTotal}元`;

        cartItems.push({ name, format, quantity, price, image });
    });

    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('subtotal').textContent = `$${subtotal}元`;
    //加上運費
    const shipping = 80;
    const total = subtotal + shipping;
    document.getElementById('grand-total').textContent = `$${total}元`;
    // 將資料寫入 localStorage，這樣在第二頁就能存取
    localStorage.setItem('totalQuantity', totalQuantity);
    localStorage.setItem('subtotal', subtotal);
    localStorage.setItem('grandTotal', total);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// 加入監聽加減按鈕事件
function bindQuantityEvents() {
    const items = document.querySelectorAll('#product-list > .product-item');

    items.forEach(item => {
        const input = item.querySelector('.quantity-input');
        const plusBtn = item.querySelector('.plus-btn');
        const minusBtn = item.querySelector('.minus-btn');

        plusBtn.addEventListener('click', () => {
            input.value = parseInt(input.value) + 1;
            updateCartSummary();
        });

        minusBtn.addEventListener('click', () => {
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
                updateCartSummary();
            }
        });

        input.addEventListener('input', () => {
            let value = parseInt(input.value);
            if (isNaN(value) || value < 1) {
                input.value = 1;// 最低為 1
            }
            updateCartSummary();
        });
    });
}

// 初始化
window.onload = function () {
    bindQuantityEvents();
    updateCartSummary();
};


