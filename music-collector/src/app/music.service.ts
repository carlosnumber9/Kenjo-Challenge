import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Album } from './model/album.model';
import { Artist } from './model/artist.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  BASE_URL = 'http://localhost:3000';

  public albumListObservable = new Subject<Album[]>();

  constructor(private http: HttpClient) { }

  public retrieveAlbumsFromDB() {
    const URL = this.BASE_URL + '/albums/all';
    let albumList: Album[] = [];
    this.http.get(URL).subscribe((albums: Object[]) => {
      albumList = this.processAlbumList(albums);
      this.albumListObservable.next(albumList);
    });
  }

  private processAlbumList(rawAlbumList: Object[]) {
    let albumList: Album[] = [];
    rawAlbumList.forEach((album) => {
      let albumToAdd = new Album(
        album['_id'],
        album['title'],
        album['coverUrl'],
        album['year'],
        album['genre']
      );
      albumList.push(albumToAdd);
    });
    return albumList;
  }

  public albumListStream() {
    return this.albumListObservable.asObservable();
  }

  public deleteAlbum(albumID: string){
    const URL = this.BASE_URL + '/album/' + albumID;
    return this.http.delete(URL);
  }

}
