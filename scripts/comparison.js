const prodBlock = document.querySelector('.product-wrapper');
const comparsionData = localStorage.comparsionData.split(';').splice(1)

comparsionData.forEach(product => {
    if(product != '') {
        prodBlock.innerHTML += `
        <div class="product-cart" id="${JSON.parse(product).id}" style="position: relative">
            <img src="${JSON.parse(product).img}" alt="" class="prod__img">
            <a class="prod__delete">Удалить из списка</a>
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
                    <img src="img/Vector-2.svg" alt="" class="prod__user-api prefer-btn">
                    <img src="img/comparsion-active.svg" alt="" class="prod__user-api">
                </div>
            </span>
            <span class="prod__btns-block">
                <button class="prod__order">Купить в 1 клик</button>
                <img src="img/shop-cart.svg" alt="" class="prod__add-in">
            </span>
        </div>
        `
    }
})

//

const url = 'https://test-api-second-try.onrender.com/productSpecifications'
const comparsionBlock = document.querySelector('.comparsion-body')

async function getData(){
    await fetch(url)
    .then(res => {
        return res.text()
    })
    .then(res => {

        // console.log(document.querySelector('.product-wrapper').innerHTML === ' ')

        if ( document.querySelector('.product-wrapper').innerHTML === ' ' ) {
            document.querySelector('.footer').classList.add('active_footer')
        } else {
            document.querySelector('.footer').classList.remove('active_footer')
        }

        const prodCpecific = JSON.parse(res);
        let choose = []
        let keys = []


        function getChoose(arr){
            prodCpecific.forEach((item) => {
                comparsionData.forEach((elem => {
                    if (elem != '') {
                        if(item.id === JSON.parse(elem).id ){
                            arr.push(item)
                        }
                    }
                }))
            })
        }

        function getKeys(arr, result){
            arr.forEach((item) => {
                result.push(Object.keys(item))
            })
        }
    
        getChoose(choose);
        getKeys(choose, keys);

        const compParent = document.querySelector('.comparsion-body');

        for (let type of (new Set(keys.flat()))){
            let appentItem = `
            <div class="comparsion-row">
            <div class="row__ttl">${type}</div>
            `;
            for(let objItem of choose){
                Object.entries(objItem).forEach((arr) => {
                    if(arr[0] == type){
                        appentItem += `
                        <div class="row__specification">${arr[1]}</div>
                        `
                    }
                })
            };
            appentItem += `
            </div>
            `;
            compParent.innerHTML += appentItem;
        }
        let rows = document.querySelectorAll('.comparsion-row');
        
        rows[0].innerHTML = ''

        for (let i = 0; i <= 6; i++) {
            if(i % 2) {
                rows[i].classList.add('lightt-blue')
            } else {
                rows[i].classList.add('white')
            }
        }

        for(let j = 1; j < rows.length; j++) {
            for(let i = 1; i < 4; i++) {
                if (rows[j].children[i].innerText != rows[j].children[1].innerText) {
                    rows[j].classList.add('lightorange')
                }
            }
        }

        const renderDifference = document.querySelector('.light__input')

        renderDifference.onclick = () => {
            if(renderDifference.checked) {
                rows.forEach((item) => {
                    if(!item.closest('.lightorange')){
                        item.style.display="none"
                    }
                })
            } else {
                rows.forEach((item) => {
                    item.style.display="flex"
                })
            }
        }

    })
}

getData();

let removeBtns = prodBlock.children

function removeProduct(event){
    const chooseProductData = {
        id: event.target.closest('.product-cart').id,
        img: event.target.closest('.product-cart').firstElementChild.getAttribute('src'),
        cost: event.target.closest('.product-cart').querySelector('.prod__real-cost').innerText.split(' ')[0],
        ttl: event.target.closest('.product-cart').querySelector('.prod__name').innerText,
    }
    
    localStorage.setItem('pressedComparsion', localStorage.pressedComparsion.replace(`${event.target.closest('.product-cart').id}`, ''))
    localStorage.setItem('comparsionData', localStorage.comparsionData.replace(JSON.stringify(chooseProductData), ''))

    location.reload()
}

for(let btn of removeBtns) {
    btn.addEventListener('click', removeProduct)
}

// console.log(document.querySelector('.product-wrapper').innerHTML)

// if ( document.querySelector('.product-wrapper').innerHTML = '' ) {
//     document.querySelector('.footer').classList.add('active_footer')
// } else {
//     document.querySelector('.footer').classList.remove('active_footer')
// }