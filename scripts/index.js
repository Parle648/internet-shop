



const url = 'https://jsonplaceholder.typicode.com/users'

async function getResponce(){
    let responce = await fetch(url)
    let responceArray = await responce.text()
    // console.log(JSON.parse(responceArray))
}

getResponce()

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
let localUrl = 'http://localhost:8000/users';

registrForm.addEventListener('submit', function(event){
    event.preventDefault();

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