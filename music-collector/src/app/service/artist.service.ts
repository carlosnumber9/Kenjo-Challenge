import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Artist } from '../model/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  BASE_URL = 'http://localhost:3000';
  public listObservable = new Subject<Artist[]>();

  constructor(private http: HttpClient) { }

  /**
   * Retrieves total artists list from database.
   */
  public getAll() {
    const URL = this.BASE_URL + '/artists/all';
    let artistList: Artist[] = [];
    this.http.get(URL).subscribe((artists: Object[]) => {
      artistList = this.convertIntoArtistList(artists);
      this.listObservable.next(artistList);
    });
  }

  /**
   * Converts raw object into model artist object
   * @param rawArtistObject to convert
   */
  private parse(rawArtistObject: Object): Artist {
      return new Artist(
        rawArtistObject['_id'],
        rawArtistObject['name'],
        rawArtistObject['photoUrl'],
        ('birthdate' in rawArtistObject) ? new Date(rawArtistObject['birthdate']) : undefined,
        ('deathDate' in rawArtistObject) ? new Date(rawArtistObject['deathDate']) : undefined
      );
  }

  /**
   * Converts specified object list into artist model object list
   * @param rawArtistList Raw object list with artists info
   */
  private convertIntoArtistList(rawArtistList: Object[]): Artist[] {
    let artistList: Artist[] = [];
    rawArtistList.forEach((artist) => {
      let artistToAdd = this.parse(artist);
      artistList.push(artistToAdd);
    });
    return artistList;
  }

  /**
   * Obtains observable for artist list changes
   */
  public getListObservable(): Observable<Artist[]> {
    return this.listObservable.asObservable();
  }

  /**
   * Deletes artist with specified ID
   * @param artistId 
   */
  public delete(artistId: string): Observable<any> {
    const URL = this.BASE_URL + '/artist/' + artistId;
    return this.http.delete(URL);
  }

  /**
   * Saves specified artist in database.
   * @param artistToCreate 
   */
  public create(artistToCreate: Artist) {
    const URL = this.BASE_URL + '/artist';
    let artistForRequest = artistToCreate.toRequestObject();
    return this.http.post(URL, artistForRequest);
  }

  /**
   * Updates specified artist in database.
   * @param artistToUpdate 
   */
  public update(artistToUpdate: Artist) {
    const URL = this.BASE_URL + '/artist/' + artistToUpdate.id;
    let artistForRequest = artistToUpdate.toRequestObject();
    return this.http.put(URL, artistForRequest);
  }

}
