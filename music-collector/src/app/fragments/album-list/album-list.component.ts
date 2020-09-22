import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/service/album.service';
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
    private albumService: AlbumService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.albumService.getListObservable().subscribe((newAlbumList: Album[]) => {
      this.albumList = newAlbumList;
      this.loaded = true;
    });
    this.getAlbumList();
  }

  getAlbumList(): void  {
    this.loaded = false;
    this.albumList = [];
    this.albumService.getAll();
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
        this.albumService.delete(album.id).subscribe(() => {
          this.getAlbumList();
        })
      }
    })
  }

  openEditAlbumDialog(album: Album): void {
    let dialogRef = this.dialog.open(
      AddAlbumDialogComponent,
      {
        data: {
          album: album
        }
      });

    dialogRef.afterClosed().subscribe((albumToUpdate) => {
      if (albumToUpdate) {
        this.albumService.update(album).subscribe(() => {
          this.getAlbumList();
        })
      }
    })
  }

  openAddAlbumDialog():void {
    let dialogRef = this.dialog.open(AddAlbumDialogComponent);

    dialogRef.afterClosed().subscribe((albumToCreate) => {
      if(albumToCreate) {
        this.albumService.create(albumToCreate).subscribe(() => {
          this.getAlbumList();
        })
      }
    })
  }


  getAlbumTileBackground(album: Album) {
    return album.coverUrl ? 
      album.coverUrl : 
      'https://i1.wp.com/www.furnacemfg.com/wp-content/uploads/2018/12/orange_vinyl.jpg?fit=2218%2C2216&ssl=1';
  }



}
