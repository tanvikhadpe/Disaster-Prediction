var Speaker = function() {
    var synth
    var utterance
    var voices


    this.init = function() {

        // CHECK FOR SPEECHSYNTHESIS API
        if(!(window.speechSynthesis)) {
            warn("Your browser is not capable of speech synthesis.")
            return
        }

        // INITIALIZE SPEECH SYNTHESIS API ELEMENTS
        synth = window.speechSynthesis
        voices = synth.getVoices()
        utterance = new SpeechSynthesisUtterance("Hello World!");

        // CHECK FOR AVAILABLE VOICES
        if(voices.length <= 0) {
            warn("No voices are provided by either your browser or system.")
            return
        }

        // ADD VOICE INDICES
        voices.forEach(function(voice, a) {
            voice.voice_index = a
        })

        // POPULATE VOICES LIST AND ENABLE INPUT ELEMENTS
        populateVoicesList();
        $(".warn").css("display", "none");
        $("button#submit").removeAttr("disabled");
        $("textarea").removeAttr("disabled");
        $("select#voices").removeAttr("disabled");

        // SET AN ENGLISH VOICE AS DEFAULT
        var englishes = voices.filter(function(voice) { return voice.default && voice.lang.substr(0,2) == "en" })
        if(englishes.length > 0) {
            $("#voices option[value=\"" + englishes[0].voice_index + "\"]").prop("selected", true)
        }

        clearInterval(timer)
    }

    function populateVoicesList() {

        // LANGUAGE CODE'S OBJECT  FORMAT
        // "langCode": {
        //     "name": "langNameInEnglish",
        //     "nativeName": "langName"
        // }

        // Separate Voices by Langauge
        $.each(isoLangs, function(langCode, value) {
            addVoices(value.name + " (" + value.nativeName + ")", function(voice) { return voice.lang.substr(0,2) == langCode })
        });

        // Group Unclassified Language Voices
        addVoices("Miscellaneous", function(voice) { return !isoLangs.hasOwnProperty(voice.lang.substr(0,2)) })
    }

    function addVoices(languageName, filterBy) {
        // Filter voices by filterBy function
        var filteredVoices = voices.filter(filterBy)

        // Add group only if there is at least one voice
        if(filteredVoices.length > 0) {
            // Add optgroup
            $("#voices").append('<optgroup label="' + languageName + '">')

                // Add option for each voice
                filteredVoices.forEach(function(el, idx, arr) {
                    $("#voices").append('<option value="' + el.voice_index + '">' + el.name + ' (' + el.lang + ')' + '</option>')
                })

            // End optgroup
            $("#voices").append('</optgroup>')
        }
    }

    function warn(str) {
        $(".warn").css("display", "block");
        // $(".reason").append(str);

        $("button#submit").attr("disabled");
        $("textarea").attr("disabled");
        $("select#voices").attr("disabled");
    }

    function getSelectedVoice() {
        return voices[$("#voices option:selected").val()]
    }

    this.speak = function() {
        // Cancel current voice if it's currently talking so new text can be read immediately
        synth.cancel();
      
        // CREATE NEW UTTERANCE AND SPEAK IF VOICE IS AVAILABLE
        utterance = new SpeechSynthesisUtterance($("textarea").val());

        var selectedVoice = getSelectedVoice()
        if(selectedVoice) {
            utterance.voice = selectedVoice
        }

        synth.speak(utterance);
    }

}

var speaker = new Speaker()
var timer

$(document).ready(function() {
    $(".warn").css("display", "none");
    timer = setInterval(function() {
        speaker.init();
    }, 1000);
});
