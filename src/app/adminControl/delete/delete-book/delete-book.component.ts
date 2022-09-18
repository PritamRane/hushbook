import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css'],
})
export class DeleteBookComponent implements OnInit {
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
  update(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.deleteBookByAdmin(form.value.title);
  }
}
