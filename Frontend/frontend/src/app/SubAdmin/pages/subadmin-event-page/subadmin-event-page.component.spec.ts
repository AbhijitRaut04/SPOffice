import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminEventPageComponent } from './subadmin-event-page.component';

describe('SubadminEventPageComponent', () => {
  let component: SubadminEventPageComponent;
  let fixture: ComponentFixture<SubadminEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubadminEventPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
