import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth/auth-data-model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  matching = true;
  showpass = false;
  user!: AuthData;
  changingListener!: Subscription;
  passchanged = false;
  passchangingfailed = false;
  changePassword(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (form.value.password1 !== form.value.password2) {
      this.matching = false;
      return;
    }
    console.log(form.value);
    this.authService.changePassword(form.value.password1, form.value.password3);
  }
  toggleShowing() {
    this.showpass = !this.showpass;
  }
  constructor(private authService: AuthService) {
    setTimeout(() => {
      this.user = this.authService.getUser();
    }, 100);
  }

  ngOnInit(): void {
    this.changingListener = this.authService
      .getChangePassListener()
      .subscribe((data) => {
        this.passchanged = data.changed;
        this.passchangingfailed = data.failed;
      });
  }
}
