import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { check } from 'express-validator';
import { Subject } from 'rxjs';
import { BOOK } from '../Book-Model';
import { signData } from '../signUp-data-model';
import { AuthData } from './auth-data-model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private token!: string;
  private userEmail!: string;
  private user!: AuthData;
  private authStatusListener = new Subject<boolean>();
  isAuthenticated = false;
  private creationListener = new Subject<boolean>();
  isCreated = false;
  private creationError = new Subject<boolean>();
  creationerror = false;
  private updationListener = new Subject<boolean>();
  isUpdated = false;
  private updationError = new Subject<boolean>();
  updationerror = false;
  private deletionListener = new Subject<boolean>();
  isdeleted = false;
  private deletionError = new Subject<boolean>();
  deletionerror = false;
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  private testData = new Subject<signData>();
  private changepassListener = new Subject<{
    changed: boolean;
    failed: boolean;
  }>();
  private checkoutListener = new Subject<string>();
  private loginListener = new Subject<boolean>();
  private emailListener = new Subject<boolean>();
  price = '0';
  getToken() {
    return this.token;
  }
  getisAuth() {
    return this.isAuthenticated;
  }
  getUser() {
    return this.user;
  }
  getEmailListener() {
    return this.emailListener.asObservable();
  }
  getloginListener() {
    return this.loginListener.asObservable();
  }
  getChangePassListener() {
    return this.changepassListener.asObservable();
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getTestData() {
    return this.testData.asObservable();
  }
  getCheckoutListener() {
    return this.checkoutListener.asObservable();
  }
  getCreationListener() {
    return this.creationListener.asObservable();
  }
  getCreationErrorListener() {
    return this.creationError.asObservable();
  }

  getUpdationListener() {
    return this.updationListener.asObservable();
  }
  getUpdationErrorListener() {
    return this.updationError.asObservable();
  }

  getDeletionListener() {
    return this.deletionListener.asObservable();
  }
  getDeletionErrorListener() {
    return this.deletionError.asObservable();
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }
    this.http
      .post<{ message: string; user: AuthData }>(
        'http://localhost:3000/api/users',
        { email: authInformation.email }
      )
      .subscribe((responsedata: any) => {
        this.user = responsedata.user;
      });
    const now = new Date();
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      if (authInformation.email) {
        this.userEmail = authInformation.email;
      }
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  createUser(
    email: string,
    password: string,
    username: string,
    image: File,
    mobile: number,
    genre: string
  ) {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('mobile', mobile.toString());
    data.append('genre', genre);
    data.append('image', image, email);
    console.log('data is ' + data);

    this.http.post('http://localhost:3000/signuptest', data).subscribe(
      (response) => {
        console.log(response);
        const data: signData = {
          isauthenticated: true,
          failed: false,
          success: true,
        };
        this.testData.next(data);
        this.router.navigate(['/signup/signupSuccessfully']);
      },
      (error) => {
        const data: signData = {
          isauthenticated: false,
          failed: true,
          success: false,
        };
        this.testData.next(data);
      }
    );
  }
  forget(email: string) {
    this.http
      .post('http://localhost:3000/testemail', { email: email })
      .subscribe(
        (response) => {
          this.emailListener.next(true);
          console.log(response);
        },
        (error) => {
          this.emailListener.next(false);

          console.log(error);
        }
      );
  }
  createUserByAdmin(
    email: string,
    password: string,
    username: string,
    image: File,
    mobile: number,
    genre: string
  ) {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('mobile', mobile.toString());
    data.append('genre', genre);
    data.append('image', image, email);

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/createuserByAdmin',
        data
      )
      .subscribe(
        (response) => {
          this.isCreated = true;
          this.creationerror = false;
          this.creationListener.next(true);

          this.creationError.next(false);
          console.log(response);
        },
        (error) => {
          this.creationerror = true;
          this.isCreated = false;
          this.creationError.next(true);

          this.creationListener.next(false);
          console.log(error);
        }
      );
  }

  updateUserbyAdmin(
    email: string,
    newpassword: string,
    username: string,
    image: File,
    mobile: number,
    genre: string
  ) {
    const data = new FormData();
    data.append('email', email);
    data.append('username', username);
    data.append('password', newpassword);
    data.append('genre', genre);
    data.append('mobile', mobile.toString());
    data.append('image', image, email);

    this.http.post('http://localhost:3000/updateUserByAdmin', data).subscribe(
      (response) => {
        this.isUpdated = true;
        this.updationerror = false;

        this.updationListener.next(true);
        this.updationError.next(false);
        console.log(response);
      },
      (error) => {
        this.isUpdated = false;

        this.updationerror = true;
        this.updationListener.next(false);

        this.updationError.next(true);
        console.log(error);
      }
    );
  }
  updateBookByAdmin(
    author: string,
    title: string,
    image: File,
    price: number,
    stock: number
  ) {
    const data = new FormData();
    data.append('author', author);
    data.append('title', title);
    data.append('price', price.toString());
    data.append('stock', stock.toString());
    data.append('image', image, title);

    console.log(data);
    this.http.post('http://localhost:3000/updateBookByAdmin', data).subscribe(
      (response) => {
        this.isUpdated = true;
        this.updationerror = false;

        this.updationListener.next(true);
        this.updationError.next(false);
        console.log(response);
      },
      (error) => {
        this.isUpdated = false;

        this.updationerror = true;
        this.updationListener.next(false);

        this.updationError.next(true);
        console.log(error);
      }
    );
  }
  deleteUserByAdmin(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
      username: '',
      image: '',
      mobile: 0,
      genre: ' ',
      books: [],
      favorites_list: [],
    };

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/deleteuserByAdmin',
        authData
      )
      .subscribe(
        (response) => {
          this.isdeleted = true;
          this.deletionerror = false;
          this.deletionListener.next(true);

          this.deletionError.next(false);
          console.log(response);
        },
        (error) => {
          this.deletionerror = true;
          this.isdeleted = false;
          this.deletionError.next(true);

          this.deletionListener.next(false);
          console.log(error);
        }
      );
  }
  deleteBookByAdmin(title: string) {
    const book = {
      Title: title,
    };

    this.http
      .post<{ message: string }>(
        'http://localhost:3000/deleteBookByAdmin',
        book
      )
      .subscribe(
        (response) => {
          this.isdeleted = true;
          this.deletionerror = false;
          this.deletionListener.next(true);

          this.deletionError.next(false);
          console.log(response);
        },
        (error) => {
          this.deletionerror = true;
          this.isdeleted = false;
          this.deletionError.next(true);

          this.deletionListener.next(false);
          console.log(error);
        }
      );
  }
  login(username: string, password: string) {
    const authData: AuthData = {
      email: '',
      password: password,
      username: username,
      image: '',
      mobile: 0,
      genre: ' ',
      books: [],
      favorites_list: [],
    };
    this.http
      .post<{ token: string; expiresIn: number; user: AuthData }>(
        'http://localhost:3000/logintest',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          console.log(response);
          if (token) {
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            const expiresInDuration = response.expiresIn;
            console.log(expiresInDuration);
            const user = response.user;
            this.user = user;
            // this.userEmail = email;
            console.log(user.email);
            console.log(this.user);
            this.setAuthTimer(expiresInDuration);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, user.email);
            this.router.navigate(['/mainstore']);
          }
        },
        (error) => {
          this.loginListener.next(true);
        }
      );
  }

  addBooksToUser(book: BOOK) {
    this.http
      .post<{ user: AuthData }>('http://localhost:3000/api/addingbooks', [
        book,
        this.user,
      ])
      .subscribe((response) => {
        this.user = response.user;
      });
  }

  addFavBooksToUser(book: BOOK) {
    this.http
      .post<{ user: AuthData }>('http://localhost:3000/api/addingFavbooks', [
        book,
        this.user,
      ])
      .subscribe((response) => {
        this.user = response.user;
      });
  }

  testmail() {}

  changePassword(password: string, currentpass: string) {
    console.log(password);
    console.log(this.user);
    const data = {
      newpassword: password,
      currentpass: currentpass,
      user: this.user,
    };
    this.http
      .post<{ message: string; user: AuthData }>(
        'http://localhost:3000/changepassword',
        data
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.changepassListener.next({ changed: true, failed: false });
          this.user = response.user;
        },
        (error) => {
          this.changepassListener.next({ changed: false, failed: true });

          console.log(error);
        }
      );
  }
  logout() {
    this.token = '';
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  checkout(price: number) {
    this.price = price.toString();
    this.checkoutListener.next(price.toString());
    this.check2(price);
  }
  async check2(price: number) {
    await this.checkout(price);
    await this.router.navigate(['/checkout']);
  }
  private setAuthTimer(duraion: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duraion * 1000);
  }
  private saveAuthData(token: string, expirtationDate: Date, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirtationDate.toISOString());
    localStorage.setItem('email', email);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('email');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const email = localStorage.getItem('email');
    if (!token || !expirationDate) {
      return;
    } else {
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        email: email,
      };
    }
  }
}
