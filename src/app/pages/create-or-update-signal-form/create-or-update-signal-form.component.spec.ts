import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateSignalFormComponent } from './create-or-update-signal-form.component';

describe('CreateOrUpdateSignalFormComponent', () => {
  let component: CreateOrUpdateSignalFormComponent;
  let fixture: ComponentFixture<CreateOrUpdateSignalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrUpdateSignalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrUpdateSignalFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
