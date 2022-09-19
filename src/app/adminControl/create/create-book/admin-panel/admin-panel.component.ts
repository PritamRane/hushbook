import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { BOOK } from '../../../../Book-Model';
import { OverallService } from '../../../../overall.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  created = false;
  creationerror = false;
  private deletionlistener!: Subscription;
  private deletionerrorlistener!: Subscription;
  form!: FormGroup;
  imagePreview!: string;

  constructor(private service: OverallService, private _fb: FormBuilder) {}

  book: BOOK = {
    Title: '',
    Price: 0,
    Author: '',
    Cover: '',
    Stock: 0,
  };

  ngOnInit(): void {
    this.form = this._fb.group({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      author: new FormControl(null, {
        validators: Validators.compose([Validators.required]),
      }),
      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
      stock: new FormControl(null, {
        validators: Validators.compose([Validators.required]),
      }),
    });

    this.created = this.service.bookCreated;
    this.creationerror = this.service.bookCreationError;
    this.deletionerrorlistener = this.service
      .getcreateBookListener()
      .subscribe((rs) => {
        if (rs) {
          this.created = true;
          this.creationerror = false;
        } else {
          this.created = false;
          this.creationerror = true;
        }
      });
  }
  AdminAdding() {
    if (this.form.invalid) {
      return;
    }
    this.service.sendData(
      this.form.value.title,
      this.form.value.price,
      this.form.value.image,

      this.form.value.author,

      this.form.value.stock
    );
    console.log(this.form.value.image);
  }
}
