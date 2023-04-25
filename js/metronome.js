class Metronome {
  constructor(bpm, beatCount) {
    this.context = new AudioContext();
    this.bpm = bpm;
    this.isPlaying = false;
    this.tickLength = 0.05; // in seconds (50ms)
    this.currentBeatIndex = 0;
    this.beatCount = beatCount;
    this.intervalId = null;
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
    this.intervalId = setInterval(this.tick, interval);
  }

  stop() {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    clearInterval(this.intervalId);
  }

  tick() {
    const source = this.context.createBufferSource();
    source.buffer = this.tickSound;
    source.connect(this.context.destination);
    source.start();
    
    const items = [...document.querySelectorAll(".dot")];
    const currentIndex = this.currentBeatIndex % items.length;
    const currentItem = items[currentIndex];
  
    currentItem.classList.add("selected-dot");
  
    setTimeout(() => {
      currentItem.classList.remove("selected-dot");
    }, (60 / this.bpm) * 1000);
    
    this.currentBeatIndex++;
  }
  

  setBpm(bpm) {
    this.bpm = bpm;

    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  setBeatCount(count) {
    this.beatCount = count;
  }
}
