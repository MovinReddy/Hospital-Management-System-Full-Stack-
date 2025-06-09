import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileDialogComponent } from './staff-profile-dialog.component';

describe('StaffProfileDialogComponent', () => {
  let component: StaffProfileDialogComponent;
  let fixture: ComponentFixture<StaffProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProfileDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
