import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubadminComponent } from './app-subadmin.component';

describe('AppSubadminComponent', () => {
  let component: AppSubadminComponent;
  let fixture: ComponentFixture<AppSubadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSubadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
