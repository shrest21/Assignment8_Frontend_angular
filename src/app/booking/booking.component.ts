import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../_services/booking.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html'
})
export class BookingComponent {

  constructor(private bookingService: BookingService, private storageService: StorageService) {}
  name: string = '';
  age!: number;
  gender: string = '';
  bookingpayload: any;

  ngOnInit(): void {
    this.bookingpayload = history.state.bookingpayload;
  }

  book(): void {

  const user = this.storageService.getUser();
  console.log(user);
  const payload = {
    flightId: this.bookingpayload.flightId,
    email: user.email,
    name: user.username,
    mealType: 'VEG',
    seats: 1,
    passengers: [
      {
        name: this.name,
        age: this.age,
        gender: this.gender
      }
    ]
  };
  console.log(payload);
  this.bookingService.createBooking(payload).subscribe({
    next: (response) => {alert(`Booking successful! PNR: ${response.pnr}`);},
    error: (err) => {console.error(err);    }
  });
}

}