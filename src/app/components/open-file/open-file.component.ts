import { Component, InputSignal, input, OutputEmitterRef, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.scss'],
  imports: [MatButtonModule, MatIconModule, MatTooltipModule]
})
export class OpenFileComponent {

  readonly buttonText: InputSignal<string> = input<string>('');
  readonly fileExtensions: InputSignal<string> = input<string>('*');
  readonly allowMultipleSelection: InputSignal<boolean> = input<boolean>(false);
  readonly isDisabled: InputSignal<boolean> = input<boolean>(false);
  readonly matIcon: InputSignal<string> = input<string>('');

  readonly selectedFile: OutputEmitterRef<File> = output<File>()
  readonly selectedFiles: OutputEmitterRef<File[]> = output<File[]>()

  onFileSelected(event: Event) {
    if (event) {
      const element = event.target as HTMLInputElement;

      if(!this.allowMultipleSelection()) {
        if(element.files) {
          this.selectedFile.emit(element.files[0]);
        }       
      } else {
        if(element.files) {
          const arr: File[] = [];

          for(let i = 0; element.files.length; i++) {
            arr.push(element.files[i]);
          }

          this.selectedFiles.emit(arr);
        }        
      }        
    }
  }

}