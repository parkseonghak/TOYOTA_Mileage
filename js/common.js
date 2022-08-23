const trgAside = document.querySelector('#trgAside');
const body = document.querySelector('body');
const hidden = 'hidden'

trgAside.addEventListener('click', () => {
    if(body.style.overflow === 'visible'){
        body.classList.add('asideOpen')
    }else{
        body.classList.remove('asideOpen')
    }
})