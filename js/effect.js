document.addEventListener('click', e => {
  // 중심 광선
  e.stopPropagation
  const burst = document.createElement('div');
  burst.classList.add('burst');
  burst.style.left = `${e.pageX}px`;
  burst.style.top = `${e.pageY}px`;
  document.body.appendChild(burst);
  burst.addEventListener('animationend', () => burst.remove());

  // 여러 개의 스파클
const sparkleCount = 5; // 스파클 개수

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    // 랜덤 방향과 거리
    const angle = Math.random() * 360 + 'deg';
    const distanceX = (Math.random() - 0.5) * 50; // x축 이동량
    const distanceY = (Math.random() - 0.5) * 50; // y축 이동량

    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    sparkle.style.setProperty('--angle', angle);
    sparkle.style.setProperty('--dx', distanceX + 'px');
    sparkle.style.setProperty('--dy', distanceY + 'px');

    document.body.appendChild(sparkle);

    // 애니메이션 종료 후 제거
    sparkle.addEventListener('animationend', () => {
      sparkle.remove();
    });
  }
});





// 카드 중심 좌표 유틸
function centerOf(el){
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width/2, y: r.top + r.height/2, r };
}

// 착지 순간 스파클/버스트 생성 (당신이 이미 만든 sparkle/burst CSS 재사용)
function spawnLandingFx(el){
  const { x, y } = centerOf(el);
  const impactY = y;

  // 링(버스트)
  const burst = document.createElement('div');
  burst.className = 'burst';
  burst.style.left = x + 'px';
  burst.style.top  = impactY + 'px';
  document.body.appendChild(burst);
  burst.addEventListener('animationend', () => burst.remove());

  // 스파클 몇 개
  const count = 5;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top  = impactY + 'px';
    // 착지 ‘충격’이라서 주변으로 고르게 퍼지게
    const theta = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 35; // 40~75px
    sparkle.style.setProperty('--dx', Math.cos(theta) * dist + 'px');
    sparkle.style.setProperty('--dy', Math.sin(theta) * dist + 'px');
    sparkle.style.setProperty('--angle', theta + 'rad');

    document.body.appendChild(sparkle);
    sparkle.addEventListener('animationend', () => sparkle.remove());
  }
}
// 바운스 1사이클이 끝날 때마다(=착지 순간) 호출
document.querySelector('.cardContainer').addEventListener('animationiteration', (e) => {
  if (e.animationName === 'cardBounce') {
    setTimeout(()=>{
    spawnLandingFx(document.querySelector('.cardContainer'));
    }, 2100);
  }
});
document.querySelector('.cardContainer').addEventListener('animationstart', (e) => {
  if (e.animationName === 'cardBounce') {
    setTimeout(()=>{
    spawnLandingFx(document.querySelector('.cardContainer'));
    }, 2100);
  }
});