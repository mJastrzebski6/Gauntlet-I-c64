import Game from "./Game";
import MainCharacter from "./MainCharacter";

class Spawner{
    mob: number = 0;
    lastTimeSpawnedSomething: number = 0;
    timeToSpawn: number = 0;
    xPosition: number = 0;
    yPosition: number = 0;

    constructor(x: number, y:number, mobId:number){
        this.xPosition = x;
        this.yPosition = y;
        this.mob = mobId;
        this.timeToSpawn = Math.floor(Math.random() * 6) + 1;
    }
    
    destroyed(){
        MainCharacter.changeScore(10);
        Game.gameMap.clearBlock2([this.xPosition, this.yPosition])
    }
}

export default Spawner