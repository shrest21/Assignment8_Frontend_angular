import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html'
})
export class BoardAdminComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.storageService.getUser();

    // Not logged in
    if (!user) {
      alert('Please login as admin');
      this.router.navigate(['/login']);
      return;
    }

    // Logged in but not admin
    if (!user.roles || !user.roles.includes('ROLE_ADMIN')) {
      alert('Login as admin to access this page');
      this.router.navigate(['/login']);
      return;
    }

    // ✅ Admin → allow page
    console.log('Admin access granted');
  }
}
