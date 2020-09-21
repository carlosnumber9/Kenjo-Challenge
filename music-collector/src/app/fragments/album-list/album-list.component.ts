import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/music.service';
import { MatDialog } from '@angular/material/dialog';


import { Album } from '../../model/album.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albumList: Album[] = [];
  loaded: boolean = false;

  constructor(
    private musicService: MusicService,
    private dialog: MatDialog) { }

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

  openDeleteAlbumDialog(album: Album): void {
    let dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        data: {
          album: album
        }
      });

    dialogRef.afterClosed().subscribe((deletionConfirmed) => {
      if (deletionConfirmed) {
        this.musicService.deleteAlbum(album.id).subscribe(() => {
          this.getAlbumList();
        })
      }
    })


  }




}
