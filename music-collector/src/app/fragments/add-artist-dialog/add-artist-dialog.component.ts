import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artist } from 'src/app/model/artist.model';

@Component({
  selector: 'app-add-artist-dialog',
  templateUrl: './add-artist-dialog.component.html',
  styleUrls: ['./add-artist-dialog.component.css']
})
export class AddArtistDialogComponent {

  editMode: boolean = false;

  title: string = '';
  year: number = undefined;
  genre: string = 'Rock';
  coverUrl: string = '';

  artistToCreate: Artist = new Artist();

  genreOptions: string[] = ['Rock', 'Pop', 'Soul', 'RAP', 'Country'];

  constructor(
    public dialogRef: MatDialogRef<AddArtistDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if(data) {
        this.editMode = true;
        this.artistToCreate = data.artist;
      }
    }

  closeDialog(confirmCreation: boolean): void {
    this.dialogRef.close((confirmCreation) ? this.artistToCreate : undefined);
  }

}
