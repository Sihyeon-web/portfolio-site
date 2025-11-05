document.addEventListener('click', e => {
  // 중심 광선
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

