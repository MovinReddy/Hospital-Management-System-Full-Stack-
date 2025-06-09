import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffProfileEditDialogComponent } from './staff-profile-edit-dialog.component';

describe('StaffProfileEditDialogComponent', () => {
  let component: StaffProfileEditDialogComponent;
  let fixture: ComponentFixture<StaffProfileEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffProfileEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffProfileEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
