import Helpers from "./Helpers";

interface Assets {
    abilityTexts: HTMLImageElement;
    bigNumbers: HTMLImageElement;
    bottomBar: HTMLImageElement;
    items: HTMLImageElement;
    levelTitleScreen: HTMLImageElement;
    mainCharacters: HTMLImageElement ;
    monsters: HTMLImageElement;
    numbers: HTMLImageElement;
    pickUpAbilityScreen: HTMLImageElement;
    startScreen: HTMLImageElement;
    walls: HTMLImageElement;
    wallsOrigin: HTMLImageElement;
    weapons: HTMLImageElement;
}

class Images {
    private _assets: Assets | null = null;

    get assets() {
        if (this._assets === null) throw new Error('Cannot access assets which are not loaded.')
        return this._assets;
    }

    async loadImages() {
        const [abilityTexts, bigNumbers, items, levelTitleScreen, mainCharacters, monsters, numbers, pickUpAbilityScreen, startScreen, walls,wallsOrigin, weapons] = await Promise.all([
            this.imageLoader("abilityTexts.png"),
            this.imageLoader("bigNumbers.png"),
            this.imageLoader("items.png"),
            this.imageLoader("levelTitleScreen.png"),
            this.imageLoader("mainCharacters.png"),
            this.imageLoader("monsters.png"),
            this.imageLoader("numbers.png"),
            this.imageLoader("pickUpAbilityScreen.png"),
            this.imageLoader("startScreen.png"),
            this.imageLoader("walls.png"),
            this.imageLoader("walls.png"),
            this.imageLoader("weapons.png")
        ])

        this._assets = {
            abilityTexts,
            bigNumbers,
            items,
            levelTitleScreen,
            mainCharacters,
            monsters,
            numbers,
            pickUpAbilityScreen,
            startScreen,
            weapons,
            bottomBar: new Image(),
            walls,
            wallsOrigin
        }
    }

    async imageLoader(fileName: string) {
        return new Promise<HTMLImageElement>((resolve) => {
            let photo = new Image()
            photo.src = "images/" + fileName;
            photo.onload = () => resolve(photo)
        })
    }

    async loadWallsTypeAndColor(wallsColor : string, wallsType:number){
        let canvas = document.createElement("canvas") 
        canvas.width = 322
        canvas.height = 16
        let context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.imageSmoothingEnabled = false;

        context.drawImage(
            this.assets.wallsOrigin,
            0,
            17*wallsType,
            322,
            16,
            0,
            0,
            322,
            16
        );

        Helpers.replaceColorInCanvas(canvas, "#6049ed", wallsColor, 30)

        context.save()
        let img = document.createElement("img") as HTMLImageElement;
        img.src = canvas.toDataURL()

        if(this._assets!= null) this._assets.walls = img;
    }
}

export default new Images();