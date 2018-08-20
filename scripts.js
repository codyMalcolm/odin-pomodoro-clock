const timeControls = document.querySelectorAll('.time-control')

timeControls.forEach(c => {
  c.addEventListener('click', updateTime)
})

function updateTime() {
  const phase = this.dataset.phase;
  let phaseTime;
  if (phase === "session") {
    phaseTime = document.querySelector('.session-time');
  }
  if (phase === "break") {
    phaseTime = document.querySelector('.break-time');
  }
  const value = parseInt(phaseTime.textContent) + parseInt(this.dataset.val);

  if (value > 0 && value <=60) phaseTime.textContent = value;
}
