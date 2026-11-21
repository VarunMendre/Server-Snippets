// Aggregation Example

class Song {
  constructor(private readonly title: string) {}

  getTitle(): string {
    return this.title;
  }
}

class Playlist {
  private readonly songs: Song[] = [];

  constructor(private readonly name: string) {}

  getName(): string {
    return this.name;
  }

  add(song: Song): boolean {
    if (this.songs.includes(song)) return false;

    this.songs.push(song);
    return true;
  }

  clear(): void {
    this.songs.length = 0;
  }

  getSongs(): Song[] {
    return this.songs;
  }
}

class PlaylistLibrary {
  private readonly songsByTitle = new Map<string, Song>();
  private readonly playlistsByName = new Map<string, Playlist>();

  constructor() {}

  addSong(title: string): boolean {
    if (this.songsByTitle.has(title)) {
      return false;
    }
    this.songsByTitle.set(title, new Song(title));
    return true;
  }

  createPlaylist(name: string): boolean {
    if (this.playlistsByName.has(name)) {
      return false;
    }
    this.playlistsByName.set(name, new Playlist(name));
    return true;
  }

  addToPlaylist(playlistName: string, songTitle: string): boolean {
    const playlist = this.playlistsByName.get(playlistName);
    const song = this.songsByTitle.get(songTitle);
    return playlist !== undefined && song !== undefined && playlist.add(song);
  }

  clearPlaylist(name: string): boolean {
    const playlist = this.playlistsByName.get(name);
    if (playlist === undefined) {
      return false;
    }
    playlist.clear();
    return true;
  }

  songCount(): number {
    return this.songsByTitle.size;
  }

  playlistSongs(name: string): string[] {
    const playlist = this.playlistsByName.get(name);
    if (playlist === undefined) {
      return [];
    }
    return playlist.getSongs().map((song) => song.getTitle());
  }
}
