import Canvas from "./Canvas";
import MainCharacter from "./MainCharacter";
import Demon from './Monsters/Demon'
import Spawner from './Spawner'
import Ghost from './Monsters/Ghost'
import Grunt from './Monsters/Grunt'
import Death from "./Monsters/Death";
import Sorcerer from "./Monsters/Sorcerer";
import Goblin from "./Monsters/Lobber";
import Coordinates from './Interfaces'
import Helpers from "./Helpers";
import KeyboardEvents from "./KeyboardEvents";
import Images from "./Images";
import cSoundManager from "./SoundsHandler";
import Game from "./Game";

export default class GameMap{
    map: number[][] = [[]];
    levelNumber: number = 0;
    numberOfXBlocks: number = 0;
    numberOfYBlocks: number = 0;
    xSizeInPixels: number = 0;
    ySizeInPixels: number = 0;
    universalBoxFrameIndex: number = 0
    universalMonstersFrameIndex: number = 1
    arrayOfMonsters: (Ghost|Grunt|Demon|Death|Sorcerer)[] = []
    arrayOfGoblins: Goblin[] = []
    arrayOfSpawners: Spawner[] = []
    stopGame: boolean = false;
    moveMonstersTimestamp: number = 0;
    arrayOfMonstersToCreate: {x:number, y:number, id:number}[] = []
    spawningMonstersInterval: NodeJS.Timeout | null = null;
    animateSpritesInterval: NodeJS.Timeout | null = null;
    portals:number[][][] = []

    async clearMap(){
        this.map = [[]]
        this.arrayOfMonsters = []
        this.arrayOfGoblins = []
        this.arrayOfSpawners = []
        this.arrayOfMonstersToCreate = []
    }

    async loadMap(mapName: string, characterName:string){
        let characterNumber = 0
        if(characterName === "Warrior") characterNumber = 0
        else if(characterName === "Valkyrie") characterNumber = 1
        else if(characterName === "Elf") characterNumber = 2
        else if(characterName === "Wizard") characterNumber = 3
        MainCharacter.sourceCol = characterNumber

        const response = await fetch(`./jsonMaps/map${mapName}.json`);
        const loadedData = await response.json();

        Images.assets.bottomBar = await Images.imageLoader("bottomBar"+characterNumber+".png")

        this.map =  this.createBiggerMap(loadedData.array);

        this.levelNumber = loadedData.levelNumber
        
        this.arrayOfMonstersToCreate.forEach(monster=>{
            this.createMonster(monster.x, monster.y, monster.id)
        })

        MainCharacter.xCoord = loadedData.characterStartCoords[0] * 16 * Canvas.multiplier;
        MainCharacter.yCoord = loadedData.characterStartCoords[1] * 16 * Canvas.multiplier;
        MainCharacter.coordsArrayIndexes = [loadedData.characterStartCoords[0]*2, loadedData.characterStartCoords[1]*2]
        Game.gameMap.setBlock2(MainCharacter.coordsArrayIndexes, -1)

        this.numberOfXBlocks = loadedData.width;
        this.numberOfYBlocks = loadedData.height;

        this.portals = loadedData.portals

        this.xSizeInPixels = this.numberOfXBlocks * 16 * Canvas.multiplier;
        this.ySizeInPixels = this.numberOfYBlocks * 16 * Canvas.multiplier;

        MainCharacter.score = loadedData.startScore;
        MainCharacter.health = loadedData.startHealth;
        
        MainCharacter.moveMap()

        
        await Images.loadWallsTypeAndColor(loadedData.wallsColor, loadedData.wallsType)
    }

    createBiggerMap(inputMap: number[][]){
        let doubledMap:number[][] = []

        inputMap.forEach((row, rowIndex) => {
            let doubledRow: number[] = []
            row.forEach((cell, cellIndex) => {
                if([20,21,22].includes(cell)){
                    const itemNumber = this.createSpawner(cellIndex, rowIndex, cell);
                    doubledRow.push(itemNumber, itemNumber)
                }
                else if(cell >= 70 && cell <=78){
                    const itemNumber = this.createSpawner(cellIndex, rowIndex, cell);
                    doubledRow.push(itemNumber, itemNumber)
                }
                else if(cell<=-80 && cell>=-85){
                    this.arrayOfMonstersToCreate.push({x:cellIndex, y:rowIndex, id:cell*(-1)-80})
                    doubledRow.push(0,0)
                }
                else doubledRow.push(cell, cell)
            })
            doubledMap.push([...doubledRow], [...doubledRow])
        })
        return doubledMap;
    }

    setOneField(x: number, y: number, value: number){
        this.map[y][x] = value;
    }

    clearBlock(coords: number[]){
        this.map[coords[1]*2][coords[0]*2] = 0
        this.map[coords[1]*2][coords[0]*2+1] = 0
        this.map[coords[1]*2+1][coords[0]*2] = 0
        this.map[coords[1]*2+1][coords[0]*2+1] = 0
    }

    clearBlock2(coords: number[]){
        this.map[coords[1]][coords[0]] = 0
        this.map[coords[1]][coords[0]+1] = 0
        this.map[coords[1]+1][coords[0]] = 0
        this.map[coords[1]+1][coords[0]+1] = 0
    }

    setBlock(coords: number[], newValue: number){       
        this.map[coords[1]*2][coords[0]*2] = newValue
        this.map[coords[1]*2][coords[0]*2+1] = newValue
        this.map[coords[1]*2+1][coords[0]*2] = newValue
        this.map[coords[1]*2+1][coords[0]*2+1] = newValue
    }

    setBlock2(coords: number[], newValue: number){
        this.map[coords[1]][coords[0]] = newValue;
        this.map[coords[1]][coords[0]+1] = newValue;
        this.map[coords[1]+1][coords[0]] = newValue;
        this.map[coords[1]+1][coords[0]+1] = newValue;
    }

    timesUp(){
        MainCharacter.health = 0;
        cancelAnimationFrame(Canvas.raf)
        Canvas.drawScoreAndHealth()
    }

    async pickingUpAbility(itemIndex: number){
        Game.gameMap.stopGame = true
        
        MainCharacter.stopLosingHPInterval()
        Canvas.drawAbilityScreen(itemIndex);
        cSoundManager.play("pickedAbility");

        setTimeout(() => {
            this.stopGame = false
            Canvas.raf = window.requestAnimationFrame(() => Canvas.renderGameFrame());
            MainCharacter.startLosingHPInterval()
        }, 2000)
    }
    
    endOfLevel = () => {
        cSoundManager.play("enteringExit");
        KeyboardEvents.disableEvents = true;
        KeyboardEvents.WKeyClicked = false;
        KeyboardEvents.SKeyClicked = false;
        KeyboardEvents.AKeyClicked = false;
        KeyboardEvents.DKeyClicked = false;
        KeyboardEvents.SpaceKeyClicked = false;

        MainCharacter.stopLosingHPInterval()
        cancelAnimationFrame(Canvas.raf)
        this.stopGame = true;
        Canvas.raf = requestAnimationFrame(()=>Canvas.animateEnding())
    }

    setIntervals(){
        this.animateSpritesInterval = setInterval(() => {
            const startIndexes = Helpers.getStartIndexes();

            for(let i:number=0; i<17; i++){
                for (let j:number = 0; j<11; j++){
                    if([26,27,28].includes(this.map?.[startIndexes.y*2 + j*2]?.[startIndexes.x*2 +i*2])) this.map[startIndexes.y*2 + j*2][startIndexes.x*2 +i*2] = 26+this.universalBoxFrameIndex
                    if([42,43,44].includes(this.map?.[startIndexes.y*2 + j*2]?.[startIndexes.x*2 +i*2])) this.map[startIndexes.y*2 + j*2][startIndexes.x*2 +i*2] = 42+this.universalBoxFrameIndex
                }
            }
            this.universalBoxFrameIndex++;
            if(this.universalBoxFrameIndex == 3) this.universalBoxFrameIndex=0

            if(this.universalMonstersFrameIndex == 1) this.universalMonstersFrameIndex = 3
            else if(this.universalMonstersFrameIndex == 3) this.universalMonstersFrameIndex = 2
            else if(this.universalMonstersFrameIndex == 2) this.universalMonstersFrameIndex = 6
            else if(this.universalMonstersFrameIndex == 6) this.universalMonstersFrameIndex = 1
        }, 150);

        this.spawningMonstersInterval = setInterval(()=>{
            this.spawnMonsters();
        },500);
    }

    isFieldClear(x:number, y:number){
        if(
            Game.gameMap.map?.[y]?.[x] == 0 &&
            Game.gameMap.map?.[y]?.[x+1] == 0 &&
            Game.gameMap.map?.[y+1]?.[x] == 0 &&
            Game.gameMap.map?.[y+1]?.[x+1] == 0
        ) return true
        return false
    }

    isSmallFieldClear(x: number, y :number){
        if(Game.gameMap.map?.[y]?.[x] === 0) return true;
        return false;
    }

    moveMonsters(){ //chaos
        this.moveMonstersTimestamp++

        if(this.moveMonstersTimestamp != 10){
            return
        }
        else this.moveMonstersTimestamp = 0;

        const startIndexes = Helpers.getStartIndexes2();

        this.arrayOfMonsters.forEach(monster=>{
            monster.moved = false;
            if(monster.xPosition<startIndexes.x) monster.moved = true;
            if(monster.xPosition>startIndexes.x+34) monster.moved = true;
            if(monster.yPosition<startIndexes.y) monster.moved = true;
            if(monster.yPosition>startIndexes.y+22) monster.moved = true;
        })

        const playersCoords = MainCharacter.getCoordinates2(MainCharacter.xCoord, MainCharacter.yCoord)

        this.arrayOfMonsters.forEach(monster=>{
            if(monster.moved) return;
            monster.distanceFromPlayer = Math.pow((playersCoords[0]-monster.xPosition),2) + Math.pow((playersCoords[1]-monster.yPosition),2)
        })

        this.arrayOfMonsters = this.arrayOfMonsters.filter((monster)=>{
            if(monster.distanceFromPlayer !== 4) return true;

            if(monster.sourceColumn === 0){
                monster.die(true)
                cSoundManager.play("gotHitByGhost")
                MainCharacter.changeHealth(-5);
                return false;
            }
            else if(monster.sourceColumn === 5){
                MainCharacter.changeHealth(-1)
                cSoundManager.play("gotHitByDeath")
                return true;
            }
            else{
                MainCharacter.changeHealth(-5)
                cSoundManager.play("gotHitByGruntDemon")
                return true;
            }
            
        })

        for(let i=0; i<1000; i++){
            this.arrayOfMonsters.forEach(monster=>{
                if(monster.distanceFromPlayer != i) return

                const oldCoords = [monster.xPosition, monster.yPosition]

                this.clearBlock2([monster.xPosition,monster.yPosition])
                switch(monster.lookingDirection){
                    case 0:
                        if(!this.isSmallFieldClear(monster.xPosition, monster.yPosition-1) ||
                           !this.isSmallFieldClear(monster.xPosition+1, monster.yPosition-1)
                        ) break
                        monster.yPosition--;
                        break;
                    case 1:
                        if(this.isSmallFieldClear(monster.xPosition+1, monster.yPosition-1)&&
                           this.isSmallFieldClear(monster.xPosition+2, monster.yPosition-1) &&
                           this.isSmallFieldClear(monster.xPosition+2, monster.yPosition)
                        ){
                            monster.yPosition--;
                            monster.xPosition++;
                            break //1
                        }
                        if(this.isSmallFieldClear(monster.xPosition+2, monster.yPosition) &&
                           this.isSmallFieldClear(monster.xPosition+2, monster.yPosition+1)
                        ){
                            monster.xPosition++;
                            break //2
                        }
                        if(this.isSmallFieldClear(monster.xPosition, monster.yPosition-1) &&
                           this.isSmallFieldClear(monster.xPosition+1, monster.yPosition-1)
                        ){
                            monster.yPosition--;
                            break // 0
                        }
                        break;
                    case 2:
                        if(!this.isSmallFieldClear(monster.xPosition+2, monster.yPosition) ||
                           !this.isSmallFieldClear(monster.xPosition+2, monster.yPosition+1)
                        ) break
                        monster.xPosition++;
                        break;
                    case 3:
                        if(this.isSmallFieldClear(monster.xPosition+1, monster.yPosition+2) &&
                           this.isSmallFieldClear(monster.xPosition+2, monster.yPosition+1) &&
                           this.isSmallFieldClear(monster.xPosition+2, monster.yPosition+2)){
                            monster.yPosition++;
                            monster.xPosition++;
                            break //3
                        }
                        if(this.isSmallFieldClear(monster.xPosition+2, monster.yPosition) && 
                           this.isSmallFieldClear(monster.xPosition+2, monster.yPosition+1)){
                            monster.xPosition++;
                            break //2
                        }
                        if(this.isSmallFieldClear(monster.xPosition, monster.yPosition+2) && 
                           this.isSmallFieldClear(monster.xPosition+1, monster.yPosition+2)){
                            monster.yPosition++;
                            break //4
                        }
                        break;
                    case 4:
                        if(!this.isSmallFieldClear(monster.xPosition, monster.yPosition+2) ||
                           !this.isSmallFieldClear(monster.xPosition+1, monster.yPosition+2)
                        ) break
                        monster.yPosition++;
                        break
                    case 5:
                        if(this.isSmallFieldClear(monster.xPosition-1, monster.yPosition+1) &&
                           this.isSmallFieldClear(monster.xPosition-1, monster.yPosition+2) &&
                           this.isSmallFieldClear(monster.xPosition, monster.yPosition+2)){
                            monster.yPosition++;
                            monster.xPosition--;
                            break //5
                        }
                        if(this.isSmallFieldClear(monster.xPosition-1, monster.yPosition) &&
                           this.isSmallFieldClear(monster.xPosition-1, monster.yPosition+1)){
                            monster.xPosition--;
                            break // 6
                        }
                        if(this.isSmallFieldClear(monster.xPosition, monster.yPosition+2) && 
                           this.isSmallFieldClear(monster.xPosition+1, monster.yPosition+2)){
                            monster.yPosition++;
                            break // 4
                        }
                        break;
                    case 6:
                        if(!this.isSmallFieldClear(monster.xPosition-1, monster.yPosition) ||
                           !this.isSmallFieldClear(monster.xPosition-1, monster.yPosition+1)
                        ) break //6
                        monster.xPosition--;
                        break;
                    case 7:
                        if(this.isSmallFieldClear(monster.xPosition-1, monster.yPosition-1) &&
                           this.isSmallFieldClear(monster.xPosition-1, monster.yPosition) &&
                           this.isSmallFieldClear(monster.xPosition, monster.yPosition-1)
                        ){
                            monster.yPosition--;
                            monster.xPosition--;
                            break //7
                        }
                        if(this.isSmallFieldClear(monster.xPosition-1, monster.yPosition)&&
                           this.isSmallFieldClear(monster.xPosition-1, monster.yPosition+1)
                        ){
                            monster.xPosition--;
                            break //6
                        }
                        if(this.isSmallFieldClear(monster.xPosition, monster.yPosition-1) &&
                           this.isSmallFieldClear(monster.xPosition+1, monster.yPosition-1)
                           ){
                            monster.yPosition--;
                            break //0
                        }
                        break;
                }

                breakMe: if(monster instanceof Sorcerer){
                    if(oldCoords[0] === monster.xPosition && oldCoords[1] === monster.yPosition){
                        monster.isVisible = true;
                        break breakMe;
                    }

                    if(monster.isVisible){
                        const rand = Math.floor(Math.random() * 5);
                        if(rand === 0) monster.isVisible = false;
                    }
                    else{
                        monster.isVisible = true;
                    }
                }

                if(monster instanceof Demon) monster.checkForShoot()

                this.setBlock2([monster.xPosition, monster.yPosition], monster.id)
            })
        }
    }

    clearMapFromMonstersAndSpawners(itemUsed: boolean){
        if(MainCharacter.potions === 0 && itemUsed) return;
        
        const startIndexes = Helpers.getStartIndexes();

        cSoundManager.play("destroyBottle")

        this.arrayOfMonsters = this.arrayOfMonsters.filter(monster => {
            if(monster.xPosition >= startIndexes.x*2 && 
                monster.xPosition <= startIndexes.x*2+34 && 
                monster.yPosition >= startIndexes.y*2 &&
                monster.yPosition <= startIndexes.y*2+22
            ){
                monster.die(true)
                return false
            }
            return true
        });

        this.arrayOfGoblins = this.arrayOfGoblins.filter(goblin => {
            if(goblin.xPosition >= startIndexes.x*2 && 
                goblin.xPosition <= startIndexes.x*2+34 && 
                goblin.yPosition >= startIndexes.y*2 &&
                goblin.yPosition <= startIndexes.y*2+22
            ){
                goblin.die(true)
                return false
            }
            return true
        });

        this.arrayOfSpawners = this.arrayOfSpawners.filter(spawner => {
            if(spawner.xPosition >= startIndexes.x*2 && 
                spawner.xPosition <= startIndexes.x*2+34 && 
                spawner.yPosition >= startIndexes.y*2 &&
                spawner.yPosition <= startIndexes.y*2+22
            ){
                spawner.destroyed();
                return false
            }
            return true
        })

        if(itemUsed) MainCharacter.potions--;
    }

    createSpawner(x: number, y:number, value: number){
        let returnItemIndex = value;
        switch(value){
            case 20:
            case 21:
            case 22:
                this.arrayOfSpawners.push(new Spawner(x*2,y*2, 0))
                break;
            case 70:
            case 71:
            case 72:
                this.arrayOfSpawners.push(new Spawner(x*2,y*2, 1))
                returnItemIndex -=47;
                break;
            case 73:
            case 74:
            case 75:
                this.arrayOfSpawners.push(new Spawner(x*2,y*2, 2))
                returnItemIndex -=50;
                break;
            case 76:
            case 77:
            case 78:
                this.arrayOfSpawners.push(new Spawner(x*2,y*2, 3))
                returnItemIndex -=53;
                break;
        }
        return returnItemIndex;
    }

    createMonster(x: number, y:number, mobId: number){
        const sourceColumn = mobId;
        switch(sourceColumn){
            case 0:
                this.arrayOfMonsters.push(new Ghost(0,5,5,x*2,y*2,5))
                break;
            case 1:
                this.arrayOfMonsters.push(new Grunt(1,5,5,x*2,y*2,5))
                break;
            case 2:
                this.arrayOfMonsters.push(new Demon(2,5,5,x*2,y*2,5))
                break;
            case 3: 
                this.arrayOfMonsters.push(new Sorcerer(3,5,5,x*2,y*2,5))
                break;
            case 4:
                this.arrayOfGoblins.push(new Goblin(4,5,5,x*2,y*2,5))
                break;
            case 5:
                this.arrayOfMonsters.push(new Death(5,5,5,x*2,y*2,5))
                break;
        }
    }

    spawnMonsters(){
        const startIndexes = Helpers.getStartIndexes2();

        this.arrayOfSpawners.forEach(spawner=>{
            if(spawner.xPosition<startIndexes.x) return
            if(spawner.xPosition>startIndexes.x+34) return
            if(spawner.yPosition<startIndexes.y) return
            if(spawner.yPosition>startIndexes.y+22) return

            spawner.lastTimeSpawnedSomething++
            if(spawner.lastTimeSpawnedSomething !== spawner.timeToSpawn) return

            this.spawnMonster(spawner.xPosition, spawner.yPosition, spawner.mob)
            spawner.lastTimeSpawnedSomething=0;
            spawner.timeToSpawn = Math.floor(Math.random() * 6) + 1;
        })
    }

    spawnMonster(x: number, y:number, mobId: number){
        let possibleDirections = [0,1,2,3,4,5,6,7];

        for(let i=0; i<8; i++){
            let chosenDirection = Math.floor(Math.random()*possibleDirections.length)
            let newCoords = this.directionToCoords(x,y,chosenDirection) as Coordinates

            if(this.isFieldClear(newCoords.x, newCoords.y)){
                //this.arrayOfMonsters.push(new Monster(mobId, 5, 5 ,newCoords.x, newCoords.y, 0))
                this.createMonster(newCoords.x/2, newCoords.y/2, mobId);
                return;
            }
            else possibleDirections.splice(possibleDirections.indexOf(chosenDirection), 1);
        }
    }

    deleteSpawner(coords: number[]){
        this.arrayOfSpawners = this.arrayOfSpawners.filter(spawner => {
            if(spawner.xPosition == coords[0]*2 && spawner.yPosition == coords[1]*2) return false;
            return true;
        })
    }
    
    directionToCoords(x: number, y:number, direction: number){
        switch(direction){
            case 0:
                return {x: x, y: y-2}
            case 1:
                return {x: x+2, y: y-2}
            case 2:
                return {x: x+2, y: y}
            case 3:
                return {x: x+2, y: y+2}
            case 4:
                return {x: x, y: y+2}
            case 5:
                return {x: x-2, y: y+2}
            case 6:
                return {x: x-2, y: y}
            case 7:
                return {x: x-2, y: y-2}
        }
    }

    findGlass(x: number, y:number){
        if(Game.gameMap.map[y][x] === 30 || Game.gameMap.map[y][x] === 31){

            Game.gameMap.map[y][x] = 0
            Game.gameMap.map[y+1][x] = 0
            Game.gameMap.map[y+1][x+1] = 0
            Game.gameMap.map[y][x+1] = 0

            this.findGlass(x,y+2)
            this.findGlass(x,y-2)
            this.findGlass(x+2,y)
            this.findGlass(x-2,y)
        }
        else return
    }
    teleport(){
        console.log("teleport");
        this.portals.forEach((portalConnection, index)=>{
            portalConnection.forEach((portal, index2)=>{
                if(
                    portal[0] != MainCharacter.coordsArrayIndexes[0]/2 ||
                    portal[1] != MainCharacter.coordsArrayIndexes[1]/2
                ) return

                let targetPortalCoords;
                if(index2 == 0) targetPortalCoords = portalConnection[1]
                else targetPortalCoords = portalConnection[0]
                
                let res = this.findPlaceToTeleport([targetPortalCoords[0]*2, targetPortalCoords[1]*2])
                if(res === null) return
                MainCharacter.coordsArrayIndexes = [res[0], res[1]]
                Game.gameMap.setBlock2(MainCharacter.coordsArrayIndexes, 0)
                MainCharacter.xCoord = res[0]/2* 16 * Canvas.multiplier
                MainCharacter.yCoord = res[1]/2* 16 * Canvas.multiplier
                Game.gameMap.setBlock2(MainCharacter.coordsArrayIndexes, -1)
                MainCharacter.moveMap()
            })
        })
    }

    findPlaceToTeleport(coords:number[]){
             if(this.isFieldClear(coords[0]+2,coords[1])) return [coords[0]+2, coords[1]]
        else if(this.isFieldClear(coords[0],coords[1]+2)) return [coords[0], coords[1]+2]
        else if(this.isFieldClear(coords[0]-2,coords[1])) return [coords[0]-2, coords[1]]
        else if(this.isFieldClear(coords[0],coords[1]-2)) return [coords[0], coords[1]-2]
        else return null
    }
}