import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule,MatFormFieldModule,MatInputModule,FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery: number;
  @Output() search = new EventEmitter<number>();
  @Input() showSearch: boolean = true;

  constructor( private router: Router) {}

  ngOnInit() {}

  onSearch(event: any) {
    this.searchQuery = parseInt(event.target.value);
    this.search.emit(this.searchQuery);
  }
  goToUserList(){
    this.router.navigate(['../'])
  }
}
