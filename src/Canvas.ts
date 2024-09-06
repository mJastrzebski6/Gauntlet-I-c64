import MainCharacter from './MainCharacter';
import Images from './Images';
import Helpers from './Helpers';
import Sorcerer from './Monsters/Sorcerer';
import Demon from './Monsters/Demon';
import { Constants } from './Consts';
import Game from './Game';
import Monster from './Monsters/Monster';

class Canvas {
    canvasTag: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number = 1285;
    height: number = 960;
    
    multiplier: number = 5
    renderedViewX: number = 0;
    renderedViewY: number = 0;
    raf: number = 0
    endingFrame: number = 0;

    oldTime: number = 0
    newTime: number = 0;
    deltaTime : number = 0;
    fps: number = 0;

    constructor(){
        this.canvasTag = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvasTag.getContext("2d") as CanvasRenderingContext2D;
        
        this.canvasTag.width = this.width
        this.canvasTag.height = this.height
        this.ctx.imageSmoothingEnabled = false;
    }

    drawStartScreen(){
        this.ctx.drawImage(
            Images.assets.startScreen,
            0,
            0,
            320,
            200,
            0,
            0,
            1285,
            960
        );
    }

    drawLevelTitleScreen(levelNumber: number){
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, 1285, 960);

        const levelLength = levelNumber.toString().length
        let levelDigits = []
        for(let i=0; i<3-levelLength; i++) levelDigits.push(0);
        for(let i=0; i<levelLength; i++) levelDigits.push(parseInt(levelNumber.toString().charAt(i)))
       
        this.ctx.drawImage(
            Images.assets.bigNumbers,
            171,
            MainCharacter.sourceCol*17,
            95,
            16,
            320,
            370,
            95*(this.multiplier-1),
            16*(this.multiplier-1)
        );

        for(let i=0; i<3; i++){
            this.ctx.drawImage(
                Images.assets.bigNumbers,
                levelDigits[i]*17,
                MainCharacter.sourceCol*17,
                16,
                16,
                740 + 16*this.multiplier*i,
                370,
                16*(this.multiplier-1),
                16*(this.multiplier-1)
            );
        }
    }

    renderGameFrame() {
        if(Game.gameMap.stopGame) return
        
        this.oldTime = this.newTime
        this.newTime = Date.now();
        this.deltaTime = (this.newTime-this.oldTime)

        //draw background
        this.ctx.fillStyle = '#7a7a7a';
        this.ctx.fillRect(0, 0, 257*this.multiplier, 152*this.multiplier);

        this.drawWalls()
        this.drawItems();
        Game.gameMap.moveMonsters()
        MainCharacter.animateCharacter();
        
        this.drawCharacter()
        this.drawMonsters()

        // bottom bar
        this.ctx.drawImage(
            Images.assets.bottomBar,
            0,
            0,
            257,
            40,
            0*this.multiplier,
            152*this.multiplier,
            257*this.multiplier,
            40*this.multiplier
        );
        this.drawScoreAndHealth()

        // fps in the corner
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText((1.0/(this.deltaTime/1000)).toFixed(0).toString(), 0 , 786);

        this.raf = window.requestAnimationFrame(() => this.renderGameFrame());
    }

    drawWalls(){
        const startIndexes = Helpers.getStartIndexes();

        for(let i:number=0; i<17; i++){
            for (let j:number = 0; j<11; j++){
                if(Game.gameMap.map?.[startIndexes.y*2 + j*2]?.[startIndexes.x*2 +i*2]>19) continue
                this.ctx.drawImage(
                    Images.assets.walls,
                    (Game.gameMap.map?.[startIndexes.y*2 + j*2]?.[startIndexes.x*2 +i*2]*17)-17,
                    0,
                    16,
                    16,
                    -this.renderedViewX%80 + i*80,
                    -this.renderedViewY%80 + j*80,
                    16*this.multiplier,
                    16*this.multiplier
                );
            }
        }
    }

    drawItems(){
        const startIndexes = Helpers.getStartIndexes();

        for(let i:number=0; i<17; i++){
            for (let j:number = 0; j<11; j++){
                this.ctx.drawImage(
                    Images.assets.items,
                    ((Game.gameMap.map?.[startIndexes.y*2 + j*2]?.[startIndexes.x*2 +i*2]-19)*17)-17,
                    0,
                    16,
                    16,
                    -this.renderedViewX%80 + i*80,
                    -this.renderedViewY%80 + j*80,
                    16*this.multiplier,
                    16*this.multiplier
                );
            }
        }
    }

    drawCharacter(){
        this.ctx.drawImage(
            Images.assets.mainCharacters,
            MainCharacter.lastDirection[0]*17 + MainCharacter.sourceCol*136,
            MainCharacter.lastDirection[1]*17,
            16,
            16,
            MainCharacter.xCoord-this.renderedViewX,
            MainCharacter.yCoord-this.renderedViewY,
            16*this.multiplier,
            16*this.multiplier
        );
        MainCharacter.weapon.draw({x:this.renderedViewX, y:this.renderedViewY})
    }

    drawMonsters(){
        
        const startIndexes = Helpers.getStartIndexes();
        const playerCoords = MainCharacter.getCoordinates(MainCharacter.xCoord, MainCharacter.yCoord)

        Game.gameMap.arrayOfMonsters.forEach((monster: Monster)=>{
            monster.lookAtMe(playerCoords[0]*2, playerCoords[1]*2)

            if(monster instanceof Sorcerer && monster.isVisible===false) return;
            if(monster instanceof Demon) monster.animateFireball({x:this.renderedViewX, y:this.renderedViewY})

            if(monster.xPosition >= startIndexes.x*2 && 
                monster.xPosition <= startIndexes.x*2+34 && 
                monster.yPosition >= startIndexes.y*2 &&
                monster.yPosition <= startIndexes.y*2+22
            ){
                this.ctx.drawImage(
                    Images.assets.monsters,
                    (monster.sourceColumn*8+monster.lookingDirection)*17,
                    (Game.gameMap.universalMonstersFrameIndex%3)*17,
                    16,
                    16,
                    -this.renderedViewX%80 + (monster.xPosition-startIndexes.x*2)*40,
                    -this.renderedViewY%80 + (monster.yPosition-startIndexes.y*2)*40,
                    16*this.multiplier,
                    16*this.multiplier
                );
            }
        })

        Game.gameMap.arrayOfGoblins.forEach((goblin:Monster)=>{
            //goblin.renderRock(startIndexes)
            if(goblin.xPosition >= startIndexes.x*2 && 
                goblin.xPosition <= startIndexes.x*2+34 && 
                goblin.yPosition >= startIndexes.y*2 &&
                goblin.yPosition <= startIndexes.y*2+22
            ){
                this.ctx.drawImage(
                    Images.assets.monsters,
                    (goblin.sourceColumn*8+4)*17,
                    (Game.gameMap.universalMonstersFrameIndex%3)*17,
                    16,
                    16,
                    -this.renderedViewX%80 + (goblin.xPosition-startIndexes.x*2)*40,
                    -this.renderedViewY%80 + (goblin.yPosition-startIndexes.y*2)*40,
                    16*this.multiplier,
                    16*this.multiplier
                );
            }
        })
    }

    drawScoreAndHealth(){
        const scoreLength = MainCharacter.score.toString().length
        let scoreDigits = []
        for(let i=0; i<6-scoreLength; i++) scoreDigits.push(0);
        for(let i=0; i<scoreLength; i++) scoreDigits.push(parseInt(MainCharacter.score.toString().charAt(i)))

        for(let i=0; i<6; i++){
            if (Images.assets.numbers === undefined) continue;
            this.ctx.drawImage(
                Images.assets.numbers,
                scoreDigits[i]*9,
                MainCharacter.sourceCol*9,
                8,
                8,
                41 + 8*this.multiplier*i,
                176*this.multiplier,
                8*this.multiplier,
                8*this.multiplier
            );
        }

        const healthLength = MainCharacter.health.toString().length
        let healthDigits = []
        for(let i=0; i<4-healthLength; i++) healthDigits.push(0);
        for(let i=0; i<healthLength; i++) healthDigits.push(parseInt(MainCharacter.health.toString().charAt(i)))

        for(let i=0; i<6; i++){
            this.ctx.drawImage(
                Images.assets.numbers,
                healthDigits[i]*9,
                MainCharacter.sourceCol*9,
                8,
                8,
                404 + 8*this.multiplier*i,
                176*this.multiplier,
                8*this.multiplier,
                8*this.multiplier
            );
        }
        this.drawItemsAndAbilities();
    }

    drawItemsAndAbilities(){
        MainCharacter.ownedAbilities.forEach(ability => {
            switch (ability){
                case 37: // lightblue elixir
                    this.drawIcon(14, 610, 160)
                    break;
                case 38: // green elixir
                    this.drawIcon(12, 121, 160)
                    break;
                case 39: // yellow elixir
                    this.drawIcon(10, 41, 160)
                    break;
                case 40: // purple elixir
                    this.drawIcon(11, 81, 160)
                    break;
                case 41: // brown elixir
                    this.drawIcon(13, 530, 160)
                    break;
            }
        });
        for(let i=0; i<MainCharacter.keys; i++) this.drawIcon(15, 39+40*i, 184)
        for(let i=0; i<MainCharacter.potions; i++) this.drawIcon(16, 605-40*i, 184)
    }

    drawIcon(sXIndex: number, dX:number, dY:number){
        this.ctx.drawImage(
            Images.assets.numbers,
            sXIndex*9,
            0,
            8,
            8,
            dX,
            dY*this.multiplier,
            8*this.multiplier,
            8*this.multiplier
        );
    }

    drawAbilityScreen(itemIndex: number){
        setTimeout(()=>{
            this.ctx.drawImage(
                Images.assets.pickUpAbilityScreen,
                0,
                0,
                321,
                192,
                0,
                0,
                this.width,
                this.height-40*this.multiplier
            );
            this.ctx.drawImage(
                Images.assets.abilityTexts,
                0,
                itemIndex*8,
                175,
                7,
                77*4,
                111*4,
                176*(Constants.multiplier-1),
                8*(Constants.multiplier-1)
            );
            this.ctx.drawImage(
                Images.assets.numbers,
                154,
                MainCharacter.sourceCol*9,
                64,
                8,
                130*4,
                70*4,
                64*(Constants.multiplier-1),
                9*(Constants.multiplier-1)
            );
        },1)
    }

    animateEnding(){
        console.log('animate ending')
        this.oldTime = this.newTime
        this.newTime = Date.now();
        this.deltaTime = (this.newTime-this.oldTime)

        //draw background
        this.ctx.fillStyle = '#7a7a7a';
        this.ctx.fillRect(0, 0, 257*this.multiplier, 152*this.multiplier);


        this.drawWalls()
        this.drawItems();
        Game.gameMap.moveMonsters()
        this.drawMonsters()

        // bottom bar
        this.ctx.drawImage(
            Images.assets.bottomBar,
            0,
            0,
            257,
            40,
            0*this.multiplier,
            152*this.multiplier,
            257*this.multiplier,
            40*this.multiplier
        );
        this.drawScoreAndHealth()

        // fps in the corner
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white"
        this.ctx.fillText((1.0/(this.deltaTime/1000)).toFixed(0).toString(), 0 , 786);

        let imageSource = (this.endingFrame-this.endingFrame%3)/3
        if(imageSource<16){
            this.ctx.drawImage(
                Images.assets.mainCharacters,
                (imageSource%8)*17 + MainCharacter.sourceCol*136,
                0,
                16,
                16,
                MainCharacter.xCoord-this.renderedViewX,
                MainCharacter.yCoord-this.renderedViewY,
                16*this.multiplier,
                16*this.multiplier
            );
        }
        else{
            this.ctx.drawImage(
                Images.assets.weapons,
                (imageSource-16)*9,
                MainCharacter.sourceCol*9,
                8,
                8,
                MainCharacter.xCoord-this.renderedViewX,
                MainCharacter.yCoord-this.renderedViewY,
                8*this.multiplier,
                8*this.multiplier
            );
        }
        this.endingFrame++;
        if(imageSource != 24) this.raf = window.requestAnimationFrame(()=>this.animateEnding())
        else Game.restartGame()
    }

    
}
export default new Canvas()