import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubeventFormComponent } from './create-subevent-form.component';

describe('CreateEventFormComponent', () => {
  let component: CreateSubeventFormComponent;
  let fixture: ComponentFixture<CreateSubeventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubeventFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubeventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
