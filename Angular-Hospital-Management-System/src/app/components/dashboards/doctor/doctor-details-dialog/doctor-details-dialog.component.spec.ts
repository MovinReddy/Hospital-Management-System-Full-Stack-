import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDetailsDialogComponent } from './doctor-details-dialog.component';

describe('DoctorDetailsDialogComponent', () => {
  let component: DoctorDetailsDialogComponent;
  let fixture: ComponentFixture<DoctorDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
