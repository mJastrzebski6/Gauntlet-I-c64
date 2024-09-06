import Canvas from "./Canvas";
import { Constants } from "./Consts";
import Images from "./Images";
import Coordinates from "./Interfaces";
import MainCharacter from "./MainCharacter";

export default class Projectile{
    sourceRow: number = 0;
    direction: number = 0;
    frame: number = 0;
    xPosition: number = 0;
    yPosition: number = 0;
    thrown: boolean = false
    animationTimestamp: number = 0;
    lastTimeThrew: number = 0;

    constructor(sourceRow: number, direction:number, xPosition: number, yPosition:number){
        this.sourceRow = sourceRow;
        this.direction = direction;
        this.xPosition = xPosition
        this.yPosition = yPosition
    }

    draw(renderedView: Coordinates){
        if(!MainCharacter.weapon.thrown) return;

        Canvas.ctx.drawImage(
            Images.assets.weapons,
            MainCharacter.weapon.frame*9,
            MainCharacter.sourceCol*9,
            8,
            8,
            MainCharacter.weapon.xPosition-renderedView.x,
            MainCharacter.weapon.yPosition-renderedView.y,
            8*Constants.multiplier,
            8*Constants.multiplier
        );
    }
}