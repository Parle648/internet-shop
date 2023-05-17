const preferBlock = document.querySelector("#prefer-block");

const preferProducts = localStorage.preferData.split(";");

function addProduct(product){
    if(product != ''){
        preferBlock.innerHTML += `
            <div class="product-cart" id="${JSON.parse(product).id}">
                <img src="${JSON.parse(product).img}" alt="" class="prod__img">
                <h2 class="prod__class">Сигвеи</h2>
                <h2 class="prod__name">${JSON.parse(product).ttl}</h2>
                <img src="img/rating.svg" alt="" class="prod__rating">
                <h2 class="prod__cost-trought-line">5400 ₽</h2>
                <span class="prod__cost-block">
                    <div class="">
                        <h2 class="prod__real-cost">${JSON.parse(product).cost}</h2>
                        <span class="prod__coupon"><span class="prod__percent">20%</span>  — 1 000 ₽</span>
                    </div>
                    <div class="">
                        <img src="img/hard-active.svg" alt="" class="prod__user-api prefer-btn">
                        <img src="img/Vector-1.svg" alt="" class="prod__user-api">
                    </div>
                </span>
                <span class="prod__btns-block">
                    <button class="prod__order">Купить в 1 клик</button>
                    <img src="img/shop-cart.svg" alt="" class="prod__add-in">
                </span>
            </div>
        `
    }
}

preferProducts.forEach(addProduct);

const preferBtns = document.querySelectorAll('.prefer-btn');

function removeCart(btn){
    btn.addEventListener('click', function(){
        const parentBlock = btn.closest('.product-cart');

        localStorage.setItem('pressedPrefer', localStorage.pressedPrefer.replace(parentBlock.id, ''))

        const chooseProductData = {
            id: parentBlock.id,
            img: parentBlock.firstElementChild.getAttribute('src'),
            cost: parentBlock.querySelector('.prod__real-cost').innerText.split(' ')[0],
            ttl: parentBlock.querySelector('.prod__name').innerText,
        }

        localStorage.setItem('preferData', localStorage.preferData.replace(JSON.stringify(chooseProductData), ''))

        preferBlock.removeChild(parentBlock)
        location.reload();
    })
}

preferBtns.forEach(removeCart)

if (document.querySelector('.product-wrapper').innerHTML === '') {
    document.querySelector('.footer').classList.add('active_footer')
} else {
    document.querySelector('.footer').classList.remove('active_footer')
}