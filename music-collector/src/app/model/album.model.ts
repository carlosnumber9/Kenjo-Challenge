import { Artist } from './artist.model';

export class Album {

    public artist: Artist;

    constructor(
        public id?: string,
        public title?: string,
        public coverUrl?: string,
        public year?: number,
        public genre?: string) { }

    /**
     * Converts album to raw object for request
     */
    toRequestObject(): Object {
        return {
            title: this.title,
            year: this.year,
            genre: this.genre,
            coverUrl: this.coverUrl ? this.coverUrl : undefined,
            artistId: this.artist ? this.artist.id : undefined
        };
    }

}