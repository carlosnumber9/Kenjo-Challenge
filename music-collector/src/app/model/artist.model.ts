export class Artist {

    constructor(
        public id?: string,
        public name?: string,
        public photoUrl?: string,
        public birthdate?: Date,
        public deathDate?: Date) {}

    /**
     * Converts album to raw object for request
     */
    toRequestObject(): Object {
        return {
            name: this.name,
            photoUrl: this.photoUrl,
            birthdate: this.birthdate ? this.birthdate.toISOString() : undefined,
            deathDate: this.deathDate ? this.deathDate.toISOString() : undefined 
        };
    }

}