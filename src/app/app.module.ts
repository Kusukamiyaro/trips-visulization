import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TripInputComponent } from './trips/trips-input.component';
import { TripVisualizationComponent } from './trips/trip-visualization.component';

@NgModule({
  declarations: [
    AppComponent,
    TripInputComponent,
    TripVisualizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
