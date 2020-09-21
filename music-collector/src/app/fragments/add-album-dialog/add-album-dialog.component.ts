import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Album } from 'src/app/model/album.model';

@Component({
  selector: 'app-add-album-dialog',
  templateUrl: './add-album-dialog.component.html',
  styleUrls: ['./add-album-dialog.component.css']
})
export class AddAlbumDialogComponent implements OnInit {

  title: string = '';
  year: number = undefined;
  genre: string = 'Rock';
  coverUrl: string = '';

  albumToCreate: Album = new Album();

  genreOptions: string[] = ['Rock', 'Pop', 'Soul', 'RAP', 'Country'];

  constructor(public dialogRef: MatDialogRef<AddAlbumDialogComponent>) { }

  ngOnInit(): void {
  }

  private parseAlbumFromForm(): Album {
    return undefined;
  }

  closeDialog(confirmCreation: boolean): void {
    this.dialogRef.close((confirmCreation) ? this.albumToCreate : undefined);
  }

  setGenre(event: EventEmitter<MatSelectChange>) {
    this.albumToCreate.genre = event.value;
  }

}
