import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  updated = false;
  updatedlistener!: Subscription;
  updatedErrorlistener!: Subscription;
  error = false;
  form!: FormGroup;
  imagePreview!: string;
  constructor(private authService: AuthService, private _fb: FormBuilder) {}
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
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
        // asyncValidators: [mimeType],
      }),
      stock: new FormControl(null, {
        validators: Validators.compose([Validators.required]),
      }),
    });
    this.updated = this.authService.isUpdated;
    this.updatedlistener = this.authService
      .getUpdationListener()
      .subscribe((iscreated) => {
        this.updated = iscreated;
      });
    this.updatedErrorlistener = this.authService
      .getUpdationErrorListener()
      .subscribe((error) => {
        this.error = error;
      });
    this.error = this.authService.updationerror;
  }
  update() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.authService.updateBookByAdmin(
      this.form.value.author,
      this.form.value.title,
      this.form.value.image,
      this.form.value.price,
      this.form.value.stock
    );
  }
}
