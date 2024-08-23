
import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class CacheService {
private cache: Map<string, { expiry: number; value: any }> = new Map();

get(key: string): any {
const cachedData = this.cache.get(key);
console.log(cachedData)
if (cachedData && cachedData.expiry > new Date().getTime()) {


  return cachedData.value;
} else {
  this.cache.delete(key);
}
}

set(key: string, value: any,ttl: number = 3000000000): void {
const expiry = new Date().getTime() + ttl;
console.log(this.cache.set(key, {expiry,value}))
this.cache.set(key, {expiry,value});
}

remove(key: string): void {
this.cache.delete(key);
}

clear(): void {
this.cache.clear();
}
// private cache = new Map<string, any[]>();
// public cache$ = new BehaviorSubject<any[]>(null);

// set(key: string, data: any[]): void {
//   if (this.cache.has(key)) {
//     throw new Error(`Data already exists for key '${key}'. Use a different key or delete the existing one first.`);
//   }
//   this.cache.set(key, data);
//   this.cache$.next(this.cache.get(key));
// }

// get(key: string): ApiResponse[] {
//   const data = this.cache.get(key);
//   this.cache$.next(data);
//   return data;
// }

// clear(key: string): void {
//   this.cache.delete(key);
//   this.cache$.next(null);
// }
}

