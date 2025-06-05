window.onload = function () {
    // 讀取價格相關資訊
    const totalQuantity = localStorage.getItem('totalQuantity');
    const subtotal = localStorage.getItem('subtotal');
    const grandTotal = localStorage.getItem('grandTotal');

    if (totalQuantity && subtotal && grandTotal) {
        document.getElementById('total-quantity').textContent = totalQuantity;
        document.getElementById('subtotal').textContent = `$${subtotal}元`;
        document.getElementById('shipping').textContent = `$80元`;
        document.getElementById('grand-total').textContent = `$${grandTotal}元`;
    }

    // 動態載入商品清單
    const checkoutList = document.getElementById('checkout-product-list');

    //取得 cartItems 資料
    const selectedProducts = JSON.parse(localStorage.getItem('cartItems'));

    // 檢查 selectedProducts 存在且為陣列
    if (Array.isArray(selectedProducts)) {
        selectedProducts.forEach(product => {
            const row = document.createElement('div');
            row.className = 'row align-items-center py-3 border-bottom';
            row.innerHTML = `
                <!-- 商品圖 + 商品資訊 -->
                <div class="col-md-6 d-flex align-items-center">
                    <img src="${product.image}" class="img-fluid me-3" style="max-width: 80px;" alt="產品圖">
                    <div>
                        <p class="h5 mb-1 product-name">${product.name}</p>
                        <p class="mb-0 product-format">${product.format}</p>
                    </div>
                </div>

                <!-- 數量 + 價格 -->
                <div class="col-md-6 d-flex justify-content-end align-items-center flex-wrap">
                    <div class="h5 mb-0 px-3 product-amount">x${product.quantity}</div>
                    <div class="h5 mb-0 px-3">$${product.price * product.quantity}元</div>
                </div>
            `;
            checkoutList.appendChild(row);
        });
    } else {
        console.warn("cartItems 不存在或不是陣列：", selectedProducts);
    }
    // console.log("selectedProducts:", localStorage.getItem('cartItems'));

    // 讀取並顯示使用者寄送資訊
    const customerInfoJSON = localStorage.getItem('customerInfo');
    if (customerInfoJSON) {
        const customerInfo = JSON.parse(customerInfoJSON);

        document.getElementById('customer-name').textContent = customerInfo.name;
        document.getElementById('customer-phone').textContent = customerInfo.phone;
        document.getElementById('customer-email').textContent = customerInfo.email;
        document.getElementById('customer-city').textContent = customerInfo.city;
        document.getElementById('customer-zipcode').textContent = customerInfo.zipcode;
        document.getElementById('customer-address').textContent = customerInfo.address;
    } else {
        console.warn("找不到 customerInfo");
    }
};
