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
      
        this.sound.addEventListener("bl-select", (event) => {
            this.selectedSound = event.target.value;
        })
        this.closeButton.addEventListener("click", this.settingsClose.bind(this));
        this.saveButton.addEventListener("click", this.save.bind(this));
        this.tempoListener();
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
        console.log(this.switch, this.switchValue)
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
        this.sound.value = this.soundValue;
        this.switch.checked = this.switchValue;
    }

    save() {
        this.drawer.removeAttribute("open");
        this.realTempo = this.tempo;
        this.soundValue = this.selectedSound;
        this.switchValue = this.switch.checked;
    }

}

const settings = new Settings();
/*
const settingsListener = () => {
    const settings = document.querySelector("#settings")
    settings.addEventListener("click", () => {
        settingsSection.setAttribute("open","")
    })
}

const settingsClose = () => {
    settingsSection.removeAttribute("open");
}

const closeListener = () => {
    const close = document.querySelector("#close");
    close.addEventListener("click",settingsClose)
}

closeListener()

settingsListener()

let tempo = parseInt(document.querySelector("#tempo").dataset.value) 

const updateTempo = () => {
    let tempoOutput = document.querySelector("#tempoOutput")
    tempoOutput.innerText = tempo
}

const tempoIncrement = () => {
    if (tempo < 12){
        tempo += 1;
        updateTempo();
    }
}

const tempoDecrement = () => {
    if (tempo > 1) {
        tempo -= 1;
        updateTempo();
    }
} 

const tempoListener = () => {
    const increment = document.querySelector("#tempoIncrement");
    const decrement = document.querySelector("#tempoDecrement");

    increment.addEventListener("click", tempoIncrement) 
    decrement.addEventListener("click", tempoDecrement)
}

tempoListener()
*/