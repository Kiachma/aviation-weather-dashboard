import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AirportsService } from '../airports.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';


@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss']
})
export class SpeedDialFabComponent {


  constructor(public dialog: MatDialog) {
   }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditAirportsDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}


@Component({
  selector: 'app-edit-airports-dialog',
  templateUrl: 'edit-airports-dialog.html',
})
export class EditAirportsDialogComponent {
  constructor( public dialogRef: MatDialogRef<EditAirportsDialogComponent>, public airportService: AirportsService) {}

  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteAirport(i) {
    this.airportService.airports.splice(i, 1);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
    if ((value || '').trim()) {
       this.airportService.airports.push(value.trim().toUpperCase());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(i): void {
    this.airportService.airports.splice(i, 1);
  }
}
