/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Canvas.ts":
/*!***********************!*\
  !*** ./src/Canvas.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
const Images_1 = __importDefault(__webpack_require__(/*! ./Images */ "./src/Images.ts"));
const Helpers_1 = __importDefault(__webpack_require__(/*! ./Helpers */ "./src/Helpers.ts"));
const Sorcerer_1 = __importDefault(__webpack_require__(/*! ./Monsters/Sorcerer */ "./src/Monsters/Sorcerer.ts"));
const Demon_1 = __importDefault(__webpack_require__(/*! ./Monsters/Demon */ "./src/Monsters/Demon.ts"));
const Consts_1 = __webpack_require__(/*! ./Consts */ "./src/Consts.ts");
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
class Canvas {
    constructor() {
        this.width = 1285;
        this.height = 960;
        this.multiplier = 5;
        this.renderedViewX = 0;
        this.renderedViewY = 0;
        this.raf = 0;
        this.endingFrame = 0;
        this.oldTime = 0;
        this.newTime = 0;
        this.deltaTime = 0;
        this.fps = 0;
        this.canvasTag = document.getElementById("canvas");
        this.ctx = this.canvasTag.getContext("2d");
        this.canvasTag.width = this.width;
        this.canvasTag.height = this.height;
        this.ctx.imageSmoothingEnabled = false;
    }
    drawStartScreen() {
        this.ctx.drawImage(Images_1.default.assets.startScreen, 0, 0, 320, 200, 0, 0, 1285, 960);
    }
    drawLevelTitleScreen(levelNumber) {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, 1285, 960);
        const levelLength = levelNumber.toString().length;
        let levelDigits = [];
        for (let i = 0; i < 3 - levelLength; i++)
            levelDigits.push(0);
        for (let i = 0; i < levelLength; i++)
            levelDigits.push(parseInt(levelNumber.toString().charAt(i)));
        this.ctx.drawImage(Images_1.default.assets.bigNumbers, 171, MainCharacter_1.default.sourceCol * 17, 95, 16, 320, 370, 95 * (this.multiplier - 1), 16 * (this.multiplier - 1));
        for (let i = 0; i < 3; i++) {
            this.ctx.drawImage(Images_1.default.assets.bigNumbers, levelDigits[i] * 17, MainCharacter_1.default.sourceCol * 17, 16, 16, 740 + 16 * this.multiplier * i, 370, 16 * (this.multiplier - 1), 16 * (this.multiplier - 1));
        }
    }
    renderGameFrame() {
        if (Game_1.default.gameMap.stopGame)
            return;
        this.oldTime = this.newTime;
        this.newTime = Date.now();
        this.deltaTime = (this.newTime - this.oldTime);
        //draw background
        this.ctx.fillStyle = '#7a7a7a';
        this.ctx.fillRect(0, 0, 257 * this.multiplier, 152 * this.multiplier);
        this.drawWalls();
        this.drawItems();
        Game_1.default.gameMap.moveMonsters();
        MainCharacter_1.default.animateCharacter();
        this.drawCharacter();
        this.drawMonsters();
        // bottom bar
        this.ctx.drawImage(Images_1.default.assets.bottomBar, 0, 0, 257, 40, 0 * this.multiplier, 152 * this.multiplier, 257 * this.multiplier, 40 * this.multiplier);
        this.drawScoreAndHealth();
        // fps in the corner
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText((1.0 / (this.deltaTime / 1000)).toFixed(0).toString(), 0, 786);
        this.raf = window.requestAnimationFrame(() => this.renderGameFrame());
    }
    drawWalls() {
        var _a, _b, _c, _d;
        const startIndexes = Helpers_1.default.getStartIndexes();
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 11; j++) {
                if (((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[startIndexes.y * 2 + j * 2]) === null || _b === void 0 ? void 0 : _b[startIndexes.x * 2 + i * 2]) > 19)
                    continue;
                this.ctx.drawImage(Images_1.default.assets.walls, (((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[startIndexes.y * 2 + j * 2]) === null || _d === void 0 ? void 0 : _d[startIndexes.x * 2 + i * 2]) * 17) - 17, 0, 16, 16, -this.renderedViewX % 80 + i * 80, -this.renderedViewY % 80 + j * 80, 16 * this.multiplier, 16 * this.multiplier);
            }
        }
    }
    drawItems() {
        var _a, _b;
        const startIndexes = Helpers_1.default.getStartIndexes();
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 11; j++) {
                this.ctx.drawImage(Images_1.default.assets.items, ((((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[startIndexes.y * 2 + j * 2]) === null || _b === void 0 ? void 0 : _b[startIndexes.x * 2 + i * 2]) - 19) * 17) - 17, 0, 16, 16, -this.renderedViewX % 80 + i * 80, -this.renderedViewY % 80 + j * 80, 16 * this.multiplier, 16 * this.multiplier);
            }
        }
    }
    drawCharacter() {
        this.ctx.drawImage(Images_1.default.assets.mainCharacters, MainCharacter_1.default.lastDirection[0] * 17 + MainCharacter_1.default.sourceCol * 136, MainCharacter_1.default.lastDirection[1] * 17, 16, 16, MainCharacter_1.default.xCoord - this.renderedViewX, MainCharacter_1.default.yCoord - this.renderedViewY, 16 * this.multiplier, 16 * this.multiplier);
        MainCharacter_1.default.weapon.draw({ x: this.renderedViewX, y: this.renderedViewY });
    }
    drawMonsters() {
        const startIndexes = Helpers_1.default.getStartIndexes();
        const playerCoords = MainCharacter_1.default.getCoordinates(MainCharacter_1.default.xCoord, MainCharacter_1.default.yCoord);
        Game_1.default.gameMap.arrayOfMonsters.forEach((monster) => {
            monster.lookAtMe(playerCoords[0] * 2, playerCoords[1] * 2);
            if (monster instanceof Sorcerer_1.default && monster.isVisible === false)
                return;
            if (monster instanceof Demon_1.default)
                monster.animateFireball({ x: this.renderedViewX, y: this.renderedViewY });
            if (monster.xPosition >= startIndexes.x * 2 &&
                monster.xPosition <= startIndexes.x * 2 + 34 &&
                monster.yPosition >= startIndexes.y * 2 &&
                monster.yPosition <= startIndexes.y * 2 + 22) {
                this.ctx.drawImage(Images_1.default.assets.monsters, (monster.sourceColumn * 8 + monster.lookingDirection) * 17, (Game_1.default.gameMap.universalMonstersFrameIndex % 3) * 17, 16, 16, -this.renderedViewX % 80 + (monster.xPosition - startIndexes.x * 2) * 40, -this.renderedViewY % 80 + (monster.yPosition - startIndexes.y * 2) * 40, 16 * this.multiplier, 16 * this.multiplier);
            }
        });
        Game_1.default.gameMap.arrayOfGoblins.forEach((goblin) => {
            //goblin.renderRock(startIndexes)
            if (goblin.xPosition >= startIndexes.x * 2 &&
                goblin.xPosition <= startIndexes.x * 2 + 34 &&
                goblin.yPosition >= startIndexes.y * 2 &&
                goblin.yPosition <= startIndexes.y * 2 + 22) {
                this.ctx.drawImage(Images_1.default.assets.monsters, (goblin.sourceColumn * 8 + 4) * 17, (Game_1.default.gameMap.universalMonstersFrameIndex % 3) * 17, 16, 16, -this.renderedViewX % 80 + (goblin.xPosition - startIndexes.x * 2) * 40, -this.renderedViewY % 80 + (goblin.yPosition - startIndexes.y * 2) * 40, 16 * this.multiplier, 16 * this.multiplier);
            }
        });
    }
    drawScoreAndHealth() {
        const scoreLength = MainCharacter_1.default.score.toString().length;
        let scoreDigits = [];
        for (let i = 0; i < 6 - scoreLength; i++)
            scoreDigits.push(0);
        for (let i = 0; i < scoreLength; i++)
            scoreDigits.push(parseInt(MainCharacter_1.default.score.toString().charAt(i)));
        for (let i = 0; i < 6; i++) {
            if (Images_1.default.assets.numbers === undefined)
                continue;
            this.ctx.drawImage(Images_1.default.assets.numbers, scoreDigits[i] * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, 41 + 8 * this.multiplier * i, 176 * this.multiplier, 8 * this.multiplier, 8 * this.multiplier);
        }
        const healthLength = MainCharacter_1.default.health.toString().length;
        let healthDigits = [];
        for (let i = 0; i < 4 - healthLength; i++)
            healthDigits.push(0);
        for (let i = 0; i < healthLength; i++)
            healthDigits.push(parseInt(MainCharacter_1.default.health.toString().charAt(i)));
        for (let i = 0; i < 6; i++) {
            this.ctx.drawImage(Images_1.default.assets.numbers, healthDigits[i] * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, 404 + 8 * this.multiplier * i, 176 * this.multiplier, 8 * this.multiplier, 8 * this.multiplier);
        }
        this.drawItemsAndAbilities();
    }
    drawItemsAndAbilities() {
        MainCharacter_1.default.ownedAbilities.forEach(ability => {
            switch (ability) {
                case 37: // lightblue elixir
                    this.drawIcon(14, 610, 160);
                    break;
                case 38: // green elixir
                    this.drawIcon(12, 121, 160);
                    break;
                case 39: // yellow elixir
                    this.drawIcon(10, 41, 160);
                    break;
                case 40: // purple elixir
                    this.drawIcon(11, 81, 160);
                    break;
                case 41: // brown elixir
                    this.drawIcon(13, 530, 160);
                    break;
            }
        });
        for (let i = 0; i < MainCharacter_1.default.keys; i++)
            this.drawIcon(15, 39 + 40 * i, 184);
        for (let i = 0; i < MainCharacter_1.default.potions; i++)
            this.drawIcon(16, 605 - 40 * i, 184);
    }
    drawIcon(sXIndex, dX, dY) {
        this.ctx.drawImage(Images_1.default.assets.numbers, sXIndex * 9, 0, 8, 8, dX, dY * this.multiplier, 8 * this.multiplier, 8 * this.multiplier);
    }
    drawAbilityScreen(itemIndex) {
        setTimeout(() => {
            this.ctx.drawImage(Images_1.default.assets.pickUpAbilityScreen, 0, 0, 321, 192, 0, 0, this.width, this.height - 40 * this.multiplier);
            this.ctx.drawImage(Images_1.default.assets.abilityTexts, 0, itemIndex * 8, 175, 7, 77 * 4, 111 * 4, 176 * (Consts_1.Constants.multiplier - 1), 8 * (Consts_1.Constants.multiplier - 1));
            this.ctx.drawImage(Images_1.default.assets.numbers, 154, MainCharacter_1.default.sourceCol * 9, 64, 8, 130 * 4, 70 * 4, 64 * (Consts_1.Constants.multiplier - 1), 9 * (Consts_1.Constants.multiplier - 1));
        }, 1);
    }
    animateEnding() {
        console.log('animate ending');
        this.oldTime = this.newTime;
        this.newTime = Date.now();
        this.deltaTime = (this.newTime - this.oldTime);
        //draw background
        this.ctx.fillStyle = '#7a7a7a';
        this.ctx.fillRect(0, 0, 257 * this.multiplier, 152 * this.multiplier);
        this.drawWalls();
        this.drawItems();
        Game_1.default.gameMap.moveMonsters();
        this.drawMonsters();
        // bottom bar
        this.ctx.drawImage(Images_1.default.assets.bottomBar, 0, 0, 257, 40, 0 * this.multiplier, 152 * this.multiplier, 257 * this.multiplier, 40 * this.multiplier);
        this.drawScoreAndHealth();
        // fps in the corner
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText((1.0 / (this.deltaTime / 1000)).toFixed(0).toString(), 0, 786);
        let imageSource = (this.endingFrame - this.endingFrame % 3) / 3;
        if (imageSource < 16) {
            this.ctx.drawImage(Images_1.default.assets.mainCharacters, (imageSource % 8) * 17 + MainCharacter_1.default.sourceCol * 136, 0, 16, 16, MainCharacter_1.default.xCoord - this.renderedViewX, MainCharacter_1.default.yCoord - this.renderedViewY, 16 * this.multiplier, 16 * this.multiplier);
        }
        else {
            this.ctx.drawImage(Images_1.default.assets.weapons, (imageSource - 16) * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, MainCharacter_1.default.xCoord - this.renderedViewX, MainCharacter_1.default.yCoord - this.renderedViewY, 8 * this.multiplier, 8 * this.multiplier);
        }
        this.endingFrame++;
        if (imageSource != 24)
            this.raf = window.requestAnimationFrame(() => this.animateEnding());
        else
            Game_1.default.restartGame();
    }
}
exports["default"] = new Canvas();


/***/ }),

/***/ "./src/Consts.ts":
/*!***********************!*\
  !*** ./src/Consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Constants = exports.TypesOfBlocks = void 0;
exports.TypesOfBlocks = {
    noTransition: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 30, 31],
    noTransitionForProjectile: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 34, 35],
    pickableItems: [26, 27, 28, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 30, 31],
    destroyableThings: [16, 17, 18, 20, 21, 22, 23, 24, 25, 33, 36, 37, 38, 39, 40, 41],
    destroyableThingsByHand: [20, 21, 22, 70, 71, 72, 73, 74, 75, 76, 77, 78, 30, 31, -81, -82, -83, -84],
    destroyableByDemons: [33, 36, 37, 38, 39, 40, 41],
    monsters: [-80, -81, -82, -83, -84, -85]
};
exports.Constants = {
    multiplier: 5
};


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const GameMap_1 = __importDefault(__webpack_require__(/*! ./GameMap */ "./src/GameMap.ts"));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
const SoundsHandler_1 = __importDefault(__webpack_require__(/*! ./SoundsHandler */ "./src/SoundsHandler.ts"));
const index_1 = __importDefault(__webpack_require__(/*! ./index */ "./src/index.ts"));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
const KeyboardEvents_1 = __importDefault(__webpack_require__(/*! ./KeyboardEvents */ "./src/KeyboardEvents.ts"));
class Game {
    constructor() {
        this.gameMap = new GameMap_1.default();
    }
    startGame(selectedCharacter, selectedMap) {
        return __awaiter(this, void 0, void 0, function* () {
            cancelAnimationFrame(Canvas_1.default.raf);
            yield this.gameMap.clearMap();
            KeyboardEvents_1.default.cleanEvents();
            Canvas_1.default.endingFrame = 0;
            yield this.gameMap.loadMap(selectedMap, selectedCharacter);
            this.launchGame();
        });
    }
    launchGame() {
        Canvas_1.default.drawLevelTitleScreen(this.gameMap.levelNumber);
        SoundsHandler_1.default.play("levelTitle");
        setTimeout(() => {
            SoundsHandler_1.default.play("startLevel");
            this.gameMap.stopGame = false;
            KeyboardEvents_1.default.disableEvents = false;
            Canvas_1.default.raf = window.requestAnimationFrame(() => Canvas_1.default.renderGameFrame());
            this.gameMap.setIntervals();
            MainCharacter_1.default.startLosingHPInterval();
        }, 4000);
    }
    restartGame() {
        if (this.gameMap.animateSpritesInterval !== null)
            clearInterval(this.gameMap.animateSpritesInterval);
        if (this.gameMap.spawningMonstersInterval !== null)
            clearInterval(this.gameMap.spawningMonstersInterval);
        index_1.default.createStartButton();
    }
}
exports["default"] = new Game();


/***/ }),

/***/ "./src/GameMap.ts":
/*!************************!*\
  !*** ./src/GameMap.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
const Demon_1 = __importDefault(__webpack_require__(/*! ./Monsters/Demon */ "./src/Monsters/Demon.ts"));
const Spawner_1 = __importDefault(__webpack_require__(/*! ./Spawner */ "./src/Spawner.ts"));
const Ghost_1 = __importDefault(__webpack_require__(/*! ./Monsters/Ghost */ "./src/Monsters/Ghost.ts"));
const Grunt_1 = __importDefault(__webpack_require__(/*! ./Monsters/Grunt */ "./src/Monsters/Grunt.ts"));
const Death_1 = __importDefault(__webpack_require__(/*! ./Monsters/Death */ "./src/Monsters/Death.ts"));
const Sorcerer_1 = __importDefault(__webpack_require__(/*! ./Monsters/Sorcerer */ "./src/Monsters/Sorcerer.ts"));
const Lobber_1 = __importDefault(__webpack_require__(/*! ./Monsters/Lobber */ "./src/Monsters/Lobber.ts"));
const Helpers_1 = __importDefault(__webpack_require__(/*! ./Helpers */ "./src/Helpers.ts"));
const KeyboardEvents_1 = __importDefault(__webpack_require__(/*! ./KeyboardEvents */ "./src/KeyboardEvents.ts"));
const Images_1 = __importDefault(__webpack_require__(/*! ./Images */ "./src/Images.ts"));
const SoundsHandler_1 = __importDefault(__webpack_require__(/*! ./SoundsHandler */ "./src/SoundsHandler.ts"));
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
class GameMap {
    constructor() {
        this.map = [[]];
        this.levelNumber = 0;
        this.numberOfXBlocks = 0;
        this.numberOfYBlocks = 0;
        this.xSizeInPixels = 0;
        this.ySizeInPixels = 0;
        this.universalBoxFrameIndex = 0;
        this.universalMonstersFrameIndex = 1;
        this.arrayOfMonsters = [];
        this.arrayOfGoblins = [];
        this.arrayOfSpawners = [];
        this.stopGame = false;
        this.moveMonstersTimestamp = 0;
        this.arrayOfMonstersToCreate = [];
        this.spawningMonstersInterval = null;
        this.animateSpritesInterval = null;
        this.portals = [];
        this.endOfLevel = () => {
            SoundsHandler_1.default.play("enteringExit");
            KeyboardEvents_1.default.disableEvents = true;
            KeyboardEvents_1.default.WKeyClicked = false;
            KeyboardEvents_1.default.SKeyClicked = false;
            KeyboardEvents_1.default.AKeyClicked = false;
            KeyboardEvents_1.default.DKeyClicked = false;
            KeyboardEvents_1.default.SpaceKeyClicked = false;
            MainCharacter_1.default.stopLosingHPInterval();
            cancelAnimationFrame(Canvas_1.default.raf);
            this.stopGame = true;
            Canvas_1.default.raf = requestAnimationFrame(() => Canvas_1.default.animateEnding());
        };
    }
    clearMap() {
        return __awaiter(this, void 0, void 0, function* () {
            this.map = [[]];
            this.arrayOfMonsters = [];
            this.arrayOfGoblins = [];
            this.arrayOfSpawners = [];
            this.arrayOfMonstersToCreate = [];
        });
    }
    loadMap(mapName, characterName) {
        return __awaiter(this, void 0, void 0, function* () {
            let characterNumber = 0;
            if (characterName === "Warrior")
                characterNumber = 0;
            else if (characterName === "Valkyrie")
                characterNumber = 1;
            else if (characterName === "Elf")
                characterNumber = 2;
            else if (characterName === "Wizard")
                characterNumber = 3;
            MainCharacter_1.default.sourceCol = characterNumber;
            const response = yield fetch(`./jsonMaps/map${mapName}.json`);
            const loadedData = yield response.json();
            Images_1.default.assets.bottomBar = yield Images_1.default.imageLoader("bottomBar" + characterNumber + ".png");
            this.map = this.createBiggerMap(loadedData.array);
            this.levelNumber = loadedData.levelNumber;
            this.arrayOfMonstersToCreate.forEach(monster => {
                this.createMonster(monster.x, monster.y, monster.id);
            });
            MainCharacter_1.default.xCoord = loadedData.characterStartCoords[0] * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.yCoord = loadedData.characterStartCoords[1] * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.coordsArrayIndexes = [loadedData.characterStartCoords[0] * 2, loadedData.characterStartCoords[1] * 2];
            Game_1.default.gameMap.setBlock2(MainCharacter_1.default.coordsArrayIndexes, -1);
            this.numberOfXBlocks = loadedData.width;
            this.numberOfYBlocks = loadedData.height;
            this.portals = loadedData.portals;
            this.xSizeInPixels = this.numberOfXBlocks * 16 * Canvas_1.default.multiplier;
            this.ySizeInPixels = this.numberOfYBlocks * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.score = loadedData.startScore;
            MainCharacter_1.default.health = loadedData.startHealth;
            MainCharacter_1.default.moveMap();
            yield Images_1.default.loadWallsTypeAndColor(loadedData.wallsColor, loadedData.wallsType);
        });
    }
    createBiggerMap(inputMap) {
        let doubledMap = [];
        inputMap.forEach((row, rowIndex) => {
            let doubledRow = [];
            row.forEach((cell, cellIndex) => {
                if ([20, 21, 22].includes(cell)) {
                    const itemNumber = this.createSpawner(cellIndex, rowIndex, cell);
                    doubledRow.push(itemNumber, itemNumber);
                }
                else if (cell >= 70 && cell <= 78) {
                    const itemNumber = this.createSpawner(cellIndex, rowIndex, cell);
                    doubledRow.push(itemNumber, itemNumber);
                }
                else if (cell <= -80 && cell >= -85) {
                    this.arrayOfMonstersToCreate.push({ x: cellIndex, y: rowIndex, id: cell * (-1) - 80 });
                    doubledRow.push(0, 0);
                }
                else
                    doubledRow.push(cell, cell);
            });
            doubledMap.push([...doubledRow], [...doubledRow]);
        });
        return doubledMap;
    }
    setOneField(x, y, value) {
        this.map[y][x] = value;
    }
    clearBlock(coords) {
        this.map[coords[1] * 2][coords[0] * 2] = 0;
        this.map[coords[1] * 2][coords[0] * 2 + 1] = 0;
        this.map[coords[1] * 2 + 1][coords[0] * 2] = 0;
        this.map[coords[1] * 2 + 1][coords[0] * 2 + 1] = 0;
    }
    clearBlock2(coords) {
        this.map[coords[1]][coords[0]] = 0;
        this.map[coords[1]][coords[0] + 1] = 0;
        this.map[coords[1] + 1][coords[0]] = 0;
        this.map[coords[1] + 1][coords[0] + 1] = 0;
    }
    setBlock(coords, newValue) {
        this.map[coords[1] * 2][coords[0] * 2] = newValue;
        this.map[coords[1] * 2][coords[0] * 2 + 1] = newValue;
        this.map[coords[1] * 2 + 1][coords[0] * 2] = newValue;
        this.map[coords[1] * 2 + 1][coords[0] * 2 + 1] = newValue;
    }
    setBlock2(coords, newValue) {
        this.map[coords[1]][coords[0]] = newValue;
        this.map[coords[1]][coords[0] + 1] = newValue;
        this.map[coords[1] + 1][coords[0]] = newValue;
        this.map[coords[1] + 1][coords[0] + 1] = newValue;
    }
    timesUp() {
        MainCharacter_1.default.health = 0;
        cancelAnimationFrame(Canvas_1.default.raf);
        Canvas_1.default.drawScoreAndHealth();
    }
    pickingUpAbility(itemIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            Game_1.default.gameMap.stopGame = true;
            MainCharacter_1.default.stopLosingHPInterval();
            Canvas_1.default.drawAbilityScreen(itemIndex);
            SoundsHandler_1.default.play("pickedAbility");
            setTimeout(() => {
                this.stopGame = false;
                Canvas_1.default.raf = window.requestAnimationFrame(() => Canvas_1.default.renderGameFrame());
                MainCharacter_1.default.startLosingHPInterval();
            }, 2000);
        });
    }
    setIntervals() {
        this.animateSpritesInterval = setInterval(() => {
            var _a, _b, _c, _d;
            const startIndexes = Helpers_1.default.getStartIndexes();
            for (let i = 0; i < 17; i++) {
                for (let j = 0; j < 11; j++) {
                    if ([26, 27, 28].includes((_b = (_a = this.map) === null || _a === void 0 ? void 0 : _a[startIndexes.y * 2 + j * 2]) === null || _b === void 0 ? void 0 : _b[startIndexes.x * 2 + i * 2]))
                        this.map[startIndexes.y * 2 + j * 2][startIndexes.x * 2 + i * 2] = 26 + this.universalBoxFrameIndex;
                    if ([42, 43, 44].includes((_d = (_c = this.map) === null || _c === void 0 ? void 0 : _c[startIndexes.y * 2 + j * 2]) === null || _d === void 0 ? void 0 : _d[startIndexes.x * 2 + i * 2]))
                        this.map[startIndexes.y * 2 + j * 2][startIndexes.x * 2 + i * 2] = 42 + this.universalBoxFrameIndex;
                }
            }
            this.universalBoxFrameIndex++;
            if (this.universalBoxFrameIndex == 3)
                this.universalBoxFrameIndex = 0;
            if (this.universalMonstersFrameIndex == 1)
                this.universalMonstersFrameIndex = 3;
            else if (this.universalMonstersFrameIndex == 3)
                this.universalMonstersFrameIndex = 2;
            else if (this.universalMonstersFrameIndex == 2)
                this.universalMonstersFrameIndex = 6;
            else if (this.universalMonstersFrameIndex == 6)
                this.universalMonstersFrameIndex = 1;
        }, 150);
        this.spawningMonstersInterval = setInterval(() => {
            this.spawnMonsters();
        }, 500);
    }
    isFieldClear(x, y) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x]) == 0 &&
            ((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[y]) === null || _d === void 0 ? void 0 : _d[x + 1]) == 0 &&
            ((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[y + 1]) === null || _f === void 0 ? void 0 : _f[x]) == 0 &&
            ((_h = (_g = Game_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[y + 1]) === null || _h === void 0 ? void 0 : _h[x + 1]) == 0)
            return true;
        return false;
    }
    isSmallFieldClear(x, y) {
        var _a, _b;
        if (((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x]) === 0)
            return true;
        return false;
    }
    moveMonsters() {
        this.moveMonstersTimestamp++;
        if (this.moveMonstersTimestamp != 10) {
            return;
        }
        else
            this.moveMonstersTimestamp = 0;
        const startIndexes = Helpers_1.default.getStartIndexes2();
        this.arrayOfMonsters.forEach(monster => {
            monster.moved = false;
            if (monster.xPosition < startIndexes.x)
                monster.moved = true;
            if (monster.xPosition > startIndexes.x + 34)
                monster.moved = true;
            if (monster.yPosition < startIndexes.y)
                monster.moved = true;
            if (monster.yPosition > startIndexes.y + 22)
                monster.moved = true;
        });
        const playersCoords = MainCharacter_1.default.getCoordinates2(MainCharacter_1.default.xCoord, MainCharacter_1.default.yCoord);
        this.arrayOfMonsters.forEach(monster => {
            if (monster.moved)
                return;
            monster.distanceFromPlayer = Math.pow((playersCoords[0] - monster.xPosition), 2) + Math.pow((playersCoords[1] - monster.yPosition), 2);
        });
        this.arrayOfMonsters = this.arrayOfMonsters.filter((monster) => {
            if (monster.distanceFromPlayer !== 4)
                return true;
            if (monster.sourceColumn === 0) {
                monster.die(true);
                SoundsHandler_1.default.play("gotHitByGhost");
                MainCharacter_1.default.changeHealth(-5);
                return false;
            }
            else if (monster.sourceColumn === 5) {
                MainCharacter_1.default.changeHealth(-1);
                SoundsHandler_1.default.play("gotHitByDeath");
                return true;
            }
            else {
                MainCharacter_1.default.changeHealth(-5);
                SoundsHandler_1.default.play("gotHitByGruntDemon");
                return true;
            }
        });
        for (let i = 0; i < 1000; i++) {
            this.arrayOfMonsters.forEach(monster => {
                if (monster.distanceFromPlayer != i)
                    return;
                const oldCoords = [monster.xPosition, monster.yPosition];
                this.clearBlock2([monster.xPosition, monster.yPosition]);
                switch (monster.lookingDirection) {
                    case 0:
                        if (!this.isSmallFieldClear(monster.xPosition, monster.yPosition - 1) ||
                            !this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition - 1))
                            break;
                        monster.yPosition--;
                        break;
                    case 1:
                        if (this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition - 1) &&
                            this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition - 1) &&
                            this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition)) {
                            monster.yPosition--;
                            monster.xPosition++;
                            break; //1
                        }
                        if (this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition) &&
                            this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition + 1)) {
                            monster.xPosition++;
                            break; //2
                        }
                        if (this.isSmallFieldClear(monster.xPosition, monster.yPosition - 1) &&
                            this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition - 1)) {
                            monster.yPosition--;
                            break; // 0
                        }
                        break;
                    case 2:
                        if (!this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition) ||
                            !this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition + 1))
                            break;
                        monster.xPosition++;
                        break;
                    case 3:
                        if (this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition + 2) &&
                            this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition + 1) &&
                            this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition + 2)) {
                            monster.yPosition++;
                            monster.xPosition++;
                            break; //3
                        }
                        if (this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition) &&
                            this.isSmallFieldClear(monster.xPosition + 2, monster.yPosition + 1)) {
                            monster.xPosition++;
                            break; //2
                        }
                        if (this.isSmallFieldClear(monster.xPosition, monster.yPosition + 2) &&
                            this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition + 2)) {
                            monster.yPosition++;
                            break; //4
                        }
                        break;
                    case 4:
                        if (!this.isSmallFieldClear(monster.xPosition, monster.yPosition + 2) ||
                            !this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition + 2))
                            break;
                        monster.yPosition++;
                        break;
                    case 5:
                        if (this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition + 1) &&
                            this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition + 2) &&
                            this.isSmallFieldClear(monster.xPosition, monster.yPosition + 2)) {
                            monster.yPosition++;
                            monster.xPosition--;
                            break; //5
                        }
                        if (this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition) &&
                            this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition + 1)) {
                            monster.xPosition--;
                            break; // 6
                        }
                        if (this.isSmallFieldClear(monster.xPosition, monster.yPosition + 2) &&
                            this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition + 2)) {
                            monster.yPosition++;
                            break; // 4
                        }
                        break;
                    case 6:
                        if (!this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition) ||
                            !this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition + 1))
                            break; //6
                        monster.xPosition--;
                        break;
                    case 7:
                        if (this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition - 1) &&
                            this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition) &&
                            this.isSmallFieldClear(monster.xPosition, monster.yPosition - 1)) {
                            monster.yPosition--;
                            monster.xPosition--;
                            break; //7
                        }
                        if (this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition) &&
                            this.isSmallFieldClear(monster.xPosition - 1, monster.yPosition + 1)) {
                            monster.xPosition--;
                            break; //6
                        }
                        if (this.isSmallFieldClear(monster.xPosition, monster.yPosition - 1) &&
                            this.isSmallFieldClear(monster.xPosition + 1, monster.yPosition - 1)) {
                            monster.yPosition--;
                            break; //0
                        }
                        break;
                }
                breakMe: if (monster instanceof Sorcerer_1.default) {
                    if (oldCoords[0] === monster.xPosition && oldCoords[1] === monster.yPosition) {
                        monster.isVisible = true;
                        break breakMe;
                    }
                    if (monster.isVisible) {
                        const rand = Math.floor(Math.random() * 5);
                        if (rand === 0)
                            monster.isVisible = false;
                    }
                    else {
                        monster.isVisible = true;
                    }
                }
                if (monster instanceof Demon_1.default)
                    monster.checkForShoot();
                this.setBlock2([monster.xPosition, monster.yPosition], monster.id);
            });
        }
    }
    clearMapFromMonstersAndSpawners(itemUsed) {
        if (MainCharacter_1.default.potions === 0 && itemUsed)
            return;
        const startIndexes = Helpers_1.default.getStartIndexes();
        SoundsHandler_1.default.play("destroyBottle");
        this.arrayOfMonsters = this.arrayOfMonsters.filter(monster => {
            if (monster.xPosition >= startIndexes.x * 2 &&
                monster.xPosition <= startIndexes.x * 2 + 34 &&
                monster.yPosition >= startIndexes.y * 2 &&
                monster.yPosition <= startIndexes.y * 2 + 22) {
                monster.die(true);
                return false;
            }
            return true;
        });
        this.arrayOfGoblins = this.arrayOfGoblins.filter(goblin => {
            if (goblin.xPosition >= startIndexes.x * 2 &&
                goblin.xPosition <= startIndexes.x * 2 + 34 &&
                goblin.yPosition >= startIndexes.y * 2 &&
                goblin.yPosition <= startIndexes.y * 2 + 22) {
                goblin.die(true);
                return false;
            }
            return true;
        });
        this.arrayOfSpawners = this.arrayOfSpawners.filter(spawner => {
            if (spawner.xPosition >= startIndexes.x * 2 &&
                spawner.xPosition <= startIndexes.x * 2 + 34 &&
                spawner.yPosition >= startIndexes.y * 2 &&
                spawner.yPosition <= startIndexes.y * 2 + 22) {
                spawner.destroyed();
                return false;
            }
            return true;
        });
        if (itemUsed)
            MainCharacter_1.default.potions--;
    }
    createSpawner(x, y, value) {
        let returnItemIndex = value;
        switch (value) {
            case 20:
            case 21:
            case 22:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 0));
                break;
            case 70:
            case 71:
            case 72:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 1));
                returnItemIndex -= 47;
                break;
            case 73:
            case 74:
            case 75:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 2));
                returnItemIndex -= 50;
                break;
            case 76:
            case 77:
            case 78:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 3));
                returnItemIndex -= 53;
                break;
        }
        return returnItemIndex;
    }
    createMonster(x, y, mobId) {
        const sourceColumn = mobId;
        switch (sourceColumn) {
            case 0:
                this.arrayOfMonsters.push(new Ghost_1.default(0, 5, 5, x * 2, y * 2, 5));
                break;
            case 1:
                this.arrayOfMonsters.push(new Grunt_1.default(1, 5, 5, x * 2, y * 2, 5));
                break;
            case 2:
                this.arrayOfMonsters.push(new Demon_1.default(2, 5, 5, x * 2, y * 2, 5));
                break;
            case 3:
                this.arrayOfMonsters.push(new Sorcerer_1.default(3, 5, 5, x * 2, y * 2, 5));
                break;
            case 4:
                this.arrayOfGoblins.push(new Lobber_1.default(4, 5, 5, x * 2, y * 2, 5));
                break;
            case 5:
                this.arrayOfMonsters.push(new Death_1.default(5, 5, 5, x * 2, y * 2, 5));
                break;
        }
    }
    spawnMonsters() {
        const startIndexes = Helpers_1.default.getStartIndexes2();
        this.arrayOfSpawners.forEach(spawner => {
            if (spawner.xPosition < startIndexes.x)
                return;
            if (spawner.xPosition > startIndexes.x + 34)
                return;
            if (spawner.yPosition < startIndexes.y)
                return;
            if (spawner.yPosition > startIndexes.y + 22)
                return;
            spawner.lastTimeSpawnedSomething++;
            if (spawner.lastTimeSpawnedSomething !== spawner.timeToSpawn)
                return;
            this.spawnMonster(spawner.xPosition, spawner.yPosition, spawner.mob);
            spawner.lastTimeSpawnedSomething = 0;
            spawner.timeToSpawn = Math.floor(Math.random() * 6) + 1;
        });
    }
    spawnMonster(x, y, mobId) {
        let possibleDirections = [0, 1, 2, 3, 4, 5, 6, 7];
        for (let i = 0; i < 8; i++) {
            let chosenDirection = Math.floor(Math.random() * possibleDirections.length);
            let newCoords = this.directionToCoords(x, y, chosenDirection);
            if (this.isFieldClear(newCoords.x, newCoords.y)) {
                //this.arrayOfMonsters.push(new Monster(mobId, 5, 5 ,newCoords.x, newCoords.y, 0))
                this.createMonster(newCoords.x / 2, newCoords.y / 2, mobId);
                return;
            }
            else
                possibleDirections.splice(possibleDirections.indexOf(chosenDirection), 1);
        }
    }
    deleteSpawner(coords) {
        this.arrayOfSpawners = this.arrayOfSpawners.filter(spawner => {
            if (spawner.xPosition == coords[0] * 2 && spawner.yPosition == coords[1] * 2)
                return false;
            return true;
        });
    }
    directionToCoords(x, y, direction) {
        switch (direction) {
            case 0:
                return { x: x, y: y - 2 };
            case 1:
                return { x: x + 2, y: y - 2 };
            case 2:
                return { x: x + 2, y: y };
            case 3:
                return { x: x + 2, y: y + 2 };
            case 4:
                return { x: x, y: y + 2 };
            case 5:
                return { x: x - 2, y: y + 2 };
            case 6:
                return { x: x - 2, y: y };
            case 7:
                return { x: x - 2, y: y - 2 };
        }
    }
    findGlass(x, y) {
        if (Game_1.default.gameMap.map[y][x] === 30 || Game_1.default.gameMap.map[y][x] === 31) {
            Game_1.default.gameMap.map[y][x] = 0;
            Game_1.default.gameMap.map[y + 1][x] = 0;
            Game_1.default.gameMap.map[y + 1][x + 1] = 0;
            Game_1.default.gameMap.map[y][x + 1] = 0;
            this.findGlass(x, y + 2);
            this.findGlass(x, y - 2);
            this.findGlass(x + 2, y);
            this.findGlass(x - 2, y);
        }
        else
            return;
    }
    teleport() {
        console.log("teleport");
        this.portals.forEach((portalConnection, index) => {
            portalConnection.forEach((portal, index2) => {
                if (portal[0] != MainCharacter_1.default.coordsArrayIndexes[0] / 2 ||
                    portal[1] != MainCharacter_1.default.coordsArrayIndexes[1] / 2)
                    return;
                let targetPortalCoords;
                if (index2 == 0)
                    targetPortalCoords = portalConnection[1];
                else
                    targetPortalCoords = portalConnection[0];
                let res = this.findPlaceToTeleport([targetPortalCoords[0] * 2, targetPortalCoords[1] * 2]);
                if (res === null)
                    return;
                MainCharacter_1.default.coordsArrayIndexes = [res[0], res[1]];
                Game_1.default.gameMap.setBlock2(MainCharacter_1.default.coordsArrayIndexes, 0);
                MainCharacter_1.default.xCoord = res[0] / 2 * 16 * Canvas_1.default.multiplier;
                MainCharacter_1.default.yCoord = res[1] / 2 * 16 * Canvas_1.default.multiplier;
                Game_1.default.gameMap.setBlock2(MainCharacter_1.default.coordsArrayIndexes, -1);
                MainCharacter_1.default.moveMap();
            });
        });
    }
    findPlaceToTeleport(coords) {
        if (this.isFieldClear(coords[0] + 2, coords[1]))
            return [coords[0] + 2, coords[1]];
        else if (this.isFieldClear(coords[0], coords[1] + 2))
            return [coords[0], coords[1] + 2];
        else if (this.isFieldClear(coords[0] - 2, coords[1]))
            return [coords[0] - 2, coords[1]];
        else if (this.isFieldClear(coords[0], coords[1] - 2))
            return [coords[0], coords[1] - 2];
        else
            return null;
    }
}
exports["default"] = GameMap;


/***/ }),

/***/ "./src/Helpers.ts":
/*!************************!*\
  !*** ./src/Helpers.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
class Helpers {
    getStartIndexes() {
        let x = Canvas_1.default.renderedViewX - Canvas_1.default.renderedViewX % 80;
        let y = Canvas_1.default.renderedViewY - Canvas_1.default.renderedViewY % 80;
        return { x: x / 80, y: y / 80 };
    }
    getStartIndexes2() {
        let x = Canvas_1.default.renderedViewX - Canvas_1.default.renderedViewX % 40;
        let y = Canvas_1.default.renderedViewY - Canvas_1.default.renderedViewY % 40;
        return { x: x / 40, y: y / 40 };
    }
    replaceColorInCanvas(canvas, sourceColor, targetColor, tolerance) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        // Get the canvas dimensions
        const width = canvas.width;
        const height = canvas.height;
        // Create an image data object
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        // Convert the source and target colors to RGB format
        const sourceRGB = this.hexToRGB(sourceColor);
        const targetRGB = this.hexToRGB(targetColor);
        // Calculate the color difference threshold
        const threshold = Math.sqrt(3 * tolerance * tolerance);
        // Iterate through each pixel in the canvas
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // Calculate the color difference between the pixel and the source color
            const colorDifference = this.calculateColorDifference(sourceRGB, { r, g, b });
            // If the color difference is within the tolerance, replace the color
            if (colorDifference <= threshold) {
                data[i] = targetRGB.r;
                data[i + 1] = targetRGB.g;
                data[i + 2] = targetRGB.b;
            }
        }
        // Put the modified image data back to the canvas
        ctx.putImageData(imageData, 0, 0);
    }
    hexToRGB(hex) {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }
    calculateColorDifference(color1, color2) {
        const dr = color1.r - color2.r;
        const dg = color1.g - color2.g;
        const db = color1.b - color2.b;
        return Math.sqrt(dr * dr + dg * dg + db * db);
    }
}
exports["default"] = new Helpers();


/***/ }),

/***/ "./src/Images.ts":
/*!***********************!*\
  !*** ./src/Images.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Helpers_1 = __importDefault(__webpack_require__(/*! ./Helpers */ "./src/Helpers.ts"));
class Images {
    constructor() {
        this._assets = null;
    }
    get assets() {
        if (this._assets === null)
            throw new Error('Cannot access assets which are not loaded.');
        return this._assets;
    }
    loadImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const [abilityTexts, bigNumbers, items, levelTitleScreen, mainCharacters, monsters, numbers, pickUpAbilityScreen, startScreen, walls, wallsOrigin, weapons] = yield Promise.all([
                this.imageLoader("abilityTexts.png"),
                this.imageLoader("bigNumbers.png"),
                this.imageLoader("items.png"),
                this.imageLoader("levelTitleScreen.png"),
                this.imageLoader("mainCharacters.png"),
                this.imageLoader("monsters.png"),
                this.imageLoader("numbers.png"),
                this.imageLoader("pickUpAbilityScreen.png"),
                this.imageLoader("startScreen.png"),
                this.imageLoader("walls.png"),
                this.imageLoader("walls.png"),
                this.imageLoader("weapons.png")
            ]);
            this._assets = {
                abilityTexts,
                bigNumbers,
                items,
                levelTitleScreen,
                mainCharacters,
                monsters,
                numbers,
                pickUpAbilityScreen,
                startScreen,
                weapons,
                bottomBar: new Image(),
                walls,
                wallsOrigin
            };
        });
    }
    imageLoader(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                let photo = new Image();
                photo.src = "images/" + fileName;
                photo.onload = () => resolve(photo);
            });
        });
    }
    loadWallsTypeAndColor(wallsColor, wallsType) {
        return __awaiter(this, void 0, void 0, function* () {
            let canvas = document.createElement("canvas");
            canvas.width = 322;
            canvas.height = 16;
            let context = canvas.getContext("2d");
            context.imageSmoothingEnabled = false;
            context.drawImage(this.assets.wallsOrigin, 0, 17 * wallsType, 322, 16, 0, 0, 322, 16);
            Helpers_1.default.replaceColorInCanvas(canvas, "#6049ed", wallsColor, 30);
            context.save();
            let img = document.createElement("img");
            img.src = canvas.toDataURL();
            if (this._assets != null)
                this._assets.walls = img;
        });
    }
}
exports["default"] = new Images();


/***/ }),

/***/ "./src/Interfaces.ts":
/*!***************************!*\
  !*** ./src/Interfaces.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Directions = void 0;
var Directions;
(function (Directions) {
    Directions[Directions["TOP"] = 0] = "TOP";
    Directions[Directions["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    Directions[Directions["RIGHT"] = 2] = "RIGHT";
    Directions[Directions["BOTTOM_RIGHT"] = 3] = "BOTTOM_RIGHT";
    Directions[Directions["BOTTOM"] = 4] = "BOTTOM";
    Directions[Directions["BOTTOM_LEFT"] = 5] = "BOTTOM_LEFT";
    Directions[Directions["LEFT"] = 6] = "LEFT";
    Directions[Directions["TOP_LEFT"] = 7] = "TOP_LEFT";
})(Directions = exports.Directions || (exports.Directions = {}));


/***/ }),

/***/ "./src/KeyboardEvents.ts":
/*!*******************************!*\
  !*** ./src/KeyboardEvents.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
class KeyboardEvents {
    constructor() {
        this.WKeyClicked = false;
        this.SKeyClicked = false;
        this.AKeyClicked = false;
        this.DKeyClicked = false;
        this.SpaceKeyClicked = false;
        this.stackOfClicks = [];
        this.disableEvents = false;
    }
    addListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            addEventListener("keydown", (event) => {
                if (this.disableEvents)
                    return;
                if (event.code === "KeyW") {
                    this.WKeyClicked = true;
                    if (!this.stackOfClicks.includes("W"))
                        this.stackOfClicks.push("W");
                }
                if (event.code === "KeyS") {
                    this.SKeyClicked = true;
                    if (!this.stackOfClicks.includes("S"))
                        this.stackOfClicks.push("S");
                }
                if (event.code === "KeyA") {
                    this.AKeyClicked = true;
                    if (!this.stackOfClicks.includes("A"))
                        this.stackOfClicks.push("A");
                }
                if (event.code === "KeyD") {
                    this.DKeyClicked = true;
                    if (!this.stackOfClicks.includes("D"))
                        this.stackOfClicks.push("D");
                }
                if (event.code === "Space") {
                    this.SpaceKeyClicked = true;
                }
            });
            addEventListener("keyup", (event) => {
                if (this.disableEvents)
                    return;
                if (event.code === "KeyW") {
                    this.WKeyClicked = false;
                    this.stackOfClicks.splice(this.stackOfClicks.indexOf("W"), 1);
                }
                if (event.code === "KeyS") {
                    this.SKeyClicked = false;
                    this.stackOfClicks.splice(this.stackOfClicks.indexOf("S"), 1);
                }
                if (event.code === "KeyA") {
                    this.AKeyClicked = false;
                    this.stackOfClicks.splice(this.stackOfClicks.indexOf("A"), 1);
                }
                if (event.code === "KeyD") {
                    this.DKeyClicked = false;
                    this.stackOfClicks.splice(this.stackOfClicks.indexOf("D"), 1);
                }
                if (event.code === "Space")
                    this.SpaceKeyClicked = false;
                if (event.code === "KeyC")
                    Game_1.default.gameMap.clearMapFromMonstersAndSpawners(true);
            });
        });
    }
    cleanEvents() {
        this.WKeyClicked = false;
        this.SKeyClicked = false;
        this.AKeyClicked = false;
        this.DKeyClicked = false;
        this.SpaceKeyClicked = false;
        this.stackOfClicks = [];
    }
}
exports["default"] = new KeyboardEvents();


/***/ }),

/***/ "./src/MainCharacter.ts":
/*!******************************!*\
  !*** ./src/MainCharacter.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
const KeyboardEvents_1 = __importDefault(__webpack_require__(/*! ./KeyboardEvents */ "./src/KeyboardEvents.ts"));
const Projectile_1 = __importDefault(__webpack_require__(/*! ./Projectile */ "./src/Projectile.ts"));
const Consts_1 = __webpack_require__(/*! ./Consts */ "./src/Consts.ts");
const SoundsHandler_1 = __importDefault(__webpack_require__(/*! ./SoundsHandler */ "./src/SoundsHandler.ts"));
const Sorcerer_1 = __importDefault(__webpack_require__(/*! ./Monsters/Sorcerer */ "./src/Monsters/Sorcerer.ts"));
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
const move = 2;
class MainCharacter {
    constructor() {
        this.sourceCol = 0;
        this.score = 20;
        this.health = 2000;
        this.ownedAbilities = [];
        this.keys = 0;
        this.potions = 0;
        this.xCoord = 0;
        this.yCoord = 0;
        this.xVelocity = 16;
        this.yVelocity = 16;
        this.coordsArrayIndexes = [];
        this.lastMoveTimestamp = 16;
        this.lastDirection = [4, 0];
        this.actualDirection = 5;
        this.animationFrame = 3;
        this.thirdFrame = 1;
        this._losingHPInterval = null;
        this.weapon = new Projectile_1.default(this.sourceCol, 0, 0, 0);
    }
    get losingHPInterval() {
        if (this._losingHPInterval === null)
            throw new Error('Cannot access interval');
        return this._losingHPInterval;
    }
    startLosingHPInterval() {
        this._losingHPInterval = setInterval(() => {
            this.changeHealth(-1);
        }, 1000);
    }
    stopLosingHPInterval() {
        clearInterval(this.losingHPInterval);
    }
    checkIfPlayerIsDead() {
        if (this.health <= 0)
            Game_1.default.gameMap.timesUp();
    }
    animateProjectile() {
        var _a, _b, _c, _d, _e, _f;
        if (this.weapon.xPosition < Canvas_1.default.renderedViewX - 80 ||
            this.weapon.xPosition > Canvas_1.default.renderedViewX + Canvas_1.default.width ||
            this.weapon.yPosition > Canvas_1.default.renderedViewY + Canvas_1.default.height ||
            this.weapon.yPosition < Canvas_1.default.renderedViewY - 80)
            this.weapon.thrown = false;
        const ProjectileCoords = this.getCoordinates4(this.weapon.xPosition + 20, this.weapon.yPosition + 20);
        if (Consts_1.TypesOfBlocks.noTransitionForProjectile.includes((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[ProjectileCoords[1] * 2]) === null || _b === void 0 ? void 0 : _b[ProjectileCoords[0] * 2]))
            this.weapon.thrown = false;
        let invisibleSorcererHit = false;
        if (Consts_1.TypesOfBlocks.monsters.includes((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[ProjectileCoords[1] * 2]) === null || _d === void 0 ? void 0 : _d[ProjectileCoords[0] * 2])) {
            let killed = false;
            Game_1.default.gameMap.arrayOfMonsters = Game_1.default.gameMap.arrayOfMonsters.filter((monster) => {
                if (killed)
                    return true;
                if ((monster.xPosition == ProjectileCoords[0] * 2 && monster.yPosition == ProjectileCoords[1] * 2) ||
                    (monster.xPosition - 1 == ProjectileCoords[0] * 2 && monster.yPosition == ProjectileCoords[1] * 2) ||
                    (monster.xPosition + 1 == ProjectileCoords[0] * 2 && monster.yPosition == ProjectileCoords[1] * 2) ||
                    (monster.xPosition == ProjectileCoords[0] * 2 && monster.yPosition - 1 == ProjectileCoords[1] * 2) ||
                    (monster.xPosition == ProjectileCoords[0] * 2 + 1 && monster.yPosition + 1 == ProjectileCoords[1] * 2)) {
                    if (monster.sourceColumn === 5) {
                        this.weapon.thrown = false;
                        killed = true;
                        this.changeScore(1);
                        return true;
                    }
                    if (monster instanceof Sorcerer_1.default && monster.isVisible === false) {
                        invisibleSorcererHit = true;
                        return true;
                    }
                    monster.die(true);
                    killed = true;
                    return false;
                }
                return true;
            });
            Game_1.default.gameMap.arrayOfGoblins = Game_1.default.gameMap.arrayOfGoblins.filter((monster) => {
                if (killed)
                    return true;
                if ((monster.xPosition == ProjectileCoords[0] * 2 && monster.yPosition == ProjectileCoords[1] * 2) ||
                    (monster.xPosition - 1 == ProjectileCoords[0] * 2 && monster.yPosition == ProjectileCoords[1] * 2) ||
                    (monster.xPosition + 1 == ProjectileCoords[0] * 2 && monster.yPosition == ProjectileCoords[1] * 2) ||
                    (monster.xPosition == ProjectileCoords[0] * 2 && monster.yPosition - 1 == ProjectileCoords[1] * 2) ||
                    (monster.xPosition == ProjectileCoords[0] * 2 + 1 && monster.yPosition + 1 == ProjectileCoords[1] * 2)) {
                    monster.die(true);
                    killed = true;
                    return false;
                }
                return true;
            });
            if (invisibleSorcererHit === false)
                this.weapon.thrown = false;
        }
        if (Consts_1.TypesOfBlocks.destroyableThings.includes((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[ProjectileCoords[1] * 2]) === null || _f === void 0 ? void 0 : _f[ProjectileCoords[0] * 2])) {
            this.destroyThing(ProjectileCoords, true);
            this.weapon.thrown = false;
        }
        let direction = this.weapon.direction;
        let speed = 4;
        if ([2, 3, 4].includes(direction))
            this.weapon.xPosition += speed * Canvas_1.default.multiplier;
        if ([6, 7, 8].includes(direction))
            this.weapon.xPosition -= speed * Canvas_1.default.multiplier;
        if ([8, 1, 2].includes(direction))
            this.weapon.yPosition -= speed * Canvas_1.default.multiplier;
        if ([4, 5, 6].includes(direction))
            this.weapon.yPosition += speed * Canvas_1.default.multiplier;
        if (this.sourceCol != 0)
            return;
        if (this.weapon.animationTimestamp % 4 == 0)
            this.weapon.frame++;
        this.weapon.animationTimestamp++;
        if (this.weapon.frame == 8)
            this.weapon.frame = 0;
    }
    throwWeapon() {
        if (Date.now() - this.weapon.lastTimeThrew < 150)
            return;
        this.weapon.lastTimeThrew = Date.now();
        this.weapon.thrown = true;
        this.weapon.frame = this.lastDirection[0];
        this.weapon.xPosition = this.xCoord;
        this.weapon.yPosition = this.yCoord;
        switch (this.lastDirection[0]) {
            case 0:
                this.weapon.xPosition += 20;
                break;
            case 1:
                this.weapon.xPosition += 19;
                this.weapon.yPosition += 20;
                break;
            case 2:
                this.weapon.xPosition += 40;
                this.weapon.yPosition += 20;
                break;
            case 3:
                this.weapon.xPosition += 40;
                this.weapon.yPosition += 40;
                break;
            case 4:
                this.weapon.xPosition += 20;
                this.weapon.yPosition += 40;
                break;
            case 5:
                this.weapon.yPosition += 20;
                this.weapon.xPosition += 19;
                break;
            case 6:
                //this.weapon.xPosition+=20;
                this.weapon.yPosition += 20;
                break;
            case 7:
                break;
        }
        this.weapon.direction = this.lastDirection[0] + 1;
        SoundsHandler_1.default.play("weaponThrew");
    }
    changeScore(points) {
        this.score += points;
    }
    changeHealth(points) {
        this.health += points;
        this.checkIfPlayerIsDead();
    }
    reserveArray() {
        let direction = this.actualDirection;
        this.coordsArrayIndexes = this.getCoordinates3(this.xCoord, this.yCoord);
        Game_1.default.gameMap.setBlock2(this.coordsArrayIndexes, -1);
        switch (direction) {
            case 1:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] - 2))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] - 2], -1);
                break;
            case 2:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] - 2))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] - 2], -1);
                break;
            case 3:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1]))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1]], -1);
                break;
            case 4:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] + 2))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] + 2], -1);
                break;
            case 5:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] + 2))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] + 2], -1);
                break;
            case 6:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] + 2))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] + 2], -1);
                break;
            case 7:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1]))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1]], -1);
                break;
            case 8:
                if (Game_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] - 2))
                    Game_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] - 2], -1);
                break;
        }
    }
    animateCharacter() {
        this.checkForPickingItems();
        if (this.weapon.thrown)
            this.animateProjectile();
        if (this.lastMoveTimestamp === 16) {
            if (KeyboardEvents_1.default.SpaceKeyClicked && this.weapon.thrown == false) {
                this.throwWeapon();
                return;
            }
            let availableDirections = this.checkForCollisions();
            let directions = this.checkDirection();
            if (directions.length != 0)
                this.lastDirection[0] = this.twoDirectionsIntoOne(directions) - 1;
            let directionsCopy = [...directions];
            directions.forEach(dir => {
                if (dir === 1 && availableDirections.top === false)
                    directionsCopy.splice(directionsCopy.indexOf(1), 1);
                if (dir === 3 && availableDirections.right === false)
                    directionsCopy.splice(directionsCopy.indexOf(3), 1);
                if (dir === 5 && availableDirections.bottom === false)
                    directionsCopy.splice(directionsCopy.indexOf(5), 1);
                if (dir === 7 && availableDirections.left === false)
                    directionsCopy.splice(directionsCopy.indexOf(7), 1);
            });
            if (directionsCopy.length === 0)
                return;
            this.actualDirection = this.twoDirectionsIntoOne(directionsCopy);
            if (this.actualDirection == 2 && availableDirections.topRight === false) {
                if (availableDirections.top)
                    this.actualDirection = 1;
                else if (availableDirections.right)
                    this.actualDirection = 3;
                else
                    return;
            }
            if (this.actualDirection == 4 && availableDirections.bottomRight === false) {
                if (availableDirections.bottom)
                    this.actualDirection = 5;
                else if (availableDirections.right)
                    this.actualDirection = 3;
                else
                    return;
            }
            if (this.actualDirection == 6 && availableDirections.bottomLeft === false) {
                if (availableDirections.bottom)
                    this.actualDirection = 5;
                else if (availableDirections.left)
                    this.actualDirection = 7;
                else
                    return;
            }
            if (this.actualDirection == 8 && availableDirections.topLeft === false) {
                if (availableDirections.top)
                    this.actualDirection = 1;
                else if (availableDirections.left)
                    this.actualDirection = 7;
                else
                    return;
            }
        }
        if (this.lastMoveTimestamp < 4) {
            this.lastMoveTimestamp += move;
            this.moveCharacter(move);
            if (this.lastMoveTimestamp >= 4) {
                this.lastDirection[1] = this.thirdFrame;
            }
            return;
        }
        if (this.lastMoveTimestamp < 12) {
            this.lastMoveTimestamp += move;
            this.moveCharacter(move);
            if (this.lastMoveTimestamp >= 12) {
                this.lastDirection[1] = 0;
                if (this.thirdFrame == 1)
                    this.thirdFrame = 2;
                else
                    this.thirdFrame = 1;
            }
            return;
        }
        if (this.lastMoveTimestamp < 16) {
            this.lastMoveTimestamp += move;
            this.moveCharacter(move);
            if (this.lastMoveTimestamp >= 16) {
                Game_1.default.gameMap.clearBlock2(this.coordsArrayIndexes);
                this.coordsArrayIndexes = this.getCoordinates3(this.xCoord, this.yCoord);
                if (Game_1.default.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]] === 29) {
                    Game_1.default.gameMap.endOfLevel();
                }
                else if ([42, 43, 44].includes(Game_1.default.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]])) {
                    Game_1.default.gameMap.teleport();
                }
                else
                    Game_1.default.gameMap.setBlock2(this.coordsArrayIndexes, -1);
            }
            return;
        }
        if (KeyboardEvents_1.default.stackOfClicks.length == 0)
            return;
        if (KeyboardEvents_1.default.SpaceKeyClicked)
            return;
        let res = this.checkDirection();
        let res2 = this.twoDirectionsIntoOne(res);
        this.lastDirection[0] = res2 - 1;
        this.lastMoveTimestamp = 0;
        this.reserveArray();
    }
    checkForCollisions() {
        const Coords = this.getCoordinates(this.xCoord, this.yCoord);
        let availableDirections = {
            top: true, topRight: true,
            right: true, bottomRight: true,
            bottom: true, bottomLeft: true,
            left: true, topLeft: true
        };
        if (this.isFieldClear(Coords[1] - 1, Coords[0]) === false)
            availableDirections.top = false;
        if (this.isFieldClear(Coords[1] + 1, Coords[0]) === false)
            availableDirections.bottom = false;
        if (this.isFieldClear(Coords[1], Coords[0] - 1) === false)
            availableDirections.left = false;
        if (this.isFieldClear(Coords[1], Coords[0] + 1) === false)
            availableDirections.right = false;
        if (availableDirections.top == false ||
            availableDirections.right == false ||
            this.isFieldClear(Coords[1] - 1, Coords[0] + 1) === false)
            availableDirections.topRight = false;
        if (availableDirections.top == false ||
            availableDirections.left == false ||
            this.isFieldClear(Coords[1] - 1, Coords[0] - 1) === false)
            availableDirections.topLeft = false;
        if (availableDirections.bottom == false ||
            availableDirections.right == false ||
            this.isFieldClear(Coords[1] + 1, Coords[0] + 1) === false)
            availableDirections.bottomRight = false;
        if (availableDirections.bottom == false ||
            availableDirections.left == false ||
            this.isFieldClear(Coords[1] + 1, Coords[0] - 1) === false)
            availableDirections.bottomLeft = false;
        return availableDirections;
    }
    checkForPickingItems() {
        var _a, _b;
        const Coords = this.getCoordinates(this.xCoord, this.yCoord);
        const itemIndex = (_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[Coords[1] * 2]) === null || _b === void 0 ? void 0 : _b[Coords[0] * 2];
        if (Consts_1.TypesOfBlocks.pickableItems.includes(itemIndex))
            this.pickItem(itemIndex, Coords);
    }
    isFieldClear(y, x) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        if ((((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[y * 2]) === null || _b === void 0 ? void 0 : _b[x * 2]) < 26 && ((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[y * 2]) === null || _d === void 0 ? void 0 : _d[x * 2]) != 0) ||
            (((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[y * 2 + 1]) === null || _f === void 0 ? void 0 : _f[x * 2]) < 26 && ((_h = (_g = Game_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[y * 2 + 1]) === null || _h === void 0 ? void 0 : _h[x * 2]) != 0) ||
            (((_k = (_j = Game_1.default.gameMap.map) === null || _j === void 0 ? void 0 : _j[y * 2]) === null || _k === void 0 ? void 0 : _k[x * 2 + 1]) < 26 && ((_m = (_l = Game_1.default.gameMap.map) === null || _l === void 0 ? void 0 : _l[y * 2]) === null || _m === void 0 ? void 0 : _m[x * 2 + 1]) != 0) ||
            (((_p = (_o = Game_1.default.gameMap.map) === null || _o === void 0 ? void 0 : _o[y * 2 + 1]) === null || _p === void 0 ? void 0 : _p[x * 2 + 1]) < 26 && ((_r = (_q = Game_1.default.gameMap.map) === null || _q === void 0 ? void 0 : _q[y * 2 + 1]) === null || _r === void 0 ? void 0 : _r[x * 2 + 1]) != 0))
            return false;
        if ((((_t = (_s = Game_1.default.gameMap.map) === null || _s === void 0 ? void 0 : _s[y * 2]) === null || _t === void 0 ? void 0 : _t[x * 2]) == 30) &&
            (((_v = (_u = Game_1.default.gameMap.map) === null || _u === void 0 ? void 0 : _u[y * 2 + 1]) === null || _v === void 0 ? void 0 : _v[x * 2]) == 30) &&
            (((_x = (_w = Game_1.default.gameMap.map) === null || _w === void 0 ? void 0 : _w[y * 2]) === null || _x === void 0 ? void 0 : _x[x * 2 + 1]) == 30) &&
            (((_z = (_y = Game_1.default.gameMap.map) === null || _y === void 0 ? void 0 : _y[y * 2 + 1]) === null || _z === void 0 ? void 0 : _z[x * 2 + 1]) == 30) &&
            this.keys == 0)
            return false;
        if ((((_1 = (_0 = Game_1.default.gameMap.map) === null || _0 === void 0 ? void 0 : _0[y * 2]) === null || _1 === void 0 ? void 0 : _1[x * 2]) == 31) &&
            (((_3 = (_2 = Game_1.default.gameMap.map) === null || _2 === void 0 ? void 0 : _2[y * 2 + 1]) === null || _3 === void 0 ? void 0 : _3[x * 2]) == 31) &&
            (((_5 = (_4 = Game_1.default.gameMap.map) === null || _4 === void 0 ? void 0 : _4[y * 2]) === null || _5 === void 0 ? void 0 : _5[x * 2 + 1]) == 31) &&
            (((_7 = (_6 = Game_1.default.gameMap.map) === null || _6 === void 0 ? void 0 : _6[y * 2 + 1]) === null || _7 === void 0 ? void 0 : _7[x * 2 + 1]) == 31) &&
            this.keys == 0)
            return false;
        return true;
    }
    twoDirectionsIntoOne(directions) {
        if (directions.includes(1) && directions.includes(3))
            return 2;
        if (directions.includes(1) && directions.includes(7))
            return 8;
        if (directions.includes(5) && directions.includes(3))
            return 4;
        if (directions.includes(5) && directions.includes(7))
            return 6;
        else
            return directions[0];
    }
    moveCharacter(speed) {
        //  8 1 2
        // 7  X  3
        //  6 5 4
        let direction = this.actualDirection;
        if ([2, 3, 4].includes(direction))
            this.xCoord += speed * Canvas_1.default.multiplier;
        if ([6, 7, 8].includes(direction))
            this.xCoord -= speed * Canvas_1.default.multiplier;
        if ([8, 1, 2].includes(direction))
            this.yCoord -= speed * Canvas_1.default.multiplier;
        if ([4, 5, 6].includes(direction))
            this.yCoord += speed * Canvas_1.default.multiplier;
        this.moveMap();
    }
    checkDirection() {
        let arr = KeyboardEvents_1.default.stackOfClicks.slice();
        let directions = [];
        if (arr.indexOf("W") > arr.indexOf("S"))
            directions.push(1);
        else if (arr.indexOf("W") < arr.indexOf("S"))
            directions.push(5);
        else if (arr.includes("W"))
            directions.push(1);
        else if (arr.includes("S"))
            directions.push(5);
        if (arr.indexOf("A") > arr.indexOf("D"))
            directions.push(7);
        else if (arr.indexOf("A") < arr.indexOf("D"))
            directions.push(3);
        else if (arr.includes("A"))
            directions.push(7);
        else if (arr.includes("D"))
            directions.push(3);
        return directions;
    }
    moveMap() {
        let gameCanvasHeight = Canvas_1.default.height - 200;
        let mapX = this.xCoord + 40 - (Canvas_1.default.width + 1) / 2;
        let mapY = this.yCoord + 40 - gameCanvasHeight / 2;
        if (mapX < 0)
            Canvas_1.default.renderedViewX = 0;
        else if (mapX + Canvas_1.default.width >= Game_1.default.gameMap.xSizeInPixels)
            Canvas_1.default.renderedViewX = Game_1.default.gameMap.xSizeInPixels - Canvas_1.default.width;
        else
            Canvas_1.default.renderedViewX = mapX;
        if (mapY < 0)
            Canvas_1.default.renderedViewY = 0;
        else if (mapY + gameCanvasHeight >= Game_1.default.gameMap.ySizeInPixels)
            Canvas_1.default.renderedViewY = Game_1.default.gameMap.ySizeInPixels - gameCanvasHeight;
        else
            Canvas_1.default.renderedViewY = mapY;
    }
    getCoordinates(x, y) {
        let xIndex = (x + 40 - (x + 40) % 80) / 80;
        let yIndex = (y + 40 - (y + 40) % 80) / 80;
        return [xIndex, yIndex];
    }
    getCoordinates2(x, y) {
        let xIndex = x / 40;
        let yIndex = y / 40;
        return [xIndex, yIndex];
    }
    getCoordinates3(x, y) {
        let xIndex = (x - x % 40) / 40;
        let yIndex = (y - y % 40) / 40;
        return [xIndex, yIndex];
    }
    getCoordinates4(x, y) {
        let xIndex = (x - x % 80) / 80;
        let yIndex = (y - y % 80) / 80;
        return [xIndex, yIndex];
    }
    destroyThing(coords, addScore) {
        const itemID = Game_1.default.gameMap.map[coords[1] * 2][coords[0] * 2];
        switch (itemID) {
            case 16:
                Game_1.default.gameMap.setBlock(coords, 17);
                break;
            case 17:
                Game_1.default.gameMap.setBlock(coords, 18);
                break;
            case 18:
                Game_1.default.gameMap.clearBlock(coords);
                break;
            case 20:
            case 21:
                Game_1.default.gameMap.clearBlock(coords);
                Game_1.default.gameMap.deleteSpawner(coords);
                if (addScore)
                    this.changeScore(10);
                break;
            case 22:
                Game_1.default.gameMap.setBlock(coords, 20);
                if (addScore)
                    this.changeScore(10);
                break;
            case 23:
                Game_1.default.gameMap.setBlock(coords, 25);
                if (addScore)
                    this.changeScore(10);
                break;
            case 24:
            case 25:
                Game_1.default.gameMap.clearBlock(coords);
                Game_1.default.gameMap.deleteSpawner(coords);
                if (addScore)
                    this.changeScore(10);
                break;
            case 33:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
                Game_1.default.gameMap.clearBlock(coords);
                break;
            case 36:
                Game_1.default.gameMap.clearBlock(coords);
                Game_1.default.gameMap.clearMapFromMonstersAndSpawners(false);
                break;
        }
    }
    pickItem(itemIndex, coords) {
        switch (itemIndex) {
            case 26: //box - treasure
            case 27: //box - treasure
            case 28: //box - treasure
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case 32: // key
                this.keys++;
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedKey");
                break;
            case 33: //yellow bottle - cider
                this.changeHealth(100);
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case 34: //food
                this.changeScore(100);
                this.changeHealth(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case 35: //amulet
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case 36: // blue elixir
                this.potions++;
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case 37: // lightblue elixir = fight power
            case 38: // green elixir     = magic power
            case 39: // yellow elixir    = extra armor
            case 40: // purple elixir    = carrying ability
            case 41: // brown elixir     = shot power
                if (!this.ownedAbilities.includes(itemIndex))
                    this.ownedAbilities.push(itemIndex);
                Game_1.default.gameMap.pickingUpAbility(itemIndex - 37);
                break;
            case 30:
            case 31:
                this.keys--;
                Game_1.default.gameMap.findGlass(coords[0] * 2, coords[1] * 2);
                SoundsHandler_1.default.play("openDoors");
                break;
        }
        Game_1.default.gameMap.map[coords[1] * 2][coords[0] * 2] = 0;
        Game_1.default.gameMap.map[coords[1] * 2][coords[0] * 2 + 1] = 0;
        Game_1.default.gameMap.map[coords[1] * 2 + 1][coords[0] * 2] = 0;
        Game_1.default.gameMap.map[coords[1] * 2 + 1][coords[0] * 2 + 1] = 0;
    }
}
exports["default"] = new MainCharacter();


/***/ }),

/***/ "./src/Monsters/Death.ts":
/*!*******************************!*\
  !*** ./src/Monsters/Death.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monsters/Monster.ts"));
class Death extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}
exports["default"] = Death;


/***/ }),

/***/ "./src/Monsters/Demon.ts":
/*!*******************************!*\
  !*** ./src/Monsters/Demon.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Interfaces_1 = __webpack_require__(/*! ../Interfaces */ "./src/Interfaces.ts");
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monsters/Monster.ts"));
const Canvas_1 = __importDefault(__webpack_require__(/*! ../Canvas */ "./src/Canvas.ts"));
const Images_1 = __importDefault(__webpack_require__(/*! ../Images */ "./src/Images.ts"));
const Consts_1 = __webpack_require__(/*! ../Consts */ "./src/Consts.ts");
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ../MainCharacter */ "./src/MainCharacter.ts"));
const Game_1 = __importDefault(__webpack_require__(/*! ../Game */ "./src/Game.ts"));
class Demon extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.fireballCoords = { x: 1, y: 1 };
        this.fireballThrew = false;
        this.fireballDirection = Interfaces_1.Directions.TOP;
        this.lastFireballThrewTimestamp = 0;
        this.lastFireballThrewTimestamp = Date.now();
    }
    checkForShoot() {
        if (this.fireballThrew)
            return;
        if (Date.now() - this.lastFireballThrewTimestamp < 1000)
            return;
        const playerCoords = MainCharacter_1.default.getCoordinates(MainCharacter_1.default.xCoord, MainCharacter_1.default.yCoord);
        if (this.xPosition == playerCoords[0] * 2 && this.yPosition > playerCoords[1] * 2)
            this.shootFireball(Interfaces_1.Directions.TOP);
        else if (this.xPosition < playerCoords[0] * 2 &&
            this.yPosition > playerCoords[1] * 2 &&
            Math.pow(this.xPosition - playerCoords[0] * 2, 2) === Math.pow(this.yPosition - playerCoords[1] * 2, 2))
            this.shootFireball(Interfaces_1.Directions.TOP_RIGHT);
        else if (this.xPosition < playerCoords[0] * 2 && this.yPosition === playerCoords[1] * 2)
            this.shootFireball(Interfaces_1.Directions.RIGHT);
        else if (this.xPosition < playerCoords[0] * 2 &&
            this.yPosition < playerCoords[1] * 2 &&
            Math.pow(this.xPosition - playerCoords[0] * 2, 2) === Math.pow(this.yPosition - playerCoords[1] * 2, 2))
            this.shootFireball(Interfaces_1.Directions.BOTTOM_RIGHT);
        else if (this.xPosition == playerCoords[0] * 2 && this.yPosition < playerCoords[1] * 2)
            this.shootFireball(Interfaces_1.Directions.BOTTOM);
        else if (this.xPosition > playerCoords[0] * 2 &&
            this.yPosition < playerCoords[1] * 2 &&
            Math.pow(this.xPosition - playerCoords[0] * 2, 2) === Math.pow(this.yPosition - playerCoords[1] * 2, 2))
            this.shootFireball(Interfaces_1.Directions.BOTTOM_LEFT);
        else if (this.xPosition > playerCoords[0] * 2 && this.yPosition === playerCoords[1] * 2)
            this.shootFireball(Interfaces_1.Directions.LEFT);
        else if (this.xPosition > playerCoords[0] * 2 &&
            this.yPosition > playerCoords[1] * 2 &&
            Math.pow(this.xPosition - playerCoords[0] * 2, 2) === Math.pow(this.yPosition - playerCoords[1] * 2, 2))
            this.shootFireball(Interfaces_1.Directions.TOP_LEFT);
    }
    shootFireball(direction) {
        switch (direction) {
            case Interfaces_1.Directions.TOP:
                this.fireballCoords = { x: this.xPosition * 40 + 20, y: this.yPosition * 40 };
                break;
            case Interfaces_1.Directions.TOP_RIGHT:
                this.fireballCoords = { x: this.xPosition * 40 + 19, y: this.yPosition * 40 + 20 };
                break;
            case Interfaces_1.Directions.RIGHT:
                this.fireballCoords = { x: this.xPosition * 40 + 60, y: this.yPosition * 40 + 20 };
                break;
            case Interfaces_1.Directions.BOTTOM_RIGHT:
                this.fireballCoords = { x: this.xPosition * 40 + 60, y: this.yPosition * 40 + 60 };
                break;
            case Interfaces_1.Directions.BOTTOM:
                this.fireballCoords = { x: this.xPosition * 40 + 20, y: this.yPosition * 40 + 60 };
                break;
            case Interfaces_1.Directions.BOTTOM_LEFT:
                this.fireballCoords = { x: this.xPosition * 40 + 19, y: this.yPosition * 40 + 20 };
                break;
            case Interfaces_1.Directions.LEFT:
                this.fireballCoords = { x: this.xPosition * 40, y: this.yPosition * 40 + 20 };
                break;
            case Interfaces_1.Directions.TOP_LEFT:
                this.fireballCoords = { x: this.xPosition * 40, y: this.yPosition * 40 };
                break;
        }
        this.fireballThrew = true;
        this.fireballDirection = this.lookingDirection;
        this.lastFireballThrewTimestamp = Date.now();
    }
    animateFireball(renderedView) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.fireballThrew === false)
            return;
        const fireballCoordsArray = MainCharacter_1.default.getCoordinates4(this.fireballCoords.x + 20, this.fireballCoords.y + 20);
        if (Consts_1.TypesOfBlocks.noTransitionForProjectile.includes((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[fireballCoordsArray[1] * 2]) === null || _b === void 0 ? void 0 : _b[fireballCoordsArray[0] * 2]))
            this.fireballThrew = false;
        if (Consts_1.TypesOfBlocks.monsters.includes((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[fireballCoordsArray[1] * 2]) === null || _d === void 0 ? void 0 : _d[fireballCoordsArray[0] * 2])) {
            let killed = false;
            Game_1.default.gameMap.arrayOfMonsters = Game_1.default.gameMap.arrayOfMonsters.filter(monster => {
                if (monster.xPosition === this.xPosition && monster.yPosition === this.yPosition)
                    return true;
                if (monster.sourceColumn === 5) {
                    //this.changeScore(1);
                    return true;
                }
                if (killed)
                    return true;
                if ((monster.xPosition == fireballCoordsArray[0] * 2 && monster.yPosition == fireballCoordsArray[1] * 2) ||
                    (monster.xPosition - 1 == fireballCoordsArray[0] * 2 && monster.yPosition == fireballCoordsArray[1] * 2) ||
                    (monster.xPosition + 1 == fireballCoordsArray[0] * 2 && monster.yPosition == fireballCoordsArray[1] * 2) ||
                    (monster.xPosition == fireballCoordsArray[0] * 2 && monster.yPosition - 1 == fireballCoordsArray[1] * 2) ||
                    (monster.xPosition == fireballCoordsArray[0] * 2 + 1 && monster.yPosition + 1 == fireballCoordsArray[1] * 2)) {
                    monster.die(false);
                    killed = true;
                    return false;
                }
                return true;
            });
            // Game.gameMap.arrayOfGoblins = Game.gameMap.arrayOfGoblins.filter(monster=>{
            //     if(killed) return true;
            //     if( 
            //         (monster.xPosition == fireballCoordsArray[0]*2 && monster.yPosition == fireballCoordsArray[1]*2) ||
            //         (monster.xPosition-1 == fireballCoordsArray[0]*2 && monster.yPosition == fireballCoordsArray[1]*2) ||
            //         (monster.xPosition+1 == fireballCoordsArray[0]*2 && monster.yPosition == fireballCoordsArray[1]*2) || 
            //         (monster.xPosition == fireballCoordsArray[0]*2 && monster.yPosition-1 == fireballCoordsArray[1]*2) ||
            //         (monster.xPosition == fireballCoordsArray[0]*2+1 && monster.yPosition+1 == fireballCoordsArray[1]*2)
            //     ){
            //         monster.die(false);
            //         killed = true
            //         return false;
            //     }
            //     return true;
            // })
        }
        if (Consts_1.TypesOfBlocks.destroyableByDemons.includes((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[fireballCoordsArray[1] * 2]) === null || _f === void 0 ? void 0 : _f[fireballCoordsArray[0] * 2])) {
            MainCharacter_1.default.destroyThing(fireballCoordsArray, false);
            this.fireballThrew = false;
        }
        if (((_h = (_g = Game_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[fireballCoordsArray[1] * 2]) === null || _h === void 0 ? void 0 : _h[fireballCoordsArray[0] * 2]) === -1) {
            // console.log("me hit")
            MainCharacter_1.default.changeHealth(-5);
            this.fireballThrew = false;
        }
        const speed = 2;
        if ([Interfaces_1.Directions.TOP_LEFT, Interfaces_1.Directions.LEFT, Interfaces_1.Directions.BOTTOM_LEFT].includes(this.fireballDirection))
            this.fireballCoords.x -= speed * Canvas_1.default.multiplier;
        if ([Interfaces_1.Directions.TOP_RIGHT, Interfaces_1.Directions.RIGHT, Interfaces_1.Directions.BOTTOM_RIGHT].includes(this.fireballDirection))
            this.fireballCoords.x += speed * Canvas_1.default.multiplier;
        if ([Interfaces_1.Directions.TOP_LEFT, Interfaces_1.Directions.TOP, Interfaces_1.Directions.TOP_RIGHT].includes(this.fireballDirection))
            this.fireballCoords.y -= speed * Canvas_1.default.multiplier;
        if ([Interfaces_1.Directions.BOTTOM_LEFT, Interfaces_1.Directions.BOTTOM, Interfaces_1.Directions.BOTTOM_RIGHT].includes(this.fireballDirection))
            this.fireballCoords.y += speed * Canvas_1.default.multiplier;
        this.drawFireball(renderedView);
    }
    drawFireball(renderedView) {
        Canvas_1.default.ctx.drawImage(Images_1.default.assets.weapons, this.fireballDirection * 9, 3 * 9, 8, 8, this.fireballCoords.x - renderedView.x, this.fireballCoords.y - renderedView.y, 8 * Consts_1.Constants.multiplier, 8 * Consts_1.Constants.multiplier);
    }
}
exports["default"] = Demon;


/***/ }),

/***/ "./src/Monsters/Ghost.ts":
/*!*******************************!*\
  !*** ./src/Monsters/Ghost.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monsters/Monster.ts"));
class Ghost extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}
exports["default"] = Ghost;


/***/ }),

/***/ "./src/Monsters/Grunt.ts":
/*!*******************************!*\
  !*** ./src/Monsters/Grunt.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monsters/Monster.ts"));
class Grunt extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}
exports["default"] = Grunt;


/***/ }),

/***/ "./src/Monsters/Lobber.ts":
/*!********************************!*\
  !*** ./src/Monsters/Lobber.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monsters/Monster.ts"));
class Lobber extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.rockCoords = { x: 1, y: 1 };
        this.rockThrew = false;
    }
    renderRock(startIndexes) {
        if (this.rockCoords.x >= startIndexes.x * 2 &&
            this.rockCoords.x <= startIndexes.x * 2 + 34 &&
            this.rockCoords.y >= startIndexes.y * 2 &&
            this.rockCoords.y <= startIndexes.y * 2 + 22) { }
        else
            return;
    }
}
exports["default"] = Lobber;


/***/ }),

/***/ "./src/Monsters/Monster.ts":
/*!*********************************!*\
  !*** ./src/Monsters/Monster.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ../MainCharacter */ "./src/MainCharacter.ts"));
const Interfaces_1 = __webpack_require__(/*! ../Interfaces */ "./src/Interfaces.ts");
const Game_1 = __importDefault(__webpack_require__(/*! ../Game */ "./src/Game.ts"));
class Monster {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        this.id = 0;
        this.sourceColumn = 0;
        this.damage = 0;
        this.health = 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.lookingDirection = 0;
        this.moved = false;
        this.distanceFromPlayer = 0;
        this.sourceColumn = sourceColumn;
        this.damage = damage;
        this.health = health;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.id = -(80 + sourceColumn);
        this.lookingDirection = startDirection;
        Game_1.default.gameMap.setBlock2([xPosition, yPosition], this.id);
    }
    lookAtMe(xCoord, yCoord) {
        if (this.xPosition == xCoord && this.yPosition > yCoord) {
            this.lookingDirection = Interfaces_1.Directions.TOP;
            return;
        }
        if (this.xPosition == xCoord && this.yPosition < yCoord) {
            this.lookingDirection = Interfaces_1.Directions.BOTTOM;
            return;
        }
        if (this.yPosition == yCoord && this.xPosition > xCoord) {
            this.lookingDirection = Interfaces_1.Directions.LEFT;
            return;
        }
        if (this.yPosition == yCoord && this.xPosition < xCoord) {
            this.lookingDirection = Interfaces_1.Directions.RIGHT;
            return;
        }
        if (this.xPosition > xCoord && this.yPosition > yCoord) {
            this.lookingDirection = Interfaces_1.Directions.TOP_LEFT;
            return;
        }
        if (this.xPosition > xCoord && this.yPosition < yCoord) {
            this.lookingDirection = Interfaces_1.Directions.BOTTOM_LEFT;
            return;
        }
        if (this.xPosition < xCoord && this.yPosition > yCoord) {
            this.lookingDirection = Interfaces_1.Directions.TOP_RIGHT;
            return;
        }
        if (this.xPosition < xCoord && this.yPosition < yCoord) {
            this.lookingDirection = Interfaces_1.Directions.BOTTOM_RIGHT;
            return;
        }
    }
    die(addScore) {
        Game_1.default.gameMap.clearBlock2([this.xPosition, this.yPosition]);
        if (addScore)
            MainCharacter_1.default.changeScore(5);
    }
}
exports["default"] = Monster;


/***/ }),

/***/ "./src/Monsters/Sorcerer.ts":
/*!**********************************!*\
  !*** ./src/Monsters/Sorcerer.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monsters/Monster.ts"));
class Sorcerer extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.isVisible = true;
        this.isVisible = true;
    }
}
exports["default"] = Sorcerer;


/***/ }),

/***/ "./src/Projectile.ts":
/*!***************************!*\
  !*** ./src/Projectile.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
const Consts_1 = __webpack_require__(/*! ./Consts */ "./src/Consts.ts");
const Images_1 = __importDefault(__webpack_require__(/*! ./Images */ "./src/Images.ts"));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
class Projectile {
    constructor(sourceRow, direction, xPosition, yPosition) {
        this.sourceRow = 0;
        this.direction = 0;
        this.frame = 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.thrown = false;
        this.animationTimestamp = 0;
        this.lastTimeThrew = 0;
        this.sourceRow = sourceRow;
        this.direction = direction;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }
    draw(renderedView) {
        if (!MainCharacter_1.default.weapon.thrown)
            return;
        Canvas_1.default.ctx.drawImage(Images_1.default.assets.weapons, MainCharacter_1.default.weapon.frame * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, MainCharacter_1.default.weapon.xPosition - renderedView.x, MainCharacter_1.default.weapon.yPosition - renderedView.y, 8 * Consts_1.Constants.multiplier, 8 * Consts_1.Constants.multiplier);
    }
}
exports["default"] = Projectile;


/***/ }),

/***/ "./src/SoundsHandler.ts":
/*!******************************!*\
  !*** ./src/SoundsHandler.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
class cSoundFile {
    constructor() {
        this.loadComplete = false;
        this.buffer = null;
        this.loadFile = (file_name) => {
            if (this.context === undefined)
                return;
            this.xhr = new XMLHttpRequest();
            this.xhr.open("GET", file_name, true);
            this.xhr.responseType = "arraybuffer";
            this.xhr.onload = this.onLoadComplete;
            this.xhr.send();
        };
        this.onLoadComplete = (ev) => {
            var _a;
            this.xhr = ev.currentTarget;
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.decodeAudioData(this.xhr.response, this.decodeData);
        };
        this.decodeData = (buffer) => {
            this.buffer = buffer;
            this.loadComplete = true;
        };
        this.play = (start_time, duration) => {
            if (this.context === undefined)
                return;
            if (this.loadComplete === false)
                return;
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.context.destination);
            this.source.start(this.context.currentTime, start_time, duration);
        };
        try {
            this.context = new AudioContext();
        }
        catch (_a) {
            console.log("no audio");
        }
        this.loadFile("./sounds/audio.mp3");
    }
}
class cSoundMarker {
    constructor(name, start, duration, volume, loop) {
        this.name = "";
        this.start = 0;
        this.duration = 0;
        this.volume = 0;
        this.loop = false;
        this.name = name;
        this.start = start;
        this.duration = duration;
        this.volume = volume;
        this.loop = loop;
    }
}
class cSoundManager {
    constructor() {
        this.mute = false;
        this.soundsLoaded = false;
        this._jsonFileLoaded = false;
        this._soundFileString = "";
        this.soundMarkers = {};
        this._soundFile = new cSoundFile();
        this.mp3Enabled = () => {
            let a = document.createElement("audio");
            return !!(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ''));
        };
        this.play = (sound_name) => {
            if (this.mute)
                return;
            let marker = this.soundMarkers[sound_name];
            if (marker === null || marker === undefined)
                return;
            this._soundFile.play(marker.start, marker.duration);
        };
        this._loadMarkers = (jsonfile) => {
            var marker_xhr = new XMLHttpRequest();
            marker_xhr.onreadystatechange = () => {
                if (marker_xhr.readyState === XMLHttpRequest.DONE && marker_xhr.status === 200)
                    this._onRead(JSON.parse(marker_xhr.responseText));
                else if ([404, 403].includes(marker_xhr.readyState))
                    this._onError(marker_xhr);
            };
            marker_xhr.open("GET", jsonfile, true);
            marker_xhr.send();
        };
        this._onRead = (data) => {
            for (var marker_name in data.markers) {
                var markers = data.markers[marker_name];
                this.addMarker(new cSoundMarker(marker_name, markers.start, markers.duration, markers.volume, markers.loop));
            }
            this._jsonFileLoaded = true;
            if (this._soundFile.loadComplete == true)
                this.soundsLoaded = true;
            if (this.mp3Enabled())
                this._soundFile.loadFile(this._soundFileString + ".mp3");
            else
                this._soundFile.loadFile(this._soundFileString + ".ogg");
        };
        this.SoundFileLoaded = () => {
            if (this._jsonFileLoaded == true)
                this.soundsLoaded = true;
        };
        this._onError = (xhr) => {
            console.log("HAVE NOT LOADED SOUND MARKER FILE: " + this._soundFileString + ".json status=" + xhr.readyState);
        };
        this.addMarker = (sound_marker) => {
            this.soundMarkers[sound_marker.name] = sound_marker;
        };
        this.removeMarker = (marker_name) => {
            delete this.soundMarkers[marker_name];
        };
    }
    initializeSoundManager() {
        return __awaiter(this, void 0, void 0, function* () {
            const sound_file = "./sounds/audio";
            this._soundFileString = sound_file;
            this._loadMarkers(sound_file + ".json");
        });
    }
}
exports["default"] = new cSoundManager();


/***/ }),

/***/ "./src/Spawner.ts":
/*!************************!*\
  !*** ./src/Spawner.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
class Spawner {
    constructor(x, y, mobId) {
        this.mob = 0;
        this.lastTimeSpawnedSomething = 0;
        this.timeToSpawn = 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.xPosition = x;
        this.yPosition = y;
        this.mob = mobId;
        this.timeToSpawn = Math.floor(Math.random() * 6) + 1;
    }
    destroyed() {
        MainCharacter_1.default.changeScore(10);
        Game_1.default.gameMap.clearBlock2([this.xPosition, this.yPosition]);
    }
}
exports["default"] = Spawner;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
const Images_1 = __importDefault(__webpack_require__(/*! ./Images */ "./src/Images.ts"));
const SoundsHandler_1 = __importDefault(__webpack_require__(/*! ./SoundsHandler */ "./src/SoundsHandler.ts"));
const Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
const KeyboardEvents_1 = __importDefault(__webpack_require__(/*! ./KeyboardEvents */ "./src/KeyboardEvents.ts"));
class Loader {
    constructor() {
        this.startButtonDiv = document.getElementById("startButtonDiv");
        this.startGame = () => {
            const characterSelect = document.getElementById("characterSelect");
            const mapSelect = document.getElementById("mapSelect");
            if (characterSelect === null)
                return;
            if (mapSelect === null)
                return;
            const selectedCharacter = characterSelect.value;
            const selectedMap = mapSelect.value;
            Game_1.default.startGame(selectedCharacter, selectedMap);
            if (this.startButtonDiv !== null && this.startButtonDiv.firstElementChild !== null)
                this.startButtonDiv.removeChild(this.startButtonDiv.firstElementChild);
        };
        this.loadUtilities();
    }
    loadUtilities() {
        return __awaiter(this, void 0, void 0, function* () {
            //check if images and audio files are ready and add listeners
            yield Images_1.default.loadImages();
            yield SoundsHandler_1.default.initializeSoundManager();
            yield KeyboardEvents_1.default.addListeners();
            this.createStartButton();
            Canvas_1.default.drawStartScreen();
        });
    }
    createStartButton() {
        let startButton = document.createElement("button");
        startButton.innerText = "Start game!";
        startButton.addEventListener("click", this.startGame);
        this.startButtonDiv.appendChild(startButton);
    }
}
exports["default"] = new Loader();


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEMsZ0NBQWdDLFFBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsd0JBQXdCLFVBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvQ2FudmFzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0NvbnN0cy50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0dhbWVNYXAudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvSGVscGVycy50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9JbWFnZXMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvSW50ZXJmYWNlcy50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9LZXlib2FyZEV2ZW50cy50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9NYWluQ2hhcmFjdGVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01vbnN0ZXJzL0RlYXRoLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01vbnN0ZXJzL0RlbW9uLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01vbnN0ZXJzL0dob3N0LnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01vbnN0ZXJzL0dydW50LnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01vbnN0ZXJzL0xvYmJlci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVycy9Nb25zdGVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01vbnN0ZXJzL1NvcmNlcmVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL1Byb2plY3RpbGUudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvU291bmRzSGFuZGxlci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9TcGF3bmVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2dhdW50bGV0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dhdW50bGV0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2dhdW50bGV0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTWFpbkNoYXJhY3RlclwiKSk7XHJcbmNvbnN0IEltYWdlc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0ltYWdlc1wiKSk7XHJcbmNvbnN0IEhlbHBlcnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9IZWxwZXJzXCIpKTtcclxuY29uc3QgU29yY2VyZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9Tb3JjZXJlclwiKSk7XHJcbmNvbnN0IERlbW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvRGVtb25cIikpO1xyXG5jb25zdCBDb25zdHNfMSA9IHJlcXVpcmUoXCIuL0NvbnN0c1wiKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0dhbWVcIikpO1xyXG5jbGFzcyBDYW52YXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDEyODU7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA5NjA7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gNTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVkVmlld1ggPSAwO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZWRWaWV3WSA9IDA7XHJcbiAgICAgICAgdGhpcy5yYWYgPSAwO1xyXG4gICAgICAgIHRoaXMuZW5kaW5nRnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMub2xkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5uZXdUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5mcHMgPSAwO1xyXG4gICAgICAgIHRoaXMuY2FudmFzVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhc1RhZy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXNUYWcud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY2FudmFzVGFnLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZHJhd1N0YXJ0U2NyZWVuKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5zdGFydFNjcmVlbiwgMCwgMCwgMzIwLCAyMDAsIDAsIDAsIDEyODUsIDk2MCk7XHJcbiAgICB9XHJcbiAgICBkcmF3TGV2ZWxUaXRsZVNjcmVlbihsZXZlbE51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCAxMjg1LCA5NjApO1xyXG4gICAgICAgIGNvbnN0IGxldmVsTGVuZ3RoID0gbGV2ZWxOdW1iZXIudG9TdHJpbmcoKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGxldmVsRGlnaXRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzIC0gbGV2ZWxMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgbGV2ZWxEaWdpdHMucHVzaCgwKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxldmVsTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGxldmVsRGlnaXRzLnB1c2gocGFyc2VJbnQobGV2ZWxOdW1iZXIudG9TdHJpbmcoKS5jaGFyQXQoaSkpKTtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuYmlnTnVtYmVycywgMTcxLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiAxNywgOTUsIDE2LCAzMjAsIDM3MCwgOTUgKiAodGhpcy5tdWx0aXBsaWVyIC0gMSksIDE2ICogKHRoaXMubXVsdGlwbGllciAtIDEpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuYmlnTnVtYmVycywgbGV2ZWxEaWdpdHNbaV0gKiAxNywgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogMTcsIDE2LCAxNiwgNzQwICsgMTYgKiB0aGlzLm11bHRpcGxpZXIgKiBpLCAzNzAsIDE2ICogKHRoaXMubXVsdGlwbGllciAtIDEpLCAxNiAqICh0aGlzLm11bHRpcGxpZXIgLSAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyR2FtZUZyYW1lKCkge1xyXG4gICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnN0b3BHYW1lKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vbGRUaW1lID0gdGhpcy5uZXdUaW1lO1xyXG4gICAgICAgIHRoaXMubmV3VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAodGhpcy5uZXdUaW1lIC0gdGhpcy5vbGRUaW1lKTtcclxuICAgICAgICAvL2RyYXcgYmFja2dyb3VuZFxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjN2E3YTdhJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCAyNTcgKiB0aGlzLm11bHRpcGxpZXIsIDE1MiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgdGhpcy5kcmF3V2FsbHMoKTtcclxuICAgICAgICB0aGlzLmRyYXdJdGVtcygpO1xyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubW92ZU1vbnN0ZXJzKCk7XHJcbiAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuYW5pbWF0ZUNoYXJhY3RlcigpO1xyXG4gICAgICAgIHRoaXMuZHJhd0NoYXJhY3RlcigpO1xyXG4gICAgICAgIHRoaXMuZHJhd01vbnN0ZXJzKCk7XHJcbiAgICAgICAgLy8gYm90dG9tIGJhclxyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5ib3R0b21CYXIsIDAsIDAsIDI1NywgNDAsIDAgKiB0aGlzLm11bHRpcGxpZXIsIDE1MiAqIHRoaXMubXVsdGlwbGllciwgMjU3ICogdGhpcy5tdWx0aXBsaWVyLCA0MCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgdGhpcy5kcmF3U2NvcmVBbmRIZWFsdGgoKTtcclxuICAgICAgICAvLyBmcHMgaW4gdGhlIGNvcm5lclxyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoKDEuMCAvICh0aGlzLmRlbHRhVGltZSAvIDEwMDApKS50b0ZpeGVkKDApLnRvU3RyaW5nKCksIDAsIDc4Nik7XHJcbiAgICAgICAgdGhpcy5yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMucmVuZGVyR2FtZUZyYW1lKCkpO1xyXG4gICAgfVxyXG4gICAgZHJhd1dhbGxzKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE3OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Fbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Jbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSA+IDE5KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLndhbGxzLCAoKChfZCA9IChfYyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Nbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Rbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSAqIDE3KSAtIDE3LCAwLCAxNiwgMTYsIC10aGlzLnJlbmRlcmVkVmlld1ggJSA4MCArIGkgKiA4MCwgLXRoaXMucmVuZGVyZWRWaWV3WSAlIDgwICsgaiAqIDgwLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd0l0ZW1zKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTE7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLml0ZW1zLCAoKCgoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSkgLSAxOSkgKiAxNykgLSAxNywgMCwgMTYsIDE2LCAtdGhpcy5yZW5kZXJlZFZpZXdYICUgODAgKyBpICogODAsIC10aGlzLnJlbmRlcmVkVmlld1kgJSA4MCArIGogKiA4MCwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdDaGFyYWN0ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm1haW5DaGFyYWN0ZXJzLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5sYXN0RGlyZWN0aW9uWzBdICogMTcgKyBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiAxMzYsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0Lmxhc3REaXJlY3Rpb25bMV0gKiAxNywgMTYsIDE2LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC54Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1gsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnlDb29yZCAtIHRoaXMucmVuZGVyZWRWaWV3WSwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24uZHJhdyh7IHg6IHRoaXMucmVuZGVyZWRWaWV3WCwgeTogdGhpcy5yZW5kZXJlZFZpZXdZIH0pO1xyXG4gICAgfVxyXG4gICAgZHJhd01vbnN0ZXJzKCkge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXhlcyA9IEhlbHBlcnNfMS5kZWZhdWx0LmdldFN0YXJ0SW5kZXhlcygpO1xyXG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmdldENvb3JkaW5hdGVzKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkKTtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZNb25zdGVycy5mb3JFYWNoKChtb25zdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIG1vbnN0ZXIubG9va0F0TWUocGxheWVyQ29vcmRzWzBdICogMiwgcGxheWVyQ29vcmRzWzFdICogMik7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyIGluc3RhbmNlb2YgU29yY2VyZXJfMS5kZWZhdWx0ICYmIG1vbnN0ZXIuaXNWaXNpYmxlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIgaW5zdGFuY2VvZiBEZW1vbl8xLmRlZmF1bHQpXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLmFuaW1hdGVGaXJlYmFsbCh7IHg6IHRoaXMucmVuZGVyZWRWaWV3WCwgeTogdGhpcy5yZW5kZXJlZFZpZXdZIH0pO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueCAqIDIgKyAzNCAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm1vbnN0ZXJzLCAobW9uc3Rlci5zb3VyY2VDb2x1bW4gKiA4ICsgbW9uc3Rlci5sb29raW5nRGlyZWN0aW9uKSAqIDE3LCAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggJSAzKSAqIDE3LCAxNiwgMTYsIC10aGlzLnJlbmRlcmVkVmlld1ggJSA4MCArIChtb25zdGVyLnhQb3NpdGlvbiAtIHN0YXJ0SW5kZXhlcy54ICogMikgKiA0MCwgLXRoaXMucmVuZGVyZWRWaWV3WSAlIDgwICsgKG1vbnN0ZXIueVBvc2l0aW9uIC0gc3RhcnRJbmRleGVzLnkgKiAyKSAqIDQwLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mR29ibGlucy5mb3JFYWNoKChnb2JsaW4pID0+IHtcclxuICAgICAgICAgICAgLy9nb2JsaW4ucmVuZGVyUm9jayhzdGFydEluZGV4ZXMpXHJcbiAgICAgICAgICAgIGlmIChnb2JsaW4ueFBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy54ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnhQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueCAqIDIgKyAzNCAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnlQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueSAqIDIgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi55UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnkgKiAyICsgMjIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5tb25zdGVycywgKGdvYmxpbi5zb3VyY2VDb2x1bW4gKiA4ICsgNCkgKiAxNywgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ICUgMykgKiAxNywgMTYsIDE2LCAtdGhpcy5yZW5kZXJlZFZpZXdYICUgODAgKyAoZ29ibGluLnhQb3NpdGlvbiAtIHN0YXJ0SW5kZXhlcy54ICogMikgKiA0MCwgLXRoaXMucmVuZGVyZWRWaWV3WSAlIDgwICsgKGdvYmxpbi55UG9zaXRpb24gLSBzdGFydEluZGV4ZXMueSAqIDIpICogNDAsIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRyYXdTY29yZUFuZEhlYWx0aCgpIHtcclxuICAgICAgICBjb25zdCBzY29yZUxlbmd0aCA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNjb3JlLnRvU3RyaW5nKCkubGVuZ3RoO1xyXG4gICAgICAgIGxldCBzY29yZURpZ2l0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNiAtIHNjb3JlTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHNjb3JlRGlnaXRzLnB1c2goMCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBzY29yZURpZ2l0cy5wdXNoKHBhcnNlSW50KE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNjb3JlLnRvU3RyaW5nKCkuY2hhckF0KGkpKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm51bWJlcnMgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubnVtYmVycywgc2NvcmVEaWdpdHNbaV0gKiA5LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiA5LCA4LCA4LCA0MSArIDggKiB0aGlzLm11bHRpcGxpZXIgKiBpLCAxNzYgKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBoZWFsdGhMZW5ndGggPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5oZWFsdGgudG9TdHJpbmcoKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGhlYWx0aERpZ2l0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNCAtIGhlYWx0aExlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBoZWFsdGhEaWdpdHMucHVzaCgwKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWx0aExlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBoZWFsdGhEaWdpdHMucHVzaChwYXJzZUludChNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5oZWFsdGgudG9TdHJpbmcoKS5jaGFyQXQoaSkpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubnVtYmVycywgaGVhbHRoRGlnaXRzW2ldICogOSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogOSwgOCwgOCwgNDA0ICsgOCAqIHRoaXMubXVsdGlwbGllciAqIGksIDE3NiAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZHJhd0l0ZW1zQW5kQWJpbGl0aWVzKCk7XHJcbiAgICB9XHJcbiAgICBkcmF3SXRlbXNBbmRBYmlsaXRpZXMoKSB7XHJcbiAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQub3duZWRBYmlsaXRpZXMuZm9yRWFjaChhYmlsaXR5ID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChhYmlsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM3OiAvLyBsaWdodGJsdWUgZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxNCwgNjEwLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzODogLy8gZ3JlZW4gZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxMiwgMTIxLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOTogLy8geWVsbG93IGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTAsIDQxLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gcHVycGxlIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTEsIDgxLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0MTogLy8gYnJvd24gZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxMywgNTMwLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5rZXlzOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTUsIDM5ICsgNDAgKiBpLCAxODQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQucG90aW9uczsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdJY29uKDE2LCA2MDUgLSA0MCAqIGksIDE4NCk7XHJcbiAgICB9XHJcbiAgICBkcmF3SWNvbihzWEluZGV4LCBkWCwgZFkpIHtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubnVtYmVycywgc1hJbmRleCAqIDksIDAsIDgsIDgsIGRYLCBkWSAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICB9XHJcbiAgICBkcmF3QWJpbGl0eVNjcmVlbihpdGVtSW5kZXgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLnBpY2tVcEFiaWxpdHlTY3JlZW4sIDAsIDAsIDMyMSwgMTkyLCAwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCAtIDQwICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLmFiaWxpdHlUZXh0cywgMCwgaXRlbUluZGV4ICogOCwgMTc1LCA3LCA3NyAqIDQsIDExMSAqIDQsIDE3NiAqIChDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciAtIDEpLCA4ICogKENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyIC0gMSkpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubnVtYmVycywgMTU0LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiA5LCA2NCwgOCwgMTMwICogNCwgNzAgKiA0LCA2NCAqIChDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciAtIDEpLCA5ICogKENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyIC0gMSkpO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfVxyXG4gICAgYW5pbWF0ZUVuZGluZygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYW5pbWF0ZSBlbmRpbmcnKTtcclxuICAgICAgICB0aGlzLm9sZFRpbWUgPSB0aGlzLm5ld1RpbWU7XHJcbiAgICAgICAgdGhpcy5uZXdUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9ICh0aGlzLm5ld1RpbWUgLSB0aGlzLm9sZFRpbWUpO1xyXG4gICAgICAgIC8vZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyM3YTdhN2EnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIDI1NyAqIHRoaXMubXVsdGlwbGllciwgMTUyICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB0aGlzLmRyYXdXYWxscygpO1xyXG4gICAgICAgIHRoaXMuZHJhd0l0ZW1zKCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tb3ZlTW9uc3RlcnMoKTtcclxuICAgICAgICB0aGlzLmRyYXdNb25zdGVycygpO1xyXG4gICAgICAgIC8vIGJvdHRvbSBiYXJcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuYm90dG9tQmFyLCAwLCAwLCAyNTcsIDQwLCAwICogdGhpcy5tdWx0aXBsaWVyLCAxNTIgKiB0aGlzLm11bHRpcGxpZXIsIDI1NyAqIHRoaXMubXVsdGlwbGllciwgNDAgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIHRoaXMuZHJhd1Njb3JlQW5kSGVhbHRoKCk7XHJcbiAgICAgICAgLy8gZnBzIGluIHRoZSBjb3JuZXJcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCgxLjAgLyAodGhpcy5kZWx0YVRpbWUgLyAxMDAwKSkudG9GaXhlZCgwKS50b1N0cmluZygpLCAwLCA3ODYpO1xyXG4gICAgICAgIGxldCBpbWFnZVNvdXJjZSA9ICh0aGlzLmVuZGluZ0ZyYW1lIC0gdGhpcy5lbmRpbmdGcmFtZSAlIDMpIC8gMztcclxuICAgICAgICBpZiAoaW1hZ2VTb3VyY2UgPCAxNikge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubWFpbkNoYXJhY3RlcnMsIChpbWFnZVNvdXJjZSAlIDgpICogMTcgKyBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiAxMzYsIDAsIDE2LCAxNiwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdYLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1ksIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMud2VhcG9ucywgKGltYWdlU291cmNlIC0gMTYpICogOSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogOSwgOCwgOCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdYLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1ksIDggKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuZGluZ0ZyYW1lKys7XHJcbiAgICAgICAgaWYgKGltYWdlU291cmNlICE9IDI0KVxyXG4gICAgICAgICAgICB0aGlzLnJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRW5kaW5nKCkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQucmVzdGFydEdhbWUoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgQ2FudmFzKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ29uc3RhbnRzID0gZXhwb3J0cy5UeXBlc09mQmxvY2tzID0gdm9pZCAwO1xyXG5leHBvcnRzLlR5cGVzT2ZCbG9ja3MgPSB7XHJcbiAgICBub1RyYW5zaXRpb246IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNSwgMzAsIDMxXSxcclxuICAgIG5vVHJhbnNpdGlvbkZvclByb2plY3RpbGU6IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNSwgMjYsIDI3LCAyOCwgMzAsIDMxLCAzMiwgMzQsIDM1XSxcclxuICAgIHBpY2thYmxlSXRlbXM6IFsyNiwgMjcsIDI4LCAzMiwgMzMsIDM0LCAzNSwgMzYsIDM3LCAzOCwgMzksIDQwLCA0MSwgMzAsIDMxXSxcclxuICAgIGRlc3Ryb3lhYmxlVGhpbmdzOiBbMTYsIDE3LCAxOCwgMjAsIDIxLCAyMiwgMjMsIDI0LCAyNSwgMzMsIDM2LCAzNywgMzgsIDM5LCA0MCwgNDFdLFxyXG4gICAgZGVzdHJveWFibGVUaGluZ3NCeUhhbmQ6IFsyMCwgMjEsIDIyLCA3MCwgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LCAzMCwgMzEsIC04MSwgLTgyLCAtODMsIC04NF0sXHJcbiAgICBkZXN0cm95YWJsZUJ5RGVtb25zOiBbMzMsIDM2LCAzNywgMzgsIDM5LCA0MCwgNDFdLFxyXG4gICAgbW9uc3RlcnM6IFstODAsIC04MSwgLTgyLCAtODMsIC04NCwgLTg1XVxyXG59O1xyXG5leHBvcnRzLkNvbnN0YW50cyA9IHtcclxuICAgIG11bHRpcGxpZXI6IDVcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lTWFwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZU1hcFwiKSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IFNvdW5kc0hhbmRsZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Tb3VuZHNIYW5kbGVyXCIpKTtcclxuY29uc3QgaW5kZXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9pbmRleFwiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgS2V5Ym9hcmRFdmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9LZXlib2FyZEV2ZW50c1wiKSk7XHJcbmNsYXNzIEdhbWUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFwID0gbmV3IEdhbWVNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEdhbWUoc2VsZWN0ZWRDaGFyYWN0ZXIsIHNlbGVjdGVkTWFwKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLmdhbWVNYXAuY2xlYXJNYXAoKTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LmNsZWFuRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZW5kaW5nRnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLmdhbWVNYXAubG9hZE1hcChzZWxlY3RlZE1hcCwgc2VsZWN0ZWRDaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmxhdW5jaEdhbWUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxhdW5jaEdhbWUoKSB7XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5kcmF3TGV2ZWxUaXRsZVNjcmVlbih0aGlzLmdhbWVNYXAubGV2ZWxOdW1iZXIpO1xyXG4gICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJsZXZlbFRpdGxlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwic3RhcnRMZXZlbFwiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFwLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5kaXNhYmxlRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlckdhbWVGcmFtZSgpKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFwLnNldEludGVydmFscygpO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zdGFydExvc2luZ0hQSW50ZXJ2YWwoKTtcclxuICAgICAgICB9LCA0MDAwKTtcclxuICAgIH1cclxuICAgIHJlc3RhcnRHYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVNYXAuYW5pbWF0ZVNwcml0ZXNJbnRlcnZhbCAhPT0gbnVsbClcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVNYXAuYW5pbWF0ZVNwcml0ZXNJbnRlcnZhbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU1hcC5zcGF3bmluZ01vbnN0ZXJzSW50ZXJ2YWwgIT09IG51bGwpXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5nYW1lTWFwLnNwYXduaW5nTW9uc3RlcnNJbnRlcnZhbCk7XHJcbiAgICAgICAgaW5kZXhfMS5kZWZhdWx0LmNyZWF0ZVN0YXJ0QnV0dG9uKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEdhbWUoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTWFpbkNoYXJhY3RlclwiKSk7XHJcbmNvbnN0IERlbW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvRGVtb25cIikpO1xyXG5jb25zdCBTcGF3bmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3Bhd25lclwiKSk7XHJcbmNvbnN0IEdob3N0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvR2hvc3RcIikpO1xyXG5jb25zdCBHcnVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJzL0dydW50XCIpKTtcclxuY29uc3QgRGVhdGhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9EZWF0aFwiKSk7XHJcbmNvbnN0IFNvcmNlcmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvU29yY2VyZXJcIikpO1xyXG5jb25zdCBMb2JiZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9Mb2JiZXJcIikpO1xyXG5jb25zdCBIZWxwZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGVscGVyc1wiKSk7XHJcbmNvbnN0IEtleWJvYXJkRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vS2V5Ym9hcmRFdmVudHNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBTb3VuZHNIYW5kbGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU291bmRzSGFuZGxlclwiKSk7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY2xhc3MgR2FtZU1hcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1hcCA9IFtbXV07XHJcbiAgICAgICAgdGhpcy5sZXZlbE51bWJlciA9IDA7XHJcbiAgICAgICAgdGhpcy5udW1iZXJPZlhCbG9ja3MgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtYmVyT2ZZQmxvY2tzID0gMDtcclxuICAgICAgICB0aGlzLnhTaXplSW5QaXhlbHMgPSAwO1xyXG4gICAgICAgIHRoaXMueVNpemVJblBpeGVscyA9IDA7XHJcbiAgICAgICAgdGhpcy51bml2ZXJzYWxCb3hGcmFtZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zID0gW107XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzVG9DcmVhdGUgPSBbXTtcclxuICAgICAgICB0aGlzLnNwYXduaW5nTW9uc3RlcnNJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlU3ByaXRlc0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcnRhbHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZE9mTGV2ZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJlbnRlcmluZ0V4aXRcIik7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5kaXNhYmxlRXZlbnRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LldLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuQUtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LkRLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TcGFjZUtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc3RvcExvc2luZ0hQSW50ZXJ2YWwoKTtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gQ2FudmFzXzEuZGVmYXVsdC5hbmltYXRlRW5kaW5nKCkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjbGVhck1hcCgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IFtbXV07XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZkdvYmxpbnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnNUb0NyZWF0ZSA9IFtdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9hZE1hcChtYXBOYW1lLCBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJhY3Rlck51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lID09PSBcIldhcnJpb3JcIilcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlck5hbWUgPT09IFwiVmFsa3lyaWVcIilcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlck5hbWUgPT09IFwiRWxmXCIpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOdW1iZXIgPSAyO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJOYW1lID09PSBcIldpemFyZFwiKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyTnVtYmVyID0gMztcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sID0gY2hhcmFjdGVyTnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAuL2pzb25NYXBzL21hcCR7bWFwTmFtZX0uanNvbmApO1xyXG4gICAgICAgICAgICBjb25zdCBsb2FkZWREYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5ib3R0b21CYXIgPSB5aWVsZCBJbWFnZXNfMS5kZWZhdWx0LmltYWdlTG9hZGVyKFwiYm90dG9tQmFyXCIgKyBjaGFyYWN0ZXJOdW1iZXIgKyBcIi5wbmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gdGhpcy5jcmVhdGVCaWdnZXJNYXAobG9hZGVkRGF0YS5hcnJheSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxOdW1iZXIgPSBsb2FkZWREYXRhLmxldmVsTnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVyc1RvQ3JlYXRlLmZvckVhY2gobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnN0ZXIobW9uc3Rlci54LCBtb25zdGVyLnksIG1vbnN0ZXIuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkID0gbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1swXSAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgPSBsb2FkZWREYXRhLmNoYXJhY3RlclN0YXJ0Q29vcmRzWzFdICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlcyA9IFtsb2FkZWREYXRhLmNoYXJhY3RlclN0YXJ0Q29vcmRzWzBdICogMiwgbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1sxXSAqIDJdO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5udW1iZXJPZlhCbG9ja3MgPSBsb2FkZWREYXRhLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLm51bWJlck9mWUJsb2NrcyA9IGxvYWRlZERhdGEuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnBvcnRhbHMgPSBsb2FkZWREYXRhLnBvcnRhbHM7XHJcbiAgICAgICAgICAgIHRoaXMueFNpemVJblBpeGVscyA9IHRoaXMubnVtYmVyT2ZYQmxvY2tzICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIHRoaXMueVNpemVJblBpeGVscyA9IHRoaXMubnVtYmVyT2ZZQmxvY2tzICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNjb3JlID0gbG9hZGVkRGF0YS5zdGFydFNjb3JlO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5oZWFsdGggPSBsb2FkZWREYXRhLnN0YXJ0SGVhbHRoO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5tb3ZlTWFwKCk7XHJcbiAgICAgICAgICAgIHlpZWxkIEltYWdlc18xLmRlZmF1bHQubG9hZFdhbGxzVHlwZUFuZENvbG9yKGxvYWRlZERhdGEud2FsbHNDb2xvciwgbG9hZGVkRGF0YS53YWxsc1R5cGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQmlnZ2VyTWFwKGlucHV0TWFwKSB7XHJcbiAgICAgICAgbGV0IGRvdWJsZWRNYXAgPSBbXTtcclxuICAgICAgICBpbnB1dE1hcC5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkb3VibGVkUm93ID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjZWxsSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChbMjAsIDIxLCAyMl0uaW5jbHVkZXMoY2VsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTnVtYmVyID0gdGhpcy5jcmVhdGVTcGF3bmVyKGNlbGxJbmRleCwgcm93SW5kZXgsIGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZWRSb3cucHVzaChpdGVtTnVtYmVyLCBpdGVtTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNlbGwgPj0gNzAgJiYgY2VsbCA8PSA3OCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1OdW1iZXIgPSB0aGlzLmNyZWF0ZVNwYXduZXIoY2VsbEluZGV4LCByb3dJbmRleCwgY2VsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKGl0ZW1OdW1iZXIsIGl0ZW1OdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2VsbCA8PSAtODAgJiYgY2VsbCA+PSAtODUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVyc1RvQ3JlYXRlLnB1c2goeyB4OiBjZWxsSW5kZXgsIHk6IHJvd0luZGV4LCBpZDogY2VsbCAqICgtMSkgLSA4MCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBkb3VibGVkUm93LnB1c2goMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKGNlbGwsIGNlbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZG91YmxlZE1hcC5wdXNoKFsuLi5kb3VibGVkUm93XSwgWy4uLmRvdWJsZWRSb3ddKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZG91YmxlZE1hcDtcclxuICAgIH1cclxuICAgIHNldE9uZUZpZWxkKHgsIHksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbeV1beF0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGNsZWFyQmxvY2soY29vcmRzKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMl0gPSAwO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDJdID0gMDtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV0gKiAyICsgMV1bY29vcmRzWzBdICogMiArIDFdID0gMDtcclxuICAgIH1cclxuICAgIGNsZWFyQmxvY2syKGNvb3Jkcykge1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXV1bY29vcmRzWzBdXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdXVtjb29yZHNbMF0gKyAxXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdICsgMV0gPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0QmxvY2soY29vcmRzLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDJdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMiArIDFdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDJdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0QmxvY2syKGNvb3JkcywgbmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV1dW2Nvb3Jkc1swXV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV1dW2Nvb3Jkc1swXSArIDFdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSArIDFdW2Nvb3Jkc1swXSArIDFdID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aW1lc1VwKCkge1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aCA9IDA7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuZHJhd1Njb3JlQW5kSGVhbHRoKCk7XHJcbiAgICB9XHJcbiAgICBwaWNraW5nVXBBYmlsaXR5KGl0ZW1JbmRleCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc3RvcEdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zdG9wTG9zaW5nSFBJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmRyYXdBYmlsaXR5U2NyZWVuKGl0ZW1JbmRleCk7XHJcbiAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJwaWNrZWRBYmlsaXR5XCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlckdhbWVGcmFtZSgpKTtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnN0YXJ0TG9zaW5nSFBJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldEludGVydmFscygpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGVTcHJpdGVzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTc7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFsyNiwgMjcsIDI4XS5pbmNsdWRlcygoX2IgPSAoX2EgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXVtzdGFydEluZGV4ZXMueCAqIDIgKyBpICogMl0gPSAyNiArIHRoaXMudW5pdmVyc2FsQm94RnJhbWVJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoWzQyLCA0MywgNDRdLmluY2x1ZGVzKChfZCA9IChfYyA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Nbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Rbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSA9IDQyICsgdGhpcy51bml2ZXJzYWxCb3hGcmFtZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsQm94RnJhbWVJbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxCb3hGcmFtZUluZGV4ID09IDMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbEJveEZyYW1lSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gMztcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gMylcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gMjtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gMilcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gNjtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gNilcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gMTtcclxuICAgICAgICB9LCAxNTApO1xyXG4gICAgICAgIHRoaXMuc3Bhd25pbmdNb25zdGVyc0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwYXduTW9uc3RlcnMoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gICAgaXNGaWVsZENsZWFyKHgsIHkpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xyXG4gICAgICAgIGlmICgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt5XSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3hdKSA9PSAwICYmXHJcbiAgICAgICAgICAgICgoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3ldKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbeCArIDFdKSA9PSAwICYmXHJcbiAgICAgICAgICAgICgoX2YgPSAoX2UgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lW3kgKyAxXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mW3hdKSA9PSAwICYmXHJcbiAgICAgICAgICAgICgoX2ggPSAoX2cgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW3kgKyAxXSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oW3ggKyAxXSkgPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNTbWFsbEZpZWxkQ2xlYXIoeCwgeSkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgaWYgKCgoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ldKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbeF0pID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBtb3ZlTW9uc3RlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXArKztcclxuICAgICAgICBpZiAodGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXAgIT0gMTApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubW92ZU1vbnN0ZXJzVGltZXN0YW1wID0gMDtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMyKCk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPCBzdGFydEluZGV4ZXMueClcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueCArIDM0KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnlQb3NpdGlvbiA8IHN0YXJ0SW5kZXhlcy55KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnlQb3NpdGlvbiA+IHN0YXJ0SW5kZXhlcy55ICsgMjIpXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwbGF5ZXJzQ29vcmRzID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuZ2V0Q29vcmRpbmF0ZXMyKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkKTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci5tb3ZlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbW9uc3Rlci5kaXN0YW5jZUZyb21QbGF5ZXIgPSBNYXRoLnBvdygocGxheWVyc0Nvb3Jkc1swXSAtIG1vbnN0ZXIueFBvc2l0aW9uKSwgMikgKyBNYXRoLnBvdygocGxheWVyc0Nvb3Jkc1sxXSAtIG1vbnN0ZXIueVBvc2l0aW9uKSwgMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSB0aGlzLmFycmF5T2ZNb25zdGVycy5maWx0ZXIoKG1vbnN0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIuZGlzdGFuY2VGcm9tUGxheWVyICE9PSA0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnNvdXJjZUNvbHVtbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwiZ290SGl0QnlHaG9zdFwiKTtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNoYW5nZUhlYWx0aCgtNSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDUpIHtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNoYW5nZUhlYWx0aCgtMSk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwiZ290SGl0QnlEZWF0aFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY2hhbmdlSGVhbHRoKC01KTtcclxuICAgICAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJnb3RIaXRCeUdydW50RGVtb25cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLmZvckVhY2gobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci5kaXN0YW5jZUZyb21QbGF5ZXIgIT0gaSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRDb29yZHMgPSBbbW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJCbG9jazIoW21vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbl0pO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtb25zdGVyLmxvb2tpbmdEaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8xXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uICsgMikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyA0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vN1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzZcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha01lOiBpZiAobW9uc3RlciBpbnN0YW5jZW9mIFNvcmNlcmVyXzEuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRDb29yZHNbMF0gPT09IG1vbnN0ZXIueFBvc2l0aW9uICYmIG9sZENvb3Jkc1sxXSA9PT0gbW9uc3Rlci55UG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBicmVha01lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIgaW5zdGFuY2VvZiBEZW1vbl8xLmRlZmF1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5jaGVja0ZvclNob290KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEJsb2NrMihbbW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uXSwgbW9uc3Rlci5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsZWFyTWFwRnJvbU1vbnN0ZXJzQW5kU3Bhd25lcnMoaXRlbVVzZWQpIHtcclxuICAgICAgICBpZiAoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQucG90aW9ucyA9PT0gMCAmJiBpdGVtVXNlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXhlcyA9IEhlbHBlcnNfMS5kZWZhdWx0LmdldFN0YXJ0SW5kZXhlcygpO1xyXG4gICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJkZXN0cm95Qm90dGxlXCIpO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzID0gdGhpcy5hcnJheU9mTW9uc3RlcnMuZmlsdGVyKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueCAqIDIgKyAzNCAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikge1xyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mR29ibGlucyA9IHRoaXMuYXJyYXlPZkdvYmxpbnMuZmlsdGVyKGdvYmxpbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChnb2JsaW4ueFBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy54ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnhQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueCAqIDIgKyAzNCAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnlQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueSAqIDIgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi55UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnkgKiAyICsgMjIpIHtcclxuICAgICAgICAgICAgICAgIGdvYmxpbi5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSB0aGlzLmFycmF5T2ZTcGF3bmVycy5maWx0ZXIoc3Bhd25lciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnhQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgICAgIHNwYXduZXIueFBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgICAgICBzcGF3bmVyLnlQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueSAqIDIgJiZcclxuICAgICAgICAgICAgICAgIHNwYXduZXIueVBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGF3bmVyLmRlc3Ryb3llZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpdGVtVXNlZClcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQucG90aW9ucy0tO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlU3Bhd25lcih4LCB5LCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCByZXR1cm5JdGVtSW5kZXggPSB2YWx1ZTtcclxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICAgIGNhc2UgMjE6XHJcbiAgICAgICAgICAgIGNhc2UgMjI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycy5wdXNoKG5ldyBTcGF3bmVyXzEuZGVmYXVsdCh4ICogMiwgeSAqIDIsIDApKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDcwOlxyXG4gICAgICAgICAgICBjYXNlIDcxOlxyXG4gICAgICAgICAgICBjYXNlIDcyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMucHVzaChuZXcgU3Bhd25lcl8xLmRlZmF1bHQoeCAqIDIsIHkgKiAyLCAxKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5JdGVtSW5kZXggLT0gNDc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3MzpcclxuICAgICAgICAgICAgY2FzZSA3NDpcclxuICAgICAgICAgICAgY2FzZSA3NTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzLnB1c2gobmV3IFNwYXduZXJfMS5kZWZhdWx0KHggKiAyLCB5ICogMiwgMikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuSXRlbUluZGV4IC09IDUwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzY6XHJcbiAgICAgICAgICAgIGNhc2UgNzc6XHJcbiAgICAgICAgICAgIGNhc2UgNzg6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycy5wdXNoKG5ldyBTcGF3bmVyXzEuZGVmYXVsdCh4ICogMiwgeSAqIDIsIDMpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybkl0ZW1JbmRleCAtPSA1MztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJuSXRlbUluZGV4O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlTW9uc3Rlcih4LCB5LCBtb2JJZCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUNvbHVtbiA9IG1vYklkO1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IEdob3N0XzEuZGVmYXVsdCgwLCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5wdXNoKG5ldyBHcnVudF8xLmRlZmF1bHQoMSwgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgRGVtb25fMS5kZWZhdWx0KDIsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IFNvcmNlcmVyXzEuZGVmYXVsdCgzLCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zLnB1c2gobmV3IExvYmJlcl8xLmRlZmF1bHQoNCwgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgRGVhdGhfMS5kZWZhdWx0KDUsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3Bhd25Nb25zdGVycygpIHtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMyKCk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMuZm9yRWFjaChzcGF3bmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIueFBvc2l0aW9uIDwgc3RhcnRJbmRleGVzLngpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnhQb3NpdGlvbiA+IHN0YXJ0SW5kZXhlcy54ICsgMzQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnlQb3NpdGlvbiA8IHN0YXJ0SW5kZXhlcy55KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci55UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueSArIDIyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzcGF3bmVyLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZysrO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci5sYXN0VGltZVNwYXduZWRTb21ldGhpbmcgIT09IHNwYXduZXIudGltZVRvU3Bhd24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3Bhd25Nb25zdGVyKHNwYXduZXIueFBvc2l0aW9uLCBzcGF3bmVyLnlQb3NpdGlvbiwgc3Bhd25lci5tb2IpO1xyXG4gICAgICAgICAgICBzcGF3bmVyLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZyA9IDA7XHJcbiAgICAgICAgICAgIHNwYXduZXIudGltZVRvU3Bhd24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzcGF3bk1vbnN0ZXIoeCwgeSwgbW9iSWQpIHtcclxuICAgICAgICBsZXQgcG9zc2libGVEaXJlY3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaG9zZW5EaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZURpcmVjdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgbGV0IG5ld0Nvb3JkcyA9IHRoaXMuZGlyZWN0aW9uVG9Db29yZHMoeCwgeSwgY2hvc2VuRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKG5ld0Nvb3Jkcy54LCBuZXdDb29yZHMueSkpIHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgTW9uc3Rlcihtb2JJZCwgNSwgNSAsbmV3Q29vcmRzLngsIG5ld0Nvb3Jkcy55LCAwKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9uc3RlcihuZXdDb29yZHMueCAvIDIsIG5ld0Nvb3Jkcy55IC8gMiwgbW9iSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlRGlyZWN0aW9ucy5zcGxpY2UocG9zc2libGVEaXJlY3Rpb25zLmluZGV4T2YoY2hvc2VuRGlyZWN0aW9uKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlU3Bhd25lcihjb29yZHMpIHtcclxuICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycyA9IHRoaXMuYXJyYXlPZlNwYXduZXJzLmZpbHRlcihzcGF3bmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIueFBvc2l0aW9uID09IGNvb3Jkc1swXSAqIDIgJiYgc3Bhd25lci55UG9zaXRpb24gPT0gY29vcmRzWzFdICogMilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkaXJlY3Rpb25Ub0Nvb3Jkcyh4LCB5LCBkaXJlY3Rpb24pIHtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IC0gMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4ICsgMiwgeTogeSAtIDIgfTtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCArIDIsIHk6IHkgfTtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCArIDIsIHk6IHkgKyAyIH07XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHkgKyAyIH07XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHggLSAyLCB5OiB5ICsgMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4IC0gMiwgeTogeSB9O1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4IC0gMiwgeTogeSAtIDIgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kR2xhc3MoeCwgeSkge1xyXG4gICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt5XVt4XSA9PT0gMzAgfHwgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbeV1beF0gPT09IDMxKSB7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3ldW3hdID0gMDtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbeSArIDFdW3hdID0gMDtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbeSArIDFdW3ggKyAxXSA9IDA7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3ldW3ggKyAxXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEdsYXNzKHgsIHkgKyAyKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kR2xhc3MoeCwgeSAtIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRHbGFzcyh4ICsgMiwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEdsYXNzKHggLSAyLCB5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0ZWxlcG9ydCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRlbGVwb3J0XCIpO1xyXG4gICAgICAgIHRoaXMucG9ydGFscy5mb3JFYWNoKChwb3J0YWxDb25uZWN0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBwb3J0YWxDb25uZWN0aW9uLmZvckVhY2goKHBvcnRhbCwgaW5kZXgyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9ydGFsWzBdICE9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlc1swXSAvIDIgfHxcclxuICAgICAgICAgICAgICAgICAgICBwb3J0YWxbMV0gIT0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY29vcmRzQXJyYXlJbmRleGVzWzFdIC8gMilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0UG9ydGFsQ29vcmRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4MiA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFBvcnRhbENvb3JkcyA9IHBvcnRhbENvbm5lY3Rpb25bMV07XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UG9ydGFsQ29vcmRzID0gcG9ydGFsQ29ubmVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmZpbmRQbGFjZVRvVGVsZXBvcnQoW3RhcmdldFBvcnRhbENvb3Jkc1swXSAqIDIsIHRhcmdldFBvcnRhbENvb3Jkc1sxXSAqIDJdKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY29vcmRzQXJyYXlJbmRleGVzID0gW3Jlc1swXSwgcmVzWzFdXTtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlcywgMCk7XHJcbiAgICAgICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC54Q29vcmQgPSByZXNbMF0gLyAyICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgPSByZXNbMV0gLyAyICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0Lm1vdmVNYXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmaW5kUGxhY2VUb1RlbGVwb3J0KGNvb3Jkcykge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihjb29yZHNbMF0gKyAyLCBjb29yZHNbMV0pKVxyXG4gICAgICAgICAgICByZXR1cm4gW2Nvb3Jkc1swXSArIDIsIGNvb3Jkc1sxXV07XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0ZpZWxkQ2xlYXIoY29vcmRzWzBdLCBjb29yZHNbMV0gKyAyKSlcclxuICAgICAgICAgICAgcmV0dXJuIFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIDJdO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNGaWVsZENsZWFyKGNvb3Jkc1swXSAtIDIsIGNvb3Jkc1sxXSkpXHJcbiAgICAgICAgICAgIHJldHVybiBbY29vcmRzWzBdIC0gMiwgY29vcmRzWzFdXTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzRmllbGRDbGVhcihjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIDIpKVxyXG4gICAgICAgICAgICByZXR1cm4gW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gMl07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBHYW1lTWFwO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jbGFzcyBIZWxwZXJzIHtcclxuICAgIGdldFN0YXJ0SW5kZXhlcygpIHtcclxuICAgICAgICBsZXQgeCA9IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCAtIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCAlIDgwO1xyXG4gICAgICAgIGxldCB5ID0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZIC0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZICUgODA7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogeCAvIDgwLCB5OiB5IC8gODAgfTtcclxuICAgIH1cclxuICAgIGdldFN0YXJ0SW5kZXhlczIoKSB7XHJcbiAgICAgICAgbGV0IHggPSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggLSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggJSA0MDtcclxuICAgICAgICBsZXQgeSA9IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSAtIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSAlIDQwO1xyXG4gICAgICAgIHJldHVybiB7IHg6IHggLyA0MCwgeTogeSAvIDQwIH07XHJcbiAgICB9XHJcbiAgICByZXBsYWNlQ29sb3JJbkNhbnZhcyhjYW52YXMsIHNvdXJjZUNvbG9yLCB0YXJnZXRDb2xvciwgdG9sZXJhbmNlKSB7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgaWYgKCFjdHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHZXQgdGhlIGNhbnZhcyBkaW1lbnNpb25zXHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgICAgICAvLyBDcmVhdGUgYW4gaW1hZ2UgZGF0YSBvYmplY3RcclxuICAgICAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBzb3VyY2UgYW5kIHRhcmdldCBjb2xvcnMgdG8gUkdCIGZvcm1hdFxyXG4gICAgICAgIGNvbnN0IHNvdXJjZVJHQiA9IHRoaXMuaGV4VG9SR0Ioc291cmNlQ29sb3IpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFJHQiA9IHRoaXMuaGV4VG9SR0IodGFyZ2V0Q29sb3IpO1xyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29sb3IgZGlmZmVyZW5jZSB0aHJlc2hvbGRcclxuICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBNYXRoLnNxcnQoMyAqIHRvbGVyYW5jZSAqIHRvbGVyYW5jZSk7XHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGVhY2ggcGl4ZWwgaW4gdGhlIGNhbnZhc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xyXG4gICAgICAgICAgICBjb25zdCByID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgY29uc3QgZyA9IGRhdGFbaSArIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBiID0gZGF0YVtpICsgMl07XHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29sb3IgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBwaXhlbCBhbmQgdGhlIHNvdXJjZSBjb2xvclxyXG4gICAgICAgICAgICBjb25zdCBjb2xvckRpZmZlcmVuY2UgPSB0aGlzLmNhbGN1bGF0ZUNvbG9yRGlmZmVyZW5jZShzb3VyY2VSR0IsIHsgciwgZywgYiB9KTtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIGNvbG9yIGRpZmZlcmVuY2UgaXMgd2l0aGluIHRoZSB0b2xlcmFuY2UsIHJlcGxhY2UgdGhlIGNvbG9yXHJcbiAgICAgICAgICAgIGlmIChjb2xvckRpZmZlcmVuY2UgPD0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2ldID0gdGFyZ2V0UkdCLnI7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2kgKyAxXSA9IHRhcmdldFJHQi5nO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpICsgMl0gPSB0YXJnZXRSR0IuYjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBQdXQgdGhlIG1vZGlmaWVkIGltYWdlIGRhdGEgYmFjayB0byB0aGUgY2FudmFzXHJcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xyXG4gICAgfVxyXG4gICAgaGV4VG9SR0IoaGV4KSB7XHJcbiAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2UoL14jLywgJycpO1xyXG4gICAgICAgIGNvbnN0IGJpZ2ludCA9IHBhcnNlSW50KGhleCwgMTYpO1xyXG4gICAgICAgIGNvbnN0IHIgPSAoYmlnaW50ID4+IDE2KSAmIDI1NTtcclxuICAgICAgICBjb25zdCBnID0gKGJpZ2ludCA+PiA4KSAmIDI1NTtcclxuICAgICAgICBjb25zdCBiID0gYmlnaW50ICYgMjU1O1xyXG4gICAgICAgIHJldHVybiB7IHIsIGcsIGIgfTtcclxuICAgIH1cclxuICAgIGNhbGN1bGF0ZUNvbG9yRGlmZmVyZW5jZShjb2xvcjEsIGNvbG9yMikge1xyXG4gICAgICAgIGNvbnN0IGRyID0gY29sb3IxLnIgLSBjb2xvcjIucjtcclxuICAgICAgICBjb25zdCBkZyA9IGNvbG9yMS5nIC0gY29sb3IyLmc7XHJcbiAgICAgICAgY29uc3QgZGIgPSBjb2xvcjEuYiAtIGNvbG9yMi5iO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoZHIgKiBkciArIGRnICogZGcgKyBkYiAqIGRiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgSGVscGVycygpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEhlbHBlcnNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9IZWxwZXJzXCIpKTtcclxuY2xhc3MgSW1hZ2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0cyA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXQgYXNzZXRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9hc3NldHMgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFjY2VzcyBhc3NldHMgd2hpY2ggYXJlIG5vdCBsb2FkZWQuJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fzc2V0cztcclxuICAgIH1cclxuICAgIGxvYWRJbWFnZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgW2FiaWxpdHlUZXh0cywgYmlnTnVtYmVycywgaXRlbXMsIGxldmVsVGl0bGVTY3JlZW4sIG1haW5DaGFyYWN0ZXJzLCBtb25zdGVycywgbnVtYmVycywgcGlja1VwQWJpbGl0eVNjcmVlbiwgc3RhcnRTY3JlZW4sIHdhbGxzLCB3YWxsc09yaWdpbiwgd2VhcG9uc10gPSB5aWVsZCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwiYWJpbGl0eVRleHRzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJiaWdOdW1iZXJzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJpdGVtcy5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwibGV2ZWxUaXRsZVNjcmVlbi5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwibWFpbkNoYXJhY3RlcnMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcIm1vbnN0ZXJzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJudW1iZXJzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJwaWNrVXBBYmlsaXR5U2NyZWVuLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJzdGFydFNjcmVlbi5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwid2FsbHMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcIndhbGxzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJ3ZWFwb25zLnBuZ1wiKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzID0ge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eVRleHRzLFxyXG4gICAgICAgICAgICAgICAgYmlnTnVtYmVycyxcclxuICAgICAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxUaXRsZVNjcmVlbixcclxuICAgICAgICAgICAgICAgIG1haW5DaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgbW9uc3RlcnMsXHJcbiAgICAgICAgICAgICAgICBudW1iZXJzLFxyXG4gICAgICAgICAgICAgICAgcGlja1VwQWJpbGl0eVNjcmVlbixcclxuICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuLFxyXG4gICAgICAgICAgICAgICAgd2VhcG9ucyxcclxuICAgICAgICAgICAgICAgIGJvdHRvbUJhcjogbmV3IEltYWdlKCksXHJcbiAgICAgICAgICAgICAgICB3YWxscyxcclxuICAgICAgICAgICAgICAgIHdhbGxzT3JpZ2luXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpbWFnZUxvYWRlcihmaWxlTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBob3RvID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBwaG90by5zcmMgPSBcImltYWdlcy9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgICAgICAgICAgcGhvdG8ub25sb2FkID0gKCkgPT4gcmVzb2x2ZShwaG90byk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9hZFdhbGxzVHlwZUFuZENvbG9yKHdhbGxzQ29sb3IsIHdhbGxzVHlwZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSAzMjI7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSAxNjtcclxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmFzc2V0cy53YWxsc09yaWdpbiwgMCwgMTcgKiB3YWxsc1R5cGUsIDMyMiwgMTYsIDAsIDAsIDMyMiwgMTYpO1xyXG4gICAgICAgICAgICBIZWxwZXJzXzEuZGVmYXVsdC5yZXBsYWNlQ29sb3JJbkNhbnZhcyhjYW52YXMsIFwiIzYwNDllZFwiLCB3YWxsc0NvbG9yLCAzMCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Fzc2V0cyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXNzZXRzLndhbGxzID0gaW1nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBJbWFnZXMoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5EaXJlY3Rpb25zID0gdm9pZCAwO1xyXG52YXIgRGlyZWN0aW9ucztcclxuKGZ1bmN0aW9uIChEaXJlY3Rpb25zKSB7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJUT1BcIl0gPSAwXSA9IFwiVE9QXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJUT1BfUklHSFRcIl0gPSAxXSA9IFwiVE9QX1JJR0hUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJSSUdIVFwiXSA9IDJdID0gXCJSSUdIVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiQk9UVE9NX1JJR0hUXCJdID0gM10gPSBcIkJPVFRPTV9SSUdIVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiQk9UVE9NXCJdID0gNF0gPSBcIkJPVFRPTVwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiQk9UVE9NX0xFRlRcIl0gPSA1XSA9IFwiQk9UVE9NX0xFRlRcIjtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIkxFRlRcIl0gPSA2XSA9IFwiTEVGVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiVE9QX0xFRlRcIl0gPSA3XSA9IFwiVE9QX0xFRlRcIjtcclxufSkoRGlyZWN0aW9ucyA9IGV4cG9ydHMuRGlyZWN0aW9ucyB8fCAoZXhwb3J0cy5EaXJlY3Rpb25zID0ge30pKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZVwiKSk7XHJcbmNsYXNzIEtleWJvYXJkRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNwYWNlS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUV2ZW50cyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUV2ZW50cylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlXXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLldLZXlDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIldcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5wdXNoKFwiV1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU0tleUNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGFja09mQ2xpY2tzLmluY2x1ZGVzKFwiU1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJTXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5QVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YWNrT2ZDbGlja3MuaW5jbHVkZXMoXCJBXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3MucHVzaChcIkFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlEXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRLZXlDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIkRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5wdXNoKFwiRFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNwYWNlS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlRXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiV1wiKSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnNwbGljZSh0aGlzLnN0YWNrT2ZDbGlja3MuaW5kZXhPZihcIlNcIiksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5QVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5zcGxpY2UodGhpcy5zdGFja09mQ2xpY2tzLmluZGV4T2YoXCJBXCIpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleURcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiRFwiKSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJTcGFjZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3BhY2VLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlDXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhck1hcEZyb21Nb25zdGVyc0FuZFNwYXduZXJzKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNsZWFuRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNwYWNlS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcyA9IFtdO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBLZXlib2FyZEV2ZW50cygpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBLZXlib2FyZEV2ZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0tleWJvYXJkRXZlbnRzXCIpKTtcclxuY29uc3QgUHJvamVjdGlsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Byb2plY3RpbGVcIikpO1xyXG5jb25zdCBDb25zdHNfMSA9IHJlcXVpcmUoXCIuL0NvbnN0c1wiKTtcclxuY29uc3QgU291bmRzSGFuZGxlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1NvdW5kc0hhbmRsZXJcIikpO1xyXG5jb25zdCBTb3JjZXJlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJzL1NvcmNlcmVyXCIpKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0dhbWVcIikpO1xyXG5jb25zdCBtb3ZlID0gMjtcclxuY2xhc3MgTWFpbkNoYXJhY3RlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDIwO1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gMjAwMDtcclxuICAgICAgICB0aGlzLm93bmVkQWJpbGl0aWVzID0gW107XHJcbiAgICAgICAgdGhpcy5rZXlzID0gMDtcclxuICAgICAgICB0aGlzLnBvdGlvbnMgPSAwO1xyXG4gICAgICAgIHRoaXMueENvb3JkID0gMDtcclxuICAgICAgICB0aGlzLnlDb29yZCA9IDA7XHJcbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSAxNjtcclxuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDE2O1xyXG4gICAgICAgIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCA9IDE2O1xyXG4gICAgICAgIHRoaXMubGFzdERpcmVjdGlvbiA9IFs0LCAwXTtcclxuICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDU7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZSA9IDM7XHJcbiAgICAgICAgdGhpcy50aGlyZEZyYW1lID0gMTtcclxuICAgICAgICB0aGlzLl9sb3NpbmdIUEludGVydmFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IG5ldyBQcm9qZWN0aWxlXzEuZGVmYXVsdCh0aGlzLnNvdXJjZUNvbCwgMCwgMCwgMCk7XHJcbiAgICB9XHJcbiAgICBnZXQgbG9zaW5nSFBJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9zaW5nSFBJbnRlcnZhbCA9PT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWNjZXNzIGludGVydmFsJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvc2luZ0hQSW50ZXJ2YWw7XHJcbiAgICB9XHJcbiAgICBzdGFydExvc2luZ0hQSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9zaW5nSFBJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIZWFsdGgoLTEpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gICAgc3RvcExvc2luZ0hQSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmxvc2luZ0hQSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG4gICAgY2hlY2tJZlBsYXllcklzRGVhZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC50aW1lc1VwKCk7XHJcbiAgICB9XHJcbiAgICBhbmltYXRlUHJvamVjdGlsZSgpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcclxuICAgICAgICBpZiAodGhpcy53ZWFwb24ueFBvc2l0aW9uIDwgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYIC0gODAgfHxcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uID4gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYICsgQ2FudmFzXzEuZGVmYXVsdC53aWR0aCB8fFxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgKyBDYW52YXNfMS5kZWZhdWx0LmhlaWdodCB8fFxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPCBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgLSA4MClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgUHJvamVjdGlsZUNvb3JkcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXM0KHRoaXMud2VhcG9uLnhQb3NpdGlvbiArIDIwLCB0aGlzLndlYXBvbi55UG9zaXRpb24gKyAyMCk7XHJcbiAgICAgICAgaWYgKENvbnN0c18xLlR5cGVzT2ZCbG9ja3Mubm9UcmFuc2l0aW9uRm9yUHJvamVjdGlsZS5pbmNsdWRlcygoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW1Byb2plY3RpbGVDb29yZHNbMV0gKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW1Byb2plY3RpbGVDb29yZHNbMF0gKiAyXSkpXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpbnZpc2libGVTb3JjZXJlckhpdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChDb25zdHNfMS5UeXBlc09mQmxvY2tzLm1vbnN0ZXJzLmluY2x1ZGVzKChfZCA9IChfYyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDJdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbUHJvamVjdGlsZUNvb3Jkc1swXSAqIDJdKSkge1xyXG4gICAgICAgICAgICBsZXQga2lsbGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZk1vbnN0ZXJzID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mTW9uc3RlcnMuZmlsdGVyKChtb25zdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gLSAxID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiArIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgKyAxICYmIG1vbnN0ZXIueVBvc2l0aW9uICsgMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3RlciBpbnN0YW5jZW9mIFNvcmNlcmVyXzEuZGVmYXVsdCAmJiBtb25zdGVyLmlzVmlzaWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlU29yY2VyZXJIaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZkdvYmxpbnMgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZHb2JsaW5zLmZpbHRlcigobW9uc3RlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtpbGxlZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICgobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gKyAxID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiAtIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICsgMSAmJiBtb25zdGVyLnlQb3NpdGlvbiArIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChpbnZpc2libGVTb3JjZXJlckhpdCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi50aHJvd24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENvbnN0c18xLlR5cGVzT2ZCbG9ja3MuZGVzdHJveWFibGVUaGluZ3MuaW5jbHVkZXMoKF9mID0gKF9lID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVtQcm9qZWN0aWxlQ29vcmRzWzFdICogMl0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZltQcm9qZWN0aWxlQ29vcmRzWzBdICogMl0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVRoaW5nKFByb2plY3RpbGVDb29yZHMsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi50aHJvd24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMud2VhcG9uLmRpcmVjdGlvbjtcclxuICAgICAgICBsZXQgc3BlZWQgPSA0O1xyXG4gICAgICAgIGlmIChbMiwgMywgNF0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbNiwgNywgOF0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbOCwgMSwgMl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbNCwgNSwgNl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZUNvbCAhPSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMud2VhcG9uLmFuaW1hdGlvblRpbWVzdGFtcCAlIDQgPT0gMClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24uZnJhbWUrKztcclxuICAgICAgICB0aGlzLndlYXBvbi5hbmltYXRpb25UaW1lc3RhbXArKztcclxuICAgICAgICBpZiAodGhpcy53ZWFwb24uZnJhbWUgPT0gOClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24uZnJhbWUgPSAwO1xyXG4gICAgfVxyXG4gICAgdGhyb3dXZWFwb24oKSB7XHJcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLndlYXBvbi5sYXN0VGltZVRocmV3IDwgMTUwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy53ZWFwb24ubGFzdFRpbWVUaHJldyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYXBvbi5mcmFtZSA9IHRoaXMubGFzdERpcmVjdGlvblswXTtcclxuICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gPSB0aGlzLnhDb29yZDtcclxuICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPSB0aGlzLnlDb29yZDtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubGFzdERpcmVjdGlvblswXSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDE5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSA0MDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gNDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gNDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDQwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSAxOTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMud2VhcG9uLnhQb3NpdGlvbis9MjA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2VhcG9uLmRpcmVjdGlvbiA9IHRoaXMubGFzdERpcmVjdGlvblswXSArIDE7XHJcbiAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcIndlYXBvblRocmV3XCIpO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlU2NvcmUocG9pbnRzKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSArPSBwb2ludHM7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VIZWFsdGgocG9pbnRzKSB7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggKz0gcG9pbnRzO1xyXG4gICAgICAgIHRoaXMuY2hlY2tJZlBsYXllcklzRGVhZCgpO1xyXG4gICAgfVxyXG4gICAgcmVzZXJ2ZUFycmF5KCkge1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSB0aGlzLmFjdHVhbERpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXMzKHRoaXMueENvb3JkLCB0aGlzLnlDb29yZCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIodGhpcy5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0sIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMikpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gKyAyKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gKyAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0sIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMikpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gLSAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gLSAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXV0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMikpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYW5pbWF0ZUNoYXJhY3RlcigpIHtcclxuICAgICAgICB0aGlzLmNoZWNrRm9yUGlja2luZ0l0ZW1zKCk7XHJcbiAgICAgICAgaWYgKHRoaXMud2VhcG9uLnRocm93bilcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlUHJvamVjdGlsZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID09PSAxNikge1xyXG4gICAgICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LlNwYWNlS2V5Q2xpY2tlZCAmJiB0aGlzLndlYXBvbi50aHJvd24gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhyb3dXZWFwb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlRGlyZWN0aW9ucyA9IHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb25zID0gdGhpcy5jaGVja0RpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9ucy5sZW5ndGggIT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdERpcmVjdGlvblswXSA9IHRoaXMudHdvRGlyZWN0aW9uc0ludG9PbmUoZGlyZWN0aW9ucykgLSAxO1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uc0NvcHkgPSBbLi4uZGlyZWN0aW9uc107XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMuZm9yRWFjaChkaXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gMSAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0NvcHkuc3BsaWNlKGRpcmVjdGlvbnNDb3B5LmluZGV4T2YoMSksIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gMyAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zQ29weS5zcGxpY2UoZGlyZWN0aW9uc0NvcHkuaW5kZXhPZigzKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09PSA1ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zQ29weS5zcGxpY2UoZGlyZWN0aW9uc0NvcHkuaW5kZXhPZig1KSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09PSA3ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0NvcHkuc3BsaWNlKGRpcmVjdGlvbnNDb3B5LmluZGV4T2YoNyksIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbnNDb3B5Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSB0aGlzLnR3b0RpcmVjdGlvbnNJbnRvT25lKGRpcmVjdGlvbnNDb3B5KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0dWFsRGlyZWN0aW9uID09IDIgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy50b3BSaWdodCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnRvcClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gMztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0dWFsRGlyZWN0aW9uID09IDQgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21SaWdodCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gMztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0dWFsRGlyZWN0aW9uID09IDYgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21MZWZ0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gNTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDc7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdHVhbERpcmVjdGlvbiA9PSA4ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wTGVmdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnRvcClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSA3O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sYXN0TW92ZVRpbWVzdGFtcCA8IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCArPSBtb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDaGFyYWN0ZXIobW92ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID49IDQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdERpcmVjdGlvblsxXSA9IHRoaXMudGhpcmRGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wIDwgMTIpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCArPSBtb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDaGFyYWN0ZXIobW92ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID49IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3REaXJlY3Rpb25bMV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGhpcmRGcmFtZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGhpcmRGcmFtZSA9IDI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGlyZEZyYW1lID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wIDwgMTYpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCArPSBtb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDaGFyYWN0ZXIobW92ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID49IDE2KSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2syKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzID0gdGhpcy5nZXRDb29yZGluYXRlczModGhpcy54Q29vcmQsIHRoaXMueUNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXV1bdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF1dID09PSAyOSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuZW5kT2ZMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoWzQyLCA0MywgNDRdLmluY2x1ZGVzKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXVt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC50ZWxlcG9ydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LnN0YWNrT2ZDbGlja3MubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LlNwYWNlS2V5Q2xpY2tlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCByZXMgPSB0aGlzLmNoZWNrRGlyZWN0aW9uKCk7XHJcbiAgICAgICAgbGV0IHJlczIgPSB0aGlzLnR3b0RpcmVjdGlvbnNJbnRvT25lKHJlcyk7XHJcbiAgICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uWzBdID0gcmVzMiAtIDE7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXNlcnZlQXJyYXkoKTtcclxuICAgIH1cclxuICAgIGNoZWNrRm9yQ29sbGlzaW9ucygpIHtcclxuICAgICAgICBjb25zdCBDb29yZHMgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMueENvb3JkLCB0aGlzLnlDb29yZCk7XHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZURpcmVjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRvcDogdHJ1ZSwgdG9wUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHJpZ2h0OiB0cnVlLCBib3R0b21SaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgYm90dG9tOiB0cnVlLCBib3R0b21MZWZ0OiB0cnVlLFxyXG4gICAgICAgICAgICBsZWZ0OiB0cnVlLCB0b3BMZWZ0OiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdIC0gMSwgQ29vcmRzWzBdKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSArIDEsIENvb3Jkc1swXSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0sIENvb3Jkc1swXSAtIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5sZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSwgQ29vcmRzWzBdICsgMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMucmlnaHQgPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgdGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdIC0gMSwgQ29vcmRzWzBdICsgMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcFJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdCA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICB0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0gLSAxLCBDb29yZHNbMF0gLSAxKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSArIDEsIENvb3Jkc1swXSArIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQgPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgdGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdICsgMSwgQ29vcmRzWzBdIC0gMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbUxlZnQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlRGlyZWN0aW9ucztcclxuICAgIH1cclxuICAgIGNoZWNrRm9yUGlja2luZ0l0ZW1zKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgQ29vcmRzID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnhDb29yZCwgdGhpcy55Q29vcmQpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbQ29vcmRzWzFdICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYltDb29yZHNbMF0gKiAyXTtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuVHlwZXNPZkJsb2Nrcy5waWNrYWJsZUl0ZW1zLmluY2x1ZGVzKGl0ZW1JbmRleCkpXHJcbiAgICAgICAgICAgIHRoaXMucGlja0l0ZW0oaXRlbUluZGV4LCBDb29yZHMpO1xyXG4gICAgfVxyXG4gICAgaXNGaWVsZENsZWFyKHksIHgpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdCwgX3UsIF92LCBfdywgX3gsIF95LCBfeiwgXzAsIF8xLCBfMiwgXzMsIF80LCBfNSwgXzYsIF83O1xyXG4gICAgICAgIGlmICgoKChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbeSAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbeCAqIDJdKSA8IDI2ICYmICgoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3kgKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW3ggKiAyXSkgIT0gMCkgfHxcclxuICAgICAgICAgICAgKCgoX2YgPSAoX2UgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lW3kgKiAyICsgMV0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZlt4ICogMl0pIDwgMjYgJiYgKChfaCA9IChfZyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2dbeSAqIDIgKyAxXSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oW3ggKiAyXSkgIT0gMCkgfHxcclxuICAgICAgICAgICAgKCgoX2sgPSAoX2ogPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qW3kgKiAyXSkgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rW3ggKiAyICsgMV0pIDwgMjYgJiYgKChfbSA9IChfbCA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2xbeSAqIDJdKSA9PT0gbnVsbCB8fCBfbSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX21beCAqIDIgKyAxXSkgIT0gMCkgfHxcclxuICAgICAgICAgICAgKCgoX3AgPSAoX28gPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX28gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vW3kgKiAyICsgMV0pID09PSBudWxsIHx8IF9wID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcFt4ICogMiArIDFdKSA8IDI2ICYmICgoX3IgPSAoX3EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX3EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9xW3kgKiAyICsgMV0pID09PSBudWxsIHx8IF9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfclt4ICogMiArIDFdKSAhPSAwKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICgoKChfdCA9IChfcyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NbeSAqIDJdKSA9PT0gbnVsbCB8fCBfdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RbeCAqIDJdKSA9PSAzMCkgJiZcclxuICAgICAgICAgICAgKCgoX3YgPSAoX3UgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX3UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF91W3kgKiAyICsgMV0pID09PSBudWxsIHx8IF92ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdlt4ICogMl0pID09IDMwKSAmJlxyXG4gICAgICAgICAgICAoKChfeCA9IChfdyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3dbeSAqIDJdKSA9PT0gbnVsbCB8fCBfeCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3hbeCAqIDIgKyAxXSkgPT0gMzApICYmXHJcbiAgICAgICAgICAgICgoKF96ID0gKF95ID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF95ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfeVt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfeiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3pbeCAqIDIgKyAxXSkgPT0gMzApICYmXHJcbiAgICAgICAgICAgIHRoaXMua2V5cyA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCgoKF8xID0gKF8wID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF8wID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMFt5ICogMl0pID09PSBudWxsIHx8IF8xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMVt4ICogMl0pID09IDMxKSAmJlxyXG4gICAgICAgICAgICAoKChfMyA9IChfMiA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzJbeSAqIDIgKyAxXSkgPT09IG51bGwgfHwgXzMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8zW3ggKiAyXSkgPT0gMzEpICYmXHJcbiAgICAgICAgICAgICgoKF81ID0gKF80ID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF80ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNFt5ICogMl0pID09PSBudWxsIHx8IF81ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNVt4ICogMiArIDFdKSA9PSAzMSkgJiZcclxuICAgICAgICAgICAgKCgoXzcgPSAoXzYgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgXzYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF82W3kgKiAyICsgMV0pID09PSBudWxsIHx8IF83ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfN1t4ICogMiArIDFdKSA9PSAzMSkgJiZcclxuICAgICAgICAgICAgdGhpcy5rZXlzID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHR3b0RpcmVjdGlvbnNJbnRvT25lKGRpcmVjdGlvbnMpIHtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcygxKSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDMpKVxyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcygxKSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDcpKVxyXG4gICAgICAgICAgICByZXR1cm4gODtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcyg1KSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDMpKVxyXG4gICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcyg1KSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDcpKVxyXG4gICAgICAgICAgICByZXR1cm4gNjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3Rpb25zWzBdO1xyXG4gICAgfVxyXG4gICAgbW92ZUNoYXJhY3RlcihzcGVlZCkge1xyXG4gICAgICAgIC8vICA4IDEgMlxyXG4gICAgICAgIC8vIDcgIFggIDNcclxuICAgICAgICAvLyAgNiA1IDRcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gdGhpcy5hY3R1YWxEaXJlY3Rpb247XHJcbiAgICAgICAgaWYgKFsyLCAzLCA0XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLnhDb29yZCArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoWzYsIDcsIDhdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMueENvb3JkIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbOCwgMSwgMl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy55Q29vcmQgLT0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFs0LCA1LCA2XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLnlDb29yZCArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICB0aGlzLm1vdmVNYXAoKTtcclxuICAgIH1cclxuICAgIGNoZWNrRGlyZWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuc3RhY2tPZkNsaWNrcy5zbGljZSgpO1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb25zID0gW107XHJcbiAgICAgICAgaWYgKGFyci5pbmRleE9mKFwiV1wiKSA+IGFyci5pbmRleE9mKFwiU1wiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDEpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmRleE9mKFwiV1wiKSA8IGFyci5pbmRleE9mKFwiU1wiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmNsdWRlcyhcIldcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCgxKTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJTXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goNSk7XHJcbiAgICAgICAgaWYgKGFyci5pbmRleE9mKFwiQVwiKSA+IGFyci5pbmRleE9mKFwiRFwiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDcpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmRleE9mKFwiQVwiKSA8IGFyci5pbmRleE9mKFwiRFwiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDMpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmNsdWRlcyhcIkFcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCg3KTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJEXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goMyk7XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbnM7XHJcbiAgICB9XHJcbiAgICBtb3ZlTWFwKCkge1xyXG4gICAgICAgIGxldCBnYW1lQ2FudmFzSGVpZ2h0ID0gQ2FudmFzXzEuZGVmYXVsdC5oZWlnaHQgLSAyMDA7XHJcbiAgICAgICAgbGV0IG1hcFggPSB0aGlzLnhDb29yZCArIDQwIC0gKENhbnZhc18xLmRlZmF1bHQud2lkdGggKyAxKSAvIDI7XHJcbiAgICAgICAgbGV0IG1hcFkgPSB0aGlzLnlDb29yZCArIDQwIC0gZ2FtZUNhbnZhc0hlaWdodCAvIDI7XHJcbiAgICAgICAgaWYgKG1hcFggPCAwKVxyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKG1hcFggKyBDYW52YXNfMS5kZWZhdWx0LndpZHRoID49IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAueFNpemVJblBpeGVscylcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC54U2l6ZUluUGl4ZWxzIC0gQ2FudmFzXzEuZGVmYXVsdC53aWR0aDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCA9IG1hcFg7XHJcbiAgICAgICAgaWYgKG1hcFkgPCAwKVxyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKG1hcFkgKyBnYW1lQ2FudmFzSGVpZ2h0ID49IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAueVNpemVJblBpeGVscylcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC55U2l6ZUluUGl4ZWxzIC0gZ2FtZUNhbnZhc0hlaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSA9IG1hcFk7XHJcbiAgICB9XHJcbiAgICBnZXRDb29yZGluYXRlcyh4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9ICh4ICsgNDAgLSAoeCArIDQwKSAlIDgwKSAvIDgwO1xyXG4gICAgICAgIGxldCB5SW5kZXggPSAoeSArIDQwIC0gKHkgKyA0MCkgJSA4MCkgLyA4MDtcclxuICAgICAgICByZXR1cm4gW3hJbmRleCwgeUluZGV4XTtcclxuICAgIH1cclxuICAgIGdldENvb3JkaW5hdGVzMih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9IHggLyA0MDtcclxuICAgICAgICBsZXQgeUluZGV4ID0geSAvIDQwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vcmRpbmF0ZXMzKHgsIHkpIHtcclxuICAgICAgICBsZXQgeEluZGV4ID0gKHggLSB4ICUgNDApIC8gNDA7XHJcbiAgICAgICAgbGV0IHlJbmRleCA9ICh5IC0geSAlIDQwKSAvIDQwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vcmRpbmF0ZXM0KHgsIHkpIHtcclxuICAgICAgICBsZXQgeEluZGV4ID0gKHggLSB4ICUgODApIC8gODA7XHJcbiAgICAgICAgbGV0IHlJbmRleCA9ICh5IC0geSAlIDgwKSAvIDgwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZGVzdHJveVRoaW5nKGNvb3JkcywgYWRkU2NvcmUpIHtcclxuICAgICAgICBjb25zdCBpdGVtSUQgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyXTtcclxuICAgICAgICBzd2l0Y2ggKGl0ZW1JRCkge1xyXG4gICAgICAgICAgICBjYXNlIDE2OlxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhjb29yZHMsIDE3KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE3OlxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhjb29yZHMsIDE4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhckJsb2NrKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgY2FzZSAyMTpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5kZWxldGVTcGF3bmVyKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMjpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2soY29vcmRzLCAyMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMzpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2soY29vcmRzLCAyNSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyNDpcclxuICAgICAgICAgICAgY2FzZSAyNTpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5kZWxldGVTcGF3bmVyKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMzpcclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgY2FzZSA0MTpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzY6XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJNYXBGcm9tTW9uc3RlcnNBbmRTcGF3bmVycyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwaWNrSXRlbShpdGVtSW5kZXgsIGNvb3Jkcykge1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbUluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjY6IC8vYm94IC0gdHJlYXN1cmVcclxuICAgICAgICAgICAgY2FzZSAyNzogLy9ib3ggLSB0cmVhc3VyZVxyXG4gICAgICAgICAgICBjYXNlIDI4OiAvL2JveCAtIHRyZWFzdXJlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMyOiAvLyBrZXlcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5cysrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcInBpY2tlZEtleVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMzOiAvL3llbGxvdyBib3R0bGUgLSBjaWRlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIZWFsdGgoMTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTAwKTtcclxuICAgICAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJwaWNrZWRJdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzQ6IC8vZm9vZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIZWFsdGgoMTAwKTtcclxuICAgICAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJwaWNrZWRJdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzU6IC8vYW11bGV0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM2OiAvLyBibHVlIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3Rpb25zKys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM3OiAvLyBsaWdodGJsdWUgZWxpeGlyID0gZmlnaHQgcG93ZXJcclxuICAgICAgICAgICAgY2FzZSAzODogLy8gZ3JlZW4gZWxpeGlyICAgICA9IG1hZ2ljIHBvd2VyXHJcbiAgICAgICAgICAgIGNhc2UgMzk6IC8vIHllbGxvdyBlbGl4aXIgICAgPSBleHRyYSBhcm1vclxyXG4gICAgICAgICAgICBjYXNlIDQwOiAvLyBwdXJwbGUgZWxpeGlyICAgID0gY2FycnlpbmcgYWJpbGl0eVxyXG4gICAgICAgICAgICBjYXNlIDQxOiAvLyBicm93biBlbGl4aXIgICAgID0gc2hvdCBwb3dlclxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm93bmVkQWJpbGl0aWVzLmluY2x1ZGVzKGl0ZW1JbmRleCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lZEFiaWxpdGllcy5wdXNoKGl0ZW1JbmRleCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnBpY2tpbmdVcEFiaWxpdHkoaXRlbUluZGV4IC0gMzcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgICAgIGNhc2UgMzE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleXMtLTtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuZmluZEdsYXNzKGNvb3Jkc1swXSAqIDIsIGNvb3Jkc1sxXSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcIm9wZW5Eb29yc1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyXSA9IDA7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMiArIDFdID0gMDtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyICsgMV1bY29vcmRzWzBdICogMl0gPSAwO1xyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW2Nvb3Jkc1sxXSAqIDIgKyAxXVtjb29yZHNbMF0gKiAyICsgMV0gPSAwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBNYWluQ2hhcmFjdGVyKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgRGVhdGggZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IERlYXRoO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBJbnRlcmZhY2VzXzEgPSByZXF1aXJlKFwiLi4vSW50ZXJmYWNlc1wiKTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vQ2FudmFzXCIpKTtcclxuY29uc3QgSW1hZ2VzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0ltYWdlc1wiKSk7XHJcbmNvbnN0IENvbnN0c18xID0gcmVxdWlyZShcIi4uL0NvbnN0c1wiKTtcclxuY29uc3QgTWFpbkNoYXJhY3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9HYW1lXCIpKTtcclxuY2xhc3MgRGVtb24gZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IDEsIHk6IDEgfTtcclxuICAgICAgICB0aGlzLmZpcmViYWxsVGhyZXcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZpcmViYWxsRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QO1xyXG4gICAgICAgIHRoaXMubGFzdEZpcmViYWxsVGhyZXdUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdEZpcmViYWxsVGhyZXdUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgfVxyXG4gICAgY2hlY2tGb3JTaG9vdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJlYmFsbFRocmV3KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLmxhc3RGaXJlYmFsbFRocmV3VGltZXN0YW1wIDwgMTAwMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmdldENvb3JkaW5hdGVzKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkKTtcclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPT0gcGxheWVyQ29vcmRzWzBdICogMiAmJiB0aGlzLnlQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1ApO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPCBwbGF5ZXJDb29yZHNbMF0gKiAyICYmIHRoaXMueVBvc2l0aW9uID09PSBwbGF5ZXJDb29yZHNbMV0gKiAyKVxyXG4gICAgICAgICAgICB0aGlzLnNob290RmlyZWJhbGwoSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9SSUdIVCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPT0gcGxheWVyQ29vcmRzWzBdICogMiAmJiB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT00pO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uID4gcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9MRUZUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1swXSAqIDIgJiYgdGhpcy55UG9zaXRpb24gPT09IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1swXSAqIDIgJiZcclxuICAgICAgICAgICAgdGhpcy55UG9zaXRpb24gPiBwbGF5ZXJDb29yZHNbMV0gKiAyICYmXHJcbiAgICAgICAgICAgIE1hdGgucG93KHRoaXMueFBvc2l0aW9uIC0gcGxheWVyQ29vcmRzWzBdICogMiwgMikgPT09IE1hdGgucG93KHRoaXMueVBvc2l0aW9uIC0gcGxheWVyQ29vcmRzWzFdICogMiwgMikpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVCk7XHJcbiAgICB9XHJcbiAgICBzaG9vdEZpcmViYWxsKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDIwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgMTksIHk6IHRoaXMueVBvc2l0aW9uICogNDAgKyAyMCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgNjAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgKyAyMCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDYwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwICsgNjAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTTpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyAyMCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDYwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyAxOSwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpcmViYWxsVGhyZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24gPSB0aGlzLmxvb2tpbmdEaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5sYXN0RmlyZWJhbGxUaHJld1RpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcbiAgICBhbmltYXRlRmlyZWJhbGwocmVuZGVyZWRWaWV3KSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaDtcclxuICAgICAgICBpZiAodGhpcy5maXJlYmFsbFRocmV3ID09PSBmYWxzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGZpcmViYWxsQ29vcmRzQXJyYXkgPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5nZXRDb29yZGluYXRlczQodGhpcy5maXJlYmFsbENvb3Jkcy54ICsgMjAsIHRoaXMuZmlyZWJhbGxDb29yZHMueSArIDIwKTtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuVHlwZXNPZkJsb2Nrcy5ub1RyYW5zaXRpb25Gb3JQcm9qZWN0aWxlLmluY2x1ZGVzKChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDJdKSlcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbFRocmV3ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKENvbnN0c18xLlR5cGVzT2ZCbG9ja3MubW9uc3RlcnMuaW5jbHVkZXMoKF9kID0gKF9jID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1tmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMl0pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZFtmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBraWxsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mTW9uc3RlcnMgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZNb25zdGVycy5maWx0ZXIobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPT09IHRoaXMueFBvc2l0aW9uICYmIG1vbnN0ZXIueVBvc2l0aW9uID09PSB0aGlzLnlQb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyLnNvdXJjZUNvbHVtbiA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jaGFuZ2VTY29yZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChraWxsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiAtIDEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uICsgMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gLSAxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMiArIDEgJiYgbW9uc3Rlci55UG9zaXRpb24gKyAxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuZGllKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBraWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gR2FtZS5nYW1lTWFwLmFycmF5T2ZHb2JsaW5zID0gR2FtZS5nYW1lTWFwLmFycmF5T2ZHb2JsaW5zLmZpbHRlcihtb25zdGVyPT57XHJcbiAgICAgICAgICAgIC8vICAgICBpZihraWxsZWQpIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdKjIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSoyKSB8fFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbi0xID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0qMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdKjIpIHx8XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uKzEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSoyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0qMikgfHwgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0qMiAmJiBtb25zdGVyLnlQb3NpdGlvbi0xID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0qMikgfHxcclxuICAgICAgICAgICAgLy8gICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSoyKzEgJiYgbW9uc3Rlci55UG9zaXRpb24rMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdKjIpXHJcbiAgICAgICAgICAgIC8vICAgICApe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIG1vbnN0ZXIuZGllKGZhbHNlKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBraWxsZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDb25zdHNfMS5UeXBlc09mQmxvY2tzLmRlc3Ryb3lhYmxlQnlEZW1vbnMuaW5jbHVkZXMoKF9mID0gKF9lID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVtmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMl0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZltmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMl0pKSB7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmRlc3Ryb3lUaGluZyhmaXJlYmFsbENvb3Jkc0FycmF5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxUaHJldyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKChfaCA9IChfZyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2dbZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDJdKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2hbZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDJdKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJtZSBoaXRcIilcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY2hhbmdlSGVhbHRoKC01KTtcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbFRocmV3ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gMjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueCAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9SSUdIVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueCArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1AsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueSAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT00sIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9SSUdIVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueSArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICB0aGlzLmRyYXdGaXJlYmFsbChyZW5kZXJlZFZpZXcpO1xyXG4gICAgfVxyXG4gICAgZHJhd0ZpcmViYWxsKHJlbmRlcmVkVmlldykge1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy53ZWFwb25zLCB0aGlzLmZpcmViYWxsRGlyZWN0aW9uICogOSwgMyAqIDksIDgsIDgsIHRoaXMuZmlyZWJhbGxDb29yZHMueCAtIHJlbmRlcmVkVmlldy54LCB0aGlzLmZpcmViYWxsQ29vcmRzLnkgLSByZW5kZXJlZFZpZXcueSwgOCAqIENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyLCA4ICogQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IERlbW9uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNb25zdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlclwiKSk7XHJcbmNsYXNzIEdob3N0IGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBHaG9zdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jbGFzcyBHcnVudCBleHRlbmRzIE1vbnN0ZXJfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gR3J1bnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgTG9iYmVyIGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLnJvY2tDb29yZHMgPSB7IHg6IDEsIHk6IDEgfTtcclxuICAgICAgICB0aGlzLnJvY2tUaHJldyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm9jayhzdGFydEluZGV4ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5yb2NrQ29vcmRzLnggPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgIHRoaXMucm9ja0Nvb3Jkcy54IDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgIHRoaXMucm9ja0Nvb3Jkcy55ID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnJvY2tDb29yZHMueSA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikgeyB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gTG9iYmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jb25zdCBJbnRlcmZhY2VzXzEgPSByZXF1aXJlKFwiLi4vSW50ZXJmYWNlc1wiKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9HYW1lXCIpKTtcclxuY2xhc3MgTW9uc3RlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbHVtbiA9IDA7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VGcm9tUGxheWVyID0gMDtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbHVtbiA9IHNvdXJjZUNvbHVtbjtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IHhQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnlQb3NpdGlvbiA9IHlQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmlkID0gLSg4MCArIHNvdXJjZUNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gc3RhcnREaXJlY3Rpb247XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3hQb3NpdGlvbiwgeVBvc2l0aW9uXSwgdGhpcy5pZCk7XHJcbiAgICB9XHJcbiAgICBsb29rQXRNZSh4Q29vcmQsIHlDb29yZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA9PSB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPiB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA9PSB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPCB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnlQb3NpdGlvbiA9PSB5Q29vcmQgJiYgdGhpcy54UG9zaXRpb24gPiB4Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuTEVGVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy55UG9zaXRpb24gPT0geUNvb3JkICYmIHRoaXMueFBvc2l0aW9uIDwgeENvb3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlJJR0hUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA+IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA+IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPiB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPCB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX0xFRlQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uIDwgeENvb3JkICYmIHRoaXMueVBvc2l0aW9uID4geUNvb3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPCB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPCB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGllKGFkZFNjb3JlKSB7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhckJsb2NrMihbdGhpcy54UG9zaXRpb24sIHRoaXMueVBvc2l0aW9uXSk7XHJcbiAgICAgICAgaWYgKGFkZFNjb3JlKVxyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VTY29yZSg1KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBNb25zdGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNb25zdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlclwiKSk7XHJcbmNsYXNzIFNvcmNlcmVyIGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFNvcmNlcmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBDb25zdHNfMSA9IHJlcXVpcmUoXCIuL0NvbnN0c1wiKTtcclxuY29uc3QgSW1hZ2VzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSW1hZ2VzXCIpKTtcclxuY29uc3QgTWFpbkNoYXJhY3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jbGFzcyBQcm9qZWN0aWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZVJvdywgZGlyZWN0aW9uLCB4UG9zaXRpb24sIHlQb3NpdGlvbikge1xyXG4gICAgICAgIHRoaXMuc291cmNlUm93ID0gMDtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5mcmFtZSA9IDA7XHJcbiAgICAgICAgdGhpcy54UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uVGltZXN0YW1wID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lVGhyZXcgPSAwO1xyXG4gICAgICAgIHRoaXMuc291cmNlUm93ID0gc291cmNlUm93O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMueFBvc2l0aW9uID0geFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0geVBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgZHJhdyhyZW5kZXJlZFZpZXcpIHtcclxuICAgICAgICBpZiAoIU1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LndlYXBvbi50aHJvd24pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMud2VhcG9ucywgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQud2VhcG9uLmZyYW1lICogOSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogOSwgOCwgOCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQud2VhcG9uLnhQb3NpdGlvbiAtIHJlbmRlcmVkVmlldy54LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24ueVBvc2l0aW9uIC0gcmVuZGVyZWRWaWV3LnksIDggKiBDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciwgOCAqIENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBQcm9qZWN0aWxlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIGNTb3VuZEZpbGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2FkRmlsZSA9IChmaWxlX25hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnhoci5vcGVuKFwiR0VUXCIsIGZpbGVfbmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgdGhpcy54aHIub25sb2FkID0gdGhpcy5vbkxvYWRDb21wbGV0ZTtcclxuICAgICAgICAgICAgdGhpcy54aHIuc2VuZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkxvYWRDb21wbGV0ZSA9IChldikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHRoaXMueGhyID0gZXYuY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgKF9hID0gdGhpcy5jb250ZXh0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVjb2RlQXVkaW9EYXRhKHRoaXMueGhyLnJlc3BvbnNlLCB0aGlzLmRlY29kZURhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kZWNvZGVEYXRhID0gKGJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wbGF5ID0gKHN0YXJ0X3RpbWUsIGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZENvbXBsZXRlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLnN0YXJ0KHRoaXMuY29udGV4dC5jdXJyZW50VGltZSwgc3RhcnRfdGltZSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBhdWRpb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkRmlsZShcIi4vc291bmRzL2F1ZGlvLm1wM1wiKTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBjU291bmRNYXJrZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc3RhcnQsIGR1cmF0aW9uLCB2b2x1bWUsIGxvb3ApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMDtcclxuICAgICAgICB0aGlzLmxvb3AgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcclxuICAgIH1cclxufVxyXG5jbGFzcyBjU291bmRNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubXV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc291bmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fanNvbkZpbGVMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zb3VuZEZpbGVTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc291bmRNYXJrZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5fc291bmRGaWxlID0gbmV3IGNTb3VuZEZpbGUoKTtcclxuICAgICAgICB0aGlzLm1wM0VuYWJsZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gISEoYS5jYW5QbGF5VHlwZSAmJiBhLmNhblBsYXlUeXBlKFwiYXVkaW8vbXBlZztcIikucmVwbGFjZSgvbm8vLCAnJykpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wbGF5ID0gKHNvdW5kX25hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXV0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IG1hcmtlciA9IHRoaXMuc291bmRNYXJrZXJzW3NvdW5kX25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsIHx8IG1hcmtlciA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGUucGxheShtYXJrZXIuc3RhcnQsIG1hcmtlci5kdXJhdGlvbik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9sb2FkTWFya2VycyA9IChqc29uZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgbWFya2VyX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBtYXJrZXJfeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtYXJrZXJfeGhyLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgbWFya2VyX3hoci5zdGF0dXMgPT09IDIwMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblJlYWQoSlNPTi5wYXJzZShtYXJrZXJfeGhyLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoWzQwNCwgNDAzXS5pbmNsdWRlcyhtYXJrZXJfeGhyLnJlYWR5U3RhdGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uRXJyb3IobWFya2VyX3hocik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1hcmtlcl94aHIub3BlbihcIkdFVFwiLCBqc29uZmlsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1hcmtlcl94aHIuc2VuZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fb25SZWFkID0gKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbWFya2VyX25hbWUgaW4gZGF0YS5tYXJrZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFya2VycyA9IGRhdGEubWFya2Vyc1ttYXJrZXJfbmFtZV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihuZXcgY1NvdW5kTWFya2VyKG1hcmtlcl9uYW1lLCBtYXJrZXJzLnN0YXJ0LCBtYXJrZXJzLmR1cmF0aW9uLCBtYXJrZXJzLnZvbHVtZSwgbWFya2Vycy5sb29wKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fanNvbkZpbGVMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc291bmRGaWxlLmxvYWRDb21wbGV0ZSA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tcDNFbmFibGVkKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGUubG9hZEZpbGUodGhpcy5fc291bmRGaWxlU3RyaW5nICsgXCIubXAzXCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGUubG9hZEZpbGUodGhpcy5fc291bmRGaWxlU3RyaW5nICsgXCIub2dnXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5Tb3VuZEZpbGVMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9qc29uRmlsZUxvYWRlZCA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fb25FcnJvciA9ICh4aHIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIQVZFIE5PVCBMT0FERUQgU09VTkQgTUFSS0VSIEZJTEU6IFwiICsgdGhpcy5fc291bmRGaWxlU3RyaW5nICsgXCIuanNvbiBzdGF0dXM9XCIgKyB4aHIucmVhZHlTdGF0ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFkZE1hcmtlciA9IChzb3VuZF9tYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZE1hcmtlcnNbc291bmRfbWFya2VyLm5hbWVdID0gc291bmRfbWFya2VyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIgPSAobWFya2VyX25hbWUpID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc291bmRNYXJrZXJzW21hcmtlcl9uYW1lXTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgaW5pdGlhbGl6ZVNvdW5kTWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VuZF9maWxlID0gXCIuL3NvdW5kcy9hdWRpb1wiO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGVTdHJpbmcgPSBzb3VuZF9maWxlO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkTWFya2Vycyhzb3VuZF9maWxlICsgXCIuanNvblwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgY1NvdW5kTWFuYWdlcigpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZVwiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY2xhc3MgU3Bhd25lciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBtb2JJZCkge1xyXG4gICAgICAgIHRoaXMubW9iID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZyA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lVG9TcGF3biA9IDA7XHJcbiAgICAgICAgdGhpcy54UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IHg7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSB5O1xyXG4gICAgICAgIHRoaXMubW9iID0gbW9iSWQ7XHJcbiAgICAgICAgdGhpcy50aW1lVG9TcGF3biA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3llZCgpIHtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhckJsb2NrMihbdGhpcy54UG9zaXRpb24sIHRoaXMueVBvc2l0aW9uXSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gU3Bhd25lcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBTb3VuZHNIYW5kbGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU291bmRzSGFuZGxlclwiKSk7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY29uc3QgS2V5Ym9hcmRFdmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9LZXlib2FyZEV2ZW50c1wiKSk7XHJcbmNsYXNzIExvYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvbkRpdlwiKTtcclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXJTZWxlY3RcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwU2VsZWN0XCIpO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyU2VsZWN0ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAobWFwU2VsZWN0ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZENoYXJhY3RlciA9IGNoYXJhY3RlclNlbGVjdC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNYXAgPSBtYXBTZWxlY3QudmFsdWU7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LnN0YXJ0R2FtZShzZWxlY3RlZENoYXJhY3Rlciwgc2VsZWN0ZWRNYXApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydEJ1dHRvbkRpdiAhPT0gbnVsbCAmJiB0aGlzLnN0YXJ0QnV0dG9uRGl2LmZpcnN0RWxlbWVudENoaWxkICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ1dHRvbkRpdi5yZW1vdmVDaGlsZCh0aGlzLnN0YXJ0QnV0dG9uRGl2LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubG9hZFV0aWxpdGllcygpO1xyXG4gICAgfVxyXG4gICAgbG9hZFV0aWxpdGllcygpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAvL2NoZWNrIGlmIGltYWdlcyBhbmQgYXVkaW8gZmlsZXMgYXJlIHJlYWR5IGFuZCBhZGQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgIHlpZWxkIEltYWdlc18xLmRlZmF1bHQubG9hZEltYWdlcygpO1xyXG4gICAgICAgICAgICB5aWVsZCBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5pbml0aWFsaXplU291bmRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHlpZWxkIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5hZGRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdGFydEJ1dHRvbigpO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmRyYXdTdGFydFNjcmVlbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlU3RhcnRCdXR0b24oKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBzdGFydEJ1dHRvbi5pbm5lclRleHQgPSBcIlN0YXJ0IGdhbWUhXCI7XHJcbiAgICAgICAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3RhcnRHYW1lKTtcclxuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRGl2LmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgTG9hZGVyKCk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==