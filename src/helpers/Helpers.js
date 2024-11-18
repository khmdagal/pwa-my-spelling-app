
export function getDate(str) {
    return String(str).split('T')[0].split('-').reverse().join("-")
}

export function getWords(words) {
    //console.log(words)
    return words
}

export function sayTheRandomWord(word) {

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel()
    }

    let utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-GB";
    utterance.pitch = "1";
    utterance.rate = 0.8;
    utterance.volume = 1;

    speechSynthesis.speak(utterance);
}