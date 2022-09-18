import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-interface',
  templateUrl: './delete-interface.component.html',
  styleUrls: ['./delete-interface.component.css'],
})
export class DeleteInterfaceComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  deletebook() {
    this.router.navigate(['/admin/options/delete/deletebook']);
  }
  deleteuser() {
    this.router.navigate(['/admin/options/delete/deleteuser']);
  }
}
