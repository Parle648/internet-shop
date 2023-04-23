const renderCarts = new Promise((resolve) => {
    fetch('https://test-api-second-try.onrender.com/productCarts')
    .then(request => request.text())
    .then(data => resolve(JSON.parse(data)))
})
renderCarts.then(data => {
    const cartWrapper = document.querySelector('.product-wrapper');
    let appendcontain = ``
    data.forEach((cart) => {
        appendcontain += `
        <div class="product-cart" id="${cart.id}" data-charactec="${cart.attribute}">
            <img src="img/prod-img.jpg" alt="" class="prod__img">
            <h2 class="prod__class">${cart.type}</h2>
            <h2 class="prod__name">${cart.ttl}</h2>
            <img src="img/rating.svg" alt="" class="prod__rating">
            <h2 class="prod__cost-trought-line">${cart.trueLineCost} ₽</h2>
            <span class="prod__cost-block">
            <div class="">
                <h2 class="prod__real-cost">${cart.realCost} ₽</h2>
                <span class="prod__coupon"><span class="prod__percent">20%</span>  — 1 000 ₽</span>
            </div>
            <div class="">
                <img src="img/Vector-2.svg" alt="" class="prod__user-api prefer-btn">
                <img src="img/Vector-1.svg" alt="" class="prod__user-api comparsion-btn">
            </div>
            </span>
            <span class="prod__btns-block">
            <button class="prod__order">Купить в 1 клик</button>
            <img src="img/shop-cart.svg" alt="" class="prod__add-in">
            </span>
        </div>
    `
    })
    cartWrapper.innerHTML = appendcontain;
})

const filterHeader = document.querySelector('.filter__header');
const filterBody = document.querySelector('.filter__body');
let biggest = document.querySelector('#biggest');
const carts = document.querySelector('.product-wrapper');

filterHeader.addEventListener('click', toggleSelect)
filterBody.addEventListener('click', sortCarts)

function toggleSelect(event){
    filterBody.classList.toggle('filter__body_active')
}
function sortCarts(event){
    if(event.currentTarget.firstElementChild.getAttribute('id') === 'lower'){
        let arraySort = [...carts.children].sort((a, b) => {
            return +a.querySelector('.prod__real-cost').innerText.split(' ')[0] - (+b.querySelector('.prod__real-cost').innerText.split(' ')[0])
        })
        carts.innerHTML = ''
        for(let elem of arraySort){
            carts.appendChild(elem)
        }
        changeFilter('biggest')
        toggleSelect()
    } else {
        let arraySort = [...carts.children].sort((a, b) => {
            return +b.querySelector('.prod__real-cost').innerText.split(' ')[0] - (+a.querySelector('.prod__real-cost').innerText.split(' ')[0])
        })
        carts.innerHTML = ''
        for(let elem of arraySort){
            carts.appendChild(elem)
        }
        changeFilter('lower')
        toggleSelect()
    }
}
function changeFilter(value){
    filterBody.firstElementChild.setAttribute('id', value)
    buffer = filterBody.firstElementChild.innerHTML
    filterBody.firstElementChild.innerHTML = filterHeader.firstElementChild.innerHTML
    filterHeader.firstElementChild.innerHTML = buffer
}

const selectHeader = document.querySelectorAll('.cost-select__header');

selectHeader.forEach((header) => {
    header.addEventListener('click', toggleNextElem)
})

function toggleNextElem(event){
    event.currentTarget.nextElementSibling.classList.toggle('cost-select__body_active')
    event.currentTarget.lastElementChild.classList.toggle('select__arrow_active')
}

const applyBtn = document.querySelector('.apply')
const filterInputs = document.querySelectorAll('.light__input')
let deleteFilters;

applyBtn.addEventListener('click', applyFilters)

function applyFilters(){
    const filtersArr = []
    filterInputs.forEach((item) => {
        if (item.checked){
            filtersArr.push(item.getAttribute('id'))
        }
    });
    if(filtersArr.length === 0){
        [...carts.children].forEach((cart) => {
            cart.classList.remove('cart_unvisible')
        });
    } else {
        [...carts.children].forEach((cart) => {
            cart.classList.remove('cart_visible')
            cart.classList.add('cart_unvisible')
        });
    }
    filtersArr.forEach((property) => {
        [...carts.children].forEach((cart) => {
            if(cart.getAttribute('data-charactec') != null && cart.getAttribute('data-charactec').includes(property)){
                cart.classList.add('cart_visible')
            }
        })
    })

    document.querySelector('.choose-filter-wrapper').innerHTML = ``

    filterInputs.forEach((input) => {
        if ( input.checked ) {
            const filterText = input.parentNode.lastElementChild.innerText;
            const filterType = input.closest('.cost-select').firstElementChild.firstElementChild.innerText

            const appendFilter = `
                <span class="choose-filter" data-id="${input.id}">${filterType}: ${filterText} <img src="img/x.svg" alt="" class="x"></span>
            `;

            document.querySelector('.choose-filter-wrapper').innerHTML += appendFilter;
        }
    })

    deleteFilters = document.querySelectorAll('.x');
    console.log(deleteFilters);
    deleteFilters.forEach((i) => {
        i.addEventListener('click', () => {
            const id = i.parentNode.getAttribute('data-id')
            const inputs = document.querySelectorAll('.light__input');
            inputs.forEach((input) => {
                if (input.id === id) {
                    input.checked = false;

                    applyFilters()
                }
            })
        });
    })
}


const sliderTarget = document.querySelector('.one');
const sliderTargetTwo = document.querySelector('.two')
const middle = document.querySelector('.cost__choise')

sliderTarget.onmousedown = function(event){

    sliderTarget.style.position = 'absolute';

    sliderTarget.parentNode.style.position = 'relative';

    sliderPosition(event.pageX, event.pageY);

    function sliderPosition(x){
        // console.log(x)
        // console.log( (x - document.querySelector('.wrapper').offsetLeft / 2 ))
        sliderTarget.style.left = (x - document.querySelector('.wrapper').offsetLeft) - 12 + 'px'
        document.querySelector('.one-unvisible').style.width = (x - document.querySelector('.wrapper').offsetLeft) - 12 + 'px'
        // increace.value =  Math.round((sliderTarget.style.left.slice(0, sliderTarget.style.left.length -2) / 300) * 250000)
        // if(increace.value <= 500){
        //     increace.value = 500
        // }
    };
    
    function MouseMove(event){
        
        sliderPosition(event.pageX, event.pageY);

        if(sliderTarget.style.left.slice(0, sliderTarget.style.left.length -2) > 275){
            sliderTarget.style.left ='275px';
        } else if(sliderTarget.style.left.slice(0, sliderTarget.style.left.length -2) <= 0){
            sliderTarget.style.left ='0px'
        }

    };

    document.addEventListener('mousemove', MouseMove)

    document.onmouseup = function(){

        document.removeEventListener('mousemove', MouseMove);

        sliderTarget.removeEventListener('mousemove', MouseMove);
    }
};

sliderTargetTwo.onmousedown = function(event){

    sliderTargetTwo.style.position = 'absolute';

    sliderTargetTwo.parentNode.style.position = 'relative';

    sliderPosition(event.pageX, event.pageY);

    function sliderPosition(x){
        sliderTargetTwo.style.left = (x - document.querySelector('.wrapper').offsetLeft) + 5 + 'px'
        document.querySelector('.two-unvisible').style.width = (290 - (x - document.querySelector('.wrapper').offsetLeft) - 25) + 'px'
        // hight.value =  Math.round((sliderTargetTwo.style.left.slice(0, sliderTarget.style.left.length -2) / 300) * 250000)
        // if(hight.value >= 250000){
        //     hight.value = 250000
        // }
        // else if(hight.value <= 500){
        //     hight.value = 500
        // }
    };

    function MouseMove(event){

        sliderPosition(event.pageX, event.pageY);

        if(sliderTargetTwo.style.left.slice(0, sliderTargetTwo.style.left.length -2) > 275){

            sliderTargetTwo.style.left ='275px';
        } else if(sliderTargetTwo.style.left.slice(0, sliderTargetTwo.style.left.length -2) <= 0){

            sliderTargetTwo.style.left ='0px'
        }

    };

    document.addEventListener('mousemove', MouseMove)

    document.onmouseup = function(){

        document.removeEventListener('mousemove', MouseMove);

        sliderTargetTwo.removeEventListener('mousemove', MouseMove);
    }
};