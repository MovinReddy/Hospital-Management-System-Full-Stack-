import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAuthComponent } from './staff-auth.component';

describe('StaffAuthComponent', () => {
  let component: StaffAuthComponent;
  let fixture: ComponentFixture<StaffAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
