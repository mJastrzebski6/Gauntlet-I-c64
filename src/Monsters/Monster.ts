import MainCharacter from "../MainCharacter";
import { Directions } from '../Interfaces'
import Game from "../Game";

export default class Monster{
    id: number = 0
    sourceColumn: number = 0;
    damage: number = 0;
    health: number = 0;

    xPosition: number = 0;
    yPosition: number = 0;
    lookingDirection: number = 0;
    moved: boolean = false
    distanceFromPlayer: number = 0;

    constructor(sourceColumn: number, damage:number, health: number, xPosition: number, yPosition: number, startDirection: number){
        this.sourceColumn = sourceColumn
        this.damage = damage;
        this.health = health;
        this.xPosition = xPosition
        this.yPosition = yPosition
        this.id = -(80+sourceColumn);
        this.lookingDirection = startDirection

        Game.gameMap.setBlock2([xPosition,yPosition], this.id)
    }

    lookAtMe(xCoord: number, yCoord:number){
        if(this.xPosition == xCoord && this.yPosition > yCoord){
            this.lookingDirection = Directions.TOP;
            return;
        }
        if(this.xPosition == xCoord && this.yPosition < yCoord){
            this.lookingDirection = Directions.BOTTOM;
            return;
        }

        if(this.yPosition == yCoord && this.xPosition > xCoord){
            this.lookingDirection = Directions.LEFT;
            return;
        }
        if(this.yPosition == yCoord && this.xPosition < xCoord){
            this.lookingDirection = Directions.RIGHT;
            return;
        }

        if(this.xPosition > xCoord && this.yPosition > yCoord){
            this.lookingDirection = Directions.TOP_LEFT;
            return
        }
        if(this.xPosition > xCoord && this.yPosition < yCoord){
            this.lookingDirection = Directions.BOTTOM_LEFT;
            return
        }

        if(this.xPosition < xCoord && this.yPosition > yCoord){
            this.lookingDirection = Directions.TOP_RIGHT;
            return
        }
        if(this.xPosition < xCoord && this.yPosition < yCoord){
            this.lookingDirection = Directions.BOTTOM_RIGHT;
            return
        }
    }

    die(addScore: boolean){
        Game.gameMap.clearBlock2([this.xPosition, this.yPosition])
        if(addScore) MainCharacter.changeScore(5)
    }
}