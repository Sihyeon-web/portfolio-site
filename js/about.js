const aboutClick = document.querySelector('.about__img')

aboutClick.addEventListener('click', async (e)=>{
  e.preventDefault();
  e.stopPropagation();

  document.documentElement.classList.add('no-scroll');
  const targetId = e.currentTarget.getAttribute('href');


  document.querySelector('.beforeC').classList.add('extend');

  await new Promise(r => setTimeout(r,1000));
  console.log('letsMoveImg is Go!')
  await letsMoveImg(); 
  console.log('letsMoveImg is Done!')



  await new Promise(r => setTimeout(r,3200));
  document.querySelector('.outer .inner').classList.remove('see');
  document.querySelector('.beforeC').classList.add('see');
  await new Promise(r => setTimeout(r,1000));
  console.log('letsShrink is Go!')
  await letsShrink();
  makeClone2();



  await new Promise(r => setTimeout(r,1000));
  document.documentElement.classList.remove('no-scroll');
  document.querySelector(targetId).scrollIntoView();
});


function letsShrink(){
  return new Promise((resolve)=>{
  document.querySelector('.outer').classList.remove('showWide');
  document.querySelector('.outer').classList.remove('scroll-spy');
  document.querySelector('.outer').classList.remove('forScroll');

  console.log('letsShrink!')
  document.querySelector('.outer .beforeC').classList.add('shrinked');
  document.querySelector('.outer .beforeC').classList.remove('extend');
  document.querySelector('.beforeC__img img').classList.remove('letsMove');
  setTimeout(() => {
    resolve();
  }, 5000);

//   let beforeCDone = false;
//   let imgDone = false;

//   function checkBoth() {
//     if(beforeCDone && imgDone){
//       resolve();
//     }
//   }

//   document.querySelector('.outer .beforeC').addEventListener('transitioned', () => {
//     beforeCDone = true;
//     checkBoth();
//   });
//   document.querySelector('.beforeC__img img').addEventListener('transitionend', () => {
//     imgDone = true;
//     checkBoth();
//   });
})
};




function makeClone2(){
  const cardClone = document.createElement('div');
  const outerB = document.querySelector('.outer .beforeC');
  const cardTarget = outerB.getBoundingClientRect();
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
  outerB.style.visibility = 'hidden';
  cardMove2();
  console.log('cardMove is Go')
}

function cardMove2(){
  setTimeout(() => {
  document.documentElement.classList.remove('no-scroll');
  }, 5000);
  const clone = document.querySelector('.clone')
  setTimeout(() => {
    clone.style.transform = 'translateX(50%)';
    clone.style.transition = '1s';
  }, 1000);

  // setTimeout(()=>{
  //   const cardGoal = document.querySelector('.about > .outer > .beforeC');
  //   const goalPos = cardGoal.getBoundingClientRect();
  //   const curPos = clone.getBoundingClientRect();

  //   const x = goalPos.left - curPos.left;
  //   const y = goalPos.top - curPos.top;
  //   clone.style.transform = `translate(calc(-10vw + ${x}px), ${y}px)`;

  //   container.style.visibility = 'visible';
    
  // }, 2000)
  setTimeout(() => {
    clone.remove();


    document.querySelector('.outer').classList.add('.showWide');
    document.querySelector('.outer').classList.add('.scroll-spy');
    document.querySelector('.outer').classList.add('.forScroll');
    // cardExtend();
  }, 3000);
}