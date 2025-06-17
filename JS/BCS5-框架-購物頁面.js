// JavaScript for BCS5-框架-購物頁面.js

document.addEventListener('DOMContentLoaded', () => {
    // 導覽列平滑滾動功能 (保持不變)
    const aboutUsLink = document.querySelector('a[href="#about-us"]');
    const aboutUsSection = document.getElementById('about-us');
    if (aboutUsLink && aboutUsSection) {
        aboutUsLink.addEventListener('click', (e) => {
            e.preventDefault();
            aboutUsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const productIntroLink = document.querySelector('a[href="#product-introduction"]');
    const productIntroductionSection = document.getElementById('product-introduction');
    if (productIntroLink && productIntroductionSection) {
        productIntroLink.addEventListener('click', (e) => {
            e.preventDefault();
            productIntroductionSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const startJourneyButton = document.querySelector('a[href="#divination-plans"]');
    const divinationPlansSection = document.getElementById('divination-plans');
    if (startJourneyButton && divinationPlansSection) {
        startJourneyButton.addEventListener('click', (e) => {
            e.preventDefault();
            divinationPlansSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const viewProductsButton = document.querySelector('a[href="#featured-products"]');
    const featuredProductsSection = document.getElementById('featured-products');
    if (viewProductsButton && featuredProductsSection) {
        viewProductsButton.addEventListener('click', (e) => {
            e.preventDefault();
            featuredProductsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 新增：處理「了解更多」按鈕的平滑滾動 (指向八項商品列表)
    const learnMoreButtons = document.querySelectorAll('a[href="#eight-products-list"]');
    const eightProductsListSection = document.getElementById('eight-products-list');

    if (learnMoreButtons.length > 0 && eightProductsListSection) {
        learnMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                eightProductsListSection.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // --- 加入購物車功能 (統一處理) ---

    // 輔助函數：將商品加入購物車
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // 檢查商品是否已在購物車中 (根據名稱和 format 判斷唯一性)
        // 對於占卜方案，只需檢查名稱，因為它是獨特的
        // 對於一般商品，同時檢查名稱和 format (例如不同容量的香膏)
        const isDivinationPlan = product.name.includes('加購方案:'); // 檢查是否為占卜方案
        const existingProductIndex = cart.findIndex(item => {
            if (isDivinationPlan) {
                return item.name === product.name; // 占卜方案只比較名稱
            } else if (product.format || item.format) {
                return item.name === product.name && item.format === product.format;
            }
            return item.name === product.name;
        });

        if (existingProductIndex > -1) {
            // 如果商品已存在
            if (isDivinationPlan) {
                alert(`${product.name} 已在購物車中，此方案限購一次。`); // 占卜方案提示限購
            } else {
                cart[existingProductIndex].quantity += product.quantity || 1; // 普通商品則增加數量
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name}${product.format ? ' (' + product.format + ')' : ''} 數量已更新！`);
            }
        } else {
            // 如果商品不存在，則加入購物車
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name}${product.format ? ' (' + product.format + ')' : ''} 已加入購物車！`);
        }
        console.log('當前購物車內容:', cart);
    }

    // 1. 處理四張小卡的「加入購物車」按鈕 (靈草誌・魔法選品下方)
    const smallCardAddtoCartButtons = document.querySelectorAll('#featured-products .card .btn-primary');
    smallCardAddtoCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.card');
            if (card) {
                const productName = card.querySelector('.card-title').textContent.trim();
                const productPriceTextElement = card.querySelector('.card-body > p:nth-of-type(3)');
                const productPrice = parseFloat(productPriceTextElement.textContent.replace('$', '').replace(',', ''));
                const productImage = card.querySelector('img').src;
                const productFormat = card.querySelector('.text-primary') ? card.querySelector('.text-primary').textContent.trim() : '';

                const product = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1,
                    format: productFormat
                };
                addToCart(product);
            }
        });
    });

    // 2. 處理月之夢香膏的「立即購買」按鈕
    const lunaDreamBalmButton = document.querySelector('.row.py-5.d-flex.justify-content-between .btn.btn-primary.btn-lg');
    if (lunaDreamBalmButton) {
        lunaDreamBalmButton.addEventListener('click', (e) => {
            e.preventDefault();

            const productName = document.querySelector('.col-lg-7 .h1').textContent.trim();
            const productPriceText = document.querySelector('.col.h3 p').textContent.trim();
            const productPrice = parseFloat(productPriceText.replace('$', '').replace(',', ''));
            const productImage = document.querySelector('.col-lg-5.d-flex.align-items-center img').src;

            let selectedVersion = '';
            const versionOriginal = document.getElementById('versionOriginal');
            const versionLavender = document.getElementById('versionLavender');

            if (versionOriginal && versionOriginal.checked) {
                selectedVersion = versionOriginal.nextElementSibling.title;
            } else if (versionLavender && versionLavender.checked) {
                selectedVersion = versionLavender.nextElementSibling.title;
            }

            const selectedCapacityElement = document.querySelector('.form-select');
            const selectedCapacity = selectedCapacityElement ? selectedCapacityElement.value : '15ml';

            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1,
                format: `${selectedVersion}, ${selectedCapacity}`
            };
            addToCart(product);
        });
    }

    // 3. 處理八項商品列表的「加入購物車」按鈕
    const eightProductAddtoCartButtons = document.querySelectorAll('.container.my-5:not(#featured-products) .col-lg-3.mx-auto.mb-4 .card-body .btn-primary');

    eightProductAddtoCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const cardBody = e.target.closest('.card-body');
            if (cardBody) {
                const productName = cardBody.querySelector('.card-title').textContent.trim();
                const productPriceText = cardBody.querySelector('.card-text:nth-of-type(2)').textContent.trim();
                const productPrice = parseFloat(productPriceText.replace('$', '').replace(',', ''));
                const productImage = cardBody.closest('.col-lg-3').querySelector('img').src;
                const productFormat = cardBody.querySelector('.card-text:first-of-type').textContent.trim();

                const product = {
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1,
                    format: productFormat
                };
                addToCart(product);
            }
        });
    });

    // 4. 處理加購會員占卜方案的「下一步」按鈕
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
                    name: `加購方案: ${planName}`, // 這裡將方案名稱作為主名稱，用於唯一性判斷
                    details: `${divinationMethod}, ${spiritCount}`,
                    price: fee,
                    quantity: 1, // 數量固定為 1
                    image: './BCS5-img/首頁圖示/命運靈視.png' // 預設圖片
                };

                // 調用統一的 addToCart 函數，它現在會處理占卜方案的唯一性
                addToCart(divinationPlan);

            } else {
                alert('請選擇一個占卜方案。');
            }
        });
    }
});