export class Show {
    constructor(
        private readonly showId: string,
        private readonly movie: string,
        private readonly startTime: string
    ) { }
    
    getMovie() : string{
        return this.movie
    }

    getStartTime(): string {
        return this.startTime;
    }
}

