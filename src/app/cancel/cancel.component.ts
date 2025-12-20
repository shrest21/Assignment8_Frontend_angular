import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CancelService} from '../_services/cancel.service';

@Component({
  selector: 'cancel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel.component.html'
})
export class CancelComponent {
    pnr:string='';
    constructor(private cancelService:CancelService){
        console.log(this.pnr);
    }
    cancel(): void {
        this.cancelService.cancelPNR(this.pnr).subscribe({
            next: (response) => {console.log('Cancelled booking:', response);},
            error: (error) => {console.error(error);}
        })
    }
    
}