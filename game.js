import { initGame as initPersonMode } from './personMode.js';
import { initGame as initRandomMode } from './randomMode.js';

const toggleBtn = document.querySelector(".box");
let toggle = true;

function initCurrentMode() {
    if (toggle) {
        initPersonMode();
        toggleBtn.classList.add('active');
    } else {
        initRandomMode();
        toggleBtn.classList.remove('active');
    }
}

// Initialize the default game mode (Person vs Person)
initCurrentMode();

toggleBtn.addEventListener("click", () => {
    // Remove old event listeners and reset game state before toggling
    resetGameState();
    toggle = !toggle;
    initCurrentMode();
});

function resetGameState() {
    const cells = document.querySelectorAll(".cell");
    const staticText = document.querySelector("#staticText");
    const btn = document.querySelector("#restartBtn");

    // Remove old event listeners by cloning cells
    cells.forEach(cell => {
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
    });

    // Reset the game state variables
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.background = '';
    });
    staticText.textContent = "X's Turn";

    // Remove old event listeners from the restart button
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
}
