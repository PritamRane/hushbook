import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BOOK } from '../Book-Model';
import { OverallService } from '../overall.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  books!: BOOK[];
  price: number = 0;
  constructor(
    private service: OverallService,
    private authService: AuthService,
    private router: Router
  ) {
    setTimeout(() => {
      this.books = this.authService.getUser().books;
      console.log('I am the third log after 2 seconds');
      console.log(this.books);
      for (var i = 0; i < this.books.length; i++) {
        this.price += this.books[i].Price * this.books[i].Stock;
      }
    }, 500);
  }
  checkout() {
    console.log(this.price);
    this.authService.checkout(this.price);
  }
  ngOnInit(): void {}
}
