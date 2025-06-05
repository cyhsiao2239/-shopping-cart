window.onload = function () {
    const totalQuantity = localStorage.getItem('totalQuantity');
    const subtotal = localStorage.getItem('subtotal');
    const grandTotal = localStorage.getItem('grandTotal');

    if (totalQuantity && subtotal && grandTotal) {
        document.getElementById('total-quantity').textContent = totalQuantity;
        document.getElementById('subtotal').textContent = `$${subtotal}元`;
        document.getElementById('shipping').textContent = `$80元`;
        document.getElementById('grand-total').textContent = `$${grandTotal}元`;
    }

    // 表單驗證與儲存寄送資訊
    document.querySelector('form').addEventListener('submit', function (event) {
        const form = event.target;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const customerInfo = {
            name: document.getElementById('customer-name').value,
            phone: document.getElementById('customer-phone').value,
            email: document.getElementById('customer-email').value,
            city: document.getElementById('customer-city').value,
            zipcode: document.getElementById('customer-zipcode').value,
            address: document.getElementById('customer-address').value
        };

        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    });
};
