import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { OverallService } from '../overall.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  DarkState = false;
  falsePass = false;
  selected = ' ';
  selectionAlert = false;
  isAuthenticated = false;
  startingSnack = false;
  form!: FormGroup;
  imagePreview!: string;
  private authListenerSubs!: Subscription;
  ToggleDark() {
    this.DarkState = !this.DarkState;
  }
  onSignup() {
    if (this.form.invalid || this.form.value.mobile < 10) {
      return;
    } else if (this.selected === ' ') {
      this.selectionAlert = true;
      return;
    }
    console.log(this.form.value);

    console.log(this.selected);
    this.authService.createUser(
      this.form.value.email,
      this.form.value.password,
      this.form.value.username,
      this.form.value.image,
      this.form.value.mobile,
      this.selected
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  gotoStore() {
    this.router.navigate(['/mainstore']);
  }
  logout() {
    this.authService.logout();
  }
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

  constructor(
    private service: OverallService,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {}

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
    this.authListenerSubs = this.authService.getTestData().subscribe((data: { failed: boolean; }) => {
      this.startingSnack = data.failed;
      if (this.startingSnack) {
        this.openSnackBar('SignUp Failed', 'Close');
      }
    });
    this.isAuthenticated = this.authService.getisAuth();

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isauthenticated: boolean) => {
        this.isAuthenticated = isauthenticated;
      });
  }
}
