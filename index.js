const arr = [1, 2, 3, 5, 69, [2], [342]]

console.log(arr.some((item) => item == '69'))
console.log(arr.reduce((result, item) => result + item))
console.log(arr.every((item) => item == '69'))
console.log(arr.flat())

const block = document.querySelector('.flex')
const btn = document.querySelector('.up')
const btn2 = document.querySelector('.down')

btn.onclick = sortUp;
btn2.onclick = sortDown;

function sortUp(){
    const arr = [...block.children]
    arr.sort((a, b) => {
        console.log(a.dataset.cost)
        return a.dataset.cost - b.dataset.cost
    })
    block.innerHTML = ''

    for (let div of arr){
        block.appendChild(div)
    }
}

function sortDown(){
    const arr = [...block.children]
    arr.sort((a, b) => {
        console.log(a.dataset.cost)
        return b.dataset.cost - a.dataset.cost
    })
    block.innerHTML = ''

    for (let div of arr){
        block.appendChild(div)
    }
}