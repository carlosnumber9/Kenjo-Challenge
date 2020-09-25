import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from 'src/app/model/album.model';
import { Artist } from 'src/app/model/artist.model';
import { ArtistService } from 'src/app/service/artist.service';

@Component({
  selector: 'app-add-album-dialog',
  templateUrl: './add-album-dialog.component.html',
  styleUrls: ['./add-album-dialog.component.css']
})
export class AddAlbumDialogComponent {

  editMode: boolean = false;

  title: string = '';
  year: number = undefined;
  genre: string = 'Rock';
  coverUrl: string = '';
  artistListLoaded: boolean;
  artistList: Artist[];

  albumToCreate: Album = new Album();

  genreOptions: string[] = ['Rock', 'Pop', 'Soul', 'RAP', 'Country'];

  constructor(
    public dialogRef: MatDialogRef<AddAlbumDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private artistService: ArtistService) { 
      if(data) {
        this.editMode = true;
        this.albumToCreate = data.album;
      }
      this.getArtistList();
    }

  closeDialog(confirmCreation: boolean): void {
    this.dialogRef.close((confirmCreation) ? this.albumToCreate : undefined);
  }

  setGenre(event: any): void {
    this.albumToCreate.genre = event.value;
  }

  getArtistList(): void {
    this.artistService.getListObservable().subscribe((response: any) => {
      if('status' in response) {
        this.artistListLoaded = false;      
      }
      else {
        this.artistList = response;
       this.artistListLoaded = (this.artistList.length > 0);
      }
    });
    this.artistService.getAll();
  }

  setArtist(event: any): void {
    this.albumToCreate.artist = event.value;
  }

}
