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
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  constructor(private authService: AuthService, private _fb: FormBuilder) {}
  created = false;
  creationerror = false;
  private creationlistener!: Subscription;
  private creationerrorlistener!: Subscription;
  selected = ' ';
  selectionAlert = false;
  form!: FormGroup;
  imagePreview!: string;
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
    this.created = this.authService.isCreated;
    this.creationerror = this.authService.creationerror;
    this.creationerrorlistener = this.authService
      .getCreationErrorListener()
      .subscribe((err) => {
        this.creationerror = err;
      });
    this.creationlistener = this.authService
      .getCreationListener()
      .subscribe((iscreated) => {
        this.created = iscreated;
      });
  }
  create() {
    if (this.form.invalid) {
      return;
    } else if (this.selected === ' ') {
      this.selectionAlert = true;
      return;
    }
    // }
    console.log(this.form.value);
    console.log(this.selected);
    this.authService.createUserByAdmin(
      this.form.value.email,
      this.form.value.password,
      this.form.value.username,
      this.form.value.image,
      this.form.value.mobile,
      this.selected
    );
  }
}
