import { backend } from 'declarations/backend';

const grid = document.getElementById('grid');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const randomizeBtn = document.getElementById('randomizeBtn');

let intervalId;
const cellSize = 10;
const rows = 50;
const cols = 50;

async function initializeGame() {
  const initialState = await backend.initializeGame();
  renderGrid(initialState);
}

function renderGrid(state) {
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (state[i][j]) {
        cell.classList.add('alive');
      }
      grid.appendChild(cell);
    }
  }
}

async function updateGame() {
  const newState = await backend.updateGame();
  renderGrid(newState);
}

function startGame() {
  intervalId = setInterval(updateGame, 100);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopGame() {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

async function randomizeCells() {
  const newState = await backend.randomizeCells();
  renderGrid(newState);
}

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
randomizeBtn.addEventListener('click', randomizeCells);

initializeGame();
