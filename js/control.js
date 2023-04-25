const metronome = new Metronome(100, 4);
let isPlaying = false;
const toggleButton = document.querySelector('#toggleButton');
const icon = document.querySelector('#playPauseIcon')
const value = document.querySelector("#bpmOutput")
const input = document.querySelector("#bpmInput")

const toggle = () => {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        metronome.start();
        icon.setAttribute('name', 'pause')
    } else {
        metronome.stop();
        icon.setAttribute('name', 'play')
    }
}

toggleButton.addEventListener('click',toggle)

const updateRange = () => {
    value.textContent = input.value;
    metronome.setBpm(input.value);
    beat.setBpm(input.value);
}

value.textContent = input.value
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
  metronome.setBpm(event.target.value)
})

const rangeListener = () => {
    const increment = document.querySelector("#rangeIncrement");
    const decrement = document.querySelector("#rangeDecrement");
    increment.addEventListener("click", rangeIncrement);
    decrement.addEventListener("click", rangeDecrement);

}

const rangeIncrement = () => {
    input.value++
    updateRange()
}

const rangeDecrement = () => {
    input.value--
    updateRange()
}

rangeListener()