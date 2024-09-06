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
    purpleFog: [45, 46, 47]
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
            MainCharacter_1.default.xCoord = loadedData.characterStartCoords[1] * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.yCoord = loadedData.characterStartCoords[0] * 16 * Canvas_1.default.multiplier;
            MainCharacter_1.default.coordsArrayIndexes = [loadedData.characterStartCoords[1] * 2, loadedData.characterStartCoords[0] * 2];
            Game_1.default.gameMap.setBlock2(MainCharacter_1.default.coordsArrayIndexes, -1);
            this.numberOfXBlocks = loadedData.width;
            this.numberOfYBlocks = loadedData.height;
            this.portals = loadedData.portalsCoords;
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
        console.log("teleport");
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
            // portalConnection.forEach((portal, index2)=>{
            //     if(
            //         portal[0] != MainCharacter.coordsArrayIndexes[0]/2 ||
            //         portal[1] != MainCharacter.coordsArrayIndexes[1]/2
            //     ) return
            //     let targetPortalCoords;
            //     if(index2 == 0) targetPortalCoords = portalConnection[1]
            //     else targetPortalCoords = portalConnection[0]
            //     let res = this.findPlaceToTeleport([targetPortalCoords[0]*2, targetPortalCoords[1]*2])
            //     if(res === null) return
            //     MainCharacter.coordsArrayIndexes = [res[0], res[1]]
            //     Game.gameMap.setBlock2(MainCharacter.coordsArrayIndexes, 0)
            //     MainCharacter.xCoord = res[0]/2* 16 * Canvas.multiplier
            //     MainCharacter.yCoord = res[1]/2* 16 * Canvas.multiplier
            //     Game.gameMap.setBlock2(MainCharacter.coordsArrayIndexes, -1)
            //     MainCharacter.moveMap()
            // })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELFFBQVE7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxpREFBaUQ7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixPQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EseUJB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VDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDN2pCRjtBQUNiO0FBQ0Es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QUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUNBQWlDLG1CQUFPLENBQUMsaUNBQVU7QUFDbkQsaUNBQWlDLG1CQUFPLENBQUMsaUNBQVU7QUFDbkQsd0NBQXdDLG1CQUFPLENBQUMsK0NBQWlCO0FBQ2pFLCtCQUErQixtQkFBTyxDQUFDLDZCQUFRO0FBQy9DLHlDQUF5QyxtQkFBTyxDQUFDLGlEQUFrQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7VUNyRGY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0NhbnZhcy50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Db25zdHMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9HYW1lTWFwLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvSW1hZ2VzLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL0ludGVyZmFjZXMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvS2V5Ym9hcmRFdmVudHMudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTWFpbkNoYXJhY3Rlci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVycy9EZWF0aC50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVycy9EZW1vbi50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVycy9HaG9zdC50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVycy9HcnVudC50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVycy9Mb2JiZXIudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvTW9uc3RlcnMvTW9uc3Rlci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Nb25zdGVycy9Tb3JjZXJlci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9Qcm9qZWN0aWxlLnRzIiwid2VicGFjazovL2dhdW50bGV0Ly4vc3JjL1NvdW5kc0hhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZ2F1bnRsZXQvLi9zcmMvU3Bhd25lci50cyIsIndlYnBhY2s6Ly9nYXVudGxldC8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9nYXVudGxldC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nYXVudGxldC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2dhdW50bGV0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9nYXVudGxldC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgTWFpbkNoYXJhY3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBIZWxwZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGVscGVyc1wiKSk7XHJcbmNvbnN0IFNvcmNlcmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvU29yY2VyZXJcIikpO1xyXG5jb25zdCBEZW1vbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJzL0RlbW9uXCIpKTtcclxuY29uc3QgQ29uc3RzXzEgPSByZXF1aXJlKFwiLi9Db25zdHNcIik7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY2xhc3MgQ2FudmFzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSAxMjg1O1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gOTYwO1xyXG4gICAgICAgIHRoaXMubXVsdGlwbGllciA9IDU7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlZFZpZXdYID0gMDtcclxuICAgICAgICB0aGlzLnJlbmRlcmVkVmlld1kgPSAwO1xyXG4gICAgICAgIHRoaXMucmFmID0gMDtcclxuICAgICAgICB0aGlzLmVuZGluZ0ZyYW1lID0gMDtcclxuICAgICAgICB0aGlzLm9sZFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMubmV3VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuZnBzID0gMDtcclxuICAgICAgICB0aGlzLmNhbnZhc1RhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXNUYWcuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuY2FudmFzVGFnLndpZHRoID0gdGhpcy53aWR0aDtcclxuICAgICAgICB0aGlzLmNhbnZhc1RhZy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICB0aGlzLmN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGRyYXdTdGFydFNjcmVlbigpIHtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuc3RhcnRTY3JlZW4sIDAsIDAsIDMyMCwgMjAwLCAwLCAwLCAxMjg1LCA5NjApO1xyXG4gICAgfVxyXG4gICAgZHJhd0xldmVsVGl0bGVTY3JlZW4obGV2ZWxOdW1iZXIpIHtcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgMTI4NSwgOTYwKTtcclxuICAgICAgICBjb25zdCBsZXZlbExlbmd0aCA9IGxldmVsTnVtYmVyLnRvU3RyaW5nKCkubGVuZ3RoO1xyXG4gICAgICAgIGxldCBsZXZlbERpZ2l0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMyAtIGxldmVsTGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGxldmVsRGlnaXRzLnB1c2goMCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZXZlbExlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBsZXZlbERpZ2l0cy5wdXNoKHBhcnNlSW50KGxldmVsTnVtYmVyLnRvU3RyaW5nKCkuY2hhckF0KGkpKSk7XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLmJpZ051bWJlcnMsIDE3MSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogMTcsIDk1LCAxNiwgMzIwLCAzNzAsIDk1ICogKHRoaXMubXVsdGlwbGllciAtIDEpLCAxNiAqICh0aGlzLm11bHRpcGxpZXIgLSAxKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLmJpZ051bWJlcnMsIGxldmVsRGlnaXRzW2ldICogMTcsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDE3LCAxNiwgMTYsIDc0MCArIDE2ICogdGhpcy5tdWx0aXBsaWVyICogaSwgMzcwLCAxNiAqICh0aGlzLm11bHRpcGxpZXIgLSAxKSwgMTYgKiAodGhpcy5tdWx0aXBsaWVyIC0gMSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlckdhbWVGcmFtZSgpIHtcclxuICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zdG9wR2FtZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMub2xkVGltZSA9IHRoaXMubmV3VGltZTtcclxuICAgICAgICB0aGlzLm5ld1RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuZGVsdGFUaW1lID0gKHRoaXMubmV3VGltZSAtIHRoaXMub2xkVGltZSk7XHJcbiAgICAgICAgLy9kcmF3IGJhY2tncm91bmRcclxuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzdhN2E3YSc7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgMjU3ICogdGhpcy5tdWx0aXBsaWVyLCAxNTIgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIHRoaXMuZHJhd1dhbGxzKCk7XHJcbiAgICAgICAgdGhpcy5kcmF3SXRlbXMoKTtcclxuICAgICAgICB0aGlzLmRyYXdTcGVjaWFsSXRlbXMoKTtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1vdmVNb25zdGVycygpO1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmFuaW1hdGVDaGFyYWN0ZXIoKTtcclxuICAgICAgICB0aGlzLmRyYXdDaGFyYWN0ZXIoKTtcclxuICAgICAgICB0aGlzLmRyYXdNb25zdGVycygpO1xyXG4gICAgICAgIC8vIGJvdHRvbSBiYXJcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuYm90dG9tQmFyLCAwLCAwLCAyNTcsIDQwLCAwICogdGhpcy5tdWx0aXBsaWVyLCAxNTIgKiB0aGlzLm11bHRpcGxpZXIsIDI1NyAqIHRoaXMubXVsdGlwbGllciwgNDAgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIHRoaXMuZHJhd1Njb3JlQW5kSGVhbHRoKCk7XHJcbiAgICAgICAgLy8gZnBzIGluIHRoZSBjb3JuZXJcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCgxLjAgLyAodGhpcy5kZWx0YVRpbWUgLyAxMDAwKSkudG9GaXhlZCgwKS50b1N0cmluZygpLCAwLCA3ODYpO1xyXG4gICAgICAgIHRoaXMucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnJlbmRlckdhbWVGcmFtZSgpKTtcclxuICAgIH1cclxuICAgIGRyYXdXYWxscygpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTE7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCgoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSkgPiAxOSlcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy53YWxscywgKCgoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW3N0YXJ0SW5kZXhlcy55ICogMiArIGogKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW3N0YXJ0SW5kZXhlcy54ICogMiArIGkgKiAyXSkgKiAxNykgLSAxNywgMCwgMTYsIDE2LCAtdGhpcy5yZW5kZXJlZFZpZXdYICUgODAgKyBpICogODAsIC10aGlzLnJlbmRlcmVkVmlld1kgJSA4MCArIGogKiA4MCwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRyYXdJdGVtcygpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXhlcyA9IEhlbHBlcnNfMS5kZWZhdWx0LmdldFN0YXJ0SW5kZXhlcygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTc7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5pdGVtcywgKCgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtzdGFydEluZGV4ZXMueSAqIDIgKyBqICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYltzdGFydEluZGV4ZXMueCAqIDIgKyBpICogMl0pIC0gMTkpICogMTcpIC0gMTcsIDAsIDE2LCAxNiwgLXRoaXMucmVuZGVyZWRWaWV3WCAlIDgwICsgaSAqIDgwLCAtdGhpcy5yZW5kZXJlZFZpZXdZICUgODAgKyBqICogODAsIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3U3BlY2lhbEl0ZW1zKCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mO1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0SW5kZXhlcyA9IEhlbHBlcnNfMS5kZWZhdWx0LmdldFN0YXJ0SW5kZXhlcygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTc7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDExOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtzdGFydEluZGV4ZXMueSAqIDIgKyBqICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYltzdGFydEluZGV4ZXMueCAqIDIgKyBpICogMl0pID4gNDcgfHwgKChfZCA9IChfYyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Nbc3RhcnRJbmRleGVzLnkgKiAyICsgaiAqIDJdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Rbc3RhcnRJbmRleGVzLnggKiAyICsgaSAqIDJdKSA8IDM5KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLnNwZWNpYWxJdGVtcywgKCgoKF9mID0gKF9lID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVtzdGFydEluZGV4ZXMueSAqIDIgKyBqICogMl0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZltzdGFydEluZGV4ZXMueCAqIDIgKyBpICogMl0pIC0gMzkpIC8gMykgKiAxNywgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hbmltYXRpb25GcmFtZUluZGV4ICogMTcsIDE2LCAxNiwgLXRoaXMucmVuZGVyZWRWaWV3WCAlIDgwICsgaSAqIDgwLCAtdGhpcy5yZW5kZXJlZFZpZXdZICUgODAgKyBqICogODAsIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkcmF3Q2hhcmFjdGVyKCkge1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5tYWluQ2hhcmFjdGVycywgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQubGFzdERpcmVjdGlvblswXSAqIDE3ICsgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogMTM2LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5sYXN0RGlyZWN0aW9uWzFdICogMTcsIDE2LCAxNiwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdYLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1ksIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQud2VhcG9uLmRyYXcoeyB4OiB0aGlzLnJlbmRlcmVkVmlld1gsIHk6IHRoaXMucmVuZGVyZWRWaWV3WSB9KTtcclxuICAgIH1cclxuICAgIGRyYXdNb25zdGVycygpIHtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMoKTtcclxuICAgICAgICBjb25zdCBwbGF5ZXJDb29yZHMgPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5nZXRDb29yZGluYXRlcyhNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC54Q29vcmQsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnlDb29yZCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mTW9uc3RlcnMuZm9yRWFjaCgobW9uc3RlcikgPT4ge1xyXG4gICAgICAgICAgICBtb25zdGVyLmxvb2tBdE1lKHBsYXllckNvb3Jkc1swXSAqIDIsIHBsYXllckNvb3Jkc1sxXSAqIDIpO1xyXG4gICAgICAgICAgICBpZiAobW9uc3RlciBpbnN0YW5jZW9mIFNvcmNlcmVyXzEuZGVmYXVsdCAmJiBtb25zdGVyLmlzVmlzaWJsZSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyIGluc3RhbmNlb2YgRGVtb25fMS5kZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5hbmltYXRlRmlyZWJhbGwoeyB4OiB0aGlzLnJlbmRlcmVkVmlld1gsIHk6IHRoaXMucmVuZGVyZWRWaWV3WSB9KTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIueFBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy54ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnkgKiAyICsgMjIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5tb25zdGVycywgKG1vbnN0ZXIuc291cmNlQ29sdW1uICogOCArIG1vbnN0ZXIubG9va2luZ0RpcmVjdGlvbikgKiAxNywgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ICUgMykgKiAxNywgMTYsIDE2LCAtdGhpcy5yZW5kZXJlZFZpZXdYICUgODAgKyAobW9uc3Rlci54UG9zaXRpb24gLSBzdGFydEluZGV4ZXMueCAqIDIpICogNDAsIC10aGlzLnJlbmRlcmVkVmlld1kgJSA4MCArIChtb25zdGVyLnlQb3NpdGlvbiAtIHN0YXJ0SW5kZXhlcy55ICogMikgKiA0MCwgMTYgKiB0aGlzLm11bHRpcGxpZXIsIDE2ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZkdvYmxpbnMuZm9yRWFjaCgoZ29ibGluKSA9PiB7XHJcbiAgICAgICAgICAgIC8vZ29ibGluLnJlbmRlclJvY2soc3RhcnRJbmRleGVzKVxyXG4gICAgICAgICAgICBpZiAoZ29ibGluLnhQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi54UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi55UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgICAgICBnb2JsaW4ueVBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubW9uc3RlcnMsIChnb2JsaW4uc291cmNlQ29sdW1uICogOCArIDQpICogMTcsIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCAlIDMpICogMTcsIDE2LCAxNiwgLXRoaXMucmVuZGVyZWRWaWV3WCAlIDgwICsgKGdvYmxpbi54UG9zaXRpb24gLSBzdGFydEluZGV4ZXMueCAqIDIpICogNDAsIC10aGlzLnJlbmRlcmVkVmlld1kgJSA4MCArIChnb2JsaW4ueVBvc2l0aW9uIC0gc3RhcnRJbmRleGVzLnkgKiAyKSAqIDQwLCAxNiAqIHRoaXMubXVsdGlwbGllciwgMTYgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkcmF3U2NvcmVBbmRIZWFsdGgoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcmVMZW5ndGggPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zY29yZS50b1N0cmluZygpLmxlbmd0aDtcclxuICAgICAgICBsZXQgc2NvcmVEaWdpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYgLSBzY29yZUxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBzY29yZURpZ2l0cy5wdXNoKDApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgc2NvcmVEaWdpdHMucHVzaChwYXJzZUludChNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zY29yZS50b1N0cmluZygpLmNoYXJBdChpKSkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5udW1iZXJzID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm51bWJlcnMsIHNjb3JlRGlnaXRzW2ldICogOSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogOSwgOCwgOCwgNDEgKyA4ICogdGhpcy5tdWx0aXBsaWVyICogaSwgMTc2ICogdGhpcy5tdWx0aXBsaWVyLCA4ICogdGhpcy5tdWx0aXBsaWVyLCA4ICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGVhbHRoTGVuZ3RoID0gTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuaGVhbHRoLnRvU3RyaW5nKCkubGVuZ3RoO1xyXG4gICAgICAgIGxldCBoZWFsdGhEaWdpdHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQgLSBoZWFsdGhMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaGVhbHRoRGlnaXRzLnB1c2goMCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFsdGhMZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaGVhbHRoRGlnaXRzLnB1c2gocGFyc2VJbnQoTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuaGVhbHRoLnRvU3RyaW5nKCkuY2hhckF0KGkpKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLm51bWJlcnMsIGhlYWx0aERpZ2l0c1tpXSAqIDksIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNvdXJjZUNvbCAqIDksIDgsIDgsIDQwNCArIDggKiB0aGlzLm11bHRpcGxpZXIgKiBpLCAxNzYgKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRyYXdJdGVtc0FuZEFiaWxpdGllcygpO1xyXG4gICAgfVxyXG4gICAgZHJhd0l0ZW1zQW5kQWJpbGl0aWVzKCkge1xyXG4gICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0Lm93bmVkQWJpbGl0aWVzLmZvckVhY2goYWJpbGl0eSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYWJpbGl0eSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmZpZ2h0UG93ZXJQb3Rpb246IC8vIGxpZ2h0Ymx1ZSBlbGl4aXJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdJY29uKDE0LCA2MTAsIDE2MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMubWFnaWNQb3dlclBvdGlvbjogLy8gZ3JlZW4gZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxMiwgMTIxLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmV4dHJhQXJtb3VyUG90aW9uOiAvLyB5ZWxsb3cgZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxMCwgNDEsIDE2MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMuZXh0cmFDYXJyeWluZ0FiaWxpdHlQb3Rpb246IC8vIHB1cnBsZSBlbGl4aXJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdJY29uKDExLCA4MSwgMTYwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5leHRyYVNob3RQb3dlcjogLy8gYnJvd24gZWxpeGlyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3SWNvbigxMywgNTMwLCAxNjApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5rZXlzOyBpKyspXHJcbiAgICAgICAgICAgIHRoaXMuZHJhd0ljb24oMTUsIDM5ICsgNDAgKiBpLCAxODQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQucG90aW9uczsgaSsrKVxyXG4gICAgICAgICAgICB0aGlzLmRyYXdJY29uKDE2LCA2MDUgLSA0MCAqIGksIDE4NCk7XHJcbiAgICB9XHJcbiAgICBkcmF3SWNvbihzWEluZGV4LCBkWCwgZFkpIHtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubnVtYmVycywgc1hJbmRleCAqIDksIDAsIDgsIDgsIGRYLCBkWSAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllciwgOCAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICB9XHJcbiAgICBkcmF3QWJpbGl0eVNjcmVlbihpdGVtSW5kZXgpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLnBpY2tVcEFiaWxpdHlTY3JlZW4sIDAsIDAsIDMyMSwgMTkyLCAwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCAtIDQwICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKEltYWdlc18xLmRlZmF1bHQuYXNzZXRzLmFiaWxpdHlUZXh0cywgMCwgaXRlbUluZGV4ICogOCwgMTc1LCA3LCA3NyAqIDQsIDExMSAqIDQsIDE3NiAqIChDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciAtIDEpLCA4ICogKENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyIC0gMSkpO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubnVtYmVycywgMTU0LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiA5LCA2NCwgOCwgMTMwICogNCwgNzAgKiA0LCA2NCAqIChDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciAtIDEpLCA5ICogKENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyIC0gMSkpO1xyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfVxyXG4gICAgYW5pbWF0ZUVuZGluZygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYW5pbWF0ZSBlbmRpbmcnKTtcclxuICAgICAgICB0aGlzLm9sZFRpbWUgPSB0aGlzLm5ld1RpbWU7XHJcbiAgICAgICAgdGhpcy5uZXdUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmRlbHRhVGltZSA9ICh0aGlzLm5ld1RpbWUgLSB0aGlzLm9sZFRpbWUpO1xyXG4gICAgICAgIC8vZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyM3YTdhN2EnO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIDI1NyAqIHRoaXMubXVsdGlwbGllciwgMTUyICogdGhpcy5tdWx0aXBsaWVyKTtcclxuICAgICAgICB0aGlzLmRyYXdXYWxscygpO1xyXG4gICAgICAgIHRoaXMuZHJhd0l0ZW1zKCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tb3ZlTW9uc3RlcnMoKTtcclxuICAgICAgICB0aGlzLmRyYXdNb25zdGVycygpO1xyXG4gICAgICAgIC8vIGJvdHRvbSBiYXJcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMuYm90dG9tQmFyLCAwLCAwLCAyNTcsIDQwLCAwICogdGhpcy5tdWx0aXBsaWVyLCAxNTIgKiB0aGlzLm11bHRpcGxpZXIsIDI1NyAqIHRoaXMubXVsdGlwbGllciwgNDAgKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIHRoaXMuZHJhd1Njb3JlQW5kSGVhbHRoKCk7XHJcbiAgICAgICAgLy8gZnBzIGluIHRoZSBjb3JuZXJcclxuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIzMHB4IEFyaWFsXCI7XHJcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KCgxLjAgLyAodGhpcy5kZWx0YVRpbWUgLyAxMDAwKSkudG9GaXhlZCgwKS50b1N0cmluZygpLCAwLCA3ODYpO1xyXG4gICAgICAgIGxldCBpbWFnZVNvdXJjZSA9ICh0aGlzLmVuZGluZ0ZyYW1lIC0gdGhpcy5lbmRpbmdGcmFtZSAlIDMpIC8gMztcclxuICAgICAgICBpZiAoaW1hZ2VTb3VyY2UgPCAxNikge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMubWFpbkNoYXJhY3RlcnMsIChpbWFnZVNvdXJjZSAlIDgpICogMTcgKyBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zb3VyY2VDb2wgKiAxMzYsIDAsIDE2LCAxNiwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdYLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1ksIDE2ICogdGhpcy5tdWx0aXBsaWVyLCAxNiAqIHRoaXMubXVsdGlwbGllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMud2VhcG9ucywgKGltYWdlU291cmNlIC0gMTYpICogOSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogOSwgOCwgOCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkIC0gdGhpcy5yZW5kZXJlZFZpZXdYLCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgLSB0aGlzLnJlbmRlcmVkVmlld1ksIDggKiB0aGlzLm11bHRpcGxpZXIsIDggKiB0aGlzLm11bHRpcGxpZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVuZGluZ0ZyYW1lKys7XHJcbiAgICAgICAgaWYgKGltYWdlU291cmNlICE9IDI0KVxyXG4gICAgICAgICAgICB0aGlzLnJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRW5kaW5nKCkpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQucmVzdGFydEdhbWUoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgQ2FudmFzKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ29uc3RhbnRzID0gZXhwb3J0cy5ibG9ja0dyb3VwcyA9IGV4cG9ydHMuYmxvY2tDb2RlcyA9IHZvaWQgMDtcclxuZXhwb3J0cy5ibG9ja0NvZGVzID0ge1xyXG4gICAgZGVzdHJ1Y3RpYmxlV2FsbHM6IFsxLCAyLCAzXSxcclxuICAgIGluZGVzdHJ1Y3RpYmxlV2FsbHM6IFs0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV0sXHJcbiAgICBzcGF3bmVyc0ltYWdlczogWzIwLCAyMSwgMjIsIDIzLCAyNCwgMjVdLFxyXG4gICAgZXhpdDogMjYsXHJcbiAgICBnbGFzczogWzI3LCAyOF0sXHJcbiAgICBrZXk6IDI5LFxyXG4gICAgbWVkYWxsaW9uOiAzMCxcclxuICAgIG1lYXQ6IDMxLFxyXG4gICAgeWVsbG93Qm90dGxlOiAzMixcclxuICAgIG1hZ2ljUG90aW9uOiAzMyxcclxuICAgIGZpZ2h0UG93ZXJQb3Rpb246IDM0LFxyXG4gICAgbWFnaWNQb3dlclBvdGlvbjogMzUsXHJcbiAgICBleHRyYUFybW91clBvdGlvbjogMzYsXHJcbiAgICBleHRyYUNhcnJ5aW5nQWJpbGl0eVBvdGlvbjogMzcsXHJcbiAgICBleHRyYVNob3RQb3dlcjogMzgsXHJcbiAgICBnaG9zdDogLTgwLFxyXG4gICAgZ3J1bnQ6IC04MSxcclxuICAgIGRlbW9uOiAtODIsXHJcbiAgICBzb3JjZXJlcjogLTgzLFxyXG4gICAgbG9iYmVyOiAtODQsXHJcbiAgICBkZWF0aDogLTg1LFxyXG4gICAgc3Bhd25lcnM6IFs3MCwgNzEsIDcyLCA3MywgNzQsIDc1LCA3NiwgNzcsIDc4LCA3OSwgODAsIDgxXSxcclxuICAgIGJveGVzOiBbMzksIDQwLCA0MV0sXHJcbiAgICBwb3J0YWxzOiBbNDIsIDQzLCA0NF0sXHJcbiAgICBwdXJwbGVGb2c6IFs0NSwgNDYsIDQ3XVxyXG59O1xyXG5leHBvcnRzLmJsb2NrR3JvdXBzID0ge1xyXG4gICAgbW9uc3RlcnM6IFtcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZ2hvc3QsXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmdydW50LFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5kZWF0aCxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZGVtb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmxvYmJlcixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuc29yY2VyZXJcclxuICAgIF0sXHJcbiAgICB3YWxsczogW1xyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5kZXN0cnVjdGlibGVXYWxscywgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmluZGVzdHJ1Y3RpYmxlV2FsbHNcclxuICAgIF0sXHJcbiAgICBub1RyYW5zaXRpb246IFtcclxuICAgICAgICAuLi5leHBvcnRzLmJsb2NrQ29kZXMuZGVzdHJ1Y3RpYmxlV2FsbHMsIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLCAuLi5leHBvcnRzLmJsb2NrQ29kZXMuZ2xhc3MsIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVycyxcclxuICAgIF0sXHJcbiAgICBub1RyYW5zaXRpb25Gb3JQcm9qZWN0aWxlOiBbXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmRlc3RydWN0aWJsZVdhbGxzLFxyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5pbmRlc3RydWN0aWJsZVdhbGxzLFxyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVyc0ltYWdlcyxcclxuICAgICAgICAuLi5leHBvcnRzLmJsb2NrQ29kZXMuYm94ZXMsXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmdsYXNzLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5rZXksXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLm1lYXQsXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLm1lZGFsbGlvblxyXG4gICAgXSxcclxuICAgIHBpY2thYmxlSXRlbXM6IFtcclxuICAgICAgICAuLi5leHBvcnRzLmJsb2NrQ29kZXMuYm94ZXMsXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmdsYXNzLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5rZXksXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLnllbGxvd0JvdHRsZSxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWVhdCxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWVkYWxsaW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5tYWdpY1BvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZmlnaHRQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWFnaWNQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZXh0cmFBcm1vdXJQb3Rpb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmV4dHJhQ2FycnlpbmdBYmlsaXR5UG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5leHRyYVNob3RQb3dlclxyXG4gICAgXSxcclxuICAgIGRlc3Ryb3lhYmxlVGhpbmdzOiBbXHJcbiAgICAgICAgLi4uZXhwb3J0cy5ibG9ja0NvZGVzLmRlc3RydWN0aWJsZVdhbGxzLFxyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVyc0ltYWdlcyxcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMueWVsbG93Qm90dGxlLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5tYWdpY1BvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZmlnaHRQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMubWFnaWNQb3dlclBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZXh0cmFBcm1vdXJQb3Rpb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmV4dHJhQ2FycnlpbmdBYmlsaXR5UG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5leHRyYVNob3RQb3dlcixcclxuICAgIF0sXHJcbiAgICBkZXN0cm95YWJsZVRoaW5nc0J5SGFuZDogW1xyXG4gICAgICAgIC4uLmV4cG9ydHMuYmxvY2tDb2Rlcy5zcGF3bmVyc0ltYWdlcywgZXhwb3J0cy5ibG9ja0NvZGVzLmdydW50LCBleHBvcnRzLmJsb2NrQ29kZXMuZGVtb24sIGV4cG9ydHMuYmxvY2tDb2Rlcy5zb3JjZXJlciwgZXhwb3J0cy5ibG9ja0NvZGVzLmxvYmJlcixcclxuICAgIF0sXHJcbiAgICBkZXN0cm95YWJsZUJ5RGVtb25zOiBbXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLm1hZ2ljUG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5maWdodFBvd2VyUG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5tYWdpY1Bvd2VyUG90aW9uLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy5leHRyYUFybW91clBvdGlvbixcclxuICAgICAgICBleHBvcnRzLmJsb2NrQ29kZXMuZXh0cmFDYXJyeWluZ0FiaWxpdHlQb3Rpb24sXHJcbiAgICAgICAgZXhwb3J0cy5ibG9ja0NvZGVzLmV4dHJhU2hvdFBvd2VyLFxyXG4gICAgICAgIGV4cG9ydHMuYmxvY2tDb2Rlcy55ZWxsb3dCb3R0bGVcclxuICAgIF0sXHJcbn07XHJcbmV4cG9ydHMuQ29uc3RhbnRzID0ge1xyXG4gICAgbXVsdGlwbGllcjogNSxcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lTWFwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZU1hcFwiKSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNvbnN0IFNvdW5kc0hhbmRsZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Tb3VuZHNIYW5kbGVyXCIpKTtcclxuY29uc3QgaW5kZXhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9pbmRleFwiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgS2V5Ym9hcmRFdmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9LZXlib2FyZEV2ZW50c1wiKSk7XHJcbmNsYXNzIEdhbWUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTWFwID0gbmV3IEdhbWVNYXBfMS5kZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEdhbWUoc2VsZWN0ZWRDaGFyYWN0ZXIsIHNlbGVjdGVkTWFwKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLmdhbWVNYXAuY2xlYXJNYXAoKTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LmNsZWFuRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQuZW5kaW5nRnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLmdhbWVNYXAubG9hZE1hcChzZWxlY3RlZE1hcCwgc2VsZWN0ZWRDaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmxhdW5jaEdhbWUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxhdW5jaEdhbWUoKSB7XHJcbiAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5kcmF3TGV2ZWxUaXRsZVNjcmVlbih0aGlzLmdhbWVNYXAubGV2ZWxOdW1iZXIpO1xyXG4gICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJsZXZlbFRpdGxlXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwic3RhcnRMZXZlbFwiKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFwLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5kaXNhYmxlRXZlbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlckdhbWVGcmFtZSgpKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTWFwLnNldEludGVydmFscygpO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zdGFydExvc2luZ0hQSW50ZXJ2YWwoKTtcclxuICAgICAgICB9LCA0MDAwKTtcclxuICAgIH1cclxuICAgIHJlc3RhcnRHYW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVNYXAuYW5pbWF0ZVNwcml0ZXNJbnRlcnZhbCAhPT0gbnVsbClcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmdhbWVNYXAuYW5pbWF0ZVNwcml0ZXNJbnRlcnZhbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU1hcC5zcGF3bmluZ01vbnN0ZXJzSW50ZXJ2YWwgIT09IG51bGwpXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5nYW1lTWFwLnNwYXduaW5nTW9uc3RlcnNJbnRlcnZhbCk7XHJcbiAgICAgICAgaW5kZXhfMS5kZWZhdWx0LmNyZWF0ZVN0YXJ0QnV0dG9uKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IEdhbWUoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTWFpbkNoYXJhY3RlclwiKSk7XHJcbmNvbnN0IERlbW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvRGVtb25cIikpO1xyXG5jb25zdCBTcGF3bmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU3Bhd25lclwiKSk7XHJcbmNvbnN0IEdob3N0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvR2hvc3RcIikpO1xyXG5jb25zdCBHcnVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJzL0dydW50XCIpKTtcclxuY29uc3QgRGVhdGhfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9EZWF0aFwiKSk7XHJcbmNvbnN0IFNvcmNlcmVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlcnMvU29yY2VyZXJcIikpO1xyXG5jb25zdCBMb2JiZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVycy9Mb2JiZXJcIikpO1xyXG5jb25zdCBIZWxwZXJzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSGVscGVyc1wiKSk7XHJcbmNvbnN0IEtleWJvYXJkRXZlbnRzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vS2V5Ym9hcmRFdmVudHNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBTb3VuZHNIYW5kbGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU291bmRzSGFuZGxlclwiKSk7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY29uc3QgQ29uc3RzXzEgPSByZXF1aXJlKFwiLi9Db25zdHNcIik7XHJcbmNsYXNzIEdhbWVNYXAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBbW11dO1xyXG4gICAgICAgIHRoaXMubGV2ZWxOdW1iZXIgPSAwO1xyXG4gICAgICAgIHRoaXMubnVtYmVyT2ZYQmxvY2tzID0gMDtcclxuICAgICAgICB0aGlzLm51bWJlck9mWUJsb2NrcyA9IDA7XHJcbiAgICAgICAgdGhpcy54U2l6ZUluUGl4ZWxzID0gMDtcclxuICAgICAgICB0aGlzLnlTaXplSW5QaXhlbHMgPSAwO1xyXG4gICAgICAgIHRoaXMudW5pdmVyc2FsRnJhbWVJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zID0gW107XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb3ZlTW9uc3RlcnNUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzVG9DcmVhdGUgPSBbXTtcclxuICAgICAgICB0aGlzLnNwYXduaW5nTW9uc3RlcnNJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlU3ByaXRlc0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBvcnRhbHMgPSBbXTtcclxuICAgICAgICB0aGlzLmVuZE9mTGV2ZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJlbnRlcmluZ0V4aXRcIik7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5kaXNhYmxlRXZlbnRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LldLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuQUtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LkRLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TcGFjZUtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc3RvcExvc2luZ0hQSW50ZXJ2YWwoKTtcclxuICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQ2FudmFzXzEuZGVmYXVsdC5yYWYpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gQ2FudmFzXzEuZGVmYXVsdC5hbmltYXRlRW5kaW5nKCkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjbGVhck1hcCgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IFtbXV07XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZkdvYmxpbnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnNUb0NyZWF0ZSA9IFtdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9hZE1hcChtYXBOYW1lLCBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgbGV0IGNoYXJhY3Rlck51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lID09PSBcIldhcnJpb3JcIilcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlck5hbWUgPT09IFwiVmFsa3lyaWVcIilcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck51bWJlciA9IDE7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXJhY3Rlck5hbWUgPT09IFwiRWxmXCIpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOdW1iZXIgPSAyO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyYWN0ZXJOYW1lID09PSBcIldpemFyZFwiKVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyTnVtYmVyID0gMztcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sID0gY2hhcmFjdGVyTnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGAuL2pzb25NYXBzL21hcCR7bWFwTmFtZX0uanNvbmApO1xyXG4gICAgICAgICAgICBjb25zdCBsb2FkZWREYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy5ib3R0b21CYXIgPSB5aWVsZCBJbWFnZXNfMS5kZWZhdWx0LmltYWdlTG9hZGVyKFwiYm90dG9tQmFyXCIgKyBjaGFyYWN0ZXJOdW1iZXIgKyBcIi5wbmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gdGhpcy5jcmVhdGVCaWdnZXJNYXAobG9hZGVkRGF0YS5hcnJheSk7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxOdW1iZXIgPSBsb2FkZWREYXRhLmxldmVsTnVtYmVyO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVyc1RvQ3JlYXRlLmZvckVhY2gobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1vbnN0ZXIobW9uc3Rlci54LCBtb25zdGVyLnksIG1vbnN0ZXIuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueENvb3JkID0gbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1sxXSAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC55Q29vcmQgPSBsb2FkZWREYXRhLmNoYXJhY3RlclN0YXJ0Q29vcmRzWzBdICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlcyA9IFtsb2FkZWREYXRhLmNoYXJhY3RlclN0YXJ0Q29vcmRzWzFdICogMiwgbG9hZGVkRGF0YS5jaGFyYWN0ZXJTdGFydENvb3Jkc1swXSAqIDJdO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5udW1iZXJPZlhCbG9ja3MgPSBsb2FkZWREYXRhLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLm51bWJlck9mWUJsb2NrcyA9IGxvYWRlZERhdGEuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnBvcnRhbHMgPSBsb2FkZWREYXRhLnBvcnRhbHNDb29yZHM7XHJcbiAgICAgICAgICAgIHRoaXMueFNpemVJblBpeGVscyA9IHRoaXMubnVtYmVyT2ZYQmxvY2tzICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIHRoaXMueVNpemVJblBpeGVscyA9IHRoaXMubnVtYmVyT2ZZQmxvY2tzICogMTYgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnNjb3JlID0gbG9hZGVkRGF0YS5zdGFydFNjb3JlO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5oZWFsdGggPSBsb2FkZWREYXRhLnN0YXJ0SGVhbHRoO1xyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5tb3ZlTWFwKCk7XHJcbiAgICAgICAgICAgIHlpZWxkIEltYWdlc18xLmRlZmF1bHQubG9hZFdhbGxzVHlwZUFuZENvbG9yKGxvYWRlZERhdGEud2FsbHNDb2xvciwgbG9hZGVkRGF0YS53YWxsc1R5cGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQmlnZ2VyTWFwKGlucHV0TWFwKSB7XHJcbiAgICAgICAgbGV0IGRvdWJsZWRNYXAgPSBbXTtcclxuICAgICAgICBpbnB1dE1hcC5mb3JFYWNoKChyb3csIHJvd0luZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkb3VibGVkUm93ID0gW107XHJcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjZWxsSW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChbMjAsIDIxLCAyMl0uaW5jbHVkZXMoY2VsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTnVtYmVyID0gdGhpcy5jcmVhdGVTcGF3bmVyKGNlbGxJbmRleCwgcm93SW5kZXgsIGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZWRSb3cucHVzaChpdGVtTnVtYmVyLCBpdGVtTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKENvbnN0c18xLmJsb2NrQ29kZXMuc3Bhd25lcnMuaW5jbHVkZXMoY2VsbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtTnVtYmVyID0gdGhpcy5jcmVhdGVTcGF3bmVyKGNlbGxJbmRleCwgcm93SW5kZXgsIGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZWRSb3cucHVzaChpdGVtTnVtYmVyLCBpdGVtTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNlbGwgPD0gLTgwICYmIGNlbGwgPj0gLTg1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnNUb0NyZWF0ZS5wdXNoKHsgeDogY2VsbEluZGV4LCB5OiByb3dJbmRleCwgaWQ6IGNlbGwgKiAoLTEpIC0gODAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG91YmxlZFJvdy5wdXNoKDAsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGRvdWJsZWRSb3cucHVzaChjZWxsLCBjZWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRvdWJsZWRNYXAucHVzaChbLi4uZG91YmxlZFJvd10sIFsuLi5kb3VibGVkUm93XSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRvdWJsZWRNYXA7XHJcbiAgICB9XHJcbiAgICBzZXRPbmVGaWVsZCh4LCB5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMubWFwW3ldW3hdID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBjbGVhckJsb2NrKGNvb3Jkcykge1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDJdID0gMDtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyICsgMV0gPSAwO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDIgKyAxXVtjb29yZHNbMF0gKiAyXSA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdICogMiArIDFdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IDA7XHJcbiAgICB9XHJcbiAgICBjbGVhckJsb2NrMihjb29yZHMpIHtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV1dW2Nvb3Jkc1swXV0gPSAwO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXV1bY29vcmRzWzBdICsgMV0gPSAwO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSArIDFdW2Nvb3Jkc1swXV0gPSAwO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSArIDFdW2Nvb3Jkc1swXSArIDFdID0gMDtcclxuICAgIH1cclxuICAgIHNldEJsb2NrKGNvb3JkcywgbmV3VmFsdWUpIHtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDJdW2Nvb3Jkc1swXSAqIDIgKyAxXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDIgKyAxXVtjb29yZHNbMF0gKiAyXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSAqIDIgKyAxXVtjb29yZHNbMF0gKiAyICsgMV0gPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICAgIHNldEJsb2NrMihjb29yZHMsIG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdXVtjb29yZHNbMF1dID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5tYXBbY29vcmRzWzFdXVtjb29yZHNbMF0gKyAxXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubWFwW2Nvb3Jkc1sxXSArIDFdW2Nvb3Jkc1swXV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLm1hcFtjb29yZHNbMV0gKyAxXVtjb29yZHNbMF0gKyAxXSA9IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGltZXNVcCgpIHtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5oZWFsdGggPSAwO1xyXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKENhbnZhc18xLmRlZmF1bHQucmFmKTtcclxuICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmRyYXdTY29yZUFuZEhlYWx0aCgpO1xyXG4gICAgfVxyXG4gICAgcGlja2luZ1VwQWJpbGl0eShpdGVtSW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnN0b3BHYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc3RvcExvc2luZ0hQSW50ZXJ2YWwoKTtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5kcmF3QWJpbGl0eVNjcmVlbihpdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkQWJpbGl0eVwiKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BHYW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJHYW1lRnJhbWUoKSk7XHJcbiAgICAgICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5zdGFydExvc2luZ0hQSW50ZXJ2YWwoKTtcclxuICAgICAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRJbnRlcnZhbHMoKSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRlU3ByaXRlc0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxGcmFtZUluZGV4ID09IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lSW5kZXggPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxGcmFtZUluZGV4ID09IDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lSW5kZXggPSAyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxGcmFtZUluZGV4ID09IDIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lSW5kZXggPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy51bml2ZXJzYWxGcmFtZUluZGV4ID09IDMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnVuaXZlcnNhbEZyYW1lSW5kZXgrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMudW5pdmVyc2FsRnJhbWVJbmRleCA9PSA0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy51bml2ZXJzYWxGcmFtZUluZGV4ID0gMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDM7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDI7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDY7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudW5pdmVyc2FsTW9uc3RlcnNGcmFtZUluZGV4ID09IDYpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuaXZlcnNhbE1vbnN0ZXJzRnJhbWVJbmRleCA9IDE7XHJcbiAgICAgICAgfSwgMTUwKTtcclxuICAgICAgICB0aGlzLnNwYXduaW5nTW9uc3RlcnNJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zcGF3bk1vbnN0ZXJzKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuICAgIGlzRmllbGRDbGVhcih4LCB5KSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaDtcclxuICAgICAgICBpZiAoKChfYiA9IChfYSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2FbeV0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlt4XSkgPT0gMCAmJlxyXG4gICAgICAgICAgICAoKF9kID0gKF9jID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1t5XSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW3ggKyAxXSkgPT0gMCAmJlxyXG4gICAgICAgICAgICAoKF9mID0gKF9lID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVt5ICsgMV0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZlt4XSkgPT0gMCAmJlxyXG4gICAgICAgICAgICAoKF9oID0gKF9nID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1t5ICsgMV0pID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaFt4ICsgMV0pID09IDApXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlzU21hbGxGaWVsZENsZWFyKHgsIHkpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGlmICgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt5XSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW3hdKSA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgbW92ZU1vbnN0ZXJzKCkge1xyXG4gICAgICAgIHRoaXMubW92ZU1vbnN0ZXJzVGltZXN0YW1wKys7XHJcbiAgICAgICAgaWYgKHRoaXMubW92ZU1vbnN0ZXJzVGltZXN0YW1wICE9IDEwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLm1vdmVNb25zdGVyc1RpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRJbmRleGVzID0gSGVscGVyc18xLmRlZmF1bHQuZ2V0U3RhcnRJbmRleGVzMigpO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLmZvckVhY2gobW9uc3RlciA9PiB7XHJcbiAgICAgICAgICAgIG1vbnN0ZXIubW92ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIueFBvc2l0aW9uIDwgc3RhcnRJbmRleGVzLngpXHJcbiAgICAgICAgICAgICAgICBtb25zdGVyLm1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIueFBvc2l0aW9uID4gc3RhcnRJbmRleGVzLnggKyAzNClcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci55UG9zaXRpb24gPCBzdGFydEluZGV4ZXMueSlcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIubW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci55UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueSArIDIyKVxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci5tb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyc0Nvb3JkcyA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmdldENvb3JkaW5hdGVzMihNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC54Q29vcmQsIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnlDb29yZCk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMuZm9yRWFjaChtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIubW92ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIG1vbnN0ZXIuZGlzdGFuY2VGcm9tUGxheWVyID0gTWF0aC5wb3coKHBsYXllcnNDb29yZHNbMF0gLSBtb25zdGVyLnhQb3NpdGlvbiksIDIpICsgTWF0aC5wb3coKHBsYXllcnNDb29yZHNbMV0gLSBtb25zdGVyLnlQb3NpdGlvbiksIDIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzID0gdGhpcy5hcnJheU9mTW9uc3RlcnMuZmlsdGVyKChtb25zdGVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtb25zdGVyLmRpc3RhbmNlRnJvbVBsYXllciAhPT0gNClcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICBpZiAobW9uc3Rlci5zb3VyY2VDb2x1bW4gPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIuZGllKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcImdvdEhpdEJ5R2hvc3RcIik7XHJcbiAgICAgICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VIZWFsdGgoLTUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1vbnN0ZXIuc291cmNlQ29sdW1uID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VIZWFsdGgoLTEpO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcImdvdEhpdEJ5RGVhdGhcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNoYW5nZUhlYWx0aCgtNSk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwiZ290SGl0QnlHcnVudERlbW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5mb3JFYWNoKG1vbnN0ZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIuZGlzdGFuY2VGcm9tUGxheWVyICE9IGkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkQ29vcmRzID0gW21vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbl07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQmxvY2syKFttb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb25dKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAobW9uc3Rlci5sb29raW5nRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gLSAxKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDIsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAyLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uICsgMSwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIXRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy81XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbikgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnhQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vIDZcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiwgbW9uc3Rlci55UG9zaXRpb24gKyAyKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiArIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gNFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24pIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy82XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gLSAxLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSwgbW9uc3Rlci55UG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU21hbGxGaWVsZENsZWFyKG1vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLzdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1NtYWxsRmllbGRDbGVhcihtb25zdGVyLnhQb3NpdGlvbiAtIDEsIG1vbnN0ZXIueVBvc2l0aW9uICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIueFBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgLy82XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24sIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTbWFsbEZpZWxkQ2xlYXIobW9uc3Rlci54UG9zaXRpb24gKyAxLCBtb25zdGVyLnlQb3NpdGlvbiAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLnlQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtNZTogaWYgKG1vbnN0ZXIgaW5zdGFuY2VvZiBTb3JjZXJlcl8xLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkQ29vcmRzWzBdID09PSBtb25zdGVyLnhQb3NpdGlvbiAmJiBvbGRDb29yZHNbMV0gPT09IG1vbnN0ZXIueVBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgYnJlYWtNZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmQgPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyIGluc3RhbmNlb2YgRGVtb25fMS5kZWZhdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuY2hlY2tGb3JTaG9vdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCbG9jazIoW21vbnN0ZXIueFBvc2l0aW9uLCBtb25zdGVyLnlQb3NpdGlvbl0sIG1vbnN0ZXIuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGVhck1hcEZyb21Nb25zdGVyc0FuZFNwYXduZXJzKGl0ZW1Vc2VkKSB7XHJcbiAgICAgICAgaWYgKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnBvdGlvbnMgPT09IDAgJiYgaXRlbVVzZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMoKTtcclxuICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwiZGVzdHJveUJvdHRsZVwiKTtcclxuICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycyA9IHRoaXMuYXJyYXlPZk1vbnN0ZXJzLmZpbHRlcihtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgaWYgKG1vbnN0ZXIueFBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy54ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci54UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIueVBvc2l0aW9uID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICAgICAgbW9uc3Rlci55UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnkgKiAyICsgMjIpIHtcclxuICAgICAgICAgICAgICAgIG1vbnN0ZXIuZGllKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZkdvYmxpbnMgPSB0aGlzLmFycmF5T2ZHb2JsaW5zLmZpbHRlcihnb2JsaW4gPT4ge1xyXG4gICAgICAgICAgICBpZiAoZ29ibGluLnhQb3NpdGlvbiA+PSBzdGFydEluZGV4ZXMueCAqIDIgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi54UG9zaXRpb24gPD0gc3RhcnRJbmRleGVzLnggKiAyICsgMzQgJiZcclxuICAgICAgICAgICAgICAgIGdvYmxpbi55UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgICAgICBnb2JsaW4ueVBvc2l0aW9uIDw9IHN0YXJ0SW5kZXhlcy55ICogMiArIDIyKSB7XHJcbiAgICAgICAgICAgICAgICBnb2JsaW4uZGllKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzID0gdGhpcy5hcnJheU9mU3Bhd25lcnMuZmlsdGVyKHNwYXduZXIgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci54UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgICAgICBzcGF3bmVyLnhQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueCAqIDIgKyAzNCAmJlxyXG4gICAgICAgICAgICAgICAgc3Bhd25lci55UG9zaXRpb24gPj0gc3RhcnRJbmRleGVzLnkgKiAyICYmXHJcbiAgICAgICAgICAgICAgICBzcGF3bmVyLnlQb3NpdGlvbiA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikge1xyXG4gICAgICAgICAgICAgICAgc3Bhd25lci5kZXN0cm95ZWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXRlbVVzZWQpXHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnBvdGlvbnMtLTtcclxuICAgIH1cclxuICAgIGNyZWF0ZVNwYXduZXIoeCwgeSwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgcmV0dXJuSXRlbUluZGV4ID0gdmFsdWU7XHJcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgICBjYXNlIDIxOlxyXG4gICAgICAgICAgICBjYXNlIDIyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMucHVzaChuZXcgU3Bhd25lcl8xLmRlZmF1bHQoeCAqIDIsIHkgKiAyLCAwKSk7XHJcbiAgICAgICAgICAgICAgICAvL2dob3N0c1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNzA6XHJcbiAgICAgICAgICAgIGNhc2UgNzE6XHJcbiAgICAgICAgICAgIGNhc2UgNzI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycy5wdXNoKG5ldyBTcGF3bmVyXzEuZGVmYXVsdCh4ICogMiwgeSAqIDIsIDEpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybkl0ZW1JbmRleCAtPSA0NztcclxuICAgICAgICAgICAgICAgIC8vZ3J1bnRzXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3MzpcclxuICAgICAgICAgICAgY2FzZSA3NDpcclxuICAgICAgICAgICAgY2FzZSA3NTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzLnB1c2gobmV3IFNwYXduZXJfMS5kZWZhdWx0KHggKiAyLCB5ICogMiwgMikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuSXRlbUluZGV4IC09IDUwO1xyXG4gICAgICAgICAgICAgICAgLy9kZW1vbnNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc2OlxyXG4gICAgICAgICAgICBjYXNlIDc3OlxyXG4gICAgICAgICAgICBjYXNlIDc4OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMucHVzaChuZXcgU3Bhd25lcl8xLmRlZmF1bHQoeCAqIDIsIHkgKiAyLCAzKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5JdGVtSW5kZXggLT0gNTM7XHJcbiAgICAgICAgICAgICAgICAvL3NvcmNlcmVyXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3OTpcclxuICAgICAgICAgICAgY2FzZSA4MDpcclxuICAgICAgICAgICAgY2FzZSA4MTpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZlNwYXduZXJzLnB1c2gobmV3IFNwYXduZXJfMS5kZWZhdWx0KHggKiAyLCB5ICogMiwgNCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuSXRlbUluZGV4IC09IDU2O1xyXG4gICAgICAgICAgICAgICAgLy9sb2JiZXJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0dXJuSXRlbUluZGV4O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlTW9uc3Rlcih4LCB5LCBtb2JJZCkge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUNvbHVtbiA9IG1vYklkO1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IEdob3N0XzEuZGVmYXVsdCgwLCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZNb25zdGVycy5wdXNoKG5ldyBHcnVudF8xLmRlZmF1bHQoMSwgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgRGVtb25fMS5kZWZhdWx0KDIsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlPZk1vbnN0ZXJzLnB1c2gobmV3IFNvcmNlcmVyXzEuZGVmYXVsdCgzLCA1LCA1LCB4ICogMiwgeSAqIDIsIDUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5T2ZHb2JsaW5zLnB1c2gobmV3IExvYmJlcl8xLmRlZmF1bHQoNCwgNSwgNSwgeCAqIDIsIHkgKiAyLCA1KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgRGVhdGhfMS5kZWZhdWx0KDUsIDUsIDUsIHggKiAyLCB5ICogMiwgNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3Bhd25Nb25zdGVycygpIHtcclxuICAgICAgICBjb25zdCBzdGFydEluZGV4ZXMgPSBIZWxwZXJzXzEuZGVmYXVsdC5nZXRTdGFydEluZGV4ZXMyKCk7XHJcbiAgICAgICAgdGhpcy5hcnJheU9mU3Bhd25lcnMuZm9yRWFjaChzcGF3bmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIueFBvc2l0aW9uIDwgc3RhcnRJbmRleGVzLngpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnhQb3NpdGlvbiA+IHN0YXJ0SW5kZXhlcy54ICsgMzQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChzcGF3bmVyLnlQb3NpdGlvbiA8IHN0YXJ0SW5kZXhlcy55KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci55UG9zaXRpb24gPiBzdGFydEluZGV4ZXMueSArIDIyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzcGF3bmVyLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZysrO1xyXG4gICAgICAgICAgICBpZiAoc3Bhd25lci5sYXN0VGltZVNwYXduZWRTb21ldGhpbmcgIT09IHNwYXduZXIudGltZVRvU3Bhd24pXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc3Bhd25Nb25zdGVyKHNwYXduZXIueFBvc2l0aW9uLCBzcGF3bmVyLnlQb3NpdGlvbiwgc3Bhd25lci5tb2IpO1xyXG4gICAgICAgICAgICBzcGF3bmVyLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZyA9IDA7XHJcbiAgICAgICAgICAgIHNwYXduZXIudGltZVRvU3Bhd24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzcGF3bk1vbnN0ZXIoeCwgeSwgbW9iSWQpIHtcclxuICAgICAgICBsZXQgcG9zc2libGVEaXJlY3Rpb25zID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDddO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaG9zZW5EaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZURpcmVjdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgbGV0IG5ld0Nvb3JkcyA9IHRoaXMuZGlyZWN0aW9uVG9Db29yZHMoeCwgeSwgY2hvc2VuRGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKG5ld0Nvb3Jkcy54LCBuZXdDb29yZHMueSkpIHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5hcnJheU9mTW9uc3RlcnMucHVzaChuZXcgTW9uc3Rlcihtb2JJZCwgNSwgNSAsbmV3Q29vcmRzLngsIG5ld0Nvb3Jkcy55LCAwKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTW9uc3RlcihuZXdDb29yZHMueCAvIDIsIG5ld0Nvb3Jkcy55IC8gMiwgbW9iSWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBvc3NpYmxlRGlyZWN0aW9ucy5zcGxpY2UocG9zc2libGVEaXJlY3Rpb25zLmluZGV4T2YoY2hvc2VuRGlyZWN0aW9uKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVsZXRlU3Bhd25lcihjb29yZHMpIHtcclxuICAgICAgICB0aGlzLmFycmF5T2ZTcGF3bmVycyA9IHRoaXMuYXJyYXlPZlNwYXduZXJzLmZpbHRlcihzcGF3bmVyID0+IHtcclxuICAgICAgICAgICAgaWYgKHNwYXduZXIueFBvc2l0aW9uID09IGNvb3Jkc1swXSAqIDIgJiYgc3Bhd25lci55UG9zaXRpb24gPT0gY29vcmRzWzFdICogMilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkaXJlY3Rpb25Ub0Nvb3Jkcyh4LCB5LCBkaXJlY3Rpb24pIHtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5IC0gMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4ICsgMiwgeTogeSAtIDIgfTtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCArIDIsIHk6IHkgfTtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogeCArIDIsIHk6IHkgKyAyIH07XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHkgKyAyIH07XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IHg6IHggLSAyLCB5OiB5ICsgMiB9O1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4IC0gMiwgeTogeSB9O1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiB4IC0gMiwgeTogeSAtIDIgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmaW5kR2xhc3MoeCwgeSkge1xyXG4gICAgICAgIGlmIChDb25zdHNfMS5ibG9ja0NvZGVzLmdsYXNzLmluY2x1ZGVzKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3ldW3hdKSkge1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt5XVt4XSA9IDA7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3kgKyAxXVt4XSA9IDA7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW3kgKyAxXVt4ICsgMV0gPSAwO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt5XVt4ICsgMV0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRHbGFzcyh4LCB5ICsgMik7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEdsYXNzKHgsIHkgLSAyKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kR2xhc3MoeCArIDIsIHkpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRHbGFzcyh4IC0gMiwgeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGVsZXBvcnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0ZWxlcG9ydFwiKTtcclxuICAgICAgICB0aGlzLnBvcnRhbHMuZm9yRWFjaCgocG9ydGFsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocG9ydGFsWzBdICE9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlc1swXSAvIDIgfHxcclxuICAgICAgICAgICAgICAgIHBvcnRhbFsxXSAhPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXNbMV0gLyAyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5maW5kUGxhY2VUb1RlbGVwb3J0KFtwb3J0YWxbMl0gKiAyLCBwb3J0YWxbM10gKiAyXSk7XHJcbiAgICAgICAgICAgIGlmIChyZXMgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlcyA9IFtyZXNbMF0sIHJlc1sxXV07XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmNvb3Jkc0FycmF5SW5kZXhlcywgMCk7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCA9IHJlc1swXSAvIDIgKiAxNiAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkID0gcmVzWzFdIC8gMiAqIDE2ICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQubW92ZU1hcCgpO1xyXG4gICAgICAgICAgICAvLyBwb3J0YWxDb25uZWN0aW9uLmZvckVhY2goKHBvcnRhbCwgaW5kZXgyKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9ydGFsWzBdICE9IE1haW5DaGFyYWN0ZXIuY29vcmRzQXJyYXlJbmRleGVzWzBdLzIgfHxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3J0YWxbMV0gIT0gTWFpbkNoYXJhY3Rlci5jb29yZHNBcnJheUluZGV4ZXNbMV0vMlxyXG4gICAgICAgICAgICAvLyAgICAgKSByZXR1cm5cclxuICAgICAgICAgICAgLy8gICAgIGxldCB0YXJnZXRQb3J0YWxDb29yZHM7XHJcbiAgICAgICAgICAgIC8vICAgICBpZihpbmRleDIgPT0gMCkgdGFyZ2V0UG9ydGFsQ29vcmRzID0gcG9ydGFsQ29ubmVjdGlvblsxXVxyXG4gICAgICAgICAgICAvLyAgICAgZWxzZSB0YXJnZXRQb3J0YWxDb29yZHMgPSBwb3J0YWxDb25uZWN0aW9uWzBdXHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgcmVzID0gdGhpcy5maW5kUGxhY2VUb1RlbGVwb3J0KFt0YXJnZXRQb3J0YWxDb29yZHNbMF0qMiwgdGFyZ2V0UG9ydGFsQ29vcmRzWzFdKjJdKVxyXG4gICAgICAgICAgICAvLyAgICAgaWYocmVzID09PSBudWxsKSByZXR1cm5cclxuICAgICAgICAgICAgLy8gICAgIE1haW5DaGFyYWN0ZXIuY29vcmRzQXJyYXlJbmRleGVzID0gW3Jlc1swXSwgcmVzWzFdXVxyXG4gICAgICAgICAgICAvLyAgICAgR2FtZS5nYW1lTWFwLnNldEJsb2NrMihNYWluQ2hhcmFjdGVyLmNvb3Jkc0FycmF5SW5kZXhlcywgMClcclxuICAgICAgICAgICAgLy8gICAgIE1haW5DaGFyYWN0ZXIueENvb3JkID0gcmVzWzBdLzIqIDE2ICogQ2FudmFzLm11bHRpcGxpZXJcclxuICAgICAgICAgICAgLy8gICAgIE1haW5DaGFyYWN0ZXIueUNvb3JkID0gcmVzWzFdLzIqIDE2ICogQ2FudmFzLm11bHRpcGxpZXJcclxuICAgICAgICAgICAgLy8gICAgIEdhbWUuZ2FtZU1hcC5zZXRCbG9jazIoTWFpbkNoYXJhY3Rlci5jb29yZHNBcnJheUluZGV4ZXMsIC0xKVxyXG4gICAgICAgICAgICAvLyAgICAgTWFpbkNoYXJhY3Rlci5tb3ZlTWFwKClcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZpbmRQbGFjZVRvVGVsZXBvcnQoY29vcmRzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKGNvb3Jkc1swXSArIDIsIGNvb3Jkc1sxXSkpXHJcbiAgICAgICAgICAgIHJldHVybiBbY29vcmRzWzBdICsgMiwgY29vcmRzWzFdXTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzRmllbGRDbGVhcihjb29yZHNbMF0sIGNvb3Jkc1sxXSArIDIpKVxyXG4gICAgICAgICAgICByZXR1cm4gW2Nvb3Jkc1swXSwgY29vcmRzWzFdICsgMl07XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5pc0ZpZWxkQ2xlYXIoY29vcmRzWzBdIC0gMiwgY29vcmRzWzFdKSlcclxuICAgICAgICAgICAgcmV0dXJuIFtjb29yZHNbMF0gLSAyLCBjb29yZHNbMV1dO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNGaWVsZENsZWFyKGNvb3Jkc1swXSwgY29vcmRzWzFdIC0gMikpXHJcbiAgICAgICAgICAgIHJldHVybiBbY29vcmRzWzBdLCBjb29yZHNbMV0gLSAyXTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IEdhbWVNYXA7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IENhbnZhc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NhbnZhc1wiKSk7XHJcbmNsYXNzIEhlbHBlcnMge1xyXG4gICAgZ2V0U3RhcnRJbmRleGVzKCkge1xyXG4gICAgICAgIGxldCB4ID0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYIC0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYICUgODA7XHJcbiAgICAgICAgbGV0IHkgPSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgLSBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgJSA4MDtcclxuICAgICAgICByZXR1cm4geyB4OiB4IC8gODAsIHk6IHkgLyA4MCB9O1xyXG4gICAgfVxyXG4gICAgZ2V0U3RhcnRJbmRleGVzMigpIHtcclxuICAgICAgICBsZXQgeCA9IENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCAtIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCAlIDQwO1xyXG4gICAgICAgIGxldCB5ID0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZIC0gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZICUgNDA7XHJcbiAgICAgICAgcmV0dXJuIHsgeDogeCAvIDQwLCB5OiB5IC8gNDAgfTtcclxuICAgIH1cclxuICAgIHJlcGxhY2VDb2xvckluQ2FudmFzKGNhbnZhcywgc291cmNlQ29sb3IsIHRhcmdldENvbG9yLCB0b2xlcmFuY2UpIHtcclxuICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICBpZiAoIWN0eCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEdldCB0aGUgY2FudmFzIGRpbWVuc2lvbnNcclxuICAgICAgICBjb25zdCB3aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBjb25zdCBoZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgIC8vIENyZWF0ZSBhbiBpbWFnZSBkYXRhIG9iamVjdFxyXG4gICAgICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhO1xyXG4gICAgICAgIC8vIENvbnZlcnQgdGhlIHNvdXJjZSBhbmQgdGFyZ2V0IGNvbG9ycyB0byBSR0IgZm9ybWF0XHJcbiAgICAgICAgY29uc3Qgc291cmNlUkdCID0gdGhpcy5oZXhUb1JHQihzb3VyY2VDb2xvcik7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0UkdCID0gdGhpcy5oZXhUb1JHQih0YXJnZXRDb2xvcik7XHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb2xvciBkaWZmZXJlbmNlIHRocmVzaG9sZFxyXG4gICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IE1hdGguc3FydCgzICogdG9sZXJhbmNlICogdG9sZXJhbmNlKTtcclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBwaXhlbCBpbiB0aGUgY2FudmFzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHIgPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBnID0gZGF0YVtpICsgMV07XHJcbiAgICAgICAgICAgIGNvbnN0IGIgPSBkYXRhW2kgKyAyXTtcclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb2xvciBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHBpeGVsIGFuZCB0aGUgc291cmNlIGNvbG9yXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yRGlmZmVyZW5jZSA9IHRoaXMuY2FsY3VsYXRlQ29sb3JEaWZmZXJlbmNlKHNvdXJjZVJHQiwgeyByLCBnLCBiIH0pO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgY29sb3IgZGlmZmVyZW5jZSBpcyB3aXRoaW4gdGhlIHRvbGVyYW5jZSwgcmVwbGFjZSB0aGUgY29sb3JcclxuICAgICAgICAgICAgaWYgKGNvbG9yRGlmZmVyZW5jZSA8PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbaV0gPSB0YXJnZXRSR0IucjtcclxuICAgICAgICAgICAgICAgIGRhdGFbaSArIDFdID0gdGFyZ2V0UkdCLmc7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2kgKyAyXSA9IHRhcmdldFJHQi5iO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFB1dCB0aGUgbW9kaWZpZWQgaW1hZ2UgZGF0YSBiYWNrIHRvIHRoZSBjYW52YXNcclxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XHJcbiAgICB9XHJcbiAgICBoZXhUb1JHQihoZXgpIHtcclxuICAgICAgICBoZXggPSBoZXgucmVwbGFjZSgvXiMvLCAnJyk7XHJcbiAgICAgICAgY29uc3QgYmlnaW50ID0gcGFyc2VJbnQoaGV4LCAxNik7XHJcbiAgICAgICAgY29uc3QgciA9IChiaWdpbnQgPj4gMTYpICYgMjU1O1xyXG4gICAgICAgIGNvbnN0IGcgPSAoYmlnaW50ID4+IDgpICYgMjU1O1xyXG4gICAgICAgIGNvbnN0IGIgPSBiaWdpbnQgJiAyNTU7XHJcbiAgICAgICAgcmV0dXJuIHsgciwgZywgYiB9O1xyXG4gICAgfVxyXG4gICAgY2FsY3VsYXRlQ29sb3JEaWZmZXJlbmNlKGNvbG9yMSwgY29sb3IyKSB7XHJcbiAgICAgICAgY29uc3QgZHIgPSBjb2xvcjEuciAtIGNvbG9yMi5yO1xyXG4gICAgICAgIGNvbnN0IGRnID0gY29sb3IxLmcgLSBjb2xvcjIuZztcclxuICAgICAgICBjb25zdCBkYiA9IGNvbG9yMS5iIC0gY29sb3IyLmI7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkciAqIGRyICsgZGcgKiBkZyArIGRiICogZGIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBIZWxwZXJzKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgSGVscGVyc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0hlbHBlcnNcIikpO1xyXG5jbGFzcyBJbWFnZXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fYXNzZXRzID0gbnVsbDtcclxuICAgIH1cclxuICAgIGdldCBhc3NldHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2Fzc2V0cyA9PT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWNjZXNzIGFzc2V0cyB3aGljaCBhcmUgbm90IGxvYWRlZC4nKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXNzZXRzO1xyXG4gICAgfVxyXG4gICAgbG9hZEltYWdlcygpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBbYWJpbGl0eVRleHRzLCBiaWdOdW1iZXJzLCBpdGVtcywgc3BlY2lhbEl0ZW1zLCBsZXZlbFRpdGxlU2NyZWVuLCBtYWluQ2hhcmFjdGVycywgbW9uc3RlcnMsIG51bWJlcnMsIHBpY2tVcEFiaWxpdHlTY3JlZW4sIHN0YXJ0U2NyZWVuLCB3YWxscywgd2FsbHNPcmlnaW4sIHdlYXBvbnNdID0geWllbGQgUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcImFiaWxpdHlUZXh0cy5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwiYmlnTnVtYmVycy5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwiaXRlbXMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcInNwZWNpYWxJdGVtcy5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwibGV2ZWxUaXRsZVNjcmVlbi5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwibWFpbkNoYXJhY3RlcnMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcIm1vbnN0ZXJzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJudW1iZXJzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJwaWNrVXBBYmlsaXR5U2NyZWVuLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJzdGFydFNjcmVlbi5wbmdcIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlTG9hZGVyKFwid2FsbHMucG5nXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlcihcIndhbGxzLnBuZ1wiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2VMb2FkZXIoXCJ3ZWFwb25zLnBuZ1wiKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzID0ge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eVRleHRzLFxyXG4gICAgICAgICAgICAgICAgYmlnTnVtYmVycyxcclxuICAgICAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgc3BlY2lhbEl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgbGV2ZWxUaXRsZVNjcmVlbixcclxuICAgICAgICAgICAgICAgIG1haW5DaGFyYWN0ZXJzLFxyXG4gICAgICAgICAgICAgICAgbW9uc3RlcnMsXHJcbiAgICAgICAgICAgICAgICBudW1iZXJzLFxyXG4gICAgICAgICAgICAgICAgcGlja1VwQWJpbGl0eVNjcmVlbixcclxuICAgICAgICAgICAgICAgIHN0YXJ0U2NyZWVuLFxyXG4gICAgICAgICAgICAgICAgd2VhcG9ucyxcclxuICAgICAgICAgICAgICAgIGJvdHRvbUJhcjogbmV3IEltYWdlKCksXHJcbiAgICAgICAgICAgICAgICB3YWxscyxcclxuICAgICAgICAgICAgICAgIHdhbGxzT3JpZ2luXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpbWFnZUxvYWRlcihmaWxlTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBob3RvID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBwaG90by5zcmMgPSBcImltYWdlcy9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgICAgICAgICAgcGhvdG8ub25sb2FkID0gKCkgPT4gcmVzb2x2ZShwaG90byk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbG9hZFdhbGxzVHlwZUFuZENvbG9yKHdhbGxzQ29sb3IsIHdhbGxzVHlwZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSAzMjI7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSAxNjtcclxuICAgICAgICAgICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmFzc2V0cy53YWxsc09yaWdpbiwgMCwgMTcgKiB3YWxsc1R5cGUsIDMyMiwgMTYsIDAsIDAsIDMyMiwgMTYpO1xyXG4gICAgICAgICAgICBIZWxwZXJzXzEuZGVmYXVsdC5yZXBsYWNlQ29sb3JJbkNhbnZhcyhjYW52YXMsIFwiIzYwNDllZFwiLCB3YWxsc0NvbG9yLCAzMCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Fzc2V0cyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXNzZXRzLndhbGxzID0gaW1nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBJbWFnZXMoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5EaXJlY3Rpb25zID0gdm9pZCAwO1xyXG52YXIgRGlyZWN0aW9ucztcclxuKGZ1bmN0aW9uIChEaXJlY3Rpb25zKSB7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJUT1BcIl0gPSAwXSA9IFwiVE9QXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJUT1BfUklHSFRcIl0gPSAxXSA9IFwiVE9QX1JJR0hUXCI7XHJcbiAgICBEaXJlY3Rpb25zW0RpcmVjdGlvbnNbXCJSSUdIVFwiXSA9IDJdID0gXCJSSUdIVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiQk9UVE9NX1JJR0hUXCJdID0gM10gPSBcIkJPVFRPTV9SSUdIVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiQk9UVE9NXCJdID0gNF0gPSBcIkJPVFRPTVwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiQk9UVE9NX0xFRlRcIl0gPSA1XSA9IFwiQk9UVE9NX0xFRlRcIjtcclxuICAgIERpcmVjdGlvbnNbRGlyZWN0aW9uc1tcIkxFRlRcIl0gPSA2XSA9IFwiTEVGVFwiO1xyXG4gICAgRGlyZWN0aW9uc1tEaXJlY3Rpb25zW1wiVE9QX0xFRlRcIl0gPSA3XSA9IFwiVE9QX0xFRlRcIjtcclxufSkoRGlyZWN0aW9ucyA9IGV4cG9ydHMuRGlyZWN0aW9ucyB8fCAoZXhwb3J0cy5EaXJlY3Rpb25zID0ge30pKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZVwiKSk7XHJcbmNsYXNzIEtleWJvYXJkRXZlbnRzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNwYWNlS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZUV2ZW50cyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZUV2ZW50cylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlXXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLldLZXlDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIldcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5wdXNoKFwiV1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU0tleUNsaWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdGFja09mQ2xpY2tzLmluY2x1ZGVzKFwiU1wiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnB1c2goXCJTXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5QVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0YWNrT2ZDbGlja3MuaW5jbHVkZXMoXCJBXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3MucHVzaChcIkFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlEXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRLZXlDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc3RhY2tPZkNsaWNrcy5pbmNsdWRlcyhcIkRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5wdXNoKFwiRFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIlNwYWNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNwYWNlS2V5Q2xpY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlRXZlbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleVdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiV1wiKSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFja09mQ2xpY2tzLnNwbGljZSh0aGlzLnN0YWNrT2ZDbGlja3MuaW5kZXhPZihcIlNcIiksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09IFwiS2V5QVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcy5zcGxpY2UodGhpcy5zdGFja09mQ2xpY2tzLmluZGV4T2YoXCJBXCIpLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09PSBcIktleURcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrT2ZDbGlja3Muc3BsaWNlKHRoaXMuc3RhY2tPZkNsaWNrcy5pbmRleE9mKFwiRFwiKSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJTcGFjZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3BhY2VLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gXCJLZXlDXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhck1hcEZyb21Nb25zdGVyc0FuZFNwYXduZXJzKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNsZWFuRXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuV0tleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNLZXlDbGlja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5BS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuREtleUNsaWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlNwYWNlS2V5Q2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhY2tPZkNsaWNrcyA9IFtdO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBLZXlib2FyZEV2ZW50cygpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBLZXlib2FyZEV2ZW50c18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0tleWJvYXJkRXZlbnRzXCIpKTtcclxuY29uc3QgUHJvamVjdGlsZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1Byb2plY3RpbGVcIikpO1xyXG5jb25zdCBDb25zdHNfMSA9IHJlcXVpcmUoXCIuL0NvbnN0c1wiKTtcclxuY29uc3QgU291bmRzSGFuZGxlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL1NvdW5kc0hhbmRsZXJcIikpO1xyXG5jb25zdCBTb3JjZXJlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJzL1NvcmNlcmVyXCIpKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0dhbWVcIikpO1xyXG5jb25zdCBtb3ZlID0gMjtcclxuY2xhc3MgTWFpbkNoYXJhY3RlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY29yZSA9IDIwO1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gMjAwMDtcclxuICAgICAgICB0aGlzLm93bmVkQWJpbGl0aWVzID0gW107XHJcbiAgICAgICAgdGhpcy5rZXlzID0gMDtcclxuICAgICAgICB0aGlzLnBvdGlvbnMgPSAwO1xyXG4gICAgICAgIHRoaXMueENvb3JkID0gMDtcclxuICAgICAgICB0aGlzLnlDb29yZCA9IDA7XHJcbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSAxNjtcclxuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDE2O1xyXG4gICAgICAgIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzID0gW107XHJcbiAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCA9IDE2O1xyXG4gICAgICAgIHRoaXMubGFzdERpcmVjdGlvbiA9IFs0LCAwXTtcclxuICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDU7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25GcmFtZSA9IDM7XHJcbiAgICAgICAgdGhpcy50aGlyZEZyYW1lID0gMTtcclxuICAgICAgICB0aGlzLl9sb3NpbmdIUEludGVydmFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLndlYXBvbiA9IG5ldyBQcm9qZWN0aWxlXzEuZGVmYXVsdCh0aGlzLnNvdXJjZUNvbCwgMCwgMCwgMCk7XHJcbiAgICB9XHJcbiAgICBnZXQgbG9zaW5nSFBJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5fbG9zaW5nSFBJbnRlcnZhbCA9PT0gbnVsbClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWNjZXNzIGludGVydmFsJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvc2luZ0hQSW50ZXJ2YWw7XHJcbiAgICB9XHJcbiAgICBzdGFydExvc2luZ0hQSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgdGhpcy5fbG9zaW5nSFBJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VIZWFsdGgoLTEpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gICAgc3RvcExvc2luZ0hQSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmxvc2luZ0hQSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG4gICAgY2hlY2tJZlBsYXllcklzRGVhZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5oZWFsdGggPD0gMClcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC50aW1lc1VwKCk7XHJcbiAgICB9XHJcbiAgICBhbmltYXRlUHJvamVjdGlsZSgpIHtcclxuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZjtcclxuICAgICAgICBpZiAodGhpcy53ZWFwb24ueFBvc2l0aW9uIDwgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYIC0gODAgfHxcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uID4gQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYICsgQ2FudmFzXzEuZGVmYXVsdC53aWR0aCB8fFxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPiBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgKyBDYW52YXNfMS5kZWZhdWx0LmhlaWdodCB8fFxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPCBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgLSA4MClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgUHJvamVjdGlsZUNvb3JkcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXM0KHRoaXMud2VhcG9uLnhQb3NpdGlvbiArIDIwLCB0aGlzLndlYXBvbi55UG9zaXRpb24gKyAyMCk7XHJcbiAgICAgICAgaWYgKENvbnN0c18xLmJsb2NrR3JvdXBzLm5vVHJhbnNpdGlvbkZvclByb2plY3RpbGUuaW5jbHVkZXMoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtQcm9qZWN0aWxlQ29vcmRzWzFdICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYltQcm9qZWN0aWxlQ29vcmRzWzBdICogMl0pKVxyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi50aHJvd24gPSBmYWxzZTtcclxuICAgICAgICBsZXQgaW52aXNpYmxlU29yY2VyZXJIaXQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuYmxvY2tHcm91cHMubW9uc3RlcnMuaW5jbHVkZXMoKF9kID0gKF9jID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfY1tQcm9qZWN0aWxlQ29vcmRzWzFdICogMl0pID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZFtQcm9qZWN0aWxlQ29vcmRzWzBdICogMl0pKSB7XHJcbiAgICAgICAgICAgIGxldCBraWxsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mTW9uc3RlcnMgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZNb25zdGVycy5maWx0ZXIoKG1vbnN0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChraWxsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiAtIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uICsgMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gLSAxID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiArIDEgJiYgbW9uc3Rlci55UG9zaXRpb24gKyAxID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyLnNvdXJjZUNvbHVtbiA9PT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi50aHJvd24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2lsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb25zdGVyIGluc3RhbmNlb2YgU29yY2VyZXJfMS5kZWZhdWx0ICYmIG1vbnN0ZXIuaXNWaXNpYmxlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZpc2libGVTb3JjZXJlckhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmRpZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBraWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5hcnJheU9mR29ibGlucyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZkdvYmxpbnMuZmlsdGVyKChtb25zdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2lsbGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKChtb25zdGVyLnhQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gLSAxID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiArIDEgPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1sxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IFByb2plY3RpbGVDb29yZHNbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uIC0gMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gUHJvamVjdGlsZUNvb3Jkc1swXSAqIDIgKyAxICYmIG1vbnN0ZXIueVBvc2l0aW9uICsgMSA9PSBQcm9qZWN0aWxlQ29vcmRzWzFdICogMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmRpZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBraWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGludmlzaWJsZVNvcmNlcmVySGl0ID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQ29uc3RzXzEuYmxvY2tHcm91cHMuZGVzdHJveWFibGVUaGluZ3MuaW5jbHVkZXMoKF9mID0gKF9lID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVtQcm9qZWN0aWxlQ29vcmRzWzFdICogMl0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZltQcm9qZWN0aWxlQ29vcmRzWzBdICogMl0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVRoaW5nKFByb2plY3RpbGVDb29yZHMsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLndlYXBvbi50aHJvd24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMud2VhcG9uLmRpcmVjdGlvbjtcclxuICAgICAgICBsZXQgc3BlZWQgPSA0O1xyXG4gICAgICAgIGlmIChbMiwgMywgNF0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbNiwgNywgOF0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbOCwgMSwgMl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbNCwgNSwgNl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZUNvbCAhPSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMud2VhcG9uLmFuaW1hdGlvblRpbWVzdGFtcCAlIDQgPT0gMClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24uZnJhbWUrKztcclxuICAgICAgICB0aGlzLndlYXBvbi5hbmltYXRpb25UaW1lc3RhbXArKztcclxuICAgICAgICBpZiAodGhpcy53ZWFwb24uZnJhbWUgPT0gOClcclxuICAgICAgICAgICAgdGhpcy53ZWFwb24uZnJhbWUgPSAwO1xyXG4gICAgfVxyXG4gICAgdGhyb3dXZWFwb24oKSB7XHJcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLndlYXBvbi5sYXN0VGltZVRocmV3IDwgMTUwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy53ZWFwb24ubGFzdFRpbWVUaHJldyA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy53ZWFwb24udGhyb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndlYXBvbi5mcmFtZSA9IHRoaXMubGFzdERpcmVjdGlvblswXTtcclxuICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gPSB0aGlzLnhDb29yZDtcclxuICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gPSB0aGlzLnlDb29yZDtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubGFzdERpcmVjdGlvblswXSkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDE5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSA0MDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi54UG9zaXRpb24gKz0gNDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gNDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueFBvc2l0aW9uICs9IDIwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWFwb24ueVBvc2l0aW9uICs9IDQwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnlQb3NpdGlvbiArPSAyMDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2VhcG9uLnhQb3NpdGlvbiArPSAxOTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMud2VhcG9uLnhQb3NpdGlvbis9MjA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndlYXBvbi55UG9zaXRpb24gKz0gMjA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2VhcG9uLmRpcmVjdGlvbiA9IHRoaXMubGFzdERpcmVjdGlvblswXSArIDE7XHJcbiAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcIndlYXBvblRocmV3XCIpO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlU2NvcmUocG9pbnRzKSB7XHJcbiAgICAgICAgdGhpcy5zY29yZSArPSBwb2ludHM7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VIZWFsdGgocG9pbnRzKSB7XHJcbiAgICAgICAgdGhpcy5oZWFsdGggKz0gcG9pbnRzO1xyXG4gICAgICAgIHRoaXMuY2hlY2tJZlBsYXllcklzRGVhZCgpO1xyXG4gICAgfVxyXG4gICAgcmVzZXJ2ZUFycmF5KCkge1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSB0aGlzLmFjdHVhbERpcmVjdGlvbjtcclxuICAgICAgICB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXMzKHRoaXMueENvb3JkLCB0aGlzLnlDb29yZCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIodGhpcy5jb29yZHNBcnJheUluZGV4ZXMsIC0xKTtcclxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0sIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMikpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSArIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmlzU21hbGxGaWVsZENsZWFyKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdICsgMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gKyAyKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gKyAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0sIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMikpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDJdLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgaWYgKEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuaXNTbWFsbEZpZWxkQ2xlYXIodGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gLSAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXSArIDIpKVxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2syKFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdICsgMl0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdKSlcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMihbdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF0gLSAyLCB0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXV0sIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICBpZiAoR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5pc1NtYWxsRmllbGRDbGVhcih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1swXSAtIDIsIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzWzFdIC0gMikpXHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3RoaXMuY29vcmRzQXJyYXlJbmRleGVzWzBdIC0gMiwgdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMV0gLSAyXSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYW5pbWF0ZUNoYXJhY3RlcigpIHtcclxuICAgICAgICB0aGlzLmNoZWNrRm9yUGlja2luZ0l0ZW1zKCk7XHJcbiAgICAgICAgaWYgKHRoaXMud2VhcG9uLnRocm93bilcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlUHJvamVjdGlsZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID09PSAxNikge1xyXG4gICAgICAgICAgICBpZiAoS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LlNwYWNlS2V5Q2xpY2tlZCAmJiB0aGlzLndlYXBvbi50aHJvd24gPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhyb3dXZWFwb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYXZhaWxhYmxlRGlyZWN0aW9ucyA9IHRoaXMuY2hlY2tGb3JDb2xsaXNpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb25zID0gdGhpcy5jaGVja0RpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9ucy5sZW5ndGggIT0gMClcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdERpcmVjdGlvblswXSA9IHRoaXMudHdvRGlyZWN0aW9uc0ludG9PbmUoZGlyZWN0aW9ucykgLSAxO1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uc0NvcHkgPSBbLi4uZGlyZWN0aW9uc107XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMuZm9yRWFjaChkaXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gMSAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0NvcHkuc3BsaWNlKGRpcmVjdGlvbnNDb3B5LmluZGV4T2YoMSksIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gMyAmJiBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zQ29weS5zcGxpY2UoZGlyZWN0aW9uc0NvcHkuaW5kZXhPZigzKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09PSA1ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zQ29weS5zcGxpY2UoZGlyZWN0aW9uc0NvcHkuaW5kZXhPZig1KSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09PSA3ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0NvcHkuc3BsaWNlKGRpcmVjdGlvbnNDb3B5LmluZGV4T2YoNyksIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbnNDb3B5Lmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSB0aGlzLnR3b0RpcmVjdGlvbnNJbnRvT25lKGRpcmVjdGlvbnNDb3B5KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0dWFsRGlyZWN0aW9uID09IDIgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy50b3BSaWdodCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnRvcClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gMztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0dWFsRGlyZWN0aW9uID09IDQgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21SaWdodCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmJvdHRvbSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDU7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gMztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0dWFsRGlyZWN0aW9uID09IDYgJiYgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21MZWZ0ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0dWFsRGlyZWN0aW9uID0gNTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDc7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdHVhbERpcmVjdGlvbiA9PSA4ICYmIGF2YWlsYWJsZURpcmVjdGlvbnMudG9wTGVmdCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnRvcClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdHVhbERpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3R1YWxEaXJlY3Rpb24gPSA3O1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sYXN0TW92ZVRpbWVzdGFtcCA8IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCArPSBtb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDaGFyYWN0ZXIobW92ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID49IDQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdERpcmVjdGlvblsxXSA9IHRoaXMudGhpcmRGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wIDwgMTIpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCArPSBtb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDaGFyYWN0ZXIobW92ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID49IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3REaXJlY3Rpb25bMV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGhpcmRGcmFtZSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGhpcmRGcmFtZSA9IDI7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aGlyZEZyYW1lID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wIDwgMTYpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0TW92ZVRpbWVzdGFtcCArPSBtb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDaGFyYWN0ZXIobW92ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlVGltZXN0YW1wID49IDE2KSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2syKHRoaXMuY29vcmRzQXJyYXlJbmRleGVzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29vcmRzQXJyYXlJbmRleGVzID0gdGhpcy5nZXRDb29yZGluYXRlczModGhpcy54Q29vcmQsIHRoaXMueUNvb3JkKTtcclxuICAgICAgICAgICAgICAgIGlmIChHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXV1bdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF1dID09PSBDb25zdHNfMS5ibG9ja0NvZGVzLmV4aXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmVuZE9mTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKENvbnN0c18xLmJsb2NrQ29kZXMucG9ydGFscy5pbmNsdWRlcyhHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFt0aGlzLmNvb3Jkc0FycmF5SW5kZXhlc1sxXV1bdGhpcy5jb29yZHNBcnJheUluZGV4ZXNbMF1dKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAudGVsZXBvcnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrMih0aGlzLmNvb3Jkc0FycmF5SW5kZXhlcywgLTEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5zdGFja09mQ2xpY2tzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKEtleWJvYXJkRXZlbnRzXzEuZGVmYXVsdC5TcGFjZUtleUNsaWNrZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcmVzID0gdGhpcy5jaGVja0RpcmVjdGlvbigpO1xyXG4gICAgICAgIGxldCByZXMyID0gdGhpcy50d29EaXJlY3Rpb25zSW50b09uZShyZXMpO1xyXG4gICAgICAgIHRoaXMubGFzdERpcmVjdGlvblswXSA9IHJlczIgLSAxO1xyXG4gICAgICAgIHRoaXMubGFzdE1vdmVUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMucmVzZXJ2ZUFycmF5KCk7XHJcbiAgICB9XHJcbiAgICBjaGVja0ZvckNvbGxpc2lvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgQ29vcmRzID0gdGhpcy5nZXRDb29yZGluYXRlcyh0aGlzLnhDb29yZCwgdGhpcy55Q29vcmQpO1xyXG4gICAgICAgIGxldCBhdmFpbGFibGVEaXJlY3Rpb25zID0ge1xyXG4gICAgICAgICAgICB0b3A6IHRydWUsIHRvcFJpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgICByaWdodDogdHJ1ZSwgYm90dG9tUmlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIGJvdHRvbTogdHJ1ZSwgYm90dG9tTGVmdDogdHJ1ZSxcclxuICAgICAgICAgICAgbGVmdDogdHJ1ZSwgdG9wTGVmdDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSAtIDEsIENvb3Jkc1swXSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0gKyAxLCBDb29yZHNbMF0pID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b20gPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdLCBDb29yZHNbMF0gLSAxKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMubGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0sIENvb3Jkc1swXSArIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5yaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnRvcCA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnJpZ2h0ID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSAtIDEsIENvb3Jkc1swXSArIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy50b3BSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChhdmFpbGFibGVEaXJlY3Rpb25zLnRvcCA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLmxlZnQgPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgdGhpcy5pc0ZpZWxkQ2xlYXIoQ29vcmRzWzFdIC0gMSwgQ29vcmRzWzBdIC0gMSkgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICBhdmFpbGFibGVEaXJlY3Rpb25zLnRvcExlZnQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b20gPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5yaWdodCA9PSBmYWxzZSB8fFxyXG4gICAgICAgICAgICB0aGlzLmlzRmllbGRDbGVhcihDb29yZHNbMV0gKyAxLCBDb29yZHNbMF0gKyAxKSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZURpcmVjdGlvbnMuYm90dG9tUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b20gPT0gZmFsc2UgfHxcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5sZWZ0ID09IGZhbHNlIHx8XHJcbiAgICAgICAgICAgIHRoaXMuaXNGaWVsZENsZWFyKENvb3Jkc1sxXSArIDEsIENvb3Jkc1swXSAtIDEpID09PSBmYWxzZSlcclxuICAgICAgICAgICAgYXZhaWxhYmxlRGlyZWN0aW9ucy5ib3R0b21MZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGF2YWlsYWJsZURpcmVjdGlvbnM7XHJcbiAgICB9XHJcbiAgICBjaGVja0ZvclBpY2tpbmdJdGVtcygpIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGNvbnN0IENvb3JkcyA9IHRoaXMuZ2V0Q29vcmRpbmF0ZXModGhpcy54Q29vcmQsIHRoaXMueUNvb3JkKTtcclxuICAgICAgICBjb25zdCBpdGVtSW5kZXggPSAoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW0Nvb3Jkc1sxXSAqIDJdKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbQ29vcmRzWzBdICogMl07XHJcbiAgICAgICAgaWYgKENvbnN0c18xLmJsb2NrR3JvdXBzLnBpY2thYmxlSXRlbXMuaW5jbHVkZXMoaXRlbUluZGV4KSlcclxuICAgICAgICAgICAgdGhpcy5waWNrSXRlbShpdGVtSW5kZXgsIENvb3Jkcyk7XHJcbiAgICB9XHJcbiAgICBpc0ZpZWxkQ2xlYXIoeSwgeCkge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfciwgX3MsIF90LCBfdSwgX3YsIF93LCBfeCwgX3ksIF96LCBfMCwgXzEsIF8yLCBfMywgXzQsIF81LCBfNiwgXzc7XHJcbiAgICAgICAgaWYgKCgoKF9iID0gKF9hID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVt5ICogMl0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYlt4ICogMl0pIDwgMjYgJiYgKChfZCA9IChfYyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2NbeSAqIDJdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2RbeCAqIDJdKSAhPSAwKSB8fFxyXG4gICAgICAgICAgICAoKChfZiA9IChfZSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2VbeSAqIDIgKyAxXSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mW3ggKiAyXSkgPCAyNiAmJiAoKF9oID0gKF9nID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZ1t5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2hbeCAqIDJdKSAhPSAwKSB8fFxyXG4gICAgICAgICAgICAoKChfayA9IChfaiA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfaiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2pbeSAqIDJdKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2tbeCAqIDIgKyAxXSkgPCAyNiAmJiAoKF9tID0gKF9sID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9sID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbFt5ICogMl0pID09PSBudWxsIHx8IF9tID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbVt4ICogMiArIDFdKSAhPSAwKSB8fFxyXG4gICAgICAgICAgICAoKChfcCA9IChfbyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfbyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX29beSAqIDIgKyAxXSkgPT09IG51bGwgfHwgX3AgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wW3ggKiAyICsgMV0pIDwgMjYgJiYgKChfciA9IChfcSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfcSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3FbeSAqIDIgKyAxXSkgPT09IG51bGwgfHwgX3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9yW3ggKiAyICsgMV0pICE9IDApKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKChDb25zdHNfMS5ibG9ja0NvZGVzLmdsYXNzLmluY2x1ZGVzKChfdCA9IChfcyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3NbeSAqIDJdKSA9PT0gbnVsbCB8fCBfdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3RbeCAqIDJdKSkgJiZcclxuICAgICAgICAgICAgKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF92ID0gKF91ID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF91ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdVt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfdiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3ZbeCAqIDJdKSkgJiZcclxuICAgICAgICAgICAgKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF94ID0gKF93ID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfd1t5ICogMl0pID09PSBudWxsIHx8IF94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfeFt4ICogMiArIDFdKSkgJiZcclxuICAgICAgICAgICAgKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF96ID0gKF95ID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF95ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfeVt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfeiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3pbeCAqIDIgKyAxXSkpICYmXHJcbiAgICAgICAgICAgIHRoaXMua2V5cyA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKChDb25zdHNfMS5ibG9ja0NvZGVzLmdsYXNzLmluY2x1ZGVzKChfMSA9IChfMCA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfMCA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzBbeSAqIDJdKSA9PT0gbnVsbCB8fCBfMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzFbeCAqIDJdKSkgJiZcclxuICAgICAgICAgICAgKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF8zID0gKF8yID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF8yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfMlt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfMyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzNbeCAqIDJdKSkgJiZcclxuICAgICAgICAgICAgKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF81ID0gKF80ID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF80ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNFt5ICogMl0pID09PSBudWxsIHx8IF81ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNVt4ICogMiArIDFdKSkgJiZcclxuICAgICAgICAgICAgKENvbnN0c18xLmJsb2NrQ29kZXMuZ2xhc3MuaW5jbHVkZXMoKF83ID0gKF82ID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF82ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfNlt5ICogMiArIDFdKSA9PT0gbnVsbCB8fCBfNyA9PT0gdm9pZCAwID8gdm9pZCAwIDogXzdbeCAqIDIgKyAxXSkpICYmXHJcbiAgICAgICAgICAgIHRoaXMua2V5cyA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICB0d29EaXJlY3Rpb25zSW50b09uZShkaXJlY3Rpb25zKSB7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoMSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcygzKSlcclxuICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoMSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcyg3KSlcclxuICAgICAgICAgICAgcmV0dXJuIDg7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoNSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcygzKSlcclxuICAgICAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnMuaW5jbHVkZXMoNSkgJiYgZGlyZWN0aW9ucy5pbmNsdWRlcyg3KSlcclxuICAgICAgICAgICAgcmV0dXJuIDY7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uc1swXTtcclxuICAgIH1cclxuICAgIG1vdmVDaGFyYWN0ZXIoc3BlZWQpIHtcclxuICAgICAgICAvLyAgOCAxIDJcclxuICAgICAgICAvLyA3ICBYICAzXHJcbiAgICAgICAgLy8gIDYgNSA0XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMuYWN0dWFsRGlyZWN0aW9uO1xyXG4gICAgICAgIGlmIChbMiwgMywgNF0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy54Q29vcmQgKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgaWYgKFs2LCA3LCA4XS5pbmNsdWRlcyhkaXJlY3Rpb24pKVxyXG4gICAgICAgICAgICB0aGlzLnhDb29yZCAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoWzgsIDEsIDJdLmluY2x1ZGVzKGRpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMueUNvb3JkIC09IHNwZWVkICogQ2FudmFzXzEuZGVmYXVsdC5tdWx0aXBsaWVyO1xyXG4gICAgICAgIGlmIChbNCwgNSwgNl0uaW5jbHVkZXMoZGlyZWN0aW9uKSlcclxuICAgICAgICAgICAgdGhpcy55Q29vcmQgKz0gc3BlZWQgKiBDYW52YXNfMS5kZWZhdWx0Lm11bHRpcGxpZXI7XHJcbiAgICAgICAgdGhpcy5tb3ZlTWFwKCk7XHJcbiAgICB9XHJcbiAgICBjaGVja0RpcmVjdGlvbigpIHtcclxuICAgICAgICBsZXQgYXJyID0gS2V5Ym9hcmRFdmVudHNfMS5kZWZhdWx0LnN0YWNrT2ZDbGlja3Muc2xpY2UoKTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmIChhcnIuaW5kZXhPZihcIldcIikgPiBhcnIuaW5kZXhPZihcIlNcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCgxKTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5kZXhPZihcIldcIikgPCBhcnIuaW5kZXhPZihcIlNcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCg1KTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJXXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goMSk7XHJcbiAgICAgICAgZWxzZSBpZiAoYXJyLmluY2x1ZGVzKFwiU1wiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDUpO1xyXG4gICAgICAgIGlmIChhcnIuaW5kZXhPZihcIkFcIikgPiBhcnIuaW5kZXhPZihcIkRcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCg3KTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5kZXhPZihcIkFcIikgPCBhcnIuaW5kZXhPZihcIkRcIikpXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnMucHVzaCgzKTtcclxuICAgICAgICBlbHNlIGlmIChhcnIuaW5jbHVkZXMoXCJBXCIpKVxyXG4gICAgICAgICAgICBkaXJlY3Rpb25zLnB1c2goNyk7XHJcbiAgICAgICAgZWxzZSBpZiAoYXJyLmluY2x1ZGVzKFwiRFwiKSlcclxuICAgICAgICAgICAgZGlyZWN0aW9ucy5wdXNoKDMpO1xyXG4gICAgICAgIHJldHVybiBkaXJlY3Rpb25zO1xyXG4gICAgfVxyXG4gICAgbW92ZU1hcCgpIHtcclxuICAgICAgICBsZXQgZ2FtZUNhbnZhc0hlaWdodCA9IENhbnZhc18xLmRlZmF1bHQuaGVpZ2h0IC0gMjAwO1xyXG4gICAgICAgIGxldCBtYXBYID0gdGhpcy54Q29vcmQgKyA0MCAtIChDYW52YXNfMS5kZWZhdWx0LndpZHRoICsgMSkgLyAyO1xyXG4gICAgICAgIGxldCBtYXBZID0gdGhpcy55Q29vcmQgKyA0MCAtIGdhbWVDYW52YXNIZWlnaHQgLyAyO1xyXG4gICAgICAgIGlmIChtYXBYIDwgMClcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdYID0gMDtcclxuICAgICAgICBlbHNlIGlmIChtYXBYICsgQ2FudmFzXzEuZGVmYXVsdC53aWR0aCA+PSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnhTaXplSW5QaXhlbHMpXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WCA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAueFNpemVJblBpeGVscyAtIENhbnZhc18xLmRlZmF1bHQud2lkdGg7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1ggPSBtYXBYO1xyXG4gICAgICAgIGlmIChtYXBZIDwgMClcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5yZW5kZXJlZFZpZXdZID0gMDtcclxuICAgICAgICBlbHNlIGlmIChtYXBZICsgZ2FtZUNhbnZhc0hlaWdodCA+PSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnlTaXplSW5QaXhlbHMpXHJcbiAgICAgICAgICAgIENhbnZhc18xLmRlZmF1bHQucmVuZGVyZWRWaWV3WSA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAueVNpemVJblBpeGVscyAtIGdhbWVDYW52YXNIZWlnaHQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBDYW52YXNfMS5kZWZhdWx0LnJlbmRlcmVkVmlld1kgPSBtYXBZO1xyXG4gICAgfVxyXG4gICAgZ2V0Q29vcmRpbmF0ZXMoeCwgeSkge1xyXG4gICAgICAgIGxldCB4SW5kZXggPSAoeCArIDQwIC0gKHggKyA0MCkgJSA4MCkgLyA4MDtcclxuICAgICAgICBsZXQgeUluZGV4ID0gKHkgKyA0MCAtICh5ICsgNDApICUgODApIC8gODA7XHJcbiAgICAgICAgcmV0dXJuIFt4SW5kZXgsIHlJbmRleF07XHJcbiAgICB9XHJcbiAgICBnZXRDb29yZGluYXRlczIoeCwgeSkge1xyXG4gICAgICAgIGxldCB4SW5kZXggPSB4IC8gNDA7XHJcbiAgICAgICAgbGV0IHlJbmRleCA9IHkgLyA0MDtcclxuICAgICAgICByZXR1cm4gW3hJbmRleCwgeUluZGV4XTtcclxuICAgIH1cclxuICAgIGdldENvb3JkaW5hdGVzMyh4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9ICh4IC0geCAlIDQwKSAvIDQwO1xyXG4gICAgICAgIGxldCB5SW5kZXggPSAoeSAtIHkgJSA0MCkgLyA0MDtcclxuICAgICAgICByZXR1cm4gW3hJbmRleCwgeUluZGV4XTtcclxuICAgIH1cclxuICAgIGdldENvb3JkaW5hdGVzNCh4LCB5KSB7XHJcbiAgICAgICAgbGV0IHhJbmRleCA9ICh4IC0geCAlIDgwKSAvIDgwO1xyXG4gICAgICAgIGxldCB5SW5kZXggPSAoeSAtIHkgJSA4MCkgLyA4MDtcclxuICAgICAgICByZXR1cm4gW3hJbmRleCwgeUluZGV4XTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3lUaGluZyhjb29yZHMsIGFkZFNjb3JlKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbUlEID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMl07XHJcbiAgICAgICAgc3dpdGNoIChpdGVtSUQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOiAvL2Rlc3RydWN0aWJsZSB3YWxsIDFcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuc2V0QmxvY2soY29vcmRzLCAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6IC8vZGVzdHJ1Y3RpYmxlIHdhbGwgMlxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhjb29yZHMsIDMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzogLy9kZXN0cnVjdGlibGUgd2FsbCAzXHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIwOiAvL3NtYWxsIGdob3N0IHNwYXduZXJcclxuICAgICAgICAgICAgY2FzZSAyMTpcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuY2xlYXJCbG9jayhjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5kZWxldGVTcGF3bmVyKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkU2NvcmUpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyMjogLy9iaWcgZ2hvc3Qgc3Bhd25lclxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jayhjb29yZHMsIDIwKTtcclxuICAgICAgICAgICAgICAgIGlmIChhZGRTY29yZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDIzOiAvL3NtYWxsIHRyaXBsZSBzcGF3bmVyXHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnNldEJsb2NrKGNvb3JkcywgMjUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkZFNjb3JlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjQ6IC8vYmlnIHRyaXBsZSBzcGF3bmVyXHJcbiAgICAgICAgICAgIGNhc2UgMjU6XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuZGVsZXRlU3Bhd25lcihjb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFkZFNjb3JlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAgICAgIGNhc2UgMzQ6XHJcbiAgICAgICAgICAgIGNhc2UgMzU6XHJcbiAgICAgICAgICAgIGNhc2UgMzY6XHJcbiAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyQmxvY2soY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDMzOlxyXG4gICAgICAgICAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhckJsb2NrKGNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmNsZWFyTWFwRnJvbU1vbnN0ZXJzQW5kU3Bhd25lcnMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGlja0l0ZW0oaXRlbUluZGV4LCBjb29yZHMpIHtcclxuICAgICAgICBzd2l0Y2ggKGl0ZW1JbmRleCkge1xyXG4gICAgICAgICAgICBjYXNlIDM5OiAvL2JveCAtIHRyZWFzdXJlXHJcbiAgICAgICAgICAgIGNhc2UgNDA6IC8vYm94IC0gdHJlYXN1cmVcclxuICAgICAgICAgICAgY2FzZSA0MTogLy9ib3ggLSB0cmVhc3VyZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcInBpY2tlZEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmtleTogLy8ga2V5XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleXMrKztcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTAwKTtcclxuICAgICAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJwaWNrZWRLZXlcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLnllbGxvd0JvdHRsZTogLy95ZWxsb3cgYm90dGxlIC0gY2lkZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSGVhbHRoKDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBTb3VuZHNIYW5kbGVyXzEuZGVmYXVsdC5wbGF5KFwicGlja2VkSXRlbVwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMubWVhdDogLy9mb29kXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNjb3JlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUhlYWx0aCgxMDApO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcInBpY2tlZEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLm1lZGFsbGlvbjogLy9hbXVsZXRcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU2NvcmUoMTAwKTtcclxuICAgICAgICAgICAgICAgIFNvdW5kc0hhbmRsZXJfMS5kZWZhdWx0LnBsYXkoXCJwaWNrZWRJdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5tYWdpY1BvdGlvbjogLy8gYmx1ZSBlbGl4aXJcclxuICAgICAgICAgICAgICAgIHRoaXMucG90aW9ucysrO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTY29yZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcInBpY2tlZEl0ZW1cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmZpZ2h0UG93ZXJQb3Rpb246IC8vIGxpZ2h0Ymx1ZSBlbGl4aXIgPSBmaWdodCBwb3dlclxyXG4gICAgICAgICAgICBjYXNlIENvbnN0c18xLmJsb2NrQ29kZXMubWFnaWNQb3dlclBvdGlvbjogLy8gZ3JlZW4gZWxpeGlyICAgICA9IG1hZ2ljIHBvd2VyXHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5leHRyYUFybW91clBvdGlvbjogLy8geWVsbG93IGVsaXhpciAgICA9IGV4dHJhIGFybW9yXHJcbiAgICAgICAgICAgIGNhc2UgQ29uc3RzXzEuYmxvY2tDb2Rlcy5leHRyYUNhcnJ5aW5nQWJpbGl0eVBvdGlvbjogLy8gcHVycGxlIGVsaXhpciAgICA9IGNhcnJ5aW5nIGFiaWxpdHlcclxuICAgICAgICAgICAgY2FzZSBDb25zdHNfMS5ibG9ja0NvZGVzLmV4dHJhU2hvdFBvd2VyOiAvLyBicm93biBlbGl4aXIgICAgID0gc2hvdCBwb3dlclxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm93bmVkQWJpbGl0aWVzLmluY2x1ZGVzKGl0ZW1JbmRleCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vd25lZEFiaWxpdGllcy5wdXNoKGl0ZW1JbmRleCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLnBpY2tpbmdVcEFiaWxpdHkoaXRlbUluZGV4IC0gMzQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjc6XHJcbiAgICAgICAgICAgIGNhc2UgMjg6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleXMtLTtcclxuICAgICAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuZmluZEdsYXNzKGNvb3Jkc1swXSAqIDIsIGNvb3Jkc1sxXSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQucGxheShcIm9wZW5Eb29yc1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyXVtjb29yZHNbMF0gKiAyXSA9IDA7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXBbY29vcmRzWzFdICogMl1bY29vcmRzWzBdICogMiArIDFdID0gMDtcclxuICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcFtjb29yZHNbMV0gKiAyICsgMV1bY29vcmRzWzBdICogMl0gPSAwO1xyXG4gICAgICAgIEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwW2Nvb3Jkc1sxXSAqIDIgKyAxXVtjb29yZHNbMF0gKiAyICsgMV0gPSAwO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG5ldyBNYWluQ2hhcmFjdGVyKCk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgRGVhdGggZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IERlYXRoO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBJbnRlcmZhY2VzXzEgPSByZXF1aXJlKFwiLi4vSW50ZXJmYWNlc1wiKTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vQ2FudmFzXCIpKTtcclxuY29uc3QgSW1hZ2VzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL0ltYWdlc1wiKSk7XHJcbmNvbnN0IENvbnN0c18xID0gcmVxdWlyZShcIi4uL0NvbnN0c1wiKTtcclxuY29uc3QgTWFpbkNoYXJhY3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9HYW1lXCIpKTtcclxuY2xhc3MgRGVtb24gZXh0ZW5kcyBNb25zdGVyXzEuZGVmYXVsdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICBzdXBlcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IDEsIHk6IDEgfTtcclxuICAgICAgICB0aGlzLmZpcmViYWxsVGhyZXcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZpcmViYWxsRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QO1xyXG4gICAgICAgIHRoaXMubGFzdEZpcmViYWxsVGhyZXdUaW1lc3RhbXAgPSAwO1xyXG4gICAgICAgIHRoaXMubGFzdEZpcmViYWxsVGhyZXdUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgfVxyXG4gICAgY2hlY2tGb3JTaG9vdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5maXJlYmFsbFRocmV3KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLmxhc3RGaXJlYmFsbFRocmV3VGltZXN0YW1wIDwgMTAwMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHBsYXllckNvb3JkcyA9IE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmdldENvb3JkaW5hdGVzKE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LnhDb29yZCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQueUNvb3JkKTtcclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPT0gcGxheWVyQ29vcmRzWzBdICogMiAmJiB0aGlzLnlQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1ApO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPCBwbGF5ZXJDb29yZHNbMF0gKiAyICYmIHRoaXMueVBvc2l0aW9uID09PSBwbGF5ZXJDb29yZHNbMV0gKiAyKVxyXG4gICAgICAgICAgICB0aGlzLnNob290RmlyZWJhbGwoSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQpO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uIDwgcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9SSUdIVCk7XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy54UG9zaXRpb24gPT0gcGxheWVyQ29vcmRzWzBdICogMiAmJiB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT00pO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMueFBvc2l0aW9uID4gcGxheWVyQ29vcmRzWzBdICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnlQb3NpdGlvbiA8IHBsYXllckNvb3Jkc1sxXSAqIDIgJiZcclxuICAgICAgICAgICAgTWF0aC5wb3codGhpcy54UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMF0gKiAyLCAyKSA9PT0gTWF0aC5wb3codGhpcy55UG9zaXRpb24gLSBwbGF5ZXJDb29yZHNbMV0gKiAyLCAyKSlcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEZpcmViYWxsKEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9MRUZUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1swXSAqIDIgJiYgdGhpcy55UG9zaXRpb24gPT09IHBsYXllckNvb3Jkc1sxXSAqIDIpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLnhQb3NpdGlvbiA+IHBsYXllckNvb3Jkc1swXSAqIDIgJiZcclxuICAgICAgICAgICAgdGhpcy55UG9zaXRpb24gPiBwbGF5ZXJDb29yZHNbMV0gKiAyICYmXHJcbiAgICAgICAgICAgIE1hdGgucG93KHRoaXMueFBvc2l0aW9uIC0gcGxheWVyQ29vcmRzWzBdICogMiwgMikgPT09IE1hdGgucG93KHRoaXMueVBvc2l0aW9uIC0gcGxheWVyQ29vcmRzWzFdICogMiwgMikpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RGaXJlYmFsbChJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVCk7XHJcbiAgICB9XHJcbiAgICBzaG9vdEZpcmViYWxsKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDIwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgMTksIHk6IHRoaXMueVBvc2l0aW9uICogNDAgKyAyMCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYWxsQ29vcmRzID0geyB4OiB0aGlzLnhQb3NpdGlvbiAqIDQwICsgNjAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgKyAyMCB9O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCArIDYwLCB5OiB0aGlzLnlQb3NpdGlvbiAqIDQwICsgNjAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTTpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyAyMCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDYwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAgKyAxOSwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZUOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFsbENvb3JkcyA9IHsgeDogdGhpcy54UG9zaXRpb24gKiA0MCwgeTogdGhpcy55UG9zaXRpb24gKiA0MCArIDIwIH07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVDpcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMgPSB7IHg6IHRoaXMueFBvc2l0aW9uICogNDAsIHk6IHRoaXMueVBvc2l0aW9uICogNDAgfTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpcmViYWxsVGhyZXcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmlyZWJhbGxEaXJlY3Rpb24gPSB0aGlzLmxvb2tpbmdEaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5sYXN0RmlyZWJhbGxUaHJld1RpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICB9XHJcbiAgICBhbmltYXRlRmlyZWJhbGwocmVuZGVyZWRWaWV3KSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaDtcclxuICAgICAgICBpZiAodGhpcy5maXJlYmFsbFRocmV3ID09PSBmYWxzZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGZpcmViYWxsQ29vcmRzQXJyYXkgPSBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5nZXRDb29yZGluYXRlczQodGhpcy5maXJlYmFsbENvb3Jkcy54ICsgMjAsIHRoaXMuZmlyZWJhbGxDb29yZHMueSArIDIwKTtcclxuICAgICAgICBpZiAoQ29uc3RzXzEuYmxvY2tHcm91cHMubm9UcmFuc2l0aW9uRm9yUHJvamVjdGlsZS5pbmNsdWRlcygoX2IgPSAoX2EgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW2ZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iW2ZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyXSkpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxUaHJldyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChDb25zdHNfMS5ibG9ja0dyb3Vwcy5tb25zdGVycy5pbmNsdWRlcygoX2QgPSAoX2MgPSBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLm1hcCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jW2ZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kW2ZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyXSkpIHtcclxuICAgICAgICAgICAgbGV0IGtpbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHYW1lXzEuZGVmYXVsdC5nYW1lTWFwLmFycmF5T2ZNb25zdGVycyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAuYXJyYXlPZk1vbnN0ZXJzLmZpbHRlcihtb25zdGVyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtb25zdGVyLnhQb3NpdGlvbiA9PT0gdGhpcy54UG9zaXRpb24gJiYgbW9uc3Rlci55UG9zaXRpb24gPT09IHRoaXMueVBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnN0ZXIuc291cmNlQ29sdW1uID09PSA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNoYW5nZVNjb3JlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGtpbGxlZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICgobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uIC0gMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMikgfHxcclxuICAgICAgICAgICAgICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gKyAxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0gKiAyKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMiAmJiBtb25zdGVyLnlQb3NpdGlvbiAtIDEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDIpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0gKiAyICsgMSAmJiBtb25zdGVyLnlQb3NpdGlvbiArIDEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5kaWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBHYW1lLmdhbWVNYXAuYXJyYXlPZkdvYmxpbnMgPSBHYW1lLmdhbWVNYXAuYXJyYXlPZkdvYmxpbnMuZmlsdGVyKG1vbnN0ZXI9PntcclxuICAgICAgICAgICAgLy8gICAgIGlmKGtpbGxlZCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiggXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMF0qMiAmJiBtb25zdGVyLnlQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzFdKjIpIHx8XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgKG1vbnN0ZXIueFBvc2l0aW9uLTEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSoyICYmIG1vbnN0ZXIueVBvc2l0aW9uID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0qMikgfHxcclxuICAgICAgICAgICAgLy8gICAgICAgICAobW9uc3Rlci54UG9zaXRpb24rMSA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdKjIgJiYgbW9uc3Rlci55UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSoyKSB8fCBcclxuICAgICAgICAgICAgLy8gICAgICAgICAobW9uc3Rlci54UG9zaXRpb24gPT0gZmlyZWJhbGxDb29yZHNBcnJheVswXSoyICYmIG1vbnN0ZXIueVBvc2l0aW9uLTEgPT0gZmlyZWJhbGxDb29yZHNBcnJheVsxXSoyKSB8fFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIChtb25zdGVyLnhQb3NpdGlvbiA9PSBmaXJlYmFsbENvb3Jkc0FycmF5WzBdKjIrMSAmJiBtb25zdGVyLnlQb3NpdGlvbisxID09IGZpcmViYWxsQ29vcmRzQXJyYXlbMV0qMilcclxuICAgICAgICAgICAgLy8gICAgICl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbW9uc3Rlci5kaWUoZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGtpbGxlZCA9IHRydWVcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKENvbnN0c18xLmJsb2NrR3JvdXBzLmRlc3Ryb3lhYmxlQnlEZW1vbnMuaW5jbHVkZXMoKF9mID0gKF9lID0gR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5tYXApID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZVtmaXJlYmFsbENvb3Jkc0FycmF5WzFdICogMl0pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZltmaXJlYmFsbENvb3Jkc0FycmF5WzBdICogMl0pKSB7XHJcbiAgICAgICAgICAgIE1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LmRlc3Ryb3lUaGluZyhmaXJlYmFsbENvb3Jkc0FycmF5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxUaHJldyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKChfaCA9IChfZyA9IEdhbWVfMS5kZWZhdWx0LmdhbWVNYXAubWFwKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2dbZmlyZWJhbGxDb29yZHNBcnJheVsxXSAqIDJdKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2hbZmlyZWJhbGxDb29yZHNBcnJheVswXSAqIDJdKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuY2hhbmdlSGVhbHRoKC01KTtcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFsbFRocmV3ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gMjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT01fTEVGVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueCAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVCwgSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuUklHSFQsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9SSUdIVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueCArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1AsIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueSAtPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICBpZiAoW0ludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9MRUZULCBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5CT1RUT00sIEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLkJPVFRPTV9SSUdIVF0uaW5jbHVkZXModGhpcy5maXJlYmFsbERpcmVjdGlvbikpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhbGxDb29yZHMueSArPSBzcGVlZCAqIENhbnZhc18xLmRlZmF1bHQubXVsdGlwbGllcjtcclxuICAgICAgICB0aGlzLmRyYXdGaXJlYmFsbChyZW5kZXJlZFZpZXcpO1xyXG4gICAgfVxyXG4gICAgZHJhd0ZpcmViYWxsKHJlbmRlcmVkVmlldykge1xyXG4gICAgICAgIENhbnZhc18xLmRlZmF1bHQuY3R4LmRyYXdJbWFnZShJbWFnZXNfMS5kZWZhdWx0LmFzc2V0cy53ZWFwb25zLCB0aGlzLmZpcmViYWxsRGlyZWN0aW9uICogOSwgMyAqIDksIDgsIDgsIHRoaXMuZmlyZWJhbGxDb29yZHMueCAtIHJlbmRlcmVkVmlldy54LCB0aGlzLmZpcmViYWxsQ29vcmRzLnkgLSByZW5kZXJlZFZpZXcueSwgOCAqIENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyLCA4ICogQ29uc3RzXzEuQ29uc3RhbnRzLm11bHRpcGxpZXIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IERlbW9uO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNb25zdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlclwiKSk7XHJcbmNsYXNzIEdob3N0IGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBHaG9zdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgTW9uc3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01vbnN0ZXJcIikpO1xyXG5jbGFzcyBHcnVudCBleHRlbmRzIE1vbnN0ZXJfMS5kZWZhdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNvdXJjZUNvbHVtbiwgZGFtYWdlLCBoZWFsdGgsIHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzdGFydERpcmVjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gR3J1bnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IE1vbnN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Nb25zdGVyXCIpKTtcclxuY2xhc3MgTG9iYmVyIGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLnJvY2tDb29yZHMgPSB7IHg6IDEsIHk6IDEgfTtcclxuICAgICAgICB0aGlzLnJvY2tUaHJldyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyUm9jayhzdGFydEluZGV4ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5yb2NrQ29vcmRzLnggPj0gc3RhcnRJbmRleGVzLnggKiAyICYmXHJcbiAgICAgICAgICAgIHRoaXMucm9ja0Nvb3Jkcy54IDw9IHN0YXJ0SW5kZXhlcy54ICogMiArIDM0ICYmXHJcbiAgICAgICAgICAgIHRoaXMucm9ja0Nvb3Jkcy55ID49IHN0YXJ0SW5kZXhlcy55ICogMiAmJlxyXG4gICAgICAgICAgICB0aGlzLnJvY2tDb29yZHMueSA8PSBzdGFydEluZGV4ZXMueSAqIDIgKyAyMikgeyB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gTG9iYmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNYWluQ2hhcmFjdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4uL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jb25zdCBJbnRlcmZhY2VzXzEgPSByZXF1aXJlKFwiLi4vSW50ZXJmYWNlc1wiKTtcclxuY29uc3QgR2FtZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9HYW1lXCIpKTtcclxuY2xhc3MgTW9uc3RlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb3VyY2VDb2x1bW4sIGRhbWFnZSwgaGVhbHRoLCB4UG9zaXRpb24sIHlQb3NpdGlvbiwgc3RhcnREaXJlY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmlkID0gMDtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbHVtbiA9IDA7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xyXG4gICAgICAgIHRoaXMuaGVhbHRoID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5tb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2VGcm9tUGxheWVyID0gMDtcclxuICAgICAgICB0aGlzLnNvdXJjZUNvbHVtbiA9IHNvdXJjZUNvbHVtbjtcclxuICAgICAgICB0aGlzLmRhbWFnZSA9IGRhbWFnZTtcclxuICAgICAgICB0aGlzLmhlYWx0aCA9IGhlYWx0aDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IHhQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnlQb3NpdGlvbiA9IHlQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmlkID0gLSg4MCArIHNvdXJjZUNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gc3RhcnREaXJlY3Rpb247XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5zZXRCbG9jazIoW3hQb3NpdGlvbiwgeVBvc2l0aW9uXSwgdGhpcy5pZCk7XHJcbiAgICB9XHJcbiAgICBsb29rQXRNZSh4Q29vcmQsIHlDb29yZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA9PSB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPiB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuVE9QO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA9PSB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPCB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnlQb3NpdGlvbiA9PSB5Q29vcmQgJiYgdGhpcy54UG9zaXRpb24gPiB4Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuTEVGVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy55UG9zaXRpb24gPT0geUNvb3JkICYmIHRoaXMueFBvc2l0aW9uIDwgeENvb3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlJJR0hUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnhQb3NpdGlvbiA+IHhDb29yZCAmJiB0aGlzLnlQb3NpdGlvbiA+IHlDb29yZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvb2tpbmdEaXJlY3Rpb24gPSBJbnRlcmZhY2VzXzEuRGlyZWN0aW9ucy5UT1BfTEVGVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPiB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPCB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX0xFRlQ7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMueFBvc2l0aW9uIDwgeENvb3JkICYmIHRoaXMueVBvc2l0aW9uID4geUNvb3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9va2luZ0RpcmVjdGlvbiA9IEludGVyZmFjZXNfMS5EaXJlY3Rpb25zLlRPUF9SSUdIVDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy54UG9zaXRpb24gPCB4Q29vcmQgJiYgdGhpcy55UG9zaXRpb24gPCB5Q29vcmQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb29raW5nRGlyZWN0aW9uID0gSW50ZXJmYWNlc18xLkRpcmVjdGlvbnMuQk9UVE9NX1JJR0hUO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGllKGFkZFNjb3JlKSB7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhckJsb2NrMihbdGhpcy54UG9zaXRpb24sIHRoaXMueVBvc2l0aW9uXSk7XHJcbiAgICAgICAgaWYgKGFkZFNjb3JlKVxyXG4gICAgICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VTY29yZSg1KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBNb25zdGVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBNb25zdGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vTW9uc3RlclwiKSk7XHJcbmNsYXNzIFNvcmNlcmVyIGV4dGVuZHMgTW9uc3Rlcl8xLmRlZmF1bHQge1xyXG4gICAgY29uc3RydWN0b3Ioc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc291cmNlQ29sdW1uLCBkYW1hZ2UsIGhlYWx0aCwgeFBvc2l0aW9uLCB5UG9zaXRpb24sIHN0YXJ0RGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IFNvcmNlcmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBDb25zdHNfMSA9IHJlcXVpcmUoXCIuL0NvbnN0c1wiKTtcclxuY29uc3QgSW1hZ2VzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vSW1hZ2VzXCIpKTtcclxuY29uc3QgTWFpbkNoYXJhY3Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL01haW5DaGFyYWN0ZXJcIikpO1xyXG5jbGFzcyBQcm9qZWN0aWxlIHtcclxuICAgIGNvbnN0cnVjdG9yKHNvdXJjZVJvdywgZGlyZWN0aW9uLCB4UG9zaXRpb24sIHlQb3NpdGlvbikge1xyXG4gICAgICAgIHRoaXMuc291cmNlUm93ID0gMDtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5mcmFtZSA9IDA7XHJcbiAgICAgICAgdGhpcy54UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnRocm93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uVGltZXN0YW1wID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lVGhyZXcgPSAwO1xyXG4gICAgICAgIHRoaXMuc291cmNlUm93ID0gc291cmNlUm93O1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xyXG4gICAgICAgIHRoaXMueFBvc2l0aW9uID0geFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0geVBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgZHJhdyhyZW5kZXJlZFZpZXcpIHtcclxuICAgICAgICBpZiAoIU1haW5DaGFyYWN0ZXJfMS5kZWZhdWx0LndlYXBvbi50aHJvd24pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBDYW52YXNfMS5kZWZhdWx0LmN0eC5kcmF3SW1hZ2UoSW1hZ2VzXzEuZGVmYXVsdC5hc3NldHMud2VhcG9ucywgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQud2VhcG9uLmZyYW1lICogOSwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQuc291cmNlQ29sICogOSwgOCwgOCwgTWFpbkNoYXJhY3Rlcl8xLmRlZmF1bHQud2VhcG9uLnhQb3NpdGlvbiAtIHJlbmRlcmVkVmlldy54LCBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC53ZWFwb24ueVBvc2l0aW9uIC0gcmVuZGVyZWRWaWV3LnksIDggKiBDb25zdHNfMS5Db25zdGFudHMubXVsdGlwbGllciwgOCAqIENvbnN0c18xLkNvbnN0YW50cy5tdWx0aXBsaWVyKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBQcm9qZWN0aWxlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNsYXNzIGNTb3VuZEZpbGUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ1ZmZlciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sb2FkRmlsZSA9IChmaWxlX25hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGV4dCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnhoci5vcGVuKFwiR0VUXCIsIGZpbGVfbmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgdGhpcy54aHIub25sb2FkID0gdGhpcy5vbkxvYWRDb21wbGV0ZTtcclxuICAgICAgICAgICAgdGhpcy54aHIuc2VuZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vbkxvYWRDb21wbGV0ZSA9IChldikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIHRoaXMueGhyID0gZXYuY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgKF9hID0gdGhpcy5jb250ZXh0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGVjb2RlQXVkaW9EYXRhKHRoaXMueGhyLnJlc3BvbnNlLCB0aGlzLmRlY29kZURhdGEpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kZWNvZGVEYXRhID0gKGJ1ZmZlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wbGF5ID0gKHN0YXJ0X3RpbWUsIGR1cmF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZENvbXBsZXRlID09PSBmYWxzZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLmJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuc291cmNlLnN0YXJ0KHRoaXMuY29udGV4dC5jdXJyZW50VGltZSwgc3RhcnRfdGltZSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBhdWRpb1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkRmlsZShcIi4vc291bmRzL2F1ZGlvLm1wM1wiKTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBjU291bmRNYXJrZXIge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgc3RhcnQsIGR1cmF0aW9uLCB2b2x1bWUsIGxvb3ApIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSAwO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMDtcclxuICAgICAgICB0aGlzLmxvb3AgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICAgICAgdGhpcy5sb29wID0gbG9vcDtcclxuICAgIH1cclxufVxyXG5jbGFzcyBjU291bmRNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubXV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc291bmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fanNvbkZpbGVMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zb3VuZEZpbGVTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc291bmRNYXJrZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5fc291bmRGaWxlID0gbmV3IGNTb3VuZEZpbGUoKTtcclxuICAgICAgICB0aGlzLm1wM0VuYWJsZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImF1ZGlvXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gISEoYS5jYW5QbGF5VHlwZSAmJiBhLmNhblBsYXlUeXBlKFwiYXVkaW8vbXBlZztcIikucmVwbGFjZSgvbm8vLCAnJykpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wbGF5ID0gKHNvdW5kX25hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXV0ZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IG1hcmtlciA9IHRoaXMuc291bmRNYXJrZXJzW3NvdW5kX25hbWVdO1xyXG4gICAgICAgICAgICBpZiAobWFya2VyID09PSBudWxsIHx8IG1hcmtlciA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGUucGxheShtYXJrZXIuc3RhcnQsIG1hcmtlci5kdXJhdGlvbik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl9sb2FkTWFya2VycyA9IChqc29uZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgbWFya2VyX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICBtYXJrZXJfeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtYXJrZXJfeGhyLnJlYWR5U3RhdGUgPT09IFhNTEh0dHBSZXF1ZXN0LkRPTkUgJiYgbWFya2VyX3hoci5zdGF0dXMgPT09IDIwMClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblJlYWQoSlNPTi5wYXJzZShtYXJrZXJfeGhyLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoWzQwNCwgNDAzXS5pbmNsdWRlcyhtYXJrZXJfeGhyLnJlYWR5U3RhdGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uRXJyb3IobWFya2VyX3hocik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1hcmtlcl94aHIub3BlbihcIkdFVFwiLCBqc29uZmlsZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIG1hcmtlcl94aHIuc2VuZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fb25SZWFkID0gKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbWFya2VyX25hbWUgaW4gZGF0YS5tYXJrZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFya2VycyA9IGRhdGEubWFya2Vyc1ttYXJrZXJfbmFtZV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihuZXcgY1NvdW5kTWFya2VyKG1hcmtlcl9uYW1lLCBtYXJrZXJzLnN0YXJ0LCBtYXJrZXJzLmR1cmF0aW9uLCBtYXJrZXJzLnZvbHVtZSwgbWFya2Vycy5sb29wKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fanNvbkZpbGVMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc291bmRGaWxlLmxvYWRDb21wbGV0ZSA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tcDNFbmFibGVkKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGUubG9hZEZpbGUodGhpcy5fc291bmRGaWxlU3RyaW5nICsgXCIubXAzXCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGUubG9hZEZpbGUodGhpcy5fc291bmRGaWxlU3RyaW5nICsgXCIub2dnXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5Tb3VuZEZpbGVMb2FkZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9qc29uRmlsZUxvYWRlZCA9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3VuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fb25FcnJvciA9ICh4aHIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIQVZFIE5PVCBMT0FERUQgU09VTkQgTUFSS0VSIEZJTEU6IFwiICsgdGhpcy5fc291bmRGaWxlU3RyaW5nICsgXCIuanNvbiBzdGF0dXM9XCIgKyB4aHIucmVhZHlTdGF0ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFkZE1hcmtlciA9IChzb3VuZF9tYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb3VuZE1hcmtlcnNbc291bmRfbWFya2VyLm5hbWVdID0gc291bmRfbWFya2VyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIgPSAobWFya2VyX25hbWUpID0+IHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc291bmRNYXJrZXJzW21hcmtlcl9uYW1lXTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgaW5pdGlhbGl6ZVNvdW5kTWFuYWdlcigpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VuZF9maWxlID0gXCIuL3NvdW5kcy9hdWRpb1wiO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZEZpbGVTdHJpbmcgPSBzb3VuZF9maWxlO1xyXG4gICAgICAgICAgICB0aGlzLl9sb2FkTWFya2Vycyhzb3VuZF9maWxlICsgXCIuanNvblwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBuZXcgY1NvdW5kTWFuYWdlcigpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBHYW1lXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vR2FtZVwiKSk7XHJcbmNvbnN0IE1haW5DaGFyYWN0ZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9NYWluQ2hhcmFjdGVyXCIpKTtcclxuY2xhc3MgU3Bhd25lciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBtb2JJZCkge1xyXG4gICAgICAgIHRoaXMubW9iID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lU3Bhd25lZFNvbWV0aGluZyA9IDA7XHJcbiAgICAgICAgdGhpcy50aW1lVG9TcGF3biA9IDA7XHJcbiAgICAgICAgdGhpcy54UG9zaXRpb24gPSAwO1xyXG4gICAgICAgIHRoaXMueVBvc2l0aW9uID0gMDtcclxuICAgICAgICB0aGlzLnhQb3NpdGlvbiA9IHg7XHJcbiAgICAgICAgdGhpcy55UG9zaXRpb24gPSB5O1xyXG4gICAgICAgIHRoaXMubW9iID0gbW9iSWQ7XHJcbiAgICAgICAgdGhpcy50aW1lVG9TcGF3biA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3llZCgpIHtcclxuICAgICAgICBNYWluQ2hhcmFjdGVyXzEuZGVmYXVsdC5jaGFuZ2VTY29yZSgxMCk7XHJcbiAgICAgICAgR2FtZV8xLmRlZmF1bHQuZ2FtZU1hcC5jbGVhckJsb2NrMihbdGhpcy54UG9zaXRpb24sIHRoaXMueVBvc2l0aW9uXSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gU3Bhd25lcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jb25zdCBDYW52YXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9DYW52YXNcIikpO1xyXG5jb25zdCBJbWFnZXNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9JbWFnZXNcIikpO1xyXG5jb25zdCBTb3VuZHNIYW5kbGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vU291bmRzSGFuZGxlclwiKSk7XHJcbmNvbnN0IEdhbWVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9HYW1lXCIpKTtcclxuY29uc3QgS2V5Ym9hcmRFdmVudHNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9LZXlib2FyZEV2ZW50c1wiKSk7XHJcbmNsYXNzIExvYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0QnV0dG9uRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydEJ1dHRvbkRpdlwiKTtcclxuICAgICAgICB0aGlzLnN0YXJ0R2FtZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hhcmFjdGVyU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXJTZWxlY3RcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwU2VsZWN0XCIpO1xyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyU2VsZWN0ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAobWFwU2VsZWN0ID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZENoYXJhY3RlciA9IGNoYXJhY3RlclNlbGVjdC52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRNYXAgPSBtYXBTZWxlY3QudmFsdWU7XHJcbiAgICAgICAgICAgIEdhbWVfMS5kZWZhdWx0LnN0YXJ0R2FtZShzZWxlY3RlZENoYXJhY3Rlciwgc2VsZWN0ZWRNYXApO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGFydEJ1dHRvbkRpdiAhPT0gbnVsbCAmJiB0aGlzLnN0YXJ0QnV0dG9uRGl2LmZpcnN0RWxlbWVudENoaWxkICE9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJ1dHRvbkRpdi5yZW1vdmVDaGlsZCh0aGlzLnN0YXJ0QnV0dG9uRGl2LmZpcnN0RWxlbWVudENoaWxkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubG9hZFV0aWxpdGllcygpO1xyXG4gICAgfVxyXG4gICAgbG9hZFV0aWxpdGllcygpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB5aWVsZCBJbWFnZXNfMS5kZWZhdWx0LmxvYWRJbWFnZXMoKTtcclxuICAgICAgICAgICAgeWllbGQgU291bmRzSGFuZGxlcl8xLmRlZmF1bHQuaW5pdGlhbGl6ZVNvdW5kTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB5aWVsZCBLZXlib2FyZEV2ZW50c18xLmRlZmF1bHQuYWRkTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU3RhcnRCdXR0b24oKTtcclxuICAgICAgICAgICAgQ2FudmFzXzEuZGVmYXVsdC5kcmF3U3RhcnRTY3JlZW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNyZWF0ZVN0YXJ0QnV0dG9uKCkge1xyXG4gICAgICAgIGxldCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgc3RhcnRCdXR0b24uaW5uZXJUZXh0ID0gXCJTdGFydCBnYW1lIVwiO1xyXG4gICAgICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0YXJ0R2FtZSk7XHJcbiAgICAgICAgdGhpcy5zdGFydEJ1dHRvbkRpdi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gbmV3IExvYWRlcigpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=