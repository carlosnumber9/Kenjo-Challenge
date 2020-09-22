import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Artist } from 'src/app/model/artist.model';
import { ArtistService } from 'src/app/service/artist.service';
import { AddArtistDialogComponent } from '../add-artist-dialog/add-artist-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  artistList: Artist[] = [];
  loaded: boolean = false;

  constructor(
    private artistService: ArtistService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.artistService.getListObservable().subscribe((newArtistList: Artist[]) => {
      this.artistList = newArtistList;
      this.loaded = true;
    });
    this.getArtistList();
  }

  getArtistList(): void  {
    this.loaded = false;
    this.artistList = [];
    this.artistService.getAll();
  }

  openDeleteArtistDialog(artist: Artist): void {
    let dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        data: {
          elementType: 'ARTIST',
          name: artist.name
        }
      });

    dialogRef.afterClosed().subscribe((deletionConfirmed) => {
      if (deletionConfirmed) {
        this.artistService.delete(artist.id).subscribe(() => {
          this.getArtistList();
        })
      }
    })
  }

  openEditArtistDialog(artist: Artist): void {
    let dialogRef = this.dialog.open(
      AddArtistDialogComponent,
      {
        data: {
          artist: artist
        }
      });

    dialogRef.afterClosed().subscribe((artistToUpdate) => {
      if (artistToUpdate) {
        this.artistService.update(artist).subscribe(() => {
          this.getArtistList();
        })
      }
    })
  }

  openAddArtistDialog():void {
    let dialogRef = this.dialog.open(AddArtistDialogComponent);

    dialogRef.afterClosed().subscribe((artistToCreate) => {
      if(artistToCreate) {
        this.artistService.create(artistToCreate).subscribe(() => {
          this.getArtistList();
        })
      }
    })
  }

}
