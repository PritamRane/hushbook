import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent implements OnInit {
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
}
