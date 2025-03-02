import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})

export class AdminnavComponent implements OnInit {

  showLogoutModalFlag: boolean = false;

  constructor(private router: Router, private userStoreService:UserStoreService) { }

  ngOnInit(): void {
  }

  showLogoutModal(): void {
    this.showLogoutModalFlag = true;
  }

  logout(): void {
    this.userStoreService.clear();
    this.router.navigate(['/home']);
    this.showLogoutModalFlag = false;
  }

  cancelLogout(): void {
    this.showLogoutModalFlag = false;
  }

}
