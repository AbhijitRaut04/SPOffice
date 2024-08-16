import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubeventComponent } from './create-subevent.component';

describe('CreateSubeventComponent', () => {
  let component: CreateSubeventComponent;
  let fixture: ComponentFixture<CreateSubeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubeventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
