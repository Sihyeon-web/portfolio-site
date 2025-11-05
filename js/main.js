const controller = new ScrollMagic.Controller();

const spyEls = document.querySelectorAll('section.scroll-spy');
//console.log(spyEls);

spyEls.forEach(function(spyEl){
//console.log(spyEl, index);
  new ScrollMagic.Scene({
  triggerElement: spyEl, // 감시할 장면 추가 및 옵션 지정
  triggerHook: 0.5 //화면의 50% 지점에서 보여짐 여부 감시(0~1 사이 지정)
})
  .setClassToggle(spyEl, 'show') //요소가 화면에 보이면 show 클래스 추가
  .addTo(controller); //컨트롤러에 장면을 할당(필수)
});



const swiper = new Swiper('.project .swiper', {
  // Optional parameters 슬라이드 옵션 지정
  direction: 'horizontal',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.project .swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


//모달창 띄우기
const imageModal = document.querySelector('#imageModal');
const imageModalBtnList = document.querySelectorAll('.btn-modal-image');
const imageCloseBtn = document.querySelector('#imageModal .btn-close');
const imageEl = document.querySelector('#imageModal img');
// Quiz : 이미지 버튼을 누르면 모달창이 뜨고 닫기 버튼을 누르면 닫히도록 만들기

imageModalBtnList.forEach((e)=>{
  e.addEventListener('click', ()=>{
    imageEl.src = e.dataset.imageSrc;
    imageModal.style.display = 'flex';
  })
}
);
imageCloseBtn.addEventListener('click', ()=> {imageModal.style.display='none'})

document.addEventListener('keydown',(e)=>{
  if (e.key === 'Escape') {
    imageModal.style.display='none'
  }
});

imageModal.addEventListener('click', (e)=>{
  console.log(e.target);//현재 이벤트가 발생한 대상 (사용자가 실제로 클릭한 가장 안쪽 요소)
  console.log(e.currentTarget);//이벤트가 바인딩된 요소(여기선 imageModal), this와 동일
  e.stopPropagation();
  if (e.target === e.currentTarget)imageModal.style.display='none';
});

document.querySelector('.this-year').innerHTML = `${new Date().getFullYear()}`;

const toTopEl = document.querySelector('#toTop');

const vis = document.querySelector('.visual');
const twinkle = vis.querySelectorAll('span');
addEventListener('scroll',()=>{
  // console.log(this.window.scrollY);
  if(this.window.scrollY >= 500){
    toTopEl.style = `opacity: 1; transform: translateX(0)`
    twinkle.forEach(el => {el.classList.remove("animate-flash");
    });
  }
  else{
    toTopEl.style = `opacity: 0; transform: translateX(100px)`
    twinkle.forEach(el => {el.classList.add("animate-flash");
    });
  }
});