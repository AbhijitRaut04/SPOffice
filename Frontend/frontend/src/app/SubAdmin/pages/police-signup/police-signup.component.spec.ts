import { ComponentFixture, TestBed } from '@angular/core/testing';

import {PoliceSignupComponent } from './police-signup.component';

describe('PoliceSignupComponent', () => {
  let component: PoliceSignupComponent;
  let fixture: ComponentFixture<PoliceSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliceSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliceSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
