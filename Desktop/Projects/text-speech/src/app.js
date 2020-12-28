const synth = window.speechSynthesis;
const form = document.querySelector("form");
const text = document.querySelector("#user-text");
const voice = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== "undefined";

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

let voices = [];
const getVoices = () => {
  voices = synth.getVoices();
  voices.forEach((i) => {
    const option = document.createElement("option");
    option.textContent = i.name + "(" + i.lang + ")";
    option.setAttribute("data-lang", i.lang);
    option.setAttribute("data-name", i.name);
    voice.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  if (synth.speaking) {
    console.error("Already speaking...");
    return;
  }
  if (text.value !== "") {
    const speakText = new SpeechSynthesisUtterance(text.value); //step 1 new construction function

    // Speak end
    speakText.onend = (e) => {
      console.log("Done speaking...");
    };
    // Speak error
    speakText.onerror = (e) => {
      console.error("Something went wrong");
    };

    // Selected voice
    const selectedVoice = voice.selectedOptions[0].getAttribute("data-name");

    // Loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice; //step 2 speakText.voice = voice
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value; //step 3 set rate
    speakText.pitch = pitch.value; //step 4 set pitch
    // Speak
    synth.speak(speakText); //call synth.speak function
  }
};
// Text form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  text.blur();
});

// Rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));

// Voice select change
voice.addEventListener("change", (e) => speak());
