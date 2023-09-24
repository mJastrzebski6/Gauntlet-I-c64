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
const GameMap_1 = __importDefault(__webpack_require__(/*! ./GameMap */ "./src/GameMap.ts"));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
const Images_1 = __importDefault(__webpack_require__(/*! ./Images */ "./src/Images.ts"));
const Helpers_1 = __importDefault(__webpack_require__(/*! ./Helpers */ "./src/Helpers.ts"));
const Sorcerer_1 = __importDefault(__webpack_require__(/*! ./Sorcerer */ "./src/Sorcerer.ts"));
const Demon_1 = __importDefault(__webpack_require__(/*! ./Demon */ "./src/Demon.ts"));
const Interfaces_1 = __webpack_require__(/*! ./Interfaces */ "./src/Interfaces.ts");
const Consts_1 = __webpack_require__(/*! ./Consts */ "./src/Consts.ts");
class Canvas {
    constructor() {
        this.width = 1285;
        this.height = 960;
        this.gameMap = new GameMap_1.default("8", "Warrior");
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
        const startImage = new Image();
        startImage.src = "images/start.png";
        startImage.onload = () => {
            this.ctx.drawImage(startImage, 0, 0, 320, 200, 0, 0, 1285, 960);
        };
    }
    render() {
        if (this.gameMap.stopGame)
            return;
        this.oldTime = this.newTime;
        this.newTime = Date.now();
        this.deltaTime = (this.newTime - this.oldTime);
        //draw background
        this.ctx.fillStyle = '#7a7a7a';
        this.ctx.fillRect(0, 0, 257 * this.multiplier, 152 * this.multiplier);
        this.drawWalls();
        this.drawItems();
        this.gameMap.moveMonsters();
        MainCharacter_1.default.animateCharacter();
        this.drawCharacter();
        this.drawMonsters();
        // bottom bar
        this.ctx.drawImage(Images_1.default.bottomBar, 0, 0, 257, 40, 0 * this.multiplier, 152 * this.multiplier, 257 * this.multiplier, 40 * this.multiplier);
        this.drawScoreAndHealth();
        // fps in the corner
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText((1.0 / (this.deltaTime / 1000)).toFixed(0).toString(), 0, 786);
        this.raf = window.requestAnimationFrame(() => this.render());
    }
    drawWalls() {
        var _a, _b, _c, _d;
        const startIndexes = Helpers_1.default.getStartIndexes();
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 11; j++) {
                if (((_b = (_a = this.gameMap.map) === null || _a === void 0 ? void 0 : _a[startIndexes.y * 2 + j * 2]) === null || _b === void 0 ? void 0 : _b[startIndexes.x * 2 + i * 2]) > 19)
                    continue;
                this.ctx.drawImage(Images_1.default.wallscanvas, (((_d = (_c = this.gameMap.map) === null || _c === void 0 ? void 0 : _c[startIndexes.y * 2 + j * 2]) === null || _d === void 0 ? void 0 : _d[startIndexes.x * 2 + i * 2]) * 17) - 17, 0, 16, 16, -this.renderedViewX % 80 + i * 80, -this.renderedViewY % 80 + j * 80, 16 * this.multiplier, 16 * this.multiplier);
            }
        }
    }
    drawItems() {
        var _a, _b;
        const startIndexes = Helpers_1.default.getStartIndexes();
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 11; j++) {
                this.ctx.drawImage(Images_1.default.items, ((((_b = (_a = this.gameMap.map) === null || _a === void 0 ? void 0 : _a[startIndexes.y * 2 + j * 2]) === null || _b === void 0 ? void 0 : _b[startIndexes.x * 2 + i * 2]) - 19) * 17) - 17, 0, 16, 16, -this.renderedViewX % 80 + i * 80, -this.renderedViewY % 80 + j * 80, 16 * this.multiplier, 16 * this.multiplier);
            }
        }
    }
    drawCharacter() {
        this.ctx.drawImage(Images_1.default.mainCharacter, MainCharacter_1.default.lastDirection[0] * 17 + MainCharacter_1.default.sourceCol * 136, MainCharacter_1.default.lastDirection[1] * 17, 16, 16, MainCharacter_1.default.xCoord - this.renderedViewX, MainCharacter_1.default.yCoord - this.renderedViewY, 16 * this.multiplier, 16 * this.multiplier);
        MainCharacter_1.default.weapon.draw({ x: this.renderedViewX, y: this.renderedViewY });
    }
    drawScoreAndHealth() {
        const scoreLength = MainCharacter_1.default.score.toString().length;
        let scoreDigits = [];
        for (let i = 0; i < 6 - scoreLength; i++)
            scoreDigits.push(0);
        for (let i = 0; i < scoreLength; i++)
            scoreDigits.push(parseInt(MainCharacter_1.default.score.toString().charAt(i)));
        for (let i = 0; i < 6; i++) {
            this.ctx.drawImage(Images_1.default.numbers, scoreDigits[i] * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, 41 + 8 * this.multiplier * i, 176 * this.multiplier, 8 * this.multiplier, 8 * this.multiplier);
        }
        const healthLength = MainCharacter_1.default.health.toString().length;
        let healthDigits = [];
        for (let i = 0; i < 4 - healthLength; i++)
            healthDigits.push(0);
        for (let i = 0; i < healthLength; i++)
            healthDigits.push(parseInt(MainCharacter_1.default.health.toString().charAt(i)));
        for (let i = 0; i < 6; i++) {
            this.ctx.drawImage(Images_1.default.numbers, healthDigits[i] * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, 404 + 8 * this.multiplier * i, 176 * this.multiplier, 8 * this.multiplier, 8 * this.multiplier);
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
        this.ctx.drawImage(Images_1.default.numbers, sXIndex * 9, 0, 8, 8, dX, dY * this.multiplier, 8 * this.multiplier, 8 * this.multiplier);
    }
    launchGame() {
        let thisInterval = setInterval(() => {
            var _a;
            if (!((_a = MainCharacter_1.default.sound_manager) === null || _a === void 0 ? void 0 : _a._soundFile.loadComplete))
                return;
            this.drawLevelTitleScreen(this.gameMap.levelNumber);
            MainCharacter_1.default.sound_manager.play("levelTitle");
            setTimeout(() => {
                var _a;
                cancelAnimationFrame(this.raf);
                (_a = MainCharacter_1.default.sound_manager) === null || _a === void 0 ? void 0 : _a.play("startLevel");
                this.raf = window.requestAnimationFrame(() => this.render());
                this.gameMap.setIntervals();
            }, 4000);
            clearInterval(thisInterval);
        }, 1);
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
        this.ctx.drawImage(Images_1.default.bigNumbers, 171, MainCharacter_1.default.sourceCol * 17, 95, 16, 320, 370, 95 * (this.multiplier - 1), 16 * (this.multiplier - 1));
        for (let i = 0; i < 3; i++) {
            this.ctx.drawImage(Images_1.default.bigNumbers, levelDigits[i] * 17, MainCharacter_1.default.sourceCol * 17, 16, 16, 740 + 16 * this.multiplier * i, 370, 16 * (this.multiplier - 1), 16 * (this.multiplier - 1));
        }
        this.raf = window.requestAnimationFrame(() => this.drawLevelTitleScreen(levelNumber));
    }
    drawMonsters() {
        const startIndexes = Helpers_1.default.getStartIndexes();
        const playerCoords = MainCharacter_1.default.getCoordinates(MainCharacter_1.default.xCoord, MainCharacter_1.default.yCoord);
        this.gameMap.arrayOfMonsters.forEach((monster) => {
            monster.lookAtMe(playerCoords[0] * 2, playerCoords[1] * 2);
            if (monster instanceof Sorcerer_1.default && monster.isVisible === false)
                return;
            if (monster instanceof Demon_1.default)
                monster.animateFireball({ x: this.renderedViewX, y: this.renderedViewY });
            if (monster.xPosition >= startIndexes.x * 2 &&
                monster.xPosition <= startIndexes.x * 2 + 34 &&
                monster.yPosition >= startIndexes.y * 2 &&
                monster.yPosition <= startIndexes.y * 2 + 22) {
                this.ctx.drawImage(Images_1.default.monsters, (monster.sourceColumn * 8 + monster.lookingDirection) * 17, (this.gameMap.universalMonstersFrameIndex % 3) * 17, 16, 16, -this.renderedViewX % 80 + (monster.xPosition - startIndexes.x * 2) * 40, -this.renderedViewY % 80 + (monster.yPosition - startIndexes.y * 2) * 40, 16 * this.multiplier, 16 * this.multiplier);
            }
        });
        this.gameMap.arrayOfGoblins.forEach((goblin) => {
            //goblin.renderRock(startIndexes)
            if (goblin.xPosition >= startIndexes.x * 2 &&
                goblin.xPosition <= startIndexes.x * 2 + 34 &&
                goblin.yPosition >= startIndexes.y * 2 &&
                goblin.yPosition <= startIndexes.y * 2 + 22) {
                this.ctx.drawImage(Images_1.default.monsters, (goblin.sourceColumn * 8 + 4) * 17, (this.gameMap.universalMonstersFrameIndex % 3) * 17, 16, 16, -this.renderedViewX % 80 + (goblin.xPosition - startIndexes.x * 2) * 40, -this.renderedViewY % 80 + (goblin.yPosition - startIndexes.y * 2) * 40, 16 * this.multiplier, 16 * this.multiplier);
            }
        });
    }
    drawAbilityScreen(itemIndex) {
        let textSourceRow = 0;
        switch (itemIndex) {
            case 37:
                textSourceRow = Interfaces_1.Abilities.EXTRA_FIGHT_POWER;
                break;
            case 38:
                textSourceRow = Interfaces_1.Abilities.EXTRA_MAGIC_POWER;
                break;
            case 39:
                textSourceRow = Interfaces_1.Abilities.EXTRA_ARMOUR;
                break;
            case 40:
                textSourceRow = Interfaces_1.Abilities.EXTRA_CARRYING_ABILITY;
                break;
            case 41:
                textSourceRow = Interfaces_1.Abilities.EXTRA_SHOT_POWER;
                break;
        }
        let screen = new Image();
        screen.src = "./images/carrying.png";
        screen.onload = () => {
            this.ctx.drawImage(screen, 0, 0, 321, 192, 0, 0, this.width, this.height - 40 * this.multiplier);
            this.ctx.drawImage(Images_1.default.letters, 0, textSourceRow * 8, 175, 7, 77 * 4, 111 * 4, 176 * (Consts_1.Constants.multiplier - 1), 8 * (Consts_1.Constants.multiplier - 1));
            this.ctx.drawImage(Images_1.default.numbers, 154, MainCharacter_1.default.sourceCol * 9, 64, 8, 133 * 4, 71 * 4, 64 * (Consts_1.Constants.multiplier - 1), 9 * (Consts_1.Constants.multiplier - 1));
        };
    }
    animateEnding() {
        this.oldTime = this.newTime;
        this.newTime = Date.now();
        this.deltaTime = (this.newTime - this.oldTime);
        //draw background
        this.ctx.fillStyle = '#7a7a7a';
        this.ctx.fillRect(0, 0, 257 * this.multiplier, 152 * this.multiplier);
        this.drawWalls();
        this.drawItems();
        this.gameMap.moveMonsters();
        this.drawMonsters();
        // bottom bar
        this.ctx.drawImage(Images_1.default.bottomBar, 0, 0, 257, 40, 0 * this.multiplier, 152 * this.multiplier, 257 * this.multiplier, 40 * this.multiplier);
        this.drawScoreAndHealth();
        // fps in the corner
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText((1.0 / (this.deltaTime / 1000)).toFixed(0).toString(), 0, 786);
        let imageSource = (this.endingFrame - this.endingFrame % 3) / 3;
        if (imageSource < 16) {
            this.ctx.drawImage(Images_1.default.mainCharacter, (imageSource % 8) * 17 + MainCharacter_1.default.sourceCol * 136, 0, 16, 16, MainCharacter_1.default.xCoord - this.renderedViewX, MainCharacter_1.default.yCoord - this.renderedViewY, 16 * this.multiplier, 16 * this.multiplier);
        }
        else {
            this.ctx.drawImage(Images_1.default.weapons, (imageSource - 16) * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, MainCharacter_1.default.xCoord - this.renderedViewX, MainCharacter_1.default.yCoord - this.renderedViewY, 8 * this.multiplier, 8 * this.multiplier);
        }
        this.endingFrame++;
        if (imageSource != 24)
            this.raf = window.requestAnimationFrame(() => this.animateEnding());
    }
    startGame(selectedCharacter, selectedMap) {
        cancelAnimationFrame(this.raf);
        this.gameMap = new GameMap_1.default(selectedMap, selectedCharacter);
        this.launchGame();
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

/***/ "./src/Death.ts":
/*!**********************!*\
  !*** ./src/Death.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monster.ts"));
class Death extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}
exports["default"] = Death;


/***/ }),

/***/ "./src/Demon.ts":
/*!**********************!*\
  !*** ./src/Demon.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Interfaces_1 = __webpack_require__(/*! ./Interfaces */ "./src/Interfaces.ts");
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monster.ts"));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
const Images_1 = __importDefault(__webpack_require__(/*! ./Images */ "./src/Images.ts"));
const Consts_1 = __webpack_require__(/*! ./Consts */ "./src/Consts.ts");
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
class Demon extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.fireballCoords = { x: 1, y: 1 };
        this.fireballThrowed = false;
        this.fireballDirection = Interfaces_1.Directions.TOP;
        this.lastFireballThrowedTimestamp = 0;
        this.lastFireballThrowedTimestamp = Date.now();
    }
    checkForShoot() {
        if (this.fireballThrowed)
            return;
        if (Date.now() - this.lastFireballThrowedTimestamp < 1000)
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
        this.fireballThrowed = true;
        this.fireballDirection = this.lookingDirection;
        this.lastFireballThrowedTimestamp = Date.now();
    }
    animateFireball(renderedView) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.fireballThrowed === false)
            return;
        const fireballCoordsArray = MainCharacter_1.default.getCoordinates4(this.fireballCoords.x + 20, this.fireballCoords.y + 20);
        if (Consts_1.TypesOfBlocks.noTransitionForProjectile.includes((_b = (_a = Canvas_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[fireballCoordsArray[1] * 2]) === null || _b === void 0 ? void 0 : _b[fireballCoordsArray[0] * 2]))
            this.fireballThrowed = false;
        if (Consts_1.TypesOfBlocks.monsters.includes((_d = (_c = Canvas_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[fireballCoordsArray[1] * 2]) === null || _d === void 0 ? void 0 : _d[fireballCoordsArray[0] * 2])) {
            let killed = false;
            Canvas_1.default.gameMap.arrayOfMonsters = Canvas_1.default.gameMap.arrayOfMonsters.filter(monster => {
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
            // Canvas.gameMap.arrayOfGoblins = Canvas.gameMap.arrayOfGoblins.filter(monster=>{
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
        if (Consts_1.TypesOfBlocks.destroyableByDemons.includes((_f = (_e = Canvas_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[fireballCoordsArray[1] * 2]) === null || _f === void 0 ? void 0 : _f[fireballCoordsArray[0] * 2])) {
            MainCharacter_1.default.destroyThing(fireballCoordsArray, false);
            this.fireballThrowed = false;
        }
        if (((_h = (_g = Canvas_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[fireballCoordsArray[1] * 2]) === null || _h === void 0 ? void 0 : _h[fireballCoordsArray[0] * 2]) === -1) {
            // console.log("me hit")
            MainCharacter_1.default.changeHealth(-5);
            this.fireballThrowed = false;
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
        Canvas_1.default.ctx.drawImage(Images_1.default.weapons, this.fireballDirection * 9, 3 * 9, 8, 8, this.fireballCoords.x - renderedView.x, this.fireballCoords.y - renderedView.y, 8 * Consts_1.Constants.multiplier, 8 * Consts_1.Constants.multiplier);
    }
}
exports["default"] = Demon;


/***/ }),

/***/ "./src/GameMap.ts":
/*!************************!*\
  !*** ./src/GameMap.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


//import map1 from './jsonMaps/map1.json';
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
const Demon_1 = __importDefault(__webpack_require__(/*! ./Demon */ "./src/Demon.ts"));
const Spawner_1 = __importDefault(__webpack_require__(/*! ./Spawner */ "./src/Spawner.ts"));
const Ghost_1 = __importDefault(__webpack_require__(/*! ./Ghost */ "./src/Ghost.ts"));
const Grunt_1 = __importDefault(__webpack_require__(/*! ./Grunt */ "./src/Grunt.ts"));
const Death_1 = __importDefault(__webpack_require__(/*! ./Death */ "./src/Death.ts"));
const Sorcerer_1 = __importDefault(__webpack_require__(/*! ./Sorcerer */ "./src/Sorcerer.ts"));
const Goblin_1 = __importDefault(__webpack_require__(/*! ./Goblin */ "./src/Goblin.ts"));
const Helpers_1 = __importDefault(__webpack_require__(/*! ./Helpers */ "./src/Helpers.ts"));
const KeyboardEvents_1 = __importDefault(__webpack_require__(/*! ./KeyboardEvents */ "./src/KeyboardEvents.ts"));
const Images_1 = __importDefault(__webpack_require__(/*! ./Images */ "./src/Images.ts"));
class GameMap {
    constructor(mapName, characterName) {
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
        this.endOfLevel = () => {
            var _a;
            (_a = MainCharacter_1.default.sound_manager) === null || _a === void 0 ? void 0 : _a.play("enteringExit");
            KeyboardEvents_1.default.disableEvents = true;
            KeyboardEvents_1.default.WKeyClicked = false;
            KeyboardEvents_1.default.SKeyClicked = false;
            KeyboardEvents_1.default.AKeyClicked = false;
            KeyboardEvents_1.default.DKeyClicked = false;
            KeyboardEvents_1.default.SpaceKeyClicked = false;
            clearInterval(MainCharacter_1.default.losinngHPInterval);
            cancelAnimationFrame(Canvas_1.default.raf);
            this.stopGame = true;
            Canvas_1.default.raf = requestAnimationFrame(() => Canvas_1.default.animateEnding());
        };
        this.loadMap(mapName, characterName);
    }
    loadMap(mapName, characterName) {
        return __awaiter(this, void 0, void 0, function* () {
            let characterNumber = 0;
            if (characterName === "Warrior")
                characterNumber = 0;
            if (characterName === "Valkyre")
                characterNumber = 1;
            if (characterName === "Elf")
                characterNumber = 2;
            if (characterName === "Wizard")
                characterNumber = 3;
            MainCharacter_1.default.sourceCol = characterNumber;
            const response = yield fetch(`./jsonMaps/map${mapName}.json`);
            const loadedData = yield response.json();
            Images_1.default.bottomBar = Images_1.default.imageLoader("bottomBar" + characterNumber + ".png");
            this.map = this.createBiggerMap(loadedData.array);
            if (mapName === "test")
                this.levelNumber = 0;
            else
                this.levelNumber = parseInt(mapName);
            this.arrayOfMonstersToCreate.forEach(monster => {
                this.createMonster(monster.x, monster.y, monster.id);
            });
            MainCharacter_1.default.xCoord = loadedData.characterStartCoords[0] * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.yCoord = loadedData.characterStartCoords[1] * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.coordsArrayIndexes = [loadedData.characterStartCoords[0] * 2, loadedData.characterStartCoords[1] * 2];
            Canvas_1.default.gameMap.setBlock2(MainCharacter_1.default.coordsArrayIndexes, -1);
            this.numberOfXBlocks = loadedData.width;
            this.numberOfYBlocks = loadedData.height;
            this.xSizeInPixels = this.numberOfXBlocks * 16 * Canvas_1.default.multiplier;
            this.ySizeInPixels = this.numberOfYBlocks * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.score = loadedData.startScore;
            MainCharacter_1.default.health = loadedData.startHealth;
            MainCharacter_1.default.moveMap();
            Images_1.default.loadWallsColor(loadedData.wallsFilter);
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
    pickingAbility(itemIndex) {
        var _a;
        this.stopGame = true;
        Canvas_1.default.drawAbilityScreen(itemIndex);
        (_a = MainCharacter_1.default.sound_manager) === null || _a === void 0 ? void 0 : _a.play("pickedAbility");
        setTimeout(() => {
            this.stopGame = false;
            Canvas_1.default.raf = window.requestAnimationFrame(() => Canvas_1.default.render());
        }, 2000);
    }
    setIntervals() {
        setInterval(() => {
            var _a, _b;
            const startIndexes = Helpers_1.default.getStartIndexes();
            for (let i = 0; i < 17; i++) {
                for (let j = 0; j < 11; j++) {
                    if (![26, 27, 28].includes((_b = (_a = this.map) === null || _a === void 0 ? void 0 : _a[startIndexes.y * 2 + j * 2]) === null || _b === void 0 ? void 0 : _b[startIndexes.x * 2 + i * 2]))
                        continue;
                    this.map[startIndexes.y * 2 + j * 2][startIndexes.x * 2 + i * 2] = 26 + this.universalBoxFrameIndex;
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
        setInterval(() => {
            this.spawnMonsters();
        }, 500);
    }
    isFieldClear(x, y) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (((_b = (_a = Canvas_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x]) == 0 &&
            ((_d = (_c = Canvas_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[y]) === null || _d === void 0 ? void 0 : _d[x + 1]) == 0 &&
            ((_f = (_e = Canvas_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[y + 1]) === null || _f === void 0 ? void 0 : _f[x]) == 0 &&
            ((_h = (_g = Canvas_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[y + 1]) === null || _h === void 0 ? void 0 : _h[x + 1]) == 0)
            return true;
        return false;
    }
    isSmallFieldClear(x, y) {
        var _a, _b;
        if (((_b = (_a = Canvas_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x]) === 0)
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
        const playersCorods = MainCharacter_1.default.getCoordinates2(MainCharacter_1.default.xCoord, MainCharacter_1.default.yCoord);
        this.arrayOfMonsters.forEach(monster => {
            if (monster.moved)
                return;
            monster.distanceFromPlayer = Math.pow((playersCorods[0] - monster.xPosition), 2) + Math.pow((playersCorods[1] - monster.yPosition), 2);
        });
        this.arrayOfMonsters = this.arrayOfMonsters.filter((monster) => {
            var _a, _b, _c;
            if (monster.distanceFromPlayer !== 4)
                return true;
            if (monster.sourceColumn === 0) {
                monster.die(true);
                (_a = MainCharacter_1.default.sound_manager) === null || _a === void 0 ? void 0 : _a.play("gotHitByGhost");
                MainCharacter_1.default.changeHealth(-5);
                return false;
            }
            else if (monster.sourceColumn === 5) {
                MainCharacter_1.default.changeHealth(-1);
                (_b = MainCharacter_1.default.sound_manager) === null || _b === void 0 ? void 0 : _b.play("gotHitByDeath");
                return true;
            }
            else {
                MainCharacter_1.default.changeHealth(-5);
                (_c = MainCharacter_1.default.sound_manager) === null || _c === void 0 ? void 0 : _c.play("gotHitByGruntDemon");
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
                breakme: if (monster instanceof Sorcerer_1.default) {
                    if (oldCoords[0] === monster.xPosition && oldCoords[1] === monster.yPosition) {
                        monster.isVisible = true;
                        break breakme;
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
        var _a;
        if (MainCharacter_1.default.potions === 0 && itemUsed)
            return;
        const startIndexes = Helpers_1.default.getStartIndexes();
        (_a = MainCharacter_1.default.sound_manager) === null || _a === void 0 ? void 0 : _a.play("destroyBottle");
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
                this.arrayOfGoblins.push(new Goblin_1.default(4, 5, 5, x * 2, y * 2, 5));
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
        this.arrayOfSpawners = this.arrayOfSpawners.filter(spawer => {
            if (spawer.xPosition == coords[0] * 2 && spawer.yPosition == coords[1] * 2)
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
        if (Canvas_1.default.gameMap.map[y][x] === 30 || Canvas_1.default.gameMap.map[y][x] === 31) {
            Canvas_1.default.gameMap.map[y][x] = 0;
            Canvas_1.default.gameMap.map[y + 1][x] = 0;
            Canvas_1.default.gameMap.map[y + 1][x + 1] = 0;
            Canvas_1.default.gameMap.map[y][x + 1] = 0;
            this.findGlass(x, y + 2);
            this.findGlass(x, y - 2);
            this.findGlass(x + 2, y);
            this.findGlass(x - 2, y);
        }
        else
            return;
    }
}
exports["default"] = GameMap;


/***/ }),

/***/ "./src/Ghost.ts":
/*!**********************!*\
  !*** ./src/Ghost.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monster.ts"));
class Ghost extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}
exports["default"] = Ghost;


/***/ }),

/***/ "./src/Goblin.ts":
/*!***********************!*\
  !*** ./src/Goblin.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monster.ts"));
class Goblin extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.rockCoords = { x: 1, y: 1 };
        this.rockThrowed = false;
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
exports["default"] = Goblin;


/***/ }),

/***/ "./src/Grunt.ts":
/*!**********************!*\
  !*** ./src/Grunt.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monster.ts"));
class Grunt extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}
exports["default"] = Grunt;


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
}
exports["default"] = new Helpers();


/***/ }),

/***/ "./src/Images.ts":
/*!***********************!*\
  !*** ./src/Images.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Images {
    constructor() {
        this.walls = new Image();
        this.wallscanvas = document.createElement("canvas");
        this.mainCharacter = this.imageLoader("mainCharacter.png");
        this.bigNumbers = this.imageLoader("bigNumbers.png");
        this.bottomBar = new Image();
        this.items = this.imageLoader("items.png");
        this.numbers = this.imageLoader("numbers.png");
        this.weapons = this.imageLoader("weapons.png");
        this.monsters = this.imageLoader("monsters.png");
        this.letters = this.imageLoader("letters.png");
    }
    imageLoader(fileName) {
        let photo = new Image();
        photo.src = "images/" + fileName;
        return photo;
    }
    loadWallsColor(filterString) {
        this.walls = this.imageLoader("walls.png");
        this.walls.onload = () => {
            let tag = document.createElement("canvas");
            tag.width = 322;
            tag.height = 16;
            let ctx = tag.getContext("2d");
            ctx.imageSmoothingEnabled = false;
            ctx.filter = filterString;
            ctx.drawImage(this.walls, 0, 0, 322, 16, 0, 0, 322, 16);
            ctx.save();
            this.wallscanvas = tag;
        };
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
exports.Abilities = exports.Directions = void 0;
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
var Abilities;
(function (Abilities) {
    Abilities[Abilities["EXTRA_ARMOUR"] = 0] = "EXTRA_ARMOUR";
    Abilities[Abilities["EXTRA_CARRYING_ABILITY"] = 1] = "EXTRA_CARRYING_ABILITY";
    Abilities[Abilities["EXTRA_MAGIC_POWER"] = 2] = "EXTRA_MAGIC_POWER";
    Abilities[Abilities["EXTRA_SHOT_POWER"] = 3] = "EXTRA_SHOT_POWER";
    Abilities[Abilities["EXTRA_FIGHT_POWER"] = 4] = "EXTRA_FIGHT_POWER";
})(Abilities = exports.Abilities || (exports.Abilities = {}));


/***/ }),

/***/ "./src/KeyboardEvents.ts":
/*!*******************************!*\
  !*** ./src/KeyboardEvents.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
class KeyboardEvents {
    constructor() {
        this.WKeyClicked = false;
        this.SKeyClicked = false;
        this.AKeyClicked = false;
        this.DKeyClicked = false;
        this.SpaceKeyClicked = false;
        this.stackOfClicks = [];
        this.disableEvents = false;
        this.addListeners();
    }
    addListeners() {
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
                Canvas_1.default.gameMap.clearMapFromMonstersAndSpawners(true);
        });
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
const Sorcerer_1 = __importDefault(__webpack_require__(/*! ./Sorcerer */ "./src/Sorcerer.ts"));
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
        this.lastMovetimestamp = 16;
        this.lastDirection = [4, 0];
        this.actualDirection = 5;
        this.animationFrame = 3;
        this.thirdFrame = 1;
        this.weapon = new Projectile_1.default(this.sourceCol, 0, 0, 0);
        this.losinngHPInterval = setInterval(() => {
            this.changeHealth(-1);
        }, 1000);
        this.sound_manager = null;
        window.onload = () => {
            this.sound_manager = new SoundsHandler_1.default("./sounds/audio");
        };
    }
    checkIfPlayerIsDead() {
        if (this.health <= 0)
            Canvas_1.default.gameMap.timesUp();
    }
    animateProjectile() {
        var _a, _b, _c, _d, _e, _f;
        if (this.weapon.xPosition < Canvas_1.default.renderedViewX - 80 ||
            this.weapon.xPosition > Canvas_1.default.renderedViewX + Canvas_1.default.width ||
            this.weapon.yPosition > Canvas_1.default.renderedViewY + Canvas_1.default.height ||
            this.weapon.yPosition < Canvas_1.default.renderedViewY - 80)
            this.weapon.thrown = false;
        const ProjectileCoords = this.getCoordinates4(this.weapon.xPosition + 20, this.weapon.yPosition + 20);
        if (Consts_1.TypesOfBlocks.noTransitionForProjectile.includes((_b = (_a = Canvas_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[ProjectileCoords[1] * 2]) === null || _b === void 0 ? void 0 : _b[ProjectileCoords[0] * 2]))
            this.weapon.thrown = false;
        let invisibleSorcererHit = false;
        if (Consts_1.TypesOfBlocks.monsters.includes((_d = (_c = Canvas_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[ProjectileCoords[1] * 2]) === null || _d === void 0 ? void 0 : _d[ProjectileCoords[0] * 2])) {
            let killed = false;
            Canvas_1.default.gameMap.arrayOfMonsters = Canvas_1.default.gameMap.arrayOfMonsters.filter(monster => {
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
            Canvas_1.default.gameMap.arrayOfGoblins = Canvas_1.default.gameMap.arrayOfGoblins.filter(monster => {
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
        if (Consts_1.TypesOfBlocks.destroyableThings.includes((_f = (_e = Canvas_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[ProjectileCoords[1] * 2]) === null || _f === void 0 ? void 0 : _f[ProjectileCoords[0] * 2])) {
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
        var _a;
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
        (_a = this.sound_manager) === null || _a === void 0 ? void 0 : _a.play("throwedWeapon");
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
        Canvas_1.default.gameMap.setBlock2(this.coordsArrayIndexes, -1);
        switch (direction) {
            case 1:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] - 2))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] - 2], -1);
                break;
            case 2:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] - 2))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] - 2], -1);
                break;
            case 3:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1]))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1]], -1);
                break;
            case 4:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] + 2))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] + 2, this.coordsArrayIndexes[1] + 2], -1);
                break;
            case 5:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] + 2))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0], this.coordsArrayIndexes[1] + 2], -1);
                break;
            case 6:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] + 2))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] + 2], -1);
                break;
            case 7:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1]))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1]], -1);
                break;
            case 8:
                if (Canvas_1.default.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] - 2))
                    Canvas_1.default.gameMap.setBlock2([this.coordsArrayIndexes[0] - 2, this.coordsArrayIndexes[1] - 2], -1);
                break;
        }
    }
    animateCharacter() {
        //
        this.checkForPickingItems();
        if (this.weapon.thrown)
            this.animateProjectile();
        if (this.lastMovetimestamp === 16) {
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
            if (this.actualDirection == 2 && availableDirections.topright === false) {
                if (availableDirections.top)
                    this.actualDirection = 1;
                else if (availableDirections.right)
                    this.actualDirection = 3;
                else
                    return;
            }
            if (this.actualDirection == 4 && availableDirections.bottomright === false) {
                if (availableDirections.bottom)
                    this.actualDirection = 5;
                else if (availableDirections.right)
                    this.actualDirection = 3;
                else
                    return;
            }
            if (this.actualDirection == 6 && availableDirections.bottomleft === false) {
                if (availableDirections.bottom)
                    this.actualDirection = 5;
                else if (availableDirections.left)
                    this.actualDirection = 7;
                else
                    return;
            }
            if (this.actualDirection == 8 && availableDirections.topleft === false) {
                if (availableDirections.top)
                    this.actualDirection = 1;
                else if (availableDirections.left)
                    this.actualDirection = 7;
                else
                    return;
            }
        }
        if (this.lastMovetimestamp < 4) {
            this.lastMovetimestamp += move;
            this.moveCharacter(move);
            if (this.lastMovetimestamp >= 4) {
                this.lastDirection[1] = this.thirdFrame;
            }
            return;
        }
        if (this.lastMovetimestamp < 12) {
            this.lastMovetimestamp += move;
            this.moveCharacter(move);
            if (this.lastMovetimestamp >= 12) {
                this.lastDirection[1] = 0;
                if (this.thirdFrame == 1)
                    this.thirdFrame = 2;
                else
                    this.thirdFrame = 1;
            }
            return;
        }
        if (this.lastMovetimestamp < 16) {
            this.lastMovetimestamp += move;
            this.moveCharacter(move);
            if (this.lastMovetimestamp >= 16) {
                Canvas_1.default.gameMap.clearBlock2(this.coordsArrayIndexes);
                this.coordsArrayIndexes = this.getCoordinates3(this.xCoord, this.yCoord);
                if (Canvas_1.default.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]] === 29) {
                    Canvas_1.default.gameMap.endOfLevel();
                }
                else
                    Canvas_1.default.gameMap.setBlock2(this.coordsArrayIndexes, -1);
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
        this.lastMovetimestamp = 0;
        this.reserveArray();
    }
    checkForCollisions() {
        const Coords = this.getCoordinates(this.xCoord, this.yCoord);
        let availableDirections = {
            top: true, topright: true,
            right: true, bottomright: true,
            bottom: true, bottomleft: true,
            left: true, topleft: true
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
            availableDirections.topright = false;
        if (availableDirections.top == false ||
            availableDirections.left == false ||
            this.isFieldClear(Coords[1] - 1, Coords[0] - 1) === false)
            availableDirections.topleft = false;
        if (availableDirections.bottom == false ||
            availableDirections.right == false ||
            this.isFieldClear(Coords[1] + 1, Coords[0] + 1) === false)
            availableDirections.bottomright = false;
        if (availableDirections.bottom == false ||
            availableDirections.left == false ||
            this.isFieldClear(Coords[1] + 1, Coords[0] - 1) === false)
            availableDirections.bottomleft = false;
        return availableDirections;
    }
    checkForPickingItems() {
        var _a, _b;
        const Coords = this.getCoordinates(this.xCoord, this.yCoord);
        const itemIndex = (_b = (_a = Canvas_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[Coords[1] * 2]) === null || _b === void 0 ? void 0 : _b[Coords[0] * 2];
        if (Consts_1.TypesOfBlocks.pickableItems.includes(itemIndex))
            this.pickItem(itemIndex, Coords);
    }
    isFieldClear(y, x) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        if ((((_b = (_a = Canvas_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[y * 2]) === null || _b === void 0 ? void 0 : _b[x * 2]) < 26 && ((_d = (_c = Canvas_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[y * 2]) === null || _d === void 0 ? void 0 : _d[x * 2]) != 0) ||
            (((_f = (_e = Canvas_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[y * 2 + 1]) === null || _f === void 0 ? void 0 : _f[x * 2]) < 26 && ((_h = (_g = Canvas_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[y * 2 + 1]) === null || _h === void 0 ? void 0 : _h[x * 2]) != 0) ||
            (((_k = (_j = Canvas_1.default.gameMap.map) === null || _j === void 0 ? void 0 : _j[y * 2]) === null || _k === void 0 ? void 0 : _k[x * 2 + 1]) < 26 && ((_m = (_l = Canvas_1.default.gameMap.map) === null || _l === void 0 ? void 0 : _l[y * 2]) === null || _m === void 0 ? void 0 : _m[x * 2 + 1]) != 0) ||
            (((_p = (_o = Canvas_1.default.gameMap.map) === null || _o === void 0 ? void 0 : _o[y * 2 + 1]) === null || _p === void 0 ? void 0 : _p[x * 2 + 1]) < 26 && ((_r = (_q = Canvas_1.default.gameMap.map) === null || _q === void 0 ? void 0 : _q[y * 2 + 1]) === null || _r === void 0 ? void 0 : _r[x * 2 + 1]) != 0))
            return false;
        if ((((_t = (_s = Canvas_1.default.gameMap.map) === null || _s === void 0 ? void 0 : _s[y * 2]) === null || _t === void 0 ? void 0 : _t[x * 2]) == 30) &&
            (((_v = (_u = Canvas_1.default.gameMap.map) === null || _u === void 0 ? void 0 : _u[y * 2 + 1]) === null || _v === void 0 ? void 0 : _v[x * 2]) == 30) &&
            (((_x = (_w = Canvas_1.default.gameMap.map) === null || _w === void 0 ? void 0 : _w[y * 2]) === null || _x === void 0 ? void 0 : _x[x * 2 + 1]) == 30) &&
            (((_z = (_y = Canvas_1.default.gameMap.map) === null || _y === void 0 ? void 0 : _y[y * 2 + 1]) === null || _z === void 0 ? void 0 : _z[x * 2 + 1]) == 30) &&
            this.keys == 0)
            return false;
        if ((((_1 = (_0 = Canvas_1.default.gameMap.map) === null || _0 === void 0 ? void 0 : _0[y * 2]) === null || _1 === void 0 ? void 0 : _1[x * 2]) == 31) &&
            (((_3 = (_2 = Canvas_1.default.gameMap.map) === null || _2 === void 0 ? void 0 : _2[y * 2 + 1]) === null || _3 === void 0 ? void 0 : _3[x * 2]) == 31) &&
            (((_5 = (_4 = Canvas_1.default.gameMap.map) === null || _4 === void 0 ? void 0 : _4[y * 2]) === null || _5 === void 0 ? void 0 : _5[x * 2 + 1]) == 31) &&
            (((_7 = (_6 = Canvas_1.default.gameMap.map) === null || _6 === void 0 ? void 0 : _6[y * 2 + 1]) === null || _7 === void 0 ? void 0 : _7[x * 2 + 1]) == 31) &&
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
        else if (mapX + Canvas_1.default.width >= Canvas_1.default.gameMap.xSizeInPixels)
            Canvas_1.default.renderedViewX = Canvas_1.default.gameMap.xSizeInPixels - Canvas_1.default.width;
        else
            Canvas_1.default.renderedViewX = mapX;
        if (mapY < 0)
            Canvas_1.default.renderedViewY = 0;
        else if (mapY + gameCanvasHeight >= Canvas_1.default.gameMap.ySizeInPixels)
            Canvas_1.default.renderedViewY = Canvas_1.default.gameMap.ySizeInPixels - gameCanvasHeight;
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
        const itemID = Canvas_1.default.gameMap.map[coords[1] * 2][coords[0] * 2];
        switch (itemID) {
            case 16:
                Canvas_1.default.gameMap.setBlock(coords, 17);
                break;
            case 17:
                Canvas_1.default.gameMap.setBlock(coords, 18);
                break;
            case 18:
                Canvas_1.default.gameMap.clearBlock(coords);
                break;
            case 20:
            case 21:
                Canvas_1.default.gameMap.clearBlock(coords);
                Canvas_1.default.gameMap.deleteSpawner(coords);
                if (addScore)
                    this.changeScore(10);
                break;
            case 22:
                Canvas_1.default.gameMap.setBlock(coords, 20);
                if (addScore)
                    this.changeScore(10);
                break;
            case 23:
                Canvas_1.default.gameMap.setBlock(coords, 25);
                if (addScore)
                    this.changeScore(10);
                break;
            case 24:
            case 25:
                Canvas_1.default.gameMap.clearBlock(coords);
                Canvas_1.default.gameMap.deleteSpawner(coords);
                if (addScore)
                    this.changeScore(10);
                break;
            case 33:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
                Canvas_1.default.gameMap.clearBlock(coords);
                break;
            case 36:
                Canvas_1.default.gameMap.clearBlock(coords);
                Canvas_1.default.gameMap.clearMapFromMonstersAndSpawners(false);
                break;
        }
    }
    pickItem(itemIndex, coords) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (itemIndex) {
            case 26: //box
            case 27: //box
            case 28: //box
                this.changeScore(100);
                (_a = this.sound_manager) === null || _a === void 0 ? void 0 : _a.play("pickedItem");
                break;
            case 32: // key
                this.keys++;
                this.changeScore(100);
                (_b = this.sound_manager) === null || _b === void 0 ? void 0 : _b.play("pickedKey");
                break;
            case 36: // blue elixir
                this.potions++;
                this.changeScore(100);
                (_c = this.sound_manager) === null || _c === void 0 ? void 0 : _c.play("pickedItem");
                break;
            case 33: //yellow bootle
                this.changeHealth(100);
                this.changeScore(100);
                (_d = this.sound_manager) === null || _d === void 0 ? void 0 : _d.play("pickedItem");
                break;
            case 34: //chickenwing
                this.changeScore(100);
                this.changeHealth(100);
                (_e = this.sound_manager) === null || _e === void 0 ? void 0 : _e.play("pickedItem");
                break;
            case 36: //medalion
                this.changeScore(100);
                (_f = this.sound_manager) === null || _f === void 0 ? void 0 : _f.play("pickedItem");
                break;
            case 37: // lightblue elixir
            case 38: // green elixir
            case 39: // yellow elixir 
            case 40: // purple elixir
            case 41: // brown elixir
                if (!this.ownedAbilities.includes(itemIndex))
                    this.ownedAbilities.push(itemIndex);
                Canvas_1.default.gameMap.pickingAbility(itemIndex);
                break;
            case 30:
            case 31:
                this.keys--;
                Canvas_1.default.gameMap.findGlass(coords[0] * 2, coords[1] * 2);
                (_g = this.sound_manager) === null || _g === void 0 ? void 0 : _g.play("openDoors");
                break;
        }
        Canvas_1.default.gameMap.map[coords[1] * 2][coords[0] * 2] = 0;
        Canvas_1.default.gameMap.map[coords[1] * 2][coords[0] * 2 + 1] = 0;
        Canvas_1.default.gameMap.map[coords[1] * 2 + 1][coords[0] * 2] = 0;
        Canvas_1.default.gameMap.map[coords[1] * 2 + 1][coords[0] * 2 + 1] = 0;
    }
}
exports["default"] = new MainCharacter();


/***/ }),

/***/ "./src/Monster.ts":
/*!************************!*\
  !*** ./src/Monster.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
const MainCharacter_1 = __importDefault(__webpack_require__(/*! ./MainCharacter */ "./src/MainCharacter.ts"));
const Interfaces_1 = __webpack_require__(/*! ./Interfaces */ "./src/Interfaces.ts");
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
        Canvas_1.default.gameMap.setBlock2([xPosition, yPosition], this.id);
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
        Canvas_1.default.gameMap.clearBlock2([this.xPosition, this.yPosition]);
        if (addScore)
            MainCharacter_1.default.changeScore(5);
    }
}
exports["default"] = Monster;


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
        Canvas_1.default.ctx.drawImage(Images_1.default.weapons, MainCharacter_1.default.weapon.frame * 9, MainCharacter_1.default.sourceCol * 9, 8, 8, MainCharacter_1.default.weapon.xPosition - renderedView.x, MainCharacter_1.default.weapon.yPosition - renderedView.y, 8 * Consts_1.Constants.multiplier, 8 * Consts_1.Constants.multiplier);
    }
}
exports["default"] = Projectile;


/***/ }),

/***/ "./src/Sorcerer.ts":
/*!*************************!*\
  !*** ./src/Sorcerer.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Monster_1 = __importDefault(__webpack_require__(/*! ./Monster */ "./src/Monster.ts"));
class Sorcerer extends Monster_1.default {
    constructor(sourceColumn, damage, health, xPosition, yPosition, startDirection) {
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.isVisible = true;
        this.isVisible = true;
    }
}
exports["default"] = Sorcerer;


/***/ }),

/***/ "./src/SoundsHandler.ts":
/*!******************************!*\
  !*** ./src/SoundsHandler.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


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
    constructor(sound_file) {
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
        this._soundFileString = sound_file;
        this._loadMarkers(sound_file + ".json");
    }
}
exports["default"] = cSoundManager;


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
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
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
        Canvas_1.default.gameMap.clearBlock2([this.xPosition, this.yPosition]);
    }
}
exports["default"] = Spawner;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Canvas_1 = __importDefault(__webpack_require__(/*! ./Canvas */ "./src/Canvas.ts"));
//const startButton = document.getElementById("startButton") as HTMLButtonElement;
class Ui {
    constructor() {
        var _a;
        this.startButton = document.getElementById("startButton");
        this.startGame = () => {
            const characterSelect = document.getElementById("characterSelect");
            const mapSelect = document.getElementById("mapSelect");
            if (characterSelect === null)
                return;
            if (mapSelect === null)
                return;
            const selectedCharacter = characterSelect.value;
            const selectedMap = mapSelect.value;
            Canvas_1.default.startGame(selectedCharacter, selectedMap);
            //console.log(selectedCharacter, selectedMap)
            if (this.startButton !== null)
                this.startButton.remove();
        };
        (_a = this.startButton) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.startGame);
        console.log("wielki chuj1");
    }
}
exports["default"] = new Ui();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBUTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCx3QkFBd0IsVUFBVTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ3RIRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlDQUFpQyxtQkFBTyxDQUFDLGlDQUFVO0FBQ25ELHdDQUF3QyxtQkFBTyxDQUFDLCtDQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDeEJGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUNBQWlDLG1CQUFPLENBQUMsaUNBQVU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7O1VDN0JmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9DYW52YXMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvQ29uc3RzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0RlYXRoLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0RlbW9uLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0dhbWVNYXAudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvR2hvc3QudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvR29ibGluLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0dydW50LnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvSW1hZ2VzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0ludGVyZmFjZXMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvS2V5Ym9hcmRFdmVudHMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTWFpbkNoYXJhY3Rlci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL1Byb2plY3RpbGUudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvU29yY2VyZXIudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvU291bmRzSGFuZGxlci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9TcGF3bmVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2dhdW50bGV0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dhdW50bGV0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2dhdW50bGV0L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lTWFwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZU1hcFwiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgSW1hZ2VzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSW1hZ2VzXCIpKTtcclxuY29uc3QgSGVscGVyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0hlbHBlcnNcIikpO1xyXG5jb25zdCBTb3JjZXJlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1NvcmNlcmVyXCIpKTtcclxuY29uc3QgRGVtb25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9EZW1vblwiKSk7XHJcbmNvbnN0IEludGVyZmFjZXNfMSA9IHJlcXVpcmUoXCIuL0ludGVyZmFjZXNcIik7XHJcbmNvbnN0IENvbnN0c18xID0gcmVxdWlyZShcIi4vQ29uc3RzXCIpO1xyXG5jbGFzcyBDYW52YXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IDEyODU7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA5NjA7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFwID0gbmV3IEdhbWVNYXBfMS5kZWZhdWx0KFwiOFwiLCBcIldhcnJpb3JcIik7XHJcbiAgICAgICAgdGhpcy5tdWx0aXBsaWVyID0gNTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVkVmlld1ggPSAwO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZWRWaWV3WSA9IDA7XHJcbiAgICAgICAgdGhpcy5yYWYgPSAwO1xyXG4gICAgICAgIHRoaXMuZW5kaW5nRnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMub2xkVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5uZXdUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5mcHMgPSAwO1xyXG4gICAgICAgIHRoaXMuY2FudmFzVGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhc1RhZy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXNUYWcud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY2FudmFzVGFnLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBzdGFydEltYWdlLnNyYyA9IFwiaW1hZ2VzL3N0YXJ0LnBuZ1wiO1xyXG4gICAgICAgIHN0YXJ0SW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2Uoc3RhcnRJbWFnZSwgMCwgMCwgMzIwLCAyMDAsIDAsIDAsIDEyODUsIDk2MCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5nYW1lTWFwLnN0b3BHYW1lKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vbGRUaW1lID0gdGhpcy5uZXdUaW1lO1xyXG4gICAgICAgIHRoaXMubmV3VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAodGhpcy5uZXdUaW1lIC0gdGhpcy5vbGRUaW1lKTtcclxuICAgICAgICAvL2RyYXcgYmFja2dyb3VuZFxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjN2E3YTdhJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCAyNTcgKiB0aGlzLm11bHRpcGxpZXIsIDE1MiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgdGhpcy5kcmF3V2FsbHMoKTtcclxuICAgICAgICB0aGlzLmRyYXdJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1hcC5tb3ZlTW9uc3RlcnMoKTtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5hbmltYXRlQ2hhcmFjdGVyKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q2hhcmFjdGVyKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3TW9uc3RlcnMoKTtcclxuICAgICAgICAvLyBib3R0b20gYmFyXHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYm90dG9tQmFyLCAwLCAwLCAyNTcsIDQwLCAwICogdGhpcy5tdWx0aXBsaWVyLCAxNTIgKiB0aGlzLm11bHRpcGxpZXIsIDI1NyAqIHRoaXMubXVsdGlwbGllciwgNDAgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIHRoaXMuZHJhd1Njb3JlQW5kSGVhbHRoKCk7XHJcbiAgICAgICAgLy8gZnBzIGluIHRoZSBjb3JuZXJcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCgxLjAgLyAodGhpcy5kZWx0YVRpbWUgLyAxMDAwKSkudG9GaXhlZCgwKS50b1N0cmluZygpLCAwLCA3ODYpO1xyXG4gICAgICAgIHRoaXMucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnJlbmRlcigpKTtcclxuICAgIH1cclxuICAgIGRyYXdXYWxscygpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTE7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCgoX2IgPSAoX2EgPSB0aGlzLmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Fbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Jbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSA+IDE5KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQud2FsbHNjYW52YXMsICgoKF9kID0gKF9jID0gdGhpcy5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSkgKiAxNykgLSAxNywgMCwgMTYsIDE2LCAtdGhpcy5yZW5kZXJlZFZpZXdYICUgODAgKyBpICogODAsIC10aGlzLnJlbmRlcmVkVmlld1kgJSA4MCArIGogKiA4MCwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdJdGVtcygpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXhlcyA9IEhlbHBlcnNfMS5kZWZhdWx0LmdldFN0YXJ0SW5kZXhlcygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTc7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0Lml0ZW1zLCAoKCgoX2IgPSAoX2EgPSB0aGlzLmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Fbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Jbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSAtIDE5KSAqIDE3KSAtIDE3LCAwLCAxNiwgMTYsIC10aGlzLnJlbmRlcmVkVmlld1ggJSA4MCArIGkgKiA4MCwgLXRoaXMucmVuZGVyZWRWaWV3WSAlIDgwICsgaiAqIDgwLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd0NoYXJhY3RlcigpIHtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5tYWluQ2hhcmFjdGVyLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5sYXN0RGlyZWN0aW9uWzBdICogMTcgKyBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiAxMzYsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0Lmxhc3REaXJlY3Rpb25bMV0gKiAxNywgMTYsIDE2LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC54Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1gsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnlDb29yZCAtIHRoaXMucmVuZGVyZWRWaWV3WSwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24uZHJhdyh7IHg6IHRoaXMucmVuZGVyZWRWaWV3WCwgeTogdGhpcy5yZW5kZXJlZFZpZXdZIH0pO1xyXG4gICAgfVxyXG4gICAgZHJhd1Njb3JlQW5kSGVhbHRoKCkge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlTGVuZ3RoID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc2NvcmUudG9TdHJpbmcoKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHNjb3JlRGlnaXRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2IC0gc2NvcmVMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgc2NvcmVEaWdpdHMucHVzaCgwKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHNjb3JlRGlnaXRzLnB1c2gocGFyc2VJbnQoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc2NvcmUudG9TdHJpbmcoKS5jaGFyQXQoaSkpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5udW1iZXJzLCBzY29yZURpZ2l0c1tpXSAqIDksIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDksIDgsIDgsIDQxICsgOCAqIHRoaXMubXVsdGlwbGllciAqIGksIDE3NiAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWx0aExlbmd0aCA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aC50b1N0cmluZygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgaGVhbHRoRGlnaXRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0IC0gaGVhbHRoTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGhlYWx0aERpZ2l0cy5wdXNoKDApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhbHRoTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGhlYWx0aERpZ2l0cy5wdXNoKHBhcnNlSW50KE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aC50b1N0cmluZygpLmNoYXJBdChpKSkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0Lm51bWJlcnMsIGhlYWx0aERpZ2l0c1tpXSAqIDksIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDksIDgsIDgsIDQwNCArIDggKiB0aGlzLm11bHRpcGxpZXIgKiBpLCAxNzYgKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRyYXdJdGVtc0FuZEFiaWxpdGllcygpO1xyXG4gICAgfVxyXG4gICAgZHJhd0l0ZW1zQW5kQWJpbGl0aWVzKCkge1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0Lm93bmVkQWJpbGl0aWVzLmZvckVhY2goYWJpbGl0eSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYWJpbGl0eSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzNzogLy8gbGlnaHRibHVlIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTQsIDYxMCwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzg6IC8vIGdyZWVuIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTIsIDEyMSwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzk6IC8vIHllbGxvdyBlbGl4aXJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdJY29uKDEwLCA0MSwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDA6IC8vIHB1cnBsZSBlbGl4aXJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdJY29uKDExLCA4MSwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDE6IC8vIGJyb3duIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTMsIDUzMCwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQua2V5czsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdJY29uKDE1LCAzOSArIDQwICogaSwgMTg0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnBvdGlvbnM7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxNiwgNjA1IC0gNDAgKiBpLCAxODQpO1xyXG4gICAgfVxyXG4gICAgZHJhd0ljb24oc1hJbmRleCwgZFgsIGRZKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQubnVtYmVycywgc1hJbmRleCAqIDksIDAsIDgsIDgsIGRYLCBkWSAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICB9XHJcbiAgICBsYXVuY2hHYW1lKCkge1xyXG4gICAgICAgIGxldCB0aGlzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgaWYgKCEoKF9hID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291bmRfbWFuYWdlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLl9zb3VuZEZpbGUubG9hZENvbXBsZXRlKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5kcmF3TGV2ZWxUaXRsZVNjcmVlbih0aGlzLmdhbWVNYXAubGV2ZWxOdW1iZXIpO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VuZF9tYW5hZ2VyLnBsYXkoXCJsZXZlbFRpdGxlXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmFmKTtcclxuICAgICAgICAgICAgICAgIChfYSA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdW5kX21hbmFnZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wbGF5KFwic3RhcnRMZXZlbFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnJlbmRlcigpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1hcC5zZXRJbnRlcnZhbHMoKTtcclxuICAgICAgICAgICAgfSwgNDAwMCk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpc0ludGVydmFsKTtcclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuICAgIGRyYXdMZXZlbFRpdGxlU2NyZWVuKGxldmVsTnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIDEyODUsIDk2MCk7XHJcbiAgICAgICAgY29uc3QgbGV2ZWxMZW5ndGggPSBsZXZlbE51bWJlci50b1N0cmluZygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgbGV2ZWxEaWdpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMgLSBsZXZlbExlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBsZXZlbERpZ2l0cy5wdXNoKDApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGV2ZWxMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgbGV2ZWxEaWdpdHMucHVzaChwYXJzZUludChsZXZlbE51bWJlci50b1N0cmluZygpLmNoYXJBdChpKSkpO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmJpZ051bWJlcnMsIDE3MSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogMTcsIDk1LCAxNiwgMzIwLCAzNzAsIDk1ICogKHRoaXMubXVsdGlwbGllciAtIDEpLCAxNiAqICh0aGlzLm11bHRpcGxpZXIgLSAxKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYmlnTnVtYmVycywgbGV2ZWxEaWdpdHNbaV0gKiAxNywgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogMTcsIDE2LCAxNiwgNzQwICsgMTYgKiB0aGlzLm11bHRpcGxpZXIgKiBpLCAzNzAsIDE2ICogKHRoaXMubXVsdGlwbGllciAtIDEpLCAxNiAqICh0aGlzLm11bHRpcGxpZXIgLSAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmRyYXdMZXZlbFRpdGxlU2NyZWVuKGxldmVsTnVtYmVyKSk7XHJcbiAgICB9XHJcbiAgICBkcmF3TW9uc3RlcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuZ2V0Q29vcmRpbmF0ZXMoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1hcC5hcnJheU9mTW9uc3RlcnMuZm9yRWFjaCgobW9uc3RlcikgPT4ge1xyXG4gICAgICAgICAgICBtb25zdGVyLmxvb2tBdE1lKHBsYXllckNvb3Jkc1swXSAqIDIsIHBsYXllckNvb3Jkc1sxXSAqIDIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlciBpbnN0YW5jZW9mIFNvcmNlcmVyXzEuZGVmYXVsdCAmJiBtb25zdGVyLmlzVmlzaWJsZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyIGluc3RhbmNlb2YgRGVtb25fMS5kZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5hbmltYXRlRmlyZWJhbGwoeyB4OiB0aGlzLnJlbmRlcmVkVmlld1gsIHk6IHRoaXMucmVuZGVyZWRWaWV3WSB9KTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIueFBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy54ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnkgKiAyICsgMjIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0Lm1vbnN0ZXJzLCAobW9uc3Rlci5zb3VyY2VDb2x1bW4gKiA4ICsgbW9uc3Rlci5sb29raW5nRGlyZWN0aW9uKSAqIDE3LCAodGhpcy5nYW1lTWFwLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCAlIDMpICogMTcsIDE2LCAxNiwgLXRoaXMucmVuZGVyZWRWaWV3WCAlIDgwICsgKG1vbnN0ZXIueFBvc2l0aW9uIC0gc3RhcnRJbmRleGVzLnggKiAyKSAqIDQwLCAtdGhpcy5yZW5kZXJlZFZpZXdZICUgODAgKyAobW9uc3Rlci55UG9zaXRpb24gLSBzdGFydEluZGV4ZXMueSAqIDIpICogNDAsIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdhbWVNYXAuYXJyYXlPZkdvYmxpbnMuZm9yRWFjaCgoZ29ibGluKSA9PiB7XHJcbiAgICAgICAgICAgIC8vZ29ibGluLnJlbmRlclJvY2soc3RhcnRJbmRleGVzKVxyXG4gICAgICAgICAgICBpZiAoZ29ibGluLnhQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi54UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi55UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgICAgICBnb2JsaW4ueVBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5tb25zdGVycywgKGdvYmxpbi5zb3VyY2VDb2x1bW4gKiA4ICsgNCkgKiAxNywgKHRoaXMuZ2FtZU1hcC51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggJSAzKSAqIDE3LCAxNiwgMTYsIC10aGlzLnJlbmRlcmVkVmlld1ggJSA4MCArIChnb2JsaW4ueFBvc2l0aW9uIC0gc3RhcnRJbmRleGVzLnggKiAyKSAqIDQwLCAtdGhpcy5yZW5kZXJlZFZpZXdZICUgODAgKyAoZ29ibGluLnlQb3NpdGlvbiAtIHN0YXJ0SW5kZXhlcy55ICogMikgKiA0MCwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZHJhd0FiaWxpdHlTY3JlZW4oaXRlbUluZGV4KSB7XHJcbiAgICAgICAgbGV0IHRleHRTb3VyY2VSb3cgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbUluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICB0ZXh0U291cmNlUm93ID0gSW50ZXJmYWNlc18xLkFiaWxpdGllcy5FWFRSQV9GSUdIVF9QT1dFUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgdGV4dFNvdXJjZVJvdyA9IEludGVyZmFjZXNfMS5BYmlsaXRpZXMuRVhUUkFfTUFHSUNfUE9XRVI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICAgIHRleHRTb3VyY2VSb3cgPSBJbnRlcmZhY2VzXzEuQWJpbGl0aWVzLkVYVFJBX0FSTU9VUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgdGV4dFNvdXJjZVJvdyA9IEludGVyZmFjZXNfMS5BYmlsaXRpZXMuRVhUUkFfQ0FSUllJTkdfQUJJTElUWTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQxOlxyXG4gICAgICAgICAgICAgICAgdGV4dFNvdXJjZVJvdyA9IEludGVyZmFjZXNfMS5BYmlsaXRpZXMuRVhUUkFfU0hPVF9QT1dFUjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2NyZWVuID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgc2NyZWVuLnNyYyA9IFwiLi9pbWFnZXMvY2FycnlpbmcucG5nXCI7XHJcbiAgICAgICAgc2NyZWVuLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHNjcmVlbiwgMCwgMCwgMzIxLCAxOTIsIDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0IC0gNDAgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5sZXR0ZXJzLCAwLCB0ZXh0U291cmNlUm93ICogOCwgMTc1LCA3LCA3NyAqIDQsIDExMSAqIDQsIDE3NiAqIChDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciAtIDEpLCA4ICogKENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyIC0gMSkpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5udW1iZXJzLCAxNTQsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDksIDY0LCA4LCAxMzMgKiA0LCA3MSAqIDQsIDY0ICogKENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyIC0gMSksIDkgKiAoQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIgLSAxKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGFuaW1hdGVFbmRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5vbGRUaW1lID0gdGhpcy5uZXdUaW1lO1xyXG4gICAgICAgIHRoaXMubmV3VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAodGhpcy5uZXdUaW1lIC0gdGhpcy5vbGRUaW1lKTtcclxuICAgICAgICAvL2RyYXcgYmFja2dyb3VuZFxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjN2E3YTdhJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCAyNTcgKiB0aGlzLm11bHRpcGxpZXIsIDE1MiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgdGhpcy5kcmF3V2FsbHMoKTtcclxuICAgICAgICB0aGlzLmRyYXdJdGVtcygpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1hcC5tb3ZlTW9uc3RlcnMoKTtcclxuICAgICAgICB0aGlzLmRyYXdNb25zdGVycygpO1xyXG4gICAgICAgIC8vIGJvdHRvbSBiYXJcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5ib3R0b21CYXIsIDAsIDAsIDI1NywgNDAsIDAgKiB0aGlzLm11bHRpcGxpZXIsIDE1MiAqIHRoaXMubXVsdGlwbGllciwgMjU3ICogdGhpcy5tdWx0aXBsaWVyLCA0MCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgdGhpcy5kcmF3U2NvcmVBbmRIZWFsdGgoKTtcclxuICAgICAgICAvLyBmcHMgaW4gdGhlIGNvcm5lclxyXG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjMwcHggQXJpYWxcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoKDEuMCAvICh0aGlzLmRlbHRhVGltZSAvIDEwMDApKS50b0ZpeGVkKDApLnRvU3RyaW5nKCksIDAsIDc4Nik7XHJcbiAgICAgICAgbGV0IGltYWdlU291cmNlID0gKHRoaXMuZW5kaW5nRnJhbWUgLSB0aGlzLmVuZGluZ0ZyYW1lICUgMykgLyAzO1xyXG4gICAgICAgIGlmIChpbWFnZVNvdXJjZSA8IDE2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0Lm1haW5DaGFyYWN0ZXIsIChpbWFnZVNvdXJjZSAlIDgpICogMTcgKyBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiAxMzYsIDAsIDE2LCAxNiwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdYLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1ksIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC53ZWFwb25zLCAoaW1hZ2VTb3VyY2UgLSAxNikgKiA5LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiA5LCA4LCA4LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC54Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1gsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnlDb29yZCAtIHRoaXMucmVuZGVyZWRWaWV3WSwgOCAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZW5kaW5nRnJhbWUrKztcclxuICAgICAgICBpZiAoaW1hZ2VTb3VyY2UgIT0gMjQpXHJcbiAgICAgICAgICAgIHRoaXMucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVFbmRpbmcoKSk7XHJcbiAgICB9XHJcbiAgICBzdGFydEdhbWUoc2VsZWN0ZWRDaGFyYWN0ZXIsIHNlbGVjdGVkTWFwKSB7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5yYWYpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1hcCA9IG5ldyBHYW1lTWFwXzEuZGVmYXVsdChzZWxlY3RlZE1hcCwgc2VsZWN0ZWRDaGFyYWN0ZXIpO1xyXG4gICAgICAgIHRoaXMubGF1bmNoR2FtZSgpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBDYW52YXMoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Db25zdGFudHMgPSBleHBvcnRzLlR5cGVzT2ZCbG9ja3MgPSB2b2lkIDA7XHJcbmV4cG9ydHMuVHlwZXNPZkJsb2NrcyA9IHtcclxuICAgIG5vVHJhbnNpdGlvbjogWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAzMCwgMzFdLFxyXG4gICAgbm9UcmFuc2l0aW9uRm9yUHJvamVjdGlsZTogWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAyNiwgMjcsIDI4LCAzMCwgMzEsIDMyLCAzNCwgMzVdLFxyXG4gICAgcGlja2FibGVJdGVtczogWzI2LCAyNywgMjgsIDMyLCAzMywgMzQsIDM1LCAzNiwgMzcsIDM4LCAzOSwgNDAsIDQxLCAzMCwgMzFdLFxyXG4gICAgZGVzdHJveWFibGVUaGluZ3M6IFsxNiwgMTcsIDE4LCAyMCwgMjEsIDIyLCAyMywgMjQsIDI1LCAzMywgMzYsIDM3LCAzOCwgMzksIDQwLCA0MV0sXHJcbiAgICBkZXN0cm95YWJsZVRoaW5nc0J5SGFuZDogWzIwLCAyMSwgMjIsIDcwLCA3MSwgNzIsIDczLCA3NCwgNzUsIDc2LCA3NywgNzgsIDMwLCAzMSwgLTgxLCAtODIsIC04MywgLTg0XSxcclxuICAgIGRlc3Ryb3lhYmxlQnlEZW1vbnM6IFszMywgMzYsIDM3LCAzOCwgMzksIDQwLCA0MV0sXHJcbiAgICBtb25zdGVyczogWy04MCwgLTgxLCAtODIsIC04MywgLTg0LCAtODVdXHJcbn07XHJcbmV4cG9ydHMuQ29uc3RhbnRzID0ge1xyXG4gICAgbXVsdGlwbGllcjogNVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNb25zdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlclwiKSk7XHJcbmNsYXNzIERlYXRoIGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBEZWF0aDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgSW50ZXJmYWNlc18xID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlc1wiKTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBDb25zdHNfMSA9IHJlcXVpcmUoXCIuL0NvbnN0c1wiKTtcclxuY29uc3QgTWFpbkNoYXJhY3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jbGFzcyBEZW1vbiBleHRlbmRzIE1vbnN0ZXJfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogMSwgeTogMSB9O1xyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxUaHJvd2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5maXJlYmFsbERpcmVjdGlvbiA9IEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUDtcclxuICAgICAgICB0aGlzLmxhc3RGaXJlYmFsbFRocm93ZWRUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdEZpcmViYWxsVGhyb3dlZFRpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcbiAgICBjaGVja0ZvclNob290KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpcmViYWxsVGhyb3dlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmIChEYXRlLm5vdygpIC0gdGhpcy5sYXN0RmlyZWJhbGxUaHJvd2VkVGltZXN0YW1wIDwgMTAwMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmdldENvb3JkaW5hdGVzKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkKTtcclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPT0gcGxheWVyQ29vcmRzWzBdICogMiAmJiB0aGlzLnlQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1ApO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPCBwbGF5ZXJDb29yZHNbMF0gKiAyICYmIHRoaXMueVBvc2l0aW9uID09PSBwbGF5ZXJDb29yZHNbMV0gKiAyKVxyXG4gICAgICAgICAgICB0aGlzLnNob290RmlyZWJhbGwoSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9SSUdIVCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPT0gcGxheWVyQ29vcmRzWzBdICogMiAmJiB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT00pO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uID4gcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9MRUZUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1swXSAqIDIgJiYgdGhpcy55UG9zaXRpb24gPT09IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1swXSAqIDIgJiZcclxuICAgICAgICAgICAgdGhpcy55UG9zaXRpb24gPiBwbGF5ZXJDb29yZHNbMV0gKiAyICYmXHJcbiAgICAgICAgICAgIE1hdGgucG93KHRoaXMueFBvc2l0aW9uIC0gcGxheWVyQ29vcmRzWzBdICogMiwgMikgPT09IE1hdGgucG93KHRoaXMueVBvc2l0aW9uIC0gcGxheWVyQ29vcmRzWzFdICogMiwgMikpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVCk7XHJcbiAgICB9XHJcbiAgICBzaG9vdEZpcmViYWxsKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDIwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgMTksIHk6IHRoaXMueVBvc2l0aW9uICogNDAgKyAyMCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgNjAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgKyAyMCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDYwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwICsgNjAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTTpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyAyMCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDYwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyAxOSwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpcmViYWxsVGhyb3dlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5maXJlYmFsbERpcmVjdGlvbiA9IHRoaXMubG9va2luZ0RpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLmxhc3RGaXJlYmFsbFRocm93ZWRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgfVxyXG4gICAgYW5pbWF0ZUZpcmViYWxsKHJlbmRlcmVkVmlldykge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2g7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlyZWJhbGxUaHJvd2VkID09PSBmYWxzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGZpcmViYWxsQ29vcmRzQXJyYXkgPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5nZXRDb29yZGluYXRlczQodGhpcy5maXJlYmFsbENvb3Jkcy54ICsgMjAsIHRoaXMuZmlyZWJhbGxDb29yZHMueSArIDIwKTtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuVHlwZXNPZkJsb2Nrcy5ub1RyYW5zaXRpb25Gb3JQcm9qZWN0aWxlLmluY2x1ZGVzKChfYiA9IChfYSA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYltmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMl0pKVxyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsVGhyb3dlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChDb25zdHNfMS5UeXBlc09mQmxvY2tzLm1vbnN0ZXJzLmluY2x1ZGVzKChfZCA9IChfYyA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1tmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMl0pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZFtmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBraWxsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZNb25zdGVycyA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mTW9uc3RlcnMuZmlsdGVyKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIueFBvc2l0aW9uID09PSB0aGlzLnhQb3NpdGlvbiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PT0gdGhpcy55UG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY2hhbmdlU2NvcmUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gLSAxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiArIDEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDIgKyAxICYmIG1vbnN0ZXIueVBvc2l0aW9uICsgMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmRpZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIENhbnZhcy5nYW1lTWFwLmFycmF5T2ZHb2JsaW5zID0gQ2FudmFzLmdhbWVNYXAuYXJyYXlPZkdvYmxpbnMuZmlsdGVyKG1vbnN0ZXI9PntcclxuICAgICAgICAgICAgLy8gICAgIGlmKGtpbGxlZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiggXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0qMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdKjIpIHx8XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uLTEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSoyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0qMikgfHxcclxuICAgICAgICAgICAgLy8gICAgICAgICAobW9uc3Rlci54UG9zaXRpb24rMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdKjIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSoyKSB8fCBcclxuICAgICAgICAgICAgLy8gICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSoyICYmIG1vbnN0ZXIueVBvc2l0aW9uLTEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSoyKSB8fFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdKjIrMSAmJiBtb25zdGVyLnlQb3NpdGlvbisxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0qMilcclxuICAgICAgICAgICAgLy8gICAgICl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbW9uc3Rlci5kaWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGtpbGxlZCA9IHRydWVcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENvbnN0c18xLlR5cGVzT2ZCbG9ja3MuZGVzdHJveWFibGVCeURlbW9ucy5pbmNsdWRlcygoX2YgPSAoX2UgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDJdKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ZbZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDJdKSkge1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5kZXN0cm95VGhpbmcoZmlyZWJhbGxDb29yZHNBcnJheSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsVGhyb3dlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKChfaCA9IChfZyA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1tmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMl0pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaFtmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMl0pID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1lIGhpdFwiKVxyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VIZWFsdGgoLTUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsVGhyb3dlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzcGVlZCA9IDI7XHJcbiAgICAgICAgaWYgKFtJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuTEVGVCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX0xFRlRdLmluY2x1ZGVzKHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzLnggLT0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFtJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfUklHSFQsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlJJR0hULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fUklHSFRdLmluY2x1ZGVzKHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzLnggKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFtJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QLCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfUklHSFRdLmluY2x1ZGVzKHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzLnkgLT0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFtJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NLCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fUklHSFRdLmluY2x1ZGVzKHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzLnkgKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgdGhpcy5kcmF3RmlyZWJhbGwocmVuZGVyZWRWaWV3KTtcclxuICAgIH1cclxuICAgIGRyYXdGaXJlYmFsbChyZW5kZXJlZFZpZXcpIHtcclxuICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC53ZWFwb25zLCB0aGlzLmZpcmViYWxsRGlyZWN0aW9uICogOSwgMyAqIDksIDgsIDgsIHRoaXMuZmlyZWJhbGxDb29yZHMueCAtIHJlbmRlcmVkVmlldy54LCB0aGlzLmZpcmViYWxsQ29vcmRzLnkgLSByZW5kZXJlZFZpZXcueSwgOCAqIENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyLCA4ICogQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IERlbW9uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuLy9pbXBvcnQgbWFwMSBmcm9tICcuL2pzb25NYXBzL21hcDEuanNvbic7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTWFpbkNoYXJhY3RlclwiKSk7XHJcbmNvbnN0IERlbW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vRGVtb25cIikpO1xyXG5jb25zdCBTcGF3bmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3Bhd25lclwiKSk7XHJcbmNvbnN0IEdob3N0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2hvc3RcIikpO1xyXG5jb25zdCBHcnVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0dydW50XCIpKTtcclxuY29uc3QgRGVhdGhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9EZWF0aFwiKSk7XHJcbmNvbnN0IFNvcmNlcmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU29yY2VyZXJcIikpO1xyXG5jb25zdCBHb2JsaW5fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Hb2JsaW5cIikpO1xyXG5jb25zdCBIZWxwZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGVscGVyc1wiKSk7XHJcbmNvbnN0IEtleWJvYXJkRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vS2V5Ym9hcmRFdmVudHNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jbGFzcyBHYW1lTWFwIHtcclxuICAgIGNvbnN0cnVjdG9yKG1hcE5hbWUsIGNoYXJhY3Rlck5hbWUpIHtcclxuICAgICAgICB0aGlzLm1hcCA9IFtbXV07XHJcbiAgICAgICAgdGhpcy5sZXZlbE51bWJlciA9IDA7XHJcbiAgICAgICAgdGhpcy5udW1iZXJPZlhCbG9ja3MgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtYmVyT2ZZQmxvY2tzID0gMDtcclxuICAgICAgICB0aGlzLnhTaXplSW5QaXhlbHMgPSAwO1xyXG4gICAgICAgIHRoaXMueVNpemVJblBpeGVscyA9IDA7XHJcbiAgICAgICAgdGhpcy51bml2ZXJzYWxCb3hGcmFtZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zID0gW107XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzVG9DcmVhdGUgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZE9mTGV2ZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgKF9hID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291bmRfbWFuYWdlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBsYXkoXCJlbnRlcmluZ0V4aXRcIik7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5kaXNhYmxlRXZlbnRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LldLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuQUtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LkRLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TcGFjZUtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5sb3Npbm5nSFBJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKENhbnZhc18xLmRlZmF1bHQucmFmKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSA9IHRydWU7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IENhbnZhc18xLmRlZmF1bHQuYW5pbWF0ZUVuZGluZygpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubG9hZE1hcChtYXBOYW1lLCBjaGFyYWN0ZXJOYW1lKTtcclxuICAgIH1cclxuICAgIGxvYWRNYXAobWFwTmFtZSwgY2hhcmFjdGVyTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFyYWN0ZXJOdW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSA9PT0gXCJXYXJyaW9yXCIpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOdW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSA9PT0gXCJWYWxreXJlXCIpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSA9PT0gXCJFbGZcIilcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck51bWJlciA9IDI7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lID09PSBcIldpemFyZFwiKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyTnVtYmVyID0gMztcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sID0gY2hhcmFjdGVyTnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAuL2pzb25NYXBzL21hcCR7bWFwTmFtZX0uanNvbmApO1xyXG4gICAgICAgICAgICBjb25zdCBsb2FkZWREYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBJbWFnZXNfMS5kZWZhdWx0LmJvdHRvbUJhciA9IEltYWdlc18xLmRlZmF1bHQuaW1hZ2VMb2FkZXIoXCJib3R0b21CYXJcIiArIGNoYXJhY3Rlck51bWJlciArIFwiLnBuZ1wiKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAgPSB0aGlzLmNyZWF0ZUJpZ2dlck1hcChsb2FkZWREYXRhLmFycmF5KTtcclxuICAgICAgICAgICAgaWYgKG1hcE5hbWUgPT09IFwidGVzdFwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbE51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxOdW1iZXIgPSBwYXJzZUludChtYXBOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnNUb0NyZWF0ZS5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb25zdGVyKG1vbnN0ZXIueCwgbW9uc3Rlci55LCBtb25zdGVyLmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCA9IGxvYWRlZERhdGEuY2hhcmFjdGVyU3RhcnRDb29yZHNbMF0gKiAxNiAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkID0gbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1sxXSAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXMgPSBbbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1swXSAqIDIsIGxvYWRlZERhdGEuY2hhcmFjdGVyU3RhcnRDb29yZHNbMV0gKiAyXTtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5udW1iZXJPZlhCbG9ja3MgPSBsb2FkZWREYXRhLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLm51bWJlck9mWUJsb2NrcyA9IGxvYWRlZERhdGEuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnhTaXplSW5QaXhlbHMgPSB0aGlzLm51bWJlck9mWEJsb2NrcyAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICB0aGlzLnlTaXplSW5QaXhlbHMgPSB0aGlzLm51bWJlck9mWUJsb2NrcyAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zY29yZSA9IGxvYWRlZERhdGEuc3RhcnRTY29yZTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuaGVhbHRoID0gbG9hZGVkRGF0YS5zdGFydEhlYWx0aDtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQubW92ZU1hcCgpO1xyXG4gICAgICAgICAgICBJbWFnZXNfMS5kZWZhdWx0LmxvYWRXYWxsc0NvbG9yKGxvYWRlZERhdGEud2FsbHNGaWx0ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQmlnZ2VyTWFwKGlucHV0TWFwKSB7XHJcbiAgICAgICAgbGV0IGRvdWJsZWRNYXAgPSBbXTtcclxuICAgICAgICBpbnB1dE1hcC5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkb3VibGVkUm93ID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjZWxsSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChbMjAsIDIxLCAyMl0uaW5jbHVkZXMoY2VsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTnVtYmVyID0gdGhpcy5jcmVhdGVTcGF3bmVyKGNlbGxJbmRleCwgcm93SW5kZXgsIGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZWRSb3cucHVzaChpdGVtTnVtYmVyLCBpdGVtTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNlbGwgPj0gNzAgJiYgY2VsbCA8PSA3OCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1OdW1iZXIgPSB0aGlzLmNyZWF0ZVNwYXduZXIoY2VsbEluZGV4LCByb3dJbmRleCwgY2VsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKGl0ZW1OdW1iZXIsIGl0ZW1OdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2VsbCA8PSAtODAgJiYgY2VsbCA+PSAtODUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVyc1RvQ3JlYXRlLnB1c2goeyB4OiBjZWxsSW5kZXgsIHk6IHJvd0luZGV4LCBpZDogY2VsbCAqICgtMSkgLSA4MCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBkb3VibGVkUm93LnB1c2goMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKGNlbGwsIGNlbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZG91YmxlZE1hcC5wdXNoKFsuLi5kb3VibGVkUm93XSwgWy4uLmRvdWJsZWRSb3ddKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZG91YmxlZE1hcDtcclxuICAgIH1cclxuICAgIHNldE9uZUZpZWxkKHgsIHksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbeV1beF0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGNsZWFyQmxvY2soY29vcmRzKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMl0gPSAwO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDJdID0gMDtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV0gKiAyICsgMV1bY29vcmRzWzBdICogMiArIDFdID0gMDtcclxuICAgIH1cclxuICAgIGNsZWFyQmxvY2syKGNvb3Jkcykge1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXV1bY29vcmRzWzBdXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdXVtjb29yZHNbMF0gKyAxXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdICsgMV0gPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0QmxvY2soY29vcmRzLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDJdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMiArIDFdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDJdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0QmxvY2syKGNvb3JkcywgbmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV1dW2Nvb3Jkc1swXV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV1dW2Nvb3Jkc1swXSArIDFdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSArIDFdW2Nvb3Jkc1swXSArIDFdID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aW1lc1VwKCkge1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aCA9IDA7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuZHJhd1Njb3JlQW5kSGVhbHRoKCk7XHJcbiAgICB9XHJcbiAgICBwaWNraW5nQWJpbGl0eShpdGVtSW5kZXgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgdGhpcy5zdG9wR2FtZSA9IHRydWU7XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5kcmF3QWJpbGl0eVNjcmVlbihpdGVtSW5kZXgpO1xyXG4gICAgICAgIChfYSA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdW5kX21hbmFnZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wbGF5KFwicGlja2VkQWJpbGl0eVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXIoKSk7XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICB9XHJcbiAgICBzZXRJbnRlcnZhbHMoKSB7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVsyNiwgMjcsIDI4XS5pbmNsdWRlcygoX2IgPSAoX2EgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXVtzdGFydEluZGV4ZXMueCAqIDIgKyBpICogMl0gPSAyNiArIHRoaXMudW5pdmVyc2FsQm94RnJhbWVJbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVuaXZlcnNhbEJveEZyYW1lSW5kZXgrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMudW5pdmVyc2FsQm94RnJhbWVJbmRleCA9PSAzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy51bml2ZXJzYWxCb3hGcmFtZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDM7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDI7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDY7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDYpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgfSwgMTUwKTtcclxuICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Bhd25Nb25zdGVycygpO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcbiAgICBpc0ZpZWxkQ2xlYXIoeCwgeSkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2g7XHJcbiAgICAgICAgaWYgKCgoX2IgPSAoX2EgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbeV0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlt4XSkgPT0gMCAmJlxyXG4gICAgICAgICAgICAoKF9kID0gKF9jID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3ldKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbeCArIDFdKSA9PSAwICYmXHJcbiAgICAgICAgICAgICgoX2YgPSAoX2UgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbeSArIDFdKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ZbeF0pID09IDAgJiZcclxuICAgICAgICAgICAgKChfaCA9IChfZyA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1t5ICsgMV0pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaFt4ICsgMV0pID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlzU21hbGxGaWVsZENsZWFyKHgsIHkpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGlmICgoKF9iID0gKF9hID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ldKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbeF0pID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBtb3ZlTW9uc3RlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXArKztcclxuICAgICAgICBpZiAodGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXAgIT0gMTApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubW92ZU1vbnN0ZXJzVGltZXN0YW1wID0gMDtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMyKCk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPCBzdGFydEluZGV4ZXMueClcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueCArIDM0KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnlQb3NpdGlvbiA8IHN0YXJ0SW5kZXhlcy55KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnlQb3NpdGlvbiA+IHN0YXJ0SW5kZXhlcy55ICsgMjIpXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwbGF5ZXJzQ29yb2RzID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuZ2V0Q29vcmRpbmF0ZXMyKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkKTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci5tb3ZlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbW9uc3Rlci5kaXN0YW5jZUZyb21QbGF5ZXIgPSBNYXRoLnBvdygocGxheWVyc0Nvcm9kc1swXSAtIG1vbnN0ZXIueFBvc2l0aW9uKSwgMikgKyBNYXRoLnBvdygocGxheWVyc0Nvcm9kc1sxXSAtIG1vbnN0ZXIueVBvc2l0aW9uKSwgMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSB0aGlzLmFycmF5T2ZNb25zdGVycy5maWx0ZXIoKG1vbnN0ZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLmRpc3RhbmNlRnJvbVBsYXllciAhPT0gNClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIuZGllKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgKF9hID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291bmRfbWFuYWdlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBsYXkoXCJnb3RIaXRCeUdob3N0XCIpO1xyXG4gICAgICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY2hhbmdlSGVhbHRoKC01KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtb25zdGVyLnNvdXJjZUNvbHVtbiA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY2hhbmdlSGVhbHRoKC0xKTtcclxuICAgICAgICAgICAgICAgIChfYiA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdW5kX21hbmFnZXIpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5wbGF5KFwiZ290SGl0QnlEZWF0aFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY2hhbmdlSGVhbHRoKC01KTtcclxuICAgICAgICAgICAgICAgIChfYyA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdW5kX21hbmFnZXIpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wbGF5KFwiZ290SGl0QnlHcnVudERlbW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIuZGlzdGFuY2VGcm9tUGxheWVyICE9IGkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkQ29vcmRzID0gW21vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbl07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQmxvY2syKFttb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb25dKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobW9uc3Rlci5sb29raW5nRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy81XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIDZcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy82XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy82XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWttZTogaWYgKG1vbnN0ZXIgaW5zdGFuY2VvZiBTb3JjZXJlcl8xLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkQ29vcmRzWzBdID09PSBtb25zdGVyLnhQb3NpdGlvbiAmJiBvbGRDb29yZHNbMV0gPT09IG1vbnN0ZXIueVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgYnJlYWttZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmQgPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyIGluc3RhbmNlb2YgRGVtb25fMS5kZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuY2hlY2tGb3JTaG9vdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCbG9jazIoW21vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbl0sIG1vbnN0ZXIuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGVhck1hcEZyb21Nb25zdGVyc0FuZFNwYXduZXJzKGl0ZW1Vc2VkKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmIChNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5wb3Rpb25zID09PSAwICYmIGl0ZW1Vc2VkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgKF9hID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291bmRfbWFuYWdlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBsYXkoXCJkZXN0cm95Qm90dGxlXCIpO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzID0gdGhpcy5hcnJheU9mTW9uc3RlcnMuZmlsdGVyKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueCAqIDIgKyAzNCAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikge1xyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mR29ibGlucyA9IHRoaXMuYXJyYXlPZkdvYmxpbnMuZmlsdGVyKGdvYmxpbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChnb2JsaW4ueFBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy54ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnhQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueCAqIDIgKyAzNCAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnlQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueSAqIDIgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi55UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnkgKiAyICsgMjIpIHtcclxuICAgICAgICAgICAgICAgIGdvYmxpbi5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSB0aGlzLmFycmF5T2ZTcGF3bmVycy5maWx0ZXIoc3Bhd25lciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnhQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgICAgIHNwYXduZXIueFBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgICAgICBzcGF3bmVyLnlQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueSAqIDIgJiZcclxuICAgICAgICAgICAgICAgIHNwYXduZXIueVBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGF3bmVyLmRlc3Ryb3llZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpdGVtVXNlZClcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQucG90aW9ucy0tO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlU3Bhd25lcih4LCB5LCB2YWx1ZSkge1xyXG4gICAgICAgIGxldCByZXR1cm5JdGVtSW5kZXggPSB2YWx1ZTtcclxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICAgIGNhc2UgMjE6XHJcbiAgICAgICAgICAgIGNhc2UgMjI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycy5wdXNoKG5ldyBTcGF3bmVyXzEuZGVmYXVsdCh4ICogMiwgeSAqIDIsIDApKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDcwOlxyXG4gICAgICAgICAgICBjYXNlIDcxOlxyXG4gICAgICAgICAgICBjYXNlIDcyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMucHVzaChuZXcgU3Bhd25lcl8xLmRlZmF1bHQoeCAqIDIsIHkgKiAyLCAxKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5JdGVtSW5kZXggLT0gNDc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3MzpcclxuICAgICAgICAgICAgY2FzZSA3NDpcclxuICAgICAgICAgICAgY2FzZSA3NTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzLnB1c2gobmV3IFNwYXduZXJfMS5kZWZhdWx0KHggKiAyLCB5ICogMiwgMikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuSXRlbUluZGV4IC09IDUwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzY6XHJcbiAgICAgICAgICAgIGNhc2UgNzc6XHJcbiAgICAgICAgICAgIGNhc2UgNzg6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycy5wdXNoKG5ldyBTcGF3bmVyXzEuZGVmYXVsdCh4ICogMiwgeSAqIDIsIDMpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybkl0ZW1JbmRleCAtPSA1MztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJuSXRlbUluZGV4O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlTW9uc3Rlcih4LCB5LCBtb2JJZCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUNvbHVtbiA9IG1vYklkO1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IEdob3N0XzEuZGVmYXVsdCgwLCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5wdXNoKG5ldyBHcnVudF8xLmRlZmF1bHQoMSwgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgRGVtb25fMS5kZWZhdWx0KDIsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IFNvcmNlcmVyXzEuZGVmYXVsdCgzLCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zLnB1c2gobmV3IEdvYmxpbl8xLmRlZmF1bHQoNCwgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgRGVhdGhfMS5kZWZhdWx0KDUsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3Bhd25Nb25zdGVycygpIHtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMyKCk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMuZm9yRWFjaChzcGF3bmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIueFBvc2l0aW9uIDwgc3RhcnRJbmRleGVzLngpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnhQb3NpdGlvbiA+IHN0YXJ0SW5kZXhlcy54ICsgMzQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnlQb3NpdGlvbiA8IHN0YXJ0SW5kZXhlcy55KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci55UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueSArIDIyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzcGF3bmVyLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZysrO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci5sYXN0VGltZVNwYXduZWRTb21ldGhpbmcgIT09IHNwYXduZXIudGltZVRvU3Bhd24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3Bhd25Nb25zdGVyKHNwYXduZXIueFBvc2l0aW9uLCBzcGF3bmVyLnlQb3NpdGlvbiwgc3Bhd25lci5tb2IpO1xyXG4gICAgICAgICAgICBzcGF3bmVyLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZyA9IDA7XHJcbiAgICAgICAgICAgIHNwYXduZXIudGltZVRvU3Bhd24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzcGF3bk1vbnN0ZXIoeCwgeSwgbW9iSWQpIHtcclxuICAgICAgICBsZXQgcG9zc2libGVEaXJlY3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaG9zZW5EaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZURpcmVjdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgbGV0IG5ld0Nvb3JkcyA9IHRoaXMuZGlyZWN0aW9uVG9Db29yZHMoeCwgeSwgY2hvc2VuRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKG5ld0Nvb3Jkcy54LCBuZXdDb29yZHMueSkpIHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgTW9uc3Rlcihtb2JJZCwgNSwgNSAsbmV3Q29vcmRzLngsIG5ld0Nvb3Jkcy55LCAwKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9uc3RlcihuZXdDb29yZHMueCAvIDIsIG5ld0Nvb3Jkcy55IC8gMiwgbW9iSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlRGlyZWN0aW9ucy5zcGxpY2UocG9zc2libGVEaXJlY3Rpb25zLmluZGV4T2YoY2hvc2VuRGlyZWN0aW9uKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlU3Bhd25lcihjb29yZHMpIHtcclxuICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycyA9IHRoaXMuYXJyYXlPZlNwYXduZXJzLmZpbHRlcihzcGF3ZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3Bhd2VyLnhQb3NpdGlvbiA9PSBjb29yZHNbMF0gKiAyICYmIHNwYXdlci55UG9zaXRpb24gPT0gY29vcmRzWzFdICogMilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkaXJlY3Rpb25Ub0Nvb3Jkcyh4LCB5LCBkaXJlY3Rpb24pIHtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IC0gMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4ICsgMiwgeTogeSAtIDIgfTtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCArIDIsIHk6IHkgfTtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCArIDIsIHk6IHkgKyAyIH07XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHkgKyAyIH07XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHggLSAyLCB5OiB5ICsgMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4IC0gMiwgeTogeSB9O1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4IC0gMiwgeTogeSAtIDIgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kR2xhc3MoeCwgeSkge1xyXG4gICAgICAgIGlmIChDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3ldW3hdID09PSAzMCB8fCBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3ldW3hdID09PSAzMSkge1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3ldW3hdID0gMDtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt5ICsgMV1beF0gPSAwO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3kgKyAxXVt4ICsgMV0gPSAwO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3ldW3ggKyAxXSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEdsYXNzKHgsIHkgKyAyKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kR2xhc3MoeCwgeSAtIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRHbGFzcyh4ICsgMiwgeSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEdsYXNzKHggLSAyLCB5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gR2FtZU1hcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jbGFzcyBHaG9zdCBleHRlbmRzIE1vbnN0ZXJfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gR2hvc3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgR29ibGluIGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLnJvY2tDb29yZHMgPSB7IHg6IDEsIHk6IDEgfTtcclxuICAgICAgICB0aGlzLnJvY2tUaHJvd2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb2NrKHN0YXJ0SW5kZXhlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnJvY2tDb29yZHMueCA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgdGhpcy5yb2NrQ29vcmRzLnggPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgdGhpcy5yb2NrQ29vcmRzLnkgPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgIHRoaXMucm9ja0Nvb3Jkcy55IDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7IH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBHb2JsaW47XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgR3J1bnQgZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEdydW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jbGFzcyBIZWxwZXJzIHtcclxuICAgIGdldFN0YXJ0SW5kZXhlcygpIHtcclxuICAgICAgICBsZXQgeCA9IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCAtIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCAlIDgwO1xyXG4gICAgICAgIGxldCB5ID0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZIC0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZICUgODA7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogeCAvIDgwLCB5OiB5IC8gODAgfTtcclxuICAgIH1cclxuICAgIGdldFN0YXJ0SW5kZXhlczIoKSB7XHJcbiAgICAgICAgbGV0IHggPSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggLSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggJSA0MDtcclxuICAgICAgICBsZXQgeSA9IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSAtIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSAlIDQwO1xyXG4gICAgICAgIHJldHVybiB7IHg6IHggLyA0MCwgeTogeSAvIDQwIH07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEhlbHBlcnMoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgSW1hZ2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMud2FsbHMgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICB0aGlzLndhbGxzY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLm1haW5DaGFyYWN0ZXIgPSB0aGlzLmltYWdlTG9hZGVyKFwibWFpbkNoYXJhY3Rlci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5iaWdOdW1iZXJzID0gdGhpcy5pbWFnZUxvYWRlcihcImJpZ051bWJlcnMucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuYm90dG9tQmFyID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaW1hZ2VMb2FkZXIoXCJpdGVtcy5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5udW1iZXJzID0gdGhpcy5pbWFnZUxvYWRlcihcIm51bWJlcnMucG5nXCIpO1xyXG4gICAgICAgIHRoaXMud2VhcG9ucyA9IHRoaXMuaW1hZ2VMb2FkZXIoXCJ3ZWFwb25zLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJzID0gdGhpcy5pbWFnZUxvYWRlcihcIm1vbnN0ZXJzLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmxldHRlcnMgPSB0aGlzLmltYWdlTG9hZGVyKFwibGV0dGVycy5wbmdcIik7XHJcbiAgICB9XHJcbiAgICBpbWFnZUxvYWRlcihmaWxlTmFtZSkge1xyXG4gICAgICAgIGxldCBwaG90byA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIHBob3RvLnNyYyA9IFwiaW1hZ2VzL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgcmV0dXJuIHBob3RvO1xyXG4gICAgfVxyXG4gICAgbG9hZFdhbGxzQ29sb3IoZmlsdGVyU3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy53YWxscyA9IHRoaXMuaW1hZ2VMb2FkZXIoXCJ3YWxscy5wbmdcIik7XHJcbiAgICAgICAgdGhpcy53YWxscy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICB0YWcud2lkdGggPSAzMjI7XHJcbiAgICAgICAgICAgIHRhZy5oZWlnaHQgPSAxNjtcclxuICAgICAgICAgICAgbGV0IGN0eCA9IHRhZy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY3R4LmZpbHRlciA9IGZpbHRlclN0cmluZztcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLndhbGxzLCAwLCAwLCAzMjIsIDE2LCAwLCAwLCAzMjIsIDE2KTtcclxuICAgICAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICAgICAgdGhpcy53YWxsc2NhbnZhcyA9IHRhZztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBJbWFnZXMoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5BYmlsaXRpZXMgPSBleHBvcnRzLkRpcmVjdGlvbnMgPSB2b2lkIDA7XHJcbnZhciBEaXJlY3Rpb25zO1xyXG4oZnVuY3Rpb24gKERpcmVjdGlvbnMpIHtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIlRPUFwiXSA9IDBdID0gXCJUT1BcIjtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIlRPUF9SSUdIVFwiXSA9IDFdID0gXCJUT1BfUklHSFRcIjtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIlJJR0hUXCJdID0gMl0gPSBcIlJJR0hUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJCT1RUT01fUklHSFRcIl0gPSAzXSA9IFwiQk9UVE9NX1JJR0hUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJCT1RUT01cIl0gPSA0XSA9IFwiQk9UVE9NXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJCT1RUT01fTEVGVFwiXSA9IDVdID0gXCJCT1RUT01fTEVGVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiTEVGVFwiXSA9IDZdID0gXCJMRUZUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJUT1BfTEVGVFwiXSA9IDddID0gXCJUT1BfTEVGVFwiO1xyXG59KShEaXJlY3Rpb25zID0gZXhwb3J0cy5EaXJlY3Rpb25zIHx8IChleHBvcnRzLkRpcmVjdGlvbnMgPSB7fSkpO1xyXG52YXIgQWJpbGl0aWVzO1xyXG4oZnVuY3Rpb24gKEFiaWxpdGllcykge1xyXG4gICAgQWJpbGl0aWVzW0FiaWxpdGllc1tcIkVYVFJBX0FSTU9VUlwiXSA9IDBdID0gXCJFWFRSQV9BUk1PVVJcIjtcclxuICAgIEFiaWxpdGllc1tBYmlsaXRpZXNbXCJFWFRSQV9DQVJSWUlOR19BQklMSVRZXCJdID0gMV0gPSBcIkVYVFJBX0NBUlJZSU5HX0FCSUxJVFlcIjtcclxuICAgIEFiaWxpdGllc1tBYmlsaXRpZXNbXCJFWFRSQV9NQUdJQ19QT1dFUlwiXSA9IDJdID0gXCJFWFRSQV9NQUdJQ19QT1dFUlwiO1xyXG4gICAgQWJpbGl0aWVzW0FiaWxpdGllc1tcIkVYVFJBX1NIT1RfUE9XRVJcIl0gPSAzXSA9IFwiRVhUUkFfU0hPVF9QT1dFUlwiO1xyXG4gICAgQWJpbGl0aWVzW0FiaWxpdGllc1tcIkVYVFJBX0ZJR0hUX1BPV0VSXCJdID0gNF0gPSBcIkVYVFJBX0ZJR0hUX1BPV0VSXCI7XHJcbn0pKEFiaWxpdGllcyA9IGV4cG9ydHMuQWJpbGl0aWVzIHx8IChleHBvcnRzLkFiaWxpdGllcyA9IHt9KSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNsYXNzIEtleWJvYXJkRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNwYWNlS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUV2ZW50cyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVFdmVudHMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5XS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIldcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJXXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVNcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIlNcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJTXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleUFcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIkFcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJBXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleURcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ES2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIkRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJEXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3BhY2VLZXlDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUV2ZW50cylcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5V1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLldLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiV1wiKSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5U1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiU1wiKSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5QVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiQVwiKSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5RFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiRFwiKSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiU3BhY2VcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuU3BhY2VLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleUNcIilcclxuICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhck1hcEZyb21Nb25zdGVyc0FuZFNwYXduZXJzKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBLZXlib2FyZEV2ZW50cygpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBLZXlib2FyZEV2ZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0tleWJvYXJkRXZlbnRzXCIpKTtcclxuY29uc3QgUHJvamVjdGlsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Byb2plY3RpbGVcIikpO1xyXG5jb25zdCBDb25zdHNfMSA9IHJlcXVpcmUoXCIuL0NvbnN0c1wiKTtcclxuY29uc3QgU291bmRzSGFuZGxlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1NvdW5kc0hhbmRsZXJcIikpO1xyXG5jb25zdCBTb3JjZXJlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1NvcmNlcmVyXCIpKTtcclxuY29uc3QgbW92ZSA9IDI7XHJcbmNsYXNzIE1haW5DaGFyYWN0ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VDb2wgPSAwO1xyXG4gICAgICAgIHRoaXMuc2NvcmUgPSAyMDtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IDIwMDA7XHJcbiAgICAgICAgdGhpcy5vd25lZEFiaWxpdGllcyA9IFtdO1xyXG4gICAgICAgIHRoaXMua2V5cyA9IDA7XHJcbiAgICAgICAgdGhpcy5wb3Rpb25zID0gMDtcclxuICAgICAgICB0aGlzLnhDb29yZCA9IDA7XHJcbiAgICAgICAgdGhpcy55Q29vcmQgPSAwO1xyXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gMTY7XHJcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAxNjtcclxuICAgICAgICB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMubGFzdE1vdmV0aW1lc3RhbXAgPSAxNjtcclxuICAgICAgICB0aGlzLmxhc3REaXJlY3Rpb24gPSBbNCwgMF07XHJcbiAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSA1O1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRnJhbWUgPSAzO1xyXG4gICAgICAgIHRoaXMudGhpcmRGcmFtZSA9IDE7XHJcbiAgICAgICAgdGhpcy53ZWFwb24gPSBuZXcgUHJvamVjdGlsZV8xLmRlZmF1bHQodGhpcy5zb3VyY2VDb2wsIDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMubG9zaW5uZ0hQSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGVhbHRoKC0xKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB0aGlzLnNvdW5kX21hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRfbWFuYWdlciA9IG5ldyBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdChcIi4vc291bmRzL2F1ZGlvXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpc0RlYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC50aW1lc1VwKCk7XHJcbiAgICB9XHJcbiAgICBhbmltYXRlUHJvamVjdGlsZSgpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcclxuICAgICAgICBpZiAodGhpcy53ZWFwb24ueFBvc2l0aW9uIDwgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYIC0gODAgfHxcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uID4gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYICsgQ2FudmFzXzEuZGVmYXVsdC53aWR0aCB8fFxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgKyBDYW52YXNfMS5kZWZhdWx0LmhlaWdodCB8fFxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPCBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgLSA4MClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgUHJvamVjdGlsZUNvb3JkcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXM0KHRoaXMud2VhcG9uLnhQb3NpdGlvbiArIDIwLCB0aGlzLndlYXBvbi55UG9zaXRpb24gKyAyMCk7XHJcbiAgICAgICAgaWYgKENvbnN0c18xLlR5cGVzT2ZCbG9ja3Mubm9UcmFuc2l0aW9uRm9yUHJvamVjdGlsZS5pbmNsdWRlcygoX2IgPSAoX2EgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbUHJvamVjdGlsZUNvb3Jkc1swXSAqIDJdKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGludmlzaWJsZVNvcmNlcmVySGl0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKENvbnN0c18xLlR5cGVzT2ZCbG9ja3MubW9uc3RlcnMuaW5jbHVkZXMoKF9kID0gKF9jID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW1Byb2plY3RpbGVDb29yZHNbMV0gKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW1Byb2plY3RpbGVDb29yZHNbMF0gKiAyXSkpIHtcclxuICAgICAgICAgICAgbGV0IGtpbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZk1vbnN0ZXJzID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZNb25zdGVycy5maWx0ZXIobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gLSAxID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiArIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgKyAxICYmIG1vbnN0ZXIueVBvc2l0aW9uICsgMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9uc3RlciBpbnN0YW5jZW9mIFNvcmNlcmVyXzEuZGVmYXVsdCAmJiBtb25zdGVyLmlzVmlzaWJsZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52aXNpYmxlU29yY2VyZXJIaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mR29ibGlucyA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mR29ibGlucy5maWx0ZXIobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gLSAxID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiArIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgKyAxICYmIG1vbnN0ZXIueVBvc2l0aW9uICsgMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmRpZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBraWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGludmlzaWJsZVNvcmNlcmVySGl0ID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQ29uc3RzXzEuVHlwZXNPZkJsb2Nrcy5kZXN0cm95YWJsZVRoaW5ncy5pbmNsdWRlcygoX2YgPSAoX2UgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDJdKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ZbUHJvamVjdGlsZUNvb3Jkc1swXSAqIDJdKSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lUaGluZyhQcm9qZWN0aWxlQ29vcmRzLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSB0aGlzLndlYXBvbi5kaXJlY3Rpb247XHJcbiAgICAgICAgbGV0IHNwZWVkID0gNDtcclxuICAgICAgICBpZiAoWzIsIDMsIDRdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoWzYsIDcsIDhdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoWzgsIDEsIDJdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoWzQsIDUsIDZdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAodGhpcy5zb3VyY2VDb2wgIT0gMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLndlYXBvbi5hbmltYXRpb25UaW1lc3RhbXAgJSA0ID09IDApXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLmZyYW1lKys7XHJcbiAgICAgICAgdGhpcy53ZWFwb24uYW5pbWF0aW9uVGltZXN0YW1wKys7XHJcbiAgICAgICAgaWYgKHRoaXMud2VhcG9uLmZyYW1lID09IDgpXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLmZyYW1lID0gMDtcclxuICAgIH1cclxuICAgIHRocm93V2VhcG9uKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHRoaXMud2VhcG9uLmxhc3RUaW1lVGhyb3dlZCA8IDE1MClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMud2VhcG9uLmxhc3RUaW1lVGhyb3dlZCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYXBvbi5mcmFtZSA9IHRoaXMubGFzdERpcmVjdGlvblswXTtcclxuICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gPSB0aGlzLnhDb29yZDtcclxuICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPSB0aGlzLnlDb29yZDtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubGFzdERpcmVjdGlvblswXSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDE5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSA0MDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gNDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gNDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDQwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSAxOTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMud2VhcG9uLnhQb3NpdGlvbis9MjA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2VhcG9uLmRpcmVjdGlvbiA9IHRoaXMubGFzdERpcmVjdGlvblswXSArIDE7XHJcbiAgICAgICAgKF9hID0gdGhpcy5zb3VuZF9tYW5hZ2VyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGxheShcInRocm93ZWRXZWFwb25cIik7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VTY29yZShwb2ludHMpIHtcclxuICAgICAgICB0aGlzLnNjb3JlICs9IHBvaW50cztcclxuICAgIH1cclxuICAgIGNoYW5nZUhlYWx0aChwb2ludHMpIHtcclxuICAgICAgICB0aGlzLmhlYWx0aCArPSBwb2ludHM7XHJcbiAgICAgICAgdGhpcy5pc0RlYWQoKTtcclxuICAgIH1cclxuICAgIHJlc2VydmVBcnJheSgpIHtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gdGhpcy5hY3R1YWxEaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5jb29yZHNBcnJheUluZGV4ZXMgPSB0aGlzLmdldENvb3JkaW5hdGVzMyh0aGlzLnhDb29yZCwgdGhpcy55Q29vcmQpO1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIodGhpcy5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAtIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAtIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgaWYgKENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMikpXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gKyAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAtIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgaWYgKENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdKSlcclxuICAgICAgICAgICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGlmIChDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gKyAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gKyAyXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIGlmIChDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0sIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMikpXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0sIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gKyAyKSlcclxuICAgICAgICAgICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV1dLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgaWYgKENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMikpXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gLSAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAtIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbmltYXRlQ2hhcmFjdGVyKCkge1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5jaGVja0ZvclBpY2tpbmdJdGVtcygpO1xyXG4gICAgICAgIGlmICh0aGlzLndlYXBvbi50aHJvd24pXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVByb2plY3RpbGUoKTtcclxuICAgICAgICBpZiAodGhpcy5sYXN0TW92ZXRpbWVzdGFtcCA9PT0gMTYpIHtcclxuICAgICAgICAgICAgaWYgKEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TcGFjZUtleUNsaWNrZWQgJiYgdGhpcy53ZWFwb24udGhyb3duID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRocm93V2VhcG9uKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGF2YWlsYWJsZURpcmVjdGlvbnMgPSB0aGlzLmNoZWNrRm9yQ29sbGlzaW9ucygpO1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IHRoaXMuY2hlY2tEaXJlY3Rpb24oKTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbnMubGVuZ3RoICE9IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3REaXJlY3Rpb25bMF0gPSB0aGlzLnR3b0RpcmVjdGlvbnNJbnRvT25lKGRpcmVjdGlvbnMpIC0gMTtcclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbnNDb3B5ID0gWy4uLmRpcmVjdGlvbnNdO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLmZvckVhY2goZGlyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkaXIgPT09IDEgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy50b3AgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnNDb3B5LnNwbGljZShkaXJlY3Rpb25zQ29weS5pbmRleE9mKDEpLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXIgPT09IDMgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy5yaWdodCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0NvcHkuc3BsaWNlKGRpcmVjdGlvbnNDb3B5LmluZGV4T2YoMyksIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gNSAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0NvcHkuc3BsaWNlKGRpcmVjdGlvbnNDb3B5LmluZGV4T2YoNSksIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gNyAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnNDb3B5LnNwbGljZShkaXJlY3Rpb25zQ29weS5pbmRleE9mKDcpLCAxKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25zQ29weS5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gdGhpcy50d29EaXJlY3Rpb25zSW50b09uZShkaXJlY3Rpb25zQ29weSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdHVhbERpcmVjdGlvbiA9PSAyICYmIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wcmlnaHQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy50b3ApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5yaWdodClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDM7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdHVhbERpcmVjdGlvbiA9PSA0ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tcmlnaHQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b20pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSA1O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5yaWdodClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDM7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdHVhbERpcmVjdGlvbiA9PSA2ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tbGVmdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSA3O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3R1YWxEaXJlY3Rpb24gPT0gOCAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcGxlZnQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy50b3ApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5sZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gNztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE1vdmV0aW1lc3RhbXAgPCA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdmV0aW1lc3RhbXAgKz0gbW92ZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2hhcmFjdGVyKG1vdmUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYXN0TW92ZXRpbWVzdGFtcCA+PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3REaXJlY3Rpb25bMV0gPSB0aGlzLnRoaXJkRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sYXN0TW92ZXRpbWVzdGFtcCA8IDEyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdmV0aW1lc3RhbXAgKz0gbW92ZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2hhcmFjdGVyKG1vdmUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYXN0TW92ZXRpbWVzdGFtcCA+PSAxMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uWzFdID0gMDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRoaXJkRnJhbWUgPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRoaXJkRnJhbWUgPSAyO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGhpcmRGcmFtZSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sYXN0TW92ZXRpbWVzdGFtcCA8IDE2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE1vdmV0aW1lc3RhbXAgKz0gbW92ZTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2hhcmFjdGVyKG1vdmUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sYXN0TW92ZXRpbWVzdGFtcCA+PSAxNikge1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2syKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzID0gdGhpcy5nZXRDb29yZGluYXRlczModGhpcy54Q29vcmQsIHRoaXMueUNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGlmIChDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXVt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXV0gPT09IDI5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmVuZE9mTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LnN0YWNrT2ZDbGlja3MubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LlNwYWNlS2V5Q2xpY2tlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCByZXMgPSB0aGlzLmNoZWNrRGlyZWN0aW9uKCk7XHJcbiAgICAgICAgbGV0IHJlczIgPSB0aGlzLnR3b0RpcmVjdGlvbnNJbnRvT25lKHJlcyk7XHJcbiAgICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uWzBdID0gcmVzMiAtIDE7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZXRpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXNlcnZlQXJyYXkoKTtcclxuICAgIH1cclxuICAgIGNoZWNrRm9yQ29sbGlzaW9ucygpIHtcclxuICAgICAgICBjb25zdCBDb29yZHMgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMueENvb3JkLCB0aGlzLnlDb29yZCk7XHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZURpcmVjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRvcDogdHJ1ZSwgdG9wcmlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHJpZ2h0OiB0cnVlLCBib3R0b21yaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgYm90dG9tOiB0cnVlLCBib3R0b21sZWZ0OiB0cnVlLFxyXG4gICAgICAgICAgICBsZWZ0OiB0cnVlLCB0b3BsZWZ0OiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdIC0gMSwgQ29vcmRzWzBdKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSArIDEsIENvb3Jkc1swXSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0sIENvb3Jkc1swXSAtIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5sZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSwgQ29vcmRzWzBdICsgMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMucmlnaHQgPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgdGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdIC0gMSwgQ29vcmRzWzBdICsgMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcHJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdCA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICB0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0gLSAxLCBDb29yZHNbMF0gLSAxKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wbGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSArIDEsIENvb3Jkc1swXSArIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21yaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQgPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgdGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdICsgMSwgQ29vcmRzWzBdIC0gMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbWxlZnQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlRGlyZWN0aW9ucztcclxuICAgIH1cclxuICAgIGNoZWNrRm9yUGlja2luZ0l0ZW1zKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgQ29vcmRzID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnhDb29yZCwgdGhpcy55Q29vcmQpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IChfYiA9IChfYSA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtDb29yZHNbMV0gKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW0Nvb3Jkc1swXSAqIDJdO1xyXG4gICAgICAgIGlmIChDb25zdHNfMS5UeXBlc09mQmxvY2tzLnBpY2thYmxlSXRlbXMuaW5jbHVkZXMoaXRlbUluZGV4KSlcclxuICAgICAgICAgICAgdGhpcy5waWNrSXRlbShpdGVtSW5kZXgsIENvb3Jkcyk7XHJcbiAgICB9XHJcbiAgICBpc0ZpZWxkQ2xlYXIoeSwgeCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfciwgX3MsIF90LCBfdSwgX3YsIF93LCBfeCwgX3ksIF96LCBfMCwgXzEsIF8yLCBfMywgXzQsIF81LCBfNiwgXzc7XHJcbiAgICAgICAgaWYgKCgoKF9iID0gKF9hID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3kgKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3ggKiAyXSkgPCAyNiAmJiAoKF9kID0gKF9jID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3kgKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW3ggKiAyXSkgIT0gMCkgfHxcclxuICAgICAgICAgICAgKCgoX2YgPSAoX2UgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbeSAqIDIgKyAxXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mW3ggKiAyXSkgPCAyNiAmJiAoKF9oID0gKF9nID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW3kgKiAyICsgMV0pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaFt4ICogMl0pICE9IDApIHx8XHJcbiAgICAgICAgICAgICgoKF9rID0gKF9qID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qW3kgKiAyXSkgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rW3ggKiAyICsgMV0pIDwgMjYgJiYgKChfbSA9IChfbCA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbFt5ICogMl0pID09PSBudWxsIHx8IF9tID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbVt4ICogMiArIDFdKSAhPSAwKSB8fFxyXG4gICAgICAgICAgICAoKChfcCA9IChfbyA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9vID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfb1t5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3BbeCAqIDIgKyAxXSkgPCAyNiAmJiAoKF9yID0gKF9xID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX3EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9xW3kgKiAyICsgMV0pID09PSBudWxsIHx8IF9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfclt4ICogMiArIDFdKSAhPSAwKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICgoKChfdCA9IChfcyA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc1t5ICogMl0pID09PSBudWxsIHx8IF90ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdFt4ICogMl0pID09IDMwKSAmJlxyXG4gICAgICAgICAgICAoKChfdiA9IChfdSA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF91ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdVt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfdiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3ZbeCAqIDJdKSA9PSAzMCkgJiZcclxuICAgICAgICAgICAgKCgoX3ggPSAoX3cgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfdyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3dbeSAqIDJdKSA9PT0gbnVsbCB8fCBfeCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3hbeCAqIDIgKyAxXSkgPT0gMzApICYmXHJcbiAgICAgICAgICAgICgoKF96ID0gKF95ID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX3kgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF95W3kgKiAyICsgMV0pID09PSBudWxsIHx8IF96ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfelt4ICogMiArIDFdKSA9PSAzMCkgJiZcclxuICAgICAgICAgICAgdGhpcy5rZXlzID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoKCgoXzEgPSAoXzAgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfMCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzBbeSAqIDJdKSA9PT0gbnVsbCB8fCBfMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzFbeCAqIDJdKSA9PSAzMSkgJiZcclxuICAgICAgICAgICAgKCgoXzMgPSAoXzIgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzJbeSAqIDIgKyAxXSkgPT09IG51bGwgfHwgXzMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8zW3ggKiAyXSkgPT0gMzEpICYmXHJcbiAgICAgICAgICAgICgoKF81ID0gKF80ID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgXzQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF80W3kgKiAyXSkgPT09IG51bGwgfHwgXzUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF81W3ggKiAyICsgMV0pID09IDMxKSAmJlxyXG4gICAgICAgICAgICAoKChfNyA9IChfNiA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF82ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNlt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfNyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzdbeCAqIDIgKyAxXSkgPT0gMzEpICYmXHJcbiAgICAgICAgICAgIHRoaXMua2V5cyA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICB0d29EaXJlY3Rpb25zSW50b09uZShkaXJlY3Rpb25zKSB7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoMSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcygzKSlcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoMSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcyg3KSlcclxuICAgICAgICAgICAgcmV0dXJuIDg7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoNSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcygzKSlcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoNSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcyg3KSlcclxuICAgICAgICAgICAgcmV0dXJuIDY7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uc1swXTtcclxuICAgIH1cclxuICAgIG1vdmVDaGFyYWN0ZXIoc3BlZWQpIHtcclxuICAgICAgICAvLyAgOCAxIDJcclxuICAgICAgICAvLyA3ICBYICAzXHJcbiAgICAgICAgLy8gIDYgNSA0XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMuYWN0dWFsRGlyZWN0aW9uO1xyXG4gICAgICAgIGlmIChbMiwgMywgNF0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy54Q29vcmQgKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFs2LCA3LCA4XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLnhDb29yZCAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoWzgsIDEsIDJdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMueUNvb3JkIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbNCwgNSwgNl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy55Q29vcmQgKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgdGhpcy5tb3ZlTWFwKCk7XHJcbiAgICB9XHJcbiAgICBjaGVja0RpcmVjdGlvbigpIHtcclxuICAgICAgICBsZXQgYXJyID0gS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LnN0YWNrT2ZDbGlja3Muc2xpY2UoKTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmIChhcnIuaW5kZXhPZihcIldcIikgPiBhcnIuaW5kZXhPZihcIlNcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCgxKTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5kZXhPZihcIldcIikgPCBhcnIuaW5kZXhPZihcIlNcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCg1KTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJXXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goMSk7XHJcbiAgICAgICAgZWxzZSBpZiAoYXJyLmluY2x1ZGVzKFwiU1wiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDUpO1xyXG4gICAgICAgIGlmIChhcnIuaW5kZXhPZihcIkFcIikgPiBhcnIuaW5kZXhPZihcIkRcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCg3KTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5kZXhPZihcIkFcIikgPCBhcnIuaW5kZXhPZihcIkRcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCgzKTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJBXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goNyk7XHJcbiAgICAgICAgZWxzZSBpZiAoYXJyLmluY2x1ZGVzKFwiRFwiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDMpO1xyXG4gICAgICAgIHJldHVybiBkaXJlY3Rpb25zO1xyXG4gICAgfVxyXG4gICAgbW92ZU1hcCgpIHtcclxuICAgICAgICBsZXQgZ2FtZUNhbnZhc0hlaWdodCA9IENhbnZhc18xLmRlZmF1bHQuaGVpZ2h0IC0gMjAwO1xyXG4gICAgICAgIGxldCBtYXBYID0gdGhpcy54Q29vcmQgKyA0MCAtIChDYW52YXNfMS5kZWZhdWx0LndpZHRoICsgMSkgLyAyO1xyXG4gICAgICAgIGxldCBtYXBZID0gdGhpcy55Q29vcmQgKyA0MCAtIGdhbWVDYW52YXNIZWlnaHQgLyAyO1xyXG4gICAgICAgIGlmIChtYXBYIDwgMClcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYID0gMDtcclxuICAgICAgICBlbHNlIGlmIChtYXBYICsgQ2FudmFzXzEuZGVmYXVsdC53aWR0aCA+PSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAueFNpemVJblBpeGVscylcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYID0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnhTaXplSW5QaXhlbHMgLSBDYW52YXNfMS5kZWZhdWx0LndpZHRoO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYID0gbWFwWDtcclxuICAgICAgICBpZiAobWFwWSA8IDApXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSA9IDA7XHJcbiAgICAgICAgZWxzZSBpZiAobWFwWSArIGdhbWVDYW52YXNIZWlnaHQgPj0gQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnlTaXplSW5QaXhlbHMpXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSA9IENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC55U2l6ZUluUGl4ZWxzIC0gZ2FtZUNhbnZhc0hlaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSA9IG1hcFk7XHJcbiAgICB9XHJcbiAgICBnZXRDb29yZGluYXRlcyh4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9ICh4ICsgNDAgLSAoeCArIDQwKSAlIDgwKSAvIDgwO1xyXG4gICAgICAgIGxldCB5SW5kZXggPSAoeSArIDQwIC0gKHkgKyA0MCkgJSA4MCkgLyA4MDtcclxuICAgICAgICByZXR1cm4gW3hJbmRleCwgeUluZGV4XTtcclxuICAgIH1cclxuICAgIGdldENvb3JkaW5hdGVzMih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9IHggLyA0MDtcclxuICAgICAgICBsZXQgeUluZGV4ID0geSAvIDQwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vcmRpbmF0ZXMzKHgsIHkpIHtcclxuICAgICAgICBsZXQgeEluZGV4ID0gKHggLSB4ICUgNDApIC8gNDA7XHJcbiAgICAgICAgbGV0IHlJbmRleCA9ICh5IC0geSAlIDQwKSAvIDQwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vcmRpbmF0ZXM0KHgsIHkpIHtcclxuICAgICAgICBsZXQgeEluZGV4ID0gKHggLSB4ICUgODApIC8gODA7XHJcbiAgICAgICAgbGV0IHlJbmRleCA9ICh5IC0geSAlIDgwKSAvIDgwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZGVzdHJveVRoaW5nKGNvb3JkcywgYWRkU2NvcmUpIHtcclxuICAgICAgICBjb25zdCBpdGVtSUQgPSBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDJdO1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbUlEKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTY6XHJcbiAgICAgICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2soY29vcmRzLCAxNyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxNzpcclxuICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhjb29yZHMsIDE4KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgICBjYXNlIDIxOlxyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5kZWxldGVTcGF3bmVyKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMjpcclxuICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhjb29yZHMsIDIwKTtcclxuICAgICAgICAgICAgICAgIGlmIChhZGRTY29yZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIzOlxyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrKGNvb3JkcywgMjUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkZFNjb3JlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjQ6XHJcbiAgICAgICAgICAgIGNhc2UgMjU6XHJcbiAgICAgICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmRlbGV0ZVNwYXduZXIoY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhZGRTY29yZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMzOlxyXG4gICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICBjYXNlIDQxOlxyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM2OlxyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhck1hcEZyb21Nb25zdGVyc0FuZFNwYXduZXJzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBpY2tJdGVtKGl0ZW1JbmRleCwgY29vcmRzKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbUluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjY6IC8vYm94XHJcbiAgICAgICAgICAgIGNhc2UgMjc6IC8vYm94XHJcbiAgICAgICAgICAgIGNhc2UgMjg6IC8vYm94XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLnNvdW5kX21hbmFnZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMyOiAvLyBrZXlcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5cysrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgKF9iID0gdGhpcy5zb3VuZF9tYW5hZ2VyKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucGxheShcInBpY2tlZEtleVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM2OiAvLyBibHVlIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3Rpb25zKys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAoX2MgPSB0aGlzLnNvdW5kX21hbmFnZXIpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMzOiAvL3llbGxvdyBib290bGVcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSGVhbHRoKDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAoX2QgPSB0aGlzLnNvdW5kX21hbmFnZXIpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM0OiAvL2NoaWNrZW53aW5nXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUhlYWx0aCgxMDApO1xyXG4gICAgICAgICAgICAgICAgKF9lID0gdGhpcy5zb3VuZF9tYW5hZ2VyKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UucGxheShcInBpY2tlZEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzNjogLy9tZWRhbGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgKF9mID0gdGhpcy5zb3VuZF9tYW5hZ2VyKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucGxheShcInBpY2tlZEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzNzogLy8gbGlnaHRibHVlIGVsaXhpclxyXG4gICAgICAgICAgICBjYXNlIDM4OiAvLyBncmVlbiBlbGl4aXJcclxuICAgICAgICAgICAgY2FzZSAzOTogLy8geWVsbG93IGVsaXhpciBcclxuICAgICAgICAgICAgY2FzZSA0MDogLy8gcHVycGxlIGVsaXhpclxyXG4gICAgICAgICAgICBjYXNlIDQxOiAvLyBicm93biBlbGl4aXJcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5vd25lZEFiaWxpdGllcy5pbmNsdWRlcyhpdGVtSW5kZXgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3duZWRBYmlsaXRpZXMucHVzaChpdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnBpY2tpbmdBYmlsaXR5KGl0ZW1JbmRleCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMDpcclxuICAgICAgICAgICAgY2FzZSAzMTpcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5cy0tO1xyXG4gICAgICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmZpbmRHbGFzcyhjb29yZHNbMF0gKiAyLCBjb29yZHNbMV0gKiAyKTtcclxuICAgICAgICAgICAgICAgIChfZyA9IHRoaXMuc291bmRfbWFuYWdlcikgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnBsYXkoXCJvcGVuRG9vcnNcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyXSA9IDA7XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyICsgMV0gPSAwO1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDJdID0gMDtcclxuICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAubWFwW2Nvb3Jkc1sxXSAqIDIgKyAxXVtjb29yZHNbMF0gKiAyICsgMV0gPSAwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBNYWluQ2hhcmFjdGVyKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgSW50ZXJmYWNlc18xID0gcmVxdWlyZShcIi4vSW50ZXJmYWNlc1wiKTtcclxuY2xhc3MgTW9uc3RlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbHVtbiA9IDA7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VGcm9tUGxheWVyID0gMDtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbHVtbiA9IHNvdXJjZUNvbHVtbjtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IHhQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnlQb3NpdGlvbiA9IHlQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmlkID0gLSg4MCArIHNvdXJjZUNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gc3RhcnREaXJlY3Rpb247XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbeFBvc2l0aW9uLCB5UG9zaXRpb25dLCB0aGlzLmlkKTtcclxuICAgIH1cclxuICAgIGxvb2tBdE1lKHhDb29yZCwgeUNvb3JkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uID09IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA+IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1A7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uID09IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA8IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT007XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueVBvc2l0aW9uID09IHlDb29yZCAmJiB0aGlzLnhQb3NpdGlvbiA+IHhDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnlQb3NpdGlvbiA9PSB5Q29vcmQgJiYgdGhpcy54UG9zaXRpb24gPCB4Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uID4geENvb3JkICYmIHRoaXMueVBvc2l0aW9uID4geUNvb3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA+IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA8IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPCB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPiB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QX1JJR0hUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA8IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA8IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fUklHSFQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkaWUoYWRkU2NvcmUpIHtcclxuICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jazIoW3RoaXMueFBvc2l0aW9uLCB0aGlzLnlQb3NpdGlvbl0pO1xyXG4gICAgICAgIGlmIChhZGRTY29yZSlcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY2hhbmdlU2NvcmUoNSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gTW9uc3RlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ2FudmFzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2FudmFzXCIpKTtcclxuY29uc3QgQ29uc3RzXzEgPSByZXF1aXJlKFwiLi9Db25zdHNcIik7XHJcbmNvbnN0IEltYWdlc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0ltYWdlc1wiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY2xhc3MgUHJvamVjdGlsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VSb3csIGRpcmVjdGlvbiwgeFBvc2l0aW9uLCB5UG9zaXRpb24pIHtcclxuICAgICAgICB0aGlzLnNvdXJjZVJvdyA9IDA7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAwO1xyXG4gICAgICAgIHRoaXMuZnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMueFBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnlQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy50aHJvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvblRpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0VGltZVRocm93ZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc291cmNlUm93ID0gc291cmNlUm93O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMueFBvc2l0aW9uID0geFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0geVBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgZHJhdyhyZW5kZXJlZFZpZXcpIHtcclxuICAgICAgICBpZiAoIU1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LndlYXBvbi50aHJvd24pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC53ZWFwb25zLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24uZnJhbWUgKiA5LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiA5LCA4LCA4LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24ueFBvc2l0aW9uIC0gcmVuZGVyZWRWaWV3LngsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LndlYXBvbi55UG9zaXRpb24gLSByZW5kZXJlZFZpZXcueSwgOCAqIENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyLCA4ICogQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFByb2plY3RpbGU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgU29yY2VyZXIgZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gU29yY2VyZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIGNTb3VuZEZpbGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2FkRmlsZSA9IChmaWxlX25hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnhoci5vcGVuKFwiR0VUXCIsIGZpbGVfbmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgdGhpcy54aHIub25sb2FkID0gdGhpcy5vbkxvYWRDb21wbGV0ZTtcclxuICAgICAgICAgICAgdGhpcy54aHIuc2VuZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkxvYWRDb21wbGV0ZSA9IChldikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHRoaXMueGhyID0gZXYuY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgKF9hID0gdGhpcy5jb250ZXh0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVjb2RlQXVkaW9EYXRhKHRoaXMueGhyLnJlc3BvbnNlLCB0aGlzLmRlY29kZURhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kZWNvZGVEYXRhID0gKGJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wbGF5ID0gKHN0YXJ0X3RpbWUsIGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZENvbXBsZXRlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLnN0YXJ0KHRoaXMuY29udGV4dC5jdXJyZW50VGltZSwgc3RhcnRfdGltZSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBhdWRpb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkRmlsZShcIi4vc291bmRzL2F1ZGlvLm1wM1wiKTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBjU291bmRNYXJrZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc3RhcnQsIGR1cmF0aW9uLCB2b2x1bWUsIGxvb3ApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMDtcclxuICAgICAgICB0aGlzLmxvb3AgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcclxuICAgIH1cclxufVxyXG5jbGFzcyBjU291bmRNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdW5kX2ZpbGUpIHtcclxuICAgICAgICB0aGlzLm11dGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNvdW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2pzb25GaWxlTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc291bmRGaWxlU3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNvdW5kTWFya2VycyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3NvdW5kRmlsZSA9IG5ldyBjU291bmRGaWxlKCk7XHJcbiAgICAgICAgdGhpcy5tcDNFbmFibGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuICEhKGEuY2FuUGxheVR5cGUgJiYgYS5jYW5QbGF5VHlwZShcImF1ZGlvL21wZWc7XCIpLnJlcGxhY2UoL25vLywgJycpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucGxheSA9IChzb3VuZF9uYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm11dGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBtYXJrZXIgPSB0aGlzLnNvdW5kTWFya2Vyc1tzb3VuZF9uYW1lXTtcclxuICAgICAgICAgICAgaWYgKG1hcmtlciA9PT0gbnVsbCB8fCBtYXJrZXIgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fc291bmRGaWxlLnBsYXkobWFya2VyLnN0YXJ0LCBtYXJrZXIuZHVyYXRpb24pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fbG9hZE1hcmtlcnMgPSAoanNvbmZpbGUpID0+IHtcclxuICAgICAgICAgICAgdmFyIG1hcmtlcl94aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgbWFya2VyX3hoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyX3hoci5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FICYmIG1hcmtlcl94aHIuc3RhdHVzID09PSAyMDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25SZWFkKEpTT04ucGFyc2UobWFya2VyX3hoci5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKFs0MDQsIDQwM10uaW5jbHVkZXMobWFya2VyX3hoci5yZWFkeVN0YXRlKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkVycm9yKG1hcmtlcl94aHIpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBtYXJrZXJfeGhyLm9wZW4oXCJHRVRcIiwganNvbmZpbGUsIHRydWUpO1xyXG4gICAgICAgICAgICBtYXJrZXJfeGhyLnNlbmQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX29uUmVhZCA9IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG1hcmtlcl9uYW1lIGluIGRhdGEubWFya2Vycykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hcmtlcnMgPSBkYXRhLm1hcmtlcnNbbWFya2VyX25hbWVdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIobmV3IGNTb3VuZE1hcmtlcihtYXJrZXJfbmFtZSwgbWFya2Vycy5zdGFydCwgbWFya2Vycy5kdXJhdGlvbiwgbWFya2Vycy52b2x1bWUsIG1hcmtlcnMubG9vcCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2pzb25GaWxlTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NvdW5kRmlsZS5sb2FkQ29tcGxldGUgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc291bmRzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXAzRW5hYmxlZCgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRGaWxlLmxvYWRGaWxlKHRoaXMuX3NvdW5kRmlsZVN0cmluZyArIFwiLm1wM1wiKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRGaWxlLmxvYWRGaWxlKHRoaXMuX3NvdW5kRmlsZVN0cmluZyArIFwiLm9nZ1wiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuU291bmRGaWxlTG9hZGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fanNvbkZpbGVMb2FkZWQgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc291bmRzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX29uRXJyb3IgPSAoeGhyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSEFWRSBOT1QgTE9BREVEIFNPVU5EIE1BUktFUiBGSUxFOiBcIiArIHRoaXMuX3NvdW5kRmlsZVN0cmluZyArIFwiLmpzb24gc3RhdHVzPVwiICsgeGhyLnJlYWR5U3RhdGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hZGRNYXJrZXIgPSAoc291bmRfbWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRNYXJrZXJzW3NvdW5kX21hcmtlci5uYW1lXSA9IHNvdW5kX21hcmtlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyID0gKG1hcmtlcl9uYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNvdW5kTWFya2Vyc1ttYXJrZXJfbmFtZV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9zb3VuZEZpbGVTdHJpbmcgPSBzb3VuZF9maWxlO1xyXG4gICAgICAgIHRoaXMuX2xvYWRNYXJrZXJzKHNvdW5kX2ZpbGUgKyBcIi5qc29uXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IGNTb3VuZE1hbmFnZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY2xhc3MgU3Bhd25lciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBtb2JJZCkge1xyXG4gICAgICAgIHRoaXMubW9iID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZyA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lVG9TcGF3biA9IDA7XHJcbiAgICAgICAgdGhpcy54UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IHg7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSB5O1xyXG4gICAgICAgIHRoaXMubW9iID0gbW9iSWQ7XHJcbiAgICAgICAgdGhpcy50aW1lVG9TcGF3biA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3llZCgpIHtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2syKFt0aGlzLnhQb3NpdGlvbiwgdGhpcy55UG9zaXRpb25dKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBTcGF3bmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG4vL2NvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvblwiKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuY2xhc3MgVWkge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIHRoaXMuc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uXCIpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXJTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3RlclNlbGVjdFwiKTtcclxuICAgICAgICAgICAgY29uc3QgbWFwU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBTZWxlY3RcIik7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJTZWxlY3QgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChtYXBTZWxlY3QgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hhcmFjdGVyID0gY2hhcmFjdGVyU2VsZWN0LnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1hcCA9IG1hcFNlbGVjdC52YWx1ZTtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5zdGFydEdhbWUoc2VsZWN0ZWRDaGFyYWN0ZXIsIHNlbGVjdGVkTWFwKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzZWxlY3RlZENoYXJhY3Rlciwgc2VsZWN0ZWRNYXApXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0QnV0dG9uICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ1dHRvbi5yZW1vdmUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIChfYSA9IHRoaXMuc3RhcnRCdXR0b24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdGFydEdhbWUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwid2llbGtpIGNodWoxXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBVaSgpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=