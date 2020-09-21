import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/music.service';
import { MatDialog } from '@angular/material/dialog';


import { Album } from '../../model/album.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AddAlbumDialogComponent } from '../add-album-dialog/add-album-dialog.component';

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

  openAddAlbumDialog():void {
    let dialogRef = this.dialog.open(AddAlbumDialogComponent);

    dialogRef.afterClosed().subscribe((albumToCreate) => {
      if(albumToCreate) {
        this.musicService.createAlbum(albumToCreate).subscribe(() => {
          this.getAlbumList();
        })
      }
    })
  }


  getAlbumTileBackground(album: Album) {
    return album.coverUrl ? album.coverUrl : 'https://i1.wp.com/www.furnacemfg.com/wp-content/uploads/2018/12/orange_vinyl.jpg?fit=2218%2C2216&ssl=1';
  }



}
