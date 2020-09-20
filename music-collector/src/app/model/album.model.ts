import { Artist } from './artist.model';

export class Album {

    public artist: Artist;

    constructor(
        public id: string,
        public title: string,
        public coverUrl: string,
        public year: number,
        public genre: string) {}

}