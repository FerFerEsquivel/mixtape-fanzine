// Lista de canciones usando archivos .mp3
const tracks = [
  { audio: 'audio/1.mp3', image: 'images/1.jpg', name: "El Gran Arcoiris" },
  { audio: 'audio/2.mp3', image: 'images/2.jpg', name: "Welcome to The Internet" },
  { audio: 'audio/3.mp3', image: 'images/3.jpg', name: "Canción 3" }
  // ... agrega más canciones aquí
];

const player = document.getElementById('player');
const art = document.getElementById('art');
const trackName = document.getElementById('track-name');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playPauseBtn = document.getElementById('play-pause');
const progress = document.querySelector('.progress');
const timeline = document.querySelector('.timeline');
const currentTimeElem = document.querySelector('.current');
const lengthElem = document.querySelector('.length');

let currentTrack = 0;
let isPlaying = false;

// Cargar pista
function loadTrack(index) {
  player.src = tracks[index].audio;
  art.src = tracks[index].image;
  trackName.textContent = tracks[index].name;
  player.load();
  updateTimes();
}
loadTrack(currentTrack);

function playTrack() {
  player.play();
  isPlaying = true;
  playPauseBtn.classList.remove('play');
  playPauseBtn.classList.add('pause');
}
function pauseTrack() {
  player.pause();
  isPlaying = false;
  playPauseBtn.classList.remove('pause');
  playPauseBtn.classList.add('play');
}
playPauseBtn.onclick = function() {
  if(isPlaying) pauseTrack();
  else playTrack();
};
player.onplay = () => playPauseBtn.classList.replace('play', 'pause');
player.onpause = () => playPauseBtn.classList.replace('pause', 'play');

prevBtn.onclick = function() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
};
nextBtn.onclick = function() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  playTrack();
};

player.onended = function() {
  nextBtn.click();
};

function updateTimes() {
  currentTimeElem.textContent = formatTime(player.currentTime);
  lengthElem.textContent = formatTime(player.duration || 0);
}
player.ontimeupdate = function() {
  updateTimes();
  const percent = (player.currentTime / player.duration) * 100;
  progress.style.width = percent + "%";
};
player.onloadedmetadata = updateTimes;

timeline.onclick = function(e) {
  const percent = e.offsetX / timeline.offsetWidth;
  player.currentTime = percent * player.duration;
};

function formatTime(sec) {
  sec = Math.floor(sec);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0"+s : s}`;
}

// Volumen
const volumeBtn = document.querySelector('.volume-button');
const volumeSlider = document.querySelector('.volume-slider');
const volumePercentage = document.querySelector('.volume-percentage');

volumeBtn.onclick = () => {
  if(player.muted) {
    player.muted = false;
    volumeBtn.classList.remove('muted');
  } else {
    player.muted = true;
    volumeBtn.classList.add('muted');
  }
};
volumeSlider.onclick = function(e) {
  const percent = e.offsetX / volumeSlider.offsetWidth;
  player.volume = percent;
  volumePercentage.style.width = (percent*100) + "%";
};

player.onvolumechange = function() {
  if(player.muted || player.volume === 0) {
    volumeBtn.classList.add('muted');
    volumePercentage.style.width = "0%";
  } else {
    volumeBtn.classList.remove('muted');
    volumePercentage.style.width = (player.volume*100) + "%";
  }
};

// Inicializar volumen
player.volume = 0.75;
volumePercentage.style.width = "75%";