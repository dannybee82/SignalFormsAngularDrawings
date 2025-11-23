import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { defaultRating, fixedRating } from '../../shared/shared.maps';

@Component({
  selector: 'app-show-stars',
  imports: [],
  templateUrl: './show-stars.component.html',
  styleUrl: './show-stars.component.scss',
})
export class ShowStarsComponent {

  readonly rating: InputSignal<number> = input.required<number>();
  
  private _fixedRatings: Map<number, number[]> = fixedRating;

  showRating: Signal<number[]> = computed(() => {
    const index: number = this.rating() * 2;
    return this._fixedRatings.get(index) ?? defaultRating;
  });

}
