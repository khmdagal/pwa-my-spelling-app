exports.getDate = (str) => {
    return String(str).split('T')[0].split('-').reverse().join("-")
}

exports.getWords = (words) => {
    //console.log(words)
    return words
}

exports.sayTheRandomWord = (word) => {
    speechSynthesis.cancel();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    const voices = synth.getVoices();

    const preferredVoice = voices.find(v => v.name.includes("Google UK English"))

    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    synth.speak(utterance);
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

exports.practiceSessionCalculations = (data) => {
    const analyisedPracticeData = {};
    for (let i = 0; i < data.length; i++) {
        const el = data[i]
        for (let j = 0; j < el.length; j++) {

            let eachKey = Object.keys(el[j])[0];
            let eachValue = Object.values(el[j])[0];

            if (!analyisedPracticeData[eachKey]) {

                analyisedPracticeData[eachKey] = {
                    attempts: 0,
                    correct: 0,
                    inCorrect: 0,
                }
            }

            if (eachKey === eachValue) {
                analyisedPracticeData[eachKey].correct++;
            } else {
                analyisedPracticeData[eachKey].inCorrect++
            }

            analyisedPracticeData[eachKey].attempts = analyisedPracticeData[eachKey].correct + analyisedPracticeData[eachKey].inCorrect;
            // analyisedPracticeData[eachKey].wordScore = (analyisedPracticeData[eachKey].correctTimes - analyisedPracticeData[eachKey].inCorrectTimes) / analyisedPracticeData[eachKey].numberOfEfforts

        };

    }

    return analyisedPracticeData

}

exports.extractwordFromExamples = (word, assignment) => {
    const hide = "*".repeat(word.length);
    const requiredExampes = []
    const formatedExamples = [];

    for (let i = 0; i < assignment?.length; i++) {
        if (word === assignment[i].word) {
            const values = Object.values(assignment[i].example)
            requiredExampes.push(values)

        }
    }

    const originalExample = requiredExampes.flatMap((el) => el)

    for (let i = 0; i < originalExample.length; i++) {
        const eachExample = originalExample[i]
        formatedExamples.push(eachExample.replace(word, hide))
    }

    return {
        formatedExamples,
        originalExample
    }
}
