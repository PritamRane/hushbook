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
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  constructor(private authService: AuthService, private _fb: FormBuilder) {}
  updated = false;
  updatedlistener!: Subscription;
  updatedErrorlistener!: Subscription;
  error = false;
  form!: FormGroup;
  imagePreview!: string;
  selectionAlert = false;
  selected = ' ';
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
      email: new FormControl(null, {
        validators: Validators.compose([Validators.required, Validators.email]),
      }),
      password: new FormControl(null, {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
      }),
      username: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType],
      }),
      mobile: new FormControl(null, {
        validators: Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ]),
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
    this.authService.updateUserbyAdmin(
      this.form.value.email,
      this.form.value.password,
      this.form.value.username,
      this.form.value.image,
      this.form.value.mobile,
      this.selected
    );
  }
}
