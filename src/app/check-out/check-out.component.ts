import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  checkoutListener!: Subscription;
  price = '0';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.price = this.authService.price;
    this.checkoutListener = this.authService
      .getCheckoutListener()
      .subscribe((price) => {
        this.price = price;
      });
    console.log(this.price);
    setTimeout(() => {
      render({
        id: '#myPaypalButton',
        currency: 'INR',
        value: this.price,
        onApprove: (details) => {
          alert('Transaction Successfull');
        },
      });
    }, 1000);
  }
}
