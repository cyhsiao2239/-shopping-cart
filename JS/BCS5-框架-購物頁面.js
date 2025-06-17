// JavaScript for BCS5-框架-購物頁面.html

document.addEventListener('DOMContentLoaded', () => {
    // 1. 導覽列平滑滾動到「關於我們」區塊
    const aboutUsLink = document.querySelector('a[href="#about-us"]');
    const aboutUsSection = document.getElementById('about-us');

    if (aboutUsLink && aboutUsSection) {
        aboutUsLink.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止預設的錨點跳轉行為
            aboutUsSection.scrollIntoView({
                behavior: 'smooth' // 平滑滾動
            });
        });
    }

    // 2. 導覽列平滑滾動到「產品介紹」區塊
    const productIntroLink = document.querySelector('a[href="#product-introduction"]');
    const productIntroductionSection = document.getElementById('product-introduction');

    if (productIntroLink && productIntroductionSection) {
        productIntroLink.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止預設的錨點跳轉行為
            productIntroductionSection.scrollIntoView({
                behavior: 'smooth' // 平滑滾動
            });
        });
    }

    // 3. 加入購物車功能 (此部分需要與購物車頁面聯動，我們先在本地存儲模擬)
    const addToCartButtons = document.querySelectorAll('.card .btn-primary');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止按鈕的預設行為

            const card = e.target.closest('.card');
            if (card) {
                const productName = card.querySelector('.card-title').textContent;
                const productPriceText = card.querySelector('.card-text:nth-of-type(2)').textContent;
                const productPrice = parseFloat(productPriceText.replace('$', '').replace(',', '')); // 移除$和,並轉換為數字
                const productImage = card.querySelector('img').src;

                const product = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1 // 預設數量為1
                };

                // 從 localStorage 獲取現有的購物車商品
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // 檢查商品是否已在購物車中
                const existingProductIndex = cart.findIndex(item => item.name === product.name);

                if (existingProductIndex > -1) {
                    // 如果商品已存在，則增加數量
                    cart[existingProductIndex].quantity += 1;
                } else {
                    // 否則，將新商品添加到購物車
                    cart.push(product);
                }

                // 將更新後的購物車存回 localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                alert(`${productName} 已加入購物車！`);
                console.log('當前購物車內容:', cart);
            }
        });
    });

    // 處理「月之夢香膏」的立即購買按鈕 (此為單獨的商品區塊)
    const buyNowButton = document.querySelector('.row.py-5.d-flex.justify-content-between .btn-primary.btn-lg');
    if (buyNowButton) {
        buyNowButton.addEventListener('click', (e) => {
            e.preventDefault();

            // 獲取月之夢香膏的資訊
            const productName = document.querySelector('.h1').textContent.trim();
            const productPriceText = document.querySelector('.row.py-5.d-flex.justify-content-between .h3 p').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', '').replace(',', ''));
            const productImage = document.querySelector('.col-lg-5.d-flex.align-items-center img').src;

            // 獲取選擇的版本 (經典月之夢版 或 加強薰衣草版)
            let selectedVersion = '';
            const versionOriginal = document.getElementById('versionOriginal');
            const versionLavender = document.getElementById('versionLavender');

            if (versionOriginal && versionOriginal.checked) {
                selectedVersion = versionOriginal.nextElementSibling.title;
            } else if (versionLavender && versionLavender.checked) {
                selectedVersion = versionLavender.nextElementSibling.title;
            }

            // 獲取選擇的容量
            const selectedCapacity = document.querySelector('.form-select').value;

            const product = {
                name: `${productName} (${selectedVersion}, ${selectedCapacity})`, // 加入版本和容量到名稱
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductIndex = cart.findIndex(item => item.name === product.name);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            alert(`${product.name} 已加入購物車！`);
            console.log('當前購物車內容:', cart);
        });
    }

    // 處理加購會員占卜方案的「下一步」按鈕
    const nextStepButton = document.querySelector('.row.d-flex.d-flex.justify-content-center .btn-primary');
    if (nextStepButton) {
        nextStepButton.addEventListener('click', (e) => {
            e.preventDefault();

            const selectedRadio = document.querySelector('input[name="flexRadioDefault"]:checked');
            if (selectedRadio) {
                const row = selectedRadio.closest('tr');
                const planName = row.querySelector('td:nth-child(1)').textContent.trim();
                const divinationMethod = row.querySelector('td:nth-child(2)').textContent.trim();
                const spiritCount = row.querySelector('td:nth-child(3)').textContent.trim();
                const feeText = row.querySelector('td:nth-child(4)').textContent.trim();
                const fee = (feeText === 'Free') ? 0 : parseFloat(feeText.replace('$', ''));

                const divinationPlan = {
                    name: `加購方案: ${planName}`,
                    details: `${divinationMethod}, ${spiritCount}`,
                    price: fee,
                    quantity: 1 // 占卜方案通常只加購一次
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                // 檢查是否已存在相同的占卜方案，如果存在則不重複添加
                const existingPlanIndex = cart.findIndex(item => item.name === divinationPlan.name);
                if (existingPlanIndex === -1) {
                    cart.push(divinationPlan);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`加購方案 "${planName}" 已加入購物車！`);
                    console.log('當前購物車內容:', cart);
                } else {
                    alert(`加購方案 "${planName}" 已在購物車中。`);
                }
            } else {
                alert('請選擇一個占卜方案。');
            }
        });
    }
});

// 在 `<body>` 標籤中，為「關於我們」和「產品介紹」的內容區塊添加 ID
// <div class="row py-5 text-center" id="about-us">
// ...
// <div class="row py-4" id="product-introduction">