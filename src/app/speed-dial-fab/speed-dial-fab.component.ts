import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AirportsService } from '../airports.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import AirportMapping from '../../assets/AirportMapping.json';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material';
import { ElementRef, ViewChild} from '@angular/core';

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
  constructor( public dialogRef: MatDialogRef<EditAirportsDialogComponent>, public airportService: AirportsService) {
    this.filteredAirports = this.airportCtrl.valueChanges.pipe(
        startWith(null),
        map((airport: string | null) => airport ? this._filter(airport) : Object.keys(AirportMapping).slice()));
  }
  airportCtrl = new FormControl();
  filteredAirports: Observable<string[]>;

  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = true;

  @ViewChild('airportInput') airportInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteAirport(i) {
    this.airportService.airports.splice(i, 1);
  }

  add(event: MatChipInputEvent): void {

    if (!this.matAutocomplete.isOpen) {
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
       this.airportCtrl.setValue(null);
    }
  }

  remove(airport): void {
    const index = this.airportService.airports.indexOf(airport);

    if (index >= 0) {
      this.airportService.airports.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.airportService.airports.push(event.option.viewValue);
    this.airportInput.nativeElement.value = '';
    this.airportCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();

    return Object.keys(AirportMapping).filter(airport => airport.toUpperCase().indexOf(filterValue) === 0);
  }
}
