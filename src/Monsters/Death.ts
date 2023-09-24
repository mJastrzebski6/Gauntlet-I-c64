import Monster from "./Monster";

export default class Death extends Monster{
    constructor(sourceColumn: number, damage:number, health: number, xPosition: number, yPosition: number, startDirection: number){
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
    }
}