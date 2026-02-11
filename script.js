/***********************
 *  INTRO BUTTON LOGIC
 ***********************/
function startLove() {
  const intro = document.getElementById("intro");
  const timerSection = document.getElementById("timerSection");

  if (intro) intro.classList.add("hidden");
  if (timerSection) timerSection.classList.remove("hidden");

  playMainMusic(true); // user interaction → allowed
}

/***********************
 *  TIMER
 ***********************/
const startDate = new Date("2004-02-14T00:00:00");

setInterval(() => {
  const t = document.getElementById("timer");
  if (!t) return;

  const now = new Date();
  const diff = now - startDate;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  t.innerHTML = `${d} days ${h} hrs ${m} mins ${s} secs 💕`;
}, 1000);

/***********************
 *  FLOATING HEARTS
 ***********************/
setInterval(() => {
  const heart = document.createElement("div");
  heart.textContent = "💗";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "0";
  heart.style.fontSize = "20px";
  heart.style.animation = "floatUp 4s linear";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "999";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}, 400);

const style = document.createElement("style");
style.innerHTML = `
@keyframes floatUp {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100vh); opacity: 0; }
}`;
document.head.appendChild(style);

/***********************
 *  AUDIO CORE
 ***********************/
function stopAllAudio() {
  document.querySelectorAll("audio").forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function fadeIn(audio, target = 0.4) {
  let vol = 0;
  audio.volume = 0;
  const fade = setInterval(() => {
    if (vol < target) {
      vol += 0.02;
      audio.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 100);
}

/***********************
 *  MAIN MUSIC (index + birthday)
 ***********************/
function playMainMusic(force = false) {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  stopAllAudio();
  music.currentTime = 0;

  if (force) {
    music.play().then(() => fadeIn(music)).catch(() => {});
  } else {
    music.play().then(() => (music.volume = 0.4)).catch(() => {});
  }
}

/***********************
 *  MEMORIES MUSIC
 ***********************/
function playMemoryMusic() {
  const memoryMusic = document.getElementById("memoryMusic");
  if (!memoryMusic) return;

  stopAllAudio();
  memoryMusic.currentTime = 0;

  memoryMusic.play()
    .then(() => fadeIn(memoryMusic))
    .catch(() => {});
}

/***********************
 *  PAGE NAVIGATION HANDLING
 ***********************/
window.addEventListener("pageshow", () => {
  playMainMusic();
  playMemoryMusic();
});

window.addEventListener("pagehide", stopAllAudio);

/***********************
 *  MUSIC TOGGLE BUTTON
 ***********************/
function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  music.paused ? music.play() : music.pause();
}
