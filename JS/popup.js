// Initialization
let begin = document.querySelector('#begin');
let startup = document.querySelector('.startup');
let startupHide = localStorage.getItem('startupHide');
let displayMode = document.querySelector('#displayMode');
let showPercent = document.querySelector('#showPercent');

if (startupHide == 'true') {
  startup.style.visibility = "hidden";
  displayMode.disabled = false;
  showPercent.disabled = false;
}
else {
  startup.style.visibility = "visible";
  displayMode.disabled = true;
  showPercent.disabled = true;
}

function hideStartup() {
  startup.classList.add('startupAnim');
  startup.addEventListener('animationend', startedUp);
}

function startedUp() {
  startup.classList.remove('startupAnim');
  startup.style.visibility = "hidden";
  localStorage.setItem('startupHide', true);
  displayMode.disabled = false;
  showPercent.disabled = false;
}

begin.addEventListener("click", hideStartup);
