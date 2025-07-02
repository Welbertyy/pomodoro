let timer;
let timeLeft;
let isFocusSession = true;
let isRunning = false;

const focusInput = document.getElementById('focus-time');
const breakInput = document.getElementById('break-time');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimerTime() {
    const focusTime = parseInt(focusInput.value) * 60; 
    const breakTime = parseInt(breakInput.value) * 60;   
    if (!isRunning) {
        timeLeft = isFocusSession ? focusTime : breakTime;
        updateDisplay(); 
    }
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        updateTimerTime();         
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                isFocusSession = !isFocusSession; 
                alert(isFocusSession ? "Volta para o tempo de foco!" : "Hora do descanso!");
                startTimer(); 
            } else {
                timeLeft--; 
                updateDisplay();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isFocusSession = true;
    updateTimerTime(); 
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

focusInput.addEventListener('input', updateTimerTime);
breakInput.addEventListener('input', updateTimerTime);

updateTimerTime();
