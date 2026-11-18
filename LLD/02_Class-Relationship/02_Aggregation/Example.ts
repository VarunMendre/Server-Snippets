class Song {
  constructor(
    private readonly songId: string,
    private readonly title: string,
    private readonly artist: string,
    private readonly durationSeconds: number,
  ) {}

  getSongId(): string {
    return this.songId;
  }

  getTitle(): string {
    return this.title;
  }

  getArtist(): string {
    return this.artist;
  }

  getDurationsSeconds(): number {
    return this.durationSeconds;
  }
}

class Playlist {
  private readonly songs: Song[] = [];

  constructor(
    private readonly playlistId: string,
    private readonly name: string,
  ) {}

  // Receives an existing song; the playlist never creates one
  addSong(song: Song): void {
    this.songs.push(song);
  }

  // removes the relationship only not the song object
  removeSong(song: Song): void {
    const index = this.songs.indexOf(song);
    if (index !== -1) this.songs.splice(index, 1);
  }

  getSongs(): readonly Song[] {
    return [...this.songs];
  }

  getName(): string {
    return this.name;
  }
}

function printPlaylist(playlist: Playlist): void {
  const titles = playlist.getSongs().map((song) => song.getTitle());
  console.log(`${playlist.getName()}: ${titles.join(", ")}`);
}

function main(): void {
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