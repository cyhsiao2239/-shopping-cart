// JavaScript for BCS5-框架-購物車-第一頁.js

document.addEventListener('DOMContentLoaded', () => {
    // 輔助函數：計算總價與更新畫面
    function updateCartSummary() {
        const items = document.querySelectorAll('#product-list > .product-item'); // 精準選擇商品
        let totalQuantity = 0;
        let subtotal = 0;
        const currentCartItems = []; // 用於保存更新後的購物車數據

        items.forEach(item => {
            const name = item.querySelector('.item-name').textContent.trim();
            // 嘗試獲取 item-format，如果不存在則設為空字串，以應對沒有格式的商品
            const formatElement = item.querySelector('.item-format');
            const format = formatElement ? formatElement.textContent.trim() : '';

            const image = item.querySelector('img').getAttribute('src');
            const itemPriceElement = item.querySelector('.item-price');
            // 原始價格從 data-original-price 獲取，而不是 data-price
            const originalPrice = parseFloat(itemPriceElement.dataset.originalPrice);
            const quantityInput = item.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);

            totalQuantity += quantity;
            const itemTotal = originalPrice * quantity;
            subtotal += itemTotal;

            // 更新每個商品旁邊的小計顯示
            itemPriceElement.textContent = `$${itemTotal}元`;

            // 將更新後的商品資訊添加到 currentCartItems
            currentCartItems.push({
                name: name,
                format: format,
                quantity: quantity,
                price: originalPrice, // 這裡存儲原始單價
                image: image
            });
        });

        const shipping = 80; // 假設運費固定為 80
        const grandTotal = subtotal + shipping;

        document.getElementById('total-quantity').textContent = totalQuantity;
        document.getElementById('subtotal').textContent = `$${subtotal}元`;
        document.getElementById('shipping').textContent = `$${shipping}元`; // 確保運費顯示正確
        document.getElementById('grand-total').textContent = `$${grandTotal}元`;

        // 將更新後的 cartItems 存回 localStorage
        localStorage.setItem('cart', JSON.stringify(currentCartItems));
        // 同時也更新總計資訊，供下一頁使用
        localStorage.setItem('totalQuantity', totalQuantity);
        localStorage.setItem('subtotal', subtotal);
        localStorage.setItem('grandTotal', grandTotal);
    }

    // 輔助函數：綁定商品數量加減和刪除按鈕的事件
    function bindProductItemEvents() {
        const items = document.querySelectorAll('#product-list > .product-item');

        items.forEach(item => {
            const input = item.querySelector('.quantity-input');
            const plusBtn = item.querySelector('.plus-btn');
            const minusBtn = item.querySelector('.minus-btn');
            const deleteBtn = item.querySelector('.delete-btn'); // 獲取刪除按鈕

            // 加號按鈕
            if (plusBtn) {
                plusBtn.onclick = () => { // 使用 onclick 確保只綁定一次，避免重複綁定
                    input.value = parseInt(input.value) + 1;
                    updateCartSummary();
                };
            }

            // 減號按鈕
            if (minusBtn) {
                minusBtn.onclick = () => { // 使用 onclick 確保只綁定一次
                    if (parseInt(input.value) > 1) {
                        input.value = parseInt(input.value) - 1;
                        updateCartSummary();
                    } else if (confirm('確定要從購物車移除此商品嗎？')) { // 如果數量減到1後再減，提示移除
                        item.remove();
                        updateCartSummary(); // 重新計算
                        // 也從 localStorage 中的 cart 數據中移除該商品
                        const nameToRemove = item.querySelector('.item-name').textContent.trim();
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart = cart.filter(product => product.name !== nameToRemove);
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                };
            }

            // 數量輸入框
            if (input) {
                input.oninput = () => { // 使用 oninput 確保只綁定一次
                    let value = parseInt(input.value);
                    if (isNaN(value) || value < 1) {
                        input.value = 1; // 最低為 1
                    }
                    updateCartSummary();
                };
            }

            // 刪除按鈕
            if (deleteBtn) {
                deleteBtn.onclick = () => { // 使用 onclick 確保只綁定一次
                    if (confirm('確定要從購物車移除此商品嗎？')) {
                        item.remove();
                        updateCartSummary(); // 重新計算
                        // 也從 localStorage 中的 cart 數據中移除該商品
                        const nameToRemove = item.querySelector('.item-name').textContent.trim();
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
                        cart = cart.filter(product => product.name !== nameToRemove);
                        localStorage.setItem('cart', JSON.stringify(cart));
                    }
                };
            }
        });
    }

    // 輔助函數：動態渲染購物車商品
    function renderCartItems() {
        const productListContainer = document.getElementById('product-list');
        productListContainer.innerHTML = ''; // 清空現有內容

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            productListContainer.innerHTML = '<p class="text-center py-5">購物車是空的，快去選購吧！</p>';
            // 如果購物車是空的，也要更新總計為0
            document.getElementById('total-quantity').textContent = 0;
            document.getElementById('subtotal').textContent = '$0元';
            document.getElementById('shipping').textContent = '$0元'; // 如果是空購物車，運費也應為0
            document.getElementById('grand-total').textContent = '$0元';
            localStorage.setItem('totalQuantity', 0);
            localStorage.setItem('subtotal', 0);
            localStorage.setItem('grandTotal', 0);
            localStorage.setItem('cart', JSON.stringify([])); // 清空 localStorage 中的 cart 陣列
            return;
        }

        cart.forEach(product => {
            const productItemDiv = document.createElement('div');
            productItemDiv.classList.add('row', 'align-items-center', 'py-3', 'border-bottom', 'product-item');

            // 針對有 format 的商品，名稱顯示為 "商品名稱 (格式)"
            // 針對占卜方案， format 會是 details，我們將其顯示在 item-format 中
            // 判斷是否為加購方案，加購方案的名稱通常包含了所有的描述，format 字段可能不需要額外顯示
            const isDivinationPlan = product.name.includes('加購方案');
            const displayName = product.name;
            const displayFormat = isDivinationPlan ? product.details : (product.format || ''); // 占卜方案使用 details，其他商品使用 format

            productItemDiv.innerHTML = `
                <div class="col-md-6 d-flex align-items-center">
                    <img src="${product.image}" class="img-fluid me-3" style="max-width: 80px;" alt="${product.name}">
                    <div>
                        <p class="h5 mb-1 item-name">${displayName}</p>
                        ${displayFormat ? `<p class="mb-0 item-format">${displayFormat}</p>` : ''}
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-end align-items-center flex-wrap">
                    <div class="d-flex align-items-center me-3">
                        ${isDivinationPlan ?
                            // 如果是加購方案，禁用加減按鈕，數量固定為1
                            `<button class="btn btn-outline-secondary btn-sm minus-btn" type="button" disabled>－</button>
                            <input type="number" class="form-control form-control-sm quantity-input mx-2" value="${product.quantity}"
                                min="1" style="width: 60px;" disabled>
                            <button class="btn btn-outline-secondary btn-sm plus-btn" type="button" disabled>＋</button>`
                            :
                            // 普通商品則啟用加減按鈕
                            `<button class="btn btn-outline-secondary btn-sm minus-btn" type="button">－</button>
                            <input type="number" class="form-control form-control-sm quantity-input mx-2" value="${product.quantity}"
                                min="1" style="width: 60px;">
                            <button class="btn btn-outline-secondary btn-sm plus-btn" type="button">＋</button>`
                        }
                    </div>
                    <div class="col-md-3 d-flex justify-content-start align-items-center flex-wrap">
                        <p class="h5 mb-0 item-price" data-original-price="${product.price}">$${(product.price * product.quantity).toLocaleString()}元</p>
                        <button class="btn btn-danger btn-sm ms-2 delete-btn" type="button">移除</button>
                    </div>
                </div>
            `;
            productListContainer.appendChild(productItemDiv);
        });

        // 渲染完畢後，重新綁定事件
        bindProductItemEvents();
        updateCartSummary(); // 初始化總計
    }

    // 初始化購物車頁面
    renderCartItems();

    // 可以在這裡添加 window.onpageshow 事件監聽，確保從其他頁面返回時也重新渲染
    // 這是為了處理瀏覽器回退按鈕導致頁面從快取載入而不會觸發 DOMContentLoaded 的情況
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) { // 如果頁面是從 bfcache 恢復的
            renderCartItems();
        }
    });

});