import Canvas from './Canvas'
import Images from './Images';
import SoundsHandler from './SoundsHandler';
import Game from './Game';
import KeyboardEvents from './KeyboardEvents';

class Loader{
    startButtonDiv: HTMLDivElement = document.getElementById("startButtonDiv") as HTMLDivElement;
    
    constructor(){
        this.loadUtilities()
    }

    async loadUtilities(){

        //check if images and audio files are ready and add listeners
        await Images.loadImages()
        await SoundsHandler.initializeSoundManager()
        await KeyboardEvents.addListeners()

        this.createStartButton()
        Canvas.drawStartScreen()
    }

    createStartButton(){
        let startButton: HTMLButtonElement =  document.createElement("button")
        startButton.innerText = "Start game!"
        startButton.addEventListener("click", this.startGame)
        this.startButtonDiv.appendChild(startButton)
    }

    startGame = () => {
        const characterSelect = document.getElementById("characterSelect") as HTMLSelectElement;
        const mapSelect = document.getElementById("mapSelect") as HTMLSelectElement;
        
        if(characterSelect === null) return;
        if(mapSelect === null) return;
    
        const selectedCharacter = characterSelect.value;
        const selectedMap = mapSelect.value;
    
        Game.startGame(selectedCharacter, selectedMap);
        if(this.startButtonDiv !== null && this.startButtonDiv.firstElementChild!== null) this.startButtonDiv.removeChild(this.startButtonDiv.firstElementChild);
    }
}

export default new Loader();

