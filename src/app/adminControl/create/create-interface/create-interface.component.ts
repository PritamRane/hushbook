import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-interface',
  templateUrl: './create-interface.component.html',
  styleUrls: ['./create-interface.component.css'],
})
export class CreateInterfaceComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  createbook() {
    this.router.navigate(['/admin/options/create/createbook']);
  }
  createuser() {
    this.router.navigate(['/admin/options/create/createuser']);
  }
}
