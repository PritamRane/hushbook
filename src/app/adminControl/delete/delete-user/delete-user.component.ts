import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  deleted = false;
  deletionerror = false;
  private deletionlistener!: Subscription;
  private deletionerrorlistener!: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.deleted = this.authService.isdeleted;
    this.deletionerror = this.authService.deletionerror;
    this.deletionerrorlistener = this.authService
      .getDeletionErrorListener()
      .subscribe((err) => {
        this.deletionerror = err;
      });
    this.deletionlistener = this.authService
      .getDeletionListener()
      .subscribe((isdeleted) => {
        this.deleted = isdeleted;
      });
  }
  delete(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    this.authService.deleteUserByAdmin(form.value.email, form.value.pass);
    form.resetForm();
  }
}
