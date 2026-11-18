class Song {
    songId;
    title;
    artist;
    durationSeconds;
    constructor(songId, title, artist, durationSeconds) {
        this.songId = songId;
        this.title = title;
        this.artist = artist;
        this.durationSeconds = durationSeconds;
    }
    getSongId() {
        return this.songId;
    }
    getTitle() {
        return this.title;
    }
    getArtist() {
        return this.artist;
    }
    getDurationsSeconds() {
        return this.durationSeconds;
    }
}
class Playlist {
    playlistId;
    name;
    songs = [];
    constructor(playlistId, name) {
        this.playlistId = playlistId;
        this.name = name;
    }
    // Receives an existing song; the playlist never creates one
    addSong(song) {
        this.songs.push(song);
    }
    // removes the relationship only not the song object
    removeSong(song) {
        const index = this.songs.indexOf(song);
        if (index !== -1)
            this.songs.splice(index, 1);
    }
    getSongs() {
        return [...this.songs];
    }
    getName() {
        return this.name;
    }
}
function printPlaylist(playlist) {
    const titles = playlist.getSongs().map((song) => song.getTitle());
    console.log(`${playlist.getName()}: ${titles.join(", ")}`);
}
function main() {
    const blindingLights = new Song("S-1", "Blinding Lights", "The Weeknd", 200);
    const goldenBrown = new Song("S-2", "Golden Brown", " The Stranglers", 203);
    const workout = new Playlist("P-1", "Workout");
    const favorites = new Playlist("P-2", "Favorites");
    workout.addSong(blindingLights);
    workout.addSong(goldenBrown);
    favorites.addSong(blindingLights);
    printPlaylist(workout);
    printPlaylist(favorites);
    if (workout.getSongs()[0] === favorites.getSongs()[0]) {
        console.log("Both playlists reference the same Song object");
    }
    workout.removeSong(blindingLights);
    console.log("After removing Blinding Lights from Workout:");
    printPlaylist(workout);
    printPlaylist(favorites);
}
main();
export {};
