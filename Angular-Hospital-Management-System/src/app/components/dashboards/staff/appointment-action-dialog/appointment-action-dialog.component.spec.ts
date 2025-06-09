import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentActionDialogComponent } from './appointment-action-dialog.component';

describe('AppointmentActionDialogComponent', () => {
  let component: AppointmentActionDialogComponent;
  let fixture: ComponentFixture<AppointmentActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentActionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
