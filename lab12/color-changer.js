// color-changer.js - Activity 5
const select = document.getElementById('colorSelect');
const changeBtn = document.getElementById('changeColor');
const resetBtn = document.getElementById('resetColor');

changeBtn.addEventListener('click', () => {
  const color = select.value || '#FFF';
  // smooth transition:
  document.documentElement.style.transition = 'background 0.45s ease';
  document.body.style.background = color;
  console.log('Activity5: background changed to', color);
});

resetBtn.addEventListener('click', () => {
  document.body.style.background = 'linear-gradient(180deg, #FFFDE7 0%, #FFF7C6 100%)';
  console.log('Activity5: background reset');
});