const timeControls = document.querySelectorAll('.time-control');
const playButton = document.querySelector('.play');
const stopButton = document.querySelector('.stop');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const time = document.querySelector('.time');

let sessionSeconds;
let breakSeconds;
let timer;

timeControls.forEach(c => {
  c.addEventListener('click', updateTime)
});

playButton.addEventListener('click', play);
stopButton.addEventListener('click', stop);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

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
  time.textContent = document.querySelector('.session-time').textContent + ':00';
}

function play() {
  function parseSeconds(minutes) {
    return minutes * 60;
  }

  sessionSeconds = sessionSeconds || parseSeconds(parseInt(document.querySelector('.session-time').textContent));
  breakSeconds = breakSeconds || parseSeconds(parseInt(document.querySelector('.break-time').textContent));

  runClock();
}

function pause() {
  clearTimeout(timer);
}

function reset() {
  clearTimeout(timer);
  sessionSeconds = 0;
  breakSeconds = 0;
  document.querySelector('.session-time').textContent = '25';
  document.querySelector('.break-time').textContent = '5';
  time.textContent = '25:00';
  time.style.color = 'white';
}

function stop() {
  clearTimeout(timer);
  sessionSeconds = 0;
  breakSeconds = 0;
  time.textContent = `${document.querySelector('.session-time').textContent}:00`;
  time.style.color = 'white';
}

function runClock() {
  function parseTime(seconds) {
    return ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + seconds % 60).slice(-2);
  }
  if (sessionSeconds > 0) {
    time.style.color = 'red';
    if (sessionSeconds > 15) time.style.color = 'yellow';
    if (sessionSeconds > 60) time.style.color = 'green';
    document.querySelector('.phase').textContent = 'Session';
    sessionSeconds--;
    time.textContent = parseTime(sessionSeconds);
  } else if (breakSeconds > 0){
    time.style.color = 'red';
    if (breakSeconds > 15) time.style.color = 'yellow';
    if (breakSeconds > 60) time.style.color = 'green';
    document.querySelector('.phase').textContent = 'Break';
    breakSeconds--;
    time.textContent = parseTime(breakSeconds);
  } else {
    clearTimeout(timer);
    play();
  }
  timer = setTimeout(runClock, 200);
}
