const trgAside = document.querySelector('#trgAside');
const body = document.querySelector('body');
const hidden = 'hidden'

trgAside.addEventListener('click', () => {
    if(body.className !== 'asideOpen'){
        body.classList.add('asideOpen')
    }else if(body.className == 'asideOpen'){
        body.classList.remove('asideOpen')
    }
})