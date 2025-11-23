import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStarsComponent } from './show-stars.component';

describe('ShowStarsComponent', () => {
  let component: ShowStarsComponent;
  let fixture: ComponentFixture<ShowStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowStarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowStarsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
