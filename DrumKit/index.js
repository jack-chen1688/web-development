targets = document.querySelectorAll(".drum")

function playAudio(keyPressed) {
  var audio = null;
  switch (keyPressed) {
    case 'w':
      audio = new Audio('sounds/tom-1.mp3');
      break;
    case 'a':
      audio = new Audio('sounds/tom-2.mp3');
      break
    case 's':
      audio = new Audio('sounds/tom-3.mp3');
      break
    case 'd':
      audio = new Audio('sounds/tom-4.mp3');
      break
    case 'j':
      audio = new Audio('sounds/snare.mp3');
      break
    case 'k':
      audio = new Audio('sounds/crash.mp3');
      break
    case 'l':
      audio = new Audio('sounds/kick-bass.mp3');
      break
    default:
      console.log(this.innerHTML);
  }
  if (audio != null)
    audio.play();
}

for (var i=0; i<targets.length; i++) {
  targets[i].addEventListener("click", function () {
    playAudio(this.innerHTML);
  })
}

document.addEventListener("keydown", function(event) {
  playAudio(event.key);
})
