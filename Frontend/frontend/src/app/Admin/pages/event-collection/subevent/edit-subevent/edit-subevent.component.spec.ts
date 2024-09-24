import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubeventComponent } from './edit-subevent.component';

describe('EditSubeventComponent', () => {
  let component: EditSubeventComponent;
  let fixture: ComponentFixture<EditSubeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSubeventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSubeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
