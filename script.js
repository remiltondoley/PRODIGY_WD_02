let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let display = document.getElementById("display");
let interval = null;
let running = false;

function updateDisplay() {
  let h = String(hours).padStart(2, '0');
  let m = String(minutes).padStart(2, '0');
  let s = String(seconds).padStart(2, '0');
  let ms = String(milliseconds).padStart(3, '0');
  display.innerText = `${h}:${m}:${s}.${ms}`;
}

function startStop() {
  if (!running) {
    interval = setInterval(() => {
      milliseconds += 10;
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10);
    running = true;
  }
}

function pause() {
  clearInterval(interval);
  running = false;
}

function reset() {
  clearInterval(interval);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  document.getElementById("laps").innerHTML = "";
  running = false;
}

function lap() {
  if (running) {
    const lapTime = display.innerText;
    const lapItem = document.createElement("li");
    lapItem.textContent = `${lapTime}`;
    document.getElementById("laps").appendChild(lapItem);
  }
}

// Dark mode toggle
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});

// Background switcher
const bgSelect = document.getElementById("backgroundSelect");
bgSelect.addEventListener("change", function () {
  document.body.className = ''; // Clear all
  if (darkToggle.checked) document.body.classList.add("dark-mode");
  document.body.classList.add(this.value);
});
