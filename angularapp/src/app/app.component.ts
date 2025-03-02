import { Component, OnInit } from '@angular/core';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularapp';
  userRole: string;
  isLoggedIn: boolean = false;

  constructor(private storeService: UserStoreService) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.storeService.userRole$.subscribe(role => {
      this.userRole = role;
      this.isLoggedIn = !!role;
    });
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.storeService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userRole = this.storeService.getRole();
      console.log("Current Role: " + this.userRole);
    }else{
      this.userRole = 'NO ROLE';
      console.log("Current Role: " + this.userRole);
    }
  }
}
