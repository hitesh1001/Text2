const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select")
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        //selecting "Google US English" voice as default
        let selected = voice.name ==="Google US English" ? "selected" : "";
        // creating an option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);//inserting option tag beforeend of select tag
    }
}

synth.addEventListener("voiceschanged",voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);// speak the speech/utterence
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
    if(!synth.speaking){//if an utterance is not currently in the process of speaking 
        textToSpeech(textarea.value);
    }
        
        if(textarea.value.length >80){
            //if isSpeaking is true then its value to false and resume the utterance 
            //else change its value to true and pause the speech 
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";

            }
            // checking if utterance / speech in speaking process or not in every 100 ms 
            // if not then set the value of isSpeaking to true and change the button text 
            setInterval(() =>{
                if(!synth.speaking && !isSpeakinge ){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        } else {
            speechBtn.innerText = "Convert To Speech";
        }

    }
});