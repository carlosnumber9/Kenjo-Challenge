import { Artist } from './artist.model';

export class Album {

    constructor(
        public id?: string,
        public title?: string,
        public coverUrl?: string,
        public year?: number,
        public genre?: string,
        public artist?: Artist) { }

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