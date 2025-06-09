import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateDialogComponent } from './doctor-update-dialog.component';

describe('DoctorUpdateDialogComponent', () => {
  let component: DoctorUpdateDialogComponent;
  let fixture: ComponentFixture<DoctorUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
