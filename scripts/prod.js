const addProducts = localStorage.product.split(";");

function addProduct(product){
    if(product != ''){
        document.querySelector('.buy-block').innerHTML += `
            <div class="buy__product" id="">
            <img src="${JSON.parse(product).img}" alt="" class="buy__img">
            <h2 class="buy__inner-ttl">${JSON.parse(product).ttl}</h2>
            <div class="buy__counter">
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

addProducts.forEach(addProduct);

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
};

deleteProdBtn.forEach((btn) => {
    btn.addEventListener('click', removeProduct)
})