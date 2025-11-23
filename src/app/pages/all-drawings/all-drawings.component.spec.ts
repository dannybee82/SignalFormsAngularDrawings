import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDrawingsComponent } from './all-drawings.component';

describe('AllDrawingsComponent', () => {
  let component: AllDrawingsComponent;
  let fixture: ComponentFixture<AllDrawingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDrawingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDrawingsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
