import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/services/user-store.service';
 
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
 
  userRole: string;
 
  constructor(private storeService: UserStoreService) { }
 
  ngOnInit(): void {
    this.loadUserRole();
  }
 
  loadUserRole(): void {
    const role = this.storeService.getRole();
    this.userRole = role;
    console.log("THE ROLE IS - ------------------------- :"+ role);
  }
 
}