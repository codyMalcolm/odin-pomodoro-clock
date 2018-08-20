const timeControls = document.querySelectorAll('.time-control');
const playButton = document.querySelector('.play');
const stopButton = document.querySelector('.stop');
const pauseButton = document.querySelector('.pause');
const resetButton = document.querySelector('.reset');
const time = document.querySelector('.time');
const sessionTime = document.querySelector('.session-time');
const breakTime = document.querySelector('.break-time');
const beep = document.querySelector('audio');

let sessionSeconds;
let breakSeconds;
let timer;

function enableTimeControls() {
  timeControls.forEach(c => {
    c.addEventListener('click', updateTime)
  });
}
function disableTimeControls() {
  timeControls.forEach(c => {
    c.removeEventListener('click', updateTime)
  });
}

enableTimeControls();

playButton.addEventListener('click', play);
stopButton.addEventListener('click', stop);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

function updateTime() {
  const phase = this.dataset.phase;
  let phaseTime;
  if (phase === "session") {
    phaseTime = sessionTime;
  }
  if (phase === "break") {
    phaseTime = breakTime;
  }
  const value = parseInt(phaseTime.textContent) + parseInt(this.dataset.val);

  if (value > 0 && value <=60) phaseTime.textContent = value;
  time.textContent = sessionTime.textContent + ':00';
}

function play() {
  function parseSeconds(minutes) {
    return minutes * 60;
  }

  time.textContent = `${sessionTime.textContent}:00`;
  time.style.color = 'white';
  disableTimeControls();

  sessionSeconds = sessionSeconds || parseSeconds(parseInt(sessionTime.textContent));
  breakSeconds = breakSeconds || parseSeconds(parseInt(breakTime.textContent));
  timer = setInterval(runClock, 1000);
}

function pause() {
  clearInterval(timer);
}

function reset() {
  enableTimeControls();
  clearInterval(timer);
  sessionSeconds = 0;
  breakSeconds = 0;
  sessionTime.textContent = '25';
  breakTime.textContent = '5';
  time.textContent = '25:00';
  time.style.color = 'white';
}

function stop() {
  enableTimeControls();
  clearInterval(timer);
  sessionSeconds = 0;
  breakSeconds = 0;
  time.textContent = `${sessionTime.textContent}:00`;
  time.style.color = 'white';
}

function runClock() {
  function parseTime(seconds) {
    return ('0' + Math.floor(seconds / 60)).slice(-2) + ':' + ('0' + seconds % 60).slice(-2);
  }
  if (sessionSeconds > 0) {
    if (sessionSeconds <=3) beep.play();
    if (sessionSeconds > 60) {
      time.style.color = 'green';
    } else if (sessionSeconds > 15) {
      time.style.color = 'yellow';
    } else {
      time.style.color = 'red';
    }
    document.querySelector('.phase').textContent = 'Session';
    sessionSeconds--;
    time.textContent = parseTime(sessionSeconds);
  } else if (breakSeconds > 0){
    if (breakSeconds <=3) beep.play();
    if (breakSeconds > 60) {
      time.style.color = 'green';
    } else if (breakSeconds > 15) {
      time.style.color = 'yellow';
    } else {
      time.style.color = 'red';
    }
    document.querySelector('.phase').textContent = 'Break';
    breakSeconds--;
    time.textContent = parseTime(breakSeconds);
  } else {
    clearInterval(timer);
    play();
  }
}
