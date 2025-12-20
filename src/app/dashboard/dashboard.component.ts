import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector:'dashboard',
    standalone:true,
    imports:[CommonModule,FormsModule],
    templateUrl:'./dashboard.component.html'
})
export class DashboardComponent{
    
}