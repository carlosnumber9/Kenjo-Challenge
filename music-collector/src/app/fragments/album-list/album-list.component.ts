import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicService } from 'src/app/music.service';

import { Album } from '../../model/album.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albumList: Album[] = [];
  loaded: boolean = false;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.albumListStream().subscribe((newAlbumList: Album[]) => {
      this.albumList = newAlbumList;
      console.debug('Album list refresh', this.albumList);
      this.loaded = true;
    });
    this.getAlbumList();
  }

  getAlbumList(): void  {
    this.loaded = false;
    this.albumList = [];
    this.musicService.retrieveAlbumsFromDB();
  }

  deleteAlbum(album): void {
    this.musicService.deleteAlbum(album.id).subscribe(() => {
      this.getAlbumList();
    })
  }




}
