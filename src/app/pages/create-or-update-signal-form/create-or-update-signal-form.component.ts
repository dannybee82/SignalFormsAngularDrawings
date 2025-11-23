import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { Drawing } from '../../models/drawing.interface';
import { form, Field, required, min, max, ValidationError } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OpenFileComponent } from '../../components/open-file/open-file.component';
import { LoadFilesInBrowserService } from '../../services/load-files-in-browser.service';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { DrawingsService } from '../../services/drawings.service';
import { Router } from '@angular/router';
import { RatingComponent } from '../../components/rating/rating.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogData } from '../../models/delete-dialog-data.interface';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-create-or-update-signal-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, Field, OpenFileComponent, RatingComponent],
  templateUrl: './create-or-update-signal-form.component.html',
  styleUrl: './create-or-update-signal-form.component.scss',
})
export class CreateOrUpdateSignalFormComponent implements OnInit {
  id: InputSignal<string | undefined> = input.required<string | undefined>();

  private readonly drawing: WritableSignal<Drawing> = signal({
    id: 0,
    image: '',
    title: '',
    description: '',
    draughtsman: 'Lucien Delacroix',
    rating: -1,
  });
  protected readonly drawingForm = form(this.drawing, (form) => {
    required(form.title, { message: 'Title is required' });
    required(form.draughtsman, { message: 'Draughtsman is required' });
    required(form.image, { message: 'An image is required' });
    required(form.rating, { message: 'A rating is required' });
    min(form.rating, 0, { message: "Rating can't be lower than 0" });
    max(form.rating, 5, { message: "Rating can't be higher than 5" });
  });
  
  protected isUpdateMode: WritableSignal<boolean> = signal(false);
  private _updateDrawing: WritableSignal<Drawing | undefined> = signal(undefined);

  private loadFilesInBrowser = inject(LoadFilesInBrowserService);
  private toastr = inject(ToastrService);
  private drawingsService = inject(DrawingsService);
  private router = inject(Router);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    if (this.id() && this.id() !== undefined && this.id() !== 'undefined') {
      this.drawingsService.getById(parseInt(this.id()!)).subscribe({
        next: (data: Drawing | undefined) => {
          if (data) {
            this._updateDrawing.set(data);
          } else {
            this.toastr.error("Can't fetch Drawing");
          }
        },
        error: () => {
          this.toastr.error("Can't fetch Drawing");
        },
        complete: () => {
          if (this._updateDrawing()) {
            this.isUpdateMode.set(true);
            // Below: the equivalent of patchValue() function.
            this.drawingForm().value.set(this._updateDrawing()!);
          }
        },
      });
    }
  }

  submit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.drawingForm().valid()) {
      const data: Drawing = Object.assign(this.drawingForm().value());
      data.id = this.isUpdateMode() ? this._updateDrawing()!.id : 0;

      const action$: Observable<void> = this.isUpdateMode()
        ? this.drawingsService.update(data)
        : this.drawingsService.create(data);

      action$.subscribe({
        next: () => {
          this.toastr.success(
            this.isUpdateMode() ? 'Drawing updated successfully' : 'Drawing created successfully'
          );
        },
        error: () => {
          this.toastr.error(this.isUpdateMode() ? "Can't update Drawing" : 'Can\t create Drawing');
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
    } else {
      this.drawingForm().markAsTouched();

      let allErrorsArr: string[] = this.drawingForm()
        .errorSummary()
        .map((item: ValidationError) => item.message)
        .filter((item) => item !== undefined);
      const allErrors: string = allErrorsArr.length === 0 ? '' : allErrorsArr.join(', ');

      this.toastr.error('Form invalid. ' + allErrors);
    }
  }

  loadFile($event: File): void {
    this.loadFilesInBrowser.readFile($event).then((result: string | null) => {
      if (result) {
        if (
          this.loadFilesInBrowser.isValidDataType(result) &&
          this.loadFilesInBrowser.checkMaximumSize($event.size)
        ) {
          this.drawingForm.image().setControlValue(result);
        } else {
          if (!this.loadFilesInBrowser.isValidDataType(result)) {
            this.toastr.error('File is invalid');
          } else if (this.loadFilesInBrowser.checkMaximumSize($event.size)) {
            this.toastr.error('File exceeds 10 MB');
          }
        }
      } else {
        this.toastr.error('Invalid file');
      }
    });
  }

  removeFile(): void {
    this.drawingForm.image().setControlValue('');
  }

  delete(): void {
    const dialogData: DeleteDialogData = {
      title: 'Delete Drawing',
      message: 'Do you want to the delete the Drawing below?',
      additionalData: `${this._updateDrawing()!.title} - ${this._updateDrawing()!.draughtsman}`,
      confirmDelete: false,
    };

    const dialog = this.dialog.open(DeleteDialogComponent, { data: dialogData });

    const result$: Observable<boolean> = dialog.afterClosed().pipe(
      switchMap((data: DeleteDialogData) => {
        if (data) {
          if (data.confirmDelete) {
            return this.drawingsService.delete(this._updateDrawing()!);
          }
        }

        return EMPTY;
      })
    );

    result$.subscribe({
      next: (isDeleted: boolean) => {
        if (isDeleted) {
          this.toastr.success('Drawing successfully deleted');
          this.router.navigate(['/']);
        } else {
          this.toastr.error("Can't delete Drawing");
        }
      },
      error: () => {
        this.toastr.error("Can't delete Drawing");
      },
    });
  }

}