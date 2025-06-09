import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatGridListModule,
    MatGridTile,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogTitle,
  ],
  exports: [
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatDialogTitle,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDialogContent,
    MatGridListModule,
    MatGridTile,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogTitle,
  ]
})
export class MaterialModule { }
