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

//add to corzina

const prodBtn = document.querySelector('#prod-btn');
const cartsBuyBtns = document.querySelectorAll('.prod__add-in');

if(localStorage.pressedKeys != undefined){
    localStorage.pressedKeys.split(',').splice(1).forEach((item) => {
        const id = '#' + item;
        const btn = document.querySelector(id).querySelector('.prod__add-in');
        btn.removeEventListener('click', addToProd)
    
        document.querySelector(id).querySelector('.prod__add-in').classList.add('busket_active')
        document.querySelector(id).querySelector('.prod__add-in').setAttribute('src', 'img/buy-done.svg')
    })
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
    event.currentTarget.removeEventListener('click', addToProd)
};

cartsBuyBtns.forEach(function (btn) {
    btn.addEventListener('click', addToProd);
})

// prefer logic

const preferBtn = document.querySelectorAll('.prefer-btn');

if(localStorage.pressedPrefer != undefined){
    localStorage.pressedPrefer.split(',').splice(1).forEach((item) => {
        if(item != ''){
            const id = '#' + item;
            const btn = document.querySelector(id).querySelector('.prefer-btn');
            btn.removeEventListener('click', addToProd)
        
            document.querySelector(id).querySelector('.prefer-btn').setAttribute('src', 'img/hard-active.svg')
        }
    })
}

function addToPrefer(event){
    event.currentTarget.setAttribute('src', 'img/hard-active.svg')

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
    event.currentTarget.removeEventListener('click', addToProd)
}

preferBtn.forEach((btn) => {
    btn.addEventListener('click', addToPrefer)
})

// comparsion

const comprsBtn = document.querySelectorAll('.comparsion-btn');


function addToComparsion(event){
    const parent = event.currentTarget.closest('.product-cart');

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