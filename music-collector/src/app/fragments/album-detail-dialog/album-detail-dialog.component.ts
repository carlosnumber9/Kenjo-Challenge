import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from 'src/app/model/album.model';
import { AlbumService } from 'src/app/service/album.service';
import { ArtistService } from 'src/app/service/artist.service';
import { AddAlbumDialogComponent } from '../add-album-dialog/add-album-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-album-detail-dialog',
  templateUrl: './album-detail-dialog.component.html',
  styleUrls: ['./album-detail-dialog.component.css']
})
export class AlbumDetailDialogComponent implements OnInit {

  album: Album;

  constructor(
    public dialogRef: MatDialogRef<AlbumDetailDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private dialog: MatDialog) { 
      this.getFullAlbumInfo(data.album);
    }

  ngOnInit(): void {
  }

  getFullAlbumInfo(album: Album) {
    let artistId = ('artistId' in album) ? album['artistId'] : album.artist.id;
    this.artistService.findById(artistId).subscribe((response: any) => {
      if('status' in response) {
        console.error(response);
      }
      else {
        album.artist = response;
        this.album = album;
      }
    });
  }

  getAlbumTileBackground(album: Album) {
    return this.albumService.getAlbumTileBackground(album);
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
        this.albumService.update(albumToUpdate).subscribe((updatedAlbum: any) => {
          this.getFullAlbumInfo(updatedAlbum);
        })
      }
    })
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
          this.dialogRef.close(true);
        })
      }
    })
  }

}
