import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../_services/flight.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flights: any[] = [];
  filteredFlights: any[] = [];
  
  searchFrom: string = '';
  searchTo: string = '';
  selectedDate: string = '';

  constructor(private flightService: FlightService, private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getAllFlights().subscribe(data => {
      console.log('FLIGHTS RESPONSE:', data);
      this.flights = data;
      this.filteredFlights = data;
    });
  }

  searchFlights(): void {
    this.filteredFlights = this.flights.filter(flight => {
      const matchesFrom = !this.searchFrom || 
        flight.fromPlace.toLowerCase().includes(this.searchFrom.toLowerCase());
      const matchesTo = !this.searchTo || 
        flight.toPlace.toLowerCase().includes(this.searchTo.toLowerCase());
      const matchesDate = !this.selectedDate || 
        flight.flightDate === this.selectedDate;
      
      return matchesFrom && matchesTo && matchesDate;
    });
  }

  getAirlineClass(airline: string): string {
    const classes: { [key: string]: string } = {
      'SpiceJet': 'airline-spicejet',
      'IndiGo': 'airline-indigo',
      'Air India': 'airline-airindia',
      'Vistara': 'airline-vistara',
      'GoAir': 'airline-goair'
    };
    return classes[airline] || 'airline-default';
  }

  getAirlineColor(airline: string): string {
    const colors: { [key: string]: string } = {
      'SpiceJet': 'from-red-500 to-orange-500',
      'IndiGo': 'from-blue-500 to-indigo-600',
      'Air India': 'from-red-600 to-pink-600',
      'Vistara': 'from-purple-500 to-indigo-500',
      'GoAir': 'from-green-500 to-teal-500'
    };
    return colors[airline] || 'from-gray-500 to-gray-600';
  }

  calculateDuration(departure: string, arrival: string): string {
    const [depHour, depMin] = departure.split(':').map(Number);
    const [arrHour, arrMin] = arrival.split(':').map(Number);
    const totalMin = (arrHour * 60 + arrMin) - (depHour * 60 + depMin);
    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;
    return `${hours}h ${minutes}m`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  bookFlight(flight: any): void {
    console.log('Booking flight:', flight);
    const user=this.storageService.getUser();
    if(!user)
    {
      alert("Please login to continue booking");
      return;
    }
    const bookingpayload={
      flightId:flight.id,
      userId:user.id,
      bookingDate: new Date().toISOString(),
    };
    this.router.navigate(['/booking'],{state:{bookingpayload}});
  }
}