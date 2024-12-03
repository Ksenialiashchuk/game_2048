/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile.js */ \"./src/Tile.js\");\n\nclass Game {\n  constructor(canvas) {\n    this.canvas = canvas;\n    this.ctx = canvas.getContext('2d');\n    this.size = 4;\n    this.grid = this.createGrid();\n    this.score = 0;\n    this.moving = false;\n    this.addRandomTile();\n    this.addRandomTile();\n    this.handleInput();\n  }\n  start() {\n    this.draw();\n  }\n  createGrid() {\n    return Array.from({\n      length: this.size\n    }, () => Array(this.size).fill(null));\n  }\n  addRandomTile() {\n    const emptyCells = [];\n    for (let r = 0; r < this.size; r++) {\n      for (let c = 0; c < this.size; c++) {\n        if (this.grid[r][c] === null) emptyCells.push({\n          r,\n          c\n        });\n      }\n    }\n    if (emptyCells.length === 0) return;\n    const {\n      r,\n      c\n    } = emptyCells[Math.floor(Math.random() * emptyCells.length)];\n    this.grid[r][c] = new _Tile_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](Math.random() < 0.9 ? 2 : 4);\n  }\n  handleInput() {\n    window.addEventListener('keydown', e => {\n      if (this.moving) return;\n      const directions = {\n        ArrowUp: 'up',\n        ArrowDown: 'down',\n        ArrowLeft: 'left',\n        ArrowRight: 'right'\n      };\n      if (directions[e.key]) {\n        this.move(directions[e.key]);\n      }\n    });\n  }\n  move(direction) {\n    this.moving = true;\n    let moved = false;\n    switch (direction) {\n      case 'up':\n        moved = this.moveVertical(-1);\n        break;\n      case 'down':\n        moved = this.moveVertical(1);\n        break;\n      case 'left':\n        moved = this.moveHorizontal(-1);\n        break;\n      case 'right':\n        moved = this.moveHorizontal(1);\n        break;\n    }\n    if (moved) {\n      this.addRandomTile();\n    }\n    this.draw();\n    if (this.checkGameOver()) {\n      alert(\"Нельзя сделать ход\");\n      this.resetGame();\n    }\n    this.moving = false;\n  }\n  moveVertical(direction) {\n    let moved = false;\n    for (let c = 0; c < this.size; c++) {\n      const column = this.grid.map(row => row[c]);\n      const {\n        merged,\n        hasMoved\n      } = this.mergeLine(column, direction);\n      for (let r = 0; r < this.size; r++) {\n        this.grid[r][c] = merged[r];\n      }\n      if (hasMoved) moved = true;\n    }\n    return moved;\n  }\n  moveHorizontal(direction) {\n    let moved = false;\n    for (let r = 0; r < this.size; r++) {\n      const row = this.grid[r];\n      const {\n        merged,\n        hasMoved\n      } = this.mergeLine(row, direction);\n      this.grid[r] = merged;\n      if (hasMoved) moved = true;\n    }\n    return moved;\n  }\n  mergeLine(line, direction) {\n    const nonNull = line.filter(tile => tile !== null);\n    const newLine = [];\n    let hasMoved = false;\n    if (direction === 1) nonNull.reverse();\n    for (let i = 0; i < nonNull.length; i++) {\n      if (i < nonNull.length - 1 && nonNull[i].value === nonNull[i + 1].value) {\n        newLine.push(new _Tile_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](nonNull[i].value * 2));\n        this.score += nonNull[i].value * 2;\n        i++;\n        hasMoved = true;\n      } else {\n        newLine.push(nonNull[i]);\n      }\n    }\n    while (newLine.length < this.size) {\n      newLine.push(null);\n    }\n    if (direction === 1) newLine.reverse();\n    for (let i = 0; i < this.size; i++) {\n      if (line[i] !== newLine[i]) {\n        hasMoved = true;\n      }\n    }\n    return {\n      merged: newLine,\n      hasMoved\n    };\n  }\n  handleInput() {\n    window.addEventListener('keydown', e => {\n      if (this.moving) return;\n      const directions = {\n        ArrowUp: 'up',\n        ArrowDown: 'down',\n        ArrowLeft: 'left',\n        ArrowRight: 'right'\n      };\n      if (directions[e.key]) {\n        this.move(directions[e.key]);\n      }\n    });\n    let touchStartX = 0;\n    let touchStartY = 0;\n    let touchEndX = 0;\n    let touchEndY = 0;\n    this.canvas.addEventListener('touchstart', e => {\n      touchStartX = e.touches[0].clientX;\n      touchStartY = e.touches[0].clientY;\n    });\n    this.canvas.addEventListener('touchend', e => {\n      touchEndX = e.changedTouches[0].clientX;\n      touchEndY = e.changedTouches[0].clientY;\n      const deltaX = touchEndX - touchStartX;\n      const deltaY = touchEndY - touchStartY;\n      if (this.moving) return;\n      if (Math.abs(deltaX) > Math.abs(deltaY)) {\n        if (deltaX > 0) {\n          this.move('right');\n        } else {\n          this.move('left');\n        }\n      } else {\n        if (deltaY > 0) {\n          this.move('down');\n        } else {\n          this.move('up');\n        }\n      }\n    });\n  }\n  checkGameOver() {\n    for (let r = 0; r < this.size; r++) {\n      for (let c = 0; c < this.size; c++) {\n        if (this.grid[r][c] === null) return false;\n        if (r < this.size - 1 && this.grid[r][c].value === this.grid[r + 1][c]?.value) return false;\n        if (c < this.size - 1 && this.grid[r][c].value === this.grid[r][c + 1]?.value) return false;\n      }\n    }\n    return true;\n  }\n  resetGame() {\n    this.grid = this.createGrid();\n    this.score = 0;\n    this.addRandomTile();\n    this.addRandomTile();\n    this.draw();\n  }\n  draw() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    const cellSize = this.canvas.width / this.size;\n    this.ctx.fillStyle = '#bbada0';\n    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n    for (let r = 0; r < this.size; r++) {\n      for (let c = 0; c < this.size; c++) {\n        const x = c * cellSize;\n        const y = r * cellSize;\n        this.ctx.fillStyle = '#cdc1b4';\n        this.ctx.fillRect(x, y, cellSize - 5, cellSize - 5);\n        const tile = this.grid[r][c];\n        if (tile) {\n          this.ctx.fillStyle = tile.getColor();\n          this.ctx.fillRect(x, y, cellSize - 5, cellSize - 5);\n          this.ctx.fillStyle = '#776e65';\n          this.ctx.font = '20px Arial';\n          this.ctx.textAlign = 'center';\n          this.ctx.textBaseline = 'middle';\n          this.ctx.fillText(tile.value, x + cellSize / 2, y + cellSize / 2);\n        }\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://game_2048/./src/Game.js?");

/***/ }),

/***/ "./src/Tile.js":
/*!*********************!*\
  !*** ./src/Tile.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Tile)\n/* harmony export */ });\nclass Tile {\n  constructor(value) {\n    this.value = value;\n  }\n  getColor() {\n    const colors = {\n      2: '#eee4da',\n      4: '#ede0c8',\n      8: '#f2b179',\n      16: '#f59563',\n      32: '#f67c5f',\n      64: '#f65e3b',\n      128: '#edcf72',\n      256: '#edcc61',\n      512: '#edc850',\n      1024: '#edc53f',\n      2048: '#edc22e'\n    };\n    return colors[this.value] || '#3c3a32';\n  }\n}\n\n//# sourceURL=webpack://game_2048/./src/Tile.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game.js */ \"./src/Game.js\");\n\nconst canvas = document.getElementById('gameCanvas');\ncanvas.width = 400;\ncanvas.height = 400;\nconst game = new _Game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\ngame.start();\n\n//# sourceURL=webpack://game_2048/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;