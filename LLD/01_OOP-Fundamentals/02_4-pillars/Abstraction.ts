abstract class MediaPlayer {
    protected playerName: string;

    constructor(playerName: string) {
        this.playerName = playerName;
    }

    abstract play(): void;
    abstract pause(): void;
    abstract stop(): void;

    displayStatus(): void {
        console.log(`[$${this.playerName}] status: Ready`);
    }

    logAction(action: string) {
        console.log(`[$${this.playerName}] Actions: ${action}`);
    }
}   

class AudioPlayer extends MediaPlayer {
    private audioFile: string;

    constructor(audioFile: string) {
        super("AudioPlayer");
        this.audioFile = audioFile;
    }

    play(): void {
        this.logAction(`Playing audio: ${this.audioFile}`);
    }

    pause(): void {
        this.logAction(`Paused audio: ${this.audioFile}`);
    }

    stop(): void {
        this.logAction(`Stopped audio: ${this.audioFile}`);
    }
}

class VideoPlayer extends MediaPlayer {
    private videoFile: string;
    private resolution: string;

    constructor(videoFile: string, resolution: string) {
        super("VideoPlayer");
        this.videoFile = videoFile;
        this.resolution = resolution;
    }

    play(): void {
        this.logAction(`Playing video: ${this.videoFile} at ${this.resolution}`);
    }

    pause(): void {
        this.logAction(`Paused video: ${this.videoFile}`);
    }

    stop(): void {
        this.logAction(`Stopped video: ${this.videoFile}`);
    }
}

class PlayerController {
    private player: MediaPlayer;

    constructor(player: MediaPlayer) {
        this.player = player;
    }

    startPlayback(): void {
        this.player.displayStatus();
        this.player.play();
    }

    pausePlayback(): void {
        this.player.pause();
    }

    stopPlayback(): void {
        this.player.stop();
    }
}


const audioCtrl = new PlayerController(new AudioPlayer("songs.mp3"));
audioCtrl.startPlayback();
audioCtrl.pausePlayback();


const videoCtrl = new PlayerController(new VideoPlayer("movie.mp4", "1080p"));
videoCtrl.startPlayback();
videoCtrl.stopPlayback();
