import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAreaFormComponent } from './create-area-form.component';

describe('CreateAreaFormComponent', () => {
  let component: CreateAreaFormComponent;
  let fixture: ComponentFixture<CreateAreaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAreaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
