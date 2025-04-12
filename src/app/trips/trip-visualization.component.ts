import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Trip, TripService } from './trip.service';

@Component({
  selector: 'app-trip-visualization',
  template:`
<!-- <svg width="1200" height="500">
  <ng-container *ngFor="let trip of trips; let i = index">
   
    <circle [attr.cx]="100 + i * 200" [attr.cy]="trip.y" r="20" fill="lightblue"></circle>
    <text [attr.x]="75 + i * 200" [attr.y]="trip.y-5" font-size="14">{{ trip.start }} - {{ trip.end }}</text>

  
    <line *ngIf="trip.type=='continue'"
          [attr.x1]="100 + i * 200" [attr.y1]="trip.y"
          [attr.x2]="300 + i * 200" [attr.y2]="trip.y"
          stroke="green" stroke-width="3"></line>

    <line *ngIf="trip.type=='arrow'"
          [attr.x1]="100 + i * 200" [attr.y1]="trip.y"
          [attr.x2]="300 + i * 200" [attr.y2]="trip.y"
          stroke="red" stroke-width="3" marker-end="url(#arrowhead)"></line>

    <path *ngIf="trip.type=='level-2'"
          [attr.d]="'M ' + (100 + i * 200) + ',' + 200 + ' C ' + (150 + i * 200) + ',' + 150 + ' ' + (250 + i * 200) + ',' + 150 + ' ' + (300 + i * 200) + ',' + 200"
          fill="transparent" stroke="gray" stroke-width="3"></path>
  </ng-container>

  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="red"/>
    </marker>
  </defs>
</svg> -->
<svg width="1200" height="500">
  <ng-container *ngFor="let trip of trips; let i = index">
    <!-- Node -->
    <circle [attr.cx]="100 + i * 200" [attr.cy]="trip.y" r="5" fill="lightblue"></circle>
    <text [attr.x]="80 + i * 200" [attr.y]="trip.y - 10" font-size="12">{{ trip.start }} - {{ trip.end }}</text>

    <!-- Connection -->
    <path *ngIf="i < trips.length - 1 && trips[i].type === 'connected-to-level-2'"
          [attr.d]="getPolylinePath(i)"
          fill="transparent"
          stroke="orange"
          stroke-width="3"></path>

    <path *ngIf="i < trips.length - 1 && trips[i].type !== 'connected-to-level-2'"
          [attr.d]="getConnectionPath(i)"
          fill="transparent"
          [attr.stroke]="trips[i].type === 'level-2' ? 'gray' : trips[i].type === 'continue' ? 'green' : 'red'"
          stroke-width="3"
          [attr.marker-end]="trips[i].type === 'disconnected' ? 'url(#arrowhead)' : null"></path>
  </ng-container>

  <!-- Arrowhead Marker -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="red" />
    </marker>
  </defs>
</svg>




`
})
export class TripVisualizationComponent implements OnInit {
  trips: Trip[] = [];

  constructor(private tripService: TripService) {}

  
  ngOnInit(): void {
    this.trips = this.tripService.getTrips();
  }

  getConnectionPath(index: number): string {
    const startX = 100 + index * 200;
    const startY = this.trips[index].y;
    const endX = 300 + index * 200;
    const endY = this.trips[index + 1]?.y || startY;
  
    if (this.trips[index].type === 'level-2') {
      return `M ${startX},${startY} L ${endX},${endY}`; // Gray straight line
    }
  
    if (this.trips[index].type === 'continue-level-2') {
      const controlX1 = startX + 50;
      const controlY1 = startY + 50; // Curve down
      const controlX2 = endX - 50;
      const controlY2 = endY - 50; // Curve up
      return `M ${startX},${startY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
    }
  
    return `M ${startX},${startY} L ${endX},${endY}`; // Default straight or arrowed line
  }
  getPolylinePath(index: number): string {
    const startX = 100 + index * 200;
    const startY = this.trips[index].y;
    const endX = 300 + index * 200;
    const endY = this.trips[index + 1]?.y || startY;
  
    // Use a smoother curve for connections to Level-2 trips
    const controlX1 = startX + 50;
    const controlY1 = startY + 50;
    const controlX2 = endX - 50;
    const controlY2 = endY - 50;
  
    return `M ${startX},${startY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
  }
  
  
}
