import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth/auth-data-model';
import { AuthService } from '../auth/auth.service';
import { BOOK } from '../Book-Model';
import { OverallService } from '../overall.service';

@Component({
  selector: 'app-search-tool-bar',
  templateUrl: './search-tool-bar.component.html',
  styleUrls: ['./search-tool-bar.component.css'],
})
export class SearchToolBarComponent implements OnInit {
  book!: BOOK;
  isAuthenticated = false;
  user!: AuthData;
  private authListenerSubs!: Subscription;

  onSearch(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.service.Search(form.value.search).subscribe((repsonseData) => {
      console.log(repsonseData);
      this.book = repsonseData.book;
      console.log(this.book);
      this.router.navigate(['/redirecting']);
      setTimeout(() => {
        this.router.navigate(['/searchresult', { ...this.book }]);
      }, 1000);
    });
  }
  logout() {
    this.authService.logout();
  }
  constructor(
    private service: OverallService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isAuthenticated = this.authService.getisAuth();
      this.user = this.authService.getUser();
      console.log(this.user);
      this.authListenerSubs = this.authService
        .getAuthStatusListener()
        .subscribe((isauthenticated) => {
          this.isAuthenticated = isauthenticated;
        });
    }, 200);
  }

  godashboard() {
    this.router.navigate(['/dashboard']);
  }
  gohome() {
    this.router.navigate(['/mainstore']);
  }
  gotoFav() {
    this.router.navigate(['/fav']);
  }
  profile() {
    this.router.navigate(['/profile']);
  }
}
