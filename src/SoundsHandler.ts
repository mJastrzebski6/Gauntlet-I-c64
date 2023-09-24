class cSoundFile{
    context: AudioContext | undefined;
    loadComplete: boolean = false;
    xhr: XMLHttpRequest | undefined;
    buffer: AudioBuffer | null = null;
    source: AudioBufferSourceNode| undefined;

    constructor(){
        try{
            this.context = new AudioContext()
        }
        catch{
            console.log("no audio")
        }
        this.loadFile("./sounds/audio.mp3")
    }
    
    loadFile = (file_name: string) => {
        if(this.context === undefined) return

        this.xhr = new XMLHttpRequest();
        this.xhr.open("GET", file_name, true);
        this.xhr.responseType = "arraybuffer"
        this.xhr.onload = this.onLoadComplete
        this.xhr.send();
    }

    onLoadComplete = (ev: Event): any => {
        this.xhr = <XMLHttpRequest>ev.currentTarget;
        this.context?.decodeAudioData(this.xhr.response, this.decodeData)
    }

    decodeData = (buffer: AudioBuffer): void => {
        this.buffer = buffer
        this.loadComplete = true
    }

    play = (start_time: number, duration: number) => {
        if(this.context === undefined) return
        if(this.loadComplete === false) return

        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.context.destination);
        this.source.start(this.context.currentTime, start_time, duration);
    }
}

class cSoundMarker {
    name: string = "";
    start: number = 0;
    duration: number = 0;
    volume: number = 0;
    loop: boolean = false;

    constructor(name: string, start: number, duration: number, volume: number, loop: boolean){
        this.name = name;
        this.start = start;
        this.duration = duration;
        this.volume = volume;
        this.loop = loop
    }
}

class cSoundManager{
    mute: boolean = false;
    soundsLoaded: boolean = false;
    _jsonFileLoaded : boolean = false;
    _soundFileString: string = "";

    soundMarkers: {[id: string] :cSoundMarker;} = {}
    _soundFile = new cSoundFile();

    async initializeSoundManager(){
        const sound_file = "./sounds/audio";
        this._soundFileString = sound_file;
        this._loadMarkers(sound_file + ".json");
    }

    mp3Enabled = () :boolean => {
        let a = document.createElement("audio");
        return !!(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/,''))
    }

    play = (sound_name: string): void => {
        if(this.mute) return;
        let marker: cSoundMarker = this.soundMarkers[sound_name];
        if(marker === null || marker === undefined) return;
        this._soundFile.play(marker.start, marker.duration);

    }

    _loadMarkers = (jsonfile: string): void => { 
        var marker_xhr = new XMLHttpRequest();
        marker_xhr.onreadystatechange = () => { 
            if (marker_xhr.readyState === XMLHttpRequest.DONE && marker_xhr.status === 200) this._onRead(JSON.parse(marker_xhr.responseText)); 
            else if([404,403].includes(marker_xhr.readyState)) this._onError(marker_xhr); 
        }
        marker_xhr.open("GET", jsonfile, true); 
        marker_xhr.send(); 
    } 

    _onRead = (data: any) => { 
        for (var marker_name in data.markers) { 
            var markers: any = data.markers[marker_name]; 
            this.addMarker(new cSoundMarker(marker_name, markers.start, markers.duration, markers.volume, markers.loop)); 
        }
        this._jsonFileLoaded = true; 
        if (this._soundFile.loadComplete == true)  this.soundsLoaded = true; 
        if(this.mp3Enabled()) this._soundFile.loadFile(this._soundFileString+".mp3")
        else this._soundFile.loadFile(this._soundFileString+".ogg")
    }

    SoundFileLoaded = (): void => { 
        if (this._jsonFileLoaded == true) this.soundsLoaded = true; 
    }

    _onError = (xhr: XMLHttpRequest) => { 
        console.log("HAVE NOT LOADED SOUND MARKER FILE: " + this._soundFileString + ".json status=" + xhr.readyState); 
    } 

    addMarker = (sound_marker: cSoundMarker): void => { 
        this.soundMarkers[sound_marker.name] = sound_marker; 
    } 

    removeMarker = (marker_name: string): void => { 
        delete this.soundMarkers[marker_name]; 
    }
}

export default new cSoundManager()