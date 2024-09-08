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
        this.drawSpecialItems();
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
    drawSpecialItems() {
        var _a, _b, _c, _d, _e, _f;
        const startIndexes = Helpers_1.default.getStartIndexes();
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 11; j++) {
                if (((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[startIndexes.y * 2 + j * 2]) === null || _b === void 0 ? void 0 : _b[startIndexes.x * 2 + i * 2]) > 47 || ((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[startIndexes.y * 2 + j * 2]) === null || _d === void 0 ? void 0 : _d[startIndexes.x * 2 + i * 2]) < 39)
                    continue;
                this.ctx.drawImage(Images_1.default.assets.specialItems, ((((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[startIndexes.y * 2 + j * 2]) === null || _f === void 0 ? void 0 : _f[startIndexes.x * 2 + i * 2]) - 39) / 3) * 17, Game_1.default.gameMap.animationFrameIndex * 17, 16, 16, -this.renderedViewX % 80 + i * 80, -this.renderedViewY % 80 + j * 80, 16 * this.multiplier, 16 * this.multiplier);
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
                case Consts_1.blockCodes.fightPowerPotion: // lightblue elixir
                    this.drawIcon(14, 610, 160);
                    break;
                case Consts_1.blockCodes.magicPowerPotion: // green elixir
                    this.drawIcon(12, 121, 160);
                    break;
                case Consts_1.blockCodes.extraArmourPotion: // yellow elixir
                    this.drawIcon(10, 41, 160);
                    break;
                case Consts_1.blockCodes.extraCarryingAbilityPotion: // purple elixir
                    this.drawIcon(11, 81, 160);
                    break;
                case Consts_1.blockCodes.extraShotPower: // brown elixir
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
exports.Constants = exports.blockGroups = exports.blockCodes = void 0;
exports.blockCodes = {
    destructibleWalls: [1, 2, 3],
    indestructibleWalls: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    spawnersImages: [20, 21, 22, 23, 24, 25],
    exit: 26,
    glass: [27, 28],
    key: 29,
    medallion: 30,
    meat: 31,
    yellowBottle: 32,
    magicPotion: 33,
    fightPowerPotion: 34,
    magicPowerPotion: 35,
    extraArmourPotion: 36,
    extraCarryingAbilityPotion: 37,
    extraShotPower: 38,
    ghost: -80,
    grunt: -81,
    demon: -82,
    sorcerer: -83,
    lobber: -84,
    death: -85,
    spawners: [70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81],
    boxes: [39, 40, 41],
    portals: [42, 43, 44],
    passages: [45, 46, 47]
};
exports.blockGroups = {
    monsters: [
        exports.blockCodes.ghost,
        exports.blockCodes.grunt,
        exports.blockCodes.death,
        exports.blockCodes.demon,
        exports.blockCodes.lobber,
        exports.blockCodes.sorcerer
    ],
    walls: [
        ...exports.blockCodes.destructibleWalls, ...exports.blockCodes.indestructibleWalls
    ],
    noTransition: [
        ...exports.blockCodes.destructibleWalls, ...exports.blockCodes.indestructibleWalls, ...exports.blockCodes.glass, ...exports.blockCodes.spawners,
    ],
    noTransitionForProjectile: [
        ...exports.blockCodes.destructibleWalls,
        ...exports.blockCodes.indestructibleWalls,
        ...exports.blockCodes.spawnersImages,
        ...exports.blockCodes.boxes,
        ...exports.blockCodes.glass,
        exports.blockCodes.key,
        exports.blockCodes.meat,
        exports.blockCodes.medallion
    ],
    pickableItems: [
        ...exports.blockCodes.boxes,
        ...exports.blockCodes.glass,
        exports.blockCodes.key,
        exports.blockCodes.yellowBottle,
        exports.blockCodes.meat,
        exports.blockCodes.medallion,
        exports.blockCodes.magicPotion,
        exports.blockCodes.fightPowerPotion,
        exports.blockCodes.magicPowerPotion,
        exports.blockCodes.extraArmourPotion,
        exports.blockCodes.extraCarryingAbilityPotion,
        exports.blockCodes.extraShotPower
    ],
    destroyableThings: [
        ...exports.blockCodes.destructibleWalls,
        ...exports.blockCodes.spawnersImages,
        exports.blockCodes.yellowBottle,
        exports.blockCodes.magicPotion,
        exports.blockCodes.fightPowerPotion,
        exports.blockCodes.magicPowerPotion,
        exports.blockCodes.extraArmourPotion,
        exports.blockCodes.extraCarryingAbilityPotion,
        exports.blockCodes.extraShotPower,
    ],
    destroyableThingsByHand: [
        ...exports.blockCodes.spawnersImages, exports.blockCodes.grunt, exports.blockCodes.demon, exports.blockCodes.sorcerer, exports.blockCodes.lobber,
    ],
    destroyableByDemons: [
        exports.blockCodes.magicPotion,
        exports.blockCodes.fightPowerPotion,
        exports.blockCodes.magicPowerPotion,
        exports.blockCodes.extraArmourPotion,
        exports.blockCodes.extraCarryingAbilityPotion,
        exports.blockCodes.extraShotPower,
        exports.blockCodes.yellowBottle
    ],
};
exports.Constants = {
    multiplier: 5,
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
const Consts_1 = __webpack_require__(/*! ./Consts */ "./src/Consts.ts");
class GameMap {
    constructor() {
        this.map = [[]];
        this.levelNumber = 0;
        this.numberOfXBlocks = 0;
        this.numberOfYBlocks = 0;
        this.xSizeInPixels = 0;
        this.ySizeInPixels = 0;
        this.universalFrameIndex = 0;
        this.animationFrameIndex = 0;
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
        this.passages = [];
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
            this.portals = loadedData.portalsCoords;
            this.passages = loadedData.passagesCoords;
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
                else if (Consts_1.blockCodes.spawners.includes(cell)) {
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
            if (this.universalFrameIndex == 0)
                this.animationFrameIndex = 1;
            if (this.universalFrameIndex == 1)
                this.animationFrameIndex = 2;
            if (this.universalFrameIndex == 2)
                this.animationFrameIndex = 1;
            if (this.universalFrameIndex == 3)
                this.animationFrameIndex = 0;
            this.universalFrameIndex++;
            if (this.universalFrameIndex == 4)
                this.universalFrameIndex = 0;
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
                if (monster instanceof Death_1.default) {
                    monster.healthSuckedOutOfPlayer++;
                    console.log("health sucked", monster.healthSuckedOutOfPlayer);
                    if (monster.healthSuckedOutOfPlayer >= 170) {
                        monster.die(false);
                        return false;
                    }
                }
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
                //ghosts
                break;
            case 70:
            case 71:
            case 72:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 1));
                returnItemIndex -= 47;
                //grunts
                break;
            case 73:
            case 74:
            case 75:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 2));
                returnItemIndex -= 50;
                //demons
                break;
            case 76:
            case 77:
            case 78:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 3));
                returnItemIndex -= 53;
                //sorcerer
                break;
            case 79:
            case 80:
            case 81:
                this.arrayOfSpawners.push(new Spawner_1.default(x * 2, y * 2, 4));
                returnItemIndex -= 56;
                //lobber
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
        if (Consts_1.blockCodes.glass.includes(Game_1.default.gameMap.map[y][x])) {
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
        this.portals.forEach((portal, index) => {
            if (portal[0] != MainCharacter_1.default.coordsArrayIndexes[0] / 2 ||
                portal[1] != MainCharacter_1.default.coordsArrayIndexes[1] / 2)
                return;
            let res = this.findPlaceToTeleport([portal[2] * 2, portal[3] * 2]);
            if (res === null)
                return;
            MainCharacter_1.default.coordsArrayIndexes = [res[0], res[1]];
            Game_1.default.gameMap.setBlock2(MainCharacter_1.default.coordsArrayIndexes, 0);
            MainCharacter_1.default.xCoord = res[0] / 2 * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.yCoord = res[1] / 2 * 16 * Canvas_1.default.multiplier;
            Game_1.default.gameMap.setBlock2(MainCharacter_1.default.coordsArrayIndexes, -1);
            MainCharacter_1.default.moveMap();
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
    disappearWalls() {
        this.passages.forEach((passage, index) => {
            if (passage[0] != MainCharacter_1.default.coordsArrayIndexes[0] / 2 ||
                passage[1] != MainCharacter_1.default.coordsArrayIndexes[1] / 2)
                return;
            passage[2].forEach((blockCoords, index) => {
                Game_1.default.gameMap.setBlock(blockCoords, 0);
            });
        });
        this.fixWalls();
    }
    fixWalls() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107;
        for (let i = 0; i < this.numberOfYBlocks * 2; i = i + 2) {
            for (let j = 0; j < this.numberOfXBlocks * 2; j = j + 2) {
                if (((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[j]) === null || _b === void 0 ? void 0 : _b[i]) >= 4 && ((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[j]) === null || _d === void 0 ? void 0 : _d[i]) <= 19) {
                    if (!Consts_1.blockCodes.indestructibleWalls.includes((_f = (_e = this.map) === null || _e === void 0 ? void 0 : _e[j - 2]) === null || _f === void 0 ? void 0 : _f[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_h = (_g = this.map) === null || _g === void 0 ? void 0 : _g[j + 2]) === null || _h === void 0 ? void 0 : _h[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_k = (_j = this.map) === null || _j === void 0 ? void 0 : _j[j]) === null || _k === void 0 ? void 0 : _k[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_m = (_l = this.map) === null || _l === void 0 ? void 0 : _l[j]) === null || _m === void 0 ? void 0 : _m[i + 2]) && this.map[j][i] !== 4) {
                        this.setBlock2([i, j], 4);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_p = (_o = this.map) === null || _o === void 0 ? void 0 : _o[j - 2]) === null || _p === void 0 ? void 0 : _p[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_r = (_q = this.map) === null || _q === void 0 ? void 0 : _q[j + 2]) === null || _r === void 0 ? void 0 : _r[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_t = (_s = this.map) === null || _s === void 0 ? void 0 : _s[j]) === null || _t === void 0 ? void 0 : _t[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_v = (_u = this.map) === null || _u === void 0 ? void 0 : _u[j]) === null || _v === void 0 ? void 0 : _v[i + 2]) && this.map[j][i] !== 5) {
                        this.setBlock2([i, j], 5);
                    }
                    else if (!Consts_1.blockCodes.indestructibleWalls.includes((_x = (_w = this.map) === null || _w === void 0 ? void 0 : _w[j - 2]) === null || _x === void 0 ? void 0 : _x[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_z = (_y = this.map) === null || _y === void 0 ? void 0 : _y[j + 2]) === null || _z === void 0 ? void 0 : _z[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_1 = (_0 = this.map) === null || _0 === void 0 ? void 0 : _0[j]) === null || _1 === void 0 ? void 0 : _1[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_3 = (_2 = this.map) === null || _2 === void 0 ? void 0 : _2[j]) === null || _3 === void 0 ? void 0 : _3[i + 2]) && this.map[j][i] !== 6) {
                        this.setBlock2([i, j], 6);
                    }
                    else if (!Consts_1.blockCodes.indestructibleWalls.includes((_5 = (_4 = this.map) === null || _4 === void 0 ? void 0 : _4[j - 2]) === null || _5 === void 0 ? void 0 : _5[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_7 = (_6 = this.map) === null || _6 === void 0 ? void 0 : _6[j + 2]) === null || _7 === void 0 ? void 0 : _7[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_9 = (_8 = this.map) === null || _8 === void 0 ? void 0 : _8[j]) === null || _9 === void 0 ? void 0 : _9[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_11 = (_10 = this.map) === null || _10 === void 0 ? void 0 : _10[j]) === null || _11 === void 0 ? void 0 : _11[i + 2]) && this.map[j][i] !== 7) {
                        this.setBlock2([i, j], 7);
                    }
                    else if (!Consts_1.blockCodes.indestructibleWalls.includes((_13 = (_12 = this.map) === null || _12 === void 0 ? void 0 : _12[j - 2]) === null || _13 === void 0 ? void 0 : _13[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_15 = (_14 = this.map) === null || _14 === void 0 ? void 0 : _14[j + 2]) === null || _15 === void 0 ? void 0 : _15[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_17 = (_16 = this.map) === null || _16 === void 0 ? void 0 : _16[j]) === null || _17 === void 0 ? void 0 : _17[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_19 = (_18 = this.map) === null || _18 === void 0 ? void 0 : _18[j]) === null || _19 === void 0 ? void 0 : _19[i + 2]) && this.map[j][i] !== 8) {
                        this.setBlock2([i, j], 8);
                    }
                    else if (!Consts_1.blockCodes.indestructibleWalls.includes((_21 = (_20 = this.map) === null || _20 === void 0 ? void 0 : _20[j - 2]) === null || _21 === void 0 ? void 0 : _21[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_23 = (_22 = this.map) === null || _22 === void 0 ? void 0 : _22[j + 2]) === null || _23 === void 0 ? void 0 : _23[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_25 = (_24 = this.map) === null || _24 === void 0 ? void 0 : _24[j]) === null || _25 === void 0 ? void 0 : _25[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_27 = (_26 = this.map) === null || _26 === void 0 ? void 0 : _26[j]) === null || _27 === void 0 ? void 0 : _27[i + 2]) && this.map[j][i] !== 9) {
                        this.setBlock2([i, j], 9);
                    }
                    else if (!Consts_1.blockCodes.indestructibleWalls.includes((_29 = (_28 = this.map) === null || _28 === void 0 ? void 0 : _28[j - 2]) === null || _29 === void 0 ? void 0 : _29[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_31 = (_30 = this.map) === null || _30 === void 0 ? void 0 : _30[j + 2]) === null || _31 === void 0 ? void 0 : _31[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_33 = (_32 = this.map) === null || _32 === void 0 ? void 0 : _32[j]) === null || _33 === void 0 ? void 0 : _33[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_35 = (_34 = this.map) === null || _34 === void 0 ? void 0 : _34[j]) === null || _35 === void 0 ? void 0 : _35[i + 2]) && this.map[j][i] !== 10) {
                        this.setBlock2([i, j], 10);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_37 = (_36 = this.map) === null || _36 === void 0 ? void 0 : _36[j - 2]) === null || _37 === void 0 ? void 0 : _37[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_39 = (_38 = this.map) === null || _38 === void 0 ? void 0 : _38[j + 2]) === null || _39 === void 0 ? void 0 : _39[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_41 = (_40 = this.map) === null || _40 === void 0 ? void 0 : _40[j]) === null || _41 === void 0 ? void 0 : _41[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_43 = (_42 = this.map) === null || _42 === void 0 ? void 0 : _42[j]) === null || _43 === void 0 ? void 0 : _43[i + 2]) && this.map[j][i] !== 11) {
                        this.setBlock2([i, j], 11);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_45 = (_44 = this.map) === null || _44 === void 0 ? void 0 : _44[j - 2]) === null || _45 === void 0 ? void 0 : _45[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_47 = (_46 = this.map) === null || _46 === void 0 ? void 0 : _46[j + 2]) === null || _47 === void 0 ? void 0 : _47[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_49 = (_48 = this.map) === null || _48 === void 0 ? void 0 : _48[j]) === null || _49 === void 0 ? void 0 : _49[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_51 = (_50 = this.map) === null || _50 === void 0 ? void 0 : _50[j]) === null || _51 === void 0 ? void 0 : _51[i + 2]) && this.map[j][i] !== 12) {
                        this.setBlock2([i, j], 12);
                    }
                    else if (!Consts_1.blockCodes.indestructibleWalls.includes((_53 = (_52 = this.map) === null || _52 === void 0 ? void 0 : _52[j - 2]) === null || _53 === void 0 ? void 0 : _53[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_55 = (_54 = this.map) === null || _54 === void 0 ? void 0 : _54[j + 2]) === null || _55 === void 0 ? void 0 : _55[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_57 = (_56 = this.map) === null || _56 === void 0 ? void 0 : _56[j]) === null || _57 === void 0 ? void 0 : _57[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_59 = (_58 = this.map) === null || _58 === void 0 ? void 0 : _58[j]) === null || _59 === void 0 ? void 0 : _59[i + 2]) && this.map[j][i] !== 13) {
                        this.setBlock2([i, j], 13);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_61 = (_60 = this.map) === null || _60 === void 0 ? void 0 : _60[j - 2]) === null || _61 === void 0 ? void 0 : _61[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_63 = (_62 = this.map) === null || _62 === void 0 ? void 0 : _62[j + 2]) === null || _63 === void 0 ? void 0 : _63[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_65 = (_64 = this.map) === null || _64 === void 0 ? void 0 : _64[j]) === null || _65 === void 0 ? void 0 : _65[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_67 = (_66 = this.map) === null || _66 === void 0 ? void 0 : _66[j]) === null || _67 === void 0 ? void 0 : _67[i + 2]) && this.map[j][i] !== 14) {
                        this.setBlock2([i, j], 14);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_69 = (_68 = this.map) === null || _68 === void 0 ? void 0 : _68[j - 2]) === null || _69 === void 0 ? void 0 : _69[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_71 = (_70 = this.map) === null || _70 === void 0 ? void 0 : _70[j + 2]) === null || _71 === void 0 ? void 0 : _71[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_73 = (_72 = this.map) === null || _72 === void 0 ? void 0 : _72[j]) === null || _73 === void 0 ? void 0 : _73[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_75 = (_74 = this.map) === null || _74 === void 0 ? void 0 : _74[j]) === null || _75 === void 0 ? void 0 : _75[i + 2]) && this.map[j][i] !== 15) {
                        this.setBlock2([i, j], 15);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_77 = (_76 = this.map) === null || _76 === void 0 ? void 0 : _76[j - 2]) === null || _77 === void 0 ? void 0 : _77[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_79 = (_78 = this.map) === null || _78 === void 0 ? void 0 : _78[j + 2]) === null || _79 === void 0 ? void 0 : _79[i]) && !Consts_1.blockCodes.indestructibleWalls.includes((_81 = (_80 = this.map) === null || _80 === void 0 ? void 0 : _80[j]) === null || _81 === void 0 ? void 0 : _81[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_83 = (_82 = this.map) === null || _82 === void 0 ? void 0 : _82[j]) === null || _83 === void 0 ? void 0 : _83[i + 2]) && this.map[j][i] !== 16) {
                        this.setBlock2([i, j], 16);
                    }
                    else if (!Consts_1.blockCodes.indestructibleWalls.includes((_85 = (_84 = this.map) === null || _84 === void 0 ? void 0 : _84[j - 2]) === null || _85 === void 0 ? void 0 : _85[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_87 = (_86 = this.map) === null || _86 === void 0 ? void 0 : _86[j + 2]) === null || _87 === void 0 ? void 0 : _87[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_89 = (_88 = this.map) === null || _88 === void 0 ? void 0 : _88[j]) === null || _89 === void 0 ? void 0 : _89[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_91 = (_90 = this.map) === null || _90 === void 0 ? void 0 : _90[j]) === null || _91 === void 0 ? void 0 : _91[i + 2]) && this.map[j][i] !== 17) {
                        this.setBlock2([i, j], 17);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_93 = (_92 = this.map) === null || _92 === void 0 ? void 0 : _92[j - 2]) === null || _93 === void 0 ? void 0 : _93[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_95 = (_94 = this.map) === null || _94 === void 0 ? void 0 : _94[j + 2]) === null || _95 === void 0 ? void 0 : _95[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_97 = (_96 = this.map) === null || _96 === void 0 ? void 0 : _96[j]) === null || _97 === void 0 ? void 0 : _97[i - 2]) && !Consts_1.blockCodes.indestructibleWalls.includes((_99 = (_98 = this.map) === null || _98 === void 0 ? void 0 : _98[j]) === null || _99 === void 0 ? void 0 : _99[i + 2]) && this.map[j][i] !== 18) {
                        this.setBlock2([i, j], 18);
                    }
                    else if (Consts_1.blockCodes.indestructibleWalls.includes((_101 = (_100 = this.map) === null || _100 === void 0 ? void 0 : _100[j - 2]) === null || _101 === void 0 ? void 0 : _101[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_103 = (_102 = this.map) === null || _102 === void 0 ? void 0 : _102[j + 2]) === null || _103 === void 0 ? void 0 : _103[i]) && Consts_1.blockCodes.indestructibleWalls.includes((_105 = (_104 = this.map) === null || _104 === void 0 ? void 0 : _104[j]) === null || _105 === void 0 ? void 0 : _105[i - 2]) && Consts_1.blockCodes.indestructibleWalls.includes((_107 = (_106 = this.map) === null || _106 === void 0 ? void 0 : _106[j]) === null || _107 === void 0 ? void 0 : _107[i + 2]) && this.map[j][i] !== 19) {
                        this.setBlock2([i, j], 19);
                    }
                }
            }
        }
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
            const [abilityTexts, bigNumbers, items, specialItems, levelTitleScreen, mainCharacters, monsters, numbers, pickUpAbilityScreen, startScreen, walls, wallsOrigin, weapons] = yield Promise.all([
                this.imageLoader("abilityTexts.png"),
                this.imageLoader("bigNumbers.png"),
                this.imageLoader("items.png"),
                this.imageLoader("specialItems.png"),
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
                specialItems,
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
        if (Consts_1.blockGroups.noTransitionForProjectile.includes((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[ProjectileCoords[1] * 2]) === null || _b === void 0 ? void 0 : _b[ProjectileCoords[0] * 2]))
            this.weapon.thrown = false;
        let invisibleSorcererHit = false;
        if (Consts_1.blockGroups.monsters.includes((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[ProjectileCoords[1] * 2]) === null || _d === void 0 ? void 0 : _d[ProjectileCoords[0] * 2])) {
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
        if (Consts_1.blockGroups.destroyableThings.includes((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[ProjectileCoords[1] * 2]) === null || _f === void 0 ? void 0 : _f[ProjectileCoords[0] * 2])) {
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
                if (Game_1.default.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]] === Consts_1.blockCodes.exit) {
                    Game_1.default.gameMap.endOfLevel();
                }
                else if (Consts_1.blockCodes.portals.includes(Game_1.default.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]])) {
                    Game_1.default.gameMap.teleport();
                }
                else if (Consts_1.blockCodes.passages.includes(Game_1.default.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]])) {
                    Game_1.default.gameMap.disappearWalls();
                    Game_1.default.gameMap.setBlock2(this.coordsArrayIndexes, -1);
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
        if (Consts_1.blockGroups.pickableItems.includes(itemIndex))
            this.pickItem(itemIndex, Coords);
    }
    isFieldClear(y, x) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        if ((((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[y * 2]) === null || _b === void 0 ? void 0 : _b[x * 2]) < 26 && ((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[y * 2]) === null || _d === void 0 ? void 0 : _d[x * 2]) != 0) ||
            (((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[y * 2 + 1]) === null || _f === void 0 ? void 0 : _f[x * 2]) < 26 && ((_h = (_g = Game_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[y * 2 + 1]) === null || _h === void 0 ? void 0 : _h[x * 2]) != 0) ||
            (((_k = (_j = Game_1.default.gameMap.map) === null || _j === void 0 ? void 0 : _j[y * 2]) === null || _k === void 0 ? void 0 : _k[x * 2 + 1]) < 26 && ((_m = (_l = Game_1.default.gameMap.map) === null || _l === void 0 ? void 0 : _l[y * 2]) === null || _m === void 0 ? void 0 : _m[x * 2 + 1]) != 0) ||
            (((_p = (_o = Game_1.default.gameMap.map) === null || _o === void 0 ? void 0 : _o[y * 2 + 1]) === null || _p === void 0 ? void 0 : _p[x * 2 + 1]) < 26 && ((_r = (_q = Game_1.default.gameMap.map) === null || _q === void 0 ? void 0 : _q[y * 2 + 1]) === null || _r === void 0 ? void 0 : _r[x * 2 + 1]) != 0))
            return false;
        if ((Consts_1.blockCodes.glass.includes((_t = (_s = Game_1.default.gameMap.map) === null || _s === void 0 ? void 0 : _s[y * 2]) === null || _t === void 0 ? void 0 : _t[x * 2])) &&
            (Consts_1.blockCodes.glass.includes((_v = (_u = Game_1.default.gameMap.map) === null || _u === void 0 ? void 0 : _u[y * 2 + 1]) === null || _v === void 0 ? void 0 : _v[x * 2])) &&
            (Consts_1.blockCodes.glass.includes((_x = (_w = Game_1.default.gameMap.map) === null || _w === void 0 ? void 0 : _w[y * 2]) === null || _x === void 0 ? void 0 : _x[x * 2 + 1])) &&
            (Consts_1.blockCodes.glass.includes((_z = (_y = Game_1.default.gameMap.map) === null || _y === void 0 ? void 0 : _y[y * 2 + 1]) === null || _z === void 0 ? void 0 : _z[x * 2 + 1])) &&
            this.keys == 0)
            return false;
        if ((Consts_1.blockCodes.glass.includes((_1 = (_0 = Game_1.default.gameMap.map) === null || _0 === void 0 ? void 0 : _0[y * 2]) === null || _1 === void 0 ? void 0 : _1[x * 2])) &&
            (Consts_1.blockCodes.glass.includes((_3 = (_2 = Game_1.default.gameMap.map) === null || _2 === void 0 ? void 0 : _2[y * 2 + 1]) === null || _3 === void 0 ? void 0 : _3[x * 2])) &&
            (Consts_1.blockCodes.glass.includes((_5 = (_4 = Game_1.default.gameMap.map) === null || _4 === void 0 ? void 0 : _4[y * 2]) === null || _5 === void 0 ? void 0 : _5[x * 2 + 1])) &&
            (Consts_1.blockCodes.glass.includes((_7 = (_6 = Game_1.default.gameMap.map) === null || _6 === void 0 ? void 0 : _6[y * 2 + 1]) === null || _7 === void 0 ? void 0 : _7[x * 2 + 1])) &&
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
            case 1: //destructible wall 1
                Game_1.default.gameMap.setBlock(coords, 2);
                break;
            case 2: //destructible wall 2
                Game_1.default.gameMap.setBlock(coords, 3);
                break;
            case 3: //destructible wall 3
                Game_1.default.gameMap.clearBlock(coords);
                break;
            case 20: //small ghost spawner
            case 21:
                Game_1.default.gameMap.clearBlock(coords);
                Game_1.default.gameMap.deleteSpawner(coords);
                if (addScore)
                    this.changeScore(10);
                break;
            case 22: //big ghost spawner
                Game_1.default.gameMap.setBlock(coords, 20);
                if (addScore)
                    this.changeScore(10);
                break;
            case 23: //small triple spawner
                Game_1.default.gameMap.setBlock(coords, 25);
                if (addScore)
                    this.changeScore(10);
                break;
            case 24: //big triple spawner
            case 25:
                Game_1.default.gameMap.clearBlock(coords);
                Game_1.default.gameMap.deleteSpawner(coords);
                if (addScore)
                    this.changeScore(10);
                break;
            case 32:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
                Game_1.default.gameMap.clearBlock(coords);
                break;
            case 33:
                Game_1.default.gameMap.clearBlock(coords);
                Game_1.default.gameMap.clearMapFromMonstersAndSpawners(false);
                break;
        }
    }
    pickItem(itemIndex, coords) {
        switch (itemIndex) {
            case 39: //box - treasure
            case 40: //box - treasure
            case 41: //box - treasure
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case Consts_1.blockCodes.key: // key
                this.keys++;
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedKey");
                break;
            case Consts_1.blockCodes.yellowBottle: //yellow bottle - cider
                this.changeHealth(100);
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case Consts_1.blockCodes.meat: //food
                this.changeScore(100);
                this.changeHealth(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case Consts_1.blockCodes.medallion: //amulet
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case Consts_1.blockCodes.magicPotion: // blue elixir
                this.potions++;
                this.changeScore(100);
                SoundsHandler_1.default.play("pickedItem");
                break;
            case Consts_1.blockCodes.fightPowerPotion: // lightblue elixir = fight power
            case Consts_1.blockCodes.magicPowerPotion: // green elixir     = magic power
            case Consts_1.blockCodes.extraArmourPotion: // yellow elixir    = extra armor
            case Consts_1.blockCodes.extraCarryingAbilityPotion: // purple elixir    = carrying ability
            case Consts_1.blockCodes.extraShotPower: // brown elixir     = shot power
                if (!this.ownedAbilities.includes(itemIndex))
                    this.ownedAbilities.push(itemIndex);
                Game_1.default.gameMap.pickingUpAbility(itemIndex - 34);
                break;
            case 27:
            case 28:
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
        this.healthSuckedOutOfPlayer = 0;
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
        if (Consts_1.blockGroups.noTransitionForProjectile.includes((_b = (_a = Game_1.default.gameMap.map) === null || _a === void 0 ? void 0 : _a[fireballCoordsArray[1] * 2]) === null || _b === void 0 ? void 0 : _b[fireballCoordsArray[0] * 2]))
            this.fireballThrew = false;
        if (Consts_1.blockGroups.monsters.includes((_d = (_c = Game_1.default.gameMap.map) === null || _c === void 0 ? void 0 : _c[fireballCoordsArray[1] * 2]) === null || _d === void 0 ? void 0 : _d[fireballCoordsArray[0] * 2])) {
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
        if (Consts_1.blockGroups.destroyableByDemons.includes((_f = (_e = Game_1.default.gameMap.map) === null || _e === void 0 ? void 0 : _e[fireballCoordsArray[1] * 2]) === null || _f === void 0 ? void 0 : _f[fireballCoordsArray[0] * 2])) {
            MainCharacter_1.default.destroyThing(fireballCoordsArray, false);
            this.fireballThrew = false;
        }
        if (((_h = (_g = Game_1.default.gameMap.map) === null || _g === void 0 ? void 0 : _g[fireballCoordsArray[1] * 2]) === null || _h === void 0 ? void 0 : _h[fireballCoordsArray[0] * 2]) === -1) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELFFBQVE7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGlEQUFpRDtBQUN6RztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNqa0JGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0NBQWtDLG1CQUFPLENBQUMsNENBQVc7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDWkY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUIsbUJBQU8sQ0FBQywwQ0FBZTtBQUM1QyxrQ0FBa0MsbUJBQU8sQ0FBQyw0Q0FBVztBQUNyRCxpQ0FBaUMsbUJBQU8sQ0FBQyxrQ0FBVztBQUNwRCxpQ0FBaUMsbUJBQU8sQ0FBQyxrQ0FBVztBQUNwRCxpQkFBaUIsbUJBQU8sQ0FBQyxrQ0FBVztBQUNwQyx3Q0FBd0MsbUJBQU8sQ0FBQyxnREFBa0I7QUFDbEUsK0JBQStCLG1CQUFPLENBQUMsOEJBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDdkpGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0NBQWtDLG1CQUFPLENBQUMsNENBQVc7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ1hGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0NBQWtDLG1CQUFPLENBQUMsNENBQVc7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ1hGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0NBQWtDLG1CQUFPLENBQUMsNENBQVc7QUFDckQ7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNyQkY7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3Q0FBd0MsbUJBQU8sQ0FBQyxnREFBa0I7QUFDbEUscUJBQXFCLG1CQUFPLENBQUMsMENBQWU7QUFDNUMsK0JBQStCLG1CQUFPLENBQUMsOEJBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDcEVGO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0NBQWtDLG1CQUFPLENBQUMsNENBQVc7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNiRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlDQUFpQyxtQkFBTyxDQUFDLGlDQUFVO0FBQ25ELGlCQUFpQixtQkFBTyxDQUFDLGlDQUFVO0FBQ25DLGlDQUFpQyxtQkFBTyxDQUFDLGlDQUFVO0FBQ25ELHdDQUF3QyxtQkFBTyxDQUFDLCtDQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUM5QkY7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ3BJRjtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELCtCQUErQixtQkFBTyxDQUFDLDZCQUFRO0FBQy9DLHdDQUF3QyxtQkFBTyxDQUFDLCtDQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDeEJGO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlDQUFpQyxtQkFBTyxDQUFDLGlDQUFVO0FBQ25ELGlDQUFpQyxtQkFBTyxDQUFDLGlDQUFVO0FBQ25ELHdDQUF3QyxtQkFBTyxDQUFDLCtDQUFpQjtBQUNqRSwrQkFBK0IsbUJBQU8sQ0FBQyw2QkFBUTtBQUMvQyx5Q0FBeUMsbUJBQU8sQ0FBQyxpREFBa0I7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7O1VDckRmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9DYW52YXMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvQ29uc3RzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvR2FtZU1hcC50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9IZWxwZXJzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0ltYWdlcy50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9JbnRlcmZhY2VzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0tleWJvYXJkRXZlbnRzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01haW5DaGFyYWN0ZXIudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTW9uc3RlcnMvRGVhdGgudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTW9uc3RlcnMvRGVtb24udHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTW9uc3RlcnMvR2hvc3QudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTW9uc3RlcnMvR3J1bnQudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTW9uc3RlcnMvTG9iYmVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL01vbnN0ZXJzL01vbnN0ZXIudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTW9uc3RlcnMvU29yY2VyZXIudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvUHJvamVjdGlsZS50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Tb3VuZHNIYW5kbGVyLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL1NwYXduZXIudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9nYXVudGxldC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgSW1hZ2VzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSW1hZ2VzXCIpKTtcclxuY29uc3QgSGVscGVyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0hlbHBlcnNcIikpO1xyXG5jb25zdCBTb3JjZXJlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJzL1NvcmNlcmVyXCIpKTtcclxuY29uc3QgRGVtb25fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9EZW1vblwiKSk7XHJcbmNvbnN0IENvbnN0c18xID0gcmVxdWlyZShcIi4vQ29uc3RzXCIpO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZVwiKSk7XHJcbmNsYXNzIENhbnZhcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gMTI4NTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IDk2MDtcclxuICAgICAgICB0aGlzLm11bHRpcGxpZXIgPSA1O1xyXG4gICAgICAgIHRoaXMucmVuZGVyZWRWaWV3WCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlZFZpZXdZID0gMDtcclxuICAgICAgICB0aGlzLnJhZiA9IDA7XHJcbiAgICAgICAgdGhpcy5lbmRpbmdGcmFtZSA9IDA7XHJcbiAgICAgICAgdGhpcy5vbGRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm5ld1RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmZwcyA9IDA7XHJcbiAgICAgICAgdGhpcy5jYW52YXNUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzVGFnLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmNhbnZhc1RhZy53aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICAgICAgdGhpcy5jYW52YXNUYWcuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkcmF3U3RhcnRTY3JlZW4oKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLnN0YXJ0U2NyZWVuLCAwLCAwLCAzMjAsIDIwMCwgMCwgMCwgMTI4NSwgOTYwKTtcclxuICAgIH1cclxuICAgIGRyYXdMZXZlbFRpdGxlU2NyZWVuKGxldmVsTnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIDEyODUsIDk2MCk7XHJcbiAgICAgICAgY29uc3QgbGV2ZWxMZW5ndGggPSBsZXZlbE51bWJlci50b1N0cmluZygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgbGV2ZWxEaWdpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMgLSBsZXZlbExlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBsZXZlbERpZ2l0cy5wdXNoKDApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGV2ZWxMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgbGV2ZWxEaWdpdHMucHVzaChwYXJzZUludChsZXZlbE51bWJlci50b1N0cmluZygpLmNoYXJBdChpKSkpO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5iaWdOdW1iZXJzLCAxNzEsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDE3LCA5NSwgMTYsIDMyMCwgMzcwLCA5NSAqICh0aGlzLm11bHRpcGxpZXIgLSAxKSwgMTYgKiAodGhpcy5tdWx0aXBsaWVyIC0gMSkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5iaWdOdW1iZXJzLCBsZXZlbERpZ2l0c1tpXSAqIDE3LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiAxNywgMTYsIDE2LCA3NDAgKyAxNiAqIHRoaXMubXVsdGlwbGllciAqIGksIDM3MCwgMTYgKiAodGhpcy5tdWx0aXBsaWVyIC0gMSksIDE2ICogKHRoaXMubXVsdGlwbGllciAtIDEpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXJHYW1lRnJhbWUoKSB7XHJcbiAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc3RvcEdhbWUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm9sZFRpbWUgPSB0aGlzLm5ld1RpbWU7XHJcbiAgICAgICAgdGhpcy5uZXdUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9ICh0aGlzLm5ld1RpbWUgLSB0aGlzLm9sZFRpbWUpO1xyXG4gICAgICAgIC8vZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyM3YTdhN2EnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIDI1NyAqIHRoaXMubXVsdGlwbGllciwgMTUyICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB0aGlzLmRyYXdXYWxscygpO1xyXG4gICAgICAgIHRoaXMuZHJhd0l0ZW1zKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3U3BlY2lhbEl0ZW1zKCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tb3ZlTW9uc3RlcnMoKTtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5hbmltYXRlQ2hhcmFjdGVyKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3Q2hhcmFjdGVyKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3TW9uc3RlcnMoKTtcclxuICAgICAgICAvLyBib3R0b20gYmFyXHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLmJvdHRvbUJhciwgMCwgMCwgMjU3LCA0MCwgMCAqIHRoaXMubXVsdGlwbGllciwgMTUyICogdGhpcy5tdWx0aXBsaWVyLCAyNTcgKiB0aGlzLm11bHRpcGxpZXIsIDQwICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB0aGlzLmRyYXdTY29yZUFuZEhlYWx0aCgpO1xyXG4gICAgICAgIC8vIGZwcyBpbiB0aGUgY29ybmVyXHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgoMS4wIC8gKHRoaXMuZGVsdGFUaW1lIC8gMTAwMCkpLnRvRml4ZWQoMCkudG9TdHJpbmcoKSwgMCwgNzg2KTtcclxuICAgICAgICB0aGlzLnJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5yZW5kZXJHYW1lRnJhbWUoKSk7XHJcbiAgICB9XHJcbiAgICBkcmF3V2FsbHMoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXhlcyA9IEhlbHBlcnNfMS5kZWZhdWx0LmdldFN0YXJ0SW5kZXhlcygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTc7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtzdGFydEluZGV4ZXMueSAqIDIgKyBqICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYltzdGFydEluZGV4ZXMueCAqIDIgKyBpICogMl0pID4gMTkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMud2FsbHMsICgoKF9kID0gKF9jID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1tzdGFydEluZGV4ZXMueSAqIDIgKyBqICogMl0pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZFtzdGFydEluZGV4ZXMueCAqIDIgKyBpICogMl0pICogMTcpIC0gMTcsIDAsIDE2LCAxNiwgLXRoaXMucmVuZGVyZWRWaWV3WCAlIDgwICsgaSAqIDgwLCAtdGhpcy5yZW5kZXJlZFZpZXdZICUgODAgKyBqICogODAsIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3SXRlbXMoKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE3OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuaXRlbXMsICgoKChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Fbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Jbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSAtIDE5KSAqIDE3KSAtIDE3LCAwLCAxNiwgMTYsIC10aGlzLnJlbmRlcmVkVmlld1ggJSA4MCArIGkgKiA4MCwgLXRoaXMucmVuZGVyZWRWaWV3WSAlIDgwICsgaiAqIDgwLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd1NwZWNpYWxJdGVtcygpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE3OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Fbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Jbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSA+IDQ3IHx8ICgoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSkgPCAzOSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5zcGVjaWFsSXRlbXMsICgoKChfZiA9IChfZSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Vbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Zbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSAtIDM5KSAvIDMpICogMTcsIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYW5pbWF0aW9uRnJhbWVJbmRleCAqIDE3LCAxNiwgMTYsIC10aGlzLnJlbmRlcmVkVmlld1ggJSA4MCArIGkgKiA4MCwgLXRoaXMucmVuZGVyZWRWaWV3WSAlIDgwICsgaiAqIDgwLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHJhd0NoYXJhY3RlcigpIHtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubWFpbkNoYXJhY3RlcnMsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0Lmxhc3REaXJlY3Rpb25bMF0gKiAxNyArIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDEzNiwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQubGFzdERpcmVjdGlvblsxXSAqIDE3LCAxNiwgMTYsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCAtIHRoaXMucmVuZGVyZWRWaWV3WCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdZLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LndlYXBvbi5kcmF3KHsgeDogdGhpcy5yZW5kZXJlZFZpZXdYLCB5OiB0aGlzLnJlbmRlcmVkVmlld1kgfSk7XHJcbiAgICB9XHJcbiAgICBkcmF3TW9uc3RlcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuZ2V0Q29vcmRpbmF0ZXMoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQpO1xyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZk1vbnN0ZXJzLmZvckVhY2goKG1vbnN0ZXIpID0+IHtcclxuICAgICAgICAgICAgbW9uc3Rlci5sb29rQXRNZShwbGF5ZXJDb29yZHNbMF0gKiAyLCBwbGF5ZXJDb29yZHNbMV0gKiAyKTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIgaW5zdGFuY2VvZiBTb3JjZXJlcl8xLmRlZmF1bHQgJiYgbW9uc3Rlci5pc1Zpc2libGUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlciBpbnN0YW5jZW9mIERlbW9uXzEuZGVmYXVsdClcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIuYW5pbWF0ZUZpcmViYWxsKHsgeDogdGhpcy5yZW5kZXJlZFZpZXdYLCB5OiB0aGlzLnJlbmRlcmVkVmlld1kgfSk7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnhQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueSAqIDIgJiZcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubW9uc3RlcnMsIChtb25zdGVyLnNvdXJjZUNvbHVtbiAqIDggKyBtb25zdGVyLmxvb2tpbmdEaXJlY3Rpb24pICogMTcsIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCAlIDMpICogMTcsIDE2LCAxNiwgLXRoaXMucmVuZGVyZWRWaWV3WCAlIDgwICsgKG1vbnN0ZXIueFBvc2l0aW9uIC0gc3RhcnRJbmRleGVzLnggKiAyKSAqIDQwLCAtdGhpcy5yZW5kZXJlZFZpZXdZICUgODAgKyAobW9uc3Rlci55UG9zaXRpb24gLSBzdGFydEluZGV4ZXMueSAqIDIpICogNDAsIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZHb2JsaW5zLmZvckVhY2goKGdvYmxpbikgPT4ge1xyXG4gICAgICAgICAgICAvL2dvYmxpbi5yZW5kZXJSb2NrKHN0YXJ0SW5kZXhlcylcclxuICAgICAgICAgICAgaWYgKGdvYmxpbi54UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgICAgICBnb2JsaW4ueFBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgICAgICBnb2JsaW4ueVBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnlQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm1vbnN0ZXJzLCAoZ29ibGluLnNvdXJjZUNvbHVtbiAqIDggKyA0KSAqIDE3LCAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggJSAzKSAqIDE3LCAxNiwgMTYsIC10aGlzLnJlbmRlcmVkVmlld1ggJSA4MCArIChnb2JsaW4ueFBvc2l0aW9uIC0gc3RhcnRJbmRleGVzLnggKiAyKSAqIDQwLCAtdGhpcy5yZW5kZXJlZFZpZXdZICUgODAgKyAoZ29ibGluLnlQb3NpdGlvbiAtIHN0YXJ0SW5kZXhlcy55ICogMikgKiA0MCwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZHJhd1Njb3JlQW5kSGVhbHRoKCkge1xyXG4gICAgICAgIGNvbnN0IHNjb3JlTGVuZ3RoID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc2NvcmUudG9TdHJpbmcoKS5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHNjb3JlRGlnaXRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2IC0gc2NvcmVMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgc2NvcmVEaWdpdHMucHVzaCgwKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHNjb3JlRGlnaXRzLnB1c2gocGFyc2VJbnQoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc2NvcmUudG9TdHJpbmcoKS5jaGFyQXQoaSkpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubnVtYmVycyA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5udW1iZXJzLCBzY29yZURpZ2l0c1tpXSAqIDksIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDksIDgsIDgsIDQxICsgOCAqIHRoaXMubXVsdGlwbGllciAqIGksIDE3NiAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWx0aExlbmd0aCA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aC50b1N0cmluZygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgaGVhbHRoRGlnaXRzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0IC0gaGVhbHRoTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGhlYWx0aERpZ2l0cy5wdXNoKDApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhbHRoTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGhlYWx0aERpZ2l0cy5wdXNoKHBhcnNlSW50KE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aC50b1N0cmluZygpLmNoYXJBdChpKSkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5udW1iZXJzLCBoZWFsdGhEaWdpdHNbaV0gKiA5LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiA5LCA4LCA4LCA0MDQgKyA4ICogdGhpcy5tdWx0aXBsaWVyICogaSwgMTc2ICogdGhpcy5tdWx0aXBsaWVyLCA4ICogdGhpcy5tdWx0aXBsaWVyLCA4ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcmF3SXRlbXNBbmRBYmlsaXRpZXMoKTtcclxuICAgIH1cclxuICAgIGRyYXdJdGVtc0FuZEFiaWxpdGllcygpIHtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5vd25lZEFiaWxpdGllcy5mb3JFYWNoKGFiaWxpdHkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFiaWxpdHkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5maWdodFBvd2VyUG90aW9uOiAvLyBsaWdodGJsdWUgZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxNCwgNjEwLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLm1hZ2ljUG93ZXJQb3Rpb246IC8vIGdyZWVuIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTIsIDEyMSwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5leHRyYUFybW91clBvdGlvbjogLy8geWVsbG93IGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTAsIDQxLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmV4dHJhQ2FycnlpbmdBYmlsaXR5UG90aW9uOiAvLyBwdXJwbGUgZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxMSwgODEsIDE2MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMuZXh0cmFTaG90UG93ZXI6IC8vIGJyb3duIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTMsIDUzMCwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQua2V5czsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdJY29uKDE1LCAzOSArIDQwICogaSwgMTg0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnBvdGlvbnM7IGkrKylcclxuICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxNiwgNjA1IC0gNDAgKiBpLCAxODQpO1xyXG4gICAgfVxyXG4gICAgZHJhd0ljb24oc1hJbmRleCwgZFgsIGRZKSB7XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm51bWJlcnMsIHNYSW5kZXggKiA5LCAwLCA4LCA4LCBkWCwgZFkgKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgfVxyXG4gICAgZHJhd0FiaWxpdHlTY3JlZW4oaXRlbUluZGV4KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5waWNrVXBBYmlsaXR5U2NyZWVuLCAwLCAwLCAzMjEsIDE5MiwgMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgLSA0MCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5hYmlsaXR5VGV4dHMsIDAsIGl0ZW1JbmRleCAqIDgsIDE3NSwgNywgNzcgKiA0LCAxMTEgKiA0LCAxNzYgKiAoQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIgLSAxKSwgOCAqIChDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciAtIDEpKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm51bWJlcnMsIDE1NCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogOSwgNjQsIDgsIDEzMCAqIDQsIDcwICogNCwgNjQgKiAoQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIgLSAxKSwgOSAqIChDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciAtIDEpKTtcclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuICAgIGFuaW1hdGVFbmRpbmcoKSB7XHJcbiAgICAgICAgdGhpcy5vbGRUaW1lID0gdGhpcy5uZXdUaW1lO1xyXG4gICAgICAgIHRoaXMubmV3VGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAodGhpcy5uZXdUaW1lIC0gdGhpcy5vbGRUaW1lKTtcclxuICAgICAgICAvL2RyYXcgYmFja2dyb3VuZFxyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjN2E3YTdhJztcclxuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCAyNTcgKiB0aGlzLm11bHRpcGxpZXIsIDE1MiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgdGhpcy5kcmF3V2FsbHMoKTtcclxuICAgICAgICB0aGlzLmRyYXdJdGVtcygpO1xyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubW92ZU1vbnN0ZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3TW9uc3RlcnMoKTtcclxuICAgICAgICAvLyBib3R0b20gYmFyXHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLmJvdHRvbUJhciwgMCwgMCwgMjU3LCA0MCwgMCAqIHRoaXMubXVsdGlwbGllciwgMTUyICogdGhpcy5tdWx0aXBsaWVyLCAyNTcgKiB0aGlzLm11bHRpcGxpZXIsIDQwICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB0aGlzLmRyYXdTY29yZUFuZEhlYWx0aCgpO1xyXG4gICAgICAgIC8vIGZwcyBpbiB0aGUgY29ybmVyXHJcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMzBweCBBcmlhbFwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCgoMS4wIC8gKHRoaXMuZGVsdGFUaW1lIC8gMTAwMCkpLnRvRml4ZWQoMCkudG9TdHJpbmcoKSwgMCwgNzg2KTtcclxuICAgICAgICBsZXQgaW1hZ2VTb3VyY2UgPSAodGhpcy5lbmRpbmdGcmFtZSAtIHRoaXMuZW5kaW5nRnJhbWUgJSAzKSAvIDM7XHJcbiAgICAgICAgaWYgKGltYWdlU291cmNlIDwgMTYpIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm1haW5DaGFyYWN0ZXJzLCAoaW1hZ2VTb3VyY2UgJSA4KSAqIDE3ICsgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogMTM2LCAwLCAxNiwgMTYsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCAtIHRoaXMucmVuZGVyZWRWaWV3WCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdZLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLndlYXBvbnMsIChpbWFnZVNvdXJjZSAtIDE2KSAqIDksIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDksIDgsIDgsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCAtIHRoaXMucmVuZGVyZWRWaWV3WCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdZLCA4ICogdGhpcy5tdWx0aXBsaWVyLCA4ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbmRpbmdGcmFtZSsrO1xyXG4gICAgICAgIGlmIChpbWFnZVNvdXJjZSAhPSAyNClcclxuICAgICAgICAgICAgdGhpcy5yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZUVuZGluZygpKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LnJlc3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IENhbnZhcygpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNvbnN0YW50cyA9IGV4cG9ydHMuYmxvY2tHcm91cHMgPSBleHBvcnRzLmJsb2NrQ29kZXMgPSB2b2lkIDA7XHJcbmV4cG9ydHMuYmxvY2tDb2RlcyA9IHtcclxuICAgIGRlc3RydWN0aWJsZVdhbGxzOiBbMSwgMiwgM10sXHJcbiAgICBpbmRlc3RydWN0aWJsZVdhbGxzOiBbNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldLFxyXG4gICAgc3Bhd25lcnNJbWFnZXM6IFsyMCwgMjEsIDIyLCAyMywgMjQsIDI1XSxcclxuICAgIGV4aXQ6IDI2LFxyXG4gICAgZ2xhc3M6IFsyNywgMjhdLFxyXG4gICAga2V5OiAyOSxcclxuICAgIG1lZGFsbGlvbjogMzAsXHJcbiAgICBtZWF0OiAzMSxcclxuICAgIHllbGxvd0JvdHRsZTogMzIsXHJcbiAgICBtYWdpY1BvdGlvbjogMzMsXHJcbiAgICBmaWdodFBvd2VyUG90aW9uOiAzNCxcclxuICAgIG1hZ2ljUG93ZXJQb3Rpb246IDM1LFxyXG4gICAgZXh0cmFBcm1vdXJQb3Rpb246IDM2LFxyXG4gICAgZXh0cmFDYXJyeWluZ0FiaWxpdHlQb3Rpb246IDM3LFxyXG4gICAgZXh0cmFTaG90UG93ZXI6IDM4LFxyXG4gICAgZ2hvc3Q6IC04MCxcclxuICAgIGdydW50OiAtODEsXHJcbiAgICBkZW1vbjogLTgyLFxyXG4gICAgc29yY2VyZXI6IC04MyxcclxuICAgIGxvYmJlcjogLTg0LFxyXG4gICAgZGVhdGg6IC04NSxcclxuICAgIHNwYXduZXJzOiBbNzAsIDcxLCA3MiwgNzMsIDc0LCA3NSwgNzYsIDc3LCA3OCwgNzksIDgwLCA4MV0sXHJcbiAgICBib3hlczogWzM5LCA0MCwgNDFdLFxyXG4gICAgcG9ydGFsczogWzQyLCA0MywgNDRdLFxyXG4gICAgcGFzc2FnZXM6IFs0NSwgNDYsIDQ3XVxyXG59O1xyXG5leHBvcnRzLmJsb2NrR3JvdXBzID0ge1xyXG4gICAgbW9uc3RlcnM6IFtcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZ2hvc3QsXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmdydW50LFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5kZWF0aCxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZGVtb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmxvYmJlcixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuc29yY2VyZXJcclxuICAgIF0sXHJcbiAgICB3YWxsczogW1xyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5kZXN0cnVjdGlibGVXYWxscywgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHNcclxuICAgIF0sXHJcbiAgICBub1RyYW5zaXRpb246IFtcclxuICAgICAgICAuLi5leHBvcnRzLmJsb2NrQ29kZXMuZGVzdHJ1Y3RpYmxlV2FsbHMsIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLCAuLi5leHBvcnRzLmJsb2NrQ29kZXMuZ2xhc3MsIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVycyxcclxuICAgIF0sXHJcbiAgICBub1RyYW5zaXRpb25Gb3JQcm9qZWN0aWxlOiBbXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmRlc3RydWN0aWJsZVdhbGxzLFxyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLFxyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVyc0ltYWdlcyxcclxuICAgICAgICAuLi5leHBvcnRzLmJsb2NrQ29kZXMuYm94ZXMsXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmdsYXNzLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5rZXksXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLm1lYXQsXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLm1lZGFsbGlvblxyXG4gICAgXSxcclxuICAgIHBpY2thYmxlSXRlbXM6IFtcclxuICAgICAgICAuLi5leHBvcnRzLmJsb2NrQ29kZXMuYm94ZXMsXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmdsYXNzLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5rZXksXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLnllbGxvd0JvdHRsZSxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWVhdCxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWVkYWxsaW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5tYWdpY1BvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZmlnaHRQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWFnaWNQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZXh0cmFBcm1vdXJQb3Rpb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmV4dHJhQ2FycnlpbmdBYmlsaXR5UG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5leHRyYVNob3RQb3dlclxyXG4gICAgXSxcclxuICAgIGRlc3Ryb3lhYmxlVGhpbmdzOiBbXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmRlc3RydWN0aWJsZVdhbGxzLFxyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVyc0ltYWdlcyxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMueWVsbG93Qm90dGxlLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5tYWdpY1BvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZmlnaHRQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWFnaWNQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZXh0cmFBcm1vdXJQb3Rpb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmV4dHJhQ2FycnlpbmdBYmlsaXR5UG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5leHRyYVNob3RQb3dlcixcclxuICAgIF0sXHJcbiAgICBkZXN0cm95YWJsZVRoaW5nc0J5SGFuZDogW1xyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVyc0ltYWdlcywgZXhwb3J0cy5ibG9ja0NvZGVzLmdydW50LCBleHBvcnRzLmJsb2NrQ29kZXMuZGVtb24sIGV4cG9ydHMuYmxvY2tDb2Rlcy5zb3JjZXJlciwgZXhwb3J0cy5ibG9ja0NvZGVzLmxvYmJlcixcclxuICAgIF0sXHJcbiAgICBkZXN0cm95YWJsZUJ5RGVtb25zOiBbXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLm1hZ2ljUG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5maWdodFBvd2VyUG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5tYWdpY1Bvd2VyUG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5leHRyYUFybW91clBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZXh0cmFDYXJyeWluZ0FiaWxpdHlQb3Rpb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmV4dHJhU2hvdFBvd2VyLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy55ZWxsb3dCb3R0bGVcclxuICAgIF0sXHJcbn07XHJcbmV4cG9ydHMuQ29uc3RhbnRzID0ge1xyXG4gICAgbXVsdGlwbGllcjogNSxcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lTWFwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZU1hcFwiKSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IFNvdW5kc0hhbmRsZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Tb3VuZHNIYW5kbGVyXCIpKTtcclxuY29uc3QgaW5kZXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9pbmRleFwiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgS2V5Ym9hcmRFdmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9LZXlib2FyZEV2ZW50c1wiKSk7XHJcbmNsYXNzIEdhbWUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFwID0gbmV3IEdhbWVNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEdhbWUoc2VsZWN0ZWRDaGFyYWN0ZXIsIHNlbGVjdGVkTWFwKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLmdhbWVNYXAuY2xlYXJNYXAoKTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LmNsZWFuRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZW5kaW5nRnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLmdhbWVNYXAubG9hZE1hcChzZWxlY3RlZE1hcCwgc2VsZWN0ZWRDaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmxhdW5jaEdhbWUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxhdW5jaEdhbWUoKSB7XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5kcmF3TGV2ZWxUaXRsZVNjcmVlbih0aGlzLmdhbWVNYXAubGV2ZWxOdW1iZXIpO1xyXG4gICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJsZXZlbFRpdGxlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwic3RhcnRMZXZlbFwiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFwLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5kaXNhYmxlRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlckdhbWVGcmFtZSgpKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFwLnNldEludGVydmFscygpO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zdGFydExvc2luZ0hQSW50ZXJ2YWwoKTtcclxuICAgICAgICB9LCA0MDAwKTtcclxuICAgIH1cclxuICAgIHJlc3RhcnRHYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVNYXAuYW5pbWF0ZVNwcml0ZXNJbnRlcnZhbCAhPT0gbnVsbClcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVNYXAuYW5pbWF0ZVNwcml0ZXNJbnRlcnZhbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU1hcC5zcGF3bmluZ01vbnN0ZXJzSW50ZXJ2YWwgIT09IG51bGwpXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5nYW1lTWFwLnNwYXduaW5nTW9uc3RlcnNJbnRlcnZhbCk7XHJcbiAgICAgICAgaW5kZXhfMS5kZWZhdWx0LmNyZWF0ZVN0YXJ0QnV0dG9uKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEdhbWUoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTWFpbkNoYXJhY3RlclwiKSk7XHJcbmNvbnN0IERlbW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvRGVtb25cIikpO1xyXG5jb25zdCBTcGF3bmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3Bhd25lclwiKSk7XHJcbmNvbnN0IEdob3N0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvR2hvc3RcIikpO1xyXG5jb25zdCBHcnVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJzL0dydW50XCIpKTtcclxuY29uc3QgRGVhdGhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9EZWF0aFwiKSk7XHJcbmNvbnN0IFNvcmNlcmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvU29yY2VyZXJcIikpO1xyXG5jb25zdCBMb2JiZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9Mb2JiZXJcIikpO1xyXG5jb25zdCBIZWxwZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGVscGVyc1wiKSk7XHJcbmNvbnN0IEtleWJvYXJkRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vS2V5Ym9hcmRFdmVudHNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBTb3VuZHNIYW5kbGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU291bmRzSGFuZGxlclwiKSk7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY29uc3QgQ29uc3RzXzEgPSByZXF1aXJlKFwiLi9Db25zdHNcIik7XHJcbmNsYXNzIEdhbWVNYXAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBbW11dO1xyXG4gICAgICAgIHRoaXMubGV2ZWxOdW1iZXIgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtYmVyT2ZYQmxvY2tzID0gMDtcclxuICAgICAgICB0aGlzLm51bWJlck9mWUJsb2NrcyA9IDA7XHJcbiAgICAgICAgdGhpcy54U2l6ZUluUGl4ZWxzID0gMDtcclxuICAgICAgICB0aGlzLnlTaXplSW5QaXhlbHMgPSAwO1xyXG4gICAgICAgIHRoaXMudW5pdmVyc2FsRnJhbWVJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zID0gW107XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzVG9DcmVhdGUgPSBbXTtcclxuICAgICAgICB0aGlzLnNwYXduaW5nTW9uc3RlcnNJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlU3ByaXRlc0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcnRhbHMgPSBbXTtcclxuICAgICAgICB0aGlzLnBhc3NhZ2VzID0gW107XHJcbiAgICAgICAgdGhpcy5lbmRPZkxldmVsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwiZW50ZXJpbmdFeGl0XCIpO1xyXG4gICAgICAgICAgICBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuZGlzYWJsZUV2ZW50cyA9IHRydWU7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5XS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuU0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LkFLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5ES2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuU3BhY2VLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnN0b3BMb3NpbmdIUEludGVydmFsKCk7XHJcbiAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKENhbnZhc18xLmRlZmF1bHQucmFmKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9wR2FtZSA9IHRydWU7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IENhbnZhc18xLmRlZmF1bHQuYW5pbWF0ZUVuZGluZygpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY2xlYXJNYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBbW11dO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzVG9DcmVhdGUgPSBbXTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRNYXAobWFwTmFtZSwgY2hhcmFjdGVyTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGFyYWN0ZXJOdW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSA9PT0gXCJXYXJyaW9yXCIpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOdW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJOYW1lID09PSBcIlZhbGt5cmllXCIpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJOYW1lID09PSBcIkVsZlwiKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyTnVtYmVyID0gMjtcclxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhcmFjdGVyTmFtZSA9PT0gXCJXaXphcmRcIilcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck51bWJlciA9IDM7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCA9IGNoYXJhY3Rlck51bWJlcjtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgLi9qc29uTWFwcy9tYXAke21hcE5hbWV9Lmpzb25gKTtcclxuICAgICAgICAgICAgY29uc3QgbG9hZGVkRGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuYm90dG9tQmFyID0geWllbGQgSW1hZ2VzXzEuZGVmYXVsdC5pbWFnZUxvYWRlcihcImJvdHRvbUJhclwiICsgY2hhcmFjdGVyTnVtYmVyICsgXCIucG5nXCIpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IHRoaXMuY3JlYXRlQmlnZ2VyTWFwKGxvYWRlZERhdGEuYXJyYXkpO1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsTnVtYmVyID0gbG9hZGVkRGF0YS5sZXZlbE51bWJlcjtcclxuICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnNUb0NyZWF0ZS5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNb25zdGVyKG1vbnN0ZXIueCwgbW9uc3Rlci55LCBtb25zdGVyLmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCA9IGxvYWRlZERhdGEuY2hhcmFjdGVyU3RhcnRDb29yZHNbMF0gKiAxNiAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkID0gbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1sxXSAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXMgPSBbbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1swXSAqIDIsIGxvYWRlZERhdGEuY2hhcmFjdGVyU3RhcnRDb29yZHNbMV0gKiAyXTtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY29vcmRzQXJyYXlJbmRleGVzLCAtMSk7XHJcbiAgICAgICAgICAgIHRoaXMubnVtYmVyT2ZYQmxvY2tzID0gbG9hZGVkRGF0YS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5udW1iZXJPZllCbG9ja3MgPSBsb2FkZWREYXRhLmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5wb3J0YWxzID0gbG9hZGVkRGF0YS5wb3J0YWxzQ29vcmRzO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3NhZ2VzID0gbG9hZGVkRGF0YS5wYXNzYWdlc0Nvb3JkcztcclxuICAgICAgICAgICAgdGhpcy54U2l6ZUluUGl4ZWxzID0gdGhpcy5udW1iZXJPZlhCbG9ja3MgKiAxNiAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgdGhpcy55U2l6ZUluUGl4ZWxzID0gdGhpcy5udW1iZXJPZllCbG9ja3MgKiAxNiAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc2NvcmUgPSBsb2FkZWREYXRhLnN0YXJ0U2NvcmU7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aCA9IGxvYWRlZERhdGEuc3RhcnRIZWFsdGg7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0Lm1vdmVNYXAoKTtcclxuICAgICAgICAgICAgeWllbGQgSW1hZ2VzXzEuZGVmYXVsdC5sb2FkV2FsbHNUeXBlQW5kQ29sb3IobG9hZGVkRGF0YS53YWxsc0NvbG9yLCBsb2FkZWREYXRhLndhbGxzVHlwZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVCaWdnZXJNYXAoaW5wdXRNYXApIHtcclxuICAgICAgICBsZXQgZG91YmxlZE1hcCA9IFtdO1xyXG4gICAgICAgIGlucHV0TWFwLmZvckVhY2goKHJvdywgcm93SW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRvdWJsZWRSb3cgPSBbXTtcclxuICAgICAgICAgICAgcm93LmZvckVhY2goKGNlbGwsIGNlbGxJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKFsyMCwgMjEsIDIyXS5pbmNsdWRlcyhjZWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1OdW1iZXIgPSB0aGlzLmNyZWF0ZVNwYXduZXIoY2VsbEluZGV4LCByb3dJbmRleCwgY2VsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKGl0ZW1OdW1iZXIsIGl0ZW1OdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5zcGF3bmVycy5pbmNsdWRlcyhjZWxsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1OdW1iZXIgPSB0aGlzLmNyZWF0ZVNwYXduZXIoY2VsbEluZGV4LCByb3dJbmRleCwgY2VsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKGl0ZW1OdW1iZXIsIGl0ZW1OdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2VsbCA8PSAtODAgJiYgY2VsbCA+PSAtODUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVyc1RvQ3JlYXRlLnB1c2goeyB4OiBjZWxsSW5kZXgsIHk6IHJvd0luZGV4LCBpZDogY2VsbCAqICgtMSkgLSA4MCB9KTtcclxuICAgICAgICAgICAgICAgICAgICBkb3VibGVkUm93LnB1c2goMCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKGNlbGwsIGNlbGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZG91YmxlZE1hcC5wdXNoKFsuLi5kb3VibGVkUm93XSwgWy4uLmRvdWJsZWRSb3ddKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZG91YmxlZE1hcDtcclxuICAgIH1cclxuICAgIHNldE9uZUZpZWxkKHgsIHksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbeV1beF0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGNsZWFyQmxvY2soY29vcmRzKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMl0gPSAwO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDJdID0gMDtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV0gKiAyICsgMV1bY29vcmRzWzBdICogMiArIDFdID0gMDtcclxuICAgIH1cclxuICAgIGNsZWFyQmxvY2syKGNvb3Jkcykge1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXV1bY29vcmRzWzBdXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdXVtjb29yZHNbMF0gKyAxXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdICsgMV0gPSAwO1xyXG4gICAgfVxyXG4gICAgc2V0QmxvY2soY29vcmRzLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDJdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMiArIDFdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDJdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0QmxvY2syKGNvb3JkcywgbmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV1dW2Nvb3Jkc1swXV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV1dW2Nvb3Jkc1swXSArIDFdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICsgMV1bY29vcmRzWzBdXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSArIDFdW2Nvb3Jkc1swXSArIDFdID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aW1lc1VwKCkge1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmhlYWx0aCA9IDA7XHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuZHJhd1Njb3JlQW5kSGVhbHRoKCk7XHJcbiAgICB9XHJcbiAgICBwaWNraW5nVXBBYmlsaXR5KGl0ZW1JbmRleCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc3RvcEdhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zdG9wTG9zaW5nSFBJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmRyYXdBYmlsaXR5U2NyZWVuKGl0ZW1JbmRleCk7XHJcbiAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJwaWNrZWRBYmlsaXR5XCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEdhbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlckdhbWVGcmFtZSgpKTtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnN0YXJ0TG9zaW5nSFBJbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNldEludGVydmFscygpIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGVTcHJpdGVzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVuaXZlcnNhbEZyYW1lSW5kZXggPT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVuaXZlcnNhbEZyYW1lSW5kZXggPT0gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRnJhbWVJbmRleCA9IDI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVuaXZlcnNhbEZyYW1lSW5kZXggPT0gMilcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnVuaXZlcnNhbEZyYW1lSW5kZXggPT0gMylcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRnJhbWVJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsRnJhbWVJbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxGcmFtZUluZGV4ID09IDQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbEZyYW1lSW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gMSlcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gMztcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gMylcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gMjtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gMilcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gNjtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51bml2ZXJzYWxNb25zdGVyc0ZyYW1lSW5kZXggPT0gNilcclxuICAgICAgICAgICAgICAgIHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID0gMTtcclxuICAgICAgICB9LCAxNTApO1xyXG4gICAgICAgIHRoaXMuc3Bhd25pbmdNb25zdGVyc0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNwYXduTW9uc3RlcnMoKTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gICAgaXNGaWVsZENsZWFyKHgsIHkpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xyXG4gICAgICAgIGlmICgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt5XSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3hdKSA9PSAwICYmXHJcbiAgICAgICAgICAgICgoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3ldKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbeCArIDFdKSA9PSAwICYmXHJcbiAgICAgICAgICAgICgoX2YgPSAoX2UgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lW3kgKyAxXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mW3hdKSA9PSAwICYmXHJcbiAgICAgICAgICAgICgoX2ggPSAoX2cgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW3kgKyAxXSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oW3ggKyAxXSkgPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNTbWFsbEZpZWxkQ2xlYXIoeCwgeSkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgaWYgKCgoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3ldKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbeF0pID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBtb3ZlTW9uc3RlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXArKztcclxuICAgICAgICBpZiAodGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXAgIT0gMTApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubW92ZU1vbnN0ZXJzVGltZXN0YW1wID0gMDtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMyKCk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPCBzdGFydEluZGV4ZXMueClcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci54UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueCArIDM0KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnlQb3NpdGlvbiA8IHN0YXJ0SW5kZXhlcy55KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnlQb3NpdGlvbiA+IHN0YXJ0SW5kZXhlcy55ICsgMjIpXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwbGF5ZXJzQ29vcmRzID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuZ2V0Q29vcmRpbmF0ZXMyKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkKTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci5tb3ZlZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbW9uc3Rlci5kaXN0YW5jZUZyb21QbGF5ZXIgPSBNYXRoLnBvdygocGxheWVyc0Nvb3Jkc1swXSAtIG1vbnN0ZXIueFBvc2l0aW9uKSwgMikgKyBNYXRoLnBvdygocGxheWVyc0Nvb3Jkc1sxXSAtIG1vbnN0ZXIueVBvc2l0aW9uKSwgMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSB0aGlzLmFycmF5T2ZNb25zdGVycy5maWx0ZXIoKG1vbnN0ZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIuZGlzdGFuY2VGcm9tUGxheWVyICE9PSA0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnNvdXJjZUNvbHVtbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwiZ290SGl0QnlHaG9zdFwiKTtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNoYW5nZUhlYWx0aCgtNSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDUpIHtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNoYW5nZUhlYWx0aCgtMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3RlciBpbnN0YW5jZW9mIERlYXRoXzEuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuaGVhbHRoU3Vja2VkT3V0T2ZQbGF5ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlYWx0aCBzdWNrZWRcIiwgbW9uc3Rlci5oZWFsdGhTdWNrZWRPdXRPZlBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIuaGVhbHRoU3Vja2VkT3V0T2ZQbGF5ZXIgPj0gMTcwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuZGllKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJnb3RIaXRCeURlYXRoXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VIZWFsdGgoLTUpO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcImdvdEhpdEJ5R3J1bnREZW1vblwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyLmRpc3RhbmNlRnJvbVBsYXllciAhPSBpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZENvb3JkcyA9IFttb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb25dO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJsb2NrMihbbW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uXSk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1vbnN0ZXIubG9va2luZ0RpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy80XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uICsgMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uICsgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vNVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyA2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uICsgMikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy83XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrTWU6IGlmIChtb25zdGVyIGluc3RhbmNlb2YgU29yY2VyZXJfMS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZENvb3Jkc1swXSA9PT0gbW9uc3Rlci54UG9zaXRpb24gJiYgb2xkQ29vcmRzWzFdID09PSBtb25zdGVyLnlQb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGJyZWFrTWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5kID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3RlciBpbnN0YW5jZW9mIERlbW9uXzEuZGVmYXVsdClcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmNoZWNrRm9yU2hvb3QoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QmxvY2syKFttb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb25dLCBtb25zdGVyLmlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xlYXJNYXBGcm9tTW9uc3RlcnNBbmRTcGF3bmVycyhpdGVtVXNlZCkge1xyXG4gICAgICAgIGlmIChNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5wb3Rpb25zID09PSAwICYmIGl0ZW1Vc2VkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcImRlc3Ryb3lCb3R0bGVcIik7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSB0aGlzLmFycmF5T2ZNb25zdGVycy5maWx0ZXIobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLnhQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueSAqIDIgJiZcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7XHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLmRpZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zID0gdGhpcy5hcnJheU9mR29ibGlucy5maWx0ZXIoZ29ibGluID0+IHtcclxuICAgICAgICAgICAgaWYgKGdvYmxpbi54UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgICAgICBnb2JsaW4ueFBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgICAgICBnb2JsaW4ueVBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgZ29ibGluLnlQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikge1xyXG4gICAgICAgICAgICAgICAgZ29ibGluLmRpZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycyA9IHRoaXMuYXJyYXlPZlNwYXduZXJzLmZpbHRlcihzcGF3bmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIueFBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy54ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgc3Bhd25lci54UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgICAgIHNwYXduZXIueVBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgc3Bhd25lci55UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnkgKiAyICsgMjIpIHtcclxuICAgICAgICAgICAgICAgIHNwYXduZXIuZGVzdHJveWVkKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGl0ZW1Vc2VkKVxyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5wb3Rpb25zLS07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVTcGF3bmVyKHgsIHksIHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHJldHVybkl0ZW1JbmRleCA9IHZhbHVlO1xyXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICAgICAgY2FzZSAyMDpcclxuICAgICAgICAgICAgY2FzZSAyMTpcclxuICAgICAgICAgICAgY2FzZSAyMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzLnB1c2gobmV3IFNwYXduZXJfMS5kZWZhdWx0KHggKiAyLCB5ICogMiwgMCkpO1xyXG4gICAgICAgICAgICAgICAgLy9naG9zdHNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDcwOlxyXG4gICAgICAgICAgICBjYXNlIDcxOlxyXG4gICAgICAgICAgICBjYXNlIDcyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMucHVzaChuZXcgU3Bhd25lcl8xLmRlZmF1bHQoeCAqIDIsIHkgKiAyLCAxKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5JdGVtSW5kZXggLT0gNDc7XHJcbiAgICAgICAgICAgICAgICAvL2dydW50c1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzM6XHJcbiAgICAgICAgICAgIGNhc2UgNzQ6XHJcbiAgICAgICAgICAgIGNhc2UgNzU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycy5wdXNoKG5ldyBTcGF3bmVyXzEuZGVmYXVsdCh4ICogMiwgeSAqIDIsIDIpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybkl0ZW1JbmRleCAtPSA1MDtcclxuICAgICAgICAgICAgICAgIC8vZGVtb25zXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3NjpcclxuICAgICAgICAgICAgY2FzZSA3NzpcclxuICAgICAgICAgICAgY2FzZSA3ODpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzLnB1c2gobmV3IFNwYXduZXJfMS5kZWZhdWx0KHggKiAyLCB5ICogMiwgMykpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuSXRlbUluZGV4IC09IDUzO1xyXG4gICAgICAgICAgICAgICAgLy9zb3JjZXJlclxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzk6XHJcbiAgICAgICAgICAgIGNhc2UgODA6XHJcbiAgICAgICAgICAgIGNhc2UgODE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycy5wdXNoKG5ldyBTcGF3bmVyXzEuZGVmYXVsdCh4ICogMiwgeSAqIDIsIDQpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybkl0ZW1JbmRleCAtPSA1NjtcclxuICAgICAgICAgICAgICAgIC8vbG9iYmVyXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVybkl0ZW1JbmRleDtcclxuICAgIH1cclxuICAgIGNyZWF0ZU1vbnN0ZXIoeCwgeSwgbW9iSWQpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VDb2x1bW4gPSBtb2JJZDtcclxuICAgICAgICBzd2l0Y2ggKHNvdXJjZUNvbHVtbikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5wdXNoKG5ldyBHaG9zdF8xLmRlZmF1bHQoMCwgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgR3J1bnRfMS5kZWZhdWx0KDEsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IERlbW9uXzEuZGVmYXVsdCgyLCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5wdXNoKG5ldyBTb3JjZXJlcl8xLmRlZmF1bHQoMywgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mR29ibGlucy5wdXNoKG5ldyBMb2JiZXJfMS5kZWZhdWx0KDQsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IERlYXRoXzEuZGVmYXVsdCg1LCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNwYXduTW9uc3RlcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzMigpO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzLmZvckVhY2goc3Bhd25lciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnhQb3NpdGlvbiA8IHN0YXJ0SW5kZXhlcy54KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci54UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueCArIDM0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci55UG9zaXRpb24gPCBzdGFydEluZGV4ZXMueSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIueVBvc2l0aW9uID4gc3RhcnRJbmRleGVzLnkgKyAyMilcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc3Bhd25lci5sYXN0VGltZVNwYXduZWRTb21ldGhpbmcrKztcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIubGFzdFRpbWVTcGF3bmVkU29tZXRoaW5nICE9PSBzcGF3bmVyLnRpbWVUb1NwYXduKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnNwYXduTW9uc3RlcihzcGF3bmVyLnhQb3NpdGlvbiwgc3Bhd25lci55UG9zaXRpb24sIHNwYXduZXIubW9iKTtcclxuICAgICAgICAgICAgc3Bhd25lci5sYXN0VGltZVNwYXduZWRTb21ldGhpbmcgPSAwO1xyXG4gICAgICAgICAgICBzcGF3bmVyLnRpbWVUb1NwYXduID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3Bhd25Nb25zdGVyKHgsIHksIG1vYklkKSB7XHJcbiAgICAgICAgbGV0IHBvc3NpYmxlRGlyZWN0aW9ucyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3XTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hvc2VuRGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVEaXJlY3Rpb25zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdDb29yZHMgPSB0aGlzLmRpcmVjdGlvblRvQ29vcmRzKHgsIHksIGNob3NlbkRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihuZXdDb29yZHMueCwgbmV3Q29vcmRzLnkpKSB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IE1vbnN0ZXIobW9iSWQsIDUsIDUgLG5ld0Nvb3Jkcy54LCBuZXdDb29yZHMueSwgMCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnN0ZXIobmV3Q29vcmRzLnggLyAyLCBuZXdDb29yZHMueSAvIDIsIG1vYklkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwb3NzaWJsZURpcmVjdGlvbnMuc3BsaWNlKHBvc3NpYmxlRGlyZWN0aW9ucy5pbmRleE9mKGNob3NlbkRpcmVjdGlvbiksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRlbGV0ZVNwYXduZXIoY29vcmRzKSB7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSB0aGlzLmFycmF5T2ZTcGF3bmVycy5maWx0ZXIoc3Bhd25lciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnhQb3NpdGlvbiA9PSBjb29yZHNbMF0gKiAyICYmIHNwYXduZXIueVBvc2l0aW9uID09IGNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGlyZWN0aW9uVG9Db29yZHMoeCwgeSwgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeSAtIDIgfTtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCArIDIsIHk6IHkgLSAyIH07XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHggKyAyLCB5OiB5IH07XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHggKyAyLCB5OiB5ICsgMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5ICsgMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4IC0gMiwgeTogeSArIDIgfTtcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCAtIDIsIHk6IHkgfTtcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCAtIDIsIHk6IHkgLSAyIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZmluZEdsYXNzKHgsIHkpIHtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5nbGFzcy5pbmNsdWRlcyhHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt5XVt4XSkpIHtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbeV1beF0gPSAwO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt5ICsgMV1beF0gPSAwO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt5ICsgMV1beCArIDFdID0gMDtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbeV1beCArIDFdID0gMDtcclxuICAgICAgICAgICAgdGhpcy5maW5kR2xhc3MoeCwgeSArIDIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRHbGFzcyh4LCB5IC0gMik7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEdsYXNzKHggKyAyLCB5KTtcclxuICAgICAgICAgICAgdGhpcy5maW5kR2xhc3MoeCAtIDIsIHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRlbGVwb3J0KCkge1xyXG4gICAgICAgIHRoaXMucG9ydGFscy5mb3JFYWNoKChwb3J0YWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwb3J0YWxbMF0gIT0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY29vcmRzQXJyYXlJbmRleGVzWzBdIC8gMiB8fFxyXG4gICAgICAgICAgICAgICAgcG9ydGFsWzFdICE9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAvIDIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmZpbmRQbGFjZVRvVGVsZXBvcnQoW3BvcnRhbFsyXSAqIDIsIHBvcnRhbFszXSAqIDJdKTtcclxuICAgICAgICAgICAgaWYgKHJlcyA9PT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY29vcmRzQXJyYXlJbmRleGVzID0gW3Jlc1swXSwgcmVzWzFdXTtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY29vcmRzQXJyYXlJbmRleGVzLCAwKTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkID0gcmVzWzBdIC8gMiAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgPSByZXNbMV0gLyAyICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlcywgLTEpO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5tb3ZlTWFwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmaW5kUGxhY2VUb1RlbGVwb3J0KGNvb3Jkcykge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihjb29yZHNbMF0gKyAyLCBjb29yZHNbMV0pKVxyXG4gICAgICAgICAgICByZXR1cm4gW2Nvb3Jkc1swXSArIDIsIGNvb3Jkc1sxXV07XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0ZpZWxkQ2xlYXIoY29vcmRzWzBdLCBjb29yZHNbMV0gKyAyKSlcclxuICAgICAgICAgICAgcmV0dXJuIFtjb29yZHNbMF0sIGNvb3Jkc1sxXSArIDJdO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNGaWVsZENsZWFyKGNvb3Jkc1swXSAtIDIsIGNvb3Jkc1sxXSkpXHJcbiAgICAgICAgICAgIHJldHVybiBbY29vcmRzWzBdIC0gMiwgY29vcmRzWzFdXTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzRmllbGRDbGVhcihjb29yZHNbMF0sIGNvb3Jkc1sxXSAtIDIpKVxyXG4gICAgICAgICAgICByZXR1cm4gW2Nvb3Jkc1swXSwgY29vcmRzWzFdIC0gMl07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGRpc2FwcGVhcldhbGxzKCkge1xyXG4gICAgICAgIHRoaXMucGFzc2FnZXMuZm9yRWFjaCgocGFzc2FnZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhc3NhZ2VbMF0gIT0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY29vcmRzQXJyYXlJbmRleGVzWzBdIC8gMiB8fFxyXG4gICAgICAgICAgICAgICAgcGFzc2FnZVsxXSAhPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXNbMV0gLyAyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwYXNzYWdlWzJdLmZvckVhY2goKGJsb2NrQ29vcmRzLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhibG9ja0Nvb3JkcywgMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZml4V2FsbHMoKTtcclxuICAgIH1cclxuICAgIGZpeFdhbGxzKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfciwgX3MsIF90LCBfdSwgX3YsIF93LCBfeCwgX3ksIF96LCBfMCwgXzEsIF8yLCBfMywgXzQsIF81LCBfNiwgXzcsIF84LCBfOSwgXzEwLCBfMTEsIF8xMiwgXzEzLCBfMTQsIF8xNSwgXzE2LCBfMTcsIF8xOCwgXzE5LCBfMjAsIF8yMSwgXzIyLCBfMjMsIF8yNCwgXzI1LCBfMjYsIF8yNywgXzI4LCBfMjksIF8zMCwgXzMxLCBfMzIsIF8zMywgXzM0LCBfMzUsIF8zNiwgXzM3LCBfMzgsIF8zOSwgXzQwLCBfNDEsIF80MiwgXzQzLCBfNDQsIF80NSwgXzQ2LCBfNDcsIF80OCwgXzQ5LCBfNTAsIF81MSwgXzUyLCBfNTMsIF81NCwgXzU1LCBfNTYsIF81NywgXzU4LCBfNTksIF82MCwgXzYxLCBfNjIsIF82MywgXzY0LCBfNjUsIF82NiwgXzY3LCBfNjgsIF82OSwgXzcwLCBfNzEsIF83MiwgXzczLCBfNzQsIF83NSwgXzc2LCBfNzcsIF83OCwgXzc5LCBfODAsIF84MSwgXzgyLCBfODMsIF84NCwgXzg1LCBfODYsIF84NywgXzg4LCBfODksIF85MCwgXzkxLCBfOTIsIF85MywgXzk0LCBfOTUsIF85NiwgXzk3LCBfOTgsIF85OSwgXzEwMCwgXzEwMSwgXzEwMiwgXzEwMywgXzEwNCwgXzEwNSwgXzEwNiwgXzEwNztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZZQmxvY2tzICogMjsgaSA9IGkgKyAyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5udW1iZXJPZlhCbG9ja3MgKiAyOyBqID0gaiArIDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtqXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW2ldKSA+PSA0ICYmICgoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW2pdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbaV0pIDw9IDE5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF9mID0gKF9lID0gdGhpcy5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVtqIC0gMl0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZltpXSkgJiYgIUNvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoX2ggPSAoX2cgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW2ogKyAyXSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oW2ldKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfayA9IChfaiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2pbal0pID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfa1tpIC0gMl0pICYmICFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF9tID0gKF9sID0gdGhpcy5tYXApID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbFtqXSkgPT09IG51bGwgfHwgX20gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9tW2kgKyAyXSkgJiYgdGhpcy5tYXBbal1baV0gIT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCbG9jazIoW2ksIGpdLCA0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfcCA9IChfbyA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29baiAtIDJdKSA9PT0gbnVsbCB8fCBfcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3BbaV0pICYmICFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF9yID0gKF9xID0gdGhpcy5tYXApID09PSBudWxsIHx8IF9xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcVtqICsgMl0pID09PSBudWxsIHx8IF9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcltpXSkgJiYgIUNvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoX3QgPSAoX3MgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgX3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zW2pdKSA9PT0gbnVsbCB8fCBfdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RbaSAtIDJdKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfdiA9IChfdSA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfdSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3Vbal0pID09PSBudWxsIHx8IF92ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdltpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmxvY2syKFtpLCBqXSwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF94ID0gKF93ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfd1tqIC0gMl0pID09PSBudWxsIHx8IF94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfeFtpXSkgJiYgIUNvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoX3ogPSAoX3kgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgX3kgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF95W2ogKyAyXSkgPT09IG51bGwgfHwgX3ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF96W2ldKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMSA9IChfMCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfMCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzBbal0pID09PSBudWxsIHx8IF8xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMVtpIC0gMl0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzMgPSAoXzIgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8yW2pdKSA9PT0gbnVsbCB8fCBfMyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzNbaSArIDJdKSAmJiB0aGlzLm1hcFtqXVtpXSAhPT0gNikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJsb2NrMihbaSwgal0sIDYpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNSA9IChfNCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfNCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzRbaiAtIDJdKSA9PT0gbnVsbCB8fCBfNSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzVbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzcgPSAoXzYgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF82W2ogKyAyXSkgPT09IG51bGwgfHwgXzcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF83W2ldKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfOSA9IChfOCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfOCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzhbal0pID09PSBudWxsIHx8IF85ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfOVtpIC0gMl0pICYmICFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF8xMSA9IChfMTAgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzEwID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMTBbal0pID09PSBudWxsIHx8IF8xMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzExW2kgKyAyXSkgJiYgdGhpcy5tYXBbal1baV0gIT09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCbG9jazIoW2ksIGpdLCA3KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIUNvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzEzID0gKF8xMiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfMTIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8xMltqIC0gMl0pID09PSBudWxsIHx8IF8xMyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzEzW2ldKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMTUgPSAoXzE0ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8xNCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzE0W2ogKyAyXSkgPT09IG51bGwgfHwgXzE1ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMTVbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzE3ID0gKF8xNiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfMTYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8xNltqXSkgPT09IG51bGwgfHwgXzE3ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMTdbaSAtIDJdKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMTkgPSAoXzE4ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8xOCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzE4W2pdKSA9PT0gbnVsbCB8fCBfMTkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8xOVtpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmxvY2syKFtpLCBqXSwgOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF8yMSA9IChfMjAgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzIwID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMjBbaiAtIDJdKSA9PT0gbnVsbCB8fCBfMjEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8yMVtpXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMjMgPSAoXzIyID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8yMiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzIyW2ogKyAyXSkgPT09IG51bGwgfHwgXzIzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMjNbaV0pICYmICFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF8yNSA9IChfMjQgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzI0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMjRbal0pID09PSBudWxsIHx8IF8yNSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzI1W2kgLSAyXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMjcgPSAoXzI2ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8yNiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzI2W2pdKSA9PT0gbnVsbCB8fCBfMjcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8yN1tpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmxvY2syKFtpLCBqXSwgOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF8yOSA9IChfMjggPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzI4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMjhbaiAtIDJdKSA9PT0gbnVsbCB8fCBfMjkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8yOVtpXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMzEgPSAoXzMwID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8zMCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzMwW2ogKyAyXSkgPT09IG51bGwgfHwgXzMxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMzFbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzMzID0gKF8zMiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfMzIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8zMltqXSkgPT09IG51bGwgfHwgXzMzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMzNbaSAtIDJdKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMzUgPSAoXzM0ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8zNCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzM0W2pdKSA9PT0gbnVsbCB8fCBfMzUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8zNVtpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJsb2NrMihbaSwgal0sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMzcgPSAoXzM2ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8zNiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzM2W2ogLSAyXSkgPT09IG51bGwgfHwgXzM3ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMzdbaV0pICYmICFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF8zOSA9IChfMzggPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzM4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMzhbaiArIDJdKSA9PT0gbnVsbCB8fCBfMzkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8zOVtpXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNDEgPSAoXzQwID0gdGhpcy5tYXApID09PSBudWxsIHx8IF80MCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzQwW2pdKSA9PT0gbnVsbCB8fCBfNDEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF80MVtpIC0gMl0pICYmICFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF80MyA9IChfNDIgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzQyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNDJbal0pID09PSBudWxsIHx8IF80MyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzQzW2kgKyAyXSkgJiYgdGhpcy5tYXBbal1baV0gIT09IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmxvY2syKFtpLCBqXSwgMTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF80NSA9IChfNDQgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzQ0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNDRbaiAtIDJdKSA9PT0gbnVsbCB8fCBfNDUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF80NVtpXSkgJiYgIUNvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzQ3ID0gKF80NiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfNDYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF80NltqICsgMl0pID09PSBudWxsIHx8IF80NyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzQ3W2ldKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNDkgPSAoXzQ4ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF80OCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzQ4W2pdKSA9PT0gbnVsbCB8fCBfNDkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF80OVtpIC0gMl0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzUxID0gKF81MCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfNTAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF81MFtqXSkgPT09IG51bGwgfHwgXzUxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNTFbaSArIDJdKSAmJiB0aGlzLm1hcFtqXVtpXSAhPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCbG9jazIoW2ksIGpdLCAxMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF81MyA9IChfNTIgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzUyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNTJbaiAtIDJdKSA9PT0gbnVsbCB8fCBfNTMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF81M1tpXSkgJiYgIUNvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzU1ID0gKF81NCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfNTQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF81NFtqICsgMl0pID09PSBudWxsIHx8IF81NSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzU1W2ldKSAmJiBDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF81NyA9IChfNTYgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzU2ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNTZbal0pID09PSBudWxsIHx8IF81NyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzU3W2kgLSAyXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNTkgPSAoXzU4ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF81OCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzU4W2pdKSA9PT0gbnVsbCB8fCBfNTkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF81OVtpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJsb2NrMihbaSwgal0sIDEzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNjEgPSAoXzYwID0gdGhpcy5tYXApID09PSBudWxsIHx8IF82MCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzYwW2ogLSAyXSkgPT09IG51bGwgfHwgXzYxID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNjFbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzYzID0gKF82MiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfNjIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF82MltqICsgMl0pID09PSBudWxsIHx8IF82MyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzYzW2ldKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNjUgPSAoXzY0ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF82NCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzY0W2pdKSA9PT0gbnVsbCB8fCBfNjUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF82NVtpIC0gMl0pICYmICFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF82NyA9IChfNjYgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzY2ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNjZbal0pID09PSBudWxsIHx8IF82NyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzY3W2kgKyAyXSkgJiYgdGhpcy5tYXBbal1baV0gIT09IDE0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmxvY2syKFtpLCBqXSwgMTQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF82OSA9IChfNjggPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzY4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNjhbaiAtIDJdKSA9PT0gbnVsbCB8fCBfNjkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF82OVtpXSkgJiYgIUNvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzcxID0gKF83MCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfNzAgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF83MFtqICsgMl0pID09PSBudWxsIHx8IF83MSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzcxW2ldKSAmJiBDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF83MyA9IChfNzIgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzcyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNzJbal0pID09PSBudWxsIHx8IF83MyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzczW2kgLSAyXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNzUgPSAoXzc0ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF83NCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzc0W2pdKSA9PT0gbnVsbCB8fCBfNzUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF83NVtpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJsb2NrMihbaSwgal0sIDE1KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfNzcgPSAoXzc2ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF83NiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzc2W2ogLSAyXSkgPT09IG51bGwgfHwgXzc3ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNzdbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzc5ID0gKF83OCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfNzggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF83OFtqICsgMl0pID09PSBudWxsIHx8IF83OSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzc5W2ldKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfODEgPSAoXzgwID0gdGhpcy5tYXApID09PSBudWxsIHx8IF84MCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzgwW2pdKSA9PT0gbnVsbCB8fCBfODEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF84MVtpIC0gMl0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzgzID0gKF84MiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfODIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF84MltqXSkgPT09IG51bGwgfHwgXzgzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfODNbaSArIDJdKSAmJiB0aGlzLm1hcFtqXVtpXSAhPT0gMTYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRCbG9jazIoW2ksIGpdLCAxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF84NSA9IChfODQgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzg0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfODRbaiAtIDJdKSA9PT0gbnVsbCB8fCBfODUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF84NVtpXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfODcgPSAoXzg2ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF84NiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzg2W2ogKyAyXSkgPT09IG51bGwgfHwgXzg3ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfODdbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzg5ID0gKF84OCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfODggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF84OFtqXSkgPT09IG51bGwgfHwgXzg5ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfODlbaSAtIDJdKSAmJiBDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF85MSA9IChfOTAgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzkwID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfOTBbal0pID09PSBudWxsIHx8IF85MSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzkxW2kgKyAyXSkgJiYgdGhpcy5tYXBbal1baV0gIT09IDE3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QmxvY2syKFtpLCBqXSwgMTcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF85MyA9IChfOTIgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzkyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfOTJbaiAtIDJdKSA9PT0gbnVsbCB8fCBfOTMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF85M1tpXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfOTUgPSAoXzk0ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF85NCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzk0W2ogKyAyXSkgPT09IG51bGwgfHwgXzk1ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfOTVbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzk3ID0gKF85NiA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfOTYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF85NltqXSkgPT09IG51bGwgfHwgXzk3ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfOTdbaSAtIDJdKSAmJiAhQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfOTkgPSAoXzk4ID0gdGhpcy5tYXApID09PSBudWxsIHx8IF85OCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzk4W2pdKSA9PT0gbnVsbCB8fCBfOTkgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF85OVtpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSAxOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJsb2NrMihbaSwgal0sIDE4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMTAxID0gKF8xMDAgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzEwMCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzEwMFtqIC0gMl0pID09PSBudWxsIHx8IF8xMDEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8xMDFbaV0pICYmIENvbnN0c18xLmJsb2NrQ29kZXMuaW5kZXN0cnVjdGlibGVXYWxscy5pbmNsdWRlcygoXzEwMyA9IChfMTAyID0gdGhpcy5tYXApID09PSBudWxsIHx8IF8xMDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8xMDJbaiArIDJdKSA9PT0gbnVsbCB8fCBfMTAzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMTAzW2ldKSAmJiBDb25zdHNfMS5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHMuaW5jbHVkZXMoKF8xMDUgPSAoXzEwNCA9IHRoaXMubWFwKSA9PT0gbnVsbCB8fCBfMTA0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMTA0W2pdKSA9PT0gbnVsbCB8fCBfMTA1ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMTA1W2kgLSAyXSkgJiYgQ29uc3RzXzEuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLmluY2x1ZGVzKChfMTA3ID0gKF8xMDYgPSB0aGlzLm1hcCkgPT09IG51bGwgfHwgXzEwNiA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzEwNltqXSkgPT09IG51bGwgfHwgXzEwNyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzEwN1tpICsgMl0pICYmIHRoaXMubWFwW2pdW2ldICE9PSAxOSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEJsb2NrMihbaSwgal0sIDE5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gR2FtZU1hcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgQ2FudmFzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQ2FudmFzXCIpKTtcclxuY2xhc3MgSGVscGVycyB7XHJcbiAgICBnZXRTdGFydEluZGV4ZXMoKSB7XHJcbiAgICAgICAgbGV0IHggPSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggLSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggJSA4MDtcclxuICAgICAgICBsZXQgeSA9IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSAtIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSAlIDgwO1xyXG4gICAgICAgIHJldHVybiB7IHg6IHggLyA4MCwgeTogeSAvIDgwIH07XHJcbiAgICB9XHJcbiAgICBnZXRTdGFydEluZGV4ZXMyKCkge1xyXG4gICAgICAgIGxldCB4ID0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYIC0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYICUgNDA7XHJcbiAgICAgICAgbGV0IHkgPSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgLSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgJSA0MDtcclxuICAgICAgICByZXR1cm4geyB4OiB4IC8gNDAsIHk6IHkgLyA0MCB9O1xyXG4gICAgfVxyXG4gICAgcmVwbGFjZUNvbG9ySW5DYW52YXMoY2FudmFzLCBzb3VyY2VDb2xvciwgdGFyZ2V0Q29sb3IsIHRvbGVyYW5jZSkge1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIGlmICghY3R4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gR2V0IHRoZSBjYW52YXMgZGltZW5zaW9uc1xyXG4gICAgICAgIGNvbnN0IHdpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuIGltYWdlIGRhdGEgb2JqZWN0XHJcbiAgICAgICAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XHJcbiAgICAgICAgLy8gQ29udmVydCB0aGUgc291cmNlIGFuZCB0YXJnZXQgY29sb3JzIHRvIFJHQiBmb3JtYXRcclxuICAgICAgICBjb25zdCBzb3VyY2VSR0IgPSB0aGlzLmhleFRvUkdCKHNvdXJjZUNvbG9yKTtcclxuICAgICAgICBjb25zdCB0YXJnZXRSR0IgPSB0aGlzLmhleFRvUkdCKHRhcmdldENvbG9yKTtcclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbG9yIGRpZmZlcmVuY2UgdGhyZXNob2xkXHJcbiAgICAgICAgY29uc3QgdGhyZXNob2xkID0gTWF0aC5zcXJ0KDMgKiB0b2xlcmFuY2UgKiB0b2xlcmFuY2UpO1xyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBpeGVsIGluIHRoZSBjYW52YXNcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcclxuICAgICAgICAgICAgY29uc3QgciA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IGcgPSBkYXRhW2kgKyAxXTtcclxuICAgICAgICAgICAgY29uc3QgYiA9IGRhdGFbaSArIDJdO1xyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbG9yIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgcGl4ZWwgYW5kIHRoZSBzb3VyY2UgY29sb3JcclxuICAgICAgICAgICAgY29uc3QgY29sb3JEaWZmZXJlbmNlID0gdGhpcy5jYWxjdWxhdGVDb2xvckRpZmZlcmVuY2Uoc291cmNlUkdCLCB7IHIsIGcsIGIgfSk7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBjb2xvciBkaWZmZXJlbmNlIGlzIHdpdGhpbiB0aGUgdG9sZXJhbmNlLCByZXBsYWNlIHRoZSBjb2xvclxyXG4gICAgICAgICAgICBpZiAoY29sb3JEaWZmZXJlbmNlIDw9IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpXSA9IHRhcmdldFJHQi5yO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpICsgMV0gPSB0YXJnZXRSR0IuZztcclxuICAgICAgICAgICAgICAgIGRhdGFbaSArIDJdID0gdGFyZ2V0UkdCLmI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUHV0IHRoZSBtb2RpZmllZCBpbWFnZSBkYXRhIGJhY2sgdG8gdGhlIGNhbnZhc1xyXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1hZ2VEYXRhLCAwLCAwKTtcclxuICAgIH1cclxuICAgIGhleFRvUkdCKGhleCkge1xyXG4gICAgICAgIGhleCA9IGhleC5yZXBsYWNlKC9eIy8sICcnKTtcclxuICAgICAgICBjb25zdCBiaWdpbnQgPSBwYXJzZUludChoZXgsIDE2KTtcclxuICAgICAgICBjb25zdCByID0gKGJpZ2ludCA+PiAxNikgJiAyNTU7XHJcbiAgICAgICAgY29uc3QgZyA9IChiaWdpbnQgPj4gOCkgJiAyNTU7XHJcbiAgICAgICAgY29uc3QgYiA9IGJpZ2ludCAmIDI1NTtcclxuICAgICAgICByZXR1cm4geyByLCBnLCBiIH07XHJcbiAgICB9XHJcbiAgICBjYWxjdWxhdGVDb2xvckRpZmZlcmVuY2UoY29sb3IxLCBjb2xvcjIpIHtcclxuICAgICAgICBjb25zdCBkciA9IGNvbG9yMS5yIC0gY29sb3IyLnI7XHJcbiAgICAgICAgY29uc3QgZGcgPSBjb2xvcjEuZyAtIGNvbG9yMi5nO1xyXG4gICAgICAgIGNvbnN0IGRiID0gY29sb3IxLmIgLSBjb2xvcjIuYjtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGRyICogZHIgKyBkZyAqIGRnICsgZGIgKiBkYik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEhlbHBlcnMoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBIZWxwZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGVscGVyc1wiKSk7XHJcbmNsYXNzIEltYWdlcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9hc3NldHMgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgZ2V0IGFzc2V0cygpIHtcclxuICAgICAgICBpZiAodGhpcy5fYXNzZXRzID09PSBudWxsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhY2Nlc3MgYXNzZXRzIHdoaWNoIGFyZSBub3QgbG9hZGVkLicpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hc3NldHM7XHJcbiAgICB9XHJcbiAgICBsb2FkSW1hZ2VzKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFthYmlsaXR5VGV4dHMsIGJpZ051bWJlcnMsIGl0ZW1zLCBzcGVjaWFsSXRlbXMsIGxldmVsVGl0bGVTY3JlZW4sIG1haW5DaGFyYWN0ZXJzLCBtb25zdGVycywgbnVtYmVycywgcGlja1VwQWJpbGl0eVNjcmVlbiwgc3RhcnRTY3JlZW4sIHdhbGxzLCB3YWxsc09yaWdpbiwgd2VhcG9uc10gPSB5aWVsZCBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwiYWJpbGl0eVRleHRzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJiaWdOdW1iZXJzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJpdGVtcy5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwic3BlY2lhbEl0ZW1zLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJsZXZlbFRpdGxlU2NyZWVuLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJtYWluQ2hhcmFjdGVycy5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwibW9uc3RlcnMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcIm51bWJlcnMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcInBpY2tVcEFiaWxpdHlTY3JlZW4ucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcInN0YXJ0U2NyZWVuLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJ3YWxscy5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwid2FsbHMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcIndlYXBvbnMucG5nXCIpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB0aGlzLl9hc3NldHMgPSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5VGV4dHMsXHJcbiAgICAgICAgICAgICAgICBiaWdOdW1iZXJzLFxyXG4gICAgICAgICAgICAgICAgaXRlbXMsXHJcbiAgICAgICAgICAgICAgICBzcGVjaWFsSXRlbXMsXHJcbiAgICAgICAgICAgICAgICBsZXZlbFRpdGxlU2NyZWVuLFxyXG4gICAgICAgICAgICAgICAgbWFpbkNoYXJhY3RlcnMsXHJcbiAgICAgICAgICAgICAgICBtb25zdGVycyxcclxuICAgICAgICAgICAgICAgIG51bWJlcnMsXHJcbiAgICAgICAgICAgICAgICBwaWNrVXBBYmlsaXR5U2NyZWVuLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRTY3JlZW4sXHJcbiAgICAgICAgICAgICAgICB3ZWFwb25zLFxyXG4gICAgICAgICAgICAgICAgYm90dG9tQmFyOiBuZXcgSW1hZ2UoKSxcclxuICAgICAgICAgICAgICAgIHdhbGxzLFxyXG4gICAgICAgICAgICAgICAgd2FsbHNPcmlnaW5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGltYWdlTG9hZGVyKGZpbGVOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGhvdG8gPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIHBob3RvLnNyYyA9IFwiaW1hZ2VzL1wiICsgZmlsZU5hbWU7XHJcbiAgICAgICAgICAgICAgICBwaG90by5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHBob3RvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBsb2FkV2FsbHNUeXBlQW5kQ29sb3Iod2FsbHNDb2xvciwgd2FsbHNUeXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDMyMjtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDE2O1xyXG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYXNzZXRzLndhbGxzT3JpZ2luLCAwLCAxNyAqIHdhbGxzVHlwZSwgMzIyLCAxNiwgMCwgMCwgMzIyLCAxNik7XHJcbiAgICAgICAgICAgIEhlbHBlcnNfMS5kZWZhdWx0LnJlcGxhY2VDb2xvckluQ2FudmFzKGNhbnZhcywgXCIjNjA0OWVkXCIsIHdhbGxzQ29sb3IsIDMwKTtcclxuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICAgICAgICBpbWcuc3JjID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYXNzZXRzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hc3NldHMud2FsbHMgPSBpbWc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEltYWdlcygpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkRpcmVjdGlvbnMgPSB2b2lkIDA7XHJcbnZhciBEaXJlY3Rpb25zO1xyXG4oZnVuY3Rpb24gKERpcmVjdGlvbnMpIHtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIlRPUFwiXSA9IDBdID0gXCJUT1BcIjtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIlRPUF9SSUdIVFwiXSA9IDFdID0gXCJUT1BfUklHSFRcIjtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIlJJR0hUXCJdID0gMl0gPSBcIlJJR0hUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJCT1RUT01fUklHSFRcIl0gPSAzXSA9IFwiQk9UVE9NX1JJR0hUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJCT1RUT01cIl0gPSA0XSA9IFwiQk9UVE9NXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJCT1RUT01fTEVGVFwiXSA9IDVdID0gXCJCT1RUT01fTEVGVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiTEVGVFwiXSA9IDZdID0gXCJMRUZUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJUT1BfTEVGVFwiXSA9IDddID0gXCJUT1BfTEVGVFwiO1xyXG59KShEaXJlY3Rpb25zID0gZXhwb3J0cy5EaXJlY3Rpb25zIHx8IChleHBvcnRzLkRpcmVjdGlvbnMgPSB7fSkpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY2xhc3MgS2V5Ym9hcmRFdmVudHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5XS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ES2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3BhY2VLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlRXZlbnRzID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlRXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGFja09mQ2xpY2tzLmluY2x1ZGVzKFwiV1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJXXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5U1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YWNrT2ZDbGlja3MuaW5jbHVkZXMoXCJTXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3MucHVzaChcIlNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFLZXlDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIkFcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5wdXNoKFwiQVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleURcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGFja09mQ2xpY2tzLmluY2x1ZGVzKFwiRFwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJEXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiU3BhY2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3BhY2VLZXlDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVFdmVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5V1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5XS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5zcGxpY2UodGhpcy5zdGFja09mQ2xpY2tzLmluZGV4T2YoXCJXXCIpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiU1wiKSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkFLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnNwbGljZSh0aGlzLnN0YWNrT2ZDbGlja3MuaW5kZXhPZihcIkFcIiksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5RFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ES2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5zcGxpY2UodGhpcy5zdGFja09mQ2xpY2tzLmluZGV4T2YoXCJEXCIpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIlNwYWNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TcGFjZUtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleUNcIilcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyTWFwRnJvbU1vbnN0ZXJzQW5kU3Bhd25lcnModHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2xlYW5FdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5XS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkFLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ES2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3BhY2VLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzID0gW107XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEtleWJvYXJkRXZlbnRzKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IEtleWJvYXJkRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vS2V5Ym9hcmRFdmVudHNcIikpO1xyXG5jb25zdCBQcm9qZWN0aWxlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vUHJvamVjdGlsZVwiKSk7XHJcbmNvbnN0IENvbnN0c18xID0gcmVxdWlyZShcIi4vQ29uc3RzXCIpO1xyXG5jb25zdCBTb3VuZHNIYW5kbGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU291bmRzSGFuZGxlclwiKSk7XHJcbmNvbnN0IFNvcmNlcmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvU29yY2VyZXJcIikpO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZVwiKSk7XHJcbmNvbnN0IG1vdmUgPSAyO1xyXG5jbGFzcyBNYWluQ2hhcmFjdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc291cmNlQ29sID0gMDtcclxuICAgICAgICB0aGlzLnNjb3JlID0gMjA7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggPSAyMDAwO1xyXG4gICAgICAgIHRoaXMub3duZWRBYmlsaXRpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmtleXMgPSAwO1xyXG4gICAgICAgIHRoaXMucG90aW9ucyA9IDA7XHJcbiAgICAgICAgdGhpcy54Q29vcmQgPSAwO1xyXG4gICAgICAgIHRoaXMueUNvb3JkID0gMDtcclxuICAgICAgICB0aGlzLnhWZWxvY2l0eSA9IDE2O1xyXG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMTY7XHJcbiAgICAgICAgdGhpcy5jb29yZHNBcnJheUluZGV4ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID0gMTY7XHJcbiAgICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uID0gWzQsIDBdO1xyXG4gICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gNTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lID0gMztcclxuICAgICAgICB0aGlzLnRoaXJkRnJhbWUgPSAxO1xyXG4gICAgICAgIHRoaXMuX2xvc2luZ0hQSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMud2VhcG9uID0gbmV3IFByb2plY3RpbGVfMS5kZWZhdWx0KHRoaXMuc291cmNlQ29sLCAwLCAwLCAwKTtcclxuICAgIH1cclxuICAgIGdldCBsb3NpbmdIUEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9sb3NpbmdIUEludGVydmFsID09PSBudWxsKVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhY2Nlc3MgaW50ZXJ2YWwnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9zaW5nSFBJbnRlcnZhbDtcclxuICAgIH1cclxuICAgIHN0YXJ0TG9zaW5nSFBJbnRlcnZhbCgpIHtcclxuICAgICAgICB0aGlzLl9sb3NpbmdIUEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUhlYWx0aCgtMSk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcbiAgICBzdG9wTG9zaW5nSFBJbnRlcnZhbCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMubG9zaW5nSFBJbnRlcnZhbCk7XHJcbiAgICB9XHJcbiAgICBjaGVja0lmUGxheWVySXNEZWFkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKVxyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnRpbWVzVXAoKTtcclxuICAgIH1cclxuICAgIGFuaW1hdGVQcm9qZWN0aWxlKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xyXG4gICAgICAgIGlmICh0aGlzLndlYXBvbi54UG9zaXRpb24gPCBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggLSA4MCB8fFxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gPiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggKyBDYW52YXNfMS5kZWZhdWx0LndpZHRoIHx8XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiA+IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSArIENhbnZhc18xLmRlZmF1bHQuaGVpZ2h0IHx8XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiA8IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSAtIDgwKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi50aHJvd24gPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBQcm9qZWN0aWxlQ29vcmRzID0gdGhpcy5nZXRDb29yZGluYXRlczQodGhpcy53ZWFwb24ueFBvc2l0aW9uICsgMjAsIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArIDIwKTtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuYmxvY2tHcm91cHMubm9UcmFuc2l0aW9uRm9yUHJvamVjdGlsZS5pbmNsdWRlcygoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW1Byb2plY3RpbGVDb29yZHNbMV0gKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW1Byb2plY3RpbGVDb29yZHNbMF0gKiAyXSkpXHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpbnZpc2libGVTb3JjZXJlckhpdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChDb25zdHNfMS5ibG9ja0dyb3Vwcy5tb25zdGVycy5pbmNsdWRlcygoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW1Byb2plY3RpbGVDb29yZHNbMV0gKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW1Byb2plY3RpbGVDb29yZHNbMF0gKiAyXSkpIHtcclxuICAgICAgICAgICAgbGV0IGtpbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZNb25zdGVycyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZk1vbnN0ZXJzLmZpbHRlcigobW9uc3RlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtpbGxlZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICgobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gKyAxID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiAtIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICsgMSAmJiBtb25zdGVyLnlQb3NpdGlvbiArIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIuc291cmNlQ29sdW1uID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBraWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIgaW5zdGFuY2VvZiBTb3JjZXJlcl8xLmRlZmF1bHQgJiYgbW9uc3Rlci5pc1Zpc2libGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludmlzaWJsZVNvcmNlcmVySGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuZGllKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZHb2JsaW5zID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mR29ibGlucy5maWx0ZXIoKG1vbnN0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChraWxsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiAtIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uICsgMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gLSAxID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiArIDEgJiYgbW9uc3Rlci55UG9zaXRpb24gKyAxID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuZGllKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoaW52aXNpYmxlU29yY2VyZXJIaXQgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChDb25zdHNfMS5ibG9ja0dyb3Vwcy5kZXN0cm95YWJsZVRoaW5ncy5pbmNsdWRlcygoX2YgPSAoX2UgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lW1Byb2plY3RpbGVDb29yZHNbMV0gKiAyXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mW1Byb2plY3RpbGVDb29yZHNbMF0gKiAyXSkpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95VGhpbmcoUHJvamVjdGlsZUNvb3JkcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMud2VhcG9uLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gdGhpcy53ZWFwb24uZGlyZWN0aW9uO1xyXG4gICAgICAgIGxldCBzcGVlZCA9IDQ7XHJcbiAgICAgICAgaWYgKFsyLCAzLCA0XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFs2LCA3LCA4XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gLT0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFs4LCAxLCAyXS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gLT0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFs0LCA1LCA2XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlQ29sICE9IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy53ZWFwb24uYW5pbWF0aW9uVGltZXN0YW1wICUgNCA9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi5mcmFtZSsrO1xyXG4gICAgICAgIHRoaXMud2VhcG9uLmFuaW1hdGlvblRpbWVzdGFtcCsrO1xyXG4gICAgICAgIGlmICh0aGlzLndlYXBvbi5mcmFtZSA9PSA4KVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi5mcmFtZSA9IDA7XHJcbiAgICB9XHJcbiAgICB0aHJvd1dlYXBvbigpIHtcclxuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHRoaXMud2VhcG9uLmxhc3RUaW1lVGhyZXcgPCAxNTApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLndlYXBvbi5sYXN0VGltZVRocmV3ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLndlYXBvbi50aHJvd24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMud2VhcG9uLmZyYW1lID0gdGhpcy5sYXN0RGlyZWN0aW9uWzBdO1xyXG4gICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiA9IHRoaXMueENvb3JkO1xyXG4gICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiA9IHRoaXMueUNvb3JkO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5sYXN0RGlyZWN0aW9uWzBdKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gMTk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDQwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSA0MDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSA0MDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gNDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDE5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vdGhpcy53ZWFwb24ueFBvc2l0aW9uKz0yMDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53ZWFwb24uZGlyZWN0aW9uID0gdGhpcy5sYXN0RGlyZWN0aW9uWzBdICsgMTtcclxuICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwid2VhcG9uVGhyZXdcIik7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VTY29yZShwb2ludHMpIHtcclxuICAgICAgICB0aGlzLnNjb3JlICs9IHBvaW50cztcclxuICAgIH1cclxuICAgIGNoYW5nZUhlYWx0aChwb2ludHMpIHtcclxuICAgICAgICB0aGlzLmhlYWx0aCArPSBwb2ludHM7XHJcbiAgICAgICAgdGhpcy5jaGVja0lmUGxheWVySXNEZWFkKCk7XHJcbiAgICB9XHJcbiAgICByZXNlcnZlQXJyYXkoKSB7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMuYWN0dWFsRGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzID0gdGhpcy5nZXRDb29yZGluYXRlczModGhpcy54Q29vcmQsIHRoaXMueUNvb3JkKTtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlcywgLTEpO1xyXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAtIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gKyAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAtIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gKyAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV1dLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gKyAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gKyAyKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0sIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMikpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gKyAyXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gLSAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSAtIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbmltYXRlQ2hhcmFjdGVyKCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tGb3JQaWNraW5nSXRlbXMoKTtcclxuICAgICAgICBpZiAodGhpcy53ZWFwb24udGhyb3duKVxyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGVQcm9qZWN0aWxlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE1vdmVUaW1lc3RhbXAgPT09IDE2KSB7XHJcbiAgICAgICAgICAgIGlmIChLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuU3BhY2VLZXlDbGlja2VkICYmIHRoaXMud2VhcG9uLnRocm93biA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aHJvd1dlYXBvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBhdmFpbGFibGVEaXJlY3Rpb25zID0gdGhpcy5jaGVja0ZvckNvbGxpc2lvbnMoKTtcclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbnMgPSB0aGlzLmNoZWNrRGlyZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb25zLmxlbmd0aCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uWzBdID0gdGhpcy50d29EaXJlY3Rpb25zSW50b09uZShkaXJlY3Rpb25zKSAtIDE7XHJcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb25zQ29weSA9IFsuLi5kaXJlY3Rpb25zXTtcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5mb3JFYWNoKGRpciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09PSAxICYmIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zQ29weS5zcGxpY2UoZGlyZWN0aW9uc0NvcHkuaW5kZXhPZigxKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09PSAzICYmIGF2YWlsYWJsZURpcmVjdGlvbnMucmlnaHQgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnNDb3B5LnNwbGljZShkaXJlY3Rpb25zQ29weS5pbmRleE9mKDMpLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXIgPT09IDUgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b20gPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnNDb3B5LnNwbGljZShkaXJlY3Rpb25zQ29weS5pbmRleE9mKDUpLCAxKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXIgPT09IDcgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy5sZWZ0ID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zQ29weS5zcGxpY2UoZGlyZWN0aW9uc0NvcHkuaW5kZXhPZig3KSwgMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uc0NvcHkubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IHRoaXMudHdvRGlyZWN0aW9uc0ludG9PbmUoZGlyZWN0aW9uc0NvcHkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3R1YWxEaXJlY3Rpb24gPT0gMiAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcFJpZ2h0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMucmlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSAzO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3R1YWxEaXJlY3Rpb24gPT0gNCAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbVJpZ2h0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gNTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMucmlnaHQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSAzO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5hY3R1YWxEaXJlY3Rpb24gPT0gNiAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbUxlZnQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b20pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSA1O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5sZWZ0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gNztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0dWFsRGlyZWN0aW9uID09IDggJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy50b3BMZWZ0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDc7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wIDwgNCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RNb3ZlVGltZXN0YW1wICs9IG1vdmU7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUNoYXJhY3Rlcihtb3ZlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdE1vdmVUaW1lc3RhbXAgPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uWzFdID0gdGhpcy50aGlyZEZyYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE1vdmVUaW1lc3RhbXAgPCAxMikge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RNb3ZlVGltZXN0YW1wICs9IG1vdmU7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUNoYXJhY3Rlcihtb3ZlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdE1vdmVUaW1lc3RhbXAgPj0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdERpcmVjdGlvblsxXSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aGlyZEZyYW1lID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGlyZEZyYW1lID0gMjtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRoaXJkRnJhbWUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdE1vdmVUaW1lc3RhbXAgPCAxNikge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RNb3ZlVGltZXN0YW1wICs9IG1vdmU7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUNoYXJhY3Rlcihtb3ZlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdE1vdmVUaW1lc3RhbXAgPj0gMTYpIHtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jazIodGhpcy5jb29yZHNBcnJheUluZGV4ZXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb29yZHNBcnJheUluZGV4ZXMgPSB0aGlzLmdldENvb3JkaW5hdGVzMyh0aGlzLnhDb29yZCwgdGhpcy55Q29vcmQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXVt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXV0gPT09IENvbnN0c18xLmJsb2NrQ29kZXMuZXhpdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuZW5kT2ZMZXZlbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5wb3J0YWxzLmluY2x1ZGVzKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXVt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC50ZWxlcG9ydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5wYXNzYWdlcy5pbmNsdWRlcyhHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXV1bdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF1dKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuZGlzYXBwZWFyV2FsbHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlcywgLTEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzLCAtMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LnN0YWNrT2ZDbGlja3MubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LlNwYWNlS2V5Q2xpY2tlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCByZXMgPSB0aGlzLmNoZWNrRGlyZWN0aW9uKCk7XHJcbiAgICAgICAgbGV0IHJlczIgPSB0aGlzLnR3b0RpcmVjdGlvbnNJbnRvT25lKHJlcyk7XHJcbiAgICAgICAgdGhpcy5sYXN0RGlyZWN0aW9uWzBdID0gcmVzMiAtIDE7XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZXNlcnZlQXJyYXkoKTtcclxuICAgIH1cclxuICAgIGNoZWNrRm9yQ29sbGlzaW9ucygpIHtcclxuICAgICAgICBjb25zdCBDb29yZHMgPSB0aGlzLmdldENvb3JkaW5hdGVzKHRoaXMueENvb3JkLCB0aGlzLnlDb29yZCk7XHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZURpcmVjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRvcDogdHJ1ZSwgdG9wUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHJpZ2h0OiB0cnVlLCBib3R0b21SaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgYm90dG9tOiB0cnVlLCBib3R0b21MZWZ0OiB0cnVlLFxyXG4gICAgICAgICAgICBsZWZ0OiB0cnVlLCB0b3BMZWZ0OiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdIC0gMSwgQ29vcmRzWzBdKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSArIDEsIENvb3Jkc1swXSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0sIENvb3Jkc1swXSAtIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5sZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSwgQ29vcmRzWzBdICsgMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMucmlnaHQgPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgdGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdIC0gMSwgQ29vcmRzWzBdICsgMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcFJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMudG9wID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdCA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICB0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0gLSAxLCBDb29yZHNbMF0gLSAxKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSArIDEsIENvb3Jkc1swXSArIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21SaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQgPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgdGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdICsgMSwgQ29vcmRzWzBdIC0gMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbUxlZnQgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlRGlyZWN0aW9ucztcclxuICAgIH1cclxuICAgIGNoZWNrRm9yUGlja2luZ0l0ZW1zKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgQ29vcmRzID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnhDb29yZCwgdGhpcy55Q29vcmQpO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JbmRleCA9IChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbQ29vcmRzWzFdICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYltDb29yZHNbMF0gKiAyXTtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuYmxvY2tHcm91cHMucGlja2FibGVJdGVtcy5pbmNsdWRlcyhpdGVtSW5kZXgpKVxyXG4gICAgICAgICAgICB0aGlzLnBpY2tJdGVtKGl0ZW1JbmRleCwgQ29vcmRzKTtcclxuICAgIH1cclxuICAgIGlzRmllbGRDbGVhcih5LCB4KSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2osIF9rLCBfbCwgX20sIF9vLCBfcCwgX3EsIF9yLCBfcywgX3QsIF91LCBfdiwgX3csIF94LCBfeSwgX3osIF8wLCBfMSwgXzIsIF8zLCBfNCwgXzUsIF82LCBfNztcclxuICAgICAgICBpZiAoKCgoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3kgKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3ggKiAyXSkgPCAyNiAmJiAoKF9kID0gKF9jID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1t5ICogMl0pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZFt4ICogMl0pICE9IDApIHx8XHJcbiAgICAgICAgICAgICgoKF9mID0gKF9lID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2ZbeCAqIDJdKSA8IDI2ICYmICgoX2ggPSAoX2cgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nW3kgKiAyICsgMV0pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaFt4ICogMl0pICE9IDApIHx8XHJcbiAgICAgICAgICAgICgoKF9rID0gKF9qID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfalt5ICogMl0pID09PSBudWxsIHx8IF9rID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfa1t4ICogMiArIDFdKSA8IDI2ICYmICgoX20gPSAoX2wgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2wgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9sW3kgKiAyXSkgPT09IG51bGwgfHwgX20gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9tW3ggKiAyICsgMV0pICE9IDApIHx8XHJcbiAgICAgICAgICAgICgoKF9wID0gKF9vID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9vID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfb1t5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3BbeCAqIDIgKyAxXSkgPCAyNiAmJiAoKF9yID0gKF9xID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcVt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3JbeCAqIDIgKyAxXSkgIT0gMCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF90ID0gKF9zID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfc1t5ICogMl0pID09PSBudWxsIHx8IF90ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdFt4ICogMl0pKSAmJlxyXG4gICAgICAgICAgICAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5nbGFzcy5pbmNsdWRlcygoX3YgPSAoX3UgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX3UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF91W3kgKiAyICsgMV0pID09PSBudWxsIHx8IF92ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdlt4ICogMl0pKSAmJlxyXG4gICAgICAgICAgICAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5nbGFzcy5pbmNsdWRlcygoX3ggPSAoX3cgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX3cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF93W3kgKiAyXSkgPT09IG51bGwgfHwgX3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF94W3ggKiAyICsgMV0pKSAmJlxyXG4gICAgICAgICAgICAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5nbGFzcy5pbmNsdWRlcygoX3ogPSAoX3kgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX3kgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF95W3kgKiAyICsgMV0pID09PSBudWxsIHx8IF96ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfelt4ICogMiArIDFdKSkgJiZcclxuICAgICAgICAgICAgdGhpcy5rZXlzID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF8xID0gKF8wID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF8wID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMFt5ICogMl0pID09PSBudWxsIHx8IF8xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMVt4ICogMl0pKSAmJlxyXG4gICAgICAgICAgICAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5nbGFzcy5pbmNsdWRlcygoXzMgPSAoXzIgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgXzIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF8yW3kgKiAyICsgMV0pID09PSBudWxsIHx8IF8zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfM1t4ICogMl0pKSAmJlxyXG4gICAgICAgICAgICAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5nbGFzcy5pbmNsdWRlcygoXzUgPSAoXzQgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgXzQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF80W3kgKiAyXSkgPT09IG51bGwgfHwgXzUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF81W3ggKiAyICsgMV0pKSAmJlxyXG4gICAgICAgICAgICAoQ29uc3RzXzEuYmxvY2tDb2Rlcy5nbGFzcy5pbmNsdWRlcygoXzcgPSAoXzYgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgXzYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF82W3kgKiAyICsgMV0pID09PSBudWxsIHx8IF83ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfN1t4ICogMiArIDFdKSkgJiZcclxuICAgICAgICAgICAgdGhpcy5rZXlzID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHR3b0RpcmVjdGlvbnNJbnRvT25lKGRpcmVjdGlvbnMpIHtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcygxKSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDMpKVxyXG4gICAgICAgICAgICByZXR1cm4gMjtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcygxKSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDcpKVxyXG4gICAgICAgICAgICByZXR1cm4gODtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcyg1KSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDMpKVxyXG4gICAgICAgICAgICByZXR1cm4gNDtcclxuICAgICAgICBpZiAoZGlyZWN0aW9ucy5pbmNsdWRlcyg1KSAmJiBkaXJlY3Rpb25zLmluY2x1ZGVzKDcpKVxyXG4gICAgICAgICAgICByZXR1cm4gNjtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3Rpb25zWzBdO1xyXG4gICAgfVxyXG4gICAgbW92ZUNoYXJhY3RlcihzcGVlZCkge1xyXG4gICAgICAgIC8vICA4IDEgMlxyXG4gICAgICAgIC8vIDcgIFggIDNcclxuICAgICAgICAvLyAgNiA1IDRcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gdGhpcy5hY3R1YWxEaXJlY3Rpb247XHJcbiAgICAgICAgaWYgKFsyLCAzLCA0XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLnhDb29yZCArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoWzYsIDcsIDhdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMueENvb3JkIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbOCwgMSwgMl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy55Q29vcmQgLT0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFs0LCA1LCA2XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLnlDb29yZCArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICB0aGlzLm1vdmVNYXAoKTtcclxuICAgIH1cclxuICAgIGNoZWNrRGlyZWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuc3RhY2tPZkNsaWNrcy5zbGljZSgpO1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb25zID0gW107XHJcbiAgICAgICAgaWYgKGFyci5pbmRleE9mKFwiV1wiKSA+IGFyci5pbmRleE9mKFwiU1wiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDEpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmRleE9mKFwiV1wiKSA8IGFyci5pbmRleE9mKFwiU1wiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDUpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmNsdWRlcyhcIldcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCgxKTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJTXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goNSk7XHJcbiAgICAgICAgaWYgKGFyci5pbmRleE9mKFwiQVwiKSA+IGFyci5pbmRleE9mKFwiRFwiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDcpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmRleE9mKFwiQVwiKSA8IGFyci5pbmRleE9mKFwiRFwiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDMpO1xyXG4gICAgICAgIGVsc2UgaWYgKGFyci5pbmNsdWRlcyhcIkFcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCg3KTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJEXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goMyk7XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbnM7XHJcbiAgICB9XHJcbiAgICBtb3ZlTWFwKCkge1xyXG4gICAgICAgIGxldCBnYW1lQ2FudmFzSGVpZ2h0ID0gQ2FudmFzXzEuZGVmYXVsdC5oZWlnaHQgLSAyMDA7XHJcbiAgICAgICAgbGV0IG1hcFggPSB0aGlzLnhDb29yZCArIDQwIC0gKENhbnZhc18xLmRlZmF1bHQud2lkdGggKyAxKSAvIDI7XHJcbiAgICAgICAgbGV0IG1hcFkgPSB0aGlzLnlDb29yZCArIDQwIC0gZ2FtZUNhbnZhc0hlaWdodCAvIDI7XHJcbiAgICAgICAgaWYgKG1hcFggPCAwKVxyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKG1hcFggKyBDYW52YXNfMS5kZWZhdWx0LndpZHRoID49IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAueFNpemVJblBpeGVscylcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC54U2l6ZUluUGl4ZWxzIC0gQ2FudmFzXzEuZGVmYXVsdC53aWR0aDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCA9IG1hcFg7XHJcbiAgICAgICAgaWYgKG1hcFkgPCAwKVxyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKG1hcFkgKyBnYW1lQ2FudmFzSGVpZ2h0ID49IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAueVNpemVJblBpeGVscylcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC55U2l6ZUluUGl4ZWxzIC0gZ2FtZUNhbnZhc0hlaWdodDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSA9IG1hcFk7XHJcbiAgICB9XHJcbiAgICBnZXRDb29yZGluYXRlcyh4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9ICh4ICsgNDAgLSAoeCArIDQwKSAlIDgwKSAvIDgwO1xyXG4gICAgICAgIGxldCB5SW5kZXggPSAoeSArIDQwIC0gKHkgKyA0MCkgJSA4MCkgLyA4MDtcclxuICAgICAgICByZXR1cm4gW3hJbmRleCwgeUluZGV4XTtcclxuICAgIH1cclxuICAgIGdldENvb3JkaW5hdGVzMih4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9IHggLyA0MDtcclxuICAgICAgICBsZXQgeUluZGV4ID0geSAvIDQwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vcmRpbmF0ZXMzKHgsIHkpIHtcclxuICAgICAgICBsZXQgeEluZGV4ID0gKHggLSB4ICUgNDApIC8gNDA7XHJcbiAgICAgICAgbGV0IHlJbmRleCA9ICh5IC0geSAlIDQwKSAvIDQwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vcmRpbmF0ZXM0KHgsIHkpIHtcclxuICAgICAgICBsZXQgeEluZGV4ID0gKHggLSB4ICUgODApIC8gODA7XHJcbiAgICAgICAgbGV0IHlJbmRleCA9ICh5IC0geSAlIDgwKSAvIDgwO1xyXG4gICAgICAgIHJldHVybiBbeEluZGV4LCB5SW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZGVzdHJveVRoaW5nKGNvb3JkcywgYWRkU2NvcmUpIHtcclxuICAgICAgICBjb25zdCBpdGVtSUQgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyXTtcclxuICAgICAgICBzd2l0Y2ggKGl0ZW1JRCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6IC8vZGVzdHJ1Y3RpYmxlIHdhbGwgMVxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhjb29yZHMsIDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjogLy9kZXN0cnVjdGlibGUgd2FsbCAyXHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrKGNvb3JkcywgMyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOiAvL2Rlc3RydWN0aWJsZSB3YWxsIDNcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjA6IC8vc21hbGwgZ2hvc3Qgc3Bhd25lclxyXG4gICAgICAgICAgICBjYXNlIDIxOlxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhckJsb2NrKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmRlbGV0ZVNwYXduZXIoY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGlmIChhZGRTY29yZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIyOiAvL2JpZyBnaG9zdCBzcGF3bmVyXHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrKGNvb3JkcywgMjApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkZFNjb3JlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjM6IC8vc21hbGwgdHJpcGxlIHNwYXduZXJcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2soY29vcmRzLCAyNSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyNDogLy9iaWcgdHJpcGxlIHNwYXduZXJcclxuICAgICAgICAgICAgY2FzZSAyNTpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5kZWxldGVTcGF3bmVyKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgY2FzZSAzNDpcclxuICAgICAgICAgICAgY2FzZSAzNTpcclxuICAgICAgICAgICAgY2FzZSAzNjpcclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzM6XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJNYXBGcm9tTW9uc3RlcnNBbmRTcGF3bmVycyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwaWNrSXRlbShpdGVtSW5kZXgsIGNvb3Jkcykge1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbUluZGV4KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMzk6IC8vYm94IC0gdHJlYXN1cmVcclxuICAgICAgICAgICAgY2FzZSA0MDogLy9ib3ggLSB0cmVhc3VyZVxyXG4gICAgICAgICAgICBjYXNlIDQxOiAvL2JveCAtIHRyZWFzdXJlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMua2V5OiAvLyBrZXlcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5cysrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcInBpY2tlZEtleVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMueWVsbG93Qm90dGxlOiAvL3llbGxvdyBib3R0bGUgLSBjaWRlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIZWFsdGgoMTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTAwKTtcclxuICAgICAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJwaWNrZWRJdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5tZWF0OiAvL2Zvb2RcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSGVhbHRoKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMubWVkYWxsaW9uOiAvL2FtdWxldFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcInBpY2tlZEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLm1hZ2ljUG90aW9uOiAvLyBibHVlIGVsaXhpclxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb3Rpb25zKys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMuZmlnaHRQb3dlclBvdGlvbjogLy8gbGlnaHRibHVlIGVsaXhpciA9IGZpZ2h0IHBvd2VyXHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5tYWdpY1Bvd2VyUG90aW9uOiAvLyBncmVlbiBlbGl4aXIgICAgID0gbWFnaWMgcG93ZXJcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmV4dHJhQXJtb3VyUG90aW9uOiAvLyB5ZWxsb3cgZWxpeGlyICAgID0gZXh0cmEgYXJtb3JcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmV4dHJhQ2FycnlpbmdBYmlsaXR5UG90aW9uOiAvLyBwdXJwbGUgZWxpeGlyICAgID0gY2FycnlpbmcgYWJpbGl0eVxyXG4gICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMuZXh0cmFTaG90UG93ZXI6IC8vIGJyb3duIGVsaXhpciAgICAgPSBzaG90IHBvd2VyXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3duZWRBYmlsaXRpZXMuaW5jbHVkZXMoaXRlbUluZGV4KSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm93bmVkQWJpbGl0aWVzLnB1c2goaXRlbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAucGlja2luZ1VwQWJpbGl0eShpdGVtSW5kZXggLSAzNCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyNzpcclxuICAgICAgICAgICAgY2FzZSAyODpcclxuICAgICAgICAgICAgICAgIHRoaXMua2V5cy0tO1xyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5maW5kR2xhc3MoY29vcmRzWzBdICogMiwgY29vcmRzWzFdICogMik7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwib3BlbkRvb3JzXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDJdID0gMDtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyICsgMV0gPSAwO1xyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW2Nvb3Jkc1sxXSAqIDIgKyAxXVtjb29yZHNbMF0gKiAyXSA9IDA7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IDA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IE1haW5DaGFyYWN0ZXIoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jbGFzcyBEZWF0aCBleHRlbmRzIE1vbnN0ZXJfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5oZWFsdGhTdWNrZWRPdXRPZlBsYXllciA9IDA7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRGVhdGg7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEludGVyZmFjZXNfMSA9IHJlcXVpcmUoXCIuLi9JbnRlcmZhY2VzXCIpO1xyXG5jb25zdCBNb25zdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlclwiKSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9DYW52YXNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vSW1hZ2VzXCIpKTtcclxuY29uc3QgQ29uc3RzXzEgPSByZXF1aXJlKFwiLi4vQ29uc3RzXCIpO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0dhbWVcIikpO1xyXG5jbGFzcyBEZW1vbiBleHRlbmRzIE1vbnN0ZXJfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbik7XHJcbiAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogMSwgeTogMSB9O1xyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxUaHJldyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1A7XHJcbiAgICAgICAgdGhpcy5sYXN0RmlyZWJhbGxUaHJld1RpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXN0RmlyZWJhbGxUaHJld1RpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcbiAgICBjaGVja0ZvclNob290KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpcmViYWxsVGhyZXcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHRoaXMubGFzdEZpcmViYWxsVGhyZXdUaW1lc3RhbXAgPCAxMDAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgcGxheWVyQ29vcmRzID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuZ2V0Q29vcmRpbmF0ZXMoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQpO1xyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA9PSBwbGF5ZXJDb29yZHNbMF0gKiAyICYmIHRoaXMueVBvc2l0aW9uID4gcGxheWVyQ29vcmRzWzFdICogMilcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPCBwbGF5ZXJDb29yZHNbMF0gKiAyICYmXHJcbiAgICAgICAgICAgIHRoaXMueVBvc2l0aW9uID4gcGxheWVyQ29vcmRzWzFdICogMiAmJlxyXG4gICAgICAgICAgICBNYXRoLnBvdyh0aGlzLnhQb3NpdGlvbiAtIHBsYXllckNvb3Jkc1swXSAqIDIsIDIpID09PSBNYXRoLnBvdyh0aGlzLnlQb3NpdGlvbiAtIHBsYXllckNvb3Jkc1sxXSAqIDIsIDIpKVxyXG4gICAgICAgICAgICB0aGlzLnNob290RmlyZWJhbGwoSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QX1JJR0hUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1swXSAqIDIgJiYgdGhpcy55UG9zaXRpb24gPT09IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5SSUdIVCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPCBwbGF5ZXJDb29yZHNbMF0gKiAyICYmXHJcbiAgICAgICAgICAgIHRoaXMueVBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzFdICogMiAmJlxyXG4gICAgICAgICAgICBNYXRoLnBvdyh0aGlzLnhQb3NpdGlvbiAtIHBsYXllckNvb3Jkc1swXSAqIDIsIDIpID09PSBNYXRoLnBvdyh0aGlzLnlQb3NpdGlvbiAtIHBsYXllckNvb3Jkc1sxXSAqIDIsIDIpKVxyXG4gICAgICAgICAgICB0aGlzLnNob290RmlyZWJhbGwoSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA9PSBwbGF5ZXJDb29yZHNbMF0gKiAyICYmIHRoaXMueVBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzFdICogMilcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTSk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPiBwbGF5ZXJDb29yZHNbMF0gKiAyICYmXHJcbiAgICAgICAgICAgIHRoaXMueVBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzFdICogMiAmJlxyXG4gICAgICAgICAgICBNYXRoLnBvdyh0aGlzLnhQb3NpdGlvbiAtIHBsYXllckNvb3Jkc1swXSAqIDIsIDIpID09PSBNYXRoLnBvdyh0aGlzLnlQb3NpdGlvbiAtIHBsYXllckNvb3Jkc1sxXSAqIDIsIDIpKVxyXG4gICAgICAgICAgICB0aGlzLnNob290RmlyZWJhbGwoSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX0xFRlQpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uID4gcGxheWVyQ29vcmRzWzBdICogMiAmJiB0aGlzLnlQb3NpdGlvbiA9PT0gcGxheWVyQ29vcmRzWzFdICogMilcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkxFRlQpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uID4gcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZUKTtcclxuICAgIH1cclxuICAgIHNob290RmlyZWJhbGwoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1A6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgMjAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyAxOSwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5SSUdIVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyA2MCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgNjAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgKyA2MCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDIwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwICsgNjAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9MRUZUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDE5LCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwICsgMjAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkxFRlQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwICsgMjAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxUaHJldyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5maXJlYmFsbERpcmVjdGlvbiA9IHRoaXMubG9va2luZ0RpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLmxhc3RGaXJlYmFsbFRocmV3VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgIH1cclxuICAgIGFuaW1hdGVGaXJlYmFsbChyZW5kZXJlZFZpZXcpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xyXG4gICAgICAgIGlmICh0aGlzLmZpcmViYWxsVGhyZXcgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgZmlyZWJhbGxDb29yZHNBcnJheSA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmdldENvb3JkaW5hdGVzNCh0aGlzLmZpcmViYWxsQ29vcmRzLnggKyAyMCwgdGhpcy5maXJlYmFsbENvb3Jkcy55ICsgMjApO1xyXG4gICAgICAgIGlmIChDb25zdHNfMS5ibG9ja0dyb3Vwcy5ub1RyYW5zaXRpb25Gb3JQcm9qZWN0aWxlLmluY2x1ZGVzKChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDJdKSlcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbFRocmV3ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKENvbnN0c18xLmJsb2NrR3JvdXBzLm1vbnN0ZXJzLmluY2x1ZGVzKChfZCA9IChfYyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDJdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDJdKSkge1xyXG4gICAgICAgICAgICBsZXQga2lsbGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZk1vbnN0ZXJzID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mTW9uc3RlcnMuZmlsdGVyKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIueFBvc2l0aW9uID09PSB0aGlzLnhQb3NpdGlvbiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PT0gdGhpcy55UG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoaXMuY2hhbmdlU2NvcmUoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gLSAxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiArIDEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDIgKyAxICYmIG1vbnN0ZXIueVBvc2l0aW9uICsgMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmRpZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIEdhbWUuZ2FtZU1hcC5hcnJheU9mR29ibGlucyA9IEdhbWUuZ2FtZU1hcC5hcnJheU9mR29ibGlucy5maWx0ZXIobW9uc3Rlcj0+e1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoa2lsbGVkKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIGlmKCBcclxuICAgICAgICAgICAgLy8gICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSoyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0qMikgfHxcclxuICAgICAgICAgICAgLy8gICAgICAgICAobW9uc3Rlci54UG9zaXRpb24tMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdKjIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSoyKSB8fFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbisxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0qMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdKjIpIHx8IFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdKjIgJiYgbW9uc3Rlci55UG9zaXRpb24tMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdKjIpIHx8XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0qMisxICYmIG1vbnN0ZXIueVBvc2l0aW9uKzEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSoyKVxyXG4gICAgICAgICAgICAvLyAgICAgKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBtb25zdGVyLmRpZShmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAga2lsbGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQ29uc3RzXzEuYmxvY2tHcm91cHMuZGVzdHJveWFibGVCeURlbW9ucy5pbmNsdWRlcygoX2YgPSAoX2UgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lW2ZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mW2ZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyXSkpIHtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuZGVzdHJveVRoaW5nKGZpcmViYWxsQ29vcmRzQXJyYXksIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbFRocmV3ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoKF9oID0gKF9nID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1tmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMl0pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaFtmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMl0pID09PSAtMSkge1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VIZWFsdGgoLTUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcmViYWxsVGhyZXcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSAyO1xyXG4gICAgICAgIGlmIChbSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QX0xFRlQsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkxFRlQsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9MRUZUXS5pbmNsdWRlcyh0aGlzLmZpcmViYWxsRGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3Jkcy54IC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QX1JJR0hULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5SSUdIVCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUXS5pbmNsdWRlcyh0aGlzLmZpcmViYWxsRGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3Jkcy54ICs9IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QX0xFRlQsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QX1JJR0hUXS5pbmNsdWRlcyh0aGlzLmZpcmViYWxsRGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3Jkcy55IC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX0xFRlQsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTSwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUXS5pbmNsdWRlcyh0aGlzLmZpcmViYWxsRGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3Jkcy55ICs9IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIHRoaXMuZHJhd0ZpcmViYWxsKHJlbmRlcmVkVmlldyk7XHJcbiAgICB9XHJcbiAgICBkcmF3RmlyZWJhbGwocmVuZGVyZWRWaWV3KSB7XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLndlYXBvbnMsIHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24gKiA5LCAzICogOSwgOCwgOCwgdGhpcy5maXJlYmFsbENvb3Jkcy54IC0gcmVuZGVyZWRWaWV3LngsIHRoaXMuZmlyZWJhbGxDb29yZHMueSAtIHJlbmRlcmVkVmlldy55LCA4ICogQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIsIDggKiBDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllcik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gRGVtb247XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgR2hvc3QgZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEdob3N0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNb25zdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlclwiKSk7XHJcbmNsYXNzIEdydW50IGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBHcnVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jbGFzcyBMb2JiZXIgZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMucm9ja0Nvb3JkcyA9IHsgeDogMSwgeTogMSB9O1xyXG4gICAgICAgIHRoaXMucm9ja1RocmV3ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSb2NrKHN0YXJ0SW5kZXhlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnJvY2tDb29yZHMueCA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgdGhpcy5yb2NrQ29vcmRzLnggPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgdGhpcy5yb2NrQ29vcmRzLnkgPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgIHRoaXMucm9ja0Nvb3Jkcy55IDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7IH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBMb2JiZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vTWFpbkNoYXJhY3RlclwiKSk7XHJcbmNvbnN0IEludGVyZmFjZXNfMSA9IHJlcXVpcmUoXCIuLi9JbnRlcmZhY2VzXCIpO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0dhbWVcIikpO1xyXG5jbGFzcyBNb25zdGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbikge1xyXG4gICAgICAgIHRoaXMuaWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc291cmNlQ29sdW1uID0gMDtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggPSAwO1xyXG4gICAgICAgIHRoaXMueFBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnlQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gMDtcclxuICAgICAgICB0aGlzLm1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZUZyb21QbGF5ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuc291cmNlQ29sdW1uID0gc291cmNlQ29sdW1uO1xyXG4gICAgICAgIHRoaXMuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gaGVhbHRoO1xyXG4gICAgICAgIHRoaXMueFBvc2l0aW9uID0geFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0geVBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuaWQgPSAtKDgwICsgc291cmNlQ29sdW1uKTtcclxuICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBzdGFydERpcmVjdGlvbjtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbeFBvc2l0aW9uLCB5UG9zaXRpb25dLCB0aGlzLmlkKTtcclxuICAgIH1cclxuICAgIGxvb2tBdE1lKHhDb29yZCwgeUNvb3JkKSB7XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uID09IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA+IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1A7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uID09IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA8IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT007XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueVBvc2l0aW9uID09IHlDb29yZCAmJiB0aGlzLnhQb3NpdGlvbiA+IHhDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnlQb3NpdGlvbiA9PSB5Q29vcmQgJiYgdGhpcy54UG9zaXRpb24gPCB4Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uID4geENvb3JkICYmIHRoaXMueVBvc2l0aW9uID4geUNvb3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA+IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA8IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPCB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPiB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QX1JJR0hUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA8IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA8IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fUklHSFQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkaWUoYWRkU2NvcmUpIHtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2syKFt0aGlzLnhQb3NpdGlvbiwgdGhpcy55UG9zaXRpb25dKTtcclxuICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNoYW5nZVNjb3JlKDUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IE1vbnN0ZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgU29yY2VyZXIgZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gU29yY2VyZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IENvbnN0c18xID0gcmVxdWlyZShcIi4vQ29uc3RzXCIpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTWFpbkNoYXJhY3RlclwiKSk7XHJcbmNsYXNzIFByb2plY3RpbGUge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlUm93LCBkaXJlY3Rpb24sIHhQb3NpdGlvbiwgeVBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VSb3cgPSAwO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gMDtcclxuICAgICAgICB0aGlzLmZyYW1lID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMudGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25UaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWVUaHJldyA9IDA7XHJcbiAgICAgICAgdGhpcy5zb3VyY2VSb3cgPSBzb3VyY2VSb3c7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy54UG9zaXRpb24gPSB4UG9zaXRpb247XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSB5UG9zaXRpb247XHJcbiAgICB9XHJcbiAgICBkcmF3KHJlbmRlcmVkVmlldykge1xyXG4gICAgICAgIGlmICghTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQud2VhcG9uLnRocm93bilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy53ZWFwb25zLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24uZnJhbWUgKiA5LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiA5LCA4LCA4LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24ueFBvc2l0aW9uIC0gcmVuZGVyZWRWaWV3LngsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LndlYXBvbi55UG9zaXRpb24gLSByZW5kZXJlZFZpZXcueSwgOCAqIENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyLCA4ICogQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFByb2plY3RpbGU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY2xhc3MgY1NvdW5kRmlsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmxvYWRDb21wbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxvYWRGaWxlID0gKGZpbGVfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMueGhyLm9wZW4oXCJHRVRcIiwgZmlsZV9uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy54aHIucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgICAgICAgICB0aGlzLnhoci5vbmxvYWQgPSB0aGlzLm9uTG9hZENvbXBsZXRlO1xyXG4gICAgICAgICAgICB0aGlzLnhoci5zZW5kKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm9uTG9hZENvbXBsZXRlID0gKGV2KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgdGhpcy54aHIgPSBldi5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgICAgICAoX2EgPSB0aGlzLmNvbnRleHQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kZWNvZGVBdWRpb0RhdGEodGhpcy54aHIucmVzcG9uc2UsIHRoaXMuZGVjb2RlRGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmRlY29kZURhdGEgPSAoYnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRDb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBsYXkgPSAoc3RhcnRfdGltZSwgZHVyYXRpb24pID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkQ29tcGxldGUgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZSA9IHRoaXMuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UuYnVmZmVyID0gdGhpcy5idWZmZXI7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2Uuc3RhcnQodGhpcy5jb250ZXh0LmN1cnJlbnRUaW1lLCBzdGFydF90aW1lLCBkdXJhdGlvbik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIGF1ZGlvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRGaWxlKFwiLi9zb3VuZHMvYXVkaW8ubXAzXCIpO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIGNTb3VuZE1hcmtlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzdGFydCwgZHVyYXRpb24sIHZvbHVtZSwgbG9vcCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IDA7XHJcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSAwO1xyXG4gICAgICAgIHRoaXMubG9vcCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgICAgICB0aGlzLmxvb3AgPSBsb29wO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIGNTb3VuZE1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tdXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zb3VuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9qc29uRmlsZUxvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NvdW5kRmlsZVN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zb3VuZE1hcmtlcnMgPSB7fTtcclxuICAgICAgICB0aGlzLl9zb3VuZEZpbGUgPSBuZXcgY1NvdW5kRmlsZSgpO1xyXG4gICAgICAgIHRoaXMubXAzRW5hYmxlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXVkaW9cIik7XHJcbiAgICAgICAgICAgIHJldHVybiAhIShhLmNhblBsYXlUeXBlICYmIGEuY2FuUGxheVR5cGUoXCJhdWRpby9tcGVnO1wiKS5yZXBsYWNlKC9uby8sICcnKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBsYXkgPSAoc291bmRfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tdXRlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgbWFya2VyID0gdGhpcy5zb3VuZE1hcmtlcnNbc291bmRfbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChtYXJrZXIgPT09IG51bGwgfHwgbWFya2VyID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kRmlsZS5wbGF5KG1hcmtlci5zdGFydCwgbWFya2VyLmR1cmF0aW9uKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2xvYWRNYXJrZXJzID0gKGpzb25maWxlKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBtYXJrZXJfeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIG1hcmtlcl94aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcmtlcl94aHIucmVhZHlTdGF0ZSA9PT0gWE1MSHR0cFJlcXVlc3QuRE9ORSAmJiBtYXJrZXJfeGhyLnN0YXR1cyA9PT0gMjAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uUmVhZChKU09OLnBhcnNlKG1hcmtlcl94aHIucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChbNDA0LCA0MDNdLmluY2x1ZGVzKG1hcmtlcl94aHIucmVhZHlTdGF0ZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvcihtYXJrZXJfeGhyKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgbWFya2VyX3hoci5vcGVuKFwiR0VUXCIsIGpzb25maWxlLCB0cnVlKTtcclxuICAgICAgICAgICAgbWFya2VyX3hoci5zZW5kKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9vblJlYWQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBtYXJrZXJfbmFtZSBpbiBkYXRhLm1hcmtlcnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXJrZXJzID0gZGF0YS5tYXJrZXJzW21hcmtlcl9uYW1lXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyKG5ldyBjU291bmRNYXJrZXIobWFya2VyX25hbWUsIG1hcmtlcnMuc3RhcnQsIG1hcmtlcnMuZHVyYXRpb24sIG1hcmtlcnMudm9sdW1lLCBtYXJrZXJzLmxvb3ApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9qc29uRmlsZUxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zb3VuZEZpbGUubG9hZENvbXBsZXRlID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1wM0VuYWJsZWQoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kRmlsZS5sb2FkRmlsZSh0aGlzLl9zb3VuZEZpbGVTdHJpbmcgKyBcIi5tcDNcIik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kRmlsZS5sb2FkRmlsZSh0aGlzLl9zb3VuZEZpbGVTdHJpbmcgKyBcIi5vZ2dcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlNvdW5kRmlsZUxvYWRlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2pzb25GaWxlTG9hZGVkID09IHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvdW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9vbkVycm9yID0gKHhocikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhBVkUgTk9UIExPQURFRCBTT1VORCBNQVJLRVIgRklMRTogXCIgKyB0aGlzLl9zb3VuZEZpbGVTdHJpbmcgKyBcIi5qc29uIHN0YXR1cz1cIiArIHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYWRkTWFya2VyID0gKHNvdW5kX21hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNvdW5kTWFya2Vyc1tzb3VuZF9tYXJrZXIubmFtZV0gPSBzb3VuZF9tYXJrZXI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlciA9IChtYXJrZXJfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zb3VuZE1hcmtlcnNbbWFya2VyX25hbWVdO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpbml0aWFsaXplU291bmRNYW5hZ2VyKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdW5kX2ZpbGUgPSBcIi4vc291bmRzL2F1ZGlvXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kRmlsZVN0cmluZyA9IHNvdW5kX2ZpbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRNYXJrZXJzKHNvdW5kX2ZpbGUgKyBcIi5qc29uXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBjU291bmRNYW5hZ2VyKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY29uc3QgTWFpbkNoYXJhY3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jbGFzcyBTcGF3bmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHgsIHksIG1vYklkKSB7XHJcbiAgICAgICAgdGhpcy5tb2IgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdFRpbWVTcGF3bmVkU29tZXRoaW5nID0gMDtcclxuICAgICAgICB0aGlzLnRpbWVUb1NwYXduID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMueFBvc2l0aW9uID0geDtcclxuICAgICAgICB0aGlzLnlQb3NpdGlvbiA9IHk7XHJcbiAgICAgICAgdGhpcy5tb2IgPSBtb2JJZDtcclxuICAgICAgICB0aGlzLnRpbWVUb1NwYXduID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xyXG4gICAgfVxyXG4gICAgZGVzdHJveWVkKCkge1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNoYW5nZVNjb3JlKDEwKTtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2syKFt0aGlzLnhQb3NpdGlvbiwgdGhpcy55UG9zaXRpb25dKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBTcGF3bmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IEltYWdlc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0ltYWdlc1wiKSk7XHJcbmNvbnN0IFNvdW5kc0hhbmRsZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Tb3VuZHNIYW5kbGVyXCIpKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0dhbWVcIikpO1xyXG5jb25zdCBLZXlib2FyZEV2ZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0tleWJvYXJkRXZlbnRzXCIpKTtcclxuY2xhc3MgTG9hZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRCdXR0b25EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0QnV0dG9uRGl2XCIpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyYWN0ZXJTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3RlclNlbGVjdFwiKTtcclxuICAgICAgICAgICAgY29uc3QgbWFwU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBTZWxlY3RcIik7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJTZWxlY3QgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChtYXBTZWxlY3QgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2hhcmFjdGVyID0gY2hhcmFjdGVyU2VsZWN0LnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE1hcCA9IG1hcFNlbGVjdC52YWx1ZTtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuc3RhcnRHYW1lKHNlbGVjdGVkQ2hhcmFjdGVyLCBzZWxlY3RlZE1hcCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXJ0QnV0dG9uRGl2ICE9PSBudWxsICYmIHRoaXMuc3RhcnRCdXR0b25EaXYuZmlyc3RFbGVtZW50Q2hpbGQgIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRGl2LnJlbW92ZUNoaWxkKHRoaXMuc3RhcnRCdXR0b25EaXYuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5sb2FkVXRpbGl0aWVzKCk7XHJcbiAgICB9XHJcbiAgICBsb2FkVXRpbGl0aWVzKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHlpZWxkIEltYWdlc18xLmRlZmF1bHQubG9hZEltYWdlcygpO1xyXG4gICAgICAgICAgICB5aWVsZCBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5pbml0aWFsaXplU291bmRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHlpZWxkIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5hZGRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTdGFydEJ1dHRvbigpO1xyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmRyYXdTdGFydFNjcmVlbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlU3RhcnRCdXR0b24oKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBzdGFydEJ1dHRvbi5pbm5lclRleHQgPSBcIlN0YXJ0IGdhbWUhXCI7XHJcbiAgICAgICAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3RhcnRHYW1lKTtcclxuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRGl2LmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgTG9hZGVyKCk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==