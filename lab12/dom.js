// dom.js - Activity 1
const titleEl = document.getElementById('page-title');
const noteEl = document.getElementById('page-note');
const changeBtn = document.getElementById('change-btn');
const resetBtn = document.getElementById('reset-btn');

changeBtn.addEventListener('click', () => {
  titleEl.innerText = "Hello! I'm Joses D. Gidayawan!";
  noteEl.innerText = "Text changed with getElementById() and innerText.";
  console.log("Activity1: title changed to:", titleEl.innerText);
});

resetBtn.addEventListener('click', () => {
  titleEl.innerText = "Welcome, Joses!";
  noteEl.innerText = "Hello! Click the button to change the heading using DOM selection.";
  console.log("Activity1: reset to original title");
});