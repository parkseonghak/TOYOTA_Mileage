const trgAside = document.querySelector('#trgAside');
const body = document.querySelector('body');
const hidden = 'hidden'

const bigMenuBtn = document.querySelectorAll('.big_menu_btn')
const closeMenu = document.querySelectorAll('.close_menu')

const confirmBtn = document.querySelector('.confirm')

trgAside.addEventListener('click', () => {
    if(body.className !== 'asideOpen'){
        body.classList.add('asideOpen')
    }else if(body.className == 'asideOpen'){
        body.classList.remove('asideOpen')
        for(let i = 0; i < closeMenu.length; i++){
            closeMenu[i].classList.remove('open')
        }
    }
})


Array.from(closeMenu).forEach((item, i) => {
    bigMenuBtn[i].addEventListener('click', () => {
        if(closeMenu[i].className !== 'open'){
            closeMenu[i].classList.add('open')
            Array.from(closeMenu).filter(el => el !== closeMenu[i]).forEach(el => el.classList.remove('open'))
        }
    })
})

confirmBtn.addEventListener('click', () => {
    body.classList.add('asideOpen')
})



let curPos = 0;
let postion = 0;
let start_x, end_x;
const slideWidth = 613;
const slider = document.querySelector(".slider") 
const sliderItem = document.querySelectorAll('.slider_item')
const benefitItem = document.querySelectorAll('.benefit_item')
    
slider.addEventListener('touchstart', touch_start);
slider.addEventListener('touchend', touch_end);
    
function prev(){
    if(curPos > 0){
      postion += slideWidth;
      slider.style.transform = `translateX(${postion}px)`;
      curPos = curPos - 1;
      for(let i = 0; i < sliderItem.length; i++){
        if(sliderItem[curPos] === sliderItem[i]){
            sliderItem[i].classList.remove('reduction')
            benefitItem[i].classList.remove('benefit')
        }else{

            sliderItem[i].classList.add('reduction')
            benefitItem[i].classList.add('benefit')
        }
      }
    }
}
function next(){
  if(curPos < sliderItem.length-1){
    postion -= slideWidth;
    slider.style.transform = `translateX(${postion}px)`;
    
    curPos = curPos + 1;
    for(let i = 0; i < sliderItem.length; i++){
      if(sliderItem[curPos] === sliderItem[i]){
          sliderItem[i].classList.remove('reduction')
          benefitItem[i].classList.remove('benefit')
      }else{
          sliderItem[i].classList.add('reduction')
          benefitItem[i].classList.add('benefit')
      }
    }
  }
}

function touch_start(event) {
  start_x = event.touches[0].pageX
}

function touch_end(event) {
  end_x = event.changedTouches[0].pageX;
  if(start_x > end_x){
    next();
  }else{
    prev();
  }
}