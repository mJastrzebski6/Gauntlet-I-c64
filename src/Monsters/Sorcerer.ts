import Monster from "./Monster";

export default class Sorcerer extends Monster{
    isVisible: Boolean = true;
    
    constructor(sourceColumn: number, damage:number, health: number, xPosition: number, yPosition: number, startDirection: number){
        super(sourceColumn, damage, health, xPosition, yPosition, startDirection);
        this.isVisible = true;
    }
}