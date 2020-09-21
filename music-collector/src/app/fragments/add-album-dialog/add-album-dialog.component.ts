import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Album } from 'src/app/model/album.model';

@Component({
  selector: 'app-add-album-dialog',
  templateUrl: './add-album-dialog.component.html',
  styleUrls: ['./add-album-dialog.component.css']
})
export class AddAlbumDialogComponent implements OnInit {

  editMode: boolean = false;

  title: string = '';
  year: number = undefined;
  genre: string = 'Rock';
  coverUrl: string = '';

  albumToCreate: Album = new Album();

  genreOptions: string[] = ['Rock', 'Pop', 'Soul', 'RAP', 'Country'];

  constructor(
    public dialogRef: MatDialogRef<AddAlbumDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      if(data) {
        this.editMode = true;
        this.albumToCreate = data.album;
      }
    }

  ngOnInit(): void {
  }

  private parseAlbumFromForm(): Album {
    return undefined;
  }

  closeDialog(confirmCreation: boolean): void {
    this.dialogRef.close((confirmCreation) ? this.albumToCreate : undefined);
  }

  setGenre(event) {
    this.albumToCreate.genre = event.value;
  }

}
