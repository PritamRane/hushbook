import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BOOK } from './Book-Model';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverallService {
  book!: BOOK;
  currentLibrary!: BOOK[];
  bookCreated = false;
  bookCreationError = false;
  subject1 = new Subject();
  private createBookListener = new Subject<boolean>();
  getcreateBookListener() {
    return this.createBookListener.asObservable();
  }
  constructor(private http: HttpClient, private router: Router) {
    this.http.get('http://localhost:3000/api/books').subscribe((bos: any) => {
      this.currentLibrary = bos;
    });
  }
  getBooks() {
    return this.http.get('http://localhost:3000/api/books');
  }

  Search(title: string) {
    return this.http.get<{ message: string; book: BOOK }>(
      'http://localhost:3000/api/search/' + title
    );
  }
  getResult() {
    return this.book;
  }
  sendData(
    title: string,
    price: number,
    image: File,
    author: string,
    stock: number
  ) {
    const data = new FormData();
    data.append('Title', title);
    data.append('Price', price.toString());
    data.append('Stock', stock.toString());
    data.append('Author', author);

    data.append('image', image, title);
    console.log('data is ' + data);

    return this.http.post('http://localhost:3000/addBook', data).subscribe(
      (response) => {
        this.createBookListener.next(true);
        this.bookCreated = true;
        this.bookCreationError = false;
        console.log(response);
      },
      (error) => {
        this.bookCreated = false;
        this.bookCreationError = true;

        this.createBookListener.next(false);
        console.log(error);
      }
    );
  }
}
