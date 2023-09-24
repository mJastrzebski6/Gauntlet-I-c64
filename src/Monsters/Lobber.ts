import Monster from "./Monster";
import Coordinates from '../Interfaces'

export default class Lobber extends Monster{
    rockCoords: Coordinates = {x:1,y:1} as Coordinates
    rockThrew: boolean = false;

    constructor(sourceColumn: number, damage:number, health: number, xPosition: number, yPosition: number, startDirection: number){
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }

    renderRock(startIndexes: Coordinates){
        if(this.rockCoords.x >= startIndexes.x*2 && 
            this.rockCoords.x <= startIndexes.x*2+34 && 
            this.rockCoords.y >= startIndexes.y*2 &&
            this.rockCoords.y <= startIndexes.y*2+22
        ){}
        else return

        
    }
}