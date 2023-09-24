import GameMap from "./GameMap";
import Canvas from "./Canvas";
import SoundsHandler from "./SoundsHandler";
import Loader from "./index"
import MainCharacter from "./MainCharacter";
import KeyboardEvents from "./KeyboardEvents";

class Game{
    gameMap: GameMap = new GameMap();

    async startGame(selectedCharacter:string, selectedMap: string){
        cancelAnimationFrame(Canvas.raf);
        await this.gameMap.clearMap()
        KeyboardEvents.cleanEvents()
        Canvas.endingFrame = 0
        await this.gameMap.loadMap(selectedMap, selectedCharacter);
        
        this.launchGame()
    }

    launchGame(){
        Canvas.drawLevelTitleScreen(this.gameMap.levelNumber);
        SoundsHandler.play("levelTitle")
        
        setTimeout(() => {
            SoundsHandler.play("startLevel")
            this.gameMap.stopGame = false
            KeyboardEvents.disableEvents = false;
            Canvas.raf = window.requestAnimationFrame(() => Canvas.renderGameFrame());
            this.gameMap.setIntervals();
            MainCharacter.startLosingHPInterval()
        }, 4000);
    }

    restartGame(){
        if(this.gameMap.animateSpritesInterval !== null) clearInterval(this.gameMap.animateSpritesInterval)
        if(this.gameMap.spawningMonstersInterval !== null) clearInterval(this.gameMap.spawningMonstersInterval)
        Loader.createStartButton()
    }
}

export default new Game()