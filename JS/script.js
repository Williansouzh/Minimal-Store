//definindo funções que mais vamos usar:
const qs = (e)=>document.querySelector(e);

//manipulando o DOM:
qs('.menu').addEventListener('click', ()=>{
    qs('.navMenu').style.left = '0vw'
})
qs('#closeMenu').addEventListener('click', ()=>{
    qs('.navMenu').style.left = '-100vw'
})


qs('.sacola img').addEventListener('click', ()=>{
    qs('.sacola-itens').style.right = '0'
})

qs('.sacola-title span').addEventListener('click', ()=>{
    qs('.sacola-itens').style.right = '-100vw'
})