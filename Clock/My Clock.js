// Exercise 6: Alarm Clock
let timeToRing = 0;
let audio = new Audio(
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
);
let myBell = document.getElementById("r_btn");
let off_alarm = document.getElementById("s_btn");
myBell.addEventListener("click", setAlarm);
off_alarm.addEventListener("click", () => {
  audio.pause();
  timeToRing = 0;
});

function ring() {
  audio.play();
}

function setAlarm(e) {
  e.preventDefault();
  let current_time = new Date();
  let alarm = document.getElementById("alarm");
  alarm = new Int32Array(`${alarm.value}`.split(":"));
  console.log(alarm, current_time);
  let a = alarm[0] * 3600000 + alarm[1] * 60000 + alarm[2] * 1000;
  let b =
    current_time.getHours() * 3600000 +
    current_time.getMinutes() * 60000 +
    current_time.getSeconds() * 1000;
  timeToRing = a - b;
  if (timeToRing >= 0) {
    setTimeout(() => {
      ring();
    }, timeToRing);
  }
}

// Exercise 7: Digital Clock
setInterval(updateTime, 1000);
function updateTime() {
  let t = new Date();
  let timeOfDay = t.getHours() < 12 ? "AM" : "PM";
  let t_hour = t.getHours(),
    t_min = t.getMinutes(),
    t_sec = t.getSeconds();
  t_hour = t_hour > 12 ? t_hour - 12 : t_hour;
  t_hour = t_hour == 0 ? 12 : t_hour;
  t_hour = (t_hour < 10 ? "0" : "") + t_hour;
  t_min = (t_min < 10 ? "0" : "") + t_min;
  t_sec = (t_sec < 10 ? "0" : "") + t_sec;
  clock.innerHTML = `${t_hour}:${t_min}:${t_sec} ${timeOfDay}`;
}

// Analog Clock
setInterval(updateClock, 1000);
function updateClock() {
  let time = new Date();
  let t_hour = time.getHours(),
    t_min = time.getMinutes(),
    t_sec = time.getSeconds();
  sec_hand.style.transform = `rotate(${t_sec * 6}deg)`;
  min_hand.style.transform = `rotate(${t_min * 6}deg)`;
  hr_hand.style.transform = `rotate(${t_hour * 30 + t_min / 2}deg)`;
}

// Stop Watch
let d = new Date();
let ms = (s = m = 0);
let start = true;
let id = null;
function stopWatch() {
  ms++;
  d.setHours(0, m, s, ms);
  document.getElementById("sw").innerText =
    (m < 10 ? "0" : "") +
    d.getMinutes() +
    (s < 10 ? ":0" : ":") +
    d.getSeconds() +
    (ms < 10 ? ":0" : ":") +
    (ms > 99 ? String(d.getMilliseconds()).slice(0, -1) : d.getMilliseconds());
  ms === 250 ? (s++, (ms = 0)) : "";
  s === 60 ? (m++, (s = 0)) : "";
}
function startTimer() {
  let playBtn = document.getElementById("play");
  start
    ? ((start = false),
      (playBtn.innerText = "⏸"),
      Window.constructor((id = setInterval(stopWatch, 1))))
    : (clearInterval(id), (start = true), (playBtn.innerText = "▶️"));
}
function reset() {
  clearInterval(id);
  start = true;
  m = s = ms = 0;
  document.getElementById("sw").innerText = "00:00:00";
  document.getElementById("play").innerText = "▶️";
}
