class Metronome {
  constructor(bpm) {
    this.context = new AudioContext();
    this.bpm = bpm;
    this.isPlaying = false;
    this.tickLength = 0.05; // in seconds (50ms)
    
    // Load tick sound
    this.tickSound = null;
    this.loadSound('/public/sound.mp3')
      .then((sound) => {
        this.tickSound = sound;
      })
      .catch((error) => {
        console.error(error);
      });

    this.tick = this.tick.bind(this);
  }

  loadSound(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        this.context.decodeAudioData(request.response, resolve, reject);
      };

      request.onerror = () => {
        reject(new Error('Failed to load sound file'));
      };

      request.send();
    });
  }

  start() {
    if (this.isPlaying) return;

    this.isPlaying = true;

    const interval = (60 / this.bpm) * 1000;
    this.timer = setInterval(this.tick, interval);
  }

  stop() {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    clearInterval(this.timer);
  }

  tick() {
    const source = this.context.createBufferSource();
    source.buffer = this.tickSound;
    source.connect(this.context.destination);
    source.start();
  }

  setBpm(bpm) {
    this.bpm = bpm;

    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }
}

  const metronome = new Metronome(120);

  document.querySelector('section').addEventListener('click', () =>   metronome.start())

const value = document.querySelector("#bpmOutput")
const input = document.querySelector("#bpmInput")
value.textContent = input.value
input.addEventListener("input", (event) => {
  value.textContent = event.target.value
})