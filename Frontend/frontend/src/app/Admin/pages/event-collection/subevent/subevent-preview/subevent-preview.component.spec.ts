import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubeventPreviewComponent } from './subevent-preview.component';

describe('SubeventPreviewComponent', () => {
  let component: SubeventPreviewComponent;
  let fixture: ComponentFixture<SubeventPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubeventPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubeventPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
