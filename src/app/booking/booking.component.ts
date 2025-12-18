import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html'
})
export class BookingComponent {

  name: string = '';
  age!: number;
  gender: string = '';

  book(): void {
    console.log(this.name, this.age, this.gender);
  }
}
