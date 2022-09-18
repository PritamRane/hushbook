import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OverallService } from '../overall.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  DarkState = false;
  Login = false;
  KeepLogin = false;
  on = false;
  isAuthenticated = false;
  wronginput = false;
  private authListenerSubs!: Subscription;
  private loginListener!: Subscription;
  ToggleDark() {
    this.DarkState = !this.DarkState;
  }
  onlogging(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    if (form.value.username === 'admin' && form.value.password === 'admin') {
      this.router.navigate(['/admin/options']);
    } else {
      this.authService.login(form.value.username, form.value.password);
    }
  }
  gotoStore() {
    this.router.navigate(['/mainstore']);
  }
  logout() {
    this.authService.logout();
  }
  forget() {
    this.router.navigate(['/login/forget']);
  }
  toggleLight(indicator: boolean) {
    if (indicator) {
      document.getElementById('img2')!.style.display = 'block';
      document.getElementById('img1')!.style.display = 'none';
      document.getElementById('all')!.style.background = 'transparent';
    } else {
      document.getElementById('img1')!.style.display = 'block';
      document.getElementById('img2')!.style.display = 'none';
      document.getElementById('all')!.style.background =
        "url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80')";
    }
  }

  constructor(
    public service: OverallService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginListener = this.authService
      .getloginListener()
      .subscribe((result) => {
        this.wronginput = result;
      });
    this.isAuthenticated = this.authService.getisAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isauthenticated) => {
        this.isAuthenticated = isauthenticated;
      });
  }
}
