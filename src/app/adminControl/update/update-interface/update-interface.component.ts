import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-interface',
  templateUrl: './update-interface.component.html',
  styleUrls: ['./update-interface.component.css'],
})
export class UpdateInterfaceComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  updatebook() {
    this.router.navigate(['/admin/options/update/updatebook']);
  }
  updateuser() {
    this.router.navigate(['/admin/options/update/updateuser']);
  }
}
