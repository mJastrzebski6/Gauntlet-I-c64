import Game from "./Game";

class KeyboardEvents{
    WKeyClicked: boolean = false;
    SKeyClicked: boolean = false;
    AKeyClicked: boolean = false;
    DKeyClicked: boolean = false;
    SpaceKeyClicked: boolean = false;
    stackOfClicks: string[] = []
    disableEvents: boolean = false;
    
    async addListeners(){
        addEventListener("keydown", (event)=>{
            if(this.disableEvents) return;

            if(event.code === "KeyW"){
                this.WKeyClicked = true;
                if(!this.stackOfClicks.includes("W")) this.stackOfClicks.push("W")
            }
            if(event.code === "KeyS"){
                this.SKeyClicked = true;
                if(!this.stackOfClicks.includes("S")) this.stackOfClicks.push("S")
            }
            if(event.code === "KeyA"){
                this.AKeyClicked = true;
                if(!this.stackOfClicks.includes("A")) this.stackOfClicks.push("A")
            }
            if(event.code === "KeyD"){
                this.DKeyClicked = true;
                if(!this.stackOfClicks.includes("D")) this.stackOfClicks.push("D")
            }
            if(event.code === "Space"){
                this.SpaceKeyClicked = true;
            }
        })

        addEventListener("keyup", (event)=>{
            if(this.disableEvents) return;
            
            if(event.code === "KeyW"){
                this.WKeyClicked = false;
                this.stackOfClicks.splice(this.stackOfClicks.indexOf("W"), 1);
            }
            if(event.code === "KeyS"){
                this.SKeyClicked = false;
                this.stackOfClicks.splice(this.stackOfClicks.indexOf("S"), 1);
            }
            if(event.code === "KeyA"){
                this.AKeyClicked = false;
                this.stackOfClicks.splice(this.stackOfClicks.indexOf("A"), 1);
            }
            if(event.code === "KeyD"){
                this.DKeyClicked = false;
                this.stackOfClicks.splice(this.stackOfClicks.indexOf("D"), 1);
            }
            if(event.code === "Space") this.SpaceKeyClicked = false;
            if(event.code === "KeyC") Game.gameMap.clearMapFromMonstersAndSpawners(true);
        })
    }
    cleanEvents(){
        this.WKeyClicked= false;
        this.SKeyClicked= false;
        this.AKeyClicked = false;
        this.DKeyClicked = false;
        this.SpaceKeyClicked = false;
        this.stackOfClicks = []
    }
}

export default new KeyboardEvents()