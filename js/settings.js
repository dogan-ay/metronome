class Settings {
    constructor() {
        this.drawer = document.querySelector("#drawer-2");
        this.settingsButton = document.querySelector("#settings");
        this.closeButton = document.querySelector("#close");
        this.saveButton = document.querySelector("#save");
        this.tempo = parseInt(document.querySelector("#tempo").dataset.value);
        this.realTempo = parseInt(document.querySelector("#tempo").dataset.value);
        this.tempoOutput = document.querySelector("#tempoOutput");
        this.sound = document.querySelector("#sound");
        this.soundValue = sound.value;
        this.selectedSound = this.soundValue;
        this.switch = document.querySelector("#themeSwitch");
        this.switchValue = this.switch.checked;
        this.badge = document.querySelector("#theme-badge");
        this.init()
    }
    
    init() {
        this.settingsButton.addEventListener("click", () => {
            this.drawer.setAttribute("open","")
            const observer = new MutationObserver((mutationsList, observer) => {
                for (let mutation of mutationsList) {
                  if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    const removed = mutation.target.querySelector('.header-buttons');
                    removed.remove();
                    observer.disconnect(); // observer'ı durdur
                  }
                }
            });
            observer.observe(this.drawer.shadowRoot, { childList: true, subtree: true });
            
        })
        
        this.switch.addEventListener("bl-switch-toggle", this.themeSwitch.bind(this))

        this.sound.addEventListener("bl-select", (event) => {
            this.selectedSound = event.target.value;
            metronome.setSound(this.selectedSound)
        })
        this.closeButton.addEventListener("click", this.settingsClose.bind(this));
        this.saveButton.addEventListener("click", this.save.bind(this));
        this.tempoListener();
        this.badge.innerText = "Dark"

    }

    settingsClose() {
        this.drawer.removeAttribute("open");
        this.reset()
    }

    tempoListener() {
        const increment = document.querySelector("#tempoIncrement");
        const decrement = document.querySelector("#tempoDecrement");
    
        increment.addEventListener("click", this.tempoIncrement.bind(this)) 
        decrement.addEventListener("click", this.tempoDecrement.bind(this))
    }
    
    updateTempo() {
        this.tempoOutput.innerText = this.tempo
        beat.updateBeat(this.tempo)
    }

    tempoIncrement() {
        if (this.tempo < 12){
            this.tempo += 1;
            this.updateTempo();
        }
    }

    tempoDecrement() {
        if (this.tempo > 1) {
            this.tempo -= 1;
            this.updateTempo();
        }
    }

    reset() {
        this.tempoOutput.innerText = this.realTempo;
        this.tempo = this.realTempo;
        beat.updateBeat(this.realTempo);
        this.sound.value = this.soundValue;
        metronome.setSound(this.soundValue);
        this.switch.checked = this.switchValue;
        this.themeSwitch(this.switchValue);
    }

    save() {
        this.drawer.removeAttribute("open");
        this.realTempo = this.tempo;
        this.soundValue = this.selectedSound;
        this.switchValue = this.switch.checked;
        this.themeSwitch(this.switchValue);
    }

    themeSwitch() {
        const body = document.querySelector('body');
        const main = document.querySelector('main');
        if (this.switch.checked) {
            body.classList.add("dark-root")
            main.classList.add("dark")
            this.badge.innerText = "Dark"
            
        } else {
            body.classList.remove("dark-root")
            main.classList.remove("dark")
            this.badge.innerText = "Light"
        }
    }

}

const settings = new Settings();

