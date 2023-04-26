const beat = {
    parent: document.querySelector(".beats"),
    beatCount: 4,
    beatRender() {
      this.parent.innerHTML = '';
      for (let i = 0; i < this.beatCount; i++) {
        const dot = document.createElement("div");
        this.parent.appendChild(dot);                    
        dot.classList.add("dot");          
      }
    },
    updateBeat(count) {
      this.beatCount = count;
      metronome.setBeatCount(count);
      this.beatRender();
    }
  };
  
  beat.beatRender();