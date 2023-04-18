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
        <div class="product-cart" id="${cart.id}">
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

    //add to corzina

    const prodBtn = document.querySelector('#prod-btn');
    const cartsBuyBtns = document.querySelectorAll('.prod__add-in');
    const buyCounter = document.querySelector('.buy-counter');

    if(localStorage.pressedKeys != undefined){
        localStorage.pressedKeys.split(',').splice(1).forEach((item) => {
            const id = '#' + item;
            const btn = document.querySelector(id).querySelector('.prod__add-in');
            btn.removeEventListener('click', addToProd)
        
            document.querySelector(id).querySelector('.prod__add-in').classList.add('busket_active')
            document.querySelector(id).querySelector('.prod__add-in').setAttribute('src', 'img/buy-done.svg')
        })
    }
    console.log(document.querySelectorAll('.busket_active').length)
    if(document.querySelectorAll('.busket_active').length == 0) {
        buyCounter.classList.add('display')
        console.log(4)
    } else {
        buyCounter.classList.remove('display')
        buyCounter.innerText = document.querySelectorAll('.busket_active').length
    }
    
    function addToProd(event){
        event.currentTarget.classList.add('busket_active')
        event.currentTarget.setAttribute('src', 'img/buy-done.svg')
        
        const parentBlock = event.currentTarget.parentNode.parentNode;
        
        const prodData = {
            img: parentBlock.firstElementChild.getAttribute('src'),
            cost: parentBlock.querySelector('.prod__real-cost').innerText.split(' ')[0],
            ttl: parentBlock.querySelector('.prod__name').innerText,
            id: parentBlock.getAttribute('id'),
        }
        
        localStorage.setItem('pressedKeys', localStorage.pressedKeys + ',' + prodData.id)
        
        if(localStorage.product != undefined && localStorage.product != ''){
            localStorage.setItem("product", localStorage.product + ";" + JSON.stringify(prodData))
        } else if (localStorage.product === '' || localStorage.product === undefined) {
            localStorage.setItem("product", JSON.stringify(prodData))
        }

        if(document.querySelectorAll('.busket_active').length === 0) {
            buyCounter.classList.add('display')
            console.timeLog(43)
        } else {
            buyCounter.classList.remove('display')
            buyCounter.innerText = document.querySelectorAll('.busket_active').length
        }

        event.currentTarget.removeEventListener('click', addToProd)
    };

    cartsBuyBtns.forEach(function (btn) {
        btn.addEventListener('click', addToProd);
    })
    buyCounter.innerText = document.querySelectorAll('.busket_active').length

    // prefer logic

    const preferBtn = document.querySelectorAll('.prefer-btn');
    const preferCount = document.querySelector('.prefer-counter');

    if(localStorage.pressedPrefer != undefined){
        localStorage.pressedPrefer.split(',').splice(1).forEach((item) => {
            if(item != ''){
                const id = '#' + item;
                const btn = document.querySelector(id).querySelector('.prefer-btn');
                btn.removeEventListener('click', addToProd)
                
                document.querySelector(id).querySelector('.prefer-btn').setAttribute('src', 'img/hard-active.svg')
                document.querySelector(id).querySelector('.prefer-btn').classList.add('prefer-active')
            }
        })
    }
    const preferBtns = document.querySelectorAll('.prefer-active')
    if(preferBtns.length !== 0) {
        preferCount.innerText = preferBtns.length;
        preferCount.classList.remove('display')
    } else {
        preferCount.classList.add('display')
    }
    
    function addToPrefer(event){
        event.currentTarget.setAttribute('src', 'img/hard-active.svg')
        event.currentTarget.classList.add('prefer-active')

        const chooseProduct = event.currentTarget.closest('.product-cart');

        const chooseProductData = {
            id: event.currentTarget.closest('.product-cart').id,
            img: chooseProduct.firstElementChild.getAttribute('src'),
            cost: chooseProduct.querySelector('.prod__real-cost').innerText.split(' ')[0],
            ttl: chooseProduct.querySelector('.prod__name').innerText,
        }

        localStorage.setItem('pressedPrefer', localStorage.pressedPrefer + ',' + chooseProductData.id)
        
        if(localStorage.preferData != undefined && localStorage.preferData != ''){
            localStorage.setItem("preferData", localStorage.preferData + ";" + JSON.stringify(chooseProductData))
        } else if (localStorage.preferData === '' || localStorage.preferData === undefined) {
            localStorage.setItem("preferData", JSON.stringify(chooseProductData))
        }
        const preferBtns = document.querySelectorAll('.prefer-active')
        preferCount.innerText = preferBtns.length;
        preferCount.classList.remove('display')
        event.currentTarget.removeEventListener('click', addToProd)
    }

    preferBtn.forEach((btn) => {
        btn.addEventListener('click', addToPrefer)
    })

    // comparsion

    const comprsBtn = document.querySelectorAll('.comparsion-btn');

    if(document.querySelectorAll('.comparsion_active').length === 0) {
        buyCounter.classList.add('display')
    } else {
        buyCounter.classList.remove('display')
        buyCounter.innerText = document.querySelectorAll('.busket_active').length
    }

    function addToComparsion(event){
        const parent = event.currentTarget.closest('.product-cart');
        event

        const chooseProductData = {
            id: parent.id,
            img: parent.firstElementChild.getAttribute('src'),
            cost: parent.querySelector('.prod__real-cost').innerText.split(' ')[0],
            ttl: parent.querySelector('.prod__name').innerText,
        }

        localStorage.setItem("pressedComparsion", localStorage.pressedComparsion + ';' + parent.id)
        localStorage.setItem("comparsionData", localStorage.comparsionData + ';' + JSON.stringify(chooseProductData))
        event.currentTarget.removeEventListener('click', addToComparsion)
        event.currentTarget.setAttribute('click', addToComparsion)
        event.currentTarget.setAttribute('src', 'img/comparsion-active.svg')
        event.currentTarget.classList.add('comparsion_active')
    }

    comprsBtn.forEach((btn) => {
        btn.addEventListener('click', addToComparsion)
    })

    if(localStorage.pressedComparsion != undefined){
        localStorage.pressedComparsion.split(';').splice(1).forEach((item) => {
            if(item != ''){
                const id = '#' + item;
                const btn = document.querySelector(id).querySelector('.comparsion-btn');
                btn.removeEventListener('click', addToComparsion)
            
                document.querySelector(id).querySelector('.comparsion-btn').setAttribute('src', 'img/comparsion-active.svg')
            }
        })
    }
})

// registration / enter
const form = document.querySelector('.form-wrapper');
const enterBtn = document.querySelector('.header__enter');
const closeFormBtn = document.querySelectorAll('.form__close-img');
const registrLink = document.querySelector('.registr-link');
const alreadyRegistr = document.querySelector('.already-registr');

enterBtn.onclick = toggleForm;
closeFormBtn.forEach(toggleForm)

registrLink.onclick = openRegistrForm;
alreadyRegistr.onclick = openRegistrForm;

function toggleForm(){
    form.classList.toggle('display');
};

function openRegistrForm(event){
    event.preventDefault();
    document.querySelector('#enter-form').classList.toggle('display')
    document.querySelector('#registr-form').classList.toggle('display')
};

const makeRegistr = document.querySelector('#make-registr');
const registrForm = document.querySelector('#enter-form');
let localUrl = 'https://test-api-second-try.onrender.com/users';

// validation

const formInputs = document.getElementById('enter-form').querySelectorAll('.registr__input');

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

formInputs.forEach(checkInput)

//

registrForm.addEventListener('submit', function(event){
    event.preventDefault();
    let key = false;
    formInputs.forEach(function (input) {
        if (!input.closest('.input_valid')) {
            key = false
        } else {
            key = true
        };

        if (key) {
            let formData = {
                name: registrForm.name.value,
                mail: registrForm.mail.value,
                number: registrForm.number.value,
                pass: registrForm.pass.value,
            }
        
            async function makeRequest(method, url, data){
                await fetch(localUrl, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => {
                })
                .catch(error => {
                })
                .then(response => {
                    window.location.href = 'personal-cabinet.html';
                });
        
            }
            
            makeRequest();
        }
    })

})

const enterForm = document.getElementById('registr-form')

enterForm.addEventListener('submit', function(event){
    event.preventDefault();

    async function getUsersData(){
        await fetch(localUrl)
            .then((res) => res.text())
            .then((res) => {
                const users = JSON.parse(res);

                for(let key in users){
                    if(users[key].mail === enterForm.mail.value && users[key].pass === enterForm.pass.value){
                        window.location.href = 'personal-cabinet.html';
                    }
                }
            })
    };

    getUsersData();
})

const slider = document.querySelector('.slider');
const sliderImages = document.querySelector('.slider-images');
const sliderImagesCount = document.querySelectorAll('.slider-images img').length;
let currentIndex = 0;
let interval;

function startSlider() {
  interval = setInterval(() => {
    currentIndex++;
    if (currentIndex > sliderImagesCount - 1) {
      currentIndex = 0;
    }
    sliderImages.style.transform = `translateX(-${currentIndex * 800}px)`;
  }, 3500);
}

function stopSlider() {
  clearInterval(interval);
}

slider.addEventListener('mouseenter', stopSlider);
slider.addEventListener('mouseleave', startSlider);

startSlider();

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'ru',
      includedLanguages: 'uk', // языки, на которые будет доступен перевод
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // стиль переводчика
    }, 'google_translate_element');
  }