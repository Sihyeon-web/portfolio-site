
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
      console.log('mx=',`${mx}%`)
      console.log('my=',`${my}%`)
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

