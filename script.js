const clock = document.getElementById("clock");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");
const formatToggle = document.getElementById("formatToggle");
const themeToggle = document.getElementById("themeToggle");
const alarmTimeInput = document.getElementById("alarmTime");
const alarmSound = document.getElementById("alarmSound");

const nyClock = document.getElementById("nyClock");
const londonClock = document.getElementById("londonClock");
const tokyoClock = document.getElementById("tokyoClock");

let alarmTriggeredToday = "";

// Theme toggle
themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("light-theme", themeToggle.checked);
});

function pad(n) {
    return n.toString().padStart(2, '0');
}

function formatTime(date, is12Hour) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let ampm = '';

    if (is12Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12;
    }

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}${ampm}`;
}

function updateWorldClock(offset, is12Hour) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const local = new Date(utc + 3600000 * offset);
    return formatTime(local, is12Hour);
}

function updateClock() {
    const now = new Date();
    const is12Hour = formatToggle.checked;

    // Main Clock
    clock.textContent = formatTime(now, is12Hour);

    // Date
    date.textContent = now.toLocaleDateString(undefined, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Greeting
    const hour = now.getHours();
    if (hour < 12) greeting.textContent = "☀️ Good Morning!";
    else if (hour < 18) greeting.textContent = "🌤️ Good Afternoon!";
    else greeting.textContent = "🌙 Good Evening!";

    // Alarm
    const alarmVal = alarmTimeInput.value;
    if (alarmVal) {
        const [alarmH, alarmM] = alarmVal.split(':').map(Number);
        if (now.getHours() === alarmH && now.getMinutes() === alarmM && now.getSeconds() === 0) {
            const today = now.toDateString();
            if (alarmTriggeredToday !== today + alarmVal) {
                alarmTriggeredToday = today + alarmVal;
                alarmSound.play();
                alert("⏰ Alarm ringing!");
            }
        }
    }

    // World Clocks
    nyClock.textContent = updateWorldClock(-4, is12Hour);
    londonClock.textContent = updateWorldClock(0, is12Hour);
    tokyoClock.textContent = updateWorldClock(9, is12Hour);
}

setInterval(updateClock, 1000);
updateClock();