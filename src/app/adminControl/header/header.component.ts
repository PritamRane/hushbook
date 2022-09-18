import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  create() {
    this.router.navigate(['/admin/options/create']);
  }
  update() {
    this.router.navigate(['/admin/options/update']);
  }
  delete() {
    this.router.navigate(['/admin/options/delete']);
  }
  home() {
    this.router.navigate(['/admin/options']);
  }
  logout() {
    this.router.navigate(['/']);
  }
}
