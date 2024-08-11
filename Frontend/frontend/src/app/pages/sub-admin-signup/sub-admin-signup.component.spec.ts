import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminSignupComponent } from './sub-admin-signup.component';

describe('SubAdminSignupComponent', () => {
  let component: SubAdminSignupComponent;
  let fixture: ComponentFixture<SubAdminSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAdminSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAdminSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
