import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User, UserData, UserService } from '../user.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, CommonModule, MatGridListModule, HeaderComponent],
  providers: [UserService],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})

export class UserDetailComponent implements OnInit {
  user: User;
id:number
isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe
    ( (params:Params) =>
      {this.id = +params['id'];
       this.userService.getUserById(this.id).subscribe((user) => {
        this.user = user.data;
        console.log(user)});
      }
    );
    this.isLoading = false;

  }

  onBack(){
  this.router.navigate(['../'])
  }


}
