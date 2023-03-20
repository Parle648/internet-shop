const preferBlock = document.querySelector("#prefer-block");

const preferProducts = localStorage.preferData.split(";");

function addProduct(product){
    console.log(product)
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

// if(localStorage.pressedKeys != undefined){
//     localStorage.pressedKeys.split(',').splice(1).forEach((item) => {
//         const id = '#' + item;
//         const btn = document.querySelector(id).querySelector('.prod__add-in');
//         btn.removeEventListener('click', addToProd)
    
//         document.querySelector(id).querySelector('.prod__add-in').classList.add('busket_active')
//         document.querySelector(id).querySelector('.prod__add-in').setAttribute('src', 'img/buy-done.svg')
//     })
// }

// const removeBtns = document.querySelectorAll('.comparsion-btn')

// function removeProduct(event){
//     const chooseProductData = {
//         id: event.target.closest('.product-cart').id,
//         img: event.target.closest('.product-cart').firstElementChild.getAttribute('src'),
//         cost: event.target.closest('.product-cart').querySelector('.prod__real-cost').innerText.split(' ')[0],
//         ttl: event.target.closest('.product-cart').querySelector('.prod__name').innerText,
//     }
    
//     localStorage.setItem('pressedComparsion', localStorage.pressedComparsion.replace(`${event.target.closest('.product-cart').id}`, ''))
//     localStorage.setItem('comparsionData', localStorage.comparsionData.replace(JSON.stringify(chooseProductData), ''))
//     console.log(localStorage.comparsionData)
// }

// removeBtns.forEach(function(btn){
//     btn.addEventListener('click', removeProduct)
// })

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
    })
}

preferBtns.forEach(removeCart)

// let removeBtns = prodBlock.children
// console.log(removeBtns)

// function removeProduct(event){
//     const chooseProductData = {
//         id: event.target.closest('.product-cart').id,
//         img: event.target.closest('.product-cart').firstElementChild.getAttribute('src'),
//         cost: event.target.closest('.product-cart').querySelector('.prod__real-cost').innerText.split(' ')[0],
//         ttl: event.target.closest('.product-cart').querySelector('.prod__name').innerText,
//     }
    
//     localStorage.setItem('pressedComparsion', localStorage.pressedComparsion.replace(`${event.target.closest('.product-cart').id}`, ''))
//     localStorage.setItem('comparsionData', localStorage.comparsionData.replace(JSON.stringify(chooseProductData), ''))
//     console.log(localStorage.comparsionData)
// }

// for(let btn of removeBtns){
//     btn.addEventListener('click', removeProduct)
// }