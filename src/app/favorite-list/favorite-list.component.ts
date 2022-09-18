import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BOOK } from '../Book-Model';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit {
  favBooks!: BOOK[];
  constructor(private authService: AuthService) {
    setTimeout(() => {
      this.favBooks = this.authService.getUser().favorites_list;
      console.log('I am the third log after 2 seconds');
      console.log(this.favBooks);
    }, 500);
  }

  ngOnInit(): void {}
}
