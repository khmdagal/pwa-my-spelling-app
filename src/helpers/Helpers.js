
exports.getDate = (str) =>{
    return String(str).split('T')[0].split('-').reverse().join("-")
}

exports.getWords = (words) => {
    //console.log(words)
    return words
}

exports.sayTheRandomWord = (word) => {

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

exports.sanitizeInput = (input) => {
    let scannedInputData;
    const dangerousInputs = /<[^>]+>/g

    /*
    First checking if the input is an array
    Second checking if the input is an object
    Lastly for strings
    */
    if (Array.isArray(input)) {
        const allValuesToString = input.map(value => String(value))
        scannedInputData = allValuesToString.some(value => value.match(dangerousInputs))
    } else if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
        const getValuesAsArray = Object.values(input).map(value => String(value))
        scannedInputData = getValuesAsArray.some(value => value.match(dangerousInputs))
    } else {
        scannedInputData = input.match(dangerousInputs)
    }
    return scannedInputData ? true : false
}