
import Tile from './Tile.js';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.size = 4;
        this.grid = this.createGrid();
        this.score = 0;
        this.moving = false;

        this.addRandomTile();
        this.addRandomTile();

        this.handleInput();
    }

    start() {
        this.draw();
    }

    createGrid() {
        return Array.from({ length: this.size }, () => Array(this.size).fill(null));
    }

    addRandomTile() {
        const emptyCells = [];
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === null) emptyCells.push({ r, c });
            }
        }
        if (emptyCells.length === 0) return;

        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.grid[r][c] = new Tile(Math.random() < 0.9 ? 2 : 4);
    }

    handleInput() {
        window.addEventListener('keydown', (e) => {
            if (this.moving) return;

            const directions = {
                ArrowUp: 'up',
                ArrowDown: 'down',
                ArrowLeft: 'left',
                ArrowRight: 'right',
            };

            if (directions[e.key]) {
                this.move(directions[e.key]);
            }
        });
    }

    move(direction) {
        this.moving = true;

        let moved = false;
        switch (direction) {
            case 'up':
                moved = this.moveVertical(-1);
                break;
            case 'down':
                moved = this.moveVertical(1);
                break;
            case 'left':
                moved = this.moveHorizontal(-1);
                break;
            case 'right':
                moved = this.moveHorizontal(1);
                break;
        }

        if (moved) {
            this.addRandomTile();
        }

        this.draw();

        if (this.checkGameOver()) {
            alert("Нельзя сделать ход");
            this.resetGame();
        }

        this.moving = false;
    }

    moveVertical(direction) {
        let moved = false;
        for (let c = 0; c < this.size; c++) {
            const column = this.grid.map(row => row[c]);
            const { merged, hasMoved } = this.mergeLine(column, direction);
            for (let r = 0; r < this.size; r++) {
                this.grid[r][c] = merged[r];
            }
            if (hasMoved) moved = true;
        }
        return moved;
    }

    moveHorizontal(direction) {
        let moved = false;
        for (let r = 0; r < this.size; r++) {
            const row = this.grid[r];
            const { merged, hasMoved } = this.mergeLine(row, direction);
            this.grid[r] = merged;
            if (hasMoved) moved = true;
        }
        return moved;
    }

    mergeLine(line, direction) {
        const nonNull = line.filter(tile => tile !== null);
        const newLine = [];
        let hasMoved = false;

        if (direction === 1) nonNull.reverse();

        for (let i = 0; i < nonNull.length; i++) {
            if (i < nonNull.length - 1 && nonNull[i].value === nonNull[i + 1].value) {
                newLine.push(new Tile(nonNull[i].value * 2));
                this.score += nonNull[i].value * 2;
                i++;
                hasMoved = true;
            } else {
                newLine.push(nonNull[i]);
            }
        }

        while (newLine.length < this.size) {
            newLine.push(null);
        }

        if (direction === 1) newLine.reverse();

        for (let i = 0; i < this.size; i++) {
            if (line[i] !== newLine[i]) {
                hasMoved = true;
            }
        }

        return { merged: newLine, hasMoved };
    }

    checkGameOver() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === null) return false;
                if (r < this.size - 1 && this.grid[r][c].value === this.grid[r + 1][c]?.value) return false;
                if (c < this.size - 1 && this.grid[r][c].value === this.grid[r][c + 1]?.value) return false;
            }
        }
        return true;
    }

    resetGame() {
        this.grid = this.createGrid();
        this.score = 0;
        this.addRandomTile();
        this.addRandomTile();
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const cellSize = this.canvas.width / this.size;

        this.ctx.fillStyle = '#bbada0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                const x = c * cellSize;
                const y = r * cellSize;
                this.ctx.fillStyle = '#cdc1b4';
                this.ctx.fillRect(x, y, cellSize - 5, cellSize - 5);

                const tile = this.grid[r][c];
                if (tile) {
                    this.ctx.fillStyle = tile.getColor();
                    this.ctx.fillRect(x, y, cellSize - 5, cellSize - 5);
                    this.ctx.fillStyle = '#776e65';
                    this.ctx.font = '20px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(tile.value, x + cellSize / 2, y + cellSize / 2);
                }
            }
        }
    }
}


