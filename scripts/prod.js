const addProducts = localStorage.product.split(";");

function addProduct(product){
    if(product != ''){
        document.querySelector('.buy-block').innerHTML += `
            <div class="buy__product" id="">
                <img src="${JSON.parse(product).img}" alt="" class="buy__img">
                <h2 class="buy__inner-ttl">${JSON.parse(product).ttl}</h2>
                <div class="buy__counter" data-marker="large-counter">
                    <span class="minus">-</span>
                    <div class="buy__count">1</div>
                    <span class="plus">+</span>
                </div>
                <div class="buy__cost">
                    <h2 class="buy__trousght-cost">5400 ₽</h2>
                    <h2 class="buy__real-cost">${JSON.parse(product).cost}</h2>
                </div>
                <img src="img/delete-prod.svg" alt="" class="buy__delete">
            </div>
        `
    }
}

addProducts.forEach(addProduct)

// count products

const plus = document.querySelectorAll('.plus');
const minus = document.querySelectorAll('.minus');
const prodCount = document.querySelector('.product-count');
const allProdCost = document.querySelector('.product-price');
const costs = document.querySelectorAll('.buy__real-cost')
let buyCount = document.querySelectorAll('.buy__count');

function changeCountProducts() {
    count = 0;
    buyCount.forEach((item) => count += +item.innerHTML)
    prodCount.innerText = count;
}

function countAmount(item) {
    amount = 0
    costs.forEach(cost => amount += +cost.innerHTML)
    item.innerText = amount
}

countAmount(allProdCost)
countAmount(document.querySelector('.finaly-price'))

changeCountProducts();

// functions 

function incrementValue(item) {
    const prodCost = +item.parentNode.nextElementSibling.lastElementChild.innerText
    
    item.addEventListener('click', (event) => {
        let count = event.currentTarget.previousElementSibling;
        let costBlock = event.currentTarget.parentNode.nextElementSibling.lastElementChild;
        count.innerText = +count.innerText + 1 
        
        costBlock.innerText = prodCost * +count.innerText;
        
        changeCountProducts();
        countAmount(allProdCost);
        countAmount(document.querySelector('.finaly-price'))
    })
}

function decrementValue(item) {
    const prodCost = +item.parentNode.nextElementSibling.lastElementChild.innerText
    
    item.addEventListener('click', (event) => {
        let count = event.currentTarget.nextElementSibling;
        let costBlock = event.currentTarget.parentNode.nextElementSibling.lastElementChild;
        if(count.innerText != 1) {
            count.innerText = +count.innerText - 1        
        }
        costBlock.innerText = prodCost * +count.innerText;
        
        changeCountProducts();
        countAmount(allProdCost);
        countAmount(document.querySelector('.finaly-price'))
    })
}
//

plus.forEach(incrementValue)
minus.forEach(decrementValue)

//

const deleteProdBtn = document.querySelectorAll('.buy__delete');
const prodBlock = document.querySelector('.buy-block')

function removeProduct(event){
    
    prodBlock.removeChild(event.currentTarget.parentNode);
    const arr = addProducts.filter(item => {
        if(item != '' && JSON.parse(item).cost === event.currentTarget.parentNode.querySelector('.buy__real-cost').innerText){
            localStorage.setItem('pressedKeys', localStorage.pressedKeys.replace(',' + JSON.parse(item).id, ''))
            return item;
        };
    });

    let localSt = localStorage.product;

    if(localStorage.product != ';' || localStorage.product != ''){
        localStorage.setItem("product", localSt.replace(arr[0], ''));
    } else {
        localStorage.removeItem("product");
    };
    location.reload();
};

deleteProdBtn.forEach((btn) => {
    btn.addEventListener('click', removeProduct)
})

//

const nextStepBtn = document.querySelectorAll('.show-next');
const nextStep = document.querySelector('.get-way__content');

nextStepBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        // show next btn
        event.target.classList.add('display')
        let eventNextIndex = Array.from(nextStepBtn).indexOf(event.target) + 1;
        // nextStepBtn[eventNextIndex].classList.remove('display');
        if ( eventNextIndex !== 3 ) {
            nextStepBtn[eventNextIndex].classList.remove('display');
        }

        // show next block
        const nextElement = event.target.nextElementSibling.lastElementChild;
        nextElement.style.display = 'block';
        nextElement.previousElementSibling.style.margin = '0px 0px 44px 0px'
        if ( eventNextIndex === 3 ) {
            nextElement.style.display = 'flex';
            document.querySelector('.make').style.background = '#4878A6'
        }
    })
})

const sendDeliveryData = document.querySelector('#make');
const inputs = document.querySelectorAll('.delivery-text-input');

function checkInput(input) {
    if (input.dataset.regexp) {
        const regexp = new RegExp(input.dataset.regexp);

        input.oninput = () => {
            if (regexp.test(input.value)) {
                input.classList.add('input_valid')
            } else {
                input.classList.remove('input_valid')
            }
        }
    }
}

inputs.forEach(checkInput)
let alreadySend = false;

sendDeliveryData.addEventListener('click', () => {
    let isEmpty = true;
    inputs.forEach((input) => {
        if (input.value === '') {
            alert(`введите данные в поле ${input.previousElementSibling.innerText}`);
            input.classList.add('invalid')
            if(input.placeholder === '') {
                input.placeholder = 'НЕОБХОДИМО ЗАПОЛНИТЬ ДАННОЕ ПОЛЕ'
            }
            isEmpty = false
        }
    })
    if (alreadySend) {
        alert(`ваш заказ уже оформлен`)
    }
    else if (isEmpty) {
        alert(`ваш заказ оформлен`)
        alreadySend = true;
    }
})
