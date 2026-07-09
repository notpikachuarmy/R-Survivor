let audioContext = null;
let musicInterval = null;
let musicEnabled = false;

const melody = [
  220, 220, 261.63, 293.66,
  220, 220, 329.63, 293.66,
  196, 220, 261.63, 220
];

let melodyIndex = 0;

function startMusic() {
  if (musicEnabled) return;

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  musicEnabled = true;

  musicInterval = setInterval(playMusicNote, 280);
}

function stopMusic() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }

  musicEnabled = false;
}

function playMusicNote() {
  if (!audioContext) return;

  const frequency = melody[melodyIndex % melody.length];
  melodyIndex++;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.035, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.22);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.23);
}
