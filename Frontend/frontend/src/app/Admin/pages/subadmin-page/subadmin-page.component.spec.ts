import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminPageComponent } from './subadmin-page.component';

describe('SubadminPageComponent', () => {
  let component: SubadminPageComponent;
  let fixture: ComponentFixture<SubadminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubadminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubadminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
