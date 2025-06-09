import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionDetailDialogComponent } from './prescription-detail-dialog.component';

describe('PrescriptionDetailDialogComponent', () => {
  let component: PrescriptionDetailDialogComponent;
  let fixture: ComponentFixture<PrescriptionDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrescriptionDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
