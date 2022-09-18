import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-successfully',
  templateUrl: './sign-up-successfully.component.html',
  styleUrls: ['./sign-up-successfully.component.css'],
})
export class SignUpSuccessfullyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}
