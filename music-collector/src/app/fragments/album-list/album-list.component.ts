import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/service/album.service';
import { MatDialog } from '@angular/material/dialog';
import { HostListener } from "@angular/core";


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
  columnsNumber: number;
  noDataMessage: string;

  constructor(
    private albumService: AlbumService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.columnsNumber = this.getListColumns();
    this.albumService.getListObservable().subscribe((response: any) => {
      if('status' in response) {
        this.noDataMessage = 'There was an error trying to retrieve albums from database.';
      }
      else {
        this.albumList = response;
        this.noDataMessage = 'There are no albums in database yet.';  
      }
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
          elementType: 'ALBUM',
          name: album.title
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

  getListColumns(): number {
    let windowWidth = window.innerWidth;
    if(windowWidth > 1200) {
      return 4;
    }
    if(windowWidth > 800) {
      return 3;
    }
    if(windowWidth > 600) {
      return 2;
    }
    return 1;
  }

  @HostListener('window:resize', ['$event'])
  refreshColumnsNumber() {
      this.columnsNumber = this.getListColumns();
  }


}
