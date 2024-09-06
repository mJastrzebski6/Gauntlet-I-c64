import Canvas from "./Canvas";
import KeyboardEvents from "./KeyboardEvents";
import Projectile from "./Projectile";
import {TypesOfBlocks} from './Consts'
import cSoundManager from "./SoundsHandler";
import Sorcerer from "./Monsters/Sorcerer";
import Monster from "./Monsters/Monster";
import Game from "./Game";

const move : number = 2

class MainCharacter{
    sourceCol: number = 0;
    score: number = 20;
    health: number = 2000;
    ownedAbilities: number[] = [];
    keys: number = 0;
    potions: number = 0;
    weapon: Projectile;

    xCoord: number = 0;
    yCoord: number = 0;
    xVelocity: number = 16;
    yVelocity: number = 16;
    coordsArrayIndexes: number[] = []

    lastMoveTimestamp: number = 16;
    lastDirection: number[] = [4,0];
    actualDirection: number = 5;
    animationFrame: number = 3;
    thirdFrame: number = 1;
    private _losingHPInterval: NodeJS.Timeout | null = null;
    
    constructor() {
        this.weapon = new Projectile(this.sourceCol,0,0,0)
    }

    get losingHPInterval() {
        if (this._losingHPInterval === null) throw new Error('Cannot access interval')
        return this._losingHPInterval;
    }

    startLosingHPInterval(){
        this._losingHPInterval = setInterval(()=>{
            this.changeHealth(-1);
        },1000)
    }

    stopLosingHPInterval(){
        clearInterval(this.losingHPInterval)
    }

    checkIfPlayerIsDead(){
        if(this.health <= 0) Game.gameMap.timesUp()
    }
    
    animateProjectile(){ //chaos
        if(
            this.weapon.xPosition < Canvas.renderedViewX-80 ||
            this.weapon.xPosition > Canvas.renderedViewX + Canvas.width ||
            this.weapon.yPosition > Canvas.renderedViewY + Canvas.height ||
            this.weapon.yPosition < Canvas.renderedViewY-80
        ) this.weapon.thrown = false

        const ProjectileCoords = this.getCoordinates4(this.weapon.xPosition+20, this.weapon.yPosition+20)

        if(TypesOfBlocks.noTransitionForProjectile.includes(Game.gameMap.map?.[ProjectileCoords[1]*2]?.[ProjectileCoords[0]*2])) this.weapon.thrown = false

        let invisibleSorcererHit = false;

        if(TypesOfBlocks.monsters.includes(Game.gameMap.map?.[ProjectileCoords[1]*2]?.[ProjectileCoords[0]*2])){
            let killed: boolean = false;

            Game.gameMap.arrayOfMonsters = Game.gameMap.arrayOfMonsters.filter((monster: Monster)=>{
                if(killed) return true;
                if( 
                    (monster.xPosition == ProjectileCoords[0]*2 && monster.yPosition == ProjectileCoords[1]*2) ||
                    (monster.xPosition-1 == ProjectileCoords[0]*2 && monster.yPosition == ProjectileCoords[1]*2) ||
                    (monster.xPosition+1 == ProjectileCoords[0]*2 && monster.yPosition == ProjectileCoords[1]*2) || 
                    (monster.xPosition == ProjectileCoords[0]*2 && monster.yPosition-1 == ProjectileCoords[1]*2) ||
                    (monster.xPosition == ProjectileCoords[0]*2+1 && monster.yPosition+1 == ProjectileCoords[1]*2)
                ){
                    if(monster.sourceColumn === 5){
                        this.weapon.thrown = false
                        killed = true;
                        this.changeScore(1);
                        return true
                    }
                    if(monster instanceof Sorcerer && monster.isVisible === false){
                        invisibleSorcererHit=true
                        return true
                    }

                    monster.die(true);
                    killed = true
                    return false;
                }
                return true;
            })

            Game.gameMap.arrayOfGoblins = Game.gameMap.arrayOfGoblins.filter((monster: Monster)=>{
                if(killed) return true;
                if( 
                    (monster.xPosition == ProjectileCoords[0]*2 && monster.yPosition == ProjectileCoords[1]*2) ||
                    (monster.xPosition-1 == ProjectileCoords[0]*2 && monster.yPosition == ProjectileCoords[1]*2) ||
                    (monster.xPosition+1 == ProjectileCoords[0]*2 && monster.yPosition == ProjectileCoords[1]*2) || 
                    (monster.xPosition == ProjectileCoords[0]*2 && monster.yPosition-1 == ProjectileCoords[1]*2) ||
                    (monster.xPosition == ProjectileCoords[0]*2+1 && monster.yPosition+1 == ProjectileCoords[1]*2)
                ){
                    monster.die(true);
                    killed = true
                    return false;
                }
                return true;
            })
            
                
            if(invisibleSorcererHit === false) this.weapon.thrown = false
        }
        
        if(TypesOfBlocks.destroyableThings.includes(Game.gameMap.map?.[ProjectileCoords[1]*2]?.[ProjectileCoords[0]*2])){
            this.destroyThing(ProjectileCoords,true)
            this.weapon.thrown = false
        }

        let direction = this.weapon.direction
        let speed = 4

        if([2,3,4].includes(direction)) this.weapon.xPosition += speed * Canvas.multiplier
        if([6,7,8].includes(direction)) this.weapon.xPosition -= speed * Canvas.multiplier

        if([8,1,2].includes(direction)) this.weapon.yPosition -= speed * Canvas.multiplier
        if([4,5,6].includes(direction)) this.weapon.yPosition += speed * Canvas.multiplier

        if(this.sourceCol != 0) return

        if(this.weapon.animationTimestamp%4 == 0) this.weapon.frame++;
        this.weapon.animationTimestamp++
        if(this.weapon.frame==8) this.weapon.frame=0
    }

    throwWeapon(){
        if(Date.now() - this.weapon.lastTimeThrew<150) return

        this.weapon.lastTimeThrew = Date.now();
        this.weapon.thrown = true;
        this.weapon.frame = this.lastDirection[0]

        this.weapon.xPosition = this.xCoord
        this.weapon.yPosition = this.yCoord

        switch(this.lastDirection[0]){
            case 0:
                this.weapon.xPosition+=20;
                break;
            case 1:
                this.weapon.xPosition+=19;
                this.weapon.yPosition+=20;
                break;
            case 2:
                this.weapon.xPosition+=40;
                this.weapon.yPosition+=20;
                break;
            case 3:
                this.weapon.xPosition+=40;
                this.weapon.yPosition+=40;
                break;
            case 4:
                this.weapon.xPosition+=20;
                this.weapon.yPosition+=40;
                break;
            case 5:
                this.weapon.yPosition+=20;
                this.weapon.xPosition+=19;
                break;
            case 6:
                //this.weapon.xPosition+=20;
                this.weapon.yPosition+=20;
                break;
            case 7:
                break;
        }


        this.weapon.direction = this.lastDirection[0]+1
        cSoundManager.play("weaponThrew")
    }

    changeScore(points: number){
        this.score += points;
    }

    changeHealth(points: number){
        this.health += points;
        this.checkIfPlayerIsDead()
    }

    reserveArray(){
        let direction = this.actualDirection;
        this.coordsArrayIndexes = this.getCoordinates3(this.xCoord, this.yCoord)
        Game.gameMap.setBlock2(this.coordsArrayIndexes, -1)

        switch(direction){
            case 1: 
                if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0],this.coordsArrayIndexes[1]-2))
                    Game.gameMap.setBlock2([this.coordsArrayIndexes[0],this.coordsArrayIndexes[1]-2], -1);
                    break;
            case 2: 
                if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0]+2,this.coordsArrayIndexes[1]-2))
                    Game.gameMap.setBlock2([this.coordsArrayIndexes[0]+2,this.coordsArrayIndexes[1]-2], -1);
                    break;
            case 3: 
                if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0]+2,this.coordsArrayIndexes[1]))
                    Game.gameMap.setBlock2([this.coordsArrayIndexes[0]+2,this.coordsArrayIndexes[1]], -1);
                    break;
            case 4: 
                    if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0]+2,this.coordsArrayIndexes[1]+2))
                    Game.gameMap.setBlock2([this.coordsArrayIndexes[0]+2,this.coordsArrayIndexes[1]+2], -1);
                    break;
            case 5:
                if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0],this.coordsArrayIndexes[1]+2))
                     Game.gameMap.setBlock2([this.coordsArrayIndexes[0],this.coordsArrayIndexes[1]+2], -1);
                     break;
            case 6: 
                if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0]-2,this.coordsArrayIndexes[1]+2))
                    Game.gameMap.setBlock2([this.coordsArrayIndexes[0]-2,this.coordsArrayIndexes[1]+2], -1);
                    break;
            case 7: 
                if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0]-2,this.coordsArrayIndexes[1]))
                    Game.gameMap.setBlock2([this.coordsArrayIndexes[0]-2,this.coordsArrayIndexes[1]], -1);
                    break;
            case 8: 
                if(Game.gameMap.isSmallFieldClear(this.coordsArrayIndexes[0]-2,this.coordsArrayIndexes[1]-2))
                    Game.gameMap.setBlock2([this.coordsArrayIndexes[0]-2,this.coordsArrayIndexes[1]-2], -1);
                    break;
        }
    }

    animateCharacter(){ //chaos

        this.checkForPickingItems()
        if(this.weapon.thrown) this.animateProjectile()

        if(this.lastMoveTimestamp === 16 ){
            if(KeyboardEvents.SpaceKeyClicked && this.weapon.thrown == false){
                this.throwWeapon()
                return;
            }
            
            let availableDirections = this.checkForCollisions()
            let directions = this.checkDirection();
            if(directions.length != 0) this.lastDirection[0] = this.twoDirectionsIntoOne(directions)-1
            let directionsCopy = [...directions]

            directions.forEach(dir => {
                if(dir === 1 && availableDirections.top === false)  directionsCopy.splice(directionsCopy.indexOf(1), 1)
                if(dir === 3 && availableDirections.right === false)  directionsCopy.splice(directionsCopy.indexOf(3), 1)
                if(dir === 5 && availableDirections.bottom === false)  directionsCopy.splice(directionsCopy.indexOf(5), 1)
                if(dir === 7 && availableDirections.left === false)  directionsCopy.splice(directionsCopy.indexOf(7), 1)
            });
            
           if(directionsCopy.length === 0) return

           this.actualDirection = this.twoDirectionsIntoOne(directionsCopy)

           if(this.actualDirection == 2 && availableDirections.topRight === false){
               if(availableDirections.top) this.actualDirection = 1
               else if(availableDirections.right) this.actualDirection = 3
               else return;
           }
           if(this.actualDirection == 4 && availableDirections.bottomRight === false){
               if(availableDirections.bottom) this.actualDirection = 5
               else if(availableDirections.right) this.actualDirection = 3
               else return;
           }
           if(this.actualDirection == 6 && availableDirections.bottomLeft === false){
               if(availableDirections.bottom) this.actualDirection = 5
               else if(availableDirections.left) this.actualDirection = 7
               else return;
           }
           if(this.actualDirection == 8 && availableDirections.topLeft === false){
               if(availableDirections.top) this.actualDirection = 1
               else if(availableDirections.left) this.actualDirection = 7
               else return;
           }
        }

        if(this.lastMoveTimestamp < 4){
            this.lastMoveTimestamp+=move
            this.moveCharacter(move)

            if(this.lastMoveTimestamp >= 4){
                this.lastDirection[1] = this.thirdFrame;
            }
            return;
        }
        if(this.lastMoveTimestamp < 12){
            this.lastMoveTimestamp+=move
            this.moveCharacter(move)

            if(this.lastMoveTimestamp >= 12){
               this.lastDirection[1] = 0;
                if(this.thirdFrame == 1) this.thirdFrame = 2
                else this.thirdFrame = 1
            } 
            return;
        }
        if(this.lastMoveTimestamp < 16){
            this.lastMoveTimestamp+=move
            this.moveCharacter(move);
            if(this.lastMoveTimestamp >=16){
                
                Game.gameMap.clearBlock2(this.coordsArrayIndexes)
                this.coordsArrayIndexes = this.getCoordinates3(this.xCoord, this.yCoord)
                
                if(Game.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]] === 29){
                    Game.gameMap.endOfLevel()
                }
                else if([42,43,44].includes(Game.gameMap.map[this.coordsArrayIndexes[1]][this.coordsArrayIndexes[0]])){
                    Game.gameMap.teleport()
                }
                else Game.gameMap.setBlock2(this.coordsArrayIndexes, -1)
               
            }
            return;
        }
        
        if(KeyboardEvents.stackOfClicks.length == 0) return;
        if(KeyboardEvents.SpaceKeyClicked) return
        
       
        let res = this.checkDirection();
        let res2 = this.twoDirectionsIntoOne(res)
        this.lastDirection[0] = res2-1;
        
        this.lastMoveTimestamp = 0
        this.reserveArray()            
    }

    checkForCollisions(){
        const Coords = this.getCoordinates(this.xCoord, this.yCoord);
        let availableDirections = {
            top: true, topRight: true,
            right: true, bottomRight: true,
            bottom: true, bottomLeft:true,
            left: true, topLeft:true
        }

        if(this.isFieldClear(Coords[1]-1, Coords[0]) === false) availableDirections.top = false
        if(this.isFieldClear(Coords[1]+1, Coords[0]) === false) availableDirections.bottom = false
        if(this.isFieldClear(Coords[1], Coords[0]-1) === false) availableDirections.left = false
        if(this.isFieldClear(Coords[1], Coords[0]+1) === false) availableDirections.right = false

        if(
            availableDirections.top == false || 
            availableDirections.right == false ||
            this.isFieldClear(Coords[1]-1, Coords[0]+1) === false
        ) availableDirections.topRight = false

        if(
            availableDirections.top == false || 
            availableDirections.left == false ||
            this.isFieldClear(Coords[1]-1, Coords[0]-1) === false
        ) availableDirections.topLeft = false

        if(
            availableDirections.bottom == false || 
            availableDirections.right == false ||
            this.isFieldClear(Coords[1]+1, Coords[0]+1) === false
        ) availableDirections.bottomRight = false

        if(
            availableDirections.bottom == false || 
            availableDirections.left == false ||
            this.isFieldClear(Coords[1]+1, Coords[0]-1) === false
        ) availableDirections.bottomLeft = false

        return availableDirections;
    }

    checkForPickingItems(){
        const Coords = this.getCoordinates(this.xCoord, this.yCoord)
        const itemIndex = Game.gameMap.map?.[Coords[1]*2]?.[Coords[0]*2]
        if(TypesOfBlocks.pickableItems.includes(itemIndex)) this.pickItem(itemIndex, Coords);
    }

    isFieldClear(y:number, x:number){
        if(
            (Game.gameMap.map?.[y*2]?.[x*2] < 26 && Game.gameMap.map?.[y*2]?.[x*2] != 0) ||
            (Game.gameMap.map?.[y*2+1]?.[x*2] < 26 && Game.gameMap.map?.[y*2+1]?.[x*2] != 0) ||
            (Game.gameMap.map?.[y*2]?.[x*2+1] < 26 && Game.gameMap.map?.[y*2]?.[x*2+1] != 0) ||
            (Game.gameMap.map?.[y*2+1]?.[x*2+1] < 26 && Game.gameMap.map?.[y*2+1]?.[x*2+1] != 0)         
        ) return false

        if(
            (Game.gameMap.map?.[y*2]?.[x*2] == 30) &&
            (Game.gameMap.map?.[y*2+1]?.[x*2] == 30) &&
            (Game.gameMap.map?.[y*2]?.[x*2+1] == 30) &&
            (Game.gameMap.map?.[y*2+1]?.[x*2+1] == 30) &&
            this.keys == 0         
        ) return false

        if(
            (Game.gameMap.map?.[y*2]?.[x*2] == 31) &&
            (Game.gameMap.map?.[y*2+1]?.[x*2] == 31) &&
            (Game.gameMap.map?.[y*2]?.[x*2+1] == 31) &&
            (Game.gameMap.map?.[y*2+1]?.[x*2+1] == 31) &&
            this.keys == 0         
        ) return false

        return true
    }

    twoDirectionsIntoOne(directions:number[]){
        if(directions.includes(1) && directions.includes(3)) return 2;
        if(directions.includes(1) && directions.includes(7)) return 8;
        if(directions.includes(5) && directions.includes(3)) return 4;
        if(directions.includes(5) && directions.includes(7)) return 6;
        else return directions[0];
    }

    moveCharacter(speed: number){
        //  8 1 2
        // 7  X  3
        //  6 5 4
        let direction = this.actualDirection;

        if([2,3,4].includes(direction)) this.xCoord += speed * Canvas.multiplier
        if([6,7,8].includes(direction)) this.xCoord -= speed * Canvas.multiplier

        if([8,1,2].includes(direction)) this.yCoord -= speed * Canvas.multiplier
        if([4,5,6].includes(direction)) this.yCoord += speed * Canvas.multiplier
        this.moveMap()
    }

    checkDirection(){
        let arr = KeyboardEvents.stackOfClicks.slice()
        let directions: number[] = [];

        if(arr.indexOf("W") > arr.indexOf("S")) directions.push(1)
        else if(arr.indexOf("W") < arr.indexOf("S")) directions.push(5)
        else if(arr.includes("W")) directions.push(1)
        else if(arr.includes("S")) directions.push(5)

        if(arr.indexOf("A") > arr.indexOf("D")) directions.push(7)
        else if(arr.indexOf("A") < arr.indexOf("D")) directions.push(3)
        else if(arr.includes("A")) directions.push(7)
        else if(arr.includes("D")) directions.push(3)

        return directions;
    }
    
    moveMap(){
        let gameCanvasHeight: number = Canvas.height - 200
        let mapX: number = this.xCoord + 40 - (Canvas.width+1)/2
        let mapY: number = this.yCoord + 40 - gameCanvasHeight/2;
      
        if(mapX<0) Canvas.renderedViewX = 0;
        else if(mapX+Canvas.width>=Game.gameMap.xSizeInPixels) Canvas.renderedViewX = Game.gameMap.xSizeInPixels-Canvas.width
        else Canvas.renderedViewX = mapX

        if(mapY<0) Canvas.renderedViewY = 0;
        else if(mapY+gameCanvasHeight>=Game.gameMap.ySizeInPixels) Canvas.renderedViewY = Game.gameMap.ySizeInPixels-gameCanvasHeight
        else Canvas.renderedViewY = mapY
    }

    getCoordinates(x:number, y:number){
        let xIndex = (x+40 - (x+40)%80)/80;
        let yIndex = (y+40 - (y+40)%80)/80;
        return [xIndex,yIndex];
    }

    getCoordinates2(x:number, y:number){
        let xIndex = x/40;
        let yIndex = y/40
        return [xIndex,yIndex];
    } 

    getCoordinates3(x:number, y:number){
        let xIndex = (x - x%40)/40;
        let yIndex = (y - y%40)/40;
        return [xIndex,yIndex];
    }
    getCoordinates4(x:number, y:number){
        let xIndex = (x - x%80)/80;
        let yIndex = (y - y%80)/80;
        return [xIndex,yIndex];
    }

    destroyThing(coords: number[], addScore: boolean){
        const itemID = Game.gameMap.map[coords[1]*2][coords[0]*2];

        switch(itemID){
            case 16:
                Game.gameMap.setBlock(coords, 17)
                break;
            case 17:
                Game.gameMap.setBlock(coords, 18)
                break;
            case 18:
                Game.gameMap.clearBlock(coords)
                break;
            case 20:
            case 21:
                Game.gameMap.clearBlock(coords)
                Game.gameMap.deleteSpawner(coords);
                if(addScore) this.changeScore(10);
                break;
            case 22:
                Game.gameMap.setBlock(coords, 20)
                if(addScore) this.changeScore(10);
                break;
            case 23:
                Game.gameMap.setBlock(coords, 25)
                if(addScore) this.changeScore(10);
                break;
            case 24:
            case 25:
                Game.gameMap.clearBlock(coords)
                Game.gameMap.deleteSpawner(coords);
                if(addScore) this.changeScore(10);
                break;
            case 33:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
                Game.gameMap.clearBlock(coords)
                break;
            case 36:
                Game.gameMap.clearBlock(coords)
                Game.gameMap.clearMapFromMonstersAndSpawners(false)
                break;
        }
    }

    pickItem(itemIndex:number , coords:number[]){
        switch(itemIndex){
            case 26: //box - treasure
            case 27: //box - treasure
            case 28: //box - treasure
                this.changeScore(100);
                cSoundManager.play("pickedItem");
                break;
            case 32: // key
                this.keys++
                this.changeScore(100);
                cSoundManager.play("pickedKey");
                break;
            case 33: //yellow bottle - cider
                this.changeHealth(100);
                this.changeScore(100);
                cSoundManager.play("pickedItem");
                break;
            case 34: //food
                this.changeScore(100);
                this.changeHealth(100);
                cSoundManager.play("pickedItem");
                break;
            case 35: //amulet
                this.changeScore(100);
                cSoundManager.play("pickedItem");
                break;
            case 36: // blue elixir
                this.potions++
                this.changeScore(100);
                cSoundManager.play("pickedItem");
                break;
            case 37: // lightblue elixir = fight power
            case 38: // green elixir     = magic power
            case 39: // yellow elixir    = extra armor
            case 40: // purple elixir    = carrying ability
            case 41: // brown elixir     = shot power
                if(!this.ownedAbilities.includes(itemIndex)) this.ownedAbilities.push(itemIndex);
                Game.gameMap.pickingUpAbility(itemIndex-37)
                break;
            case 30:
            case 31:
                this.keys--;
                Game.gameMap.findGlass(coords[0]*2, coords[1]*2);
                cSoundManager.play("openDoors")
                break;
        }
        Game.gameMap.map[coords[1]*2][coords[0]*2] = 0
        Game.gameMap.map[coords[1]*2][coords[0]*2+1] = 0
        Game.gameMap.map[coords[1]*2+1][coords[0]*2] = 0
        Game.gameMap.map[coords[1]*2+1][coords[0]*2+1] = 0
    }
}

export default new MainCharacter();