// second.js
window.onload = function(){
    // 取得 total, subtotal 等
    const totalQuantity = localStorage.getItem('totalQuantity') || 0;
    const subtotal = localStorage.getItem('subtotal') || 0;
    const grandTotal = localStorage.getItem('grandTotal') || 0;

    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('subtotal').textContent = `$${parseFloat(subtotal).toLocaleString()}元`; // 格式化小計
    // 確保運費顯示正確，如果購物車是空的，運費也會是0
    document.getElementById('shipping').textContent = totalQuantity === '0' ? `$0元` : `$80元`;
    document.getElementById('grand-total').textContent = `$${parseFloat(grandTotal).toLocaleString()}元`; // 格式化總計

    // 渲染訂單商品
    renderOrderItems();
}

function renderOrderItems(){
    const productListContainer = document.getElementById('order-list'); // 渲染處
    productListContainer.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        productListContainer.innerHTML ='<p class="text-center py-3">訂單是空的，請返回上一頁選購商品。</p>';
        return;
    }

    cart.forEach(product => {
        // 判斷是否為加購方案或有 format，以決定顯示的格式資訊
        // 這裡確保 product.details 會優先於 product.format 顯示，用於加購方案
        const displayFormat = product.details || product.format || ''; // 優先使用 details，其次 format

        // 每件商品渲染出去
        const item = document.createElement('div');
        item.classList.add('order-item', 'py-2', 'border-bottom'); // 方便後续處理 CSS
        item.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${product.image}" alt="${product.name}" style="width: 80px;" class="me-3">
                <div class="flex-grow-1">
                    <p class="h5 mb-1"><strong>${product.name}</strong></p>
                    ${displayFormat ? `<p class="mb-0 text-muted">${displayFormat}</p>` : ''}
                    <p class="mb-0">單價：$${product.price.toLocaleString()}元</p>
                    <p class="mb-0">數量：${product.quantity}</p>
                    <p class="mb-0">小計：$${(product.price * product.quantity).toLocaleString()}元</p>
                </div>
            </div>
        `;
        productListContainer.appendChild(item);
    });
}