import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {  User, UserService } from '../user.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { HeaderComponent } from "../../header/header.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, CommonModule, RouterLink, RouterModule, UserDetailComponent, RouterOutlet, HeaderComponent,MatProgressBarModule,MatProgressSpinnerModule,MatIconModule],
  animations: [
trigger('cardAppear', [
  state('void', style({
    transform: 'translateY(20px)',
    opacity: 0
  })),
  transition(':enter', [
    animate('1s ease-in-out', style({
      transform: 'translateY(0)',
      opacity: 1
    }))
  ])
]),

trigger('arrowHover', [
  state('inactive', style({
    transform: 'translateX(0)'
  })),
  state('active', style({
    transform: 'translateX(2px)'
  })),
  transition('inactive => active', animate('1ms ease-in-out')),
  transition('active => inactive', animate('1ms ease-in-out'))
])

  ],
  providers: [UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  state = 'inactive';

  onCardHover(event: MouseEvent, cardState: 'active' | 'inactive') {
    this.state = cardState;
  }

  users: User[] = [];
  currentPage :number=1 ;
  totalPages : number;
  length: number
  pageSize:number
  searchQuery: number;
  filteredUsers: User[] = [];

  isLoading = false;

  constructor(private userService: UserService, private router: Router,) {}

  ngOnInit() {
    this.fetchUsers();
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.fetchUsers();
  }
  fetchUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.currentPage).subscribe((data) => {
      this.users = data.data;
      this.totalPages = data.total_pages;
      this.isLoading = false;

    });
  }



  onSearch(event: any) {
    this.searchQuery = event;
    this.filteredUsers = [];
    let pageFforSearch = 1;
    while(this.filteredUsers.length == 0 && this.totalPages >= pageFforSearch){
      this.userService.getUsers(pageFforSearch).subscribe((data) => {
        this.filteredUsers = data.data.filter(user => user.id === this.searchQuery);
          })
          pageFforSearch++;

    }
  }

}
