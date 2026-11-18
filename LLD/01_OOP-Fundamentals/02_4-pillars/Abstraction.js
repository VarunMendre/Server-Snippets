class MediaPlayer {
    playerName;
    constructor(playerName) {
        this.playerName = playerName;
    }
    displayStatus() {
        console.log(`[$${this.playerName}] status: Ready`);
    }
    logAction(action) {
        console.log(`[$${this.playerName}] Actions: ${action}`);
    }
}
class AudioPlayer extends MediaPlayer {
    audioFile;
    constructor(audioFile) {
        super("AudioPlayer");
        this.audioFile = audioFile;
    }
    play() {
        this.logAction(`Playing audio: ${this.audioFile}`);
    }
    pause() {
        this.logAction(`Paused audio: ${this.audioFile}`);
    }
    stop() {
        this.logAction(`Stopped audio: ${this.audioFile}`);
    }
}
class VideoPlayer extends MediaPlayer {
    videoFile;
    resolution;
    constructor(videoFile, resolution) {
        super("VideoPlayer");
        this.videoFile = videoFile;
        this.resolution = resolution;
    }
    play() {
        this.logAction(`Playing video: ${this.videoFile} at ${this.resolution}`);
    }
    pause() {
        this.logAction(`Paused video: ${this.videoFile}`);
    }
    stop() {
        this.logAction(`Stopped video: ${this.videoFile}`);
    }
}
class PlayerController {
    player;
    constructor(player) {
        this.player = player;
    }
    startPlayback() {
        this.player.displayStatus();
        this.player.play();
    }
    pausePlayback() {
        this.player.pause();
    }
    stopPlayback() {
        this.player.stop();
    }
}
const audioCtrl = new PlayerController(new AudioPlayer("songs.mp3"));
audioCtrl.startPlayback();
audioCtrl.pausePlayback();
const videoCtrl = new PlayerController(new VideoPlayer("movie.mp4", "1080p"));
videoCtrl.startPlayback();
videoCtrl.stopPlayback();
export {};
