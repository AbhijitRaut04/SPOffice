import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminHomeComponent } from './subadmin-home.component';

describe('SubadminHomeComponent', () => {
  let component: SubadminHomeComponent;
  let fixture: ComponentFixture<SubadminHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubadminHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
