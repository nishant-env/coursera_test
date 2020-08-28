
(function(window){
  var helloSpeaker = {};
  var speakWord = "Hello";

  helloSpeaker.speakWord =function (name) {
    console.log(speakWord + " " + name);
  }
  window.helloSpeaker = helloSpeaker;
})(window);
