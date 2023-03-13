



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