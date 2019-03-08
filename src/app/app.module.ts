import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetarComponent } from './metar/metar.component';
import { HttpClientModule } from '@angular/common/http';
import { TafComponent } from './taf/taf.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule, MatChipsModule, MatDialogModule, MatCheckboxModule, MatGridListModule, MatCardModule, 
  MatMenuModule, MatIconModule, MatSlideToggleModule, MatButtonModule, MatInputModule , MatListModule,MatSnackBarModule} from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SpeedDialFabComponent, EditAirportsDialogComponent} from './speed-dial-fab/speed-dial-fab.component';
import { SigmetComponent } from './sigmet/sigmet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {FormsModule} from '@angular/forms';
import { WindComponent } from './wind/wind.component';

@NgModule({
  declarations: [
    AppComponent,
    MetarComponent,
    TafComponent,
    DashboardComponent,
    SpeedDialFabComponent,
    EditAirportsDialogComponent,
    SigmetComponent,
    WindComponent
  ],
  entryComponents: [EditAirportsDialogComponent],
  imports: [
    BrowserModule,
    FormsModule ,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LeafletModule.forRoot(),
    MatToolbarModule, MatDialogModule, MatChipsModule, MatCheckboxModule, MatGridListModule, MatCardModule,
    MatMenuModule, MatSlideToggleModule, MatIconModule, MatButtonModule, LayoutModule, MatInputModule, MatListModule,MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
