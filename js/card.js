
  const container = document.querySelector('.cardContainer')
  const card = document.querySelector('.card')
  const overlay = container.querySelector('.overlay')
  const shine = container.querySelector('.card__shine')

  container.addEventListener('pointermove',(e)=>{
    const r = container.getBoundingClientRect();
    let x = (e.clientX -r.left)/r.width;
    let y = (e.clientY -r.top)/r.height;
    
      console.log('x=',x)
      console.log('y=',y)

    shine.style.setProperty('--mx', `${x*100}%`);
    shine.style.setProperty('--my', `${y*100}%`);
    shine.style.setProperty('--posx', `${(x-0.5)*100}%`);
    shine.style.setProperty('--posy', `${(y-0.5)*100}%`);

    const px = Math.round((x*200)-50);
    overlay.style.backgroundPosition = `${px}% 50%`;
    overlay.style.filter = `opacity(${Math.min(1, Math.max(0, x/2))}) brightness(1.2)`;
  })

  container.addEventListener('pointermove', function(e){
    var x = e.offsetX
    var y = e.offsetY
    var rotateY = 1/5 * x - 20
    var rotateX = -4/30 * y + 20

    overlay.style = `background-position : ${x/5 + y/5}%; filter : opacity(${x/200}) brightness(1.2)`

    card.style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })

  
  container.addEventListener('mouseout', function(){
    overlay.style = 'filter : opacity(0)'
    card.style = 'transform : perspective(350px) rotateY(0deg) rotateX(0deg)'
  })

  container.addEventListener('pointerenter', () => {
    overlay.style.opacity = '0.9';
  });
  container.addEventListener('pointerleave', () => {
    overlay.style.opacity = '0.0';
    overlay.style.backgroundPosition = '100% 50%';
    shine.style.setProperty('--mx', `50%`);
    shine.style.setProperty('--my', `50%`);
    shine.style.setProperty('--posx', `0%`);
    shine.style.setProperty('--posy', `0%`);
  });