window.onload = function () {
    const totalQuantity = localStorage.getItem('totalQuantity');
    const subtotal = localStorage.getItem('subtotal');
    const grandTotal = localStorage.getItem('grandTotal');

    // 檢查資料是否存在
    if (totalQuantity && subtotal && grandTotal) {
        document.getElementById('total-quantity').textContent = totalQuantity;
        document.getElementById('subtotal').textContent = `$${subtotal}元`;
        document.getElementById('shipping').textContent = `$80元`;
        document.getElementById('grand-total').textContent = `$${grandTotal}元`;
    }
};
