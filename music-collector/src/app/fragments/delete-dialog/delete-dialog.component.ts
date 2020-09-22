import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/album.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  ELEMENT_TYPES = {
    ARTIST: 'ARTIST',
    ALBUM: 'ALBUM'
  }
  elementName: string;
  elementType: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.elementName = data.name;
    this.elementType = data.elementType;
  }

  closeDialog(confirmDeletion: boolean): void {
    this.dialogRef.close(confirmDeletion);
  }

}
