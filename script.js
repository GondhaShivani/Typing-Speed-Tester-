const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const accuracyLabel = document.querySelector(".accuracy");
const wordsPerMinuteLabel = document.querySelector(".wpm");

var timer = [0, 0, 0, 0];
var interval;
var wpmInterval;
var timerRunning = false;
var errors = 0;
var timeElapsed = 0;
var randomParagraph = 0;
var wpm;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);

  timeElapsed = timer[0] * 60 + timer[1];
}

// Finds words per minute
function wordsPerMinute() {
  if (timeElapsed > 0) {
    var grossWpm = Math.floor(testArea.value.length / 5 / (timeElapsed / 60));
    console.log(grossWpm);
    wpm = Math.floor((testArea.value.length / 5 - errors) / (timeElapsed / 60));
    console.log(wpm);
    if (wpm < 0) {
      wordsPerMinuteLabel.innerHTML = 0 + " WPM";
    } else {
      wordsPerMinuteLabel.innerHTML = wpm + " WPM";
    }
    accuracy(grossWpm);
  }
}

// Finds the accuracy
function accuracy(grossWpm) {
  let accuracy = Math.floor((wpm / grossWpm) * 100);
  if (accuracy < 0) {
    accuracyLabel.innerHTML = 0 + "%";
  } else {
    accuracyLabel.innerHTML = accuracy + "%";
  }
  console.log(accuracy);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered == originText) {
    clearInterval(interval);
    clearInterval(wpmInterval);
    testWrapper.style.borderColor = "#429890"; //Green
  } else {
    if (textEntered == originTextMatch) {
      testWrapper.style.borderColor = "#65CCf3"; //Blue
    } else {
      errors++;
      if (!(event.keyCode === 8)) {
        testWrapper.style.borderColor = "#E95D0F"; //Orange
      } else {
        errors--;
      }
    }
  }
}

// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
    wpmInterval = setInterval(wordsPerMinute, 1000);
  }
}

//Generates a new paragraph:
function randomParagraphGenerator() {
  let par1 = "Hello, Good Morning.";
  let par2 = "Have a Good Day :)";
  let par3 = "She hurriedly packed her bags for the weekend getaway.";
  let par4 = "The old bridge creaked as the heavy truck passed over it.";
  let par5 = "The sky is clear, and the sun shines brightly.";
  let par6 = "The city lights glittered like stars in the night sky.";
  let par7 = "The chef skillfully prepared a delicious gourmet meal.";
  let par8 = "They hiked through the dense forest, enjoying the fresh air.";
  let par9 = "The children laughed and played at the colorful playground.";
  let par10 = "The sky is clear, and the sun shines brightly.";

  switch (Math.floor(Math.random() * 10)) {
    case 0:
      originText = par1;
      document.querySelector("#origin-text p").innerHTML = par1;
      break;
    case 1:
      originText = par2;
      document.querySelector("#origin-text p").innerHTML = par2;
      break;
    case 2:
      originText = par3;
      document.querySelector("#origin-text p").innerHTML = par3;
      break;
    case 3:
      originText = par4;
      document.querySelector("#origin-text p").innerHTML = par4;
      break;
    case 4:
      originText = par5;
      document.querySelector("#origin-text p").innerHTML = par5;
      break;
    case 5:
      originText = par6;
      document.querySelector("#origin-text p").innerHTML = par6;
      break;
    case 6:
      originText = par7;
      document.querySelector("#origin-text p").innerHTML = par7;
      break;
    case 7:
      originText = par8;
      document.querySelector("#origin-text p").innerHTML = par8;
      break;
    case 8:
      originText = par9;
      document.querySelector("#origin-text p").innerHTML = par9;
      break;
    case 9:
      originText = par10;
      document.querySelector("#origin-text p").innerHTML = par10;
      break;
  }
}

// Reset everything:
function reset() {
  clearInterval(interval);
  clearInterval(wpmInterval);
  interval = null;
  wpmInterval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  wpm = 0 + " WPM";
  timeElapsed = 0;
  errors = 0;

  testArea.value = "";
  testArea.disabled = false;
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
  accuracyLabel.innerHTML = "100%";
  wordsPerMinuteLabel.innerHTML = wpm;
  randomParagraphGenerator();
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
