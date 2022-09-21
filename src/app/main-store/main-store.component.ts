import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BOOK } from '../Book-Model';
import { OverallService } from '../overall.service';
import { CartSnackbarComponent } from '../snack-bars/cart-snackbar/cart-snackbar.component';
import { FavSnackbarComponent } from '../snack-bars/fav-snackbar/fav-snackbar.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import "../../../src/assets/smtp.js"

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrls: ['./main-store.component.css'],
})
export class MainStoreComponent implements OnInit {
  showFiller = false;
  open2 = true;
  books: any;
  closeResult = '';
  items = Array(150)
    .fill(0)
    .map((x, i) => ({ id: i + 1, name: `Item ${i + 1}` }));
  pageOfItems!: Array<any>;

  isAuthenticated = false;
  private authListenerSubs!: Subscription;
  constructor(
    private service: OverallService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.service.getBooks().subscribe((bos) => {
      this.books = bos;
    });
  }
  book!: BOOK;
  addToFavList(book: BOOK) {
    this.openSnackBar2();
    this.authService.addFavBooksToUser(book);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(CartSnackbarComponent, {
      duration: 5 * 1000,
    });
  }
  openSnackBar2() {
    this._snackBar.openFromComponent(FavSnackbarComponent, {
      duration: 5 * 1000,
    });
  }

  addToCart(book: BOOK) {
    console.log(book);
    this.openSnackBar();
    this.authService.addBooksToUser(book);
    for (var i = 0; i < this.books.length; i++) {
      if (this.books[i] == book) {
        this.books[i].Stock = this.books[i].Stock - 1;
      }
    }
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getisAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isauthenticated) => {
        this.isAuthenticated = isauthenticated;
      });
  }
  

  

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
