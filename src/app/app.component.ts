import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserService } from './users/user.service';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { CacheService } from './users/cache.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HeaderComponent,UserListComponent,CommonModule,UserDetailComponent],
  providers: [Router,CacheService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'maids-project1';
  
}
