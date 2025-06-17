// BCS5-框架-購物車-第四頁.js
window.onload = function () {
    // 1. 載入並顯示購物車總計資訊
    const totalQuantity = localStorage.getItem('totalQuantity') || 0;
    const subtotal = localStorage.getItem('subtotal') || 0;
    const grandTotal = localStorage.getItem('grandTotal') || 0;

    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('subtotal').textContent = `$${parseFloat(subtotal).toLocaleString()}元`;
    // 運費判斷：如果總數量為 0，則運費也為 0
    document.getElementById('shipping').textContent = totalQuantity === '0' ? `$0元` : `$80元`;
    document.getElementById('grand-total').textContent = `$${parseFloat(grandTotal).toLocaleString()}元`;

    // 2. 動態載入訂單明細 (商品清單)
    const checkoutProductList = document.getElementById('checkout-product-list');
    checkoutProductList.innerHTML = ''; // 清空現有內容
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // 注意這裡讀取 'cart'

    if (cart.length === 0) {
        checkoutProductList.innerHTML = '<p class="text-center py-3">您的訂單是空的。</p>';
    } else {
        cart.forEach(product => {
            // 判斷是否為加購方案，加購方案使用 details，其他商品使用 format
            const displayFormat = product.details || product.format || '';

            const itemHTML = `
                <div class="row align-items-center py-3 border-bottom">
                    <div class="col-md-6 d-flex align-items-center">
                        <img src="${product.image}" class="img-fluid me-3" style="max-width: 80px;" alt="${product.name}">
                        <div>
                            <p class="h5 mb-1 product-name">${product.name}</p>
                            ${displayFormat ? `<p class="mb-0 product-format text-muted">${displayFormat}</p>` : ''}
                        </div>
                    </div>

                    <div class="col-md-6 d-flex justify-content-end align-items-center flex-wrap">
                        <div class="h5 mb-0 px-3 product-amount">x${product.quantity}</div>
                        <div class="h5 mb-0 px-3">$${(product.price * product.quantity).toLocaleString()}元</div>
                    </div>
                </div>
            `;
            checkoutProductList.insertAdjacentHTML('beforeend', itemHTML); // 使用 insertAdjacentHTML 效率更高
        });
    }

    // 3. 讀取並顯示使用者寄送資訊
    const customerInfoJSON = localStorage.getItem('customerInfo');
    if (customerInfoJSON) {
        const customerInfo = JSON.parse(customerInfoJSON);

        document.getElementById('customer-name').textContent = customerInfo.name || 'N/A';
        document.getElementById('customer-phone').textContent = customerInfo.phone || 'N/A';
        document.getElementById('customer-email').textContent = customerInfo.email || 'N/A';

        // 組合完整地址
        const fullAddress = `${customerInfo.zipcode || ''} ${customerInfo.city || ''} ${customerInfo.address || ''}`;
        document.getElementById('customer-full-address').textContent = fullAddress.trim() || 'N/A';
    } else {
        console.warn("找不到 customerInfo 資料，可能未在第三頁填寫。");
        // 如果沒有資料，可以選擇顯示預設值或提示訊息
        document.getElementById('customer-name').textContent = '未填寫';
        document.getElementById('customer-phone').textContent = '未填寫';
        document.getElementById('customer-email').textContent = '未填寫';
        document.getElementById('customer-full-address').textContent = '未填寫';
    }

    // 4. (選作) 清除購物車相關的 localStorage 資料
    localStorage.removeItem('cart');
    localStorage.removeItem('totalQuantity');
    localStorage.removeItem('subtotal');
    localStorage.removeItem('grandTotal');
    localStorage.removeItem('customerInfo'); // 通常寄送資訊也會一併清除
};