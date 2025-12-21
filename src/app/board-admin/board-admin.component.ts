import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { HttpClient } from '@angular/common/http';
import  {AddFlightService} from '../_services/addflight.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html'
})
export class BoardAdminComponent implements OnInit {

  flight = {
    airline: '',
    fromPlace: '',
    toPlace: '',
    flightName: '',
    departureTime: '',
    arrivalTime: '',
    flightDate: '',
    totalSeats: 0,
    price: 0
  };

  constructor( private storageService: StorageService, private router: Router, private addFlightService: AddFlightService) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();
    if (!user) {
      alert('Please login as admin');
      this.router.navigate(['/login']);
      return;
    }
    if (!user.roles || !user.roles.includes('ROLE_ADMIN')) {
      alert('Login as admin to access this page');
      this.router.navigate(['/login']);
      return;
    }

    console.log('Admin access granted');
  }
  addFlight(): void {
    console.log('Add Flight Payload:', this.flight);

    this.addFlightService.addFlight(this.flight).subscribe({
      next: (response) => {
        alert('Flight added successfully');
        console.log(response);
        this.resetForm();
      },
      error: (error) => {
        console.error(error);
        console.log('Failed to add flight');
      }
    });
  }
  private resetForm(): void {
    this.flight = {
      airline: '',
      fromPlace: '',
      toPlace: '',
      flightName: '',
      departureTime: '',
      arrivalTime: '',
      flightDate: '',
      totalSeats: 0,
      price: 0
    };
  }
}
