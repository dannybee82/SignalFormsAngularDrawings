import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DrawingsService } from '../../services/drawings.service';
import { Observable } from 'rxjs';
import { Drawing } from '../../models/drawing.interface';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FullscreenDialogComponent } from '../../components/fullscreen-dialog/fullscreen-dialog.component';
import { FullScreenImage } from '../../models/fullscreen.interface';
import { ShowStarsComponent } from '../../components/show-stars/show-stars.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-all-drawings',
  imports: [MatCardModule, MatButtonModule, MatIconModule, AsyncPipe, RouterModule, ShowStarsComponent, ScrollToTopComponent],
  templateUrl: './all-drawings.component.html',
  styleUrl: './all-drawings.component.scss',
})
export class AllDrawingsComponent implements OnInit {

  allDrawings?: Observable<Drawing[]>;

  private drawingsService = inject(DrawingsService);
  protected readonly dialog = inject(MatDialog);
  
  ngOnInit(): void {
    this.allDrawings = this.drawingsService.getAll();
  }

  imageFullScreen(image: string, title: string): void {
    const data: FullScreenImage = {
      image: image,
      title: title
    };

    this.dialog.open(FullscreenDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: data
    })
  }

}