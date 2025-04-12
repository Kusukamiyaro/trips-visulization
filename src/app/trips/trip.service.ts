import { Injectable } from '@angular/core';

export interface Trip {
  start: string;
  end: string;
  y: number; // Y-coordinate for dynamic positioning
  type: string; // Connection type: continue, level-2, or disconnected
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips: Trip[] = [];

  addTrip(start: string, end: string): void {
    this.trips.push({ start, end, y: 200, type: '' });
    if (this.trips.length > 1) {
      this.updateTripProperties(this.trips.length - 1);
    }
  }

  getTrips(): Trip[] {
    return this.trips;
  }

  private updateTripProperties(index: number): void {
    const prevTrip = this.trips[index - 1];
    const currentTrip = this.trips[index];
    const level_connection = this.trips[index-2]
    if (prevTrip.end === currentTrip.start) {
   
      prevTrip.type = (level_connection &&  level_connection.type === 'level-2') ? 'connected-to-level-2' : 'continue';
   
   
    } else {
      prevTrip.type = 'disconnected';
    }
  
    if (prevTrip.start === currentTrip.start && prevTrip.end === currentTrip.end) {
        if(prevTrip.y ==200){
            prevTrip.y -= 50;
        }
      
      currentTrip.y = prevTrip.y;
      prevTrip.type = 'level-2';
     
      if(level_connection.type!=='connected-to-level-2' ){
        level_connection.type = 'connected-to-level-2'
      }
    }
   console.log( this.trips)
  }
  
  
  removeTrip(index:number){
    console.log('in',index);
    this.trips= this.trips.filter((t,i)=>i!==index);
    return this.trips;
  }
}
