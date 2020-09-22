import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Album } from '../model/album.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  BASE_URL = 'http://localhost:3000';
  public albumListObservable = new Subject<Album[]>();

  constructor(private http: HttpClient) { }

  /**
   * Retrieves total album list from database.
   */
  public getAll() {
    const URL = this.BASE_URL + '/albums/all';
    let albumList: Album[] = [];
    this.http.get(URL).subscribe((albums: Object[]) => {
      albumList = this.convertIntoAlbumList(albums);
      this.albumListObservable.next(albumList);
    });
  }

  /**
   * Converts raw object into model album object
   * @param rawAlbumObject to convert
   */
  private parse(rawAlbumObject: Object): Album {
      return new Album(
        rawAlbumObject['_id'],
        rawAlbumObject['title'],
        rawAlbumObject['coverUrl'],
        rawAlbumObject['year'],
        rawAlbumObject['genre']
      );
  }

  /**
   * Converts specified object list into Album model object list
   * @param rawAlbumList Raw object list with albums info
   */
  private convertIntoAlbumList(rawAlbumList: Object[]): Album[] {
    let albumList: Album[] = [];
    rawAlbumList.forEach((album) => {
      let albumToAdd = this.parse(album);
      albumList.push(albumToAdd);
    });
    return albumList;
  }

  /**
   * Obtains observable for album list changes
   */
  public getListObservable(): Observable<Album[]> {
    return this.albumListObservable.asObservable();
  }

  /**
   * Deletes album with specified ID
   * @param albumId 
   */
  public delete(albumId: string): Observable<any> {
    const URL = this.BASE_URL + '/album/' + albumId;
    return this.http.delete(URL);
  }

  /**
   * Saves specified album in database.
   * @param albumToCreate 
   */
  public create(albumToCreate: Album) {
    const URL = this.BASE_URL + '/album';
    let albumForRequest = albumToCreate.toRequestObject();
    return this.http.post(URL, albumForRequest);
  }

  /**
   * Updates specified album in database.
   * @param albumToUpdate 
   */
  public update(albumToUpdate: Album) {
    const URL = this.BASE_URL + '/album/' + albumToUpdate.id;
    let albumForRequest = albumToUpdate.toRequestObject();
    return this.http.put(URL, albumForRequest);
  }

}
