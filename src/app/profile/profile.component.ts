import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  days=0;
  showPasswordPopup = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if(this.currentUser==null){
      alert("Please login");
      window.location.href='/login';
    }
    this.checkPassword(this.currentUser.lastPasswordUpdatedAt);
  }
  checkPassword(lastChange: string): void{
    const lastDate = new Date(lastChange);
    const today = new Date();
    const diffTime = today.getTime() - lastDate.getTime();
    this.days=Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if(this.days>10)
    {
      this.showPasswordPopup = true;
    }
  }

  goToChangePassword(): void {
    window.location.href = '/change';
  }

}