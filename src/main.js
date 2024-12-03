import Game from './Game.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = 400;
canvas.height = 400;

const game = new Game(canvas);
game.start();
