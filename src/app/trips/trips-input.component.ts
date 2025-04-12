import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Trip, TripService } from './trip.service';

@Component({
  selector: 'app-trip-input',
  template: `<div>
    <div>
      <label>Start Point:</label>
      <input type="text" [(ngModel)]="start" maxlength="100" />
      <label>End Point:</label>
      <input type="text" [(ngModel)]="end" maxlength="100" />
      <button (click)="addTrip()">Add Trip</button>
    </div>
    <!-- Graph for visualizing trips -->
    <app-trip-visualization></app-trip-visualization>
    <!-- <div *ngFor="let trip of trips; let i =index">
        <li>{{trip.start}}={{trip.end}} <button (click)="removeTrip(i)"> Remove </button>  </li>  
    </div> -->
  </div> `,
})
export class TripInputComponent implements OnInit  {
  start = '';
  end = '';
  trips: Trip[] = [];
  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.trips = this.tripService.trips;
  }

  addTrip(): void {
    if (this.start && this.end) {
      this.tripService.addTrip(
        this.start.substring(0, 3).toUpperCase(),
        this.end.substring(0, 3).toUpperCase()
      );
      this.start = '';
      this.end = '';
    }
  }
  removeTrip(i:number){
  this.trips= this.tripService.removeTrip(i)
  console.log(this.trips);
  
  }
}
