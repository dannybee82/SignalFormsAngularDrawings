import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FullScreenImage } from '../../models/fullscreen.interface';

@Component({
  selector: 'app-fullscreen-dialog',
  imports: [],
  templateUrl: './fullscreen-dialog.component.html',
  styleUrl: './fullscreen-dialog.component.scss',
})
export class FullscreenDialogComponent {

  public dialogRef = inject(MatDialogRef<FullscreenDialogComponent>);
  public data: FullScreenImage = inject(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }

}