import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css'],
})
export class LoadingScreenComponent implements OnInit {
  constructor(private authService: AuthService) {}
  on = false;
  ngOnInit(): void {}
  sent() {
    this.authService.testmail();
  }
}
