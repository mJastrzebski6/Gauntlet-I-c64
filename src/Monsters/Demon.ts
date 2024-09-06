import Coordinates, { Directions } from "../Interfaces";
import Monster from "./Monster";
import Canvas from "../Canvas";
import Images from "../Images";
import { Constants, TypesOfBlocks } from "../Consts";
import MainCharacter from "../MainCharacter";
import Game from "../Game";

export default class Demon extends Monster{

    fireballCoords: Coordinates = {x:1,y:1};
    fireballThrew: boolean = false;
    fireballDirection: Directions = Directions.TOP;
    lastFireballThrewTimestamp: number = 0;

    constructor(sourceColumn: number, damage:number, health: number, xPosition: number, yPosition: number, startDirection: number){
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.lastFireballThrewTimestamp = Date.now()
    }

    checkForShoot(){
        if(this.fireballThrew) return;
        if(Date.now() - this.lastFireballThrewTimestamp < 1000) return;
        const playerCoords = MainCharacter.getCoordinates(MainCharacter.xCoord, MainCharacter.yCoord)

        if(this.xPosition == playerCoords[0]*2 && this.yPosition > playerCoords[1]*2) this.shootFireball(Directions.TOP)

        else if(this.xPosition < playerCoords[0]*2 && 
            this.yPosition > playerCoords[1]*2 &&
            Math.pow(this.xPosition-playerCoords[0]*2,2) === Math.pow(this.yPosition-playerCoords[1]*2,2)
        ) this.shootFireball(Directions.TOP_RIGHT)

        else if(this.xPosition < playerCoords[0]*2 && this.yPosition === playerCoords[1]*2) this.shootFireball(Directions.RIGHT)

        else if(this.xPosition < playerCoords[0]*2 && 
            this.yPosition < playerCoords[1]*2 &&
            Math.pow(this.xPosition-playerCoords[0]*2,2) === Math.pow(this.yPosition-playerCoords[1]*2,2)
        ) this.shootFireball(Directions.BOTTOM_RIGHT)

        else if(this.xPosition == playerCoords[0]*2 && this.yPosition < playerCoords[1]*2) this.shootFireball(Directions.BOTTOM)

        else if(this.xPosition > playerCoords[0]*2 && 
            this.yPosition < playerCoords[1]*2 &&
            Math.pow(this.xPosition-playerCoords[0]*2,2) === Math.pow(this.yPosition-playerCoords[1]*2,2)
        ) this.shootFireball(Directions.BOTTOM_LEFT)

        else if(this.xPosition > playerCoords[0]*2 && this.yPosition === playerCoords[1]*2) this.shootFireball(Directions.LEFT)

        else if(this.xPosition > playerCoords[0]*2 && 
            this.yPosition > playerCoords[1]*2 &&
            Math.pow(this.xPosition-playerCoords[0]*2,2) === Math.pow(this.yPosition-playerCoords[1]*2,2)
        ) this.shootFireball(Directions.TOP_LEFT)

    }

    shootFireball(direction: Directions){
        switch(direction){
            case Directions.TOP:
                this.fireballCoords = {x: this.xPosition*40+20, y: this.yPosition*40};
                break;
            case Directions.TOP_RIGHT:
                this.fireballCoords = {x: this.xPosition*40+19, y: this.yPosition*40+20};
                break;
            case Directions.RIGHT:
                this.fireballCoords = {x: this.xPosition*40+60, y: this.yPosition*40+20};
                break;
            case Directions.BOTTOM_RIGHT:
                this.fireballCoords = {x: this.xPosition*40+60, y: this.yPosition*40+60};
                break;
            case Directions.BOTTOM:
                this.fireballCoords = {x: this.xPosition*40+20, y: this.yPosition*40+60};
                break;
            case Directions.BOTTOM_LEFT:
                this.fireballCoords = {x: this.xPosition*40+19, y: this.yPosition*40+20};
                break;
            case Directions.LEFT:
                this.fireballCoords = {x: this.xPosition*40, y: this.yPosition*40+20};
                break;
            case Directions.TOP_LEFT:
                this.fireballCoords = {x: this.xPosition*40, y: this.yPosition*40};
                break;
        }
        this.fireballThrew = true;
        this.fireballDirection = this.lookingDirection;
        this.lastFireballThrewTimestamp = Date.now();
    }

    animateFireball(renderedView: Coordinates){
        if(this.fireballThrew === false) return;

        const fireballCoordsArray = MainCharacter.getCoordinates4(this.fireballCoords.x+20, this.fireballCoords.y+20);

        if(TypesOfBlocks.noTransitionForProjectile.includes(Game.gameMap.map?.[fireballCoordsArray[1]*2]?.[fireballCoordsArray[0]*2])) this.fireballThrew = false

        if(TypesOfBlocks.monsters.includes(Game.gameMap.map?.[fireballCoordsArray[1]*2]?.[fireballCoordsArray[0]*2])){
            
            let killed: boolean = false;

            Game.gameMap.arrayOfMonsters = Game.gameMap.arrayOfMonsters.filter(monster=>{
                if(monster.xPosition === this.xPosition && monster.yPosition === this.yPosition) return true;

                if(monster.sourceColumn === 5){
                    //this.changeScore(1);
                    return true
                }
                if(killed) return true;

                if( 
                    (monster.xPosition == fireballCoordsArray[0]*2 && monster.yPosition == fireballCoordsArray[1]*2) ||
                    (monster.xPosition-1 == fireballCoordsArray[0]*2 && monster.yPosition == fireballCoordsArray[1]*2) ||
                    (monster.xPosition+1 == fireballCoordsArray[0]*2 && monster.yPosition == fireballCoordsArray[1]*2) || 
                    (monster.xPosition == fireballCoordsArray[0]*2 && monster.yPosition-1 == fireballCoordsArray[1]*2) ||
                    (monster.xPosition == fireballCoordsArray[0]*2+1 && monster.yPosition+1 == fireballCoordsArray[1]*2)
                ){

                    monster.die(false);
                    killed = true
                    return false;
                }
                return true;
            })

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
            
        if(TypesOfBlocks.destroyableByDemons.includes(Game.gameMap.map?.[fireballCoordsArray[1]*2]?.[fireballCoordsArray[0]*2])){
            MainCharacter.destroyThing(fireballCoordsArray, false);
            this.fireballThrew = false;
        }

        if(Game.gameMap.map?.[fireballCoordsArray[1]*2]?.[fireballCoordsArray[0]*2] === -1){
           // console.log("me hit")
            MainCharacter.changeHealth(-5);
            this.fireballThrew = false;
        }



        const speed = 2

        if([Directions.TOP_LEFT, Directions.LEFT, Directions.BOTTOM_LEFT].includes(this.fireballDirection)) this.fireballCoords.x -= speed * Canvas.multiplier
        if([Directions.TOP_RIGHT, Directions.RIGHT, Directions.BOTTOM_RIGHT].includes(this.fireballDirection)) this.fireballCoords.x += speed * Canvas.multiplier

        if([Directions.TOP_LEFT, Directions.TOP, Directions.TOP_RIGHT].includes(this.fireballDirection)) this.fireballCoords.y -= speed * Canvas.multiplier
        if([Directions.BOTTOM_LEFT, Directions.BOTTOM, Directions.BOTTOM_RIGHT].includes(this.fireballDirection)) this.fireballCoords.y += speed * Canvas.multiplier

        this.drawFireball(renderedView);
    }

    drawFireball(renderedView: Coordinates){
        Canvas.ctx.drawImage(
            Images.assets.weapons,
            this.fireballDirection*9,
            3*9,
            8,
            8,
            this.fireballCoords.x-renderedView.x,
            this.fireballCoords.y-renderedView.y,
            8*Constants.multiplier,
            8*Constants.multiplier
        );
    }
}
