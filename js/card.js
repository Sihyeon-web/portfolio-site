
  const container = document.querySelector('.cardContainer')
  const card = document.querySelector('.card')
  const shine = container.querySelector('.card__shine')

  container.addEventListener('mousemove',(e)=>{
    const r = container.getBoundingClientRect();
    let x = e.offsetX
    let y = e.offsetY

    let rotateY = (x - 75) / 3.75;
    let rotateX = -(y - 140) / 7;

const mx = Math.round((e.offsetX / r.width) * 100);
const my = Math.round((e.offsetY / r.height) * 100);

    shine.style.setProperty('--mx', `${mx}%`);
    shine.style.setProperty('--my', `${my}%`);
      // console.log('mx=',`${mx}%`)
      // console.log('my=',`${my}%`)
    shine.style.setProperty('background-position',`${x/5 + y/5}%`);
    card.style.setProperty('--rotX',`${rotateX}deg`);
    card.style.setProperty('--rotY',`${rotateY}deg`);
    shine.style.setProperty('--bgPos',`${(x/5 + y/5)}% ${(x/7 + y/9)}%`);
  })

  
  container.addEventListener('mouseout', function(){
    card.style.transform = 'perspective(350px) rotateY(0deg) rotateX(0deg)';
    shine.style.setProperty('--mx', `50%`);
    shine.style.setProperty('--my', `50%`);
    card.style.setProperty('--rotX',`0`);
    card.style.setProperty('--rotY',`0`);
  })

isAnimating= Boolean();
if (container.classList.contains('animate-visualCard')) {
  container.style.opacity = '1';
  isAnimating = true;
  // container.style.pointerEvents = 'none';
}

container.addEventListener('mouseenter',()=>{
  container.classList.add('card-idle-stop');
})
container.addEventListener('mouseleave',()=>{
  container.classList.remove('card-idle-stop');
})

container.addEventListener('animationend',()=>{
  isAnimating = false;
  container.classList.add('card-idle');
  // container.style.pointerEvents = 'auto';
  // console.log(isAnimating)
})

const divSpy = document.querySelectorAll('div.scroll-spy');
const toggleSM = [];

divSpy.forEach((el)=>{
  const scene = new ScrollMagic.Scene({
    triggerElement: el,
    triggerHook: 0.75,
  })
  .setClassToggle(el, 'showWide')
  .addTo(controller);

  toggleSM.push(scene);
})


container.addEventListener('click',(e)=>{
  e.preventDefault();
  e.stopPropagation()
  if(isAnimating)return
  document.querySelector('.outer').classList.remove('forScroll');
  document.querySelector('.outer').classList.remove('scroll-spy');
  
  toggleSM.forEach(s=> s.enabled(false));

  document.documentElement.classList.add('no-scroll');
  const targetId = e.currentTarget.getAttribute('href');
    setTimeout(() => {
      document.querySelector(targetId).scrollIntoView();
    }, 1000);
  
  makeClone();
  
  aboutClick.style.pointerEvents = 'none';
});

function makeClone(){
  const cardClone = document.createElement('div');
  const cardTarget = container.getBoundingClientRect();
  cardClone.innerHTML = `<img class='profilePic' src="/images/imshi.png">`;
  cardClone.style.position = 'fixed';
  cardClone.style.left = cardTarget.left + 'px';
  cardClone.style.top = cardTarget.top + 'px';
  cardClone.style.width = cardTarget.width + 'px';
  cardClone.style.height = cardTarget.height + 'px';
  cardClone.style.pointerEvents = 'none';
  cardClone.style.boxShadow = '5px 5px 20px 5px rgba(0,0,0,0.1)';
  cardClone.style.zIndex = '9';
  cardClone.style.borderRadius = '12px';
  cardClone.classList.add('clone');
  
  document.body.appendChild(cardClone);
  container.style.visibility = 'hidden';
  // console.log(container.style.opacity)
  cardMove();
}

function cardMove(){
  setTimeout(() => {
  document.documentElement.classList.remove('no-scroll');
  }, 5000);
  const clone = document.querySelector('.clone')
  setTimeout(() => {
    clone.style.transform = 'translateX(-10vw)';
    clone.style.transition = '1s';
  }, 1000);
  setTimeout(()=>{
    const cardGoal = document.querySelector('.about > .outer > .beforeC');
    const goalPos = cardGoal.getBoundingClientRect();
    const curPos = clone.getBoundingClientRect();

    const x = goalPos.left - curPos.left;
    const y = goalPos.top - curPos.top;
    clone.style.transform = `translate(calc(-10vw + ${x}px), ${y}px)`;

    container.style.visibility = 'visible';
    
  }, 2000)
  setTimeout(() => {
    clone.remove();
    cardExtend();
  }, 3000);
}

function cardExtend(){
  const outbC = document.querySelector('.outer .beforeC')
  // outbC.style.visibility = 'visible';
  outbC.classList.add('extend');
  outbC.classList.add('see');
  setTimeout(() => {
    letsMoveImg()
  }, 1000);
    setTimeout(() => {
      document.querySelector('.beforeC__img img').classList.remove('letsMove');
    }, 5000);
  setTimeout(() => {
    outbC.classList.remove('see');
    
    toggleSM.forEach(s => s.enabled(true));
    controller.update(true);
    setTimeout(() => {
      outbC.classList.remove('extend');

      document.querySelector('.outer').classList.add('forScroll');
      document.querySelector('.outer').classList.add('scroll-spy');
      aboutClick.style.pointerEvents = 'auto';
    }, 5000);
  }, 3000);
};


function letsMoveImg(){
    return new Promise((resolve)=>{
    const beforeCImg= document.querySelector('.beforeC__img img')
    const curPosCard= beforeCImg.offsetParent.getBoundingClientRect();
    const aboutImg = document.querySelector('.about__img img').getBoundingClientRect();

    const left = aboutImg.left - curPosCard.left;
    const top = aboutImg.top - curPosCard.top;
    
    beforeCImg.style.transition = '2s';
    beforeCImg.style.setProperty('--left', `${left}px`);
    beforeCImg.style.setProperty('--top', `${top}px`);
    // beforeCImg.style.setProperty('--left', `${aboutImg.left}px`);
    // beforeCImg.style.setProperty('--top', `${aboutImg.top}px`);
    beforeCImg.style.setProperty('--width', `${aboutImg.width}px`);
    beforeCImg.style.setProperty('--height', `${aboutImg.height}px`);

    setTimeout(() => {
    beforeCImg.classList.add('letsMove');
    }, 800);

    beforeCImg.style.pointerEvents = 'none';

    beforeCImg.addEventListener('transitionend', () => resolve());
  })
};




