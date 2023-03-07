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