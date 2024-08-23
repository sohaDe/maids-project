import { Route, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

export const routes: Routes = [
  {path:'', component: UserListComponent, data: { title: 'User List' }},
  { path: 'user-detail/:id', component: UserDetailComponent ,  data: { title: 'User Detail' }}

];
