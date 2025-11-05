
  const container = document.querySelector('.cardContainer')
  const card = document.querySelector('.card')
  // const overlay = container.querySelector('.overlay')
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

isAnimating= true;
if (container.classList.contains('animate-visualCard')) container.style.opacity = '1';
container.addEventListener('animationend',()=>{
  isAnimating = false;
  console.log(isAnimating)
})



container.addEventListener('click',(e)=>{
  e.preventDefault();
  document.documentElement.classList.add('no-scroll');
  const targetId = e.currentTarget.getAttribute('href');
    setTimeout(() => {
      document.querySelector(targetId).scrollIntoView();
    }, 1000);
  e.stopPropagation()
  container.style.transform='rotateY(180deg)';

  const cardClone = document.createElement('div');
  const cardTarget = container.getBoundingClientRect();
  cardClone.innerHTML = `<img class='profilePic' src="/images/제목 없음-1.png">`;
  cardClone.style.position = 'fixed';
  cardClone.style.left = cardTarget.left + 'px';
  cardClone.style.top = cardTarget.top + 'px';
  cardClone.style.width = cardTarget.width + 'px';
  cardClone.style.height = cardTarget.height + 'px';
  cardClone.style.pointerEvents = 'none';
  cardClone.style.zIndex = '9';
  cardClone.classList.add('clone');
  
  document.body.appendChild(cardClone);
  
  container.style.opacity = '0';
  console.log(container.style.opacity)
  cardExtend();
});

function cardExtend(){
  setTimeout(() => {
  document.documentElement.classList.remove('no-scroll');
  }, 2000);
  const clone = document.querySelector('.clone')
  setTimeout(() => {
    clone.style.transform = 'translateX(-50vw)';
    clone.style.transition = '0.5s';
  }, 1000);
  setTimeout(()=>{
    clone.style.width = '30vw';
    clone.style.height = '30vh';
    clone.style.margin = `0 10vh 0 10vh`;
  }, 2000)
  container.style.opacity = '1';
  container.style.transform='rotateY(0)';
}