import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BOOK } from '../Book-Model';
import { OverallService } from '../overall.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  book!: BOOK;
  closeResult = '';
  constructor(
    private service: OverallService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const data: any = this.route.snapshot.paramMap;
    const book: any = {
      Title: data.get('Title'),
      Author: data.get('Author'),
      Cover: data.get('Cover'),
      Price: data.get('Price'),
      Stock: data.get('Stock'),
    };
    console.log(book);
    this.book = book;
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
