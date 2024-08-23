import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { CacheService } from './cache.service';


export interface UserData {
  data: User;
}
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
 export interface ApiResponse {
   page: number;
   per_page: number;
   total: number;
   total_pages: number;
   data: User[];
   support: {
     url: string;
     text: string;
   };
 }
 interface Support {
  url: string;
  text: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService{
  private apiUrl = 'https://reqres.in/api/users';


  constructor(private http: HttpClient, private cacheService: CacheService) {
  }

  getUsers(page: number): Observable<ApiResponse> {
    const cacheKey = `users-${page}`; 

    if (this.cacheService.get(cacheKey)) {
      return new Observable(observer => {
        observer.next(this.cacheService.get(cacheKey));
        observer.complete();
      });
    } else {
      return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`).pipe(
        map(data => {
          this.cacheService.set(cacheKey, data);
          return data;
        })
      );
    }
  }


  getUserById(id): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/${id}`);
  }
}
