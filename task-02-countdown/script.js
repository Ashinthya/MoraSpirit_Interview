// 1. Grab the elements we need from the page
const targetInput = document.getElementById("target");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const message = document.getElementById("message");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// 2. State: the interval id (so we can stop it) and the target time in ms
let intervalId = null;
let targetTime = null;

// 3. Turn 5 into "05"
function pad(n) {
    return String(n).padStart(2, "0");
}

// 4. Show a time difference (in milliseconds) on the page
function render(diff) {
    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
}

// 5. Runs every second
function tick() {
    const diff = targetTime - Date.now();

    if (diff <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        render(0);
        message.textContent = "Time is up!";
        message.className = "h-8 mb-4 text-lg font-semibold text-emerald-400";
        localStorage.removeItem("targetTime");
        return;
    }

    render(diff);
}

// 6. Start button
function start() {
    if (!targetInput.value) {
        showError("Please pick a date and time first.");
        return;
    }

    const chosen = new Date(targetInput.value).getTime();

    if (chosen <= Date.now()) {
        showError("Please choose a time in the future.");
        return;
    }

    begin(chosen);
}

function begin(time) {
    clearInterval(intervalId);
    targetTime = time;
    localStorage.setItem("targetTime", String(time));
    message.textContent = "";
    tick();
    intervalId = setInterval(tick, 1000);
}

function showError(text) {
    message.textContent = text;
    message.className = "h-8 mb-4 text-lg font-semibold text-rose-400";
}

// 7. Reset button
function reset() {
    clearInterval(intervalId);
    intervalId = null;
    targetTime = null;
    localStorage.removeItem("targetTime");
    targetInput.value = "";
    message.textContent = "";
    render(0);
}

// 8. Wire up the buttons
startBtn.addEventListener("click", start);
resetBtn.addEventListener("click", reset);

// 9. On page load, restore a saved countdown if there is one
const saved = Number(localStorage.getItem("targetTime"));
if (saved) {
    if (saved > Date.now()) {
        begin(saved);
    } else {
        localStorage.removeItem("targetTime");
    }
}
