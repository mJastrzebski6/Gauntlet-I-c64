import Monster from "./Monster";

export default class Death extends Monster{
    healthSuckedOutOfPlayer = 0

    constructor(sourceColumn: number, damage:number, health: number, xPosition: number, yPosition: number, startDirection: number){
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}