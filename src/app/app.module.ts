import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetarComponent } from './metar/metar.component';
import { HttpClientModule } from '@angular/common/http';
import { TafComponent } from './taf/taf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule, MatChipsModule, MatDialogModule, MatCheckboxModule, MatGridListModule, MatCardModule, 
  MatMenuModule, MatIconModule, MatAutocompleteModule,MatSlideToggleModule, MatButtonModule, MatInputModule , MatListModule,MatSnackBarModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SpeedDialFabComponent, EditAirportsDialogComponent} from './speed-dial-fab/speed-dial-fab.component';
import { SigmetComponent } from './sigmet/sigmet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { WindComponent } from './wind/wind.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotamComponent } from './notam/notam.component';
import { CivilTwilightComponent } from './civil-twilight/civil-twilight.component';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 
@NgModule({
  declarations: [
    AppComponent,
    MetarComponent,
    TafComponent,
    DashboardComponent,
    SpeedDialFabComponent,
    EditAirportsDialogComponent,
    SigmetComponent,
    WindComponent,
    NotamComponent,
    CivilTwilightComponent,
    SafePipe
  ],
  entryComponents: [EditAirportsDialogComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule ,
    FormsModule ,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(),
    MatToolbarModule,MatAutocompleteModule,ReactiveFormsModule , MatDialogModule, MatChipsModule, MatCheckboxModule, MatGridListModule, MatCardModule,
    MatMenuModule, MatSlideToggleModule, MatIconModule, MatButtonModule, LayoutModule, MatInputModule, MatListModule,MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
