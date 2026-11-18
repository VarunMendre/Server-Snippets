export class Show {
    showId;
    movie;
    startTime;
    constructor(showId, movie, startTime) {
        this.showId = showId;
        this.movie = movie;
        this.startTime = startTime;
    }
    getMovie() {
        return this.movie;
    }
    getStartTime() {
        return this.startTime;
    }
}
