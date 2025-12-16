import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../_services/flight.service';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights: any[] = [];

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
  this.flightService.getAllFlights().subscribe(data => {
    console.log('FLIGHTS RESPONSE:', data);
    this.flights = data;
  });
}

}
