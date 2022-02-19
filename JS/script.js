let modalKey;
let cart = []
let modalQt = 1;
//definindo funções que mais vamos usar:
const qs = (e)=>document.querySelector(e);
const qsa = (e)=>document.querySelectorAll(e);

//manipulando o DOM:
qs('.menu').addEventListener('click', ()=>{
    qs('.navMenu').style.left = '0vw'
})
qs('#closeMenu').addEventListener('click', ()=>{
    qs('.navMenu').style.left = '-100vw'
})
qs('.sacola img').addEventListener('click', ()=>{
    qs('.sacola-itens').style.right = '0'
    updateCart();
})

qs('.sacola-title span').addEventListener('click', ()=>{
    qs('.sacola-itens').style.right = '-100vw';
})

//mostrando os produtos na tela 
let n = 0;
produtosJson.map((item, index)=>{
    let produtoItem = qs('.produtoItem').cloneNode(true);
    let gridArea;
    
    n=n+1;
    gridArea = `img${n}`;
    produtoItem.classList.add(gridArea);

    produtoItem.setAttribute('data-key', index)
    produtoItem.querySelector('.produtoItem h4').innerHTML = item.name;
    produtoItem.querySelector('.produtoItem img').src = item.img;
    produtoItem.querySelector('.produtoItem span').innerHTML = `$${item.price.toFixed(2)}`;

    
    produtoItem.querySelector('.produtoItem img').addEventListener('click', (e)=>{
        modalQt = 1;
        document.querySelector('.modal-container').style.display = 'flex';
        qs('.modal-container').style.opacity = 1;
        document.querySelector(' .modal-container #closemodal').addEventListener('click', closemodal);
        let key = e.target.closest('.produtoItem').getAttribute('data-key');
        modalKey = key;
        qs('.modal-color .color.select').classList.remove('select');
        qs('.modal-color .color').classList.add('select');

        qs('.modal-desc h2').innerHTML = produtosJson[key].name;
        qs('.modal-desc p').innerHTML = produtosJson[key].desc;
        qs('.modal-img img').src = produtosJson[key].img;
        qs('.modal-desc .qt-n').innerHTML = modalQt;

        document.querySelectorAll('.color').forEach((color, colorIndex)=>{
            color.addEventListener('click', ()=>{
                qs('.modal-color .color.select').classList.remove('select');
                color.classList.add('select')
            })
        })

    })
        produtoItem.querySelector('.produtoItem img').addEventListener('mouseover', ()=>{
        produtoItem.querySelector('.produtoItem img').src = item.hover;
        })
        produtoItem.querySelector('.produtoItem img').addEventListener('mouseleave', ()=>{
        produtoItem.querySelector('.produtoItem img').src = item.img;
        })
    qs('.produtos-area').append(produtoItem);
})
qs('.modal-desc .qt-m').addEventListener('click', ()=>{
    modalQt++;
    qs('.modal-desc .qt-n').innerHTML = modalQt;
    console.log(modalQt)
})
qs('.modal-desc .qt-l').addEventListener('click', ()=>{
    if(modalQt>1){
        modalQt--;
        qs('.modal-desc .qt-n').innerHTML = modalQt;
    }
})
qs('.addCart-btn').addEventListener('click', ()=>{
    closemodal();
    cart.push({
        name:produtosJson[modalKey].name,
        price:produtosJson[modalKey].price,
        img:produtosJson[modalKey].img,
        qt: modalQt,
    })
    updateCart();
})
function updateCart(){
    let subtotal = 0;
    

    qs('.produtos-sacola-area').innerHTML = '';
    for(let i in cart) {
        let cartItem = qs('.items-models .cartItem').cloneNode(true);
        cartItem.querySelector('.item-name').innerHTML = cart[i].name;
        cartItem.querySelector('img').src = cart[i].img;
        cartItem.querySelector('.modal-qt #sacolaId').innerHTML = cart[i].qt;
        qs('.produtos-sacola-area').append(cartItem);

        
        
        cartItem.querySelector('.modal-qt .qtmenos').addEventListener('click', ()=>{
            if(cart[i].qt>1){
                cart[i].qt--;
            } else {
                cart.splice(i, 1)
            }
            updateCart()
        })
        cartItem.querySelector('.modal-qt .qtmais').addEventListener('click', ()=>{
            cart[i].qt++;
            updateCart()
        })
        subtotal += cart[i].price * cart[i].qt;
        console.log(subtotal)
    }
    let desconto = subtotal * 0.1;
    let total = subtotal - desconto;
    qs('.priceItems .total span').innerHTML = `$${total.toFixed(2)}`;
    qs('.priceItems .desconto span').innerHTML = `$${desconto.toFixed(2)}`;
    qs('.priceItems .subtotal span').innerHTML = `$${subtotal.toFixed(2)}`;
}
function closemodal() {
qs('.modal-container').style.opacity = 0;
setTimeout(() => {
    document.querySelector('.modal-container').style.display = 'none';
}, 500);
}

