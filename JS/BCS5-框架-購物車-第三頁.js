// BCS5-框架-購物車-第三頁.js
window.onload = function () {
    // 1. 載入購物車總計資訊
    const totalQuantity = localStorage.getItem('totalQuantity') || 0; // 如果是 null 設為 0
    const subtotal = localStorage.getItem('subtotal') || 0; // 如果是 null 設為 0
    const grandTotal = localStorage.getItem('grandTotal') || 0; // 如果是 null 設為 0

    // 確保 localStorage 有值才更新顯示，並進行格式化
    document.getElementById('total-quantity').textContent = totalQuantity;
    document.getElementById('subtotal').textContent = `$${parseFloat(subtotal).toLocaleString()}元`;
    // 運費判斷：如果總數量為 0，則運費也為 0
    document.getElementById('shipping').textContent = totalQuantity === '0' ? `$0元` : `$80元`;
    document.getElementById('grand-total').textContent = `$${parseFloat(grandTotal).toLocaleString()}元`;

    // 2. 表單驗證與儲存寄送資訊
    const customerForm = document.querySelector('form');
    customerForm.addEventListener('submit', function (event) {
        // 如果表單驗證失敗，阻止提交
        if (!customerForm.checkValidity()) {
            event.preventDefault(); // 阻止默認提交行為
            event.stopPropagation(); // 阻止事件冒泡
        }

        // 添加 'was-validated' 類別以顯示 Bootstrap 的驗證訊息
        customerForm.classList.add('was-validated');

        // 如果表單驗證通過，則儲存資料
        if (customerForm.checkValidity()) {
            const customerInfo = {
                name: document.getElementById('costumer-name').value, // 修正 ID 為 costumer-name
                phone: document.getElementById('customer-phone').value,
                email: document.getElementById('customer-email').value,
                city: document.getElementById('customer-city').value,
                zipcode: document.getElementById('customer-zipcode').value,
                address: document.getElementById('customer-address').value
            };
            localStorage.setItem('customerInfo', JSON.stringify(customerInfo)); // 將使用者資訊儲存到 localStorage
        }
    });

    // 3. 載入已儲存的寄送資訊 (如果有的話)
    const savedCustomerInfo = JSON.parse(localStorage.getItem('customerInfo'));
    if (savedCustomerInfo) {
        document.getElementById('costumer-name').value = savedCustomerInfo.name || ''; // 修正 ID 為 costumer-name
        document.getElementById('customer-phone').value = savedCustomerInfo.phone || '';
        document.getElementById('customer-email').value = savedCustomerInfo.email || '';
        document.getElementById('customer-city').value = savedCustomerInfo.city || '';
        document.getElementById('customer-zipcode').value = savedCustomerInfo.zipcode || '';
        document.getElementById('customer-address').value = savedCustomerInfo.address || '';
    }
};