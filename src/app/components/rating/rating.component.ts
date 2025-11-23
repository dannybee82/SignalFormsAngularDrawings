import { AfterViewInit, Component, computed, ElementRef, model, ModelSignal, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { fromEvent, throttleTime } from 'rxjs';
import { defaultRating, fixedRating } from '../../shared/shared.maps';

const HALF_STAR_WIDTH: number = 30;

@Component({
  selector: 'app-rating',
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements FormValueControl<number | null>, AfterViewInit {

  readonly value: ModelSignal<number | null> = model<number | null>(null);

  private _valueFromMouseEvent: WritableSignal<number> = signal(0);  
  private _fixedRatings: Map<number, number[]> = fixedRating;

  readonly getRating: Signal<number[]> = computed(() => {
    // Calculate value, e.g.: ((204 - 24) / 30) = 6. //So a value of 6 is 3 full stars. See this._fixedRatings.
    const currentValueXAxis: number = Math.floor((this._valueFromMouseEvent() - HALF_STAR_WIDTH) / HALF_STAR_WIDTH);
    // Get value from Map<number, number[]> or use default number[]: [0, 0, 0, 0, 0].
    return this._fixedRatings.get(currentValueXAxis) ?? defaultRating;
  });

  ratingDiv: Signal<ElementRef<HTMLDivElement>> = viewChild.required('ratingDiv');

  ngAfterViewInit(): void {
    // Set initial value.
    console.log('this.value()', this.value());

    if(this.value()) {
      // Calculate rating to xCoordinate, e.g. ((4 * 2) * 30) + 30 = 270 //270 is the xCoordinate
      const initialValue: number = ((this.value()! * 2) * HALF_STAR_WIDTH) + HALF_STAR_WIDTH;
      this._valueFromMouseEvent.set(initialValue);
    } 

    // Get Event/MouseEvent 'mousemove', throttle 250ms.
    fromEvent(this.ratingDiv().nativeElement, 'mousemove')
      .pipe(throttleTime(250))
      .subscribe((event: Event) => {
        if (event instanceof MouseEvent) {
          this._valueFromMouseEvent.set((event as MouseEvent).layerX);
        }
      });
  }

  setCurrentRating(): void {
    const currentValueXAxis: number = Math.floor((this._valueFromMouseEvent() - HALF_STAR_WIDTH) / HALF_STAR_WIDTH);
    this.value.set(currentValueXAxis * 0.5);
  }

}